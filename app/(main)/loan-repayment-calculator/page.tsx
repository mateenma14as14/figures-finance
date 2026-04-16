import type { Metadata } from 'next'
import LoanRepaymentCalculator from './LoanRepaymentCalculator'

export const metadata: Metadata = {
  title: 'Loan Repayment Calculator',
  description: 'Calculate monthly repayments for any personal loan, car loan, or student loan. See total interest, full schedule, and find the best loan term for your budget.',
  openGraph: {
    title: 'Loan Repayment Calculator | Figures.Finance',
    description: 'Free loan repayment calculator — monthly payments, total interest, full schedule.',
    url: 'https://figures.finance/loan-repayment-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is a loan monthly payment calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Your monthly payment is calculated using the loan principal, the monthly interest rate (annual rate ÷ 12), and the total number of months. The formula ensures the loan is fully paid off by the last payment.' } },
    { '@type': 'Question', name: 'What is the difference between a personal loan and a mortgage?', acceptedAnswer: { '@type': 'Answer', text: 'A mortgage is secured against your property, which usually means lower interest rates and longer terms. A personal loan is unsecured, so it typically has higher rates and shorter terms (1–7 years).' } },
    { '@type': 'Question', name: 'Does a shorter loan term save money?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A shorter term means higher monthly payments but significantly less total interest paid. A longer term lowers your monthly payment but costs more overall.' } },
    { '@type': 'Question', name: 'What is a good interest rate for a personal loan?', acceptedAnswer: { '@type': 'Answer', text: 'Personal loan rates vary widely based on credit score and lender. In the US, rates typically range from 6% to 36%. Borrowers with excellent credit (720+) can often qualify for rates below 10%.' } },
    { '@type': 'Question', name: 'Can I pay off my loan early?', acceptedAnswer: { '@type': 'Answer', text: 'Most loans allow early repayment. Paying extra each month reduces your principal faster and saves interest. Some lenders charge an early repayment fee, so check your loan agreement.' } },
    { '@type': 'Question', name: 'What happens if I miss a loan payment?', acceptedAnswer: { '@type': 'Answer', text: 'Missing a payment typically results in a late fee, and after 30 days, it may be reported to credit bureaus, hurting your credit score. Contact your lender early if you are struggling — many offer hardship arrangements.' } },
  ],
}

export default function LoanRepaymentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Loan Repayment Calculator', url: 'https://figures.finance/loan-repayment-calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">Loan Repayment Calculator</h1>
        <p className="text-slate-500 mb-8">Enter your loan details to calculate your monthly payment and see how much interest you'll pay in total.</p>
        <LoanRepaymentCalculator />
        <article className="mt-16 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F172A]">How to Use This Loan Calculator</h2>
          <p>Whether you are financing a car, consolidating debt, or taking out a personal loan, this calculator helps you understand the true cost of borrowing. Enter the loan amount, the annual interest rate quoted by your lender, and your preferred loan term. Your monthly payment and total interest are calculated instantly.</p>
          <p>The loan term buttons let you quickly compare how different repayment periods affect your monthly payment and total cost. A 36-month loan has higher payments than a 72-month loan, but you pay far less interest overall. Use this trade-off view to find the term that fits your budget without overpaying.</p>
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">Ad · in-content</div>
          <p>The repayment schedule table shows exactly how much of each payment goes toward principal versus interest. Early payments are mostly interest; as the balance falls, a larger portion of each payment reduces what you owe. This is why paying even a small extra amount each month can significantly cut your total interest cost.</p>
          <p>This calculator works for personal loans, car loans, student loans, and any other fixed-rate instalment loan. For mortgages, use our dedicated Mortgage Calculator, which includes a down payment field and amortization chart.</p>
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
            <a href="/credit-card-payoff-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Credit Card Payoff Calculator →</a>
          </div>
        </section>
      </div>
    </>
  )
}