import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, mysqlErrorCode, type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

async function ensureProcessPageKeyColumn() {
  try {
    await pool.execute(
      "ALTER TABLE bfriends_process_steps ADD COLUMN page_key VARCHAR(50) NOT NULL DEFAULT 'customer-journey' AFTER id"
    );
  } catch (error: unknown) {
    if (mysqlErrorCode(error) !== 'ER_DUP_FIELDNAME') throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureProcessPageKeyColumn();
    const page = req.nextUrl.searchParams.get('page');
    const pageKey = page === 'home' || page === 'customer-journey' ? page : null;
    let [rows] = pageKey
      ? await pool.execute('SELECT * FROM bfriends_process_steps WHERE page_key = ? ORDER BY sort_order', [pageKey])
      : await pool.execute('SELECT * FROM bfriends_process_steps ORDER BY sort_order');
    if (pageKey === 'home' && (rows as DbRow[]).length === 0) {
      await pool.execute(
        'INSERT INTO bfriends_process_steps (page_key, number, title, description, image, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          'home',
          'home',
          'A clear path to move, recover, and improve.',
          [
            'Your journey at BFriends is designed step by step - starting from your baseline, tracking your progress, and adjusting as your body heals.',
            'Each phase builds on the last, creating a structured yet flexible path that responds to your needs over time.',
            'You don’t have to do everything at once. You simply begin where you are—and grow from there.',
          ].join('\n\n'),
          '/images/Integrate/DDK09558.jpg',
          0,
          1,
        ]
      );
      [rows] = await pool.execute('SELECT * FROM bfriends_process_steps WHERE page_key = ? ORDER BY sort_order', ['home']);
    }

    const steps = rows as DbRow[];
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
    await ensureProcessPageKeyColumn();

    const body = await req.json();
    const { number, title, description, image, sort_order, is_active, subpoints, page_key } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_process_steps (page_key, number, title, description, image, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [page_key || 'customer-journey', number || null, title, description || null, image || null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    const insertResult = asInsertResult(result);
    const stepId = insertResult.insertId;

    if (subpoints && Array.isArray(subpoints) && subpoints.length > 0) {
      for (let i = 0; i < subpoints.length; i++) {
        const sp = subpoints[i];
        await pool.execute(
          'INSERT INTO bfriends_process_subpoints (step_id, title, description, sort_order) VALUES (?, ?, ?, ?)',
          [stepId, sp.title || null, sp.description || null, sp.sort_order !== undefined ? sp.sort_order : i]
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

    return NextResponse.json({ ...(newRows as DbRow[])[0], subpoints: newSubpoints }, { status: 201 });
  } catch (error) {
    console.error('Process POST error:', error);
    return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 });
  }
}
