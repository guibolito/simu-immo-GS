import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/[0.07] px-10 py-6 flex justify-between items-center">
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.04em' }}>
          Simu<span style={{ color: '#b8f040' }}>Immo</span>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="text-sm px-4 py-2" style={{ color: 'rgba(232,228,220,0.6)' }}>
            Connexion
          </Link>
          <Link href="/login?mode=signup" className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors" style={{ background: '#b8f040', color: '#080a0f' }}>
            Commencer
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full tracking-widest uppercase" style={{ border: '1px solid rgba(184,240,64,0.3)', background: 'rgba(184,240,64,0.06)', color: '#b8f040' }}>
          10 € / mois · Sans engagement
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem,7vw,5rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }} className="max-w-3xl">
          Calculez votre<br /><span style={{ color: '#b8f040' }}>cashflow locatif</span><br />en 30 secondes
        </h1>

        <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'rgba(232,228,220,0.6)' }}>
          Simulateur professionnel avec règle bancaire 70%, limite HCSF 35%,
          analyse de scénarios et export Excel/PDF.
        </p>

        <Link href="/login?mode=signup" className="font-semibold text-sm px-8 py-4 rounded-xl transition-all" style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display)' }}>
          Essayer maintenant →
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-w-3xl w-full text-left">
          {[
            { icon: '📊', title: 'Règle bancaire 70%', desc: "Calcul automatique de l'impact sur votre taux d'endettement selon les critères bancaires réels." },
            { icon: '🎯', title: 'Seuils de rentabilité', desc: 'Découvrez le prix maximum au m² pour atteindre votre objectif de cashflow.' },
            { icon: '📤', title: 'Export Excel & PDF', desc: 'Téléchargez vos simulations pour les partager avec votre banquier ou notaire.' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-5" style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-2xl mb-3">{f.icon}</div>
              <div className="font-semibold text-sm mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: 'rgba(232,228,220,0.5)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-white/[0.07] px-10 py-4 text-center text-xs" style={{ color: 'rgba(232,228,220,0.3)', background: '#0e1118' }}>
        SimuImmo · Simulateur cashflow locatif · Règle HCSF 35% · Frais notaire 7,5% ·{' '}
        <a href="/legal" style={{ color: 'rgba(232,228,220,0.4)', textDecoration: 'underline' }}>Mentions légales & CGU</a>
      </footer>
    </div>
  )
}
