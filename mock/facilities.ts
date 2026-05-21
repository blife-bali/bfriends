export type MockFacility = {
  id: string;
  name: string;
  pillar: string;
  pillarLabel: string;
  floor: string;
  image: string;
  sub: string;
  sort_order: number;
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
  intro_title: "Spaces for Every Layer of Wellness",
  intro_body:
    "BFriends brings movement, nourishment, therapeutic care, beauty, mindful practice, and challenge together under one roof. Each space is purpose-built to support a step in your wellness journey — from baseline to breakthrough.",
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
  },
];
