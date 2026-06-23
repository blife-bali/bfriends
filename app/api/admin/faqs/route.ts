import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { sanitizeRichText, stripHtml } from '@/lib/rich-text';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_faqs ORDER BY sort_order'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('FAQs GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { question, answer, sort_order, is_active } = body;

    if (!question || !answer || !stripHtml(answer)) {
      return NextResponse.json({ error: 'question and answer are required' }, { status: 400 });
    }

    const sanitizedAnswer = sanitizeRichText(answer);

    const [result] = await pool.execute(
      'INSERT INTO bfriends_faqs (question, answer, sort_order, is_active) VALUES (?, ?, ?, ?)',
      [question, sanitizedAnswer, sort_order ?? 0, is_active ?? 1]
    );

    const insertResult = result as any;
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_faqs WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json((newRows as any[])[0], { status: 201 });
  } catch (error) {
    console.error('FAQs POST error:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
