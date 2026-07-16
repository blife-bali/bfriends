-- BFriends priority content (final schema, bfriends_* tables, no jsonb blobs)
-- Applied remotely as: bfriends_priority_content + bfriends_rename_normalize

-- Treatments index page (singleton)
CREATE TABLE IF NOT EXISTS bfriends_treatments_page (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  seo_title text,
  seo_description text,
  breadcrumb text,
  header_title text,
  header_image text,
  intro_title text,
  intro_body text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Treatment facilities
CREATE TABLE IF NOT EXISTS bfriends_treatments (
  id text PRIMARY KEY,
  name text NOT NULL,
  facility text NOT NULL,
  pillar text,
  pillar_label text,
  floor text,
  image text,
  sub text,
  sort_order int NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  hero_headline text,
  about_body text,
  spec_section_label text,
  cta_headline text,
  cta_description text,
  cta_label text,
  cta_href text,
  cta_external boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bfriends_treatment_spec_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  treatment_id text NOT NULL REFERENCES bfriends_treatments(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bfriends_treatment_spec_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES bfriends_treatment_spec_groups(id) ON DELETE CASCADE,
  item_text text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Contact page (singleton)
CREATE TABLE IF NOT EXISTS bfriends_contact_page (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  seo_title text,
  seo_description text,
  title text,
  description text,
  image text,
  image_alt text,
  location_name text,
  address text,
  map_href text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bfriends_contact_hours_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bfriends_contact_hours_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES bfriends_contact_hours_sections(id) ON DELETE CASCADE,
  label text,
  entry_text text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS bfriends_contact_platforms (
  id text PRIMARY KEY,
  label text NOT NULL,
  href text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

-- Journey partners
CREATE TABLE IF NOT EXISTS bfriends_journey_partners_page (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  seo_title text,
  seo_description text,
  breadcrumb text,
  hero_title text,
  hero_description text,
  header_image text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bfriends_journey_partner_teams (
  id text PRIMARY KEY,
  title text NOT NULL,
  image text,
  image_alt text,
  body text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Spa sub-page shells (sessions still from MySQL programs)
CREATE TABLE IF NOT EXISTS bfriends_spa_pages (
  slug text PRIMARY KEY,
  title text,
  subtitle text,
  eyebrow text,
  breadcrumb text,
  header_image text,
  program_slugs text[] NOT NULL DEFAULT '{}',
  program_name_keywords text[],
  session_group_keywords text[],
  session_group_exclude_keywords text[],
  services_heading text,
  sessions_title text,
  seo_title text,
  seo_description text,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- About page
CREATE TABLE IF NOT EXISTS bfriends_about_intro (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow text,
  title text,
  sub text,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bfriends_about_pillars (
  id text PRIMARY KEY,
  image text,
  image_alt text,
  title text NOT NULL,
  description text,
  button_label text,
  href text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE bfriends_treatments_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_treatment_spec_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_treatment_spec_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_contact_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_contact_hours_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_contact_hours_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_contact_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_journey_partners_page ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_journey_partner_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_spa_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_about_intro ENABLE ROW LEVEL SECURITY;
ALTER TABLE bfriends_about_pillars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bfriends_treatments_page_public_read" ON bfriends_treatments_page FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_treatments_public_read" ON bfriends_treatments FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "bfriends_treatment_spec_groups_public_read" ON bfriends_treatment_spec_groups FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_treatment_spec_items_public_read" ON bfriends_treatment_spec_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_contact_page_public_read" ON bfriends_contact_page FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_contact_hours_sections_public_read" ON bfriends_contact_hours_sections FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_contact_hours_entries_public_read" ON bfriends_contact_hours_entries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_contact_platforms_public_read" ON bfriends_contact_platforms FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_journey_partners_page_public_read" ON bfriends_journey_partners_page FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_journey_partner_teams_public_read" ON bfriends_journey_partner_teams FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "bfriends_spa_pages_public_read" ON bfriends_spa_pages FOR SELECT TO anon, authenticated USING (is_active = true);
CREATE POLICY "bfriends_about_intro_public_read" ON bfriends_about_intro FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "bfriends_about_pillars_public_read" ON bfriends_about_pillars FOR SELECT TO anon, authenticated USING (is_active = true);
