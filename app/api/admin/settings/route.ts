import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const [rows] = await pool.execute('SELECT * FROM bfriends_site_settings');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const body = await req.json();
    const { setting_key, setting_value } = body;

    if (!setting_key) {
      return NextResponse.json({ error: 'setting_key is required' }, { status: 400 });
    }

    await pool.execute(
      `INSERT INTO bfriends_site_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [setting_key, setting_value ?? '']
    );

    return NextResponse.json({ message: 'Setting saved successfully' });
  } catch (error) {
    console.error('Error saving setting:', error);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}
