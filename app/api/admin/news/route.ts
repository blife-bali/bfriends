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
    const {
      slug,
      name,
      ecosystem,
      timestamp,
      author,
      text,
      image,
      seo_title,
      seo_description,
      sort_order,
      is_active,
    } = body;

    if (!slug || !name) {
      return NextResponse.json({ error: 'slug and name are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_news (slug, name, ecosystem, timestamp, author, text, image, seo_title, seo_description, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        slug,
        name,
        ecosystem ?? 'BFriends',
        timestamp ?? null,
        author ?? null,
        text ?? null,
        image ?? null,
        seo_title ?? null,
        seo_description ?? null,
        sort_order ?? 0,
        is_active ?? 1,
      ]
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
