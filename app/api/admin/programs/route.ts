import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE is_active = 1 ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();
    const {
      letter,
      name,
      slug,
      eyebrow,
      title,
      subheading,
      image,
      button_label,
      quote,
      philosophy,
      breadcrumb,
      philosophy_image,
      pillars_image,
      previous_program,
      next_program,
      sort_order,
      is_active,
    } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_programs (
        letter, name, slug, eyebrow, title, subheading, image, button_label,
        quote, philosophy, breadcrumb, philosophy_image, pillars_image,
        previous_program, next_program, sort_order, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        letter, name, slug, eyebrow, title, subheading, image, button_label,
        quote, philosophy, breadcrumb, philosophy_image, pillars_image,
        previous_program, next_program, sort_order ?? 0, is_active ?? 1,
      ]
    );

    const insertResult = result as any;
    return NextResponse.json({ id: insertResult.insertId, message: 'Program created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
