import Link from 'next/link'

const calculators = [
  { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
  { href: '/affordability-calculator', label: 'Affordability Calculator' },
  { href: '/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/loan-repayment-calculator', label: 'Loan Repayment Calculator' },
  { href: '/savings-goal-calculator', label: 'Savings Goal Calculator' },
  { href: '/credit-card-payoff-calculator', label: 'Credit Card Payoff Calculator' },
  { href: '/retirement-calculator', label: 'Retirement Calculator' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-[#10B981] font-bold text-lg">Figures</span>
            <span className="text-white font-bold text-lg">.Finance</span>
          </div>
          <p className="text-sm leading-relaxed">
            Run the numbers. Make better decisions. Free financial calculators
            for the USA, UK, Canada, and Australia.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Calculators</h3>
          <ul className="space-y-2">
            {calculators.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-sm hover:text-[#10B981] transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-sm hover:text-[#10B981] transition-colors">About</Link></li>
            <li><Link href="/privacy-policy" className="text-sm hover:text-[#10B981] transition-colors">Privacy Policy</Link></li>
            <li><a href="mailto:hello@figures.finance" className="text-sm hover:text-[#10B981] transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Figures.Finance. All rights reserved. For informational purposes only — not financial advice.
      </div>
    </footer>
  )
}