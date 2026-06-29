export type JourneyPartnerTeam = {
  id: string;
  title: string;
  image: string;
  image_alt: string;
  body: string;
};

export type MockJourneyPartnersPage = {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  hero_title: string;
  hero_description: string;
  header_image: string;
  teams: JourneyPartnerTeam[];
};

export const mockJourneyPartnersPage: MockJourneyPartnersPage = {
  seo_title: "Journey Partners | BFriends Bali",
  seo_description:
    "Meet the multidisciplinary BFriends team — consultation specialists, spa therapists, fitness coaches, and café partners guiding your wellness journey.",
  breadcrumb: "About / Journey Partners",
  hero_title: "Meet the Journey Partners",
  hero_description:
    "Our multidisciplinary team works together to understand your needs, design personalized wellness journeys, and support your long-term progress.",
  header_image: "/images/Integrate/DDK09558.webp",
  teams: [
    {
      id: "consultation",
      title: "Consultation Team",
      image: "/images/Integrate/DDK09558.webp",
      image_alt: "BFriends consultation team",
      body: "Our consultation specialists begin every wellness journey through assessment, understanding your goals, and creating personalized recommendations.",
    },
    {
      id: "spa",
      title: "Spa Team",
      image: "/images/venue/Spa-1.webp",
      image_alt: "BFriends spa team",
      body: "Dedicated therapists delivering recovery-focused treatments designed to restore balance and support overall wellbeing.",
    },
    {
      id: "fitness",
      title: "Fitness Team",
      image: "/images/venue/Gym-1.webp",
      image_alt: "BFriends fitness team",
      body: "Professional trainers helping you build strength, mobility, and sustainable healthy habits through personalized coaching.",
    },
    {
      id: "cafe",
      title: "Cafe Team",
      image: "/images/Restore/DDK09994.webp",
      image_alt: "BFriends café team",
      body: "Our café team prepares wholesome meals and beverages inspired by Korean refinement and fresh local ingredients to complement your wellness journey.",
    },
  ],
};
