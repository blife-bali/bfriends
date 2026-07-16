import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/client';
import {
  ctaFromRow,
  loadSpecGroupsByTreatment,
  replaceSpecGroups,
  treatmentPayloadColumns,
  type TreatmentRow,
} from '@/lib/supabase-bfriends-tables';
import type { TreatmentSpecGroup } from '@/mock/treatments';

function supabaseOrError() {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
  }
  return supabase;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const { data, error } = await supabase.from('bfriends_treatments').select('*').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const specs = await loadSpecGroupsByTreatment(supabase, [id]);
  const row = data as TreatmentRow;
  return NextResponse.json({
    ...row,
    spec_groups: specs.get(id) ?? [],
    cta: ctaFromRow(row),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  const specGroups = (body.spec_groups ?? []) as TreatmentSpecGroup[];
  const columns = treatmentPayloadColumns({ ...body, id });

  const { data, error } = await supabase
    .from('bfriends_treatments')
    .update(columns)
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    await replaceSpecGroups(supabase, id, specGroups);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to save specs' }, { status: 500 });
  }

  return NextResponse.json({
    ...data,
    spec_groups: specGroups,
    cta: ctaFromRow(data as TreatmentRow),
  });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const { error } = await supabase.from('bfriends_treatments').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
