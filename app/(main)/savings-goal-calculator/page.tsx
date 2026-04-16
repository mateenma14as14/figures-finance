import type { Metadata } from 'next'
import SavingsGoalCalculator from './SavingsGoalCalculator'

export const metadata: Metadata = {
  title: 'Savings Goal Calculator',
  description: 'Find out exactly how long it will take to reach your savings goal. Enter your target, current savings, monthly contribution, and interest rate to get your timeline.',
  openGraph: {
    title: 'Savings Goal Calculator | Figures.Finance',
    description: 'How long to reach your savings goal? Calculate your timeline instantly.',
    url: 'https://figures.finance/savings-goal-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long will it take to save a specific amount?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on how much you start with, how much you add each month, and the interest rate your savings earn. Use this calculator to get an exact timeline based on your numbers.' } },
    { '@type': 'Question', name: 'What interest rate should I use for a savings account?', acceptedAnswer: { '@type': 'Answer', text: 'High-yield savings accounts in the US currently offer around 4–5% APY. Standard savings accounts often pay less than 1%. For long-term investing in index funds, a historical average of 7% is commonly used.' } },
    { '@type': 'Question', name: 'Is it better to increase my monthly savings or find a higher interest rate?', acceptedAnswer: { '@type': 'Answer', text: 'For shorter goals (under 5 years), increasing your monthly contribution has a bigger impact than chasing a higher rate. For longer goals (10+ years), the interest rate becomes increasingly important due to compounding.' } },
    { '@type': 'Question', name: 'What is a realistic savings goal for an emergency fund?', acceptedAnswer: { '@type': 'Answer', text: 'Financial planners generally recommend 3–6 months of living expenses. If your monthly expenses are $3,000, aim for $9,000–$18,000 in an easily accessible savings account.' } },
    { '@type': 'Question', name: 'Should I save or pay off debt first?', acceptedAnswer: { '@type': 'Answer', text: 'A common approach: first build a small emergency fund ($1,000), then aggressively pay off high-interest debt (credit cards), then resume building your full emergency fund, then invest. The order matters because high-interest debt costs more than savings earn.' } },
    { '@type': 'Question', name: 'How does compound interest help my savings?', acceptedAnswer: { '@type': 'Answer', text: 'Compound interest means you earn interest on your interest. Over time this creates exponential growth. The longer your money compounds, the more powerful the effect — which is why starting early, even with small amounts, is so valuable.' } },
  ],
}

export default function SavingsGoalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">Savings Goal Calculator</h1>
        <p className="text-slate-500 mb-8">Enter your target, current savings, and monthly contribution to find out exactly when you'll reach your goal.</p>
        <SavingsGoalCalculator />
        <article className="mt-16 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F172A]">Plan Your Savings with Confidence</h2>
          <p>Whether you are saving for a house deposit, a car, an emergency fund, or a holiday, knowing exactly when you will reach your target makes it far easier to stay on track. This calculator shows you a precise timeline based on your starting balance, monthly contributions, and the interest your savings will earn.</p>
          <p>The green dashed line on the chart marks your goal. Watch how quickly your balance crosses it as you increase your monthly contribution — the impact is often more dramatic than people expect. Even an extra $100 per month can shave months or years off your timeline.</p>
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">Ad · in-content</div>
          <p>Interest rate matters more the longer your timeframe. For a 12-month savings goal, the rate makes little difference. For a 10-year goal, choosing a high-yield account over a standard one could add thousands of dollars to your final balance. Shop around — online banks frequently offer rates several times higher than traditional banks.</p>
          <p>If you cannot reach your goal in a reasonable time, the calculator will tell you. Use that as a signal to either increase your contribution, extend your timeline, or adjust the goal itself. There is no wrong answer — just better information.</p>
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
            <a href="/retirement-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Retirement Calculator →</a>
          </div>
        </section>
      </div>
    </>
  )
}