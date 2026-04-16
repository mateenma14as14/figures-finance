'use client'

import { useState } from 'react'
import { Home, TrendingUp, Briefcase, Target, CreditCard, PiggyBank, Calculator } from 'lucide-react'
import MortgageCalculator from '@/app/(main)/mortgage-calculator/MortgageCalculator'
import CompoundInterestCalculator from '@/app/(main)/compound-interest-calculator/CompoundInterestCalculator'
import LoanRepaymentCalculator from '@/app/(main)/loan-repayment-calculator/LoanRepaymentCalculator'
import SavingsGoalCalculator from '@/app/(main)/savings-goal-calculator/SavingsGoalCalculator'
import CreditCardPayoffCalculator from '@/app/(main)/credit-card-payoff-calculator/CreditCardPayoffCalculator'
import RetirementCalculator from '@/app/(main)/retirement-calculator/RetirementCalculator'
import AffordabilityCalculator from '@/app/(main)/affordability-calculator/AffordabilityCalculator'

const tabs = [
  { id: 'mortgage',       label: 'Mortgage',          Icon: Home },
  { id: 'affordability',  label: 'Affordability',     Icon: Calculator },
  { id: 'compound',       label: 'Compound Interest', Icon: TrendingUp },
  { id: 'loan',           label: 'Loan Repayment',    Icon: Briefcase },
  { id: 'savings',        label: 'Savings Goal',      Icon: Target },
  { id: 'credit',         label: 'Credit Card',       Icon: CreditCard },
  { id: 'retirement',     label: 'Retirement',        Icon: PiggyBank },
] as const

type TabId = (typeof tabs)[number]['id']

export default function HomeCalculators() {
  const [active, setActive] = useState<TabId>('mortgage')

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      {/* Tabs — scrollable on mobile */}
      <div className="flex overflow-x-auto border-b border-slate-200 scrollbar-none justify-center">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors flex-shrink-0 cursor-pointer whitespace-nowrap
              ${active === id
                ? 'text-[#10B981] border-b-2 border-[#10B981] bg-white'
                : 'text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100'
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Calculator */}
      <div className="bg-slate-50 p-4 md:p-6">
        {active === 'mortgage'      && <MortgageCalculator />}
        {active === 'affordability' && <AffordabilityCalculator />}
        {active === 'compound'      && <CompoundInterestCalculator />}
        {active === 'loan'          && <LoanRepaymentCalculator />}
        {active === 'savings'       && <SavingsGoalCalculator />}
        {active === 'credit'        && <CreditCardPayoffCalculator />}
        {active === 'retirement'    && <RetirementCalculator />}
      </div>
    </div>
  )
}