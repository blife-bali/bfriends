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
      'SELECT * FROM bfriends_program_pillars WHERE program_id = ? ORDER BY sort_order',
      [id]
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching pillars:', error);
    return NextResponse.json({ error: 'Failed to fetch pillars' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, icon, sort_order } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_program_pillars (program_id, title, description, icon, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [id, title, description, icon, sort_order ?? 0]
    );

    const insertResult = result as any;
    return NextResponse.json({ id: insertResult.insertId, message: 'Pillar created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating pillar:', error);
    return NextResponse.json({ error: 'Failed to create pillar' }, { status: 500 });
  }
}
