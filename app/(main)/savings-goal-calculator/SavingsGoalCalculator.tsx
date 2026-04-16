'use client'

import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import InputField from '@/components/InputField'

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcSavings(goal: number, current: number, monthly: number, annualRate: number) {
  const r = annualRate / 100 / 12
  const data: { month: string; Balance: number }[] = []
  let balance = current
  let months = 0

  // required monthly if they want to know how much to save
  let requiredMonthly = 0
  if (monthly === 0 && goal > current) {
    // can't reach without contributions — just show flat line
  } else if (r === 0) {
    requiredMonthly = goal > current ? (goal - current) : 0
  } else {
    // PMT formula for target FV
    requiredMonthly = (goal - current * Math.pow(1 + r, 240)) * r / (Math.pow(1 + r, 240) - 1)
  }

  const monthlyUsed = monthly > 0 ? monthly : 0

  for (let m = 1; m <= 600; m++) {
    balance = balance * (1 + r) + monthlyUsed
    months = m
    data.push({ month: `Mo ${m}`, Balance: Math.round(balance) })
    if (balance >= goal) break
    if (m === 600) { months = -1; break }
  }

  const totalContributed = current + monthlyUsed * (months > 0 ? months : 0)
  const interestEarned = months > 0 ? balance - totalContributed : 0

  return { months, data, totalContributed, interestEarned, finalBalance: balance }
}

export default function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(50000)
  const [current, setCurrent] = useState(5000)
  const [monthly, setMonthly] = useState(500)
  const [annualRate, setAnnualRate] = useState(4.5)

  const { months, data, totalContributed, interestEarned, finalBalance } = useMemo(
    () => calcSavings(goal, current, monthly, annualRate),
    [goal, current, monthly, annualRate]
  )

  const years = Math.floor(months / 12)
  const remMonths = months % 12
  const reachable = months > 0

  // Thin out chart data for large month counts
  const chartData = data.filter((_, i) => data.length <= 120 || i % Math.floor(data.length / 120) === 0 || i === data.length - 1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <InputField label="Savings Goal" prefix="$" value={goal} onChange={setGoal}
            min={1000} max={2000000} step={1000} slider
            tooltip="The total amount you want to save — a house deposit, emergency fund, holiday, or any other target." />
          <InputField label="Current Savings" prefix="$" value={current} onChange={setCurrent}
            min={0} max={2000000} step={500} slider
            tooltip="How much you have already saved toward this goal." />
          <InputField label="Monthly Contribution" prefix="$" value={monthly} onChange={setMonthly}
            min={0} max={20000} step={50} slider
            tooltip="The amount you plan to add each month. Consistency here matters more than the interest rate." />
          <InputField label="Annual Interest Rate" suffix="%" value={annualRate} onChange={setAnnualRate}
            min={0} max={20} step={0.1} decimals={1} slider
            tooltip="The annual return on your savings — a high-yield savings account might offer 4–5%, a stock index fund 7–10% long-term." />
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard
            label="Time to Goal"
            value={reachable ? (years > 0 ? `${years}y ${remMonths}m` : `${remMonths}mo`) : 'Never'}
            highlight
          />
          <ResultCard label="Total Contributed" value={formatCurrency(totalContributed)} />
          <ResultCard label="Interest Earned" value={formatCurrency(interestEarned)} />
        </div>

        {!reachable && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            At this contribution rate and interest rate, the goal cannot be reached within 50 years. Try increasing your monthly contribution or interest rate.
          </div>
        )}

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Balance Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={55} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Legend />
              <ReferenceLine y={goal} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Goal', position: 'insideTopRight', fontSize: 10, fill: '#10B981' }} />
              <Line type="monotone" dataKey="Balance" stroke="#0F172A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Summary</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Savings Goal', value: formatCurrency(goal) },
              { label: 'Starting Balance', value: formatCurrency(current) },
              { label: 'Monthly Contribution', value: formatCurrency(monthly) },
              { label: 'Annual Interest Rate', value: `${annualRate}%` },
              { label: 'Time to Reach Goal', value: reachable ? (years > 0 ? `${years} years ${remMonths} months` : `${remMonths} months`) : 'N/A' },
              { label: 'Total Contributed', value: formatCurrency(totalContributed) },
              { label: 'Interest Earned', value: formatCurrency(interestEarned) },
              { label: 'Final Balance', value: formatCurrency(finalBalance) },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-[#0F172A]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-[#0F172A]' : 'bg-slate-50'}`}>
      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${highlight ? 'text-[#10B981]' : 'text-slate-500'}`}>{label}</div>
      <div className={`text-xl font-bold truncate ${highlight ? 'text-white' : 'text-[#0F172A]'}`}>{value}</div>
    </div>
  )
}