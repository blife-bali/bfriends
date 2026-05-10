import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { replaceProgramChildren, buildSessionTypesForAdmin } from '@/lib/admin-program-children';

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

    const [sessionTypes] = await pool.execute(
      'SELECT * FROM bfriends_program_session_types WHERE program_id = ? ORDER BY sort_order',
      [id]
    );
    const [sessions] = await pool.execute(
      'SELECT * FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order, id',
      [id]
    );
    const session_types = buildSessionTypesForAdmin(sessionTypes as any[], sessions as any[]);

    return NextResponse.json({
      ...programs[0],
      steps,
      pillars,
      sessions,
      session_types,
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
      sessions: sessionsBody,
      session_types: sessionTypesBody,
    } = body;

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.execute(
        `UPDATE bfriends_programs SET
          name = ?, slug = ?, eyebrow = ?, title = ?, subheading = ?,
          image = ?, video = ?, button_label = ?, book_now_button = ?, quote = ?, philosophy = ?, breadcrumb = ?,
          philosophy_image = ?, pillars_image = ?, pillars_title = ?, pillars_paragraph = ?,
          previous_program = ?,
          next_program = ?, seo_title = ?, seo_description = ?, intro_title = ?, intro_sub = ?, sort_order = ?, is_active = ?
        WHERE id = ?`,
        [
          name, slug, eyebrow, title, subheading, image, video || null, button_label, book_now_button ? 1 : 0,
          quote, philosophy, breadcrumb, philosophy_image, pillars_image,
          pillars_title || null, pillars_paragraph || null,
          previous_program, next_program, seo_title || null, seo_description || null, intro_title || null, intro_sub || null, sort_order ?? 0, is_active ?? 1, id,
        ]
      );

      const updateResult = result as any;
      if (updateResult.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }

      await replaceProgramChildren(connection, id, steps, sessionTypesBody, sessionsBody);
      await connection.commit();

      const [programRows] = await pool.execute('SELECT * FROM bfriends_programs WHERE id = ?', [id]);
      const [stepRows] = await pool.execute('SELECT * FROM bfriends_program_steps WHERE program_id = ? ORDER BY sort_order', [id]);
      const [typeRows] = await pool.execute(
        'SELECT * FROM bfriends_program_session_types WHERE program_id = ? ORDER BY sort_order',
        [id]
      );
      const [sessionRows] = await pool.execute(
        'SELECT * FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order, id',
        [id]
      );
      const session_types = buildSessionTypesForAdmin(typeRows as any[], sessionRows as any[]);

      return NextResponse.json({
        ...(programRows as any[])[0],
        steps: stepRows,
        sessions: sessionRows,
        session_types,
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
    await pool.execute('DELETE FROM bfriends_program_session_types WHERE program_id = ?', [id]);

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
