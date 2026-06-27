import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    await sendWelcomeEmail(email)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Welcome email error:', err)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })
  }
}
