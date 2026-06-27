import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { email } = await request.json()
    if (!email || email !== user.email) return NextResponse.json({ error: 'Email invalide' }, { status: 400 })

    await sendWelcomeEmail(email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Welcome email error:', err)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}
