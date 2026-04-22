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
      'SELECT * FROM bfriends_events WHERE id = ?',
      [id]
    );

    const items = rows as any[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Events GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
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
    const {
      slug,
      name,
      ecosystem,
      event_date,
      event_time,
      text,
      image,
      seo_title,
      seo_description,
      sort_order,
      is_active,
    } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_events WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_events SET slug = ?, name = ?, ecosystem = ?, event_date = ?, event_time = ?, text = ?, image = ?, seo_title = ?, seo_description = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [
        slug ?? null,
        name ?? null,
        ecosystem ?? 'BFriends',
        event_date ?? null,
        event_time ?? null,
        text ?? null,
        image ?? null,
        seo_title ?? null,
        seo_description ?? null,
        sort_order ?? 0,
        is_active ?? 1,
        id,
      ]
    );

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_events WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error('Events PUT error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
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
      'SELECT id FROM bfriends_events WHERE id = ?',
      [id]
    );
    if ((existing as any[]).length === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_events WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Events DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
