import type { Metadata } from 'next'
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator'

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator',
  description: 'See exactly how long it takes to pay off your credit card and how much interest you will pay. Compare your payment against the minimum to see how much you save.',
  openGraph: {
    title: 'Credit Card Payoff Calculator | Figures.Finance',
    description: 'Find out how long to pay off your credit card and how much interest you can save.',
    url: 'https://figures.finance/credit-card-payoff-calculator',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does credit card interest work?', acceptedAnswer: { '@type': 'Answer', text: 'Credit card interest is calculated daily based on your APR divided by 365. At the end of each billing cycle the daily interest charges are added to your balance. If you carry a balance month to month, you pay interest on interest — making it expensive to only pay the minimum.' } },
    { '@type': 'Question', name: 'What is the minimum payment on a credit card?', acceptedAnswer: { '@type': 'Answer', text: 'Minimum payments are typically 1–2% of your outstanding balance or a fixed amount (e.g. $25), whichever is greater. Paying only the minimum means it can take decades and cost thousands in interest to pay off even a modest balance.' } },
    { '@type': 'Question', name: 'How much faster do I pay off a card by paying double the minimum?', acceptedAnswer: { '@type': 'Answer', text: 'Doubling your minimum payment can cut your payoff time by 50% or more and save a significant amount in interest. Use the calculator above to see the exact difference for your balance and APR.' } },
    { '@type': 'Question', name: 'Should I pay off my highest interest card first?', acceptedAnswer: { '@type': 'Answer', text: 'The avalanche method — paying off the highest-APR card first — saves the most money in interest. The snowball method — paying the smallest balance first — provides quicker psychological wins. Either works; the key is picking one and sticking to it.' } },
    { '@type': 'Question', name: 'What is a balance transfer and does it help?', acceptedAnswer: { '@type': 'Answer', text: 'A balance transfer moves your debt to a new card, often with a 0% introductory APR for 12–21 months. This can save significant interest if you pay off the balance before the promotional period ends. Watch for balance transfer fees (typically 3–5%).' } },
    { '@type': 'Question', name: 'How do I stop credit card debt from growing?', acceptedAnswer: { '@type': 'Answer', text: 'Stop adding new charges to the card, pay more than the minimum every month, and consider a balance transfer to a 0% APR card. Creating a budget and an emergency fund reduces the need to rely on credit cards for unexpected expenses.' } },
  ],
}

export default function CreditCardPayoffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-2">Credit Card Payoff Calculator</h1>
        <p className="text-slate-500 mb-8">Enter your balance, APR, and monthly payment to see exactly when you will be debt-free and how much interest you will pay.</p>
        <CreditCardPayoffCalculator />
        <article className="mt-16 space-y-4 text-slate-600 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0F172A]">Why Paying More Than the Minimum Matters</h2>
          <p>Credit card debt is one of the most expensive forms of borrowing, with average APRs in the US exceeding 22%. When you only pay the minimum, most of your payment goes toward interest, and your balance barely moves. On a $5,000 balance at 22% APR, paying only the minimum could take over 20 years and cost more than $7,000 in interest alone.</p>
          <p>This calculator shows you the full picture instantly. The amber warning panel at the top shows what happens if you only pay the minimum — and the green savings banner shows exactly how much time and money you save by paying your chosen amount instead.</p>
          <div className="my-6 w-full bg-slate-100 border border-dashed border-slate-300 rounded flex items-center justify-center text-slate-400 text-xs h-24">Ad · in-content</div>
          <p>A practical strategy: find a monthly payment you can afford, set it up as an automatic payment, and never drop below that amount. As your balance falls, your required minimum will too — but keep your payment fixed and you will pay off the debt much faster.</p>
          <p>If your APR is very high (above 20%), consider whether a balance transfer to a 0% card makes sense. Our calculator assumes a fixed APR, so run your numbers again after a transfer to see the new payoff timeline.</p>
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
            <a href="/loan-repayment-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Loan Repayment Calculator →</a>
            <a href="/savings-goal-calculator" className="inline-block bg-white border border-slate-200 hover:border-[#10B981] text-slate-700 hover:text-[#10B981] px-4 py-2 rounded-lg text-sm font-medium transition-colors">Savings Goal Calculator →</a>
          </div>
        </section>
      </div>
    </>
  )
}