import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function insertProgramChildren(
  connection: any,
  programId: number,
  steps: any[] = [],
  sessions: any[] = []
) {
  const resolveStepSortOrder = (step: any, fallbackIndex: number) => {
    const numberFromStepId = Number.parseInt(String(step?.step_id ?? ''), 10);
    if (Number.isFinite(numberFromStepId)) return numberFromStepId - 1;
    return step?.sort_order ?? fallbackIndex;
  };

  if (Array.isArray(steps)) {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await connection.execute(
        `INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [
          programId,
          step.step_id || String(i + 1).padStart(2, '0'),
          step.title || '',
          step.description || '',
          resolveStepSortOrder(step, i),
        ]
      );
    }
  }

  if (Array.isArray(sessions)) {
    for (let i = 0; i < sessions.length; i++) {
      const session = sessions[i];
      await connection.execute(
        `INSERT INTO bfriends_program_sessions (program_id, title, description, image, icon, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          programId,
          session.title || '',
          session.description || '',
          session.image || null,
          session.icon || null,
          session.sort_order ?? i,
        ]
      );
    }
  }
}

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
      button_label,
      quote,
      philosophy,
      breadcrumb,
      philosophy_image,
      pillars_image,
      previous_program,
      next_program,
      seo_title,
      seo_description,
      sort_order,
      is_active,
      steps,
      sessions,
    } = body;

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        `INSERT INTO bfriends_programs (
          name, slug, eyebrow, title, subheading, image, button_label,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          previous_program, next_program, seo_title, seo_description, sort_order, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, slug, eyebrow, title, subheading, image, button_label,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          previous_program, next_program, seo_title || null, seo_description || null, sort_order ?? 0, is_active ?? 1,
        ]
      );

      const insertResult = result as any;
      const programId = insertResult.insertId as number;

      await insertProgramChildren(connection, programId, steps, sessions);
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
