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
      'SELECT * FROM bfriends_charm_tiers WHERE id = ?',
      [id]
    );
    const items = rows as DbRow[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Charm tier not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Error fetching charm tier:', error);
    return NextResponse.json({ error: 'Failed to fetch charm tier' }, { status: 500 });
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
    const body = await req.json();
    const { name, tagline, credits, bonus, is_popular, sort_order, is_active } = body;

    const [result] = await pool.execute(
      `UPDATE bfriends_charm_tiers SET name = ?, tagline = ?, credits = ?, bonus = ?, is_popular = ?, sort_order = ?, is_active = ?
       WHERE id = ?`,
      [name, tagline, credits, bonus, is_popular ?? 0, sort_order ?? 0, is_active ?? 1, id]
    );

    const updateResult = asInsertResult(result);
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Charm tier not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Charm tier updated successfully' });
  } catch (error) {
    console.error('Error updating charm tier:', error);
    return NextResponse.json({ error: 'Failed to update charm tier' }, { status: 500 });
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
      'DELETE FROM bfriends_charm_tiers WHERE id = ?',
      [id]
    );

    const deleteResult = asInsertResult(result);
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Charm tier not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Charm tier deleted successfully' });
  } catch (error) {
    console.error('Error deleting charm tier:', error);
    return NextResponse.json({ error: 'Failed to delete charm tier' }, { status: 500 });
  }
}
