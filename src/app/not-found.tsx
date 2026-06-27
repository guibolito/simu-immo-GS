import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono, monospace)', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontFamily: 'var(--font-display, sans-serif)', fontSize: 'clamp(4rem,15vw,8rem)', fontWeight: 800, color: '#b8f040', letterSpacing: '-0.06em', lineHeight: 1 }}>404</div>
      <p style={{ color: 'rgba(232,228,220,0.5)', fontSize: 14, marginTop: '1rem', marginBottom: '2rem' }}>
        Cette page n'existe pas.
      </p>
      <Link href="/" style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: 13, padding: '10px 24px', borderRadius: 10, textDecoration: 'none' }}>
        ← Retour à l'accueil
      </Link>
    </div>
  )
}
