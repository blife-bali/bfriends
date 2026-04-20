import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

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
      `UPDATE bfriends_programs SET
        letter = ?, name = ?, slug = ?, eyebrow = ?, title = ?, subheading = ?,
        image = ?, button_label = ?, quote = ?, philosophy = ?, breadcrumb = ?,
        philosophy_image = ?, pillars_image = ?, previous_program = ?,
        next_program = ?, sort_order = ?, is_active = ?
      WHERE id = ?`,
      [
        letter, name, slug, eyebrow, title, subheading, image, button_label,
        quote, philosophy, breadcrumb, philosophy_image, pillars_image,
        previous_program, next_program, sort_order ?? 0, is_active ?? 1, id,
      ]
    );

    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Program updated successfully' });
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
