'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import InputField from '@/components/InputField'
import PrintButton from '@/components/PrintButton'

type AmortizationRow = {
  month: number
  year: number
  payment: number
  principal: number
  interest: number
  balance: number
}

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcBasePayment(principal: number, annualRate: number, termYears: number) {
  const r = annualRate / 100 / 12
  const n = termYears * 12
  if (r === 0) return principal / n
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function buildAmortization(
  principal: number,
  annualRate: number,
  termYears: number,
  basePayment: number,
  extraPayment: number
): AmortizationRow[] {
  const r = annualRate / 100 / 12
  const rows: AmortizationRow[] = []
  let balance = principal
  const maxMonths = termYears * 12

  for (let month = 1; month <= maxMonths; month++) {
    const interest = balance * r
    const totalPayment = Math.min(balance + interest, basePayment + extraPayment)
    const prinPart = totalPayment - interest
    balance = Math.max(balance - prinPart, 0)
    rows.push({
      month,
      year: Math.ceil(month / 12),
      payment: totalPayment,
      principal: prinPart,
      interest,
      balance,
    })
    if (balance === 0) break
  }
  return rows
}

function buildYearlyChart(rows: AmortizationRow[]) {
  const byYear: Record<number, { principal: number; interest: number; balance: number }> = {}
  for (const row of rows) {
    if (!byYear[row.year]) byYear[row.year] = { principal: 0, interest: 0, balance: 0 }
    byYear[row.year].principal += row.principal
    byYear[row.year].interest += row.interest
    byYear[row.year].balance = row.balance
  }
  return Object.entries(byYear).map(([year, v]) => ({
    year: `Yr ${year}`,
    Principal: Math.round(v.principal),
    Interest: Math.round(v.interest),
    Balance: Math.round(v.balance),
  }))
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(400000)
  const [downPayment, setDownPayment] = useState(80000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)
  const [extraPayment, setExtraPayment] = useState(0)
  const [showFullTable, setShowFullTable] = useState(false)

  const principal = Math.max(homePrice - downPayment, 0)
  const downPct = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0'

  const basePayment = useMemo(
    () => calcBasePayment(principal, interestRate, termYears),
    [principal, interestRate, termYears]
  )

  // Without extra payment — for comparison
  const baseAmortization = useMemo(
    () => buildAmortization(principal, interestRate, termYears, basePayment, 0),
    [principal, interestRate, termYears, basePayment]
  )

  // With extra payment
  const amortization = useMemo(
    () => buildAmortization(principal, interestRate, termYears, basePayment, extraPayment),
    [principal, interestRate, termYears, basePayment, extraPayment]
  )

  const chartData = useMemo(() => buildYearlyChart(amortization), [amortization])

  const totalInterest = amortization.reduce((s, r) => s + r.interest, 0)
  const totalPayment = amortization.reduce((s, r) => s + r.payment, 0)
  const baseInterest = baseAmortization.reduce((s, r) => s + r.interest, 0)

  const interestSaved = extraPayment > 0 ? baseInterest - totalInterest : 0
  const monthsSaved = extraPayment > 0 ? baseAmortization.length - amortization.length : 0
  const paidOffIn = amortization.length

  // Scenario comparison across all term lengths
  const scenarioTerms = [10, 15, 20, 25, 30]
  const scenarios = useMemo(() =>
    scenarioTerms.map((t) => {
      const pmt = calcBasePayment(principal, interestRate, t)
      const rows = buildAmortization(principal, interestRate, t, pmt, 0)
      const totInt = rows.reduce((s, r) => s + r.interest, 0)
      return { term: t, payment: pmt, totalInterest: totInt, totalPayment: pmt * t * 12 }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [principal, interestRate]
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <InputField label="Home Price" prefix="$" value={homePrice} onChange={setHomePrice}
            min={50000} max={5000000} step={5000} slider
            tooltip="The total purchase price of the property, before your down payment." />
          <InputField
            label={`Down Payment — ${downPct}%`} prefix="$" value={downPayment}
            onChange={(v) => setDownPayment(Math.min(v, homePrice))}
            min={0} max={homePrice} step={5000} slider
            tooltip="The upfront cash you pay. A down payment of 20% or more avoids private mortgage insurance (PMI)." />
          <InputField label="Loan Amount" prefix="$" value={principal} onChange={() => {}}
            min={0} max={5000000} step={5000} readOnly
            tooltip="Home price minus your down payment. This is the amount you borrow from the lender." />
          <InputField label="Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate}
            min={0.1} max={20} step={0.1} decimals={1} slider
            tooltip="The annual interest rate on your loan. This is different from APR, which includes fees. Check with your lender for the exact rate." />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term</label>
            <select
              className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
            >
              {[10, 15, 20, 25, 30].map((y) => (
                <option key={y} value={y}>{y} years</option>
              ))}
            </select>
          </div>
        </div>

        {/* Extra payment — separate card so it stands out */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
          <div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-0.5">
              Extra Monthly Payment
            </p>
            <p className="text-xs text-emerald-600">See how much interest you save by paying more each month.</p>
          </div>
          <InputField label="" prefix="$" value={extraPayment} onChange={setExtraPayment}
            min={0} max={10000} step={50} slider
            tooltip="Any amount above your regular monthly payment goes directly to reducing your principal, saving you significant interest over the life of the loan." />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 space-y-5">
        {/* Main result cards */}
        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Monthly Payment" value={formatCurrency(basePayment + extraPayment)} highlight />
          <ResultCard label="Total Payment" value={formatCurrency(totalPayment)} />
          <ResultCard label="Total Interest" value={formatCurrency(totalInterest)} />
        </div>

        {/* Savings banner — only shown when extra payment is active */}
        {extraPayment > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Interest Saved</p>
              <p className="text-xl font-bold text-emerald-700">{formatCurrency(interestSaved)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Months Saved</p>
              <p className="text-xl font-bold text-emerald-700">{monthsSaved} mo</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Paid Off In</p>
              <p className="text-xl font-bold text-emerald-700">
                {Math.floor(paidOffIn / 12)}y {paidOffIn % 12}m
              </p>
            </div>
          </div>
        )}

        {/* Chart */}
        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Amortization Over Time</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={55} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Legend />
              <Area type="monotone" dataKey="Balance" stroke="#0F172A" fill="#e2e8f0" strokeWidth={2} />
              <Area type="monotone" dataKey="Principal" stroke="#10B981" fill="#d1fae5" strokeWidth={2} />
              <Area type="monotone" dataKey="Interest" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario comparison */}
        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Compare Loan Terms</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-4 font-medium">Term</th>
                  <th className="pb-2 pr-4 font-medium">Monthly Payment</th>
                  <th className="pb-2 pr-4 font-medium">Total Interest</th>
                  <th className="pb-2 font-medium">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr
                    key={s.term}
                    className={`border-b border-slate-100 transition-colors ${s.term === termYears ? 'bg-emerald-50 font-semibold' : 'hover:bg-white'}`}
                  >
                    <td className="py-2 pr-4">
                      {s.term} yr
                      {s.term === termYears && (
                        <span className="ml-2 text-[10px] bg-[#10B981] text-white px-1.5 py-0.5 rounded-full">selected</span>
                      )}
                    </td>
                    <td className="py-2 pr-4">{formatCurrency(s.payment)}</td>
                    <td className="py-2 pr-4 text-amber-600">{formatCurrency(s.totalInterest)}</td>
                    <td className="py-2">{formatCurrency(s.totalPayment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Amortization table */}
        <div className="bg-slate-50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[#0F172A] text-sm">Amortization Schedule</h2>
            <PrintButton />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-4 font-medium">Month</th>
                  <th className="pb-2 pr-4 font-medium">Payment</th>
                  <th className="pb-2 pr-4 font-medium">Principal</th>
                  <th className="pb-2 pr-4 font-medium">Interest</th>
                  <th className="pb-2 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {(showFullTable ? amortization : amortization.slice(0, 24)).map((row) => (
                  <tr key={row.month} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-1.5 pr-4 text-slate-500">{row.month}</td>
                    <td className="py-1.5 pr-4 text-slate-700">{formatCurrency(row.payment)}</td>
                    <td className="py-1.5 pr-4 text-[#10B981] font-medium">{formatCurrency(row.principal)}</td>
                    <td className="py-1.5 pr-4 text-amber-600">{formatCurrency(row.interest)}</td>
                    <td className="py-1.5 text-slate-700">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {amortization.length > 24 && (
            <button
              onClick={() => setShowFullTable(!showFullTable)}
              className="mt-3 text-sm text-[#10B981] hover:underline font-medium cursor-pointer"
            >
              {showFullTable ? 'Show less ↑' : `Show all ${amortization.length} months ↓`}
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
      <div className={`text-xs font-medium uppercase tracking-wide mb-1 ${highlight ? 'text-[#10B981]' : 'text-slate-500'}`}>
        {label}
      </div>
      <div className={`text-xl font-bold truncate ${highlight ? 'text-white' : 'text-[#0F172A]'}`}>{value}</div>
    </div>
  )
}