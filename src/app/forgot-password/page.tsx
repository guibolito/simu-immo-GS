'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'var(--font-mono, monospace)' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.04em', textDecoration: 'none', color: '#e8e4dc' }}>
            Simu<span style={{ color: '#b8f040' }}>Immo</span>
          </Link>
          <div style={{ fontSize: 13, color: 'rgba(232,228,220,0.5)', marginTop: 6 }}>Réinitialiser le mot de passe</div>
        </div>

        <div style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '1.75rem' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📬</div>
              <p style={{ color: 'rgba(232,228,220,0.7)', fontSize: 13, lineHeight: 1.7 }}>
                Un lien de réinitialisation a été envoyé à <strong style={{ color: '#e8e4dc' }}>{email}</strong>.<br />
                Vérifiez votre boîte mail (et vos spams).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: 12, color: 'rgba(232,228,220,0.5)', lineHeight: 1.6, marginBottom: '.25rem' }}>
                Entrez votre adresse email et nous vous enverrons un lien pour créer un nouveau mot de passe.
              </p>
              <div>
                <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(232,228,220,0.4)', display: 'block', marginBottom: 6 }}>Email</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="vous@email.com"
                  style={{ width: '100%', background: '#141820', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 14px', color: '#e8e4dc', fontSize: 13, outline: 'none' }}
                />
              </div>
              {error && <p style={{ color: '#f04060', fontSize: 12 }}>{error}</p>}
              <button type="submit" disabled={loading} style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: 12, padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
                {loading ? '...' : 'Envoyer le lien'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(232,228,220,0.35)', marginTop: '1.25rem' }}>
          <Link href="/login" style={{ color: '#b8f040', textDecoration: 'none' }}>← Retour à la connexion</Link>
        </p>
      </div>
    </div>
  )
}
