export const FACILITY_IDS = [
  "gym",
  "cafe",
  "beauty-spa",
  "wellness-spa",
  "yoga-space",
  "wallclimbing",
] as const;

export type FacilityId = (typeof FACILITY_IDS)[number];

export type MockFacility = {
  id: FacilityId;
  name: string;
  pillar: string;
  pillarLabel: string;
  floor: string;
  image: string;
  sub: string;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  hero_headline: string;
  about_title: string;
  about_body: string;
  specifications_title: string;
  specifications: string[];
  related_program_slug: string;
};

export type MockFacilitiesPage = {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  header_title: string;
  header_image: string;
  intro_title: string;
  intro_body: string;
};

export const mockFacilitiesPage: MockFacilitiesPage = {
  seo_title: "BFriends Facilities | BFriends Bali",
  seo_description:
    "Explore BFriends Kerobokan — gym, café, beauty spa, wellness spa, yoga studio, and wall climbing in one integrated wellness destination.",
  breadcrumb: "About / Facilities",
  header_title: "BFriends Facilities",
  header_image: "/images/programs/D.webp",
  intro_title: "A Complete Wellness Ecosystem",
  intro_body:
    "Every space, service, and experience at BFriends is designed to support your wellness journey. Built around the F.R.I.E.N.D.S framework, our ecosystem brings together movement, recovery, beauty, nutrition, community, and expert support under one destination.",
};

export const mockFacilities: MockFacility[] = [
  {
    id: "gym",
    name: "Gym",
    pillar: "fitness",
    pillarLabel: "Fitness",
    floor: "Basement",
    image: "/images/Fitness/DDK09594.webp",
    sub: "The basement gym combines functional training zones, guided strength areas, and Fittrix & InBody analysis so every session starts from what your body actually needs. Training here is not about pushing harder; it is about moving with clarity, confidence, and a routine your Journey Partner designs for you.",
    sort_order: 0,
    seo_title: "Gym | BFriends Facilities",
    seo_description:
      "Train with purpose at the BFriends basement gym — functional zones, guided strength areas, and Fittrix & InBody analysis in Kerobokan, Bali.",
    hero_headline: "Find Your Flow",
    about_title: "About the Gym",
    about_body:
      "The basement gym is built for intentional movement. Every zone supports a different training need — from functional strength and mobility to guided conditioning — so your sessions stay aligned with what your body actually requires. With Fittrix posture analysis and InBody composition tracking, your Journey Partner can design a programme rooted in real data, not guesswork.",
    specifications_title: "Equipment & Training Environment",
    specifications: [
      "Functional training zones with free weights and cable systems",
      "Guided strength and conditioning areas",
      "Fittrix posture and movement analysis",
      "InBody composition and body metrics tracking",
      "Mobility and recovery stations",
      "Climate-controlled training environment",
    ],
    related_program_slug: "fitness",
  },
  {
    id: "cafe",
    name: "Cafe",
    pillar: "restore",
    pillarLabel: "Restore",
    floor: "1st Floor",
    image: "/images/Restore/DDK09897.webp",
    sub: "BCafé on the first floor is where post-workout restoration meets everyday ritual—signature wellness smoothies, clean nutrition, specialty coffee, and Korean Cheong × Jamu tonics served in a calm lounge you can truly settle into. Recovery is not about stopping; it is the moment your body and energy reconnect.",
    sort_order: 1,
    seo_title: "Cafe | BFriends Facilities",
    seo_description:
      "BCafé at BFriends — wellness smoothies, clean nutrition, specialty coffee, and Korean Cheong × Jamu tonics in a calm Kerobokan lounge.",
    hero_headline: "Restore & Reconnect",
    about_title: "About BCafé",
    about_body:
      "BCafé on the first floor is where post-workout restoration meets everyday ritual. Signature wellness smoothies, clean nutrition, specialty coffee, and Korean Cheong × Jamu tonics are served in a calm lounge designed for you to truly settle in. Recovery is not about stopping — it is the moment your body and energy reconnect.",
    specifications_title: "Specifications",
    specifications: [
      "Signature wellness smoothies and cold-pressed juices",
      "Clean nutrition bowls and light meals",
      "Specialty coffee and tea programme",
      "Korean Cheong × Jamu restorative tonics",
      "Calm lounge seating with natural light",
      "Post-workout and pre-session menu options",
    ],
    related_program_slug: "cafe",
  },
  {
    id: "beauty-spa",
    name: "Beauty Spa",
    pillar: "enhance",
    pillarLabel: "Enhance",
    floor: "3rd Floor",
    image: "/images/Enhance/DDK00316.webp",
    sub: "On the third floor, bright clinical-calm treatment rooms host K-Glow facials, skin boosters, contouring, and advanced laser work—each session guided by K-standard diagnostics and protocols rooted in dermatological practice. Beauty at BFriends is about long-term vitality, not coverage; your outer glow reflects the care built into every visit.",
    sort_order: 3,
    seo_title: "Beauty Spa | BFriends Facilities",
    seo_description:
      "K-Glow facials, skin boosters, contouring, and advanced laser treatments at the BFriends Beauty Spa on the third floor, Kerobokan.",
    hero_headline: "Enhance Your Natural Glow",
    about_title: "About the Beauty Spa",
    about_body:
      "On the third floor, bright clinical-calm treatment rooms host K-Glow facials, skin boosters, contouring, and advanced laser work — each session guided by K-standard diagnostics and protocols rooted in dermatological practice. Beauty at BFriends is about long-term vitality, not coverage; your outer glow reflects the care built into every visit.",
    specifications_title: "Specifications",
    specifications: [
      "Clinical-calm treatment suites with adjustable lighting",
      "K-Glow facial and skin booster protocols",
      "Advanced contouring and lifting treatments",
      "Laser and light-based skin therapies",
      "Dermatological-grade diagnostics and skin analysis",
      "Private consultation and aftercare rooms",
    ],
    related_program_slug: "beauty",
  },
  {
    id: "wellness-spa",
    name: "Wellness Spa",
    pillar: "integrate",
    pillarLabel: "Integrate",
    floor: "2nd Floor",
    image: "/images/Integrate/DDK09585.webp",
    sub: "The second-floor wellness spa offers treatment suites for manual physiotherapy, postural correction, sports recovery, and injury rehabilitation—guided by a six-layer approach that moves from surface renewal to profound rest. Pain is read as a signal; we integrate clinical precision with hands-on care so your body rebuilds strength and alignment with intention.",
    sort_order: 2,
    seo_title: "Wellness Spa | BFriends Facilities",
    seo_description:
      "Manual physiotherapy, postural correction, sports recovery, and injury rehabilitation at the BFriends Wellness Spa, Kerobokan.",
    hero_headline: "Integrate Body & Mind",
    about_title: "About the Wellness Spa",
    about_body:
      "The second-floor wellness spa offers treatment suites for manual physiotherapy, postural correction, sports recovery, and injury rehabilitation — guided by a six-layer approach that moves from surface renewal to profound rest. Pain is read as a signal; we integrate clinical precision with hands-on care so your body rebuilds strength and alignment with intention.",
    specifications_title: "Specifications",
    specifications: [
      "Manual physiotherapy and sports recovery suites",
      "Postural correction and alignment therapy rooms",
      "Injury rehabilitation and mobility treatment areas",
      "Six-layer integrative treatment approach",
      "Private treatment rooms with adjustable beds",
      "Recovery lounge for post-session rest",
    ],
    related_program_slug: "spa",
  },
  {
    id: "yoga-space",
    name: "Yoga Space",
    pillar: "nurture",
    pillarLabel: "Nurture",
    floor: "4th Floor",
    image: "/images/Nurture/DDK09005.webp",
    sub: "The fourth-floor studio is your pause button in a high-pace world—a dedicated space for yoga, barre, sound healing, guided meditation, and wellness workshops that center the nervous system and deepen mind-body connection. Nurture is intentional softness: giving your mind the same level of care and training as your muscles.",
    sort_order: 4,
    seo_title: "Yoga Space | BFriends Facilities",
    seo_description:
      "Yoga, barre, sound healing, and guided meditation at the BFriends fourth-floor studio in Kerobokan, Bali.",
    hero_headline: "Nurture Your Inner Balance",
    about_title: "About the Yoga Space",
    about_body:
      "The fourth-floor studio is your pause button in a high-pace world — a dedicated space for yoga, barre, sound healing, guided meditation, and wellness workshops that center the nervous system and deepen mind-body connection. Nurture is intentional softness: giving your mind the same level of care and training as your muscles.",
    specifications_title: "Specifications",
    specifications: [
      "Open-plan studio with natural light and ventilation",
      "Premium yoga mats, blocks, and props",
      "Barre and mobility training equipment",
      "Sound healing and meditation setup",
      "Workshop and small-group session capacity",
      "Quiet changing and preparation area",
    ],
    related_program_slug: "fitness",
  },
  {
    id: "wallclimbing",
    name: "Wallclimbing",
    pillar: "dare",
    pillarLabel: "Dare",
    floor: "Wallclimbing",
    image: "/images/programs/D.webp",
    sub: "Our dedicated wall-climbing facility welcomes beginners and experienced climbers alike—build confidence, resilience, and body awareness through intentional movement, curated routes, and community events that celebrate progress. More than sport, climbing here is a practice of trust, breakthrough, and rediscovering the joy of moving forward, one hold at a time.",
    sort_order: 5,
    seo_title: "Wallclimbing | BFriends Facilities",
    seo_description:
      "Wall climbing for beginners and experienced climbers at BFriends — curated routes, coaching, and community events in Kerobokan.",
    hero_headline: "Dare to Climb Higher",
    about_title: "About Wallclimbing",
    about_body:
      "Our dedicated wall-climbing facility welcomes beginners and experienced climbers alike — build confidence, resilience, and body awareness through intentional movement, curated routes, and community events that celebrate progress. More than sport, climbing here is a practice of trust, breakthrough, and rediscovering the joy of moving forward, one hold at a time.",
    specifications_title: "Equipment & Training Environment",
    specifications: [
      "Curated bouldering and top-rope routes for all levels",
      "Auto-belay and safety-certified climbing systems",
      "Climbing shoes and harness rental available",
      "Beginner introduction and technique coaching",
      "Route-setting programme with regular updates",
      "Community events and progression workshops",
    ],
    related_program_slug: "fitness",
  },
];
