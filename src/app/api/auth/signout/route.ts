// app/auth/confirm/route.ts
import { NextRequest } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
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