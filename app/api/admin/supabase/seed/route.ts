import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/client';
import { mockTreatments, mockTreatmentsPage } from '@/mock/treatments';
import { mockContactPage } from '@/mock/contact';
import { mockJourneyPartnersPage } from '@/mock/journey-partners';
import { mockSpaPages } from '@/mock/spa';
import {
  ctaToColumns,
  replaceContactHours,
  replaceContactPlatforms,
  replaceSpecGroups,
} from '@/lib/supabase-bfriends-tables';

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
    href: undefined,
    sort_order: 2,
    is_active: true,
  },
];

export async function POST() {
  const authError = await requireAuth();
  if (authError) return authError;

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env' },
      { status: 503 }
    );
  }

  try {
    const results: string[] = [];

    await supabase.from('bfriends_treatments_page').upsert({
      id: 1,
      seo_title: mockTreatmentsPage.seo_title,
      seo_description: mockTreatmentsPage.seo_description,
      breadcrumb: mockTreatmentsPage.breadcrumb,
      header_title: mockTreatmentsPage.header_title,
      header_image: mockTreatmentsPage.header_image,
      intro_title: mockTreatmentsPage.intro_title,
      intro_body: mockTreatmentsPage.intro_body,
    });
    results.push('bfriends_treatments_page');

    await supabase.from('bfriends_treatments').upsert(
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
        ...ctaToColumns(t.cta),
        is_active: true,
      }))
    );

    for (const t of mockTreatments) {
      await replaceSpecGroups(supabase, t.id, t.spec_groups);
    }
    results.push(`${mockTreatments.length} treatments`);

    await supabase.from('bfriends_contact_page').upsert({
      id: 1,
      seo_title: mockContactPage.seo_title,
      seo_description: mockContactPage.seo_description,
      title: mockContactPage.title,
      description: mockContactPage.description,
      image: mockContactPage.image,
      image_alt: mockContactPage.image_alt,
      location_name: mockContactPage.location_name,
      address: mockContactPage.address,
      map_href: mockContactPage.map_href,
    });
    await replaceContactHours(supabase, mockContactPage.hours_sections);
    await replaceContactPlatforms(supabase, mockContactPage.platforms);
    results.push('bfriends_contact_page');

    await supabase.from('bfriends_journey_partners_page').upsert({
      id: 1,
      seo_title: mockJourneyPartnersPage.seo_title,
      seo_description: mockJourneyPartnersPage.seo_description,
      breadcrumb: mockJourneyPartnersPage.breadcrumb,
      hero_title: mockJourneyPartnersPage.hero_title,
      hero_description: mockJourneyPartnersPage.hero_description,
      header_image: mockJourneyPartnersPage.header_image,
    });
    results.push('bfriends_journey_partners_page');

    await supabase.from('bfriends_journey_partner_teams').upsert(
      mockJourneyPartnersPage.teams.map((team, i) => ({
        id: team.id,
        title: team.title,
        image: team.image,
        image_alt: team.image_alt,
        body: team.body,
        sort_order: i,
        is_active: true,
      }))
    );
    results.push(`${mockJourneyPartnersPage.teams.length} journey partner teams`);

    await supabase.from('bfriends_spa_pages').upsert(
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
      }))
    );
    results.push(`${Object.keys(mockSpaPages).length} spa pages`);

    await supabase.from('bfriends_about_intro').upsert(DEFAULT_ABOUT_INTRO);
    results.push('bfriends_about_intro');

    await supabase.from('bfriends_about_pillars').upsert(DEFAULT_ABOUT_PILLARS);
    results.push(`${DEFAULT_ABOUT_PILLARS.length} about pillars`);

    return NextResponse.json({ success: true, seeded: results });
  } catch (error) {
    console.error('Supabase seed error:', error);
    return NextResponse.json({ error: 'Failed to seed Supabase content' }, { status: 500 });
  }
}
