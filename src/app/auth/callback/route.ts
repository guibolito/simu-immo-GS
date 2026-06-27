import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    // Flux reset de mot de passe → page dédiée
    if (type === 'recovery') {
      return NextResponse.redirect(`${origin}/reset-password`)
    }

    // Nouvel utilisateur confirmé → email de bienvenue
    if (!error && data.user) {
      const isNew = data.user.created_at === data.user.updated_at ||
        (Date.now() - new Date(data.user.created_at).getTime()) < 60_000
      if (isNew && data.user.email) {
        fetch(`${origin}/api/auth/welcome`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.user.email }),
        }).catch(() => {})
      }
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
