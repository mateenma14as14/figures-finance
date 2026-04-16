'use client'

import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import InputField from '@/components/InputField'

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcPayoff(balance: number, apr: number, monthlyPayment: number) {
  const r = apr / 100 / 12
  const minPayment = Math.max(balance * 0.02, 25)
  const data: { month: string; Balance: number }[] = []
  const minData: { month: string; Balance: number }[] = []

  let bal = balance
  let minBal = balance
  let months = 0
  let totalInterest = 0
  let minMonths = 0
  let minTotalInterest = 0

  for (let m = 1; m <= 1200; m++) {
    const interest = bal * r
    totalInterest += interest
    const prin = Math.min(monthlyPayment - interest, bal)
    bal = Math.max(bal - prin, 0)
    months = m
    data.push({ month: `Mo ${m}`, Balance: Math.round(bal) })
    if (bal === 0) break
    if (monthlyPayment <= interest) { months = -1; break }
  }

  for (let m = 1; m <= 1200; m++) {
    const curMin = Math.max(minBal * 0.02, 25)
    const interest = minBal * r
    minTotalInterest += interest
    const prin = Math.min(curMin - interest, minBal)
    minBal = Math.max(minBal - prin, 0)
    minMonths = m
    minData.push({ month: `Mo ${m}`, Balance: Math.round(minBal) })
    if (minBal === 0) break
  }

  return { months, totalInterest, totalPaid: monthlyPayment * months, minPayment, minMonths, minTotalInterest, data }
}

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000)
  const [apr, setApr] = useState(22.9)
  const [monthlyPayment, setMonthlyPayment] = useState(200)

  const { months, totalInterest, totalPaid, minPayment, minMonths, minTotalInterest, data } = useMemo(
    () => calcPayoff(balance, apr, monthlyPayment),
    [balance, apr, monthlyPayment]
  )

  const reachable = months > 0
  const years = Math.floor(months / 12)
  const remMonths = months % 12

  const chartData = data.filter((_, i) => data.length <= 60 || i % Math.floor(data.length / 60) === 0 || i === data.length - 1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <InputField label="Card Balance" prefix="$" value={balance} onChange={setBalance}
            min={100} max={100000} step={100} slider
            tooltip="The current outstanding balance on your credit card." />
          <InputField label="Annual APR" suffix="%" value={apr} onChange={setApr}
            min={1} max={60} step={0.1} decimals={1} slider
            tooltip="Annual Percentage Rate — the yearly interest rate on your card. Check your statement or card agreement. US credit cards average around 20–27% APR." />
          <InputField label="Monthly Payment" prefix="$" value={monthlyPayment} onChange={setMonthlyPayment}
            min={10} max={50000} step={10} slider
            tooltip="How much you plan to pay each month. Paying more than the minimum dramatically reduces your payoff time and total interest." />
        </div>

        {/* Minimum payment warning */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm space-y-1">
          <p className="font-semibold text-amber-800">Minimum payment only: ${minPayment.toFixed(0)}/mo</p>
          <p className="text-amber-700">Takes <span className="font-bold">{Math.floor(minMonths / 12)}y {minMonths % 12}m</span> and costs <span className="font-bold">{formatCurrency(minTotalInterest)}</span> in interest.</p>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard
            label="Paid Off In"
            value={reachable ? (years > 0 ? `${years}y ${remMonths}m` : `${remMonths}mo`) : 'Never'}
            highlight
          />
          <ResultCard label="Total Interest" value={reachable ? formatCurrency(totalInterest) : '—'} />
          <ResultCard label="Total Paid" value={reachable ? formatCurrency(totalPaid) : '—'} />
        </div>

        {!reachable && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            Your monthly payment is less than the monthly interest charge. Increase your payment above <strong>{formatCurrency(balance * apr / 100 / 12)}/mo</strong> to start reducing the balance.
          </div>
        )}

        {reachable && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm text-emerald-800">
            Compared to paying the minimum only, you save <strong>{formatCurrency(minTotalInterest - totalInterest)}</strong> in interest and pay off <strong>{Math.round((minMonths - months) / 12 * 10) / 10} years</strong> sooner.
          </div>
        )}

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Balance Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} tick={{ fontSize: 10 }} width={55} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Legend />
              <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Payoff Summary</h2>
          <div className="space-y-2 text-sm">
            {[
              { label: 'Card Balance', value: formatCurrency(balance) },
              { label: 'APR', value: `${apr}%` },
              { label: 'Monthly Payment', value: formatCurrency(monthlyPayment) },
              { label: 'Months to Pay Off', value: reachable ? `${months} months` : 'N/A' },
              { label: 'Total Interest Paid', value: reachable ? formatCurrency(totalInterest) : 'N/A' },
              { label: 'Total Amount Paid', value: reachable ? formatCurrency(totalPaid) : 'N/A' },
              { label: 'Min. Payment Interest (for comparison)', value: formatCurrency(minTotalInterest) },
              { label: 'Interest Saved vs. Min. Payment', value: reachable ? formatCurrency(minTotalInterest - totalInterest) : 'N/A' },
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