import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SimulateurClient from './SimulateurClient'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#080a0f' }} />}>
      <SimulateurClient userEmail={user.email ?? ''} />
    </Suspense>
  )
}
