import { createClient } from '@/lib/supabase/server'

export async function getUserSubscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single()

  return data
}

export async function isSubscribed(): Promise<boolean> {
  const sub = await getUserSubscription()
  if (!sub) return false
  return new Date(sub.current_period_end) > new Date()
}
