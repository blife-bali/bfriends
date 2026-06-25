import { BOOK_NOW_URL } from "@/lib/site-contact";

export const FACILITY_IDS = [
  "gym",
  "cafe",
  "beauty-spa",
  "wellness-spa",
  "yoga-space",
  "wallclimbing",
] as const;

export type FacilityId = (typeof FACILITY_IDS)[number];

export type FacilitySpecGroup = {
  title: string;
  items: string[];
  description?: string;
};

export type FacilityCta = {
  headline: string;
  description: string;
  label: string;
  href: string;
  external?: boolean;
};

export type MockFacility = {
  id: FacilityId;
  name: string;
  pillar: string;
  pillarLabel: string;
  floor: string;
  image: string;
  gallery_images: string[];
  sub: string;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  hero_headline: string;
  about_body: string;
  spec_section_label: string;
  spec_groups: FacilitySpecGroup[];
  cta: FacilityCta;
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
    "Explore BFriends Kerobokan — fitness, café, spa & body therapy, facial & beauty, pilates yoga & barre, and climbing in one integrated wellness destination.",
  breadcrumb: "Facilities",
  header_title: "BFriends Facilities",
  header_image: "/images/Fitness/DDK09594.webp",
  intro_title: "Designed for Your Wellbeing",
  intro_body:
    "Every space, service, tool, and expert at BFriends is intentionally designed to support personalized paths toward better wellbeing.",
};

export const mockFacilities: MockFacility[] = [
  {
    id: "gym",
    name: "Fitness",
    pillar: "fitness",
    pillarLabel: "Fitness",
    floor: "Basement",
    image: "/images/Fitness/DDK09594.webp",
    gallery_images: [
      "/images/Fitness/DDK09594.webp",
      "/images/Fitness/DDK09605.webp",
      "/images/Fitness/DDK09685.webp",
      "/images/Fitness/DDK09740.webp",
      "/images/Fitness/DDK09791.webp",
      "/images/Fitness/DDK09821.webp",
    ],
    sub: "Customized training and group classes for all levels — with tailored modifications to improve flexibility, strength, posture, and movement confidence.",
    sort_order: 0,
    seo_title: "Fitness | BFriends Facilities",
    seo_description:
      "Customized training and group classes at the BFriends fitness area — functional zones, guided strength, and assessment-informed programmes in Kerobokan, Bali.",
    hero_headline: "Find Your Flow",
    about_body:
      "Customized training and group classes for all levels with tailored modifications to improve flexibility, strength, posture and movement confidence.",
    spec_section_label: "Specifications",
    spec_groups: [
      {
        title: "Available Equipment & Facilities",
        items: [
          "Free Weights",
          "Strength Machines",
          "Calisthenics Training Area",
          "Bodyweight Training Area",
        ],
      },
      {
        title: "Available Programmes",
        items: ["Wellness Movement & Fitness", "Group Classes", "Personal Training"],
      },
      {
        title: "What Makes It Unique",
        items: [
          "Personalized movement approach",
          "Assessment-informed wellness journey",
          "Expert-guided training experience",
        ],
      },
    ],
    cta: {
      headline: "Explore Our Programmes",
      description:
        "Discover personalized wellness programmes designed to help you move better and feel stronger.",
      label: "Explore Programmes",
      href: "/programs/move-better",
    },
  },
  {
    id: "cafe",
    name: "Cafe",
    pillar: "restore",
    pillarLabel: "Restore",
    floor: "1st Floor",
    image: "/images/Restore/DDK09897.webp",
    gallery_images: [
      "/images/Restore/DDK09897.webp",
      "/images/Restore/DDK09929.webp",
      "/images/Restore/DDK09935.webp",
      "/images/Restore/DDK09994.webp",
      "/images/Restore/DDK00016.webp",
      "/images/Restore/DDK00062.webp",
    ],
    sub: "Korean-inspired refinement meets Bali's fresh local ingredients — clean, balanced, and nourishing food experiences that support wellness without compromising enjoyment.",
    sort_order: 1,
    seo_title: "Cafe | BFriends Facilities",
    seo_description:
      "BFriends Cafe — Korean-inspired wellness dining with fresh local ingredients, health-focused menus, and a calm social atmosphere in Kerobokan.",
    hero_headline: "Nourishment For Everyday Wellbeing",
    about_body:
      "BFriends Cafe combines Korean-inspired refinement with Bali's fresh local ingredients to create clean, balanced, and nourishing food experiences. Every menu is thoughtfully prepared to support wellness without compromising enjoyment.",
    spec_section_label: "Specifications",
    spec_groups: [
      {
        title: "Signature",
        items: [
          "FnB selections programmes health focused",
          "FnB selections use fresh ingredients",
        ],
      },
      {
        title: "Capacity",
        items: ["47 Seats"],
      },
      {
        title: "What Makes It Unique",
        items: [
          "Wellness-centered dining experience",
          "Korean-inspired approach",
          "Designed to complement the Wellness",
        ],
      },
    ],
    cta: {
      headline: "Support Your Wellness Journey",
      description: "Explore programmes that combine movement, recovery and nutrition.",
      label: "Explore Programmes",
      href: "/programs/live-better",
    },
  },
  {
    id: "wellness-spa",
    name: "Spa & Body Therapy",
    pillar: "integrate",
    pillarLabel: "Integrate",
    floor: "2nd Floor",
    image: "/images/Integrate/DDK09585.webp",
    gallery_images: [
      "/images/Integrate/DDK09585.webp",
      "/images/Integrate/DDK09558.webp",
      "/images/Integrate/DDK09488.webp",
      "/images/Integrate/DDK09396.webp",
      "/images/Integrate/DDK09349.webp",
      "/images/Integrate/DDK09278.webp",
      "/images/Integrate/DDK09222.webp",
      "/images/Integrate/DDK09193.webp",
    ],
    sub: "Personalized body therapies, restorative rituals, and assessment-supported treatments that help your body recover, rebalance, and perform at its best.",
    sort_order: 2,
    seo_title: "Spa & Body Therapy | BFriends Facilities",
    seo_description:
      "Recovery-focused body therapies, signature rituals, and assessment-supported treatments at BFriends Spa & Body Therapy in Kerobokan.",
    hero_headline: "Restore Balance. Recover Better.",
    about_body:
      "Recovery is an essential part of long-term wellbeing. Through personalized body therapies, restorative rituals, and assessment-supported treatments, BFriends Spa helps the body recover, rebalance, and perform at its best.",
    spec_section_label: "Treatments & Services",
    spec_groups: [
      {
        title: "Hydro Treatments",
        items: ["Korean Body Scrub", "Body Scrub", "Body Mask"],
      },
      {
        title: "Signature Body Rituals",
        items: [
          "Body Alignment Therapy",
          "Motion Balance",
          "Deep Rest Therapy",
          "Volcanic Stone Flow Massage",
          "Kids Massage",
          "Foot Massage",
          "Core & Gut Harmony",
        ],
      },
      {
        title: "Assessment & Technology",
        items: ["Fitrix", "InBody", "Facial Analyze"],
      },
      {
        title: "Signature Experiences",
        items: ["Body Alignment Therapy", "Deep Rest Therapy"],
      },
    ],
    cta: {
      headline: "Start Your Recovery Journey",
      description:
        "Discover programmes designed around your body's recovery and wellbeing needs.",
      label: "Explore Programmes",
      href: "/programs/feel-better",
    },
  },
  {
    id: "beauty-spa",
    name: "Facial & Beauty",
    pillar: "enhance",
    pillarLabel: "Enhance",
    floor: "3rd Floor",
    image: "/images/Enhance/DDK00316.webp",
    gallery_images: [
      "/images/Enhance/DDK00316.webp",
      "/images/Enhance/DDK00601.webp",
      "/images/Enhance/DDK00561.webp",
      "/images/Enhance/DDK00532.webp",
      "/images/Enhance/DDK00433.webp",
      "/images/Enhance/DDK00418.webp",
      "/images/Enhance/DDK00330.webp",
      "/images/Enhance/DDK00276.webp",
    ],
    sub: "Advanced treatments and Korean-inspired beauty expertise — personalized care to help you achieve healthier, more radiant skin.",
    sort_order: 3,
    seo_title: "Facial & Beauty | BFriends Facilities",
    seo_description:
      "Facial treatments, scalp rituals, and Korean-inspired beauty expertise at BFriends Facial & Beauty in Kerobokan, Bali.",
    hero_headline: "Beauty Backed By Care",
    about_body:
      "Every skin and beauty journey is unique. Through advanced treatments, personalized care, and Korean-inspired beauty expertise, BFriends helps you achieve healthier, more radiant skin.",
    spec_section_label: "Treatments & Services",
    spec_groups: [
      {
        title: "Facial Treatments",
        items: ["Glass Glow", "Sculpt Lift", "Sun Soothe", "Hydra Infusion", "Pore Refine"],
      },
      {
        title: "Scalp & Hair Rituals",
        items: ["Scalp Clarity Ritual", "Hair Strength Therapy", "Relaxation Ritual"],
      },
      {
        title: "Technology & Assessment",
        items: [
          "Beauty equipment and assessment tools",
          "Skin analysis technology",
        ],
      },
      {
        title: "Signature Experiences",
        items: ["Glass Glow", "Sculpt Lift"],
      },
    ],
    cta: {
      headline: "Discover Your Personalized Beauty Journey",
      description: "Explore programmes and treatments tailored to your individual needs.",
      label: "Explore Programmes",
      href: "/programs/look-better",
    },
  },
  {
    id: "yoga-space",
    name: "Pilates, Yoga & Barre",
    pillar: "nurture",
    pillarLabel: "Nurture",
    floor: "4th Floor",
    image: "/images/Nurture/DDK09005.webp",
    gallery_images: [
      "/images/Nurture/DDK09005.webp",
      "/images/Nurture/DDK09001.webp",
      "/images/Nurture/DDK09021.webp",
      "/images/Nurture/DDK09034.webp",
      "/images/Nurture/DDK09064.webp",
      "/images/Nurture/DDK09078.webp",
      "/images/Nurture/DDK09099.webp",
      "/images/Nurture/DDK09121.webp",
    ],
    sub: "Movement practices that support strength, mobility, posture, and overall wellbeing — with a deeper connection between body and mind.",
    sort_order: 4,
    seo_title: "Pilates, Yoga & Barre | BFriends Facilities",
    seo_description:
      "Pilates, yoga, and barre classes with reformer equipment and expert instructors at BFriends in Kerobokan, Bali.",
    hero_headline: "Move With Intention",
    about_body:
      "Through Pilates, Yoga, and Barre, BFriends offers movement practices that support strength, mobility, posture, and overall wellbeing while encouraging deeper connection between body and mind.",
    spec_section_label: "Treatments & Services",
    spec_groups: [
      {
        title: "Available Classes",
        items: [
          "Pilates — Strengthens the body through controlled movement, core engagement, posture improvement, and stability.",
          "Yoga — Supports flexibility, mobility, mindful breathing, and functional movement.",
          "Barre — Combines dance-inspired conditioning and strength training to improve posture, balance, and coordination.",
        ],
      },
      {
        title: "Pilates Equipment",
        items: [
          "4 MPX Reformers",
          "Cadillac / Trapeze Table",
          "Stability Chair",
          "Ladder Barrel",
        ],
      },
      {
        title: "Yoga & Barre Equipment",
        items: ["Studio equipment and props"],
      },
      {
        title: "Signature Experiences",
        items: [
          "Pilates Reformer Training",
          "Yoga Mobility Practice",
          "Barre Conditioning",
        ],
      },
    ],
    cta: {
      headline: "Move Better Every Day",
      description: "Discover movement programmes designed to support your wellness journey.",
      label: "Explore Programmes",
      href: "/programs/move-better",
    },
  },
  {
    id: "wallclimbing",
    name: "Climbing",
    pillar: "dare",
    pillarLabel: "Dare",
    floor: "Wallclimbing",
    image: "/images/climbing.jpeg",
    gallery_images: [
      "/images/climbing.jpeg",
    ],
    sub: "Physical movement and mental focus in one rewarding experience — building confidence, resilience, and perseverance on a 15-meter climbing wall.",
    sort_order: 5,
    seo_title: "Climbing | BFriends Facilities",
    seo_description:
      "15-meter climbing wall for adults and children at BFriends — strength, coordination, and personal growth in Kerobokan.",
    hero_headline: "Growth Through Challenge",
    about_body:
      "Climbing combines physical movement and mental focus to create a rewarding experience that strengthens the body while building confidence and perseverance.",
    spec_section_label: "Specifications",
    spec_groups: [
      {
        title: "Facility Overview",
        items: ["15-Meter Climbing Wall"],
      },
      {
        title: "Available Programmes",
        items: [
          "Adult Wall Climbing — Full-body movement experience focused on strength, coordination, balance, and endurance.",
          "Kids Wall Climbing — Fun and engaging climbing experiences that support confidence, coordination, and problem-solving skills.",
        ],
      },
      {
        title: "What Makes It Unique",
        items: [
          "Suitable for both adults and children",
          "Combines physical challenge with personal growth",
          "Integrated within the broader BFriends wellness ecosystem",
        ],
      },
    ],
    cta: {
      headline: "Take The Next Step In Your Wellness Journey",
      description: "Explore programmes designed to help you move, grow, and thrive.",
      label: "Book Schedule",
      href: BOOK_NOW_URL,
      external: true,
    },
  },
];
