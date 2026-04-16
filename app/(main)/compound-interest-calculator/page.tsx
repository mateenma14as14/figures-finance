import type { Metadata } from 'next'
import CompoundInterestCalculator from './CompoundInterestCalculator'

export const metadata: Metadata = {
  title: 'Compound Interest Calculator',
  description:
    'Calculate how your savings grow over time with compound interest. See the impact of contributions, interest rate, and compounding frequency on your final balance.',
  openGraph: {
    title: 'Compound Interest Calculator | Figures.Finance',
    description:
      'Free compound interest calculator with growth chart. See your investment grow over time.',
    url: 'https://figures.finance/compound-interest-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is compound interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, compounding causes your balance to grow exponentially over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should interest compound for the best returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The more frequently interest compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than annually. However, the difference between daily and monthly compounding is usually small in practice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Rule of 72?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by the annual interest rate: at 6% per year, your money doubles in roughly 12 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do regular contributions affect compound growth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Regular contributions dramatically accelerate wealth building. Each contribution immediately starts earning compound interest, so adding money consistently — even small amounts — has a large impact on your final balance thanks to the time value of money.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is compound interest good for savings but bad for debt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exactly. When you save or invest, compound interest works in your favour, growing your wealth faster. When you carry debt (like a credit card), compound interest works against you, making the debt more expensive the longer it goes unpaid.',
      },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I use for long-term investments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For long-term stock market investments, many financial planners use 7–8% annually (the historical average real return of the S&P 500 after inflation). Conservative estimates use 4–5%. Always stress-test your plans with a lower rate.',
      },
    },
  ],
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Compound Interest Calculator',
  url: 'https://figures.finance/compound-interest-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function CompoundInterestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">
          Compound Interest Calculator
        </h1>
        <p className="text-slate-500 mb-8 text-base">
          See how your money grows over time with the power of compounding.
          Add regular contributions to supercharge your results.
        </p>

        <CompoundInterestCalculator />

        {/* SEO content */}
        <article className="mt-16">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            Understanding Compound Interest
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Compound interest is one of the most powerful forces in personal finance.
            Unlike simple interest — which is only calculated on the original principal —
            compound interest is calculated on both the principal and the interest
            already earned. This means your balance grows faster and faster as time
            passes, a phenomenon often called the "snowball effect."
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The key variables that determine your final balance are: your initial
            deposit (principal), the annual interest rate, how frequently the interest
            compounds (daily, monthly, or annually), whether you make regular
            contributions, and most importantly — how long you leave the money to grow.
            Time is the most powerful ingredient in compound growth.
          </p>

          {/* In-content ad */}
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">
            Ad · in-content
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            Consider two investors: one starts at age 25 and invests $5,000 per year
            for 10 years, then stops. The other waits until age 35 and invests $5,000
            per year for 30 years. Assuming a 7% annual return, the early starter ends
            up with more money at retirement — despite contributing far less total
            capital. This illustrates why starting early matters enormously.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Use this calculator to model your savings goals, compare contribution
            strategies, or see how changing your interest rate assumption affects
            long-term outcomes. Whether you are planning for retirement, a home deposit,
            or an emergency fund, understanding compound growth helps you make
            smarter financial decisions today.
          </p>
        </article>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((q) => (
              <div key={q.name} className="border border-slate-200 rounded-lg p-5">
                <h3 className="font-semibold text-[#0F172A] mb-2">{q.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {q.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Also try */}
        <section className="mt-12 bg-slate-50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#0F172A] mb-4">Also Try</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/mortgage-calculator"
              className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Mortgage Calculator →
            </a>
          </div>
        </section>
      </div>
    </>
  )
}