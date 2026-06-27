'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'login'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push('/dashboard')
    })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
      if (error) setError(error.message)
      else setSuccess('Vérifiez votre email pour confirmer votre compte.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#080a0f' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="font-semibold text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.04em' }}>
            Simu<span style={{ color: '#b8f040' }}>Immo</span>
          </div>
          <div className="text-sm" style={{ color: 'rgba(232,228,220,0.5)' }}>
            {mode === 'signup' ? 'Créer un compte' : 'Se connecter'}
          </div>
        </div>

        <div className="rounded-2xl p-7" style={{ background: '#0e1118', border: '1px solid rgba(255,255,255,0.07)' }}>
          {success ? (
            <div className="text-center py-4">
              <div className="text-3xl mb-3">📬</div>
              <p className="text-sm" style={{ color: 'rgba(232,228,220,0.7)' }}>{success}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: 'rgba(232,228,220,0.4)' }}>Email</label>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-colors"
                  style={{ background: '#141820', border: '1px solid rgba(255,255,255,0.07)', color: '#e8e4dc' }}
                  placeholder="vous@email.com"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: 'rgba(232,228,220,0.4)' }}>Mot de passe</label>
                <input
                  type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ background: '#141820', border: '1px solid rgba(255,255,255,0.07)', color: '#e8e4dc' }}
                  placeholder="••••••••"
                  minLength={6}
                />
              </div>

              {error && <p className="text-sm" style={{ color: '#f04060' }}>{error}</p>}

              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-sm transition-all" style={{ background: '#b8f040', color: '#080a0f', fontFamily: 'var(--font-display)', opacity: loading ? 0.7 : 1 }}>
                {loading ? '...' : mode === 'signup' ? 'Créer mon compte' : 'Se connecter'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm mt-4" style={{ color: 'rgba(232,228,220,0.4)' }}>
          {mode === 'signup' ? 'Déjà un compte ? ' : 'Pas encore de compte ? '}
          <button onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError('') }} style={{ color: '#b8f040' }}>
            {mode === 'signup' ? 'Se connecter' : 'Créer un compte'}
          </button>
        </p>
        {mode === 'login' && (
          <p className="text-center text-xs mt-2" style={{ color: 'rgba(232,228,220,0.3)' }}>
            <a href="/forgot-password" style={{ color: 'rgba(232,228,220,0.4)', textDecoration: 'none' }}>
              Mot de passe oublié ?
            </a>
          </p>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080a0f' }} />}>
      <LoginForm />
    </Suspense>
  )
}
