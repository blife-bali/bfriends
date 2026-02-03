export type EcosystemTag =
  | "BLive"
  | "Bwork"
  | "BNesta"
  | "BFriends"
  | "Alam Kulkul"
  | "Nulook";

export interface EventItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  ecosystem: EcosystemTag;
}

export const eventData: EventItem[] = [
  {
    id: "1",
    date: "Mar 15, 2025",
    title: "Spring Wellness Workshop",
    description:
      "Join us for a morning of mindful movement and expert-led sessions on seasonal wellness.",
    image: "/images/programs/D.webp",
    href: "#",
    ecosystem: "BFriends",
  },
  {
    id: "2",
    date: "Feb 28, 2025",
    title: "Community Open House",
    description:
      "Experience BFriends—tour the space, meet the team, and enjoy complimentary sessions.",
    image: "/images/programs/E.jpg",
    href: "#",
    ecosystem: "BFriends",
  },
];
