import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult, type DbRow } from '@/lib/db';
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
      'SELECT * FROM bfriends_page_headers WHERE id = ?',
      [id]
    );
    const items = rows as DbRow[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Page header not found' }, { status: 404 });
    }

    return NextResponse.json(items[0]);
  } catch (error) {
    console.error('Error fetching page header:', error);
    return NextResponse.json({ error: 'Failed to fetch page header' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await req.json();
    const { page_key, title, breadcrumb, image, description, seo_title, seo_description } = body;

    const [result] = await pool.execute(
      `UPDATE bfriends_page_headers SET page_key = ?, title = ?, breadcrumb = ?, image = ?,
       description = ?, seo_title = ?, seo_description = ?
       WHERE id = ?`,
      [
        page_key,
        title,
        breadcrumb ?? null,
        image ?? null,
        description ?? null,
        seo_title ?? null,
        seo_description ?? null,
        id,
      ]
    );

    const updateResult = asInsertResult(result);
    if (updateResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Page header not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Page header updated successfully' });
  } catch (error) {
    console.error('Error updating page header:', error);
    return NextResponse.json({ error: 'Failed to update page header' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;

    const [result] = await pool.execute(
      'DELETE FROM bfriends_page_headers WHERE id = ?',
      [id]
    );

    const deleteResult = asInsertResult(result);
    if (deleteResult.affectedRows === 0) {
      return NextResponse.json({ error: 'Page header not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Page header deleted successfully' });
  } catch (error) {
    console.error('Error deleting page header:', error);
    return NextResponse.json({ error: 'Failed to delete page header' }, { status: 500 });
  }
}
