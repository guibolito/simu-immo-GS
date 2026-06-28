'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubscribePage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
      else setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#080a0f' }}>
      <div className="w-full max-w-sm text-center">
        <div className="font-semibold text-2xl mb-8" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>
          AKAD<span style={{ color: '#b8f040' }}>IMMO</span>
        </div>

        <div className="rounded-2xl p-8" style={{ background: '#0e1118', border: '1px solid rgba(184,240,64,0.2)' }}>
          <div className="text-4xl mb-4">🏡</div>
          <h1 className="font-bold text-xl mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
            Accès complet
          </h1>
          <div className="text-4xl font-black mb-1" style={{ fontFamily: 'var(--font-display)', color: '#b8f040' }}>
            10 €<span className="text-lg font-normal text-white/40">/mois</span>
          </div>
          <p className="text-sm mb-6" style={{ color: 'rgba(232,228,220,0.5)' }}>Sans engagement · Annulez à tout moment</p>

          <ul className="text-sm text-left space-y-2 mb-7" style={{ color: 'rgba(232,228,220,0.7)' }}>
            {['Simulateur cashflow illimité', 'Règle bancaire 70% + HCSF', 'Export Excel & PDF', 'Scénarios comparatifs', 'Sauvegarde des simulations'].map(f => (
              <li key={f} className="flex items-center gap-2">
                <span style={{ color: '#b8f040' }}>✓</span> {f}
              </li>
            ))}
          </ul>

          <button onClick={handleSubscribe} disabled={loading} className="w-full py-3 rounded-xl font-bold text-sm transition-all" style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display)', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Redirection...' : 'S\'abonner maintenant →'}
          </button>
        </div>

        <button onClick={() => router.push('/')} className="mt-4 text-xs" style={{ color: 'rgba(232,228,220,0.3)' }}>
          ← Retour à l'accueil
        </button>
      </div>
    </div>
  )
}
