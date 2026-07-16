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

  const [{ data: page }, { data: teams }] = await Promise.all([
    supabase.from('bfriends_journey_partners_page').select('*').eq('id', 1).maybeSingle(),
    supabase.from('bfriends_journey_partner_teams').select('*').order('sort_order'),
  ]);

  return NextResponse.json({ page: page ?? {}, teams: teams ?? [] });
}

export async function PUT(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  const { page, teams } = body;

  if (page) {
    const { error } = await supabase.from('bfriends_journey_partners_page').upsert({
      id: 1,
      seo_title: page.seo_title ?? null,
      seo_description: page.seo_description ?? null,
      breadcrumb: page.breadcrumb ?? null,
      hero_title: page.hero_title ?? null,
      hero_description: page.hero_description ?? null,
      header_image: page.header_image ?? null,
      updated_at: new Date().toISOString(),
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (Array.isArray(teams)) {
    const rows = teams.map((t: Record<string, unknown>, i: number) => ({
      id: String(t.id ?? ''),
      title: String(t.title ?? ''),
      image: t.image ?? null,
      image_alt: t.image_alt ?? null,
      body: t.body ?? null,
      sort_order: typeof t.sort_order === 'number' ? t.sort_order : i,
      is_active: t.is_active !== false,
      updated_at: new Date().toISOString(),
    }));
    if (rows.some((r) => !r.id || !r.title)) {
      return NextResponse.json({ error: 'Each team needs an id and title' }, { status: 400 });
    }
    const { error } = await supabase.from('bfriends_journey_partner_teams').upsert(rows);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
