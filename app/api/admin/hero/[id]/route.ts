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
      'SELECT * FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );

    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Hero GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
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
    const { title, subtitle, video_url, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_hero_sections SET page = ?, title = ?, subtitle = ?, video_url = ?, image_url = ?, sort_order = ?, is_active = ? WHERE id = ?',
      ['home', title, subtitle || null, video_url || null, null, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Hero PUT error:', error);
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
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
      'SELECT id FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_hero_sections WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Hero section deleted successfully' });
  } catch (error) {
    console.error('Hero DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
  }
}
