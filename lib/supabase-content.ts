import {
  mockTreatments,
  mockTreatmentsPage,
  treatmentNameInline,
  type MockTreatment,
  type MockTreatmentsPage,
} from '@/mock/treatments';
import { mockContactPage, type MockContactPage } from '@/mock/contact';
import {
  mockJourneyPartnersPage,
  type JourneyPartnerTeam,
  type MockJourneyPartnersPage,
} from '@/mock/journey-partners';
import { getMockSpaPage, mockSpaPages, type MockSpaPage, type SpaSlug } from '@/mock/spa';
import { getSupabasePublic } from '@/lib/supabase/client';
import {
  ctaFromRow,
  loadContactHours,
  loadContactPlatforms,
  loadSpecGroupsByTreatment,
  type TreatmentRow,
} from '@/lib/supabase-bfriends-tables';

function mapTreatment(row: TreatmentRow, specGroups: MockTreatment['spec_groups']): MockTreatment {
  return {
    id: row.id as MockTreatment['id'],
    name: row.name,
    facility: row.facility,
    pillar: row.pillar ?? '',
    pillarLabel: row.pillar_label ?? '',
    floor: row.floor ?? '',
    image: row.image ?? '',
    sub: row.sub ?? '',
    sort_order: row.sort_order,
    seo_title: row.seo_title ?? '',
    seo_description: row.seo_description ?? '',
    hero_headline: row.hero_headline ?? '',
    about_body: row.about_body ?? '',
    spec_section_label: row.spec_section_label ?? '',
    spec_groups: specGroups,
    cta: ctaFromRow(row),
  };
}

function mapSpaPage(row: Record<string, unknown>): MockSpaPage {
  return {
    slug: row.slug as SpaSlug,
    title: String(row.title ?? ''),
    subtitle: row.subtitle ? String(row.subtitle) : undefined,
    eyebrow: String(row.eyebrow ?? ''),
    breadcrumb: String(row.breadcrumb ?? ''),
    header_image: String(row.header_image ?? ''),
    program_slugs: (row.program_slugs as string[]) ?? [],
    program_name_keywords: (row.program_name_keywords as string[] | null) ?? undefined,
    session_group_keywords: (row.session_group_keywords as string[] | null) ?? undefined,
    session_group_exclude_keywords: (row.session_group_exclude_keywords as string[] | null) ?? undefined,
    services_heading: String(row.services_heading ?? ''),
    sessions_title: String(row.sessions_title ?? ''),
    seo_title: String(row.seo_title ?? ''),
    seo_description: String(row.seo_description ?? ''),
  };
}

export type AboutPillar = {
  id: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  href?: string;
};

export type AboutIntro = {
  eyebrow: string;
  title: string;
  sub: string;
};

const DEFAULT_ABOUT_INTRO: AboutIntro = {
  eyebrow: 'About BFriends',
  title: 'A More Personal Approach to Wellness',
  sub: `At BFriends, wellness begins with understanding the individual. By combining advanced body assessment technology with expert guidance

We create personalized wellness journeys designed to evolve alongside
your needs, goals, and progress.`,
};

const DEFAULT_ABOUT_PILLARS: AboutPillar[] = [
  {
    id: 'about-bfriends',
    image: '/images/Integrate/DDK09278.webp',
    imageAlt: 'Exterior of the BFriends signature building in Kerobokan, Bali',
    title: 'About BFriends',
    description: '(to be writing soon)',
    buttonLabel: 'Explore BFriends →',
    href: '/treatments',
  },
  {
    id: 'journey-partners',
    image: '/images/Nurture/DDK09121.webp',
    imageAlt: 'BFriends journey partners guiding a wellness experience',
    title: 'Meet Our Experts',
    description:
      'Behind every personalized journey is a multidisciplinary team dedicated to understanding, guiding, and supporting your wellness goals.',
    buttonLabel: 'Meet the Journey Partners →',
    href: '/journey-partners',
  },
  {
    id: 'bproject',
    image: '/images/connection.webp',
    imageAlt: 'Map of Bali showing BFriends and Daewoong business units',
    title: 'The BProject',
    description:
      'Discover the integrated wellness ecosystem developed by Bali Daewoong, bringing together hospitality, workspace, wellness, and lifestyle destinations under one vision.',
    buttonLabel: 'Explore Our Destinations →',
  },
];

export async function getTreatmentsPage(): Promise<MockTreatmentsPage> {
  const supabase = getSupabasePublic();
  if (!supabase) return mockTreatmentsPage;

  const { data, error } = await supabase.from('bfriends_treatments_page').select('*').eq('id', 1).maybeSingle();
  if (error || !data) return mockTreatmentsPage;

  return {
    seo_title: data.seo_title ?? mockTreatmentsPage.seo_title,
    seo_description: data.seo_description ?? mockTreatmentsPage.seo_description,
    breadcrumb: data.breadcrumb ?? mockTreatmentsPage.breadcrumb,
    header_title: data.header_title ?? mockTreatmentsPage.header_title,
    header_image: data.header_image ?? mockTreatmentsPage.header_image,
    intro_title: data.intro_title ?? mockTreatmentsPage.intro_title,
    intro_body: data.intro_body ?? mockTreatmentsPage.intro_body,
  };
}

export async function getTreatments(): Promise<MockTreatment[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return [...mockTreatments].sort((a, b) => a.sort_order - b.sort_order);

  const { data, error } = await supabase
    .from('bfriends_treatments')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error || !data?.length) {
    return [...mockTreatments].sort((a, b) => a.sort_order - b.sort_order);
  }

  const rows = data as TreatmentRow[];
  const specs = await loadSpecGroupsByTreatment(
    supabase,
    rows.map((r) => r.id)
  );

  return rows.map((row) => mapTreatment(row, specs.get(row.id) ?? []));
}

export async function getTreatmentBySlug(slug: string): Promise<MockTreatment | null> {
  const treatments = await getTreatments();
  return treatments.find((t) => t.id === slug) ?? null;
}

export async function getTreatmentSlugs(): Promise<string[]> {
  const treatments = await getTreatments();
  return treatments.map((t) => t.id);
}

export { treatmentNameInline };

export async function getContactPage(): Promise<MockContactPage> {
  const supabase = getSupabasePublic();
  if (!supabase) return mockContactPage;

  const { data, error } = await supabase.from('bfriends_contact_page').select('*').eq('id', 1).maybeSingle();
  if (error || !data) return mockContactPage;

  const [hours_sections, platforms] = await Promise.all([
    loadContactHours(supabase),
    loadContactPlatforms(supabase),
  ]);

  return {
    seo_title: data.seo_title ?? mockContactPage.seo_title,
    seo_description: data.seo_description ?? mockContactPage.seo_description,
    title: data.title ?? mockContactPage.title,
    description: data.description ?? mockContactPage.description,
    image: data.image ?? mockContactPage.image,
    image_alt: data.image_alt ?? mockContactPage.image_alt,
    location_name: data.location_name ?? mockContactPage.location_name,
    address: data.address ?? mockContactPage.address,
    map_href: data.map_href ?? mockContactPage.map_href,
    hours_sections: hours_sections.length ? hours_sections : mockContactPage.hours_sections,
    platforms: platforms.length ? platforms : mockContactPage.platforms,
  };
}

export async function getJourneyPartnersPage(): Promise<MockJourneyPartnersPage> {
  const supabase = getSupabasePublic();
  if (!supabase) return mockJourneyPartnersPage;

  const [{ data: page, error: pageError }, { data: teams, error: teamsError }] = await Promise.all([
    supabase.from('bfriends_journey_partners_page').select('*').eq('id', 1).maybeSingle(),
    supabase.from('bfriends_journey_partner_teams').select('*').eq('is_active', true).order('sort_order'),
  ]);

  if (pageError || !page) return mockJourneyPartnersPage;

  const mappedTeams: JourneyPartnerTeam[] =
    teamsError || !teams?.length
      ? mockJourneyPartnersPage.teams
      : teams.map((t) => ({
          id: t.id,
          title: t.title,
          image: t.image ?? '',
          image_alt: t.image_alt ?? '',
          body: t.body ?? '',
        }));

  return {
    seo_title: page.seo_title ?? mockJourneyPartnersPage.seo_title,
    seo_description: page.seo_description ?? mockJourneyPartnersPage.seo_description,
    breadcrumb: page.breadcrumb ?? mockJourneyPartnersPage.breadcrumb,
    hero_title: page.hero_title ?? mockJourneyPartnersPage.hero_title,
    hero_description: page.hero_description ?? mockJourneyPartnersPage.hero_description,
    header_image: page.header_image ?? mockJourneyPartnersPage.header_image,
    teams: mappedTeams,
  };
}

export async function getSpaPageConfig(slug: string): Promise<MockSpaPage | null> {
  const supabase = getSupabasePublic();
  if (!supabase) return getMockSpaPage(slug);

  const { data, error } = await supabase
    .from('bfriends_spa_pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();

  if (error || !data) return getMockSpaPage(slug);
  return mapSpaPage(data);
}

export async function getSpaSlugs(): Promise<SpaSlug[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return Object.keys(mockSpaPages) as SpaSlug[];

  const { data, error } = await supabase
    .from('bfriends_spa_pages')
    .select('slug')
    .eq('is_active', true)
    .order('slug');

  if (error || !data?.length) return Object.keys(mockSpaPages) as SpaSlug[];
  return data.map((r) => r.slug as SpaSlug);
}

export async function getAboutIntro(): Promise<AboutIntro> {
  const supabase = getSupabasePublic();
  if (!supabase) return DEFAULT_ABOUT_INTRO;

  const { data, error } = await supabase.from('bfriends_about_intro').select('*').eq('id', 1).maybeSingle();
  if (error || !data) return DEFAULT_ABOUT_INTRO;

  return {
    eyebrow: data.eyebrow ?? DEFAULT_ABOUT_INTRO.eyebrow,
    title: data.title ?? DEFAULT_ABOUT_INTRO.title,
    sub: data.sub ?? DEFAULT_ABOUT_INTRO.sub,
  };
}

export async function getAboutPillars(): Promise<AboutPillar[]> {
  const supabase = getSupabasePublic();
  if (!supabase) return DEFAULT_ABOUT_PILLARS;

  const { data, error } = await supabase
    .from('bfriends_about_pillars')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error || !data?.length) return DEFAULT_ABOUT_PILLARS;

  return data.map((p) => ({
    id: p.id,
    image: p.image ?? '',
    imageAlt: p.image_alt ?? '',
    title: p.title,
    description: p.description ?? '',
    buttonLabel: p.button_label ?? '',
    href: p.href ?? undefined,
  }));
}
