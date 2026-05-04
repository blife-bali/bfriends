-- BFriends CMS Database Schema
-- Database: bfriends_cms
-- Table prefix: bfriends_

CREATE DATABASE IF NOT EXISTS bfriends_cms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bfriends_cms;

-- 1. Admin users
CREATE TABLE IF NOT EXISTS bfriends_admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEO columns migration (run after initial schema)
ALTER TABLE bfriends_page_headers ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER image;
ALTER TABLE bfriends_page_headers ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

ALTER TABLE bfriends_programs ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER next_program;
ALTER TABLE bfriends_programs ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

ALTER TABLE bfriends_programs ADD COLUMN pillars_title VARCHAR(500) NULL AFTER pillars_image;
ALTER TABLE bfriends_programs ADD COLUMN pillars_paragraph TEXT NULL AFTER pillars_title;

-- Program session types (groupings, e.g. Facial vs Scalp)
CREATE TABLE IF NOT EXISTS bfriends_program_session_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (program_id) REFERENCES bfriends_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE bfriends_program_sessions ADD COLUMN session_type_id INT NULL AFTER program_id;
ALTER TABLE bfriends_program_sessions ADD CONSTRAINT fk_program_session_type
  FOREIGN KEY (session_type_id) REFERENCES bfriends_program_session_types(id) ON DELETE SET NULL;

ALTER TABLE bfriends_events ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER image;
ALTER TABLE bfriends_events ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

ALTER TABLE bfriends_news ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER image;
ALTER TABLE bfriends_news ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

ALTER TABLE bfriends_philosophy_sections ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER image;
ALTER TABLE bfriends_philosophy_sections ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

ALTER TABLE bfriends_membership_content ADD COLUMN seo_title VARCHAR(300) DEFAULT NULL AFTER image;
ALTER TABLE bfriends_membership_content ADD COLUMN seo_description TEXT DEFAULT NULL AFTER seo_title;

-- 2. Hero sections
CREATE TABLE IF NOT EXISTS bfriends_hero_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(50) NOT NULL DEFAULT 'home',
  title VARCHAR(500) NOT NULL,
  subtitle TEXT,
  video_url VARCHAR(500),
  image_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Intro sections
CREATE TABLE IF NOT EXISTS bfriends_intro_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(50) NOT NULL DEFAULT 'home',
  headline VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  image_url VARCHAR(500),
  show_cta TINYINT(1) DEFAULT 1,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Why BFriends cards
CREATE TABLE IF NOT EXISTS bfriends_why_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  point VARCHAR(300) NOT NULL,
  subpoint TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  hidden_in_home TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE bfriends_why_cards
ADD COLUMN IF NOT EXISTS hidden_in_home TINYINT(1) DEFAULT 0 AFTER is_active;

-- 5. Process steps
CREATE TABLE IF NOT EXISTS bfriends_process_steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(50) NOT NULL DEFAULT 'customer-journey',
  number VARCHAR(10) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

ALTER TABLE bfriends_process_steps
ADD COLUMN IF NOT EXISTS page_key VARCHAR(50) NOT NULL DEFAULT 'customer-journey' AFTER id;

-- 6. Process subpoints
CREATE TABLE IF NOT EXISTS bfriends_process_subpoints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  step_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (step_id) REFERENCES bfriends_process_steps(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Programs
CREATE TABLE IF NOT EXISTS bfriends_programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  eyebrow VARCHAR(200),
  title VARCHAR(500),
  subheading VARCHAR(500),
  image VARCHAR(500),
  button_label VARCHAR(100),
  quote TEXT,
  philosophy TEXT,
  breadcrumb VARCHAR(200),
  philosophy_image VARCHAR(500),
  pillars_image VARCHAR(500),
  previous_program VARCHAR(100),
  next_program VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Program steps
CREATE TABLE IF NOT EXISTS bfriends_program_steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  step_id VARCHAR(10) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (program_id) REFERENCES bfriends_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Program pillars
CREATE TABLE IF NOT EXISTS bfriends_program_pillars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (program_id) REFERENCES bfriends_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Program sessions
CREATE TABLE IF NOT EXISTS bfriends_program_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  program_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  icon VARCHAR(100),
  sort_order INT DEFAULT 0,
  FOREIGN KEY (program_id) REFERENCES bfriends_programs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Events
CREATE TABLE IF NOT EXISTS bfriends_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  name VARCHAR(300) NOT NULL,
  ecosystem VARCHAR(100) NOT NULL DEFAULT 'BFriends',
  event_date VARCHAR(100) NOT NULL,
  event_time VARCHAR(50),
  text TEXT NOT NULL,
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. News
CREATE TABLE IF NOT EXISTS bfriends_news (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  name VARCHAR(300) NOT NULL,
  ecosystem VARCHAR(100) NOT NULL DEFAULT 'BFriends',
  timestamp VARCHAR(100) NOT NULL,
  author VARCHAR(150),
  text TEXT NOT NULL,
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Page headers
CREATE TABLE IF NOT EXISTS bfriends_page_headers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  breadcrumb VARCHAR(200),
  image VARCHAR(500),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. Philosophy sections
CREATE TABLE IF NOT EXISTS bfriends_philosophy_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  headline VARCHAR(500),
  body TEXT,
  image VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. Site settings
CREATE TABLE IF NOT EXISTS bfriends_site_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. Membership content
CREATE TABLE IF NOT EXISTS bfriends_membership_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  headline VARCHAR(500),
  body TEXT,
  image VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. Charm tiers
CREATE TABLE IF NOT EXISTS bfriends_charm_tiers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tagline VARCHAR(200),
  credits INT NOT NULL,
  bonus VARCHAR(300),
  is_popular TINYINT(1) DEFAULT 0,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 18. Charm usage
CREATE TABLE IF NOT EXISTS bfriends_charm_usage (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service VARCHAR(200) NOT NULL,
  credits INT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 19. Core beliefs (philosophy page)
CREATE TABLE IF NOT EXISTS bfriends_core_beliefs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO bfriends_core_beliefs (title, body, sort_order, is_active) VALUES
  ('Intentionality', 'Movement without purpose is labor. Every rep is calculated.', 1, 1),
  ('Sustainability', 'Rhythm over burnout. A loop, not a crash.', 2, 1),
  ('Integration', 'Skin reflects gut; muscle supports mind. The whole system.', 3, 1);

-- 20. BLife ecosystem items (philosophy page)
CREATE TABLE IF NOT EXISTS bfriends_ecosystem_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO bfriends_ecosystem_items (name, description, url, sort_order, is_active) VALUES
  ('BNesta', 'Sanctuary. Private villas designed for quiet living and the restoration of personal rhythm.', 'https://bnesta.id', 1, 1),
  ('BLive', 'Connection. Long-stay environments where daily routine meets shared community.', 'https://blive.id', 2, 1),
  ('BWork', 'Focus. Calm, curated atmospheres crafted for creativity and deep work.', 'https://bwork.id', 3, 1),
  ('BFriends', 'Vitality. The heartbeat of movement, recovery, and daily wellness.', 'https://bfriends.id', 4, 1),
  ('Alam Kulkul', 'Heritage. A retreat rooted in the wisdom of Balinese nature and culture.', 'https://alamkulkul.com', 5, 1),
  ('Nulook', 'Precision. Aesthetic science approached with medical responsibility and care.', 'https://nulook.co.id', 6, 1);
