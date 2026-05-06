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
      'SELECT * FROM bfriends_passport_benefits WHERE id = ?',
      [id]
    );
    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Passport benefit not found' }, { status: 404 });
    }
    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Passport benefit GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch passport benefit' }, { status: 500 });
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
    const { title, description, icon_name, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_passport_benefits WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Passport benefit not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_passport_benefits SET title = ?, description = ?, icon_name = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [title ?? null, description ?? null, icon_name ?? 'Key', sort_order ?? 0, is_active ?? 1, id]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_passport_benefits WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Passport benefit PUT error:', error);
    return NextResponse.json({ error: 'Failed to update passport benefit' }, { status: 500 });
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
      'SELECT id FROM bfriends_passport_benefits WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Passport benefit not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_passport_benefits WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Passport benefit deleted successfully' });
  } catch (error) {
    console.error('Passport benefit DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete passport benefit' }, { status: 500 });
  }
}
