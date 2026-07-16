import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/client';

function supabaseOrError() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
  }
  return supabase;
}

export async function GET() {
  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const { data, error } = await supabase.from('bfriends_spa_pages').select('*').order('slug');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function PUT(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  const { data, error } = await supabase.from('bfriends_spa_pages').upsert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
