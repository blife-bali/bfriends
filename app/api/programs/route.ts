import { NextResponse } from 'next/server';
import { getPrograms } from '@/lib/cms';

export async function GET() {
  try {
    const programs = await getPrograms();
    const items = (programs as any[]).map((program) => ({
      name: program.name,
      slug: program.slug,
      image: program.image || null,
      sort: program.sort_order ?? program.sort ?? program.index ?? 0,
    }));
    const orderedItems = items
      .slice()
      .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    return NextResponse.json(orderedItems);
  } catch (error) {
    console.error('Public programs GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}
