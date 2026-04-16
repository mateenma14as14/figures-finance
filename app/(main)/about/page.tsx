import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Figures.Finance — free, accurate financial calculators built to help people in the USA, UK, Canada, and Australia make better money decisions.',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold text-[#0F172A] mb-4">About Figures.Finance</h1>
      <p className="text-[#10B981] font-medium text-lg mb-10">Run the numbers. Make better decisions.</p>

      <div className="space-y-6 text-slate-600 leading-relaxed">
        <p>
          Figures.Finance is a free collection of financial calculators designed to
          help everyday people understand the numbers behind their biggest financial
          decisions — buying a home, investing for the future, and more.
        </p>
        <p>
          We built this site because financial calculations shouldn't be locked
          behind paywalls or cluttered with confusing jargon. Whether you're a
          first-time homebuyer in the United States, a saver in the United Kingdom,
          planning for retirement in Canada, or investing in Australia — the
          underlying maths is the same and everyone deserves access to clear,
          accurate tools.
        </p>
        <p>
          Every calculator on Figures.Finance runs entirely in your browser. We
          don't store your inputs, we don't require sign-up, and we never sell your
          data. Your financial information stays with you.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">Our Calculators</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/mortgage-calculator" className="text-[#10B981] hover:underline font-medium">
                Mortgage Calculator
              </Link>
              <span className="text-slate-500"> — Monthly payments, total interest, and amortization schedule.</span>
            </li>
            <li>
              <Link href="/compound-interest-calculator" className="text-[#10B981] hover:underline font-medium">
                Compound Interest Calculator
              </Link>
              <span className="text-slate-500"> — Visualise how savings and investments grow over time.</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">Disclaimer</h2>
          <p>
            The results provided by Figures.Finance calculators are for
            informational and educational purposes only. They are not financial
            advice. Always consult a qualified financial adviser before making
            significant financial decisions. Results are estimates only and may
            vary from actual figures provided by lenders, banks, or financial
            institutions.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">Contact</h2>
          <p>
            Have a question, suggestion, or calculator request? We'd love to hear
            from you.{' '}
            <a href="mailto:hello@figures.finance" className="text-[#10B981] hover:underline">
              hello@figures.finance
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}