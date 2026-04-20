import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_news ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('News GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { slug, title, excerpt, content, image, category, sort_order, is_active } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_news (slug, title, excerpt, content, image, category, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [slug, title, excerpt || null, content || null, image || null, category || null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = result as any;
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_news WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as any[])[0], { status: 201 });
  } catch (error) {
    console.error('News POST error:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}
