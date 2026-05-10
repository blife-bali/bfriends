import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { replaceProgramChildren } from '@/lib/admin-program-children';

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
      name,
      slug,
      eyebrow,
      title,
      subheading,
      image,
      video,
      button_label,
      book_now_button,
      quote,
      philosophy,
      breadcrumb,
      philosophy_image,
      pillars_image,
      pillars_title,
      pillars_paragraph,
      previous_program,
      next_program,
      seo_title,
      seo_description,
      intro_title,
      intro_sub,
      sort_order,
      is_active,
      steps,
      sessions,
      session_types,
    } = body;

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        `INSERT INTO bfriends_programs (
          name, slug, eyebrow, title, subheading, image, video, button_label, book_now_button,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          pillars_title, pillars_paragraph,
          previous_program, next_program, seo_title, seo_description, intro_title, intro_sub, sort_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, slug, eyebrow, title, subheading, image, video || null, button_label, book_now_button ? 1 : 0,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          pillars_title || null, pillars_paragraph || null,
          previous_program, next_program, seo_title || null, seo_description || null, intro_title || null, intro_sub || null, sort_order ?? 0, is_active ?? 1,
        ]
      );

      const insertResult = result as any;
      const programId = insertResult.insertId as number;

      await replaceProgramChildren(connection, String(programId), steps, session_types, sessions);
      await connection.commit();

      return NextResponse.json({ id: programId, message: 'Program created successfully' }, { status: 201 });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
