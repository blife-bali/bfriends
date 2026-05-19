const ECOSYSTEM_LINK_BY_NAME: Array<{ match: RegExp; href?: string }> = [
  { match: /^bwork$/, href: "https://bwork.id" },
  { match: /^bnesta$/, href: "https://bnesta.id" },
  { match: /^blive$/, href: "https://blive.id" },
  { match: /^bfriends$/, href: "https://bfriends.id" },
  { match: /^bwellness$/, href: "https://instagram.com/bwellness" },
  { match: /^nulook$/, href: "https://nulook.co.id" },
  { match: /^alamk?ulkul$/, href: "https://alamkulkul.com" },
];

export function normalizeEcosystemName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function getEcosystemHref(name: string, url?: string | null) {
  const trimmedUrl = url?.trim();
  if (trimmedUrl) return trimmedUrl;

  const normalized = normalizeEcosystemName(name);
  const matched = ECOSYSTEM_LINK_BY_NAME.find((entry) => entry.match.test(normalized));
  return matched?.href;
}
