import { mockTreatments } from "@/mock/treatments";

/** About BFriends links. */
export const aboutNavItems = [
  { label: "Friends Journey", href: "/journey" },
  { label: "Journey Partners", href: "/journey-partners" },
  { label: "Treatments", href: "/treatments" },
] as const;

/** Programmes: filled at runtime from /api/programs. */
export const programsNavItems: { label: string; href: string; image?: string }[] = [];

/** Menu utility links shown after main nav columns. */
export const utilityNavItems = [
  { label: "Contact", href: "/contact" },
] as const;

/** Help link shown in the navbar top bar beside Book Now. */
export const helpNavItem = { label: "Help", href: "/faq" } as const;

/** Treatments section pages. */
export const treatmentsNavItems = [...mockTreatments]
  .sort((a, b) => a.sort_order - b.sort_order)
  .map((treatment) => ({
    label: `${treatment.name} ${treatment.facility}`,
    labelPrimary: treatment.name,
    labelSecondary: treatment.facility,
    href: `/treatments/${treatment.id}`,
    image: treatment.image,
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

export type NavColumnId = "about" | "programs" | "treatments" | "membership" | "community";

export type NavItem = {
  label: string;
  href: string;
  image?: string;
  /** Optional two-line label used by treatments dropdown. */
  labelPrimary?: string;
  labelSecondary?: string;
};

export const navColumns: { id: NavColumnId; title: string; items: readonly NavItem[] }[] = [
  { id: "about", title: "About BFriends", items: aboutNavItems },
  { id: "programs", title: "Programmes", items: programsNavItems },
  { id: "treatments", title: "Treatments", items: treatmentsNavItems },
  { id: "membership", title: "Membership", items: membershipNavItems },
  { id: "community", title: "Journal", items: communityNavItems },
];
