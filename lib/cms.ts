import pool from '@/lib/db';
import { programsData } from './programs-data';
import { eventData } from './event-data';
import { newsData } from './news-data';
import { processData } from './process-data';
import { whyBFriendsData } from './whybfriends-data';

// Helper: try DB, fallback to static data
async function tryDb<T>(query: string, fallback: T[]): Promise<T[]> {
  try {
    const [rows] = await pool.execute(query);
    const results = rows as T[];
    return results.length > 0 ? results : fallback;
  } catch {
    return fallback;
  }
}

export async function getHeroSections() {
  return tryDb<any>(
    'SELECT * FROM bfriends_hero_sections WHERE is_active = 1 ORDER BY sort_order',
    [{ id: 1, page: 'home', title: 'Welcome to BFriends', subtitle: 'Your wellness journey starts here', video_url: '/videos/bfriends-hero.mp4', image_url: '/images/hero/hero-bg.jpg', sort_order: 0 }]
  );
}

export async function getIntroSections() {
  return tryDb<any>(
    'SELECT * FROM bfriends_intro_sections WHERE is_active = 1 ORDER BY sort_order',
    [{ id: 1, page: 'home', headline: 'Where Wellness Becomes a Way of Life', body: 'BFriends is a precision-driven wellness ecosystem.', image_url: null, show_cta: 1, sort_order: 0 }]
  );
}

export async function getWhyCards(includeHiddenInHome = false) {
  let dbRows: any[] = [];
  try {
    const query = includeHiddenInHome
      ? 'SELECT * FROM bfriends_why_cards WHERE is_active = 1 ORDER BY sort_order'
      : 'SELECT * FROM bfriends_why_cards WHERE is_active = 1 AND COALESCE(hidden_in_home, 0) = 0 ORDER BY sort_order';
    const [rows] = await pool.execute(query);
    dbRows = rows as any[];
  } catch {
    // Fallback for DBs that do not have hidden_in_home yet.
    dbRows = await tryDb<any>(
      'SELECT * FROM bfriends_why_cards WHERE is_active = 1 ORDER BY sort_order',
      []
    );
  }
  if (dbRows.length > 0) return dbRows;
  return whyBFriendsData;
}

export async function getProcessSteps(pageKey: 'home' | 'customer-journey' = 'customer-journey') {
  try {
    let rows: any;
    try {
      [rows] = await pool.execute(
        'SELECT * FROM bfriends_process_steps WHERE is_active = 1 AND page_key = ? ORDER BY sort_order',
        [pageKey]
      );
    } catch {
      // Backward compatibility before page_key migration.
      if (pageKey === 'home') return [];
      [rows] = await pool.execute(
        'SELECT * FROM bfriends_process_steps WHERE is_active = 1 ORDER BY sort_order'
      );
    }
    const steps = rows as any[];
    if (steps.length === 0) return pageKey === 'customer-journey' ? processData : [];

    for (const step of steps) {
      const [subs] = await pool.execute(
        'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
        [step.id]
      );
      step.subpoints = subs;
    }
    return steps;
  } catch {
    return processData;
  }
}

export async function getPrograms() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE is_active = 1 ORDER BY sort_order'
    );
    const programs = rows as any[];
    if (programs.length === 0) return programsData;

    for (const prog of programs) {
      const [steps] = await pool.execute(
        'SELECT id, step_id, title, description, sort_order FROM bfriends_program_steps WHERE program_id = ? ORDER BY sort_order',
        [prog.id]
      );
      const normalizedSteps = (steps as any[]).map((s) => ({
        id: s.step_id || String(s.id),
        title: s.title,
        description: s.description,
      }));
      prog.steps = normalizedSteps;
      // Keep compatibility with ProgramContent expecting pillars; source it from steps.
      prog.pillars = normalizedSteps.map((s) => ({ step_id: s.id, title: s.title, description: s.description }));

      const [sessions] = await pool.execute(
        'SELECT title, description, image FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order',
        [prog.id]
      );
      prog.sessions = sessions;
    }
    return programs;
  } catch {
    return programsData;
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE slug = ? AND is_active = 1',
      [slug]
    );
    const programs = rows as any[];
    if (programs.length === 0) return programsData.find(p => p.slug === slug) || null;

    const prog = programs[0];

    const [steps] = await pool.execute(
      'SELECT id, step_id, title, description, sort_order FROM bfriends_program_steps WHERE program_id = ? ORDER BY sort_order',
      [prog.id]
    );
    const normalizedSteps = (steps as any[]).map((s) => ({
      id: s.step_id || String(s.id),
      title: s.title,
      description: s.description,
    }));
    prog.steps = normalizedSteps;
    prog.pillars = normalizedSteps.map((s) => ({ step_id: s.id, title: s.title, description: s.description }));

    const [sessions] = await pool.execute(
      'SELECT title, description, image FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order',
      [prog.id]
    );
    prog.sessions = sessions;

    // Map DB fields to match the static data interface
    prog.buttonLabel = prog.button_label;
    prog.programItems = sessions; // map sessions as programItems for compatibility
    prog.philosophyImage = prog.philosophy_image;
    prog.pillarsImage = prog.pillars_image;
    prog.previousProgram = prog.previous_program;
    prog.nextProgram = prog.next_program;

    return prog;
  } catch {
    return programsData.find(p => p.slug === slug) || null;
  }
}

export async function getProgramSlugs(): Promise<string[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT slug FROM bfriends_programs WHERE is_active = 1 ORDER BY sort_order'
    );
    const slugs = (rows as any[]).map(r => r.slug);
    return slugs.length > 0 ? slugs : programsData.map(p => p.slug);
  } catch {
    return programsData.map(p => p.slug);
  }
}

export async function getEvents() {
  const rows = await tryDb<any>(
    'SELECT * FROM bfriends_events WHERE is_active = 1 ORDER BY sort_order',
    []
  );
  const data = rows.length > 0 ? rows : eventData;
  return (data as any[]).map((e) => ({
    ...e,
    date: e.date ?? e.event_date,
    time: e.time ?? e.event_time,
  }));
}

export async function getEventBySlug(slug: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_events WHERE slug = ? AND is_active = 1',
      [slug]
    );
    const items = rows as any[];
    if (items.length > 0) {
      const item = items[0];
      item.date = item.event_date;
      item.time = item.event_time;
      return item;
    }
    return eventData.find(e => e.slug === slug) || null;
  } catch {
    return eventData.find(e => e.slug === slug) || null;
  }
}

export async function getNews() {
  return tryDb<any>(
    'SELECT * FROM bfriends_news WHERE is_active = 1 ORDER BY sort_order',
    []
  ).then(r => r.length > 0 ? r : newsData);
}

export async function getNewsBySlug(slug: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_news WHERE slug = ? AND is_active = 1',
      [slug]
    );
    const items = rows as any[];
    if (items.length > 0) return items[0];
    return newsData.find(n => n.slug === slug) || null;
  } catch {
    return newsData.find(n => n.slug === slug) || null;
  }
}

export async function getPageHeaders() {
  return tryDb<any>(
    'SELECT * FROM bfriends_page_headers',
    []
  );
}

export async function getPhilosophySections() {
  return tryDb<any>(
    'SELECT * FROM bfriends_philosophy_sections WHERE is_active = 1 ORDER BY sort_order',
    []
  );
}

export async function getPageSeo(pageKey: string): Promise<{ seo_title: string; seo_description: string }> {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'BFriends';
  const siteDesc = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '';
  try {
    const [rows] = await pool.execute(
      'SELECT seo_title, seo_description FROM bfriends_page_headers WHERE page_key = ?',
      [pageKey]
    );
    const items = rows as any[];
    if (items.length > 0 && items[0].seo_title) {
      return {
        seo_title: items[0].seo_title,
        seo_description: items[0].seo_description || siteDesc,
      };
    }
  } catch {}
  return { seo_title: `${siteName}`, seo_description: siteDesc };
}

export async function getHeroByPage(page: string) {
  const all = await getHeroSections();
  const filtered = (all as any[]).filter((h) => h.page === page);
  return filtered.length > 0 ? filtered[0] : null;
}

export async function getIntroByPage(page: string) {
  const all = await getIntroSections();
  const filtered = (all as any[]).filter((s) => s.page === page);
  return filtered.length > 0 ? filtered[0] : null;
}

export async function getPhilosophySectionByKey(key: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_philosophy_sections WHERE section_key = ? AND is_active = 1',
      [key]
    );
    const items = rows as any[];
    return items.length > 0 ? items[0] : null;
  } catch {
    return null;
  }
}

export async function getPageHeader(pageKey: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_page_headers WHERE page_key = ?',
      [pageKey]
    );
    const items = rows as any[];
    return items.length > 0 ? items[0] : null;
  } catch {
    return null;
  }
}

export async function getMembershipContent() {
  return tryDb<any>('SELECT * FROM bfriends_membership_content WHERE is_active = 1', []);
}

export async function getCharmTiers() {
  return tryDb<any>('SELECT * FROM bfriends_charm_tiers WHERE is_active = 1 ORDER BY sort_order', []);
}

export async function getCharmUsage() {
  return tryDb<any>('SELECT * FROM bfriends_charm_usage WHERE is_active = 1 ORDER BY sort_order', []);
}

export async function getSiteSettings() {
  try {
    const [rows] = await pool.execute('SELECT setting_key, setting_value FROM bfriends_site_settings');
    const settings = rows as any[];
    const map: Record<string, string> = {};
    for (const s of settings) map[s.setting_key] = s.setting_value;
    return map;
  } catch {
    return {
      site_name: 'BFriends',
      contact_phone: '+62 811-2874-2021',
      contact_whatsapp: 'https://wa.me/6281128742021',
    };
  }
}
