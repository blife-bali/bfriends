import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

/** Public read client (anon key). Safe for server components and public API routes. */
export function getSupabasePublic(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Admin client (service role). Server-only — never expose to the browser. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
