import { NextRequest, NextResponse } from 'next/server';
import pool, { type DbRow } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_news WHERE id = ?',
      [id]
    );

    const items = rows as DbRow[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('News GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
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
      timestamp,
      author,
      text,
      image,
      seo_title,
      seo_description,
      sort_order,
      is_active,
    } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_news WHERE id = ?',
      [id]
    );
    if ((existing as DbRow[]).length === 0) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_news SET slug = ?, name = ?, ecosystem = ?, timestamp = ?, author = ?, text = ?, image = ?, seo_title = ?, seo_description = ?, sort_order = ?, is_active = ? WHERE id = ?',
      [
        slug ?? null,
        name ?? null,
        ecosystem ?? 'BFriends',
        timestamp ?? null,
        author ?? null,
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
      'SELECT * FROM bfriends_news WHERE id = ?',
      [id]
    );

    return NextResponse.json((updated as DbRow[])[0]);
  } catch (error) {
    console.error('News PUT error:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
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
      'SELECT id FROM bfriends_news WHERE id = ?',
      [id]
    );
    if ((existing as DbRow[]).length === 0) {
      return NextResponse.json({ error: 'News not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_news WHERE id = ?', [id]);

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('News DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
