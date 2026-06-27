import type { Metadata } from 'next'
import { DM_Mono, Unbounded } from 'next/font/google'
import './globals.css'

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
})
const unbounded = Unbounded({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'SimuImmo — Simulateur Cashflow Locatif',
  description: 'Calculez le cashflow de votre investissement locatif en temps réel. Règle bancaire 70%, HCSF 35%, export Excel/PDF.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'SimuImmo — Simulateur Cashflow Locatif',
    description: 'Calculez le cashflow de votre investissement locatif. Règle bancaire 70%, HCSF 35%, export Excel/PDF.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary',
    title: 'SimuImmo — Simulateur Cashflow Locatif',
    description: 'Calculez le cashflow de votre investissement locatif.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${dmMono.variable} ${unbounded.variable}`}>
      <body style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
