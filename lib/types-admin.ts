export interface HeroSection {
  id: number;
  page: string;
  title: string;
  subtitle: string | null;
  video_url: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: number;
}

export interface IntroSection {
  id: number;
  page: string;
  headline: string;
  body: string;
  image_url: string | null;
  show_cta: number;
  sort_order: number;
  is_active: number;
}

export interface WhyCard {
  id: number;
  point: string;
  subpoint: string;
  image: string;
  sort_order: number;
  is_active: number;
  hidden_in_home?: number;
}

export interface ProcessStep {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  sort_order: number;
  is_active: number;
  subpoints?: ProcessSubpoint[];
}

export interface ProcessSubpoint {
  id: number;
  step_id: number;
  title: string;
  description: string;
  sort_order: number;
}

/** Nested session category for admin PUT/GET (matches `replaceProgramChildren` payload). */
export interface ProgramSessionTypeGroup {
  id?: number | null;
  title: string;
  sort_order: number;
  sessions: ProgramSession[];
}

export interface Program {
  id: number;
  name: string;
  slug: string;
  eyebrow: string | null;
  title: string | null;
  subheading: string | null;
  image: string | null;
  button_label: string | null;
  quote: string | null;
  philosophy: string | null;
  breadcrumb: string | null;
  philosophy_image: string | null;
  pillars_image: string | null;
  pillars_title: string | null;
  pillars_paragraph: string | null;
  previous_program: string | null;
  next_program: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  sort_order: number;
  is_active: number;
  steps?: ProgramStep[];
  pillars?: ProgramPillar[];
  sessions?: ProgramSession[];
  session_types?: ProgramSessionTypeGroup[];
}

export interface ProgramStep {
  id: number;
  program_id: number;
  step_id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ProgramPillar {
  id: number;
  program_id: number;
  title: string;
  description: string;
  sort_order: number;
}

export interface ProgramSession {
  id: number;
  program_id: number;
  title: string;
  description: string;
  image: string | null;
  icon: string | null;
  sort_order: number;
  session_type_id?: number | null;
}

export interface Event {
  id: number;
  slug: string;
  name: string;
  ecosystem: string;
  event_date: string;
  event_time: string | null;
  text: string;
  image: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  sort_order: number;
  is_active: number;
}

export interface News {
  id: number;
  slug: string;
  name: string;
  ecosystem: string;
  timestamp: string;
  author: string | null;
  text: string;
  image: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  sort_order: number;
  is_active: number;
}

export interface PageHeader {
  id: number;
  page_key: string;
  title: string;
  breadcrumb: string | null;
  image: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
}

export interface PhilosophySection {
  id: number;
  section_key: string;
  headline: string | null;
  body: string | null;
  image: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  sort_order: number;
  is_active: number;
}

export interface SiteSetting {
  id: number;
  setting_key: string;
  setting_value: string | null;
}

export interface MembershipContent {
  id: number;
  section_key: string;
  headline: string | null;
  body: string | null;
  image: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  is_active: number;
}

export interface CharmTier {
  id: number;
  name: string;
  tagline: string | null;
  credits: number;
  bonus: string | null;
  is_popular: number;
  sort_order: number;
  is_active: number;
}

export interface CharmUsage {
  id: number;
  service: string;
  credits: number;
  sort_order: number;
  is_active: number;
}
