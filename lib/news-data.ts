import type { EcosystemTag } from "./event-data";

export interface NewsItem {
  id: string;
  index: number;
  date: string;
  author: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  ecosystem: EcosystemTag;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    index: 1,
    date: "Mar 8, 2025",
    author: "BFriends Team",
    title: "New Integrate Treatments Now Available",
    description:
      "Discover our latest therapeutic offerings designed to support balance and recovery. Our new integrated treatments combine traditional healing practices with modern therapeutic techniques.",
    image: "/images/programs/I.png",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
  {
    id: "2",
    index: 2,
    date: "Feb 20, 2025",
    author: "Sarah Wellness",
    title: "Upcoming Spring Retreat Schedule Announced",
    description:
      "We are excited to announce our spring retreat schedule featuring new locations and enhanced programs. Early registration discounts are available until the end of the month.",
    image: "/images/programs/N.webp",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
  {
    id: "3",
    index: 3,
    date: "Mar 22, 2025",
    author: "BLife Editorial",
    title: "Partnership with BNesta: Co-Working Meets Wellness",
    description:
      "BLife and BNesta are partnering to offer members shared access to workspace and wellness spaces. One membership, two ecosystems.",
    image: "/images/programs/I.png",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
  {
    id: "4",
    index: 4,
    date: "Mar 15, 2025",
    author: "BFriends Team",
    title: "New Meditation Pods Opening This Month",
    description:
      "Private sound-insulated pods for meditation and breathwork are now available. Book a slot and experience deep focus in the heart of the space.",
    image: "/images/programs/N.webp",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
  {
    id: "5",
    index: 5,
    date: "Mar 1, 2025",
    author: "Community Desk",
    title: "Member Spotlight: How Yoga Changed My Routine",
    description:
      "In our latest member story, we hear how a consistent yoga practice helped one member manage stress and find more energy for family and work.",
    image: "/images/programs/I.png",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
  {
    id: "6",
    index: 6,
    date: "Feb 28, 2025",
    author: "BFriends Team",
    title: "Charm Credits Now Redeemable at BWork",
    description:
      "Charm credits can now be used across BWork locations for meeting rooms and day passes. One ecosystem, more flexibility.",
    image: "/images/programs/N.webp",
    href: "/community/blife-ecosystem-news",
    ecosystem: "BFriends",
  },
];
