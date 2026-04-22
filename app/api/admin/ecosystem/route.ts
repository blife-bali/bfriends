import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_ecosystem_items ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Ecosystem GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch ecosystem items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { name, description, url, sort_order, is_active } = body;

    if (!name || !description) {
      return NextResponse.json({ error: 'name and description are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_ecosystem_items (name, description, url, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [name, description, url ?? null, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = result as any;
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_ecosystem_items WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Ecosystem POST error:', error);
    return NextResponse.json({ error: 'Failed to create ecosystem item' }, { status: 500 });
  }
}
