// app/auth/confirm/route.ts
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'
import { createClient } from '../../../../lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const redirectTo = searchParams.get('redirect_to') || '/'

  if (token_hash && type) {
    const supabase = await createClient()
    const { data:{ user }, error } = await supabase.auth.verifyOtp({ type, token_hash })
    if (!error && user) {
        const { error: updatedError } = await supabase
            .from('customers')
            .update({ user_id: user.id })
            .eq('email', user.email)
            .select()
        if (updatedError) {
            console.error("Error updating customer:", updatedError)
        }
        redirect(redirectTo)
    }
  }

  redirect('/error')
}