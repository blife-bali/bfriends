import type { EcosystemTag } from "./event-data";

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  href?: string;
  ecosystem: EcosystemTag;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    date: "Mar 8, 2025",
    title: "New Integrate Treatments Now Available",
    description:
      "Discover our latest therapeutic offerings designed to support balance and recovery.",
    image: "/images/programs/I.png",
    href: "#",
    ecosystem: "BFriends",
  },
];
