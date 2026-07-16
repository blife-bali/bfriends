import { NextResponse } from 'next/server';
import { getTreatments } from '@/lib/supabase-content';

export async function GET() {
  try {
    const treatments = await getTreatments();
    return NextResponse.json(
      treatments.map((t) => ({
        id: t.id,
        label: `${t.name} | ${t.facility}`,
        href: `/treatments/${t.id}`,
        sort_order: t.sort_order,
      }))
    );
  } catch (error) {
    console.error('Treatments GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch treatments' }, { status: 500 });
  }
}
