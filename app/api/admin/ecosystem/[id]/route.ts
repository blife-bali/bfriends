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
      'SELECT * FROM bfriends_ecosystem_items WHERE id = ?',
      [id]
    );

    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Ecosystem item not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Ecosystem GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch ecosystem item' }, { status: 500 });
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
    const { name, description, url, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_ecosystem_items WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Ecosystem item not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_ecosystem_items SET name = ?, description = ?, url = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [name ?? null, description ?? null, url ?? null, sort_order ?? 0, is_active ?? 1, id]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_ecosystem_items WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Ecosystem PUT error:', error);
    return NextResponse.json({ error: 'Failed to update ecosystem item' }, { status: 500 });
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
      'SELECT id FROM bfriends_ecosystem_items WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Ecosystem item not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_ecosystem_items WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Ecosystem item deleted successfully' });
  } catch (error) {
    console.error('Ecosystem DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete ecosystem item' }, { status: 500 });
  }
}
