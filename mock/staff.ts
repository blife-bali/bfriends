import type { FacilityId } from "@/mock/facilities";

/** Program slugs used to associate staff with programme pages. */
export const STAFF_PROGRAM_SLUGS = [
  "feel-better",
  "move-better",
  "live-better",
  "look-better",
  "fitness",
  "spa",
  "beauty",
  "climbing",
  "cafe",
] as const;

export type StaffProgramSlug = (typeof STAFF_PROGRAM_SLUGS)[number];

export type MockStaffMember = {
  id: string;
  name: string;
  role: string;
  sub: string;
  image: string | null;
  sort_order: number;
  facilities: FacilityId[];
  programs: StaffProgramSlug[];
};

export type MockStaffPage = {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  header_title: string;
  header_image: string;
  intro_title: string;
  intro_body: string;
};

export const mockStaffPage: MockStaffPage = {
  seo_title: "Our Team | BFriends Bali",
  seo_description:
    "Meet the instructors, therapists, and Journey Partners who guide your experience at BFriends Kerobokan.",
  breadcrumb: "About / Our Staff",
  header_title: "Our Staff",
  header_image: "/images/Integrate/DDK09558.webp",
  intro_title: "Instructors & Therapists",
  intro_body:
    "Our team brings together movement coaches, body therapists, beauty specialists, and mindful practice leaders — each trained to read your needs and guide you with clarity and care.",
};

export const mockStaff: MockStaffMember[] = [
  {
    id: "min-jae-kim",
    name: "Min-jae Kim",
    role: "Journey Partner",
    sub: "Program design & progress tracking",
    image: null,
    sort_order: 0,
    facilities: ["gym", "cafe", "wellness-spa", "beauty-spa", "yoga-space", "wallclimbing"],
    programs: ["feel-better", "move-better", "live-better", "look-better"],
  },
  {
    id: "daniel-hart",
    name: "Daniel Hart",
    role: "Fitness Specialist",
    sub: "Functional training · InBody",
    image: "/images/Fitness/DDK09605.webp",
    sort_order: 1,
    facilities: ["gym", "wallclimbing"],
    programs: ["move-better", "fitness", "climbing"],
  },
  {
    id: "sarah-lee",
    name: "Sarah Lee",
    role: "Wellness Therapist",
    sub: "Manual therapy · Sports recovery",
    image: "/images/Integrate/DDK09193.webp",
    sort_order: 2,
    facilities: ["wellness-spa"],
    programs: ["feel-better", "spa"],
  },
  {
    id: "hana-park",
    name: "Hana Park",
    role: "Beauty Therapist",
    sub: "K-Glow facial · Skin diagnostics",
    image: "/images/Enhance/DDK00316.webp",
    sort_order: 3,
    facilities: ["beauty-spa"],
    programs: ["look-better", "beauty"],
  },
  {
    id: "ayu-pratiwi",
    name: "Ayu Pratiwi",
    role: "Yoga Instructor",
    sub: "Vinyasa · Breathwork",
    image: "/images/Nurture/DDK09001.webp",
    sort_order: 4,
    facilities: ["yoga-space"],
    programs: ["move-better"],
  },
  {
    id: "james-chen",
    name: "James Chen",
    role: "Spa Therapist",
    sub: "Deep tissue · Recovery rituals",
    image: "/images/Integrate/DDK09278.webp",
    sort_order: 5,
    facilities: ["wellness-spa"],
    programs: ["feel-better", "spa"],
  },
];
