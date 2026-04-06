import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Groupe Scolaire Targa Junior - Marrakech',
  description: 'Groupe Scolaire Targa Junior - Maternelle, Primaire, Collège. Ensemble pour un meilleur avenir ! Ourida 3 Targa, Marrakech, Maroc.',
  keywords: 'école privée marrakech, targa junior, groupe scolaire, maternelle primaire collège',
  openGraph: {
    title: 'Groupe Scolaire Targa Junior - Marrakech',
    description: 'Groupe Scolaire Targa Junior - Maternelle, Primaire, Collège. Ensemble pour un meilleur avenir !',
    type: 'website',
    locale: 'fr_MA',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0891b2',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
