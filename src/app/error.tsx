'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 'clamp(3rem,12vw,6rem)', fontWeight: 800, color: '#f04060', letterSpacing: '-0.06em', lineHeight: 1 }}>500</div>
      <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: 14, marginTop: '1rem', marginBottom: '2rem', maxWidth: 320, lineHeight: 1.6 }}>
        Une erreur inattendue s&apos;est produite. Réessayez ou revenez à l&apos;accueil.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: 13, padding: '10px 24px', borderRadius: 10, border: 'none', cursor: 'pointer' }}
        >
          Réessayer
        </button>
        <Link href="/" style={{ background: 'rgba(255,255,255,0.07)', color: '#e8e4dc', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: 13, padding: '10px 24px', borderRadius: 10, textDecoration: 'none' }}>
          ← Accueil
        </Link>
      </div>
    </div>
  )
}
