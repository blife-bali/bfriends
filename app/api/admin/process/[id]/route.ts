import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_process_steps WHERE id = ?',
      [id]
    );

    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }

    const [subpoints] = await pool.execute(
      'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
      [id]
    );

    return NextResponse.json({ ...items[0], subpoints });
  } catch (error) {
    console.error('Process GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch process step' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;
    const body = await req.json();
    const { title, description, icon, sort_order, is_active, subpoints } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_process_steps WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_process_steps SET title = ?, description = ?, icon = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [title, description || null, icon || null, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );

    // Replace subpoints: delete old ones, insert new ones
    if (subpoints !== undefined) {
      await pool.execute('DELETE FROM bfriends_process_subpoints WHERE step_id = ?', [id]);

      if (Array.isArray(subpoints)) {
        for (let i = 0; i < subpoints.length; i++) {
          const sp = subpoints[i];
          await pool.execute(
            'INSERT INTO bfriends_process_subpoints (step_id, text, sort_order) VALUES (?, ?, ?)',
            [id, sp.text || sp, sp.sort_order !== undefined ? sp.sort_order : i]
          );
        }
      }
    }

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_process_steps WHERE id = ?',
      [id]
    );

    const [updatedSubpoints] = await pool.execute(
      'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
      [id]
    );

    return NextResponse.json({ ...(updated as any[])[0], subpoints: updatedSubpoints });
  } catch (error) {
    console.error('Process PUT error:', error);
    return NextResponse.json({ error: 'Failed to update process step' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { id } = await params;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_process_steps WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 });
    }

    // Delete subpoints first (cascade)
    await pool.execute('DELETE FROM bfriends_process_subpoints WHERE step_id = ?', [id]);
    await pool.execute('DELETE FROM bfriends_process_steps WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Process step and its subpoints deleted successfully' });
  } catch (error) {
    console.error('Process DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete process step' }, { status: 500 });
  }
}
