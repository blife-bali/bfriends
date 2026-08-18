import { NextResponse } from 'next/server';
import pool, { type DbRow } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.execute(
      'SELECT setting_value FROM bfriends_site_settings WHERE setting_key = ?',
      ['google_analytics_id']
    );
    const items = rows as DbRow[];
    return NextResponse.json({ google_analytics_id: items.length > 0 ? items[0].setting_value : '' });
  } catch {
    return NextResponse.json({ google_analytics_id: '' });
  }
}
