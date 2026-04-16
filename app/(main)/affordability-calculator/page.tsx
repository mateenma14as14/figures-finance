import type { Metadata } from 'next'
import AffordabilityCalculator from './AffordabilityCalculator'

export const metadata: Metadata = {
  title: 'How Much House Can I Afford? — Mortgage Affordability Calculator',
  description: 'Find out how much house you can afford based on your income, debts, and down payment. Uses the 28/36 rule and shows conservative, standard, and aggressive scenarios.',
  openGraph: {
    title: 'Mortgage Affordability Calculator | Figures.Finance',
    description: 'How much house can you afford? Calculate your maximum home price instantly.',
    url: 'https://figures.finance/affordability-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much house can I afford on my salary?', acceptedAnswer: { '@type': 'Answer', text: 'A common guideline is to spend no more than 28% of your gross monthly income on housing costs (principal, interest, taxes, and insurance). On an $8,000/month income, that is $2,240/month. Use the calculator above to get a personalised figure based on your debts, down payment, and local rates.' } },
    { '@type': 'Question', name: 'What is the 28/36 rule?', acceptedAnswer: { '@type': 'Answer', text: 'The 28/36 rule says your monthly housing costs should not exceed 28% of your gross income (front-end ratio), and your total monthly debt payments (housing + all other debts) should not exceed 36% of gross income (back-end ratio). Lenders use these benchmarks to assess risk.' } },
    { '@type': 'Question', name: 'What is a debt-to-income (DTI) ratio?', acceptedAnswer: { '@type': 'Answer', text: 'DTI is your total monthly debt payments divided by your gross monthly income. Most lenders require a DTI of 43% or below to qualify for a mortgage. A lower DTI usually means better interest rates and more loan options.' } },
    { '@type': 'Question', name: 'Does a higher down payment let me afford a more expensive home?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A larger down payment reduces the loan amount, which reduces your monthly payment. This means a larger loan — and therefore a higher-priced home — can still fit within your monthly budget. It also helps you avoid PMI if you put down 20% or more.' } },
    { '@type': 'Question', name: 'What other costs should I budget for when buying a home?', acceptedAnswer: { '@type': 'Answer', text: 'Beyond principal and interest, budget for: property taxes (0.5–2.5% of home value annually), homeowners insurance (~$1,200/yr on average), PMI if down payment is under 20% (~0.5–1.5% of loan annually), HOA fees if applicable, and closing costs (typically 2–5% of the purchase price).' } },
    { '@type': 'Question', name: 'How does my credit score affect how much I can borrow?', acceptedAnswer: { '@type': 'Answer', text: 'A higher credit score qualifies you for lower interest rates, which means a lower monthly payment for the same loan amount — or a larger loan for the same payment. Borrowers with scores above 760 typically get the best rates. A score below 620 may make it difficult to qualify for a conventional mortgage.' } },
  ],
}

export default function AffordabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Mortgage Affordability Calculator', url: 'https://figures.finance/affordability-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">How Much House Can I Afford?</h1>
        <p className="text-slate-500 mb-8">Enter your income, debts, and down payment to find your maximum home price — using the same 28/36 rule lenders use.</p>
        <AffordabilityCalculator />
        <article className="mt-16 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F172A]">Understanding Mortgage Affordability</h2>
          <p>Knowing how much house you can afford before you start looking saves time and prevents the disappointment of falling in love with a home outside your budget. This calculator works backwards from your income and debts — rather than starting with a home price and working out the payment, it tells you the maximum price you can realistically afford.</p>
          <p>The calculation uses the industry-standard 28/36 rule. Your front-end ratio (housing costs as a percentage of income) should stay at or below 28%. Your back-end ratio (all debt payments including housing as a percentage of income) should stay at or below 36–43%. The calculator enforces both constraints and uses whichever is more limiting.</p>
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">Ad · in-content</div>
          <p>The scenario comparison table shows three price points — conservative (25% of income), standard (28%), and aggressive (33%). Many buyers can technically qualify for the aggressive scenario, but it leaves less room for other financial goals like saving for retirement, handling unexpected repairs, or managing lifestyle changes. Most financial planners recommend targeting the conservative or standard scenario.</p>
          <p>Remember that this calculator shows the maximum you can afford — not necessarily the amount you should spend. A smaller mortgage means less financial stress, more flexibility, and faster wealth building. Once you know your maximum, use our Mortgage Calculator to model the exact monthly payment for any specific home price.</p>
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
            <a href="/mortgage-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Mortgage Calculator →</a>
            <a href="/loan-repayment-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Loan Repayment Calculator →</a>
          </div>
        </section>
      </div>
    </>
  )
}