import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute('SELECT * FROM bfriends_intro_pillars WHERE id = ?', [id]);
    const items = rows as unknown[];
    if (!items.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Error fetching intro pillar:', error);
    return NextResponse.json({ error: 'Failed to fetch intro pillar' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, body: pillarBody, sort_order, is_active } = body;

    const [existing] = await pool.execute('SELECT id FROM bfriends_intro_pillars WHERE id = ?', [id]);
    if (!(existing as unknown[]).length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_intro_pillars SET title = ?, body = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [
        title?.trim() ?? '',
        pillarBody?.trim() ?? '',
        sort_order ?? 0,
        is_active !== undefined ? is_active : 1,
        id,
      ]
    );

    const [rows] = await pool.execute('SELECT * FROM bfriends_intro_pillars WHERE id = ?', [id]);
    return NextResponse.json((rows as unknown[])[0]);
  } catch (error) {
    console.error('Error updating intro pillar:', error);
    return NextResponse.json({ error: 'Failed to update intro pillar' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const [existing] = await pool.execute('SELECT id FROM bfriends_intro_pillars WHERE id = ?', [id]);
    if (!(existing as unknown[]).length) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    await pool.execute('DELETE FROM bfriends_intro_pillars WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting intro pillar:', error);
    return NextResponse.json({ error: 'Failed to delete intro pillar' }, { status: 500 });
  }
}
