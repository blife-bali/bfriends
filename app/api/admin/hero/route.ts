import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM bfriends_hero_sections WHERE page = 'home' ORDER BY sort_order"
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
    const { title, subtitle, video_url, sort_order, is_active } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_hero_sections (page, title, subtitle, video_url, image_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['home', title, subtitle || null, video_url || null, null, sort_order || 0, is_active !== undefined ? is_active : 1]
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
