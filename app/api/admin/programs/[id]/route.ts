import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function replaceProgramChildren(
  connection: any,
  programId: string,
  steps: any[] = [],
  sessions: any[] = []
) {
  const resolveStepSortOrder = (step: any, fallbackIndex: number) => {
    const numberFromStepId = Number.parseInt(String(step?.step_id ?? ''), 10);
    if (Number.isFinite(numberFromStepId)) return numberFromStepId - 1;
    return step?.sort_order ?? fallbackIndex;
  };

  await connection.execute('DELETE FROM bfriends_program_steps WHERE program_id = ?', [programId]);
  await connection.execute('DELETE FROM bfriends_program_sessions WHERE program_id = ?', [programId]);

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;

    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE id = ?',
      [id]
    );
    const programs = rows as any[];
    if (programs.length === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    const [steps] = await pool.execute(
      'SELECT * FROM bfriends_program_steps WHERE program_id = ? ORDER BY sort_order',
      [id]
    );

    const [pillars] = await pool.execute(
      'SELECT * FROM bfriends_program_pillars WHERE program_id = ? ORDER BY sort_order',
      [id]
    );

    const [sessions] = await pool.execute(
      'SELECT * FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order',
      [id]
    );

    return NextResponse.json({
      ...programs[0],
      steps,
      pillars,
      sessions,
    });
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ error: 'Failed to fetch program' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
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
        `UPDATE bfriends_programs SET
          name = ?, slug = ?, eyebrow = ?, title = ?, subheading = ?,
          image = ?, button_label = ?, quote = ?, philosophy = ?, breadcrumb = ?,
          philosophy_image = ?, pillars_image = ?, previous_program = ?,
          next_program = ?, seo_title = ?, seo_description = ?, sort_order = ?, is_active = ?
        WHERE id = ?`,
        [
          name, slug, eyebrow, title, subheading, image, button_label,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          previous_program, next_program, seo_title || null, seo_description || null, sort_order ?? 0, is_active ?? 1, id,
        ]
      );

      const updateResult = result as any;
      if (updateResult.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }

      await replaceProgramChildren(connection, id, steps, sessions);
      await connection.commit();

      const [programRows] = await pool.execute('SELECT * FROM bfriends_programs WHERE id = ?', [id]);
      const [stepRows] = await pool.execute('SELECT * FROM bfriends_program_steps WHERE program_id = ? ORDER BY sort_order', [id]);
      const [sessionRows] = await pool.execute('SELECT * FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order', [id]);

      return NextResponse.json({
        ...(programRows as any[])[0],
        steps: stepRows,
        sessions: sessionRows,
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Failed to update program' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;

    await pool.execute('DELETE FROM bfriends_program_steps WHERE program_id = ?', [id]);
    await pool.execute('DELETE FROM bfriends_program_pillars WHERE program_id = ?', [id]);
    await pool.execute('DELETE FROM bfriends_program_sessions WHERE program_id = ?', [id]);

    const [result] = await pool.execute(
      'DELETE FROM bfriends_programs WHERE id = ?',
      [id]
    );

    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Failed to delete program' }, { status: 500 });
  }
}
