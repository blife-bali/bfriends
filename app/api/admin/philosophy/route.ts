import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_philosophy_sections');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching philosophy sections:', error);
    return NextResponse.json({ error: 'Failed to fetch philosophy sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await req.json();
    const { section_key, headline, body: bodyContent, image, sort_order, is_active } = data;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_philosophy_sections (section_key, headline, body, image, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [section_key, headline, bodyContent, image, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = result as any;
    return NextResponse.json({ id: insertResult.insertId, message: 'Philosophy section created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating philosophy section:', error);
    return NextResponse.json({ error: 'Failed to create philosophy section' }, { status: 500 });
  }
}
