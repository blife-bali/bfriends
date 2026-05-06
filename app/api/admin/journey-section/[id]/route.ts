import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_journey_sections WHERE id = ?',
      [id]
    );
    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Journey section not found' }, { status: 404 });
    }
    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Journey section GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch journey section' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const body = await req.json();
    const { headline, body: text, image, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_journey_sections WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Journey section not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_journey_sections SET headline = ?, body = ?, image = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [headline ?? null, text ?? null, image ?? null, sort_order ?? 0, is_active ?? 1, id]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_journey_sections WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Journey section PUT error:', error);
    return NextResponse.json({ error: 'Failed to update journey section' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_journey_sections WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Journey section not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_journey_sections WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Journey section deleted successfully' });
  } catch (error) {
    console.error('Journey section DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete journey section' }, { status: 500 });
  }
}
