import type { Metadata } from 'next'
import RetirementCalculator from './RetirementCalculator'

export const metadata: Metadata = {
  title: 'Retirement Calculator',
  description: 'Calculate how much you will have at retirement and how long your savings will last. Model your savings growth and retirement income in one place.',
  openGraph: {
    title: 'Retirement Calculator | Figures.Finance',
    description: 'Free retirement calculator — project your savings, see how long your money lasts.',
    url: 'https://figures.finance/retirement-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much do I need to retire?', acceptedAnswer: { '@type': 'Answer', text: 'A common rule of thumb is to have 25 times your annual expenses saved by retirement (the "4% rule"). If you spend $60,000 per year, you need around $1.5 million. Use this calculator to model your specific situation.' } },
    { '@type': 'Question', name: 'What is the 4% rule?', acceptedAnswer: { '@type': 'Answer', text: 'The 4% rule states that you can withdraw 4% of your retirement portfolio in the first year, then adjust for inflation each year, and have a high probability of not running out of money over a 30-year retirement. It is a guideline, not a guarantee.' } },
    { '@type': 'Question', name: 'How much should I save for retirement each month?', acceptedAnswer: { '@type': 'Answer', text: 'A general guideline is to save 15% of your gross income for retirement, including any employer match. If you start later, you may need to save more. Use the calculator to find the monthly contribution that gets you to your goal.' } },
    { '@type': 'Question', name: 'What return rate should I assume for retirement savings?', acceptedAnswer: { '@type': 'Answer', text: 'A broadly diversified stock portfolio has historically returned around 7–10% annually before inflation. Many planners use 6–7% for conservative projections. For a post-retirement portfolio (more bonds), 3–5% is commonly used.' } },
    { '@type': 'Question', name: 'What is a 401(k) and how much can I contribute?', acceptedAnswer: { '@type': 'Answer', text: 'A 401(k) is a US employer-sponsored retirement account that lets you invest pre-tax dollars. The 2025 contribution limit is $23,500 ($31,000 if you are 50 or older). Many employers match a percentage of your contributions — always contribute enough to get the full match.' } },
    { '@type': 'Question', name: 'Should I use a traditional or Roth retirement account?', acceptedAnswer: { '@type': 'Answer', text: 'Traditional accounts (401k, IRA) give you a tax break now but you pay tax on withdrawals. Roth accounts are funded with after-tax money but withdrawals are tax-free. If you expect to be in a higher tax bracket in retirement, Roth is often better. When in doubt, diversify across both.' } },
  ],
}

export default function RetirementPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">Retirement Calculator</h1>
        <p className="text-slate-500 mb-8">Project how much you will have at retirement and see how long your savings will last based on your monthly withdrawal.</p>
        <RetirementCalculator />
        <article className="mt-16 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F172A]">Planning for a Comfortable Retirement</h2>
          <p>Retirement planning has two distinct phases: the accumulation phase (saving and growing your money before retirement) and the drawdown phase (spending that money in retirement). This calculator models both, so you can see not just how much you will have when you retire, but how long it will actually last.</p>
          <p>The savings growth chart shows how your contributions and investment returns combine over the years leading to retirement. The power of compounding means that the final years before retirement often contribute the most to your balance — which is why it pays to stay invested even when markets are volatile.</p>
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">Ad · in-content</div>
          <p>Switch to the "Retirement Income" view to see how long your savings last given your planned monthly withdrawal. If the balance hits zero before you expect to need it, the calculator will warn you — giving you time to adjust now rather than later. Common adjustments include increasing contributions, reducing planned withdrawals, or retiring slightly later.</p>
          <p>The withdrawal rate shown in the summary is one of the most important numbers in retirement planning. Financial planners widely consider a withdrawal rate of 4% or below to be sustainable over a 30-year retirement. If yours is higher, consider whether adjustments are needed.</p>
        </article>
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-slate-200 rounded-lg p-5">
                <h3 className="font-semibold text-[#0F172A] mb-2">{q.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-12 bg-slate-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Also Try</h2>
          <div className="flex flex-wrap gap-3">
            <a href="/compound-interest-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Compound Interest Calculator →</a>
            <a href="/savings-goal-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Savings Goal Calculator →</a>
          </div>
        </section>
      </div>
    </>
  )
}