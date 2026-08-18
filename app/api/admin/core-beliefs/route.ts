import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_core_beliefs ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Core beliefs GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch core beliefs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { title, body: text, sort_order, is_active } = body;

    if (!title || !text) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_core_beliefs (title, body, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [title, text, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = asInsertResult(result);
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_core_beliefs WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as DbRow[])[0], { status: 201 });
  } catch (error) {
    console.error('Core beliefs POST error:', error);
    return NextResponse.json({ error: 'Failed to create core belief' }, { status: 500 });
  }
}
