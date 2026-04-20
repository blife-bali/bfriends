import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
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

    const body = await req.json();
    const { point, subpoint, image, sort_order, is_active } = body;

    if (!point) {
      return NextResponse.json({ error: 'point is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_why_cards (point, subpoint, image, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [point, subpoint || null, image || null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = result as any;
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_why_cards WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Why-BFriends POST error:', error);
    return NextResponse.json({ error: 'Failed to create why card' }, { status: 500 });
  }
}
