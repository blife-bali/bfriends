import { programsData } from "./programs-data";

/** About BFriends links. */
export const aboutNavItems = [
  { label: "Our Philosophy", href: "/about/philosophy" },
  { label: "Customer Journey", href: "/about/customer-journey" },
] as const;

/** Programs: dynamic route /programs/[slug]. */
export const programsNavItems = programsData.map((p) => ({
  label: p.name,
  href: `/programs/${p.name.toLowerCase()}`,
}));

/** Membership links. */
export const membershipNavItems = [
  { label: "BFriends Passport", href: "/membership/bfriends-passport" },
  { label: "Charm", href: "/membership/charm" },
] as const;

/** Community links. */
export const communityNavItems = [
  { label: "Event & Workshop", href: "/community/event-workshop" },
  { label: "BLife Ecosystem News", href: "/community/blife-ecosystem-news" },
] as const;

export type NavColumnId = "about" | "programs" | "membership" | "community";

export const navColumns: { id: NavColumnId; title: string; items: readonly { label: string; href: string }[] }[] = [
  { id: "about", title: "About BFriends", items: aboutNavItems },
  { id: "programs", title: "Programs", items: programsNavItems },
  { id: "membership", title: "Membership", items: membershipNavItems },
  { id: "community", title: "Community", items: communityNavItems },
];
