// app/auth/confirm/route.ts
import { createClient } from '../../../../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  if (!error) {
    console.log('User signed out successfully')
    redirect('/')
  }
  //handle error
  console.error('Error signing out:', error)
  redirect('/error')
}