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

  const [{ data: intro }, { data: pillars }] = await Promise.all([
    supabase.from('bfriends_about_intro').select('*').eq('id', 1).maybeSingle(),
    supabase.from('bfriends_about_pillars').select('*').order('sort_order'),
  ]);

  return NextResponse.json({ intro: intro ?? {}, pillars: pillars ?? [] });
}

export async function PUT(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  const { intro, pillars } = body;

  if (intro) {
    const { error } = await supabase.from('bfriends_about_intro').upsert({
      id: 1,
      eyebrow: intro.eyebrow ?? null,
      title: intro.title ?? null,
      sub: intro.sub ?? null,
      updated_at: new Date().toISOString(),
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (Array.isArray(pillars)) {
    const rows = pillars.map((p: Record<string, unknown>, i: number) => ({
      id: String(p.id ?? ''),
      image: p.image ?? null,
      image_alt: p.image_alt ?? null,
      title: String(p.title ?? ''),
      description: p.description ?? null,
      button_label: p.button_label ?? null,
      href: p.href || null,
      sort_order: typeof p.sort_order === 'number' ? p.sort_order : i,
      is_active: p.is_active !== false,
      updated_at: new Date().toISOString(),
    }));
    if (rows.some((r) => !r.id || !r.title)) {
      return NextResponse.json({ error: 'Each pillar needs an id and title' }, { status: 400 });
    }
    const { error } = await supabase.from('bfriends_about_pillars').upsert(rows);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
