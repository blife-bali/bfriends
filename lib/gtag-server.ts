import { cache } from 'react';
import pool from '@/lib/db';

const GA_ID_PATTERN = /^G-[A-Z0-9]+$/i;

export const getGoogleAnalyticsId = cache(async (): Promise<string | null> => {
  try {
    const [rows] = await pool.execute(
      'SELECT setting_value FROM bfriends_site_settings WHERE setting_key = ?',
      ['google_analytics_id']
    );
    const items = rows as Array<{ setting_value: string | null }>;
    const value = items[0]?.setting_value?.trim();
    if (!value || !GA_ID_PATTERN.test(value)) return null;
    return value;
  } catch {
    return null;
  }
});
