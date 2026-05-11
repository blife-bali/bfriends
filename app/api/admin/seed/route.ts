import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { requireAuth } from '@/lib/auth';
import { replaceProgramChildren } from '@/lib/admin-program-children';
import { programsData } from '@/lib/programs-data';
import { eventData } from '@/lib/event-data';
import { newsData } from '@/lib/news-data';
import { processData } from '@/lib/process-data';
import { whyBFriendsData } from '@/lib/whybfriends-data';

export async function GET() {
  try {
    const tables = [
      'bfriends_admin_users', 'bfriends_hero_sections', 'bfriends_intro_sections',
      'bfriends_why_cards', 'bfriends_process_steps', 'bfriends_programs',
      'bfriends_events', 'bfriends_news', 'bfriends_page_headers',
      'bfriends_philosophy_sections', 'bfriends_membership_content',
      'bfriends_charm_tiers', 'bfriends_charm_usage', 'bfriends_site_settings',
    ];
    const counts: Record<string, number> = {};
    for (const table of tables) {
      try {
        const [rows] = await pool.execute(`SELECT COUNT(*) as count FROM ${table}`);
        counts[table] = (rows as any[])[0].count;
      } catch { counts[table] = -1; }
    }
    return NextResponse.json({ counts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authError = await requireAuth();
    if (authError) return authError;

    const { reset } = await req.json().catch(() => ({ reset: false }));

    if (reset) {
      const tables = [
        'bfriends_program_sessions', 'bfriends_program_session_types', 'bfriends_program_pillars', 'bfriends_program_steps',
        'bfriends_process_subpoints', 'bfriends_charm_usage', 'bfriends_charm_tiers',
        'bfriends_membership_content', 'bfriends_philosophy_sections', 'bfriends_page_headers',
        'bfriends_site_settings', 'bfriends_news', 'bfriends_events',
        'bfriends_programs', 'bfriends_process_steps', 'bfriends_why_cards',
        'bfriends_intro_sections', 'bfriends_hero_sections',
      ];
      for (const t of tables) {
        try { await pool.execute(`DELETE FROM ${t}`); } catch {}
      }
    }

    const results: string[] = [];

    // 1. Admin user
    const [existingAdmin] = await pool.execute('SELECT id FROM bfriends_admin_users WHERE username = ?', ['admin']);
    if ((existingAdmin as any[]).length === 0) {
      const hash = await bcrypt.hash('admin123', 10);
      await pool.execute('INSERT INTO bfriends_admin_users (username, password_hash, display_name) VALUES (?, ?, ?)', ['admin', hash, 'Administrator']);
      results.push('Admin user created');
    } else {
      results.push('Admin user already exists');
    }

    // 2. Hero sections
    const [existingHero] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_hero_sections');
    if ((existingHero as any[])[0].c === 0) {
      await pool.execute(
        `INSERT INTO bfriends_hero_sections (page, title, subtitle, video_url, image_url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
        ['home', 'Welcome to BFriends', 'Your wellness journey starts here', '/videos/bfriends-hero.mp4', '/images/hero/hero-bg.jpg', 0]
      );
      results.push('Hero section seeded');
    }

    // 3. Intro sections
    const [existingIntro] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_intro_sections');
    if ((existingIntro as any[])[0].c === 0) {
      await pool.execute(
        `INSERT INTO bfriends_intro_sections (page, headline, body, image_url, show_cta, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
        ['home', 'Where Wellness Becomes a Way of Life', 'BFriends is a precision-driven wellness ecosystem that combines fitness, recovery, therapy, and beauty under one roof. Every program is designed around your body\'s unique needs.', '/images/intro/intro.jpg', 1, 0]
      );
      results.push('Intro section seeded');
    }

    // 4. Why BFriends cards
    const [existingWhy] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_why_cards');
    if ((existingWhy as any[])[0].c === 0) {
      for (let i = 0; i < whyBFriendsData.length; i++) {
        const item = whyBFriendsData[i];
        await pool.execute(
          'INSERT INTO bfriends_why_cards (point, subpoint, image, sort_order) VALUES (?, ?, ?, ?)',
          [item.point, item.subpoint, item.image, i]
        );
      }
      results.push(`${whyBFriendsData.length} why cards seeded`);
    }

    // 5. Process steps + subpoints
    const [existingProcess] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_process_steps');
    if ((existingProcess as any[])[0].c === 0) {
      for (let i = 0; i < processData.length; i++) {
        const step = processData[i];
        const [res] = await pool.execute(
          'INSERT INTO bfriends_process_steps (number, title, description, image, sort_order) VALUES (?, ?, ?, ?, ?)',
          [step.number, step.title, step.description, step.image, i]
        );
        const stepId = (res as any).insertId;
        if (step.subpoints) {
          for (let j = 0; j < step.subpoints.length; j++) {
            const sp = step.subpoints[j];
            await pool.execute(
              'INSERT INTO bfriends_process_subpoints (step_id, title, description, sort_order) VALUES (?, ?, ?, ?)',
              [stepId, sp.title, sp.description, j]
            );
          }
        }
      }
      results.push(`${processData.length} process steps seeded`);
    }

    // 6. Programs + steps + pillars + sessions
    const [existingPrograms] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_programs');
    if ((existingPrograms as any[])[0].c === 0) {
      for (let i = 0; i < programsData.length; i++) {
        const p = programsData[i];
        const [res] = await pool.execute(
          `INSERT INTO bfriends_programs (name, slug, eyebrow, title, subheading, image, button_label, quote, philosophy, breadcrumb, philosophy_image, pillars_image, pillars_title, pillars_paragraph, previous_program, next_program, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.name,
            p.slug,
            p.eyebrow,
            p.title,
            p.subheading,
            p.image,
            p.buttonLabel,
            p.quote || null,
            p.philosophy || null,
            p.breadcrumb || null,
            p.philosophyImage || null,
            p.pillarsImage || null,
            p.pillarsTitle ?? null,
            p.pillarsParagraph ?? null,
            p.previousProgram || null,
            p.nextProgram || null,
            i,
          ]
        );
        const progId = (res as any).insertId;

        // Pillars
        if (p.pillars) {
          for (let j = 0; j < p.pillars.length; j++) {
            const pl = p.pillars[j];
            await pool.execute(
              'INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES (?, ?, ?, ?)',
              [progId, pl.title, pl.description, j]
            );
          }
        }

        const stepsPayload = (p.steps || []).map((s, j) => ({
          step_id: s.id,
          title: s.title,
          description: s.desc,
          sort_order: j,
        }));
        const session_types =
          p.sessionGroups?.map((g, gi) => ({
            title: g.typeTitle,
            sort_order: gi,
            sessions: (g.sessions || []).map((s, j) => ({
              title: s.title,
              description: s.description,
              image: s.image ?? null,
              icon: null,
              sort_order: j,
            })),
          })) ?? undefined;

        const conn = await pool.getConnection();
        try {
          await conn.beginTransaction();
          await replaceProgramChildren(
          conn,
          String(progId),
          stepsPayload,
          session_types,
          p.sessionGroups ? undefined : p.sessions
        );
          await conn.commit();
        } catch (e) {
          await conn.rollback();
          throw e;
        } finally {
          conn.release();
        }
      }
      results.push(`${programsData.length} programs seeded`);
    }

    // 7. Events
    const [existingEvents] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_events');
    if ((existingEvents as any[])[0].c === 0) {
      for (let i = 0; i < eventData.length; i++) {
        const e = eventData[i];
        await pool.execute(
          `INSERT INTO bfriends_events (slug, name, ecosystem, event_date, event_time, text, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [e.slug, e.name, e.ecosystem, e.date, e.time, e.text, e.image, i]
        );
      }
      results.push(`${eventData.length} events seeded`);
    }

    // 8. News
    const [existingNews] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_news');
    if ((existingNews as any[])[0].c === 0) {
      for (let i = 0; i < newsData.length; i++) {
        const n = newsData[i];
        await pool.execute(
          `INSERT INTO bfriends_news (slug, name, ecosystem, timestamp, author, text, image, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [n.slug, n.name, n.ecosystem, n.timestamp, n.author, n.text, n.image, i]
        );
      }
      results.push(`${newsData.length} news seeded`);
    }

    // 9. Page headers
    const [existingHeaders] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_page_headers');
    if ((existingHeaders as any[])[0].c === 0) {
      const headers = [
        { page_key: 'philosophy', title: 'Our Philosophy', breadcrumb: 'About / Philosophy', image: '/images/about/philosophy.jpg' },
        { page_key: 'customer-journey', title: 'Customer Journey', breadcrumb: 'About / Customer Journey', image: '/images/about/customer-journey.jpg' },
        { page_key: 'bfriends-passport', title: 'BFriends Passport', breadcrumb: 'Membership / Passport', image: '/images/membership/passport.jpg' },
        { page_key: 'charm', title: 'Charm', breadcrumb: 'Membership / Charm', image: '/images/membership/charm.jpg' },
        { page_key: 'event-workshop', title: 'Event & Workshop', breadcrumb: 'Community / Events', image: '/images/community/events.jpg' },
        { page_key: 'blife-ecosystem-news', title: 'BFriends Journal', breadcrumb: 'Community / Journal', image: '/images/community/news.jpg' },
      ];
      for (const h of headers) {
        await pool.execute(
          'INSERT INTO bfriends_page_headers (page_key, title, breadcrumb, image) VALUES (?, ?, ?, ?)',
          [h.page_key, h.title, h.breadcrumb, h.image]
        );
      }
      results.push(`${headers.length} page headers seeded`);
    }

    // 10. Philosophy sections
    const [existingPhil] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_philosophy_sections');
    if ((existingPhil as any[])[0].c === 0) {
      const phils = [
        { section_key: 'manifesto', headline: 'Our Manifesto', body: 'We believe wellness is not a destination but a continuous practice. BFriends exists to guide that practice with precision, care, and community.', sort_order: 0 },
        { section_key: 'core-beliefs', headline: 'Core Beliefs', body: 'Precision over intensity. Consistency over perfection. Evidence over trend. These are the pillars that guide everything we do at BFriends.', sort_order: 1 },
        { section_key: 'integrated-self', headline: 'The Integrated Self', body: 'True wellness integrates body, mind, and spirit. Our programs are designed to address all three dimensions simultaneously.', sort_order: 2 },
        { section_key: 'blife-ecosystem', headline: 'BLife Ecosystem', body: 'BFriends is part of the BLife ecosystem—connected with BWork, BNesta, BLive, Alam Kulkul, and Nulook to support every aspect of your life.', sort_order: 3 },
      ];
      for (const p of phils) {
        await pool.execute(
          'INSERT INTO bfriends_philosophy_sections (section_key, headline, body, sort_order) VALUES (?, ?, ?, ?)',
          [p.section_key, p.headline, p.body, p.sort_order]
        );
      }
      results.push(`${phils.length} philosophy sections seeded`);
    }

    // 11. Site settings
    const [existingSettings] = await pool.execute('SELECT COUNT(*) as c FROM bfriends_site_settings');
    if ((existingSettings as any[])[0].c === 0) {
      const settings = [
        { key: 'site_name', value: 'BFriends' },
        { key: 'contact_phone', value: '+62 811-2874-2021' },
        { key: 'contact_whatsapp', value: 'https://wa.me/6281128742021' },
        { key: 'contact_email', value: 'hello@bfriends.id' },
      ];
      for (const s of settings) {
        await pool.execute(
          'INSERT INTO bfriends_site_settings (setting_key, setting_value) VALUES (?, ?)',
          [s.key, s.value]
        );
      }
      results.push(`${settings.length} site settings seeded`);
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seeding failed', details: String(error) }, { status: 500 });
  }
}
