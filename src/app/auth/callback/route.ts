import { createClient } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/email'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=link_expired`)
    }

    // Flux reset de mot de passe → page dédiée
    // Primary signal: ?type=recovery in redirectTo URL (set by forgot-password page).
    // Secondary: recovery_sent_at within last 10 min (robust against URL param removal).
    const recentRecovery = data.user?.recovery_sent_at &&
      Date.now() - new Date(data.user.recovery_sent_at).getTime() < 10 * 60 * 1000
    if (type === 'recovery' || recentRecovery) {
      return NextResponse.redirect(`${origin}/reset-password`)
    }

    // Nouvel utilisateur confirmé → email de bienvenue (appel direct, sans HTTP)
    if (data.user) {
      const isNew = data.user.created_at === data.user.updated_at ||
        (Date.now() - new Date(data.user.created_at).getTime()) < 60_000
      if (isNew && data.user.email) {
        sendWelcomeEmail(data.user.email).catch(() => {})
      }
    }

    return NextResponse.redirect(`${origin}/dashboard`)
  }

  return NextResponse.redirect(`${origin}/login`)
}
