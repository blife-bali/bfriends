import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import {
  getHomeHeroImageUrl,
  updateHomeHeroImage,
  withHeroImageField,
} from '@/lib/home-section-media';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM bfriends_hero_sections WHERE page = 'home' ORDER BY sort_order"
    );
    const imageUrl = await getHomeHeroImageUrl();
    const items = (rows as Record<string, unknown>[]).map((hero) =>
      withHeroImageField(hero, imageUrl)
    );
    return NextResponse.json(items);
  } catch (error) {
    console.error('Hero GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero sections' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const body = await req.json();
    const { title, subtitle, image_url, sort_order, is_active } = body;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    const [result] = await pool.execute(
      'INSERT INTO bfriends_hero_sections (page, title, subtitle, video_url, image_url, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      ['home', title, subtitle || null, null, null, sort_order || 0, is_active !== undefined ? is_active : 1]
    );

    if (image_url !== undefined) {
      try {
        await updateHomeHeroImage(image_url || null);
      } catch (mediaError) {
        console.error('Hero image update error:', mediaError);
        return NextResponse.json({ error: 'Home intro section not found for hero image' }, { status: 400 });
      }
    }

    const insertResult = result as { insertId: number };
    const [newRows] = await pool.execute(
      'SELECT * FROM bfriends_hero_sections WHERE id = ?',
      [insertResult.insertId]
    );
    const hero = (newRows as Record<string, unknown>[])[0];
    const mergedImageUrl = await getHomeHeroImageUrl();

    return NextResponse.json(withHeroImageField(hero, mergedImageUrl), { status: 201 });
  } catch (error) {
    console.error('Hero POST error:', error);
    return NextResponse.json({ error: 'Failed to create hero section' }, { status: 500 });
  }
}
