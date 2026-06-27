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
  title: 'Simu-Immo — Simulateur Cashflow Locatif',
  description: 'Calculez le cashflow de votre investissement locatif. Règle bancaire 70%, HCSF 35%, export Excel/PDF.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${dmMono.variable} ${unbounded.variable}`}>
      <body className="min-h-screen bg-[#080a0f] text-[#e8e4dc] font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
