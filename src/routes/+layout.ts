import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr'
import type { LayoutLoad } from './$types'

const PUBLIC_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth')

  const supabase = isBrowser()
    ? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
      })
    : createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch,
        },
        cookies: {
          getAll() {
            return data.cookies
          },
        },
      })

  return { ...data, supabase }
}