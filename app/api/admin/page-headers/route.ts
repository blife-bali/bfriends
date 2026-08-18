import { NextRequest, NextResponse } from 'next/server';
import pool, { asInsertResult } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_page_headers');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching page headers:', error);
    return NextResponse.json({ error: 'Failed to fetch page headers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { page_key, title, breadcrumb, image, description, seo_title, seo_description } = body;

    const [result] = await pool.execute(
      `INSERT INTO bfriends_page_headers (page_key, title, breadcrumb, image, description, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        page_key,
        title,
        breadcrumb ?? null,
        image ?? null,
        description ?? null,
        seo_title ?? null,
        seo_description ?? null,
      ]
    );

    const insertResult = asInsertResult(result);
    return NextResponse.json({ id: insertResult.insertId, message: 'Page header created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating page header:', error);
    return NextResponse.json({ error: 'Failed to create page header' }, { status: 500 });
  }
}
