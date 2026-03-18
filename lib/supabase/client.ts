import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Using placeholder.');
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder');
  }

  // Next.js SSR automatically manages the persistence via the middleware cookies.
  // Stripping the manual overrides prevents the "Session Tab Close" logout bug.
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}