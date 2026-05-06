import pool from '@/lib/db';
import { buildSessionGroupsPublic } from '@/lib/admin-program-children';

// Helper: run query, return [] on error
async function tryDb<T>(query: string): Promise<T[]> {
  try {
    const [rows] = await pool.execute(query);
    return rows as T[];
  } catch {
    return [];
  }
}

export async function getHeroSections() {
  return tryDb<any>('SELECT * FROM bfriends_hero_sections WHERE is_active = 1 ORDER BY sort_order');
}

export async function getIntroSections() {
  return tryDb<any>('SELECT * FROM bfriends_intro_sections WHERE is_active = 1 ORDER BY sort_order');
}

export async function getWhyCards(includeHiddenInHome = false) {
  try {
    const query = includeHiddenInHome
      ? 'SELECT * FROM bfriends_why_cards WHERE is_active = 1 ORDER BY sort_order'
      : 'SELECT * FROM bfriends_why_cards WHERE is_active = 1 AND COALESCE(hidden_in_home, 0) = 0 ORDER BY sort_order';
    const [rows] = await pool.execute(query);
    return rows as any[];
  } catch {
    // Fallback for DBs that do not have hidden_in_home yet.
    return tryDb<any>('SELECT * FROM bfriends_why_cards WHERE is_active = 1 ORDER BY sort_order');
  }
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

    for (const step of steps) {
      const [subs] = await pool.execute(
        'SELECT * FROM bfriends_process_subpoints WHERE step_id = ? ORDER BY sort_order',
        [step.id]
      );
      step.subpoints = subs;
    }
    return steps;
  } catch {
    return [];
  }
}

export async function getPrograms() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE is_active = 1 ORDER BY sort_order'
    );
    const programs = rows as any[];

    for (const prog of programs) {
      prog.buttonLabel = prog.button_label;
      prog.philosophyImage = prog.philosophy_image;
      prog.pillarsImage = prog.pillars_image;
      prog.pillarsTitle = prog.pillars_title ?? null;
      prog.pillarsParagraph = prog.pillars_paragraph ?? null;
      prog.previousProgram = prog.previous_program;
      prog.nextProgram = prog.next_program;
    }
    return programs;
  } catch {
    return [];
  }
}

export async function getProgramBySlug(slug: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_programs WHERE slug = ? AND is_active = 1',
      [slug]
    );
    const programs = rows as any[];
    if (programs.length === 0) return null;

    const prog = programs[0];

    let sessions: any[] = [];
    let sessionGroups: ReturnType<typeof buildSessionGroupsPublic> = [];
    try {
      const [typeRows] = await pool.execute(
        'SELECT * FROM bfriends_program_session_types WHERE program_id = ? ORDER BY sort_order, id',
        [prog.id]
      );
      const [sessionRows] = await pool.execute(
        'SELECT title, description, image, session_type_id FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order, id',
        [prog.id]
      );
      sessions = sessionRows as any[];
      sessionGroups = buildSessionGroupsPublic(typeRows as any[], sessionRows as any[]);
    } catch {
      const [sessionRows] = await pool.execute(
        'SELECT title, description, image FROM bfriends_program_sessions WHERE program_id = ? ORDER BY sort_order, id',
        [prog.id]
      );
      sessions = sessionRows as any[];
      sessionGroups =
        sessions.length > 0
          ? [{ typeTitle: 'Signature Sessions', sessions }]
          : [];
    }

    prog.sessions = sessions;
    prog.sessionGroups = sessionGroups;

    // Map DB fields to match the static data interface
    prog.buttonLabel = prog.button_label;
    prog.programItems = sessions; // map sessions as programItems for compatibility
    prog.philosophyImage = prog.philosophy_image;
    prog.pillarsImage = prog.pillars_image;
    prog.pillarsTitle = prog.pillars_title ?? null;
    prog.pillarsParagraph = prog.pillars_paragraph ?? null;
    prog.previousProgram = prog.previous_program;
    prog.nextProgram = prog.next_program;

    return prog;
  } catch {
    return null;
  }
}

export async function getProgramSlugs(): Promise<string[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT slug FROM bfriends_programs WHERE is_active = 1 ORDER BY sort_order'
    );
    return (rows as any[]).map(r => r.slug);
  } catch {
    return [];
  }
}

export async function getEvents() {
  const rows = await tryDb<any>(
    'SELECT * FROM bfriends_events WHERE is_active = 1 ORDER BY sort_order'
  );
  return rows.map((e) => ({
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
    return null;
  } catch {
    return null;
  }
}

export async function getNews() {
  return tryDb<any>(
    'SELECT * FROM bfriends_news WHERE is_active = 1 ORDER BY sort_order'
  );
}

export async function getNewsBySlug(slug: string) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_news WHERE slug = ? AND is_active = 1',
      [slug]
    );
    const items = rows as any[];
    return items.length > 0 ? items[0] : null;
  } catch {
    return null;
  }
}

export async function getPageHeaders() {
  return tryDb<any>('SELECT * FROM bfriends_page_headers');
}

export async function getPhilosophySections() {
  return tryDb<any>('SELECT * FROM bfriends_philosophy_sections WHERE is_active = 1 ORDER BY sort_order');
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
  return tryDb<any>('SELECT * FROM bfriends_membership_content WHERE is_active = 1');
}

export async function getCharmTiers() {
  return tryDb<any>('SELECT * FROM bfriends_charm_tiers WHERE is_active = 1 ORDER BY sort_order');
}

export async function getCharmUsage() {
  return tryDb<any>('SELECT * FROM bfriends_charm_usage WHERE is_active = 1 ORDER BY sort_order');
}

export async function getCoreBeliefs() {
  return tryDb<any>('SELECT * FROM bfriends_core_beliefs WHERE is_active = 1 ORDER BY sort_order');
}

export async function getEcosystemItems() {
  return tryDb<any>('SELECT * FROM bfriends_ecosystem_items WHERE is_active = 1 ORDER BY sort_order');
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

export async function getFaqs() {
  return tryDb<any>('SELECT * FROM bfriends_faqs WHERE is_active = 1 ORDER BY sort_order');
}

export async function getPassportBenefits() {
  return tryDb<any>('SELECT * FROM bfriends_passport_benefits WHERE is_active = 1 ORDER BY sort_order');
}

export async function getJourneySection() {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM bfriends_journey_sections WHERE is_active = 1 ORDER BY sort_order LIMIT 1'
    );
    const items = rows as any[];
    return items.length > 0 ? items[0] : null;
  } catch {
    return null;
  }
}
