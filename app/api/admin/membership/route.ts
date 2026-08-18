import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_membership_content');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching membership content:', error);
    return NextResponse.json({ error: 'Failed to fetch membership content' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();

    // Handle PUT-style update via POST with id in body
    if (body.id) {
      const { id, section_key, headline, body: contentBody, image, is_active } = body;

      const [result] = await pool.execute(
        `UPDATE bfriends_membership_content SET section_key = ?, headline = ?, body = ?, image = ?, is_active = ?
         WHERE id = ?`,
        [section_key, headline, contentBody, image, is_active ?? 1, id]
      );

      const updateResult = asInsertResult(result);
      if (updateResult.affectedRows === 0) {
        return NextResponse.json({ error: 'Membership content not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Membership content updated successfully' });
    }

    // Create new entry
    const { section_key, headline, body: contentBody, image, is_active } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_membership_content (section_key, headline, body, image, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [section_key, headline, contentBody, image, is_active ?? 1]
    );

    const insertResult = asInsertResult(result);
    return NextResponse.json({ id: insertResult.insertId, message: 'Membership content created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating membership content:', error);
    return NextResponse.json({ error: 'Failed to create membership content' }, { status: 500 });
  }
}
