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

export async function GET() {
  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const { data, error } = await supabase.from('bfriends_treatments').select('*').order('sort_order');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const rows = (data ?? []) as TreatmentRow[];
  const specs = await loadSpecGroupsByTreatment(
    supabase,
    rows.map((r) => r.id)
  );

  return NextResponse.json(
    rows.map((row) => ({
      ...row,
      spec_groups: specs.get(row.id) ?? [],
      cta: ctaFromRow(row),
    }))
  );
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = supabaseOrError();
  if (supabase instanceof NextResponse) return supabase;

  const body = await req.json();
  if (!body.id || !body.name || !body.facility) {
    return NextResponse.json({ error: 'id, name, and facility are required' }, { status: 400 });
  }

  const specGroups = (body.spec_groups ?? []) as TreatmentSpecGroup[];
  const columns = treatmentPayloadColumns(body);

  const { data, error } = await supabase.from('bfriends_treatments').insert(columns).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  try {
    await replaceSpecGroups(supabase, body.id, specGroups);
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Failed to save specs' }, { status: 500 });
  }

  return NextResponse.json(
    { ...data, spec_groups: specGroups, cta: ctaFromRow(data as TreatmentRow) },
    { status: 201 }
  );
}
