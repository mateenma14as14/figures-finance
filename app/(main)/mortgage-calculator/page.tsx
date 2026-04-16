import type { Metadata } from 'next'
import MortgageCalculator from './MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Calculator',
  description:
    'Calculate your monthly mortgage payment, total interest paid, and view a full amortization schedule. Works for USA, UK, Canada, and Australia.',
  openGraph: {
    title: 'Mortgage Calculator | Figures.Finance',
    description:
      'Free mortgage calculator with amortization table and chart. Calculate monthly payments instantly.',
    url: 'https://figures.finance/mortgage-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is a monthly mortgage payment calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your monthly payment is calculated using the principal loan amount, the annual interest rate divided by 12, and the total number of payments (loan term in years × 12). The formula accounts for compound interest so you pay more interest early in the loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an amortization schedule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An amortization schedule is a table showing every monthly payment for the life of the loan, broken down into principal and interest portions. Early payments are mostly interest; later payments shift toward principal.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a larger down payment lower my monthly payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A larger down payment reduces the loan amount (principal), which directly lowers your monthly payment and the total interest you pay over the life of the loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between interest rate and APR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The interest rate is the cost to borrow the principal. APR (Annual Percentage Rate) includes the interest rate plus fees and other costs, giving a more complete picture of the loan\'s true cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does loan term affect my payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A shorter loan term (e.g. 15 years vs 30 years) means higher monthly payments but significantly less total interest paid. A longer term lowers monthly payments but costs more in interest overall.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose a fixed or variable rate mortgage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fixed-rate mortgage locks in your interest rate for the entire term, giving predictable payments. A variable (adjustable) rate may start lower but can rise over time, introducing risk. Fixed rates suit buyers who value stability; variable rates may suit those planning to sell or refinance within a few years.',
      },
    },
  ],
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: 'https://figures.finance/mortgage-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function MortgageCalculatorPage() {
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
          Mortgage Calculator
        </h1>
        <p className="text-slate-500 mb-8 text-base">
          Enter your loan details below to calculate your monthly payment and
          view a full amortization schedule.
        </p>

        <MortgageCalculator />

        {/* SEO content */}
        <article className="mt-16 prose prose-slate max-w-none">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
            How to Use the Mortgage Calculator
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our mortgage calculator makes it easy to estimate your monthly home
            loan payment. Simply enter the home price, your down payment, the
            annual interest rate, and the loan term. The calculator instantly
            shows your monthly principal and interest payment, the total amount
            you will repay, and the total interest cost over the life of the
            loan.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The amortization chart lets you visualise how your loan balance
            decreases over time. In the early years, most of your payment goes
            toward interest. As time passes, a larger portion goes toward
            reducing the principal — this is the power of amortization working
            in your favour toward the end of the loan.
          </p>

          {/* In-content ad */}
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">
            Ad · in-content
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            Whether you are buying your first home in the United States, United
            Kingdom, Canada, or Australia, the core mortgage math is the same.
            The monthly payment formula uses the loan principal, the monthly
            interest rate (annual rate ÷ 12), and the total number of payments
            (years × 12). Use the amortization table below the chart to see
            exactly how much principal and interest you pay in any given month.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Keep in mind that your actual monthly housing cost will likely
            include property taxes, homeowners insurance, and possibly private
            mortgage insurance (PMI) if your down payment is below 20%. This
            calculator focuses on the principal and interest portion of your
            payment — the part determined by your loan terms.
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
              href="/compound-interest-calculator"
              className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Compound Interest Calculator →
            </a>
          </div>
        </section>
      </div>
    </>
  )
}