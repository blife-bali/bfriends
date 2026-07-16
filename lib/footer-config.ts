import { BOOK_NOW_URL } from "@/lib/site-contact";
import { getEcosystemHref } from "@/lib/site-ecosystem-links";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const footerContactLinks: readonly FooterLink[] = [
  { label: "Booking Page", href: BOOK_NOW_URL, external: true },
];

export const footerEcosystemLinks: readonly FooterLink[] = [
  { label: "BNesta", href: getEcosystemHref("BNesta") ?? "https://bnesta.id", external: true },
  { label: "BLive", href: getEcosystemHref("BLive") ?? "https://blive.id", external: true },
  { label: "BWork", href: getEcosystemHref("BWork") ?? "https://bwork.id", external: true },
  { label: "Alam KulKul", href: getEcosystemHref("Alam KulKul") ?? "https://alamkulkul.com", external: true },
  { label: "NuLook", href: getEcosystemHref("NuLook") ?? "https://nulook.co.id", external: true },
];

export const footerAboutLinks: readonly FooterLink[] = [
  { label: "Friends Journey", href: "/journey" },
  { label: "Journal", href: "/community/journal" },
  { label: "Event & Workshop", href: "/community/event-workshop" },
  { label: "BFriends Journal", href: "/community/journal" },
];
