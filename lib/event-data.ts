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
      "Join us for a morning of mindful movement and expert-led sessions on seasonal wellness. This immersive workshop combines yoga, meditation, and nutritional guidance to help you transition seamlessly into the new season.",
    image: "/images/programs/D.webp",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
  {
    id: "2",
    index: 2,
    date: "Feb 28, 2025",
    time: "02:00 PM",
    title: "Community Open House",
    description:
      "Experience BFriends—tour the space, meet the team, and enjoy complimentary sessions. Discover our facilities including yoga studios, meditation gardens, and treatment rooms.",
    image: "/images/programs/E.jpg",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
  {
    id: "3",
    index: 3,
    date: "Apr 5, 2025",
    time: "10:00 AM",
    title: "Mindful Leadership Retreat",
    description:
      "A half-day retreat for leaders seeking clarity and presence. Blend meditation, breathwork, and peer dialogue in a serene setting.",
    image: "/images/programs/D.webp",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
  {
    id: "4",
    index: 4,
    date: "Apr 12, 2025",
    time: "03:00 PM",
    title: "Sound Bath & Restorative Yoga",
    description:
      "Unwind with crystal bowls and gentle restorative poses. Perfect for releasing tension and restoring balance.",
    image: "/images/programs/E.jpg",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
  {
    id: "5",
    index: 5,
    date: "Apr 20, 2025",
    time: "09:30 AM",
    title: "Family Wellness Day",
    description:
      "A day of activities for all ages: family yoga, nature walks, and healthy cooking demos. Connect and recharge together.",
    image: "/images/programs/D.webp",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
  {
    id: "6",
    index: 6,
    date: "May 3, 2025",
    time: "06:00 PM",
    title: "Sunset Meditation Series",
    description:
      "Weekly outdoor meditation as the sun sets. No experience needed—just an open mind and comfortable seating.",
    image: "/images/programs/E.jpg",
    href: "/community/event-workshop",
    ecosystem: "BFriends",
  },
];
