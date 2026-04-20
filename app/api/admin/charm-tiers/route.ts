import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_charm_tiers ORDER BY sort_order');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching charm tiers:', error);
    return NextResponse.json({ error: 'Failed to fetch charm tiers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name, tagline, credits, bonus, is_popular, sort_order, is_active } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_charm_tiers (name, tagline, credits, bonus, is_popular, sort_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, tagline, credits, bonus, is_popular ?? 0, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = result as any;
    return NextResponse.json({ id: insertResult.insertId, message: 'Charm tier created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating charm tier:', error);
    return NextResponse.json({ error: 'Failed to create charm tier' }, { status: 500 });
  }
}
