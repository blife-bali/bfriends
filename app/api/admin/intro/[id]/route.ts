import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import {
  getHomeIntroVideoUrl,
  updateHomeIntroVideo,
  withIntroVideoField,
} from '@/lib/home-section-media';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_intro_sections WHERE id = ?',
      [id]
    );

    const items = rows as Record<string, unknown>[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Intro section not found' }, { status: 404 });
    }

    const videoUrl = await getHomeIntroVideoUrl();
    return NextResponse.json(withIntroVideoField(items[0], videoUrl));
  } catch (error) {
    console.error('Intro GET by id error:', error);
    return NextResponse.json({ error: 'Failed to fetch intro section' }, { status: 500 });
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
    const { headline, body: bodyText, video_url, show_cta, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_intro_sections WHERE id = ?',
      [id]
    );
    if ((existing as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Intro section not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_intro_sections SET page = ?, headline = ?, body = ?, show_cta = ?, sort_order = ?, is_active = ? WHERE id = ?',
      ['home', headline, bodyText || null, show_cta !== undefined ? show_cta : 1, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );

    if (video_url !== undefined) {
      try {
        await updateHomeIntroVideo(video_url || null);
      } catch (mediaError) {
        console.error('Intro video update error:', mediaError);
        return NextResponse.json({ error: 'Home hero section not found for intro video' }, { status: 400 });
      }
    }

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_intro_sections WHERE id = ?',
      [id]
    );
    const intro = (updated as Record<string, unknown>[])[0];
    const mergedVideoUrl = await getHomeIntroVideoUrl();

    return NextResponse.json(withIntroVideoField(intro, mergedVideoUrl));
  } catch (error) {
    console.error('Intro PUT error:', error);
    return NextResponse.json({ error: 'Failed to update intro section' }, { status: 500 });
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
      'SELECT id FROM bfriends_intro_sections WHERE id = ?',
      [id]
    );
    if ((existing as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Intro section not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_intro_sections WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Intro section deleted successfully' });
  } catch (error) {
    console.error('Intro DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete intro section' }, { status: 500 });
  }
}
