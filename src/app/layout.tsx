import type { Metadata } from 'next'
import { DM_Mono, Unbounded } from 'next/font/google'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://akad-immo.fr'),
  title: 'AKADIMMO — Simulateur Cashflow Locatif',
  description: 'Calculez le cashflow de votre investissement locatif en temps réel. Règle bancaire 70%, HCSF 35%, export Excel/PDF.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'AKADIMMO — Simulateur Cashflow Locatif',
    description: 'Calculez le cashflow de votre investissement locatif. Règle bancaire 70%, HCSF 35%, export Excel/PDF.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AKADIMMO — Simulateur Cashflow Locatif',
    description: 'Calculez le cashflow de votre investissement locatif.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${dmMono.variable} ${unbounded.variable}`}>
      <body style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', margin: 0 }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
