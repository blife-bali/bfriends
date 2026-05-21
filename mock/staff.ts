export type MockStaffMember = {
  id: string;
  name: string;
  role: string;
  sub: string;
  image: string | null;
  sort_order: number;
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
  },
  {
    id: "daniel-hart",
    name: "Daniel Hart",
    role: "Fitness Specialist",
    sub: "Functional training · InBody",
    image: "/images/Fitness/DDK09605.webp",
    sort_order: 1,
  },
  {
    id: "sarah-lee",
    name: "Sarah Lee",
    role: "Wellness Therapist",
    sub: "Manual therapy · Sports recovery",
    image: "/images/Integrate/DDK09193.webp",
    sort_order: 2,
  },
  {
    id: "hana-park",
    name: "Hana Park",
    role: "Beauty Therapist",
    sub: "K-Glow facial · Skin diagnostics",
    image: "/images/Enhance/DDK00316.webp",
    sort_order: 3,
  },
  {
    id: "ayu-pratiwi",
    name: "Ayu Pratiwi",
    role: "Yoga Instructor",
    sub: "Vinyasa · Breathwork",
    image: "/images/Nurture/DDK09001.webp",
    sort_order: 4,
  },
  {
    id: "james-chen",
    name: "James Chen",
    role: "Spa Therapist",
    sub: "Deep tissue · Recovery rituals",
    image: "/images/Integrate/DDK09278.webp",
    sort_order: 5,
  },
];
