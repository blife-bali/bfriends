import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function ensureHiddenInHomeColumn() {
  try {
    await pool.execute(
      'ALTER TABLE bfriends_why_cards ADD COLUMN hidden_in_home TINYINT(1) DEFAULT 0 AFTER is_active'
    );
  } catch (error: any) {
    // Ignore if the column already exists.
    if (error?.code !== 'ER_DUP_FIELDNAME') throw error;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await ensureHiddenInHomeColumn();
    const { id } = await params;
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_why_cards WHERE id = ?',
      [id]
    );

    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Why card not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Why-BFriends GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch why card' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;
    await ensureHiddenInHomeColumn();

    const { id } = await params;
    const body = await req.json();
    const { point, subpoint, image, sort_order, is_active, hidden_in_home } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_why_cards WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Why card not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_why_cards SET point = ?, subpoint = ?, image = ?, sort_order = ?, is_active = ?, hidden_in_home = ? WHERE id = ?',
      [point, subpoint || null, image || null, sort_order || 0, is_active !== undefined ? is_active : 1, hidden_in_home !== undefined ? hidden_in_home : 0, id]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_why_cards WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Why-BFriends PUT error:', error);
    return NextResponse.json({ error: 'Failed to update why card' }, { status: 500 });
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
      'SELECT id FROM bfriends_why_cards WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Why card not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_why_cards WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Why card deleted successfully' });
  } catch (error) {
    console.error('Why-BFriends DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete why card' }, { status: 500 });
  }
}
