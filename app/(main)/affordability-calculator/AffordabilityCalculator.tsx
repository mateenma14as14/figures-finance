'use client'

import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import InputField from '@/components/InputField'

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function calcAffordability(
  monthlyIncome: number,
  monthlyDebts: number,
  downPayment: number,
  interestRate: number,
  termYears: number,
  propertyTax: number,
  insurance: number,
) {
  // Standard: housing costs ≤ 28% gross income, total debt ≤ 36%
  const maxHousingPayment = monthlyIncome * 0.28
  const maxTotalDebt = monthlyIncome * 0.36
  const maxByTotalDebt = maxTotalDebt - monthlyDebts

  // The binding constraint
  const maxPIPayment = Math.max(0, Math.min(maxHousingPayment, maxByTotalDebt) - propertyTax - insurance)

  // Reverse mortgage formula: PV from payment
  const r = interestRate / 100 / 12
  const n = termYears * 12
  let maxLoan = 0
  if (r === 0) {
    maxLoan = maxPIPayment * n
  } else {
    maxLoan = maxPIPayment * (1 - Math.pow(1 + r, -n)) / r
  }

  const maxHomePrice = Math.max(0, maxLoan + downPayment)
  const actualPayment = Math.min(maxHousingPayment, maxByTotalDebt)
  const frontEndRatio = monthlyIncome > 0 ? (actualPayment / monthlyIncome) * 100 : 0
  const backEndRatio = monthlyIncome > 0 ? ((actualPayment + monthlyDebts) / monthlyIncome) * 100 : 0

  // Scenario table: conservative / standard / aggressive
  const scenarios = [
    { label: 'Conservative', pct: 0.25, description: '25% of income' },
    { label: 'Standard', pct: 0.28, description: '28% of income (guideline)' },
    { label: 'Aggressive', pct: 0.33, description: '33% of income' },
  ].map(({ label, pct, description }) => {
    const pmt = Math.max(0, monthlyIncome * pct - propertyTax - insurance)
    const loan = r === 0 ? pmt * n : pmt * (1 - Math.pow(1 + r, -n)) / r
    return { label, description, maxHome: Math.max(0, loan + downPayment), monthlyPayment: monthlyIncome * pct }
  })

  return { maxHomePrice, maxPIPayment, actualPayment, frontEndRatio, backEndRatio, scenarios }
}

export default function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(8000)
  const [monthlyDebts, setMonthlyDebts] = useState(400)
  const [downPayment, setDownPayment] = useState(60000)
  const [interestRate, setInterestRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)
  const [propertyTax, setPropertyTax] = useState(250)
  const [insurance, setInsurance] = useState(100)

  const { maxHomePrice, actualPayment, frontEndRatio, backEndRatio, scenarios } = useMemo(
    () => calcAffordability(monthlyIncome, monthlyDebts, downPayment, interestRate, termYears, propertyTax, insurance),
    [monthlyIncome, monthlyDebts, downPayment, interestRate, termYears, propertyTax, insurance]
  )

  const downPct = maxHomePrice > 0 ? ((downPayment / maxHomePrice) * 100).toFixed(1) : '0'

  const chartData = scenarios.map(s => ({
    name: s.label,
    'Max Home Price': Math.round(s.maxHome),
  }))

  const dtiOk = backEndRatio <= 43
  const frontOk = frontEndRatio <= 28

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Inputs */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Your Finances</h3>
          <InputField label="Gross Monthly Income" prefix="$" value={monthlyIncome} onChange={setMonthlyIncome}
            min={1000} max={100000} step={500} slider
            tooltip="Your total monthly income before taxes. Use combined income if buying with a partner." />
          <InputField label="Monthly Debt Payments" prefix="$" value={monthlyDebts} onChange={setMonthlyDebts}
            min={0} max={20000} step={100} slider
            tooltip="Total of all existing monthly debt payments — car loans, student loans, credit card minimums, etc. Do not include rent." />
          <InputField label="Down Payment" prefix="$" value={downPayment} onChange={setDownPayment}
            min={0} max={1000000} step={5000} slider
            tooltip="The cash you have available for a down payment. A larger down payment means a smaller loan and lower monthly payments." />
        </div>
        <div className="bg-slate-50 rounded-xl p-5 space-y-5">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Loan Details</h3>
          <InputField label="Interest Rate" suffix="%" value={interestRate} onChange={setInterestRate}
            min={0.1} max={20} step={0.1} decimals={1} slider
            tooltip="The annual interest rate you expect to qualify for. Your credit score, loan type, and market conditions all affect this." />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Loan Term</label>
            <select className="w-full border border-slate-300 bg-white rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              value={termYears} onChange={(e) => setTermYears(Number(e.target.value))}>
              {[10, 15, 20, 25, 30].map(y => <option key={y} value={y}>{y} years</option>)}
            </select>
          </div>
          <InputField label="Monthly Property Tax" prefix="$" value={propertyTax} onChange={setPropertyTax}
            min={0} max={5000} step={25} slider
            tooltip="Estimated monthly property tax. In the US this averages around $250–$500/mo but varies widely by location." />
          <InputField label="Monthly Insurance" prefix="$" value={insurance} onChange={setInsurance}
            min={0} max={2000} step={25} slider
            tooltip="Homeowners insurance costs around $80–$150/mo on average. Your lender will require this." />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2 space-y-5">
        {/* Main result */}
        <div className="bg-[#0F172A] rounded-xl p-6">
          <p className="text-[#10B981] text-xs font-bold uppercase tracking-wide mb-1">You Can Afford Up To</p>
          <p className="text-4xl font-extrabold text-white mb-3">{formatCurrency(maxHomePrice)}</p>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Max Monthly Payment</p>
              <p className="text-white font-semibold">{formatCurrency(actualPayment)}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Down Payment</p>
              <p className="text-white font-semibold">{formatCurrency(downPayment)} ({downPct}%)</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs mb-0.5">Loan Amount</p>
              <p className="text-white font-semibold">{formatCurrency(Math.max(0, maxHomePrice - downPayment))}</p>
            </div>
          </div>
        </div>

        {/* DTI indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`rounded-xl p-4 border ${frontOk ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-slate-600">Front-End Ratio</p>
            <p className={`text-2xl font-bold ${frontOk ? 'text-emerald-700' : 'text-amber-700'}`}>{frontEndRatio.toFixed(1)}%</p>
            <p className={`text-xs mt-1 ${frontOk ? 'text-emerald-600' : 'text-amber-600'}`}>
              {frontOk ? '✓ Under 28% guideline' : '⚠ Above 28% guideline'}
            </p>
          </div>
          <div className={`rounded-xl p-4 border ${dtiOk ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-1 text-slate-600">Back-End Ratio (DTI)</p>
            <p className={`text-2xl font-bold ${dtiOk ? 'text-emerald-700' : 'text-amber-700'}`}>{backEndRatio.toFixed(1)}%</p>
            <p className={`text-xs mt-1 ${dtiOk ? 'text-emerald-600' : 'text-amber-600'}`}>
              {dtiOk ? '✓ Under 43% lender limit' : '⚠ Most lenders require below 43%'}
            </p>
          </div>
        </div>

        {/* Scenario chart */}
        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-4 text-sm">Price Range by Spending Level</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={48}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} width={60} />
              <Tooltip formatter={(v) => typeof v === 'number' ? formatCurrency(v) : v} />
              <Bar dataKey="Max Home Price" fill="#10B981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Scenario table */}
        <div className="bg-slate-50 rounded-xl p-5">
          <h2 className="font-semibold text-[#0F172A] mb-3 text-sm">Scenario Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200">
                  <th className="pb-2 pr-4 font-medium">Scenario</th>
                  <th className="pb-2 pr-4 font-medium">Monthly Budget</th>
                  <th className="pb-2 font-medium">Max Home Price</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.label} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-2 pr-4">
                      <span className="font-medium text-slate-700">{s.label}</span>
                      <span className="text-slate-400 text-xs ml-2">{s.description}</span>
                    </td>
                    <td className="py-2 pr-4 text-[#10B981] font-medium">{formatCurrency(s.monthlyPayment)}</td>
                    <td className="py-2 font-semibold text-[#0F172A]">{formatCurrency(s.maxHome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">Scenarios assume the same down payment, interest rate, and loan term. Tax and insurance are included in monthly payment calculations.</p>
        </div>
      </div>
    </div>
  )
}