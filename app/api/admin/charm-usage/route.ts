import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_charm_usage ORDER BY sort_order');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching charm usage:', error);
    return NextResponse.json({ error: 'Failed to fetch charm usage' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { service, credits, sort_order, is_active } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_charm_usage (service, credits, sort_order, is_active)
       VALUES (?, ?, ?, ?)`,
      [service, credits, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = asInsertResult(result);
    return NextResponse.json({ id: insertResult.insertId, message: 'Charm usage created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating charm usage:', error);
    return NextResponse.json({ error: 'Failed to create charm usage' }, { status: 500 });
  }
}
