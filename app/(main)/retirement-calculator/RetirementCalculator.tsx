'use client'

import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts'
import InputField from '@/components/InputField'

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcRetirement(
  currentAge: number, retirementAge: number, currentSavings: number,
  monthlyContrib: number, preRate: number, postRate: number, monthlyWithdrawal: number
) {
  const yearsToRetire = Math.max(retirementAge - currentAge, 0)
  const r = preRate / 100 / 12

  // Accumulation phase
  let balance = currentSavings
  const accumData: { label: string; Balance: number; Contributions: number }[] = []
  let totalContributions = currentSavings

  for (let y = 1; y <= yearsToRetire; y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthlyContrib
      totalContributions += monthlyContrib
    }
    accumData.push({
      label: `Age ${currentAge + y}`,
      Balance: Math.round(balance),
      Contributions: Math.round(totalContributions),
    })
  }

  const retirementBalance = balance
  const interestEarned = retirementBalance - totalContributions

  // Drawdown phase
  const rPost = postRate / 100 / 12
  let drawBalance = retirementBalance
  const drawData: { label: string; Balance: number }[] = []
  let monthsOfIncome = 0

  for (let y = 1; y <= 50; y++) {
    for (let m = 0; m < 12; m++) {
      drawBalance = drawBalance * (1 + rPost) - monthlyWithdrawal
      if (drawBalance <= 0) { drawBalance = 0; break }
      monthsOfIncome++
    }
    drawData.push({ label: `Age ${retirementAge + y}`, Balance: Math.round(drawBalance) })
    if (drawBalance === 0) break
  }

  const yearsOfIncome = Math.floor(monthsOfIncome / 12)
  return { retirementBalance, totalContributions, interestEarned, accumData, drawData, yearsOfIncome }
}

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(25000)
  const [monthlyContrib, setMonthlyContrib] = useState(500)
  const [preRate, setPreRate] = useState(7)
  const [postRate, setPostRate] = useState(4)
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(4000)
  const [view, setView] = useState<'accumulate' | 'drawdown'>('accumulate')

  const { retirementBalance, totalContributions, interestEarned, accumData, drawData, yearsOfIncome } =
    useMemo(() => calcRetirement(currentAge, retirementAge, currentSavings, monthlyContrib, preRate, postRate, monthlyWithdrawal),
      [currentAge, retirementAge, currentSavings, monthlyContrib, preRate, postRate, monthlyWithdrawal])

  const yearsToRetire = retirementAge - currentAge

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Details</h3>
          <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={80} step={1} slider tooltip="Your age today." />
          <InputField label="Retirement Age" value={retirementAge} onChange={(v) => setRetirementAge(Math.max(v, currentAge + 1))} min={40} max={85} step={1} slider tooltip="The age at which you plan to stop working and start drawing from your savings." />
          <InputField label="Current Savings" prefix="$" value={currentSavings} onChange={setCurrentSavings} min={0} max={2000000} step={1000} slider tooltip="Total retirement savings you have already accumulated — 401(k), IRA, pension, etc." />
          <InputField label="Monthly Contribution" prefix="$" value={monthlyContrib} onChange={setMonthlyContrib} min={0} max={10000} step={50} slider tooltip="How much you add to retirement savings each month, including any employer match." />
        </div>
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Rates & Withdrawals</h3>
          <InputField label="Pre-Retirement Return" suffix="%" value={preRate} onChange={setPreRate} min={0.5} max={20} step={0.1} decimals={1} slider tooltip="Expected annual return on your investments before retirement. A diversified stock/bond portfolio has historically returned 6–8% annually." />
          <InputField label="Post-Retirement Return" suffix="%" value={postRate} onChange={setPostRate} min={0} max={15} step={0.1} decimals={1} slider tooltip="Expected return after retirement, when your portfolio may shift to more conservative investments like bonds." />
          <InputField label="Monthly Withdrawal" prefix="$" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} min={500} max={50000} step={100} slider tooltip="How much you plan to withdraw from savings each month in retirement. A common guideline is to withdraw no more than 4% of your balance annually." />
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="At Retirement" value={formatCurrency(retirementBalance)} highlight />
          <ResultCard label="Income Lasts" value={yearsOfIncome >= 50 ? '50+ yrs' : `${yearsOfIncome} yrs`} />
          <ResultCard label="Interest Earned" value={formatCurrency(interestEarned)} />
        </div>

        {yearsOfIncome < 25 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            At your withdrawal rate, savings run out in <strong>{yearsOfIncome} years</strong> (age {retirementAge + yearsOfIncome}). Consider increasing contributions, reducing withdrawals, or retiring later.
          </div>
        )}

        {/* View toggle */}
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex gap-2 mb-4">
            {(['accumulate', 'drawdown'] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${view === v ? 'bg-[#0F172A] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#10B981]'}`}>
                {v === 'accumulate' ? `Saving (${yearsToRetire} yrs)` : `Retirement Income`}
              </button>
            ))}
          </div>

          {view === 'accumulate' && (
            <>
              <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Savings Growth to Retirement</h2>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={accumData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={Math.floor(accumData.length / 6)} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={60} />
                  <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
                  <Legend />
                  <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
                  <Area type="monotone" dataKey="Contributions" stroke="#10B981" fill="#d1fae5" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}

          {view === 'drawdown' && (
            <>
              <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Retirement Balance Over Time</h2>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={drawData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 10 }} interval={Math.floor(drawData.length / 6)} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={60} />
                  <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
                  <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" />
                  <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </>
          )}
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Retirement Summary</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Years to Retirement', value: `${yearsToRetire} years` },
              { label: 'Total Contributions', value: formatCurrency(totalContributions) },
              { label: 'Investment Growth', value: formatCurrency(interestEarned) },
              { label: 'Balance at Retirement', value: formatCurrency(retirementBalance) },
              { label: 'Monthly Withdrawal', value: formatCurrency(monthlyWithdrawal) },
              { label: 'Annual Withdrawal', value: formatCurrency(monthlyWithdrawal * 12) },
              { label: 'Withdrawal Rate', value: retirementBalance > 0 ? `${((monthlyWithdrawal * 12) / retirementBalance * 100).toFixed(1)}%` : '—' },
              { label: 'Income Lasts', value: yearsOfIncome >= 50 ? '50+ years' : `${yearsOfIncome} years (to age ${retirementAge + yearsOfIncome})` },
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