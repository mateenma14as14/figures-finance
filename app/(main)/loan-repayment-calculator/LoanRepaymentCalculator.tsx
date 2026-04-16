'use client'

import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import InputField from '@/components/InputField'

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcLoan(principal: number, annualRate: number, termMonths: number) {
  const r = annualRate / 100 / 12
  if (r === 0) return { payment: principal / termMonths, totalInterest: 0 }
  const payment = (principal * r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)
  return { payment, totalInterest: payment * termMonths - principal }
}

function buildSchedule(principal: number, annualRate: number, termMonths: number, payment: number) {
  const r = annualRate / 100 / 12
  let balance = principal
  const rows = []
  for (let m = 1; m <= termMonths; m++) {
    const interest = balance * r
    const prin = Math.min(payment - interest, balance)
    balance = Math.max(balance - prin, 0)
    rows.push({ month: `Mo ${m}`, Principal: Math.round(prin), Interest: Math.round(interest), Balance: Math.round(balance) })
    if (balance === 0) break
  }
  return rows
}

export default function LoanRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(20000)
  const [annualRate, setAnnualRate] = useState(8.5)
  const [termMonths, setTermMonths] = useState(60)
  const [showFull, setShowFull] = useState(false)

  const { payment, totalInterest } = useMemo(
    () => calcLoan(loanAmount, annualRate, termMonths),
    [loanAmount, annualRate, termMonths]
  )
  const schedule = useMemo(
    () => buildSchedule(loanAmount, annualRate, termMonths, payment),
    [loanAmount, annualRate, termMonths, payment]
  )
  const totalPayment = payment * termMonths

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <InputField label="Loan Amount" prefix="$" value={loanAmount} onChange={setLoanAmount}
            min={500} max={500000} step={500} slider
            tooltip="The total amount you are borrowing — car loan, personal loan, student loan, etc." />
          <InputField label="Annual Interest Rate" suffix="%" value={annualRate} onChange={setAnnualRate}
            min={0.1} max={40} step={0.1} decimals={1} slider
            tooltip="The yearly interest rate on your loan. Check your loan agreement or lender quote for the exact figure." />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term</label>
            <div className="grid grid-cols-3 gap-2">
              {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                <button
                  key={m}
                  onClick={() => setTermMonths(m)}
                  className={`py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    termMonths === m
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#10B981]'
                  }`}
                >
                  {m}mo
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Monthly Payment" value={formatCurrency(payment)} highlight />
          <ResultCard label="Total Interest" value={formatCurrency(totalInterest)} />
          <ResultCard label="Total Cost" value={formatCurrency(totalPayment)} />
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Repayment Breakdown</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={schedule.filter((_, i) => i % Math.max(1, Math.floor(schedule.length / 60)) === 0 || i === schedule.length - 1)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={55} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Legend />
              <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
              <Area type="monotone" dataKey="Principal" stroke="#10B981" fill="#d1fae5" strokeWidth={2} />
              <Area type="monotone" dataKey="Interest" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Repayment Schedule</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-4 font-medium">Month</th>
                  <th className="pb-2 pr-4 font-medium">Principal</th>
                  <th className="pb-2 pr-4 font-medium">Interest</th>
                  <th className="pb-2 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {(showFull ? schedule : schedule.slice(0, 24)).map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-1.5 pr-4 text-slate-500">{row.month}</td>
                    <td className="py-1.5 pr-4 text-[#10B981] font-medium">{formatCurrency(row.Principal)}</td>
                    <td className="py-1.5 pr-4 text-amber-600">{formatCurrency(row.Interest)}</td>
                    <td className="py-1.5 text-slate-700">{formatCurrency(row.Balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {schedule.length > 24 && (
            <button onClick={() => setShowFull(!showFull)} className="mt-3 text-sm text-[#10B981] hover:underline font-medium cursor-pointer">
              {showFull ? 'Show less ↑' : `Show all ${schedule.length} months ↓`}
            </button>
          )}
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