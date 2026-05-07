-- Programs sync script
-- Source of truth: mock/programs.ts
-- Target DB: MySQL (bfriends_* tables)
--
-- What this script updates:
-- 1) bfriends_programs (general + intro.sub + seo + framework image)
-- 2) bfriends_program_session_types
-- 3) bfriends_program_sessions
--
-- Notes:
-- - This script uses slug as stable key.
-- - intro.title and framework.title/sub do not have dedicated columns in current schema.
-- - framework image is mapped to bfriends_programs.pillars_image.
-- - It replaces session types + sessions for the listed programs.

START TRANSACTION;

-- ============================================================
-- 1) PROGRAM CORE FIELDS
-- ============================================================

-- Spa
UPDATE bfriends_programs
SET
  name = 'Spa',
  sort_order = 2,
  title = 'Therapeutic body care rooted in professional practice',
  subheading = '2nd Floor | Treatments designed to support balance and recovery',
  button_label = 'Discover Spa',
  image = 'https://storageb.awancode.com/1776919776304_DDK09585.webp',
  philosophy = 'True recovery begins when the body is understood, not simply treated.',
  seo_title = 'Integrate Therapies | BFriends Bali',
  seo_description = 'Therapeutic body care including manual physiotherapy, postural correction, sports recovery, and injury rehabilitation at BFriends Kerobokan.',
  pillars_image = '/images/Integrate/DDK09193.webp'
WHERE slug = 'Spa';

-- Beauty
UPDATE bfriends_programs
SET
  name = 'Beauty',
  sort_order = 3,
  title = 'Science led K-Beauty spa care',
  subheading = 'Supporting skin health with clarity and trust',
  button_label = 'Discover Beauty',
  image = 'https://storageb.awancode.com/1776919824555_DDK00418.webp',
  philosophy = 'Beauty feels most natural when it begins with balance and healthy restoration.',
  seo_title = 'Enhance K-Beauty Spa | BFriends Bali',
  seo_description = 'Science-led K-Beauty spa care with facials, skin boosters, face contouring, and advanced laser treatments at BFriends Kerobokan.',
  pillars_image = 'https://storageb.awancode.com/1776919856596_DDK00601.webp'
WHERE slug = 'Beauty';

-- Wellness Movement and Fitness
UPDATE bfriends_programs
SET
  name = 'Wellness Movement and Fitness',
  sort_order = 4,
  title = 'Intentional movement and body awareness',
  subheading = 'Basement | Functional training and guided strength.',
  button_label = 'Discover Fitness',
  image = '/uploads/1776847191820_DDK09881.webp',
  philosophy = 'Wellbeing is not built through intensity alone, but through conscious movement, balance, and consistency',
  seo_title = 'Fitness Program | BFriends Bali',
  seo_description = 'Intentional movement and body awareness through functional training, guided strength, and personalized fitness routines at BFriends Kerobokan.',
  pillars_image = '/images/Fitness/DDK09685.webp'
WHERE slug = 'fitness';

-- Climbing
UPDATE bfriends_programs
SET
  name = 'Climbing',
  sort_order = 5,
  title = 'Climbing that invites focus, courage, and gentle challenge',
  subheading = 'Wallclimbing | Growth through mindful movement',
  button_label = 'Discover Climbing',
  image = '/images/programs/D.webp',
  philosophy = 'The ''Dare Beyond'' is where wellness leads to growth. We take the strength you''ve built in the Fitness program and put it to the test through curated challenges and competitive events.',
  seo_title = 'Dare Wall Climbing | BFriends Bali',
  seo_description = 'Wall climbing, outdoor expeditions, BFriends Games, and endurance challenges - growth through mindful movement at BFriends Kerobokan.',
  pillars_image = '/images/programs/D.webp'
WHERE slug = 'Climbing';

-- Cafe
UPDATE bfriends_programs
SET
  name = 'Cafe',
  sort_order = 7,
  title = 'Rest and recovery through nourishment',
  subheading = '1st Floor | BCafe, a place to pause and recharge',
  button_label = 'Discover Cafe',
  image = 'https://storageb.awancode.com/1776919921903_DDK00062.webp',
  philosophy = 'Wellness continues beyond movement and treatment, extending into the way we nourish, recover, and reconnect throughout the day.',
  seo_title = 'Restore Cafe | BFriends Bali',
  seo_description = 'Rest and recover through nourishment at BCafe - signature smoothies, clean nutrition, specialty coffee, and Korean Cheong x Jamu in Kerobokan.',
  pillars_image = 'https://storageb.awancode.com/1776919921903_DDK00062.webp'
WHERE slug = 'Cafe';

-- Optional: disable legacy Yoga/Barre program if still present
-- UPDATE bfriends_programs SET is_active = 0 WHERE slug IN ('Yoga-barre', 'nurture', 'Nurture');

-- ============================================================
-- 2) REPLACE SESSION TYPES + SESSIONS
-- ============================================================

-- Scope program IDs for this sync
SET @spa_id       = (SELECT id FROM bfriends_programs WHERE slug = 'Spa' LIMIT 1);
SET @beauty_id    = (SELECT id FROM bfriends_programs WHERE slug = 'Beauty' LIMIT 1);
SET @fitness_id   = (SELECT id FROM bfriends_programs WHERE slug = 'fitness' LIMIT 1);
SET @climbing_id  = (SELECT id FROM bfriends_programs WHERE slug = 'Climbing' LIMIT 1);
SET @cafe_id      = (SELECT id FROM bfriends_programs WHERE slug = 'Cafe' LIMIT 1);

-- Clear children (sessions first, then types)
DELETE FROM bfriends_program_sessions
WHERE program_id IN (@spa_id, @beauty_id, @fitness_id, @climbing_id, @cafe_id);

DELETE FROM bfriends_program_session_types
WHERE program_id IN (@spa_id, @beauty_id, @fitness_id, @climbing_id, @cafe_id);

-- ----------------------------
-- Spa session groups
-- ----------------------------
INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@spa_id, 'BFriends Signature Body Rituals', 0);
SET @spa_type_1 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@spa_id, @spa_type_1, 'Body Alignment Therapy', 'Structural realignment ritual focused on posture, mobility, and muscular balance.', '/images/Integrate/DDK09278.webp', 0),
(@spa_id, @spa_type_1, 'Body Mask', 'Nourishing body wrap to restore skin softness while calming surface tension.', '/images/Integrate/DDK09396.webp', 1),
(@spa_id, @spa_type_1, 'Body Scrub', 'Exfoliating ritual that removes dull buildup and refreshes overall skin texture.', '/images/Integrate/DDK09558.webp', 2),
(@spa_id, @spa_type_1, 'Core & Gut Harmony', 'Targeted abdominal care designed to support digestion, breathing, and core stability.', '/images/Integrate/DDK09585.webp', 3),
(@spa_id, @spa_type_1, 'Deep Circulation Flow', 'Circulation-focused bodywork to stimulate flow and reduce heaviness through the limbs.', '/images/Integrate/DDK09278.webp', 4),
(@spa_id, @spa_type_1, 'Deep Rest Therapy', 'Slow, grounding ritual to settle the nervous system and promote deep physical rest.', '/images/Integrate/DDK09396.webp', 5),
(@spa_id, @spa_type_1, 'Foot Massage', 'Pressure-point based foot therapy that relieves fatigue and resets whole-body comfort.', '/images/Integrate/DDK09558.webp', 6),
(@spa_id, @spa_type_1, 'Kids Massage', 'Gentle child-friendly massage tailored for relaxation, comfort, and safe body awareness.', '/images/Integrate/DDK09585.webp', 7),
(@spa_id, @spa_type_1, 'Korean Body Scrub', 'Traditional Korean full-body exfoliation ritual for smoother skin and renewed circulation.', '/images/Integrate/DDK09278.webp', 8),
(@spa_id, @spa_type_1, 'Youth Rejuvenation', 'Comprehensive restorative ritual that combines renewal, circulation, and relaxation.', '/images/Integrate/DDK09396.webp', 9);

-- ----------------------------
-- Beauty session groups
-- ----------------------------
INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@beauty_id, 'BFriends Facial Treatments', 0);
SET @beauty_type_1 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@beauty_id, @beauty_type_1, 'Glass Glow', 'Radiance-focused facial to refine tone, texture, and luminosity with Korean skin prep.', '/images/Enhance/DDK00316.webp', 0),
(@beauty_id, @beauty_type_1, 'Sculpt Lift', 'Lifting facial ritual that sculpts contours and releases facial tension.', '/images/Enhance/DDK00330.webp', 1),
(@beauty_id, @beauty_type_1, 'Hydra Infusion', 'Deep hydration treatment to restore barrier health and skin comfort.', '/images/Enhance/DDK00433.webp', 2),
(@beauty_id, @beauty_type_1, 'Pore Refine', 'Gentle pore-refining care to reduce congestion and smooth texture.', '/images/Enhance/DDK00316.webp', 3),
(@beauty_id, @beauty_type_1, 'Sun Soothe', 'Cooling recovery facial to calm overheated or sun-exposed skin.', '/images/Enhance/DDK00330.webp', 4);

INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@beauty_id, 'BFriends Scalp & Hair Rituals', 1);
SET @beauty_type_2 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@beauty_id, @beauty_type_2, 'Scalp Clarity Ritual', 'Purifying scalp ritual to cleanse buildup and rebalance scalp condition.', '/images/Enhance/DDK00316.webp', 0),
(@beauty_id, @beauty_type_2, 'Hair Strength Therapy', 'Targeted scalp and hair therapy to strengthen roots and improve vitality.', '/images/Enhance/DDK00330.webp', 1),
(@beauty_id, @beauty_type_2, 'Deep Rest Ritual', 'Head-focused calming ritual to release stress and encourage deep relaxation.', '/images/Enhance/DDK00433.webp', 2);

-- ----------------------------
-- Wellness Movement and Fitness session groups
-- ----------------------------
INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@fitness_id, 'wellness movement', 0);
SET @fit_type_1 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@fitness_id, @fit_type_1, 'Essential Class - Yoga', 'A foundational yoga class to improve flexibility, stability, and mindful breath awareness.', '/uploads/1776847217039_DDK09740.webp', 0),
(@fitness_id, @fit_type_1, 'Signature Class - Barre', 'An energizing Barre and Dance-inspired class for posture, control, and functional strength.', '/images/Fitness/DDK09740.webp', 1),
(@fitness_id, @fit_type_1, 'Group Class', 'Shared movement training that restores strength, mobility, and breath flow in a small group.', '/images/Fitness/DDK09791.webp', 2),
(@fitness_id, @fit_type_1, 'Workshops', 'Specialty sessions exploring breathwork, meditation, and sound-based restoration.', '/images/Fitness/DDK09821.webp', 3),
(@fitness_id, @fit_type_1, 'Kids Yoga', 'A joyful class for children to build focus, coordination, and confidence through movement.', '/images/Fitness/DDK09685.webp', 4);

INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@fitness_id, 'fitness', 1);
SET @fit_type_2 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@fitness_id, @fit_type_2, 'Private Training - Single Session', 'A private guided movement session to restore balance, build strength, and improve functional conditioning.', '/images/Fitness/DDK09881.webp', 0),
(@fitness_id, @fit_type_2, 'Group Class', 'A shared movement session designed to build strength, mobility, and breath-led flow in an intimate group.', '/images/Fitness/DDK09791.webp', 1);

-- ----------------------------
-- Climbing session group
-- ----------------------------
INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@climbing_id, 'Signature Sessions', 0);
SET @climb_type_1 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@climbing_id, @climb_type_1, 'Outdoor Expeditions', 'Nature-based endurance challenges.', '/images/programs/D.webp', 0),
(@climbing_id, @climb_type_1, 'BFriends Games', 'Community-wide competitive fitness events.', '/images/programs/D.webp', 1),
(@climbing_id, @climb_type_1, 'Endurance Challenges', 'Long-format stamina tests for advanced members.', '/images/programs/D.webp', 2),
(@climbing_id, @climb_type_1, 'Skill Masterclasses', 'Intensive workshops on advanced movement techniques.', '/images/programs/D.webp', 3);

-- ----------------------------
-- Cafe session group
-- ----------------------------
INSERT INTO bfriends_program_session_types (program_id, title, sort_order)
VALUES (@cafe_id, 'Signature Sessions', 0);
SET @cafe_type_1 = LAST_INSERT_ID();

INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, description, image, sort_order) VALUES
(@cafe_id, @cafe_type_1, 'Signature Kimbap', 'Hand-rolled Korean kimbap crafted for post-workout nourishment-balanced, savory, and light enough to keep you moving.', '/images/Restore/DDK09897.webp', 0),
(@cafe_id, @cafe_type_1, 'Healthy Breakfast', 'Warm, comforting breakfast plates built on whole ingredients to gently refuel the body at the start of your day.', '/images/Restore/DDK09929.webp', 1),
(@cafe_id, @cafe_type_1, 'Dessert Menu', 'Thoughtfully portioned desserts that satisfy the craving while staying aligned with your broader wellness goals.', '/images/Restore/DDK09935.webp', 2),
(@cafe_id, @cafe_type_1, 'Korean Cheong x Jamu', 'Heritage-inspired concentrates and tonics, marrying Korean Cheong and Indonesian Jamu for restorative daily sips.', '/images/Restore/DDK09994.webp', 3);

COMMIT;

-- Quick verification
-- SELECT slug, name, sort_order, is_active FROM bfriends_programs ORDER BY sort_order, id;
-- SELECT p.slug, t.title AS group_title, s.title AS session_title
-- FROM bfriends_programs p
-- LEFT JOIN bfriends_program_session_types t ON t.program_id = p.id
-- LEFT JOIN bfriends_program_sessions s ON s.session_type_id = t.id
-- WHERE p.slug IN ('Spa','Beauty','fitness','Climbing','Cafe')
-- ORDER BY p.sort_order, t.sort_order, s.sort_order;
