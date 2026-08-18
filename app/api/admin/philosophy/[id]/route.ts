import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;

    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_philosophy_sections WHERE id = ?',
      [id]
    );
    const items = rows as DbRow[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Philosophy section not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Error fetching philosophy section:', error);
    return NextResponse.json({ error: 'Failed to fetch philosophy section' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const data = await req.json();
    const { section_key, headline, body: bodyContent, image, sort_order, is_active } = data;

    const [result] = await pool.execute(
      `UPDATE bfriends_philosophy_sections SET section_key = ?, headline = ?, body = ?, image = ?, sort_order = ?, is_active = ?
       WHERE id = ?`,
      [section_key, headline, bodyContent, image, sort_order ?? 0, is_active ?? 1, id]
    );

    const updateResult = asInsertResult(result);
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Philosophy section not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Philosophy section updated successfully' });
  } catch (error) {
    console.error('Error updating philosophy section:', error);
    return NextResponse.json({ error: 'Failed to update philosophy section' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;

    const [result] = await pool.execute(
      'DELETE FROM bfriends_philosophy_sections WHERE id = ?',
      [id]
    );

    const deleteResult = asInsertResult(result);
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Philosophy section not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Philosophy section deleted successfully' });
  } catch (error) {
    console.error('Error deleting philosophy section:', error);
    return NextResponse.json({ error: 'Failed to delete philosophy section' }, { status: 500 });
  }
}
