import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import {
  getHomeHeroImageUrl,
  updateHomeHeroImage,
  withHeroImageField,
} from '@/lib/home-section-media';

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

    const items = rows as Record<string, unknown>[];
    if (items.length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    const imageUrl = await getHomeHeroImageUrl();
    return NextResponse.json(withHeroImageField(items[0], imageUrl));
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
    const { title, subtitle, image_url, sort_order, is_active } = body;

    const [existing] = await pool.execute(
      'SELECT id FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );
    if ((existing as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    await pool.execute(
      'UPDATE bfriends_hero_sections SET page = ?, title = ?, subtitle = ?, sort_order = ?, is_active = ? WHERE id = ?',
      ['home', title, subtitle || null, sort_order || 0, is_active !== undefined ? is_active : 1, id]
    );

    if (image_url !== undefined) {
      try {
        await updateHomeHeroImage(image_url || null);
      } catch (mediaError) {
        console.error('Hero image update error:', mediaError);
        return NextResponse.json({ error: 'Home intro section not found for hero image' }, { status: 400 });
      }
    }

    const [updated] = await pool.execute(
      'SELECT * FROM bfriends_hero_sections WHERE id = ?',
      [id]
    );
    const hero = (updated as Record<string, unknown>[])[0];
    const mergedImageUrl = await getHomeHeroImageUrl();

    return NextResponse.json(withHeroImageField(hero, mergedImageUrl));
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
    if ((existing as unknown[]).length === 0) {
      return NextResponse.json({ error: 'Hero section not found' }, { status: 404 });
    }

    await pool.execute('DELETE FROM bfriends_hero_sections WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Hero section deleted successfully' });
  } catch (error) {
    console.error('Hero DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete hero section' }, { status: 500 });
  }
}
