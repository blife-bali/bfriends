import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_journey_sections ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Journey section GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch journey sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { headline, body: text, image, sort_order, is_active } = body;

    if (!headline || !text) {
      return NextResponse.json({ error: 'headline and body are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_journey_sections (headline, body, image, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [headline, text, image ?? null, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = asInsertResult(result);
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_journey_sections WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as DbRow[])[0], { status: 201 });
  } catch (error) {
    console.error('Journey section POST error:', error);
    return NextResponse.json({ error: 'Failed to create journey section' }, { status: 500 });
  }
}
