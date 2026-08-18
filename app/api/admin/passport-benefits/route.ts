import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_passport_benefits ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Passport benefits GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch passport benefits' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { title, description, icon_name, sort_order, is_active } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'title and description are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_passport_benefits (title, description, icon_name, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [title, description, icon_name ?? 'Key', sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = asInsertResult(result);
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_passport_benefits WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as DbRow[])[0], { status: 201 });
  } catch (error) {
    console.error('Passport benefits POST error:', error);
    return NextResponse.json({ error: 'Failed to create passport benefit' }, { status: 500 });
  }
}
