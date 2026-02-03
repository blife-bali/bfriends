export type EcosystemTag =
  | "BLive"
  | "Bwork"
  | "BNesta"
  | "BFriends"
  | "Alam Kulkul"
  | "Nulook";

export interface EventItem {
  id: string;
  index: number;
  date: string;
  time?: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  ecosystem: EcosystemTag;
}

export const eventData: EventItem[] = [
  {
    id: "1",
    index: 1,
    date: "Mar 15, 2025",
    time: "09:00 AM",
    title: "Spring Wellness Workshop",
    description:
      "Join us for a morning of mindful movement and expert-led sessions on seasonal wellness. This immersive workshop combines yoga, meditation, and nutritional guidance to help you transition seamlessly into the new season. Our certified instructors will guide you through gentle stretches and breathing techniques designed to rejuvenate both body and mind.",
    image: "/images/programs/D.webp",
    href: "#",
    ecosystem: "BFriends",
  },
  {
    id: "2",
    index: 2,
    date: "Feb 28, 2025",
    time: "02:00 PM",
    title: "Community Open House",
    description:
      "Experience BFriends—tour the space, meet the team, and enjoy complimentary sessions. Discover our state-of-the-art facilities including our yoga studios, meditation gardens, and treatment rooms. Sample mini-sessions of our most popular wellness programs and connect with like-minded individuals who share your passion for holistic health and personal growth.",
    image: "/images/programs/E.jpg",
    href: "#",
    ecosystem: "BFriends",
  },
];
