'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import InputField from '@/components/InputField'
import PrintButton from '@/components/PrintButton'

type FrequencyKey = 'daily' | 'monthly' | 'quarterly' | 'annually'

const frequencies: Record<FrequencyKey, number> = {
  daily: 365,
  monthly: 12,
  quarterly: 4,
  annually: 1,
}

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcCompound(principal: number, annualRate: number, years: number, compoundFreq: number, monthlyContribution: number) {
  const r = annualRate / 100 / compoundFreq
  const data: { year: string; Balance: number; Contributions: number; Interest: number }[] = []
  let balance = principal
  let totalContributions = principal
  const monthsPerPeriod = 12 / compoundFreq

  for (let y = 1; y <= years; y++) {
    for (let p = 0; p < compoundFreq; p++) {
      balance = balance * (1 + r) + monthlyContribution * monthsPerPeriod
      totalContributions += monthlyContribution * monthsPerPeriod
    }
    data.push({
      year: `Yr ${y}`,
      Balance: Math.round(balance),
      Contributions: Math.round(totalContributions),
      Interest: Math.round(balance - totalContributions),
    })
  }
  return { finalBalance: balance, totalContributions, totalInterest: balance - totalContributions, data }
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(10000)
  const [annualRate, setAnnualRate] = useState(7)
  const [years, setYears] = useState(20)
  const [frequency, setFrequency] = useState<FrequencyKey>('monthly')
  const [monthlyContribution, setMonthlyContribution] = useState(200)

  const { finalBalance, totalContributions, totalInterest, data } = useMemo(
    () => calcCompound(principal, annualRate, years, frequencies[frequency], monthlyContribution),
    [principal, annualRate, years, frequency, monthlyContribution]
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-1">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <InputField label="Initial Deposit" prefix="$" value={principal} onChange={setPrincipal}
            min={0} max={1000000} step={1000} slider
            tooltip="The lump sum you start with. Even a small initial deposit makes a difference thanks to compounding." />
          <InputField label="Annual Interest Rate" suffix="%" value={annualRate} onChange={setAnnualRate}
            min={0.1} max={30} step={0.1} decimals={1} slider
            tooltip="The yearly return rate on your investment. The S&P 500 has historically averaged around 7–10% annually before inflation." />
          <InputField label="Monthly Contribution" prefix="$" value={monthlyContribution} onChange={setMonthlyContribution}
            min={0} max={10000} step={50} slider
            tooltip="The amount you add every month. Regular contributions have a huge impact — start small and increase over time." />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time Period</label>
            <select
              className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
            >
              {[1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50].map((y) => (
                <option key={y} value={y}>{y} year{y !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Compound Frequency</label>
            <select
              className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as FrequencyKey)}
            >
              {(Object.keys(frequencies) as FrequencyKey[]).map((f) => (
                <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Final Balance" value={formatCurrency(finalBalance)} highlight />
          <ResultCard label="Total Contributions" value={formatCurrency(totalContributions)} />
          <ResultCard label="Interest Earned" value={formatCurrency(totalInterest)} />
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Growth Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={55} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Legend />
              <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
              <Area type="monotone" dataKey="Contributions" stroke="#10B981" fill="#d1fae5" strokeWidth={2} />
              <Area type="monotone" dataKey="Interest" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#0F172A] text-sm">Year-by-Year Breakdown</h2>
            <PrintButton />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-4 font-medium">Year</th>
                  <th className="pb-2 pr-4 font-medium">Balance</th>
                  <th className="pb-2 pr-4 font-medium">Contributions</th>
                  <th className="pb-2 font-medium">Interest Earned</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row.year} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-1.5 pr-4 text-slate-500">{row.year}</td>
                    <td className="py-1.5 pr-4 font-medium text-slate-700">{formatCurrency(row.Balance)}</td>
                    <td className="py-1.5 pr-4 text-[#10B981] font-medium">{formatCurrency(row.Contributions)}</td>
                    <td className="py-1.5 text-amber-600">{formatCurrency(row.Interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-[#0F172A]' : 'bg-slate-50'}`}>
      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${highlight ? 'text-[#10B981]' : 'text-slate-500'}`}>
        {label}
      </div>
      <div className={`text-xl font-bold truncate ${highlight ? 'text-white' : 'text-[#0F172A]'}`}>{value}</div>
    </div>
  )
}