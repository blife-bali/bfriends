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
      "Discover our latest therapeutic offerings designed to support balance and recovery. Our new integrated treatments combine traditional healing practices with modern therapeutic techniques to address both physical and emotional wellness. Each session is tailored to your unique needs, ensuring personalized care that helps you achieve your health goals.",
    image: "/images/programs/I.png",
    href: "#",
    ecosystem: "BFriends",
  },
  {
    id: "2",
    index: 2,
    date: "Feb 20, 2025",
    author: "Sarah Wellness",
    title: "Upcoming Spring Retreat Schedule Announced",
    description:
      "We are excited to announce our spring retreat schedule featuring new locations and enhanced programs. Join us for transformative experiences in beautiful settings, with expert guidance on meditation, mindfulness, and personal development. Early registration discounts are available until the end of the month.",
    image: "/images/programs/N.webp",
    href: "#",
    ecosystem: "BFriends",
  },
];
