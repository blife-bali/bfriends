import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_process_steps ORDER BY sort_order'
    );

    const steps = rows as any[];
    const stepsWithSubpoints = await Promise.all(
      steps.map(async (step) => {
        const [subpoints] = await pool.execute(
          'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
          [step.id]
        );
        return { ...step, subpoints };
      })
    );

    return NextResponse.json(stepsWithSubpoints);
  } catch (error) {
    console.error('Process GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch process steps' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { title, description, icon, sort_order, is_active, subpoints } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_process_steps (title, description, icon, sort_order, is_active) VALUES (?, ?, ?, ?, ?)',
      [title, description || null, icon || null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = result as any;
    const stepId = insertResult.insertId;

    if (subpoints && Array.isArray(subpoints) && subpoints.length > 0) {
      for (let i = 0; i < subpoints.length; i++) {
        const sp = subpoints[i];
        await pool.execute(
          'INSERT INTO bfriends_process_subpoints (step_id, text, sort_order) VALUES (?, ?, ?)',
          [stepId, sp.text || sp, sp.sort_order !== undefined ? sp.sort_order : i]
        );
      }
    }

    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_process_steps WHERE id = ?',
      [stepId]
    );

    const [newSubpoints] = await pool.execute(
      'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
      [stepId]
    );

    return NextResponse.json({ ...(newRows as any[])[0], subpoints: newSubpoints }, { status: 201 });
  } catch (error) {
    console.error('Process POST error:', error);
    return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 });
  }
}
