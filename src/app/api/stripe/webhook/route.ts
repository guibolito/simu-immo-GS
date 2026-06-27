import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'
import { sendSubscriptionEmail } from '@/lib/email'
import type Stripe from 'stripe'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySubscription = any

export async function POST(request: Request) {
  const supabaseAdmin = createSupabaseAdmin(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Webhook invalide' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.user_id
    if (!userId) return NextResponse.json({ received: true })

    const subscription: AnySubscription = await stripe.subscriptions.retrieve(session.subscription as string)

    await supabaseAdmin.from('subscriptions').upsert({
      user_id: userId,
      stripe_customer_id: session.customer as string,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    }, { onConflict: 'user_id' })

    const { data: { user } } = await supabaseAdmin.auth.admin.getUserById(userId)
    if (user?.email) sendSubscriptionEmail(user.email).catch(() => {})
  }

  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
    const sub: AnySubscription = event.data.object
    await supabaseAdmin.from('subscriptions').update({
      status: sub.status,
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
    }).eq('stripe_subscription_id', sub.id)
  }

  return NextResponse.json({ received: true })
}
