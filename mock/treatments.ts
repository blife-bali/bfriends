export type TreatmentSlug = "beauty-treatments" | "spa-treatment";

export type MockTreatmentPage = {
  slug: TreatmentSlug;
  title: string;
  eyebrow: string;
  breadcrumb: string;
  header_image: string;
  program_slugs: string[];
  services_heading: string;
  sessions_title: string;
  seo_title: string;
  seo_description: string;
};

export const mockTreatmentPages: Record<TreatmentSlug, MockTreatmentPage> = {
  "beauty-treatments": {
    slug: "beauty-treatments",
    title: "Beauty Treatments",
    eyebrow: "Look Better",
    breadcrumb: "Treatments / Beauty Treatments",
    header_image: "/images/Enhance/DDK00418.webp",
    program_slugs: ["enhance", "beauty"],
    services_heading: "Look Better Programs",
    sessions_title: "Beauty Treatments",
    seo_title: "Beauty Treatments | BFriends Bali",
    seo_description:
      "Science-led K-Beauty spa care — facials, skin boosters, contouring, and advanced laser treatments at BFriends Kerobokan.",
  },
  "spa-treatment": {
    slug: "spa-treatment",
    title: "Spa Treatment",
    eyebrow: "Feel Better",
    breadcrumb: "Treatments / Spa Treatment",
    header_image: "/images/Integrate/DDK09585.webp",
    program_slugs: ["integrate", "spa"],
    services_heading: "Feel Better Programs",
    sessions_title: "Spa Treatments",
    seo_title: "Spa Treatments | BFriends Bali",
    seo_description:
      "Therapeutic body care including manual physiotherapy, postural correction, sports recovery, and signature body rituals at BFriends Kerobokan.",
  },
};

export const treatmentSlugs = Object.keys(mockTreatmentPages) as TreatmentSlug[];

export function getMockTreatmentPage(slug: string): MockTreatmentPage | null {
  return mockTreatmentPages[slug as TreatmentSlug] ?? null;
}
