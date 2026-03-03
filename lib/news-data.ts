import type { EcosystemTag } from "./event-data";

export interface NewsItem {
  id: string;
  slug: string;
  index: number;
  name: string;
  ecosystem: EcosystemTag;
  timestamp: string;
  author: string;
  text: string;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    slug: "new-integrate-treatments-now-available",
    index: 1,
    name: "New Integrate Treatments Now Available",
    ecosystem: "BFriends",
    timestamp: "Mar 8, 2025",
    author: "BFriends Team",
    image: "/images/programs/I.png",
    text: `Discover our latest therapeutic offerings designed to support balance and recovery.

Our new integrated treatments combine traditional healing practices with modern therapeutic techniques. Each session is tailored to your needs, drawing from modalities that include bodywork, breathwork, and mindful movement.

Whether you're recovering from injury, managing stress, or simply seeking deeper relaxation, our team is here to guide you. Book a consultation to learn which options are right for you.`,
  },
  {
    id: "2",
    slug: "upcoming-spring-retreat-schedule-announced",
    index: 2,
    name: "Upcoming Spring Retreat Schedule Announced",
    ecosystem: "BFriends",
    timestamp: "Feb 20, 2025",
    author: "Sarah Wellness",
    image: "/images/programs/N.webp",
    text: `We are excited to announce our spring retreat schedule featuring new locations and enhanced programs.

Early registration discounts are available until the end of the month. This year we're offering weekend retreats focused on mindfulness, nature immersion, and community connection.

Spaces fill quickly—reserve your spot and give yourself something to look forward to as the season turns.`,
  },
  {
    id: "3",
    slug: "partnership-with-bnesta-coworking-meets-wellness",
    index: 3,
    name: "Partnership with BNesta: Co-Working Meets Wellness",
    ecosystem: "BFriends",
    timestamp: "Mar 22, 2025",
    author: "BLife Editorial",
    image: "/images/programs/I.png",
    text: `BLife and BNesta are partnering to offer members shared access to workspace and wellness spaces.

One membership, two ecosystems. If you're a BNesta member, you can now use BFriends facilities at a preferred rate—and BFriends members get the same at BNesta. Work in the morning, unwind with yoga or a treatment in the afternoon, all without switching networks.

Details and eligibility are available on our membership page.`,
  },
  {
    id: "4",
    slug: "new-meditation-pods-opening-this-month",
    index: 4,
    name: "New Meditation Pods Opening This Month",
    ecosystem: "BFriends",
    timestamp: "Mar 15, 2025",
    author: "BFriends Team",
    image: "/images/programs/N.webp",
    text: `Private sound-insulated pods for meditation and breathwork are now available.

Book a slot and experience deep focus in the heart of the space. Each pod is equipped with comfortable seating, optional guided audio, and climate control so you can create the conditions that work best for you.

Ideal for a midday reset or a dedicated practice session. Reserve via the app or at the front desk.`,
  },
  {
    id: "5",
    slug: "member-spotlight-how-yoga-changed-my-routine",
    index: 5,
    name: "Member Spotlight: How Yoga Changed My Routine",
    ecosystem: "BFriends",
    timestamp: "Mar 1, 2025",
    author: "Community Desk",
    image: "/images/programs/I.png",
    text: `In our latest member story, we hear how a consistent yoga practice helped one member manage stress and find more energy for family and work.

What started as a once-a-week class became a non-negotiable part of the week. The benefits extended beyond the mat: better sleep, clearer focus, and a calmer approach to daily challenges.

We're grateful to share these stories and to see our community thrive. If you have a story to share, we'd love to hear from you.`,
  },
  {
    id: "6",
    slug: "charm-credits-now-redeemable-at-bwork",
    index: 6,
    name: "Charm Credits Now Redeemable at BWork",
    ecosystem: "BFriends",
    timestamp: "Feb 28, 2025",
    author: "BFriends Team",
    image: "/images/programs/N.webp",
    text: `Charm credits can now be used across BWork locations for meeting rooms and day passes.

One ecosystem, more flexibility. Use the credits you earn through BFriends activities to book workspace when you need to focus or collaborate. It's our way of supporting the full arc of your day—wellness and work, under one roof.

Check the member portal for current rates and availability.`,
  },
];

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return newsData.find((n) => n.slug === slug);
}
