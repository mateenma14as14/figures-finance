import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://figures.finance'),
  title: {
    default: 'Figures.Finance – Run the numbers. Make better decisions.',
    template: '%s | Figures.Finance',
  },
  description:
    'Free financial calculators for mortgage, compound interest, and more. Built for the USA, UK, Canada, and Australia.',
  openGraph: {
    siteName: 'Figures.Finance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','GA_MEASUREMENT_ID');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}