import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM bfriends_intro_sections WHERE page = 'home' ORDER BY sort_order"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Intro GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch intro sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { headline, body: bodyText, image_url, show_cta, sort_order, is_active } = body;

    if (!headline) {
      return NextResponse.json({ error: 'headline is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_intro_sections (page, headline, body, image_url, show_cta, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['home', headline, bodyText || null, image_url || null, show_cta !== undefined ? show_cta : 1, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = result as { insertId: number };
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_intro_sections WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as Record<string, unknown>[])[0], { status: 201 });
  } catch (error) {
    console.error('Intro POST error:', error);
    return NextResponse.json({ error: 'Failed to create intro section' }, { status: 500 });
  }
}
