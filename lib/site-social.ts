export const FOOTER_SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61579666130043&sk=reviews",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/bfriends.bali?igsh=dXg3ZWZmZzM2dXIw",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bfriends",
    hidden: true,
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@bfriends",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/bfriends_bali",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@bfriendsbali?_r=1&_t=ZS-97Rl2AScEhZ",
  },
  {
    id: "tripadvisor",
    label: "TripAdvisor",
    href: "https://www.tripadvisor.com/Attraction_Review-g13356179-d34418734-Reviews-Bfriends_Wellnes_Center-Kerobokan_Kelod_North_Kuta_Bali.html",
  },
  {
    id: "fresha",
    label: "Fresha",
    href: "https://www.fresha.com/a/bfriends-spa-wellness-bali-jalan-teuku-umar-barat-989x-x58o2xek/all-offer?menu=true&share=true&pId=2887128",
    iconSrc: "/images/icons/fresha.png",
  },
] as const;

export const VISIBLE_FOOTER_SOCIAL_LINKS = FOOTER_SOCIAL_LINKS.filter(
  (link) => !("hidden" in link && link.hidden)
);
