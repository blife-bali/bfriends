import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_hero_sections ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Hero GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { page, title, subtitle, video_url, image_url, sort_order, is_active } = body;

    if (!page || !title) {
      return NextResponse.json({ error: 'page and title are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_hero_sections (page, title, subtitle, video_url, image_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [page, title, subtitle || null, video_url || null, image_url || null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = result as any;
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_hero_sections WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as any[])[0], { status: 201 });
  } catch (error) {
    console.error('Hero POST error:', error);
    return NextResponse.json({ error: 'Failed to create hero section' }, { status: 500 });
  }
}
