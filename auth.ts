import 'server-only'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/supabase/functions/_lib/database';

export const auth = async ({
  cookieStore
}: {
  cookieStore: ReturnType<typeof cookies>
}) => {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore
  })
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  return data.session
}
