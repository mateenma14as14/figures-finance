'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Home, TrendingUp, CreditCard, PiggyBank, Target, Briefcase, Calculator, ChevronDown } from 'lucide-react'

const calculators = [
  { href: '/mortgage-calculator', label: 'Mortgage Calculator', Icon: Home },
  { href: '/affordability-calculator', label: 'Affordability Calculator', Icon: Calculator },
  { href: '/compound-interest-calculator', label: 'Compound Interest', Icon: TrendingUp },
  { href: '/loan-repayment-calculator', label: 'Loan Repayment', Icon: Briefcase },
  { href: '/savings-goal-calculator', label: 'Savings Goal', Icon: Target },
  { href: '/credit-card-payoff-calculator', label: 'Credit Card Payoff', Icon: CreditCard },
  { href: '/retirement-calculator', label: 'Retirement', Icon: PiggyBank },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="bg-[#0F172A] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
          <span className="text-[#10B981] font-bold text-xl">Figures</span>
          <span className="text-white font-bold text-xl">.Finance</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 text-slate-300 hover:text-[#10B981] transition-colors text-sm font-medium cursor-pointer"
            >
              Calculators
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                {calculators.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 hover:text-[#10B981] transition-colors text-sm"
                  >
                    <Icon className="w-4 h-4 text-[#10B981]" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-slate-300 hover:text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-slate-700 px-4 py-3 flex flex-col gap-1">
          {calculators.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 text-slate-300 hover:text-[#10B981] transition-colors text-sm font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}