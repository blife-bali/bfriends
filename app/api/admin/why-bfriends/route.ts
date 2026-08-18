import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, mysqlErrorCode, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function ensureHiddenInHomeColumn() {
  try {
    await pool.execute(
      'ALTER TABLE bfriends_why_cards ADD COLUMN hidden_in_home TINYINT(1) DEFAULT 0 AFTER is_active'
    );
  } catch (error: unknown) {
    // Ignore if the column already exists.
    if (mysqlErrorCode(error) !== 'ER_DUP_FIELDNAME') throw error;
  }
}

export async function GET() {
  try {
    await ensureHiddenInHomeColumn();
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_why_cards ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Why-BFriends GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch why cards' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;
    await ensureHiddenInHomeColumn();

    const body = await req.json();
    const { point, subpoint, image, sort_order, is_active, hidden_in_home } = body;

    if (!point) {
      return NextResponse.json({ error: 'point is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_why_cards (point, subpoint, image, sort_order, is_active, hidden_in_home) VALUES (?, ?, ?, ?, ?, ?)',
      [point, subpoint || null, image || null, sort_order || 0, is_active !== undefined ? is_active : 1, hidden_in_home !== undefined ? hidden_in_home : 0]
    );

    const insertResult = asInsertResult(result);
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_why_cards WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as DbRow[])[0], { status: 201 });
  } catch (error) {
    console.error('Why-BFriends POST error:', error);
    return NextResponse.json({ error: 'Failed to create why card' }, { status: 500 });
  }
}
