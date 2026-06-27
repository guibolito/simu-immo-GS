'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase injecte la session depuis le lien email via le hash
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
      else setError('Lien expiré ou invalide. Recommencez la procédure.')
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (password.length < 8) { setError('Minimum 8 caractères.'); return }
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080a0f', color: '#e8e4dc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', fontFamily: 'var(--font-mono, monospace)' }}>
      <div style={{ width: '100%', maxWidth: 360 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ fontFamily: 'var(--font-display, sans-serif)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.04em', textDecoration: 'none', color: '#e8e4dc' }}>
            Simu<span style={{ color: '#b8f040' }}>Immo</span>
          </Link>
          <div style={{ fontSize: 13, color: 'rgba(232,228,220,0.5)', marginTop: 6 }}>Nouveau mot de passe</div>
        </div>

        <div style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '1.75rem' }}>
          {!ready && error ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#f04060', fontSize: 13 }}>{error}</p>
              <Link href="/forgot-password" style={{ color: '#b8f040', fontSize: 12, marginTop: '1rem', display: 'block' }}>
                Recommencer
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(232,228,220,0.4)', display: 'block', marginBottom: 6 }}>Nouveau mot de passe</label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="8 caractères minimum"
                  style={{ width: '100%', background: '#141820', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 14px', color: '#e8e4dc', fontSize: 13, outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(232,228,220,0.4)', display: 'block', marginBottom: 6 }}>Confirmer</label>
                <input
                  type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', background: '#141820', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 14px', color: '#e8e4dc', fontSize: 13, outline: 'none' }}
                />
              </div>
              {error && <p style={{ color: '#f04060', fontSize: 12 }}>{error}</p>}
              <button type="submit" disabled={loading || !ready} style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display, sans-serif)', fontWeight: 700, fontSize: 12, padding: '11px', borderRadius: 10, border: 'none', cursor: 'pointer', opacity: (loading || !ready) ? 0.7 : 1 }}>
                {loading ? '...' : 'Enregistrer le mot de passe'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
