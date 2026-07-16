import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';
import { mockTreatments, mockTreatmentsPage } from '../mock/treatments.ts';
import { mockContactPage } from '../mock/contact.ts';
import { mockJourneyPartnersPage } from '../mock/journey-partners.ts';
import { mockSpaPages } from '../mock/spa.ts';

for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const name = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  if (name) process.env[name] = value;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing Supabase env vars');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const DEFAULT_ABOUT_INTRO = {
  id: 1,
  eyebrow: 'About BFriends',
  title: 'A More Personal Approach to Wellness',
  sub: `At BFriends, wellness begins with understanding the individual. By combining advanced body assessment technology with expert guidance

We create personalized wellness journeys designed to evolve alongside
your needs, goals, and progress.`,
};

const DEFAULT_ABOUT_PILLARS = [
  {
    id: 'about-bfriends',
    image: '/images/Integrate/DDK09278.webp',
    image_alt: 'Exterior of the BFriends signature building in Kerobokan, Bali',
    title: 'About BFriends',
    description: '(to be writing soon)',
    button_label: 'Explore BFriends →',
    href: '/treatments',
    sort_order: 0,
    is_active: true,
  },
  {
    id: 'journey-partners',
    image: '/images/Nurture/DDK09121.webp',
    image_alt: 'BFriends journey partners guiding a wellness experience',
    title: 'Meet Our Experts',
    description:
      'Behind every personalized journey is a multidisciplinary team dedicated to understanding, guiding, and supporting your wellness goals.',
    button_label: 'Meet the Journey Partners →',
    href: '/journey-partners',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'bproject',
    image: '/images/connection.webp',
    image_alt: 'Map of Bali showing BFriends and Daewoong business units',
    title: 'The BProject',
    description:
      'Discover the integrated wellness ecosystem developed by Bali Daewoong, bringing together hospitality, workspace, wellness, and lifestyle destinations under one vision.',
    button_label: 'Explore Our Destinations →',
    href: null,
    sort_order: 2,
    is_active: true,
  },
];

async function replaceSpecGroups(treatmentId: string, specGroups: typeof mockTreatments[number]['spec_groups']) {
  const { error: delError } = await supabase
    .from('bfriends_treatment_spec_groups')
    .delete()
    .eq('treatment_id', treatmentId);
  if (delError) throw new Error(`spec delete ${treatmentId}: ${delError.message}`);

  for (let gi = 0; gi < specGroups.length; gi++) {
    const group = specGroups[gi];
    const { data: inserted, error } = await supabase
      .from('bfriends_treatment_spec_groups')
      .insert({
        treatment_id: treatmentId,
        title: group.title || '',
        description: group.description || null,
        sort_order: gi,
      })
      .select('id')
      .single();
    if (error || !inserted) throw new Error(`spec group ${treatmentId}: ${error?.message}`);

    const rows = (group.items ?? [])
      .map((text, ii) => ({ group_id: inserted.id, item_text: text, sort_order: ii }))
      .filter((r) => r.item_text.trim());
    if (rows.length) {
      const { error: itemError } = await supabase.from('bfriends_treatment_spec_items').insert(rows);
      if (itemError) throw new Error(`spec items ${treatmentId}: ${itemError.message}`);
    }
  }
}

async function main() {
  const results: string[] = [];

  {
    const { error } = await supabase.from('bfriends_treatments_page').upsert({ id: 1, ...mockTreatmentsPage });
    if (error) throw new Error(`bfriends_treatments_page: ${error.message}`);
    results.push('bfriends_treatments_page');
  }

  {
    const { error } = await supabase.from('bfriends_treatments').upsert(
      mockTreatments.map((t) => ({
        id: t.id,
        name: t.name,
        facility: t.facility,
        pillar: t.pillar,
        pillar_label: t.pillarLabel,
        floor: t.floor,
        image: t.image,
        sub: t.sub,
        sort_order: t.sort_order,
        seo_title: t.seo_title,
        seo_description: t.seo_description,
        hero_headline: t.hero_headline,
        about_body: t.about_body,
        spec_section_label: t.spec_section_label,
        cta_headline: t.cta.headline,
        cta_description: t.cta.description,
        cta_label: t.cta.label,
        cta_href: t.cta.href,
        cta_external: !!t.cta.external,
        is_active: true,
      })),
    );
    if (error) throw new Error(`bfriends_treatments: ${error.message}`);
    for (const t of mockTreatments) await replaceSpecGroups(t.id, t.spec_groups);
    results.push('bfriends_treatments');
  }

  {
    const { hours_sections, platforms, ...page } = mockContactPage;
    const { error } = await supabase.from('bfriends_contact_page').upsert({ id: 1, ...page });
    if (error) throw new Error(`bfriends_contact_page: ${error.message}`);

    const { data: existingSections } = await supabase.from('bfriends_contact_hours_sections').select('id');
    if (existingSections?.length) {
      await supabase.from('bfriends_contact_hours_sections').delete().in('id', existingSections.map((s) => s.id));
    }
    for (let si = 0; si < hours_sections.length; si++) {
      const section = hours_sections[si];
      const { data: inserted, error: secError } = await supabase
        .from('bfriends_contact_hours_sections')
        .insert({ title: section.title, sort_order: si })
        .select('id')
        .single();
      if (secError || !inserted) throw new Error(`hours section: ${secError?.message}`);
      const rows = section.entries.map((entry, ei) => ({
        section_id: inserted.id,
        label: entry.label ?? null,
        entry_text: entry.text,
        sort_order: ei,
      }));
      if (rows.length) {
        const { error: entryError } = await supabase.from('bfriends_contact_hours_entries').insert(rows);
        if (entryError) throw new Error(`hours entries: ${entryError.message}`);
      }
    }

    const { data: existingPlatforms } = await supabase.from('bfriends_contact_platforms').select('id');
    if (existingPlatforms?.length) {
      await supabase.from('bfriends_contact_platforms').delete().in('id', existingPlatforms.map((p) => p.id));
    }
    const { error: platError } = await supabase.from('bfriends_contact_platforms').insert(
      platforms.map((p, i) => ({ id: p.id, label: p.label, href: p.href, sort_order: i })),
    );
    if (platError) throw new Error(`platforms: ${platError.message}`);
    results.push('bfriends_contact_page');
  }

  {
    const { error } = await supabase.from('bfriends_journey_partners_page').upsert({
      id: 1,
      seo_title: mockJourneyPartnersPage.seo_title,
      seo_description: mockJourneyPartnersPage.seo_description,
      breadcrumb: mockJourneyPartnersPage.breadcrumb,
      hero_title: mockJourneyPartnersPage.hero_title,
      hero_description: mockJourneyPartnersPage.hero_description,
      header_image: mockJourneyPartnersPage.header_image,
    });
    if (error) throw new Error(`bfriends_journey_partners_page: ${error.message}`);
    results.push('bfriends_journey_partners_page');
  }

  {
    const { error } = await supabase.from('bfriends_journey_partner_teams').upsert(
      mockJourneyPartnersPage.teams.map((team, i) => ({
        id: team.id,
        title: team.title,
        image: team.image,
        image_alt: team.image_alt,
        body: team.body,
        sort_order: i,
        is_active: true,
      })),
    );
    if (error) throw new Error(`bfriends_journey_partner_teams: ${error.message}`);
    results.push('bfriends_journey_partner_teams');
  }

  {
    const { error } = await supabase.from('bfriends_spa_pages').upsert(
      Object.values(mockSpaPages).map((page) => ({
        slug: page.slug,
        title: page.title,
        subtitle: page.subtitle ?? null,
        eyebrow: page.eyebrow,
        breadcrumb: page.breadcrumb,
        header_image: page.header_image,
        program_slugs: page.program_slugs,
        program_name_keywords: page.program_name_keywords ?? null,
        session_group_keywords: page.session_group_keywords ?? null,
        session_group_exclude_keywords: page.session_group_exclude_keywords ?? null,
        services_heading: page.services_heading,
        sessions_title: page.sessions_title,
        seo_title: page.seo_title,
        seo_description: page.seo_description,
        is_active: true,
      })),
    );
    if (error) throw new Error(`bfriends_spa_pages: ${error.message}`);
    results.push('bfriends_spa_pages');
  }

  {
    const { error } = await supabase.from('bfriends_about_intro').upsert(DEFAULT_ABOUT_INTRO);
    if (error) throw new Error(`bfriends_about_intro: ${error.message}`);
    results.push('bfriends_about_intro');
  }

  {
    const { error } = await supabase.from('bfriends_about_pillars').upsert(DEFAULT_ABOUT_PILLARS);
    if (error) throw new Error(`bfriends_about_pillars: ${error.message}`);
    results.push('bfriends_about_pillars');
  }

  console.log('Seeded:', results.join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
