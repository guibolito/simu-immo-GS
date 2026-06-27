import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SimulateurClient from './SimulateurClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return <SimulateurClient userEmail={user.email ?? ''} />
}
