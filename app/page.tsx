import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import HomeCalculators from '@/components/HomeCalculators'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Figures.Finance – Free Financial Calculators',
  description:
    'Free, accurate financial calculators for mortgage payments, compound interest, and more. Serving the USA, UK, Canada, and Australia.',
  openGraph: {
    title: 'Figures.Finance – Free Financial Calculators',
    description:
      'Run the numbers on your mortgage, investments, and more with our free financial calculators.',
    url: 'https://figures.finance',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F172A]">
      {/* Centered logo */}
      <div className="pt-12 pb-6 flex justify-center">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-[#10B981] font-bold text-3xl tracking-tight">Figures</span>
          <span className="text-white font-bold text-3xl tracking-tight">.Finance</span>
        </Link>
      </div>

      {/* Tabbed calculators */}
      <div className="flex-1 w-full px-[10px] pb-16">
        <HomeCalculators />
      </div>

      <Footer />
    </div>
  )
}