-- BFriends CMS - Default Data Seed
-- Run after schema.sql to populate with static content
USE bfriends_cms;

-- ============================================================
-- 1. Admin User (password: admin123, bcrypt hash)
-- ============================================================
INSERT IGNORE INTO bfriends_admin_users (username, password_hash, display_name) VALUES
('admin', '$2b$10$Y14RZS79T.5JHiUtIHPeWeW0Whueta4sbTCfh6TCFmQmYYv3ymaQS', 'Administrator');

-- ============================================================
-- 2. Hero Sections
-- ============================================================
INSERT IGNORE INTO bfriends_hero_sections (page, title, subtitle, video_url, image_url, sort_order) VALUES
('home', 'Welcome to BFriends', 'Your wellness journey starts here', '/videos/bfriends-hero.mp4', '/images/hero/hero-bg.jpg', 0);

-- ============================================================
-- 3. Intro Sections
-- ============================================================
INSERT IGNORE INTO bfriends_intro_sections (page, headline, body, image_url, show_cta, sort_order) VALUES
('home', 'Where Wellness Becomes a Way of Life', 'BFriends is a precision-driven wellness ecosystem that combines fitness, recovery, therapy, and beauty under one roof. Every program is designed around your body''s unique needs.', '/images/intro/intro.jpg', 1, 0);

-- ============================================================
-- 4. Why BFriends Cards
-- ============================================================
INSERT INTO bfriends_why_cards (point, subpoint, image, sort_order, hidden_in_home) VALUES
('Precision-Led, Personal Fitness Design', 'We start by understanding your body, then design a routine tailored to how you move, recover, and grow.', '/images/why-bfriends/1.jpg', 0, 0),
('One Standard, One System of Care', 'Our trainers, therapists, and K-Beauty specialists work under a shared standard. Ensuring consistency, clarity, and quality in every experience.', '/images/why-bfriends/2.jpg', 1, 0),
('Your Dedicated Journey Partner', 'From your first visit to ongoing progress, one dedicated partner guides your experience and supports you every step of the way.', '/images/why-bfriends/3.jpg', 2, 0),
('You Can See and Track', 'From baseline to milestones, your journey is recorded and refined—so progress is clear, not just felt.', '/images/why-bfriends/4.jpg', 3, 0),
('One Space, One Continuous Flow', 'Fitness, recovery, therapy, and beauty come together in one place—supporting a complete and connected wellness journey.', '/images/why-bfriends/5.jpg', 4, 0);

-- ============================================================
-- 5. Process Steps + Subpoints
-- ============================================================
INSERT INTO bfriends_process_steps (page_key, number, title, description, image, sort_order) VALUES
('customer-journey', '01', 'Measure', 'Our ''Reading'' process gathers the essentials to start the healing journey for ever lasting wellness.', '/images/Fitness/DDK09594.webp', 0),
('customer-journey', '02', 'Assess', 'Our Journey Partners will translate your measurement into clear steps, identifying the balance way and priorities your health needs to return to its wellness.', '/images/Integrate/DDK09193.jpg', 1),
('customer-journey', '03', 'Design', 'We illustrate your unique healing FRIEND Fitness flow. Your steps is layered into structure, recovery, and intensity, specific only to your wellness and current condition.', '/images/Enhance/DDK00330.jpg', 2),
('customer-journey', '04', 'Teacher/Coach/Guides', 'Recovery requires detailed steps. We guide you through the BFriends steps, ensuring every healing and balance steps is prepared with high-standard intention.', '/images/Restore/DDK00016.webp', 3),
('customer-journey', '05', 'Track', 'Progress has never left to chance. We continuously keep, hold, and review your healing response to the fitness flow, ensuring balance and wellness becomes a daily habit.', '/images/Integrate/DDK09558.jpg', 4),
('customer-journey', '06', 'Refine', 'As your body improves, your plans too. We adjust your routine to ensure your journey remains a safe, enjoyable and achievable one, in line with your continually developing capability.', '/images/Enhance/DDK00601.jpg', 5);

-- Subpoints for Measure (step id = 1)
INSERT INTO bfriends_process_subpoints (step_id, title, description, sort_order) VALUES
(1, 'Movement Reading', 'A way to analyze your alignment to restore the balance and functional efficiency.', 0),
(1, 'Body Composition Scan', 'A detailed breakdown of your physical makeup to guide your personal recovery journey.', 1),
(1, 'Skin Imaging', 'Deep-layer assessment to heal your vitality and freshness beyond the surface.', 2);

-- ============================================================
-- 6. Programs + Steps + Pillars + Sessions
-- ============================================================

-- Programs
INSERT INTO bfriends_programs (name, slug, eyebrow, title, subheading, image, button_label, quote, philosophy, breadcrumb, philosophy_image, pillars_image, previous_program, next_program, seo_title, seo_description, sort_order) VALUES
('Fitness', 'fitness', 'F · Fitness', 'Intentional movement and body awareness', 'Basement | Functional training and guided strength', '/images/Fitness/DDK09594.webp', 'Discover Fitness', 'The moment you read your body with precision, your workout becomes truly yours.', 'Training isn''t about pushing harder—it''s about moving more precisely. Exercise shouldn''t be something you endure, but something you move into with confidence.', 'Programs / Fitness', '/images/Fitness/DDK09605.webp', '/images/Fitness/DDK09685.webp', 'dare', 'restore', 'Fitness Program | BFriends Bali', 'Intentional movement and body awareness through functional training, guided strength, and personalized fitness routines at BFriends Kerobokan.', 0),
('Restore', 'restore', 'R · Restore', 'Rest and recovery through nourishment', '1st Floor | BCafé, a place to pause and recharge', '/images/Restore/DDK09897.webp', 'Discover Restore', 'Recovery isn''t about stopping—it''s the moment your body and energy reconnect.', 'B-FRIENDS Café is a space designed to restore energy. With purpose-built blends and a calm atmosphere, your body and mind naturally return to a state of recovery.', 'Programs / Restore', '/images/Restore/DDK00016.webp', '/images/Restore/DDK00062.webp', 'fitness', 'integrate', 'Restore Café | BFriends Bali', 'Rest and recover through nourishment at BCafé — signature smoothies, clean nutrition, specialty coffee, and Korean Cheong x Jamu in Kerobokan.', 1),
('Integrate', 'integrate', 'I · Integrate', 'Therapeutic body care rooted in professional practice', '2nd Floor | Treatments designed to support balance and recovery', '/images/Integrate/DDK09585.jpg', 'Discover Integrate', 'True strength isn''t just building muscle; it''s maintaining the structure that supports it.', 'Pain is a signal, not a lifestyle. We integrate clinical precision with holistic recovery to build a structural foundation that allows you to perform without hesitation.', 'Programs / Integrate', '/images/Integrate/DDK00216.jpg', '/images/Integrate/DDK09193.jpg', 'restore', 'enhance', 'Integrate Therapies | BFriends Bali', 'Therapeutic body care including manual physiotherapy, postural correction, sports recovery, and injury rehabilitation at BFriends Kerobokan.', 2),
('Enhance', 'enhance', 'E · Enhance', 'Science led K-Beauty spa care', '3rd Floor | Supporting skin health with clarity and trust', '/images/Enhance/DDK00621.jpg', 'Discover Enhance', 'Confidence begins when your outer radiance mirrors your inner vitality.', 'Beauty at BFriends is about health, not coverage. We combine K-Beauty protocols with dermatological science to establish a routine that keeps your skin vibrant for the long run.', 'Programs / Enhance', '/images/Enhance/DDK00316.jpg', '/images/Enhance/DDK00561.jpg', 'integrate', 'nurture', 'Enhance K-Beauty Spa | BFriends Bali', 'Science-led K-Beauty spa care with facials, skin boosters, face contouring, and advanced laser treatments at BFriends Kerobokan.', 3),
('Nurture', 'nurture', 'N · Nurture', 'Yoga and barre for breath, alignment, and inner balance', '4th Floor | A space to slow down and turn inward', '/images/Nurture/DDK09005.jpg', 'Discover Nurture', 'Wellness is a dialogue between your mind and your body. We teach you how to listen.', 'In a high-pace world, Nurture is your pause button. It is the practice of intentional softness—giving your mind the same level of care and training as your muscles.', 'Programs / Nurture', '/images/Nurture/DDK09001.jpg', '/images/Nurture/DDK09064.jpg', 'enhance', 'dare', 'Nurture Yoga & Wellness | BFriends Bali', 'Yoga, sound healing, guided meditation, somatic release, and wellness workshops for breath, alignment, and inner balance at BFriends Kerobokan.', 4),
('Dare', 'dare', 'D · Dare', 'Climbing that invites focus, courage, and gentle challenge', 'Wallclimbing | Growth through mindful movement', '/images/programs/D.webp', 'Discover Dare', 'Growth only happens at the edge of your comfort zone. It''s time to step over.', 'The ''Dare Beyond'' is where wellness leads to growth. We take the strength you''ve built in the Fitness program and put it to the test through curated challenges and competitive events.', 'Programs / Dare', '/images/programs/D.webp', '/images/programs/D.webp', 'nurture', 'fitness', 'Dare Wall Climbing | BFriends Bali', 'Wall climbing, outdoor expeditions, BFriends Games, and endurance challenges — growth through mindful movement at BFriends Kerobokan.', 5);

-- Program Steps
-- Fitness (program_id=1)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(1, '01', 'Find', 'Using Fittrix & InBody, we pinpoint exactly what your body needs—clearly and precisely.', 0),
(1, '02', 'Fit', 'Your Journey Partner designs your routine with accuracy—movement patterns, intensity, and frequency.', 1),
(1, '03', 'Fitness', 'We remove tension and restore natural rhythm, so movement feels focused, strong, and effortless.', 2);

-- Restore (program_id=2)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(2, '01', 'Recovery', 'Choices that support post-workout restoration.', 0),
(2, '02', 'Nourishment', 'A refined balance of taste and nutrition.', 1),
(2, '03', 'Connection', 'A lounge experience you can truly settle into.', 2);

-- Integrate (program_id=3)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(3, '01', 'Assess', 'We analyze movement restrictions to identify root causes, not just symptoms.', 0),
(3, '02', 'Release', 'Using manual techniques to unlock tension and restore range of motion.', 1),
(3, '03', 'Realign', 'Guiding your body back to optimal alignment for long-term resilience.', 2);

-- Enhance (program_id=4)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(4, '01', 'Analyze', 'K-Standard diagnostics to understand your unique dermal profile.', 0),
(4, '02', 'Revitalize', 'Premium actives and technology to refine texture and tone.', 1),
(4, '03', 'Protect', 'Strengthening the skin barrier to lock in results.', 2);

-- Nurture (program_id=5)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(5, '01', 'Ground', 'Practices that center your nervous system and reduce cortisol.', 0),
(5, '02', 'Breathe', 'Guided breathwork to expand capacity and mental clarity.', 1),
(5, '03', 'Connect', 'Community-based wellness that fosters emotional resilience.', 2);

-- Dare (program_id=6)
INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order) VALUES
(6, '01', 'Challenge', 'Testing your new baseline against real-world demands.', 0),
(6, '02', 'Community', 'Competing and collaborating with a tribe that pushes you forward.', 1),
(6, '03', 'Breakthrough', 'Shattering perceived limits to set a new personal standard.', 2);

-- Program Pillars
-- Fitness (program_id=1)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(1, 'Find', 'Using Fittrix & InBody, we pinpoint exactly what your body needs—clearly and precisely.', 0),
(1, 'Fit', 'Your Journey Partner designs your routine with accuracy—movement patterns, intensity, and frequency.', 1),
(1, 'Fitness', 'We remove tension and restore natural rhythm, so movement feels focused, strong, and effortless.', 2);

-- Restore (program_id=2)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(2, 'Recovery', 'Choices that support post-workout restoration.', 0),
(2, 'Nourishment', 'A refined balance of taste and nutrition.', 1),
(2, 'Connection', 'A lounge experience you can truly settle into.', 2);

-- Integrate (program_id=3)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(3, 'Assess', 'We analyze movement restrictions to identify root causes, not just symptoms.', 0),
(3, 'Release', 'Using manual techniques to unlock tension and restore range of motion.', 1),
(3, 'Realign', 'Guiding your body back to optimal alignment for long-term resilience.', 2);

-- Enhance (program_id=4)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(4, 'Analyze', 'K-Standard diagnostics to understand your unique dermal profile.', 0),
(4, 'Revitalize', 'Premium actives and technology to refine texture and tone.', 1),
(4, 'Protect', 'Strengthening the skin barrier to lock in results.', 2);

-- Nurture (program_id=5)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(5, 'Ground', 'Practices that center your nervous system and reduce cortisol.', 0),
(5, 'Breathe', 'Guided breathwork to expand capacity and mental clarity.', 1),
(5, 'Connect', 'Community-based wellness that fosters emotional resilience.', 2);

-- Dare (program_id=6)
INSERT INTO bfriends_program_pillars (program_id, title, description, sort_order) VALUES
(6, 'Challenge', 'Testing your new baseline against real-world demands.', 0),
(6, 'Community', 'Competing and collaborating with a tribe that pushes you forward.', 1),
(6, 'Breakthrough', 'Shattering perceived limits to set a new personal standard.', 2);

-- Program Sessions
-- Fitness (program_id=1)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(1, 'Functional Training', 'Realign your spine and pelvis, boost joint mobility, and strengthen your core.', '/images/Fitness/DDK09594.webp', 0),
(1, 'Ignite', 'Structured heart-rate and breath work to enhance metabolic efficiency.', '/images/Fitness/DDK09740.webp', 1),
(1, 'Sculpt', 'Enhance hip and leg balance while toning your body for a defined look.', '/images/Fitness/DDK09791.webp', 2),
(1, 'Sport Performance', 'Analyze sport-specific movements to improve power, balance, and responsiveness.', '/images/Fitness/DDK09821.webp', 3);

-- Restore (program_id=2)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(2, 'Signature Kimbap', 'Hand-rolled Korean kimbap crafted for post-workout nourishment—balanced, savory, and light enough to keep you moving.', '/images/Restore/DDK09897.webp', 0),
(2, 'Healthy Breakfast', 'Warm, comforting breakfast plates built on whole ingredients to gently refuel the body at the start of your day.', '/images/Restore/DDK09929.webp', 1),
(2, 'Dessert Menu', 'Thoughtfully portioned desserts that satisfy the craving while staying aligned with your broader wellness goals.', '/images/Restore/DDK09935.webp', 2),
(2, 'Korean Cheong x Jamu', 'Heritage-inspired concentrates and tonics, marrying Korean Cheong and Indonesian Jamu for restorative daily sips.', '/images/Restore/DDK09994.webp', 3);

-- Integrate (program_id=3)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(3, 'Manual Physiotherapy', 'On the treatment table, your therapist uses precise hands-on techniques to ease pain, free stiff joints, and restore comfortable movement.', '/images/Integrate/DDK09278.jpg', 0),
(3, 'Postural Correction', 'Assessment and guided correction for the habits that pull you out of line—shoulders, spine, and pelvis brought back into sustainable alignment.', '/images/Integrate/DDK09396.jpg', 1),
(3, 'Sports Recovery', 'Flush-and-release work for tired muscles and heavy legs—rhythmic pressure and targeted areas so you recover faster between sessions.', '/images/Integrate/DDK09558.jpg', 2),
(3, 'Injury Rehabilitation', 'Clear, staged rehab in a calm clinical space—graded movement and load so you rebuild strength safely after strain or injury.', '/images/Integrate/DDK09585.jpg', 3);

-- Enhance (program_id=4)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(4, 'K-Glow Facial', 'Lie back in a bright, clinical-calm room while your specialist runs a multi-step K-protocol—device-assisted work at the skin''s surface for dewy, even radiance.', '/images/Enhance/DDK00316.jpg', 0),
(4, 'Skin Boosters', 'Micro-fine nutrient delivery where your skin needs volume and bounce—targeted plumping and hydration without masking what''s underneath.', '/images/Enhance/DDK00330.jpg', 1),
(4, 'Face Contouring', 'Non-surgical lifting and sculpting focused along the jaw and mid-face—definition that reads natural in daylight, not under filters.', '/images/Enhance/DDK00433.jpg', 2),
(4, 'Advanced Laser', 'Clinic-grade light and energy tools, calibrated on professional consoles—pigment, texture, and clarity addressed with measurable parameters.', '/images/Enhance/DDK00316.jpg', 3);

-- Nurture (program_id=5)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(5, 'Sound Healing', 'Vibrational therapy to restore cellular harmony.', '/images/Nurture/DDK09001.jpg', 0),
(5, 'Guided Meditation', 'Structured mental conditioning for focus and calm.', '/images/Nurture/DDK09064.jpg', 1),
(5, 'Somatic Release', 'Body-based techniques to release stored emotional tension.', '/images/Nurture/DDK09078.jpg', 2),
(5, 'Wellness Workshops', 'Interactive sessions on sleep, nutrition, and stress management.', '/images/Nurture/DDK09121.jpg', 3);

-- Dare (program_id=6)
INSERT INTO bfriends_program_sessions (program_id, title, description, image, sort_order) VALUES
(6, 'Outdoor Expeditions', 'Nature-based endurance challenges.', '/images/programs/D.webp', 0),
(6, 'BFriends Games', 'Community-wide competitive fitness events.', '/images/programs/D.webp', 1),
(6, 'Endurance Challenges', 'Long-format stamina tests for advanced members.', '/images/programs/D.webp', 2),
(6, 'Skill Masterclasses', 'Intensive workshops on advanced movement techniques.', '/images/programs/D.webp', 3);

-- ============================================================
-- 7. Events
-- ============================================================
INSERT INTO bfriends_events (slug, name, ecosystem, event_date, event_time, text, image, seo_title, seo_description, sort_order) VALUES
('spring-wellness-workshop', 'Spring Wellness Workshop', 'BFriends', 'Mar 15, 2025', '09:00 AM', 'Join us for a morning of mindful movement and expert-led sessions on seasonal wellness.\n\nThis immersive workshop combines yoga, meditation, and nutritional guidance to help you transition seamlessly into the new season. Our instructors will guide you through practices designed to align your body and mind with the energy of spring.\n\nWhether you''re new to wellness or looking to deepen your practice, this workshop offers something for everyone. You''ll leave feeling refreshed, grounded, and ready to embrace the months ahead.', '/images/Nurture/DDK09078.jpg', 'Spring Wellness Workshop | BFriends', 'Join BFriends for a morning of mindful movement, yoga, meditation, and nutritional guidance to align your body and mind this spring.', 0),
('community-open-house', 'Community Open House', 'BFriends', 'Feb 28, 2025', '02:00 PM', 'Experience BFriends—tour the space, meet the team, and enjoy complimentary sessions.\n\nDiscover our facilities including yoga studios, meditation gardens, and treatment rooms. Our team will be on hand to answer questions about memberships, classes, and integrated wellness programs.\n\nThis is the perfect opportunity to see what makes BFriends unique and to connect with others in the community. Light refreshments will be served.', '/images/Integrate/DDK09222.jpg', 'Community Open House | BFriends', 'Tour the BFriends space, meet the team, and enjoy complimentary sessions at our community open house in Kerobokan, Bali.', 1),
('mindful-leadership-retreat', 'Mindful Leadership Retreat', 'BFriends', 'Apr 5, 2025', '10:00 AM', 'A half-day retreat for leaders seeking clarity and presence.\n\nBlend meditation, breathwork, and peer dialogue in a serene setting. This retreat is designed to help you step back from the daily grind and reconnect with your purpose and vision.\n\nYou''ll leave with practical tools for bringing mindfulness into your leadership style and creating calmer, more focused teams.', '/images/Nurture/DDK09139.jpg', 'Mindful Leadership Retreat | BFriends', 'A half-day retreat for leaders combining meditation, breathwork, and peer dialogue in a serene Bali setting at BFriends.', 2),
('sound-bath-restorative-yoga', 'Sound Bath & Restorative Yoga', 'BFriends', 'Apr 12, 2025', '03:00 PM', 'Unwind with crystal bowls and gentle restorative poses.\n\nPerfect for releasing tension and restoring balance. Our sound bath sessions use carefully selected instruments to create waves of sound that support deep relaxation and inner quiet.\n\nNo experience is necessary—just bring yourself and a willingness to rest. Mats and props are provided.', '/images/Restore/DDK09897.webp', 'Sound Bath & Restorative Yoga | BFriends', 'Unwind with crystal bowls and gentle restorative yoga poses at BFriends — perfect for releasing tension and restoring balance.', 3),
('family-wellness-day', 'Family Wellness Day', 'BFriends', 'Apr 20, 2025', '09:30 AM', 'A day of activities for all ages: family yoga, nature walks, and healthy cooking demos.\n\nConnect and recharge together. We''ve designed this day so that children and adults can participate in shared and age-appropriate activities, all centered on wellness and connection.\n\nSpaces are limited, so we recommend registering in advance. Bring the whole family and leave feeling closer and more energized.', '/images/Nurture/DDK09064.jpg', 'Family Wellness Day | BFriends', 'A day of family yoga, nature walks, and healthy cooking demos for all ages at BFriends Kerobokan, Bali.', 4),
('sunset-meditation-series', 'Sunset Meditation Series', 'BFriends', 'May 3, 2025', '06:00 PM', 'Weekly outdoor meditation as the sun sets.\n\nNo experience needed—just an open mind and comfortable seating. Each session is guided and lasts about 45 minutes, giving you time to wind down and transition from day to evening.\n\nDress in layers; we''ll provide blankets if needed. The series runs through the warmer months.', '/images/Nurture/DDK09152.jpg', 'Sunset Meditation Series | BFriends', 'Weekly guided outdoor meditation at sunset at BFriends Kerobokan — 45-minute sessions to unwind and transition into evening.', 5);

-- ============================================================
-- 8. News
-- ============================================================
INSERT INTO bfriends_news (slug, name, ecosystem, timestamp, author, text, image, seo_title, seo_description, sort_order) VALUES
('new-integrate-treatments-now-available', 'New Integrate Treatments Now Available', 'BFriends', 'Mar 8, 2025', 'BFriends Team', 'Discover our latest therapeutic offerings designed to support balance and recovery.\n\nOur new integrated treatments combine traditional healing practices with modern therapeutic techniques. Each session is tailored to your needs, drawing from modalities that include bodywork, breathwork, and mindful movement.\n\nWhether you''re recovering from injury, managing stress, or simply seeking deeper relaxation, our team is here to guide you. Book a consultation to learn which options are right for you.', '/images/Integrate/DDK09585.jpg', 'New Integrate Treatments | BFriends News', 'Discover BFriends'' latest integrated therapeutic treatments combining traditional healing with modern techniques for balance and recovery.', 0),
('upcoming-spring-retreat-schedule-announced', 'Upcoming Spring Retreat Schedule Announced', 'BFriends', 'Feb 20, 2025', 'Sarah Wellness', 'We are excited to announce our spring retreat schedule featuring new locations and enhanced programs.\n\nEarly registration discounts are available until the end of the month. This year we''re offering weekend retreats focused on mindfulness, nature immersion, and community connection.\n\nSpaces fill quickly—reserve your spot and give yourself something to look forward to as the season turns.', '/images/Nurture/DDK09005.jpg', 'Spring Retreat Schedule | BFriends News', 'BFriends spring retreat schedule featuring new locations, mindfulness, nature immersion, and community connection weekends.', 1),
('partnership-with-bnesta-coworking-meets-wellness', 'Partnership with BNesta: Co-Working Meets Wellness', 'BFriends', 'Mar 22, 2025', 'BLife Editorial', 'BLife and BNesta are partnering to offer members shared access to workspace and wellness spaces.\n\nOne membership, two ecosystems. If you''re a BNesta member, you can now use BFriends facilities at a preferred rate—and BFriends members get the same at BNesta. Work in the morning, unwind with yoga or a treatment in the afternoon, all without switching networks.\n\nDetails and eligibility are available on our membership page.', '/images/Nurture/DDK09001.jpg', 'BNesta Partnership | BFriends News', 'BLife and BNesta partner to offer members shared access to workspace and wellness — one membership, two ecosystems in Bali.', 2),
('new-meditation-pods-opening-this-month', 'New Meditation Pods Opening This Month', 'BFriends', 'Mar 15, 2025', 'BFriends Team', 'Private sound-insulated pods for meditation and breathwork are now available.\n\nBook a slot and experience deep focus in the heart of the space. Each pod is equipped with comfortable seating, optional guided audio, and climate control so you can create the conditions that work best for you.\n\nIdeal for a midday reset or a dedicated practice session. Reserve via the app or at the front desk.', '/images/Restore/DDK00062.webp', 'New Meditation Pods | BFriends News', 'Private sound-insulated meditation and breathwork pods now available at BFriends — book a slot for deep focus and midday reset.', 3),
('member-spotlight-how-yoga-changed-my-routine', 'Member Spotlight: How Yoga Changed My Routine', 'BFriends', 'Mar 1, 2025', 'Community Desk', 'In our latest member story, we hear how a consistent yoga practice helped one member manage stress and find more energy for family and work.\n\nWhat started as a once-a-week class became a non-negotiable part of the week. The benefits extended beyond the mat: better sleep, clearer focus, and a calmer approach to daily challenges.\n\nWe''re grateful to share these stories and to see our community thrive. If you have a story to share, we''d love to hear from you.', '/images/Fitness/DDK09791.webp', 'Member Spotlight: Yoga Journey | BFriends News', 'How a consistent yoga practice helped one BFriends member manage stress, improve sleep, and find more energy for daily life.', 4),
('charm-credits-now-redeemable-at-bwork', 'Charm Credits Now Redeemable at BWork', 'BFriends', 'Feb 28, 2025', 'BFriends Team', 'Charm credits can now be used across BWork locations for meeting rooms and day passes.\n\nOne ecosystem, more flexibility. Use the credits you earn through BFriends activities to book workspace when you need to focus or collaborate. It''s our way of supporting the full arc of your day—wellness and work, under one roof.\n\nCheck the member portal for current rates and availability.', '/images/Integrate/DDK09396.jpg', 'Charm Credits at BWork | BFriends News', 'Charm credits are now redeemable at BWork locations for meeting rooms and day passes — wellness and work under one roof.', 5);

-- ============================================================
-- 9. Page Headers
-- ============================================================
INSERT INTO bfriends_page_headers (page_key, title, breadcrumb, image) VALUES
('philosophy', 'Our Philosophy', 'About / Philosophy', '/images/about/philosophy.jpg'),
('customer-journey', 'Customer Journey', 'About / Customer Journey', '/images/about/customer-journey.jpg'),
('bfriends-passport', 'BFriends Passport', 'Membership / Passport', '/images/membership/passport.jpg'),
('charm', 'Charm', 'Membership / Charm', '/images/membership/charm.jpg'),
('event-workshop', 'Event & Workshop', 'Community / Events', '/images/community/events.jpg'),
('blife-ecosystem-news', 'BLife Ecosystem News', 'Community / News', '/images/community/news.jpg');

-- ============================================================
-- 10. Philosophy Sections
-- ============================================================
INSERT INTO bfriends_philosophy_sections (section_key, headline, body, sort_order) VALUES
('manifesto', 'Our Manifesto', 'We believe wellness is not a destination but a continuous practice. BFriends exists to guide that practice with precision, care, and community.', 0),
('core-beliefs', 'Core Beliefs', 'Precision over intensity. Consistency over perfection. Evidence over trend. These are the pillars that guide everything we do at BFriends.', 1),
('integrated-self', 'The Integrated Self', 'True wellness integrates body, mind, and spirit. Our programs are designed to address all three dimensions simultaneously.', 2),
('blife-ecosystem', 'BLife Ecosystem', 'BFriends is part of the BLife ecosystem—connected with BWork, BNesta, BLive, Alam Kulkul, and Nulook to support every aspect of your life.', 3);

-- ============================================================
-- 11. Site Settings
-- ============================================================
INSERT INTO bfriends_site_settings (setting_key, setting_value) VALUES
('site_name', 'BFriends'),
('contact_phone', '+62 811-2874-2021'),
('contact_whatsapp', 'https://wa.me/6281128742021'),
('contact_email', 'hello@bfriends.id');
