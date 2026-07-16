import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

const DEFAULT_PILLARS = [
  {
    title: 'Data-Driven Assessment',
    body: "Gain valuable insights into your body's current condition through a comprehensive wellness assessment.",
    sort_order: 0,
  },
  {
    title: 'Personalised Recommendations',
    body: 'Receive tailored guidance based on your individual needs, goals, and lifestyle.',
    sort_order: 1,
  },
  {
    title: 'Expert-Led Support',
    body: 'Work alongside experienced wellness professionals who help you navigate every stage of your journey.',
    sort_order: 2,
  },
];

async function ensureTable() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS bfriends_intro_pillars (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      body TEXT NOT NULL,
      sort_order INT DEFAULT 0,
      is_active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [rows] = await pool.execute('SELECT COUNT(*) AS c FROM bfriends_intro_pillars');
  const count = Number((rows as { c: number }[])[0]?.c ?? 0);
  if (count === 0) {
    for (const p of DEFAULT_PILLARS) {
      await pool.execute(
        'INSERT INTO bfriends_intro_pillars (title, body, sort_order, is_active) VALUES (?, ?, ?, 1)',
        [p.title, p.body, p.sort_order]
      );
    }
  }
}

export async function GET() {
  try {
    await ensureTable();
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_intro_pillars ORDER BY sort_order, id'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching intro pillars:', error);
    return NextResponse.json({ error: 'Failed to fetch intro pillars' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    await ensureTable();
    const body = await req.json();
    const { title, body: pillarBody, sort_order, is_active } = body;
    if (!title?.trim() || !pillarBody?.trim()) {
      return NextResponse.json({ error: 'title and body are required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_intro_pillars (title, body, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [title.trim(), pillarBody.trim(), sort_order ?? 0, is_active !== undefined ? is_active : 1]
    );
    const id = (result as { insertId: number }).insertId;
    const [rows] = await pool.execute('SELECT * FROM bfriends_intro_pillars WHERE id = ?', [id]);
    return NextResponse.json((rows as unknown[])[0], { status: 201 });
  } catch (error) {
    console.error('Error creating intro pillar:', error);
    return NextResponse.json({ error: 'Failed to create intro pillar' }, { status: 500 });
  }
}
