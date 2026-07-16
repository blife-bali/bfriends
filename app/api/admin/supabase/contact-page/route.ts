import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/client';
import {
  loadContactHours,
  loadContactPlatforms,
  replaceContactHours,
  replaceContactPlatforms,
} from '@/lib/supabase-bfriends-tables';
import type { MockContactHoursSection, MockContactPlatform } from '@/mock/contact';

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

  const { data, error } = await supabase.from('bfriends_contact_page').select('*').eq('id', 1).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const [hours_sections, platforms] = await Promise.all([
    loadContactHours(supabase),
    loadContactPlatforms(supabase),
  ]);

  return NextResponse.json({
    ...(data ?? {}),
    hours_sections,
    platforms,
  });
}

export async function PUT(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  const hours_sections = (body.hours_sections ?? []) as MockContactHoursSection[];
  const platforms = (body.platforms ?? []) as MockContactPlatform[];

  const { data, error } = await supabase
    .from('bfriends_contact_page')
    .upsert({
      id: 1,
      seo_title: body.seo_title ?? null,
      seo_description: body.seo_description ?? null,
      title: body.title ?? null,
      description: body.description ?? null,
      image: body.image ?? null,
      image_alt: body.image_alt ?? null,
      location_name: body.location_name ?? null,
      address: body.address ?? null,
      map_href: body.map_href ?? null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    await replaceContactHours(supabase, hours_sections);
    await replaceContactPlatforms(supabase, platforms);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to save contact lists' }, { status: 500 });
  }

  return NextResponse.json({ ...data, hours_sections, platforms });
}
