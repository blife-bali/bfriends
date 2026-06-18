export type SpaSlug = "spa" | "facials" | "hair" | "nails";

export type MockSpaPage = {
  slug: SpaSlug;
  title: string;
  subtitle?: string;
  eyebrow: string;
  breadcrumb: string;
  header_image: string;
  program_slugs: string[];
  /** Optional: also match programs whose name contains any of these (case-insensitive). */
  program_name_keywords?: string[];
  /** When set, only groups/sessions matching any keyword (group name or session text) are shown. */
  session_group_keywords?: string[];
  /** When set, groups/sessions matching any keyword are hidden (used on main Spa page). */
  session_group_exclude_keywords?: string[];
  services_heading: string;
  sessions_title: string;
  seo_title: string;
  seo_description: string;
};

export const mockSpaPages: Record<SpaSlug, MockSpaPage> = {
  spa: {
    slug: "spa",
    title: "Spa Treatments for Recovery & Relaxation",
    subtitle: "Personalised wellness treatments designed to help you recharge, recover, and restore balance.",
    eyebrow: "Feel Better",
    breadcrumb: "Spa / Spa",
    header_image: "/images/Integrate/DDK09278.webp",
    program_slugs: ["integrate", "spa"],
    session_group_exclude_keywords: [
      "facial",
      "hair",
      "scalp",
      "nail",
      "manicure",
      "pedicure",
    ],
    services_heading: "Feel Better Programs",
    sessions_title: "Spa Treatments",
    seo_title: "Spa Treatments | BFriends Bali",
    seo_description:
      "Therapeutic body care including manual physiotherapy, postural correction, sports recovery, and signature body rituals at BFriends Kerobokan.",
  },
  facials: {
    slug: "facials",
    title: "Personalised Facial Treatments",
    subtitle: "Facial treatments tailored to support healthy, refreshed, and radiant skin.",
    eyebrow: "Look Better",
    breadcrumb: "Spa / Facials",
    header_image: "/images/Enhance/DDK00418.webp",
    program_slugs: ["beauty"],
    session_group_keywords: ["facial"],
    services_heading: "Look Better Programs",
    sessions_title: "Facial Treatments",
    seo_title: "Facial Treatments | BFriends Bali",
    seo_description:
      "Science-led K-Beauty facials — glass glow, sculpt lift, hydra infusion, and advanced skin treatments at BFriends Kerobokan.",
  },
  hair: {
    slug: "hair",
    title: "Hair Care Designed Around You",
    subtitle: "Professional hair treatments and services tailored to your individual needs and preferences.",
    eyebrow: "",
    breadcrumb: "Spa / Hair",
    header_image: "/images/Integrate/DDK09585.webp",
    program_slugs: ["beauty", "spa", "enhance"],
    program_name_keywords: ["hair", "face and hair", "beauty", "look better"],
    session_group_keywords: ["hair", "scalp"],
    services_heading: "BFriends Programs",
    sessions_title: "Scalp & Hair Rituals",
    seo_title: "Scalp & Hair Rituals | BFriends Bali",
    seo_description:
      "Purifying scalp rituals and restorative hair therapies designed for clarity, strength, and long-term vitality at BFriends Kerobokan.",
  },
  nails: {
    slug: "nails",
    title: "Nail Care & Beauty Services",
    subtitle: "Thoughtfully designed nail treatments that combine beauty, care, and self-expression.",
    eyebrow: "Look Better",
    breadcrumb: "Spa / Nails",
    header_image: "/images/Enhance/DDK00601.webp",
    program_slugs: ["enhance", "beauty"],
    program_name_keywords: ["look better"],
    session_group_keywords: ["nail", "manicure", "pedicure"],
    services_heading: "Look Better Programs",
    sessions_title: "Nail Treatments",
    seo_title: "Nail Treatments | BFriends Bali",
    seo_description:
      "Premium nail care and finishing rituals from the Look Better program at BFriends Kerobokan.",
  },
};

export const spaSlugs = Object.keys(mockSpaPages) as SpaSlug[];

export function getMockSpaPage(slug: string): MockSpaPage | null {
  return mockSpaPages[slug as SpaSlug] ?? null;
}
