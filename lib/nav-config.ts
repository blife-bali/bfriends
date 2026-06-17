import { mockFacilities } from "@/mock/facilities";

/** About BFriends links. */
export const aboutNavItems = [
  { label: "Friends Journey", href: "/about/journey" },
  { label: "Facilities", href: "/about/facilities" },
  { label: "Our Staff", href: "/about/staff" },
] as const;

/** Programs: filled at runtime from /api/programs. */
export const programsNavItems: { label: string; href: string; image?: string }[] = [];

/** Facilities section pages. */
export const facilitiesNavItems = [...mockFacilities]
  .sort((a, b) => a.sort_order - b.sort_order)
  .map((facility) => ({
    label: facility.name,
    href: `/about/facilities/${facility.id}`,
    image: facility.image,
  }));

/** Membership links. */
export const membershipNavItems = [
  { label: "BFriends Passport", href: "/membership/bfriends-passport" },
  { label: "Charm", href: "/membership/charm" },
] as const;

/** Community links. */
export const communityNavItems = [
  { label: "Event & Workshop", href: "/community/event-workshop" },
  { label: "BFriends Journal", href: "/community/journal" },
] as const;

export type NavColumnId = "about" | "programs" | "facilities" | "membership" | "community";

export const navColumns: { id: NavColumnId; title: string; items: readonly { label: string; href: string; image?: string }[] }[] = [
  { id: "about", title: "About BFriends", items: aboutNavItems },
  { id: "programs", title: "Programs", items: programsNavItems },
  { id: "facilities", title: "Facilities", items: facilitiesNavItems },
  { id: "membership", title: "Membership", items: membershipNavItems },
  { id: "community", title: "Journal", items: communityNavItems },
];
