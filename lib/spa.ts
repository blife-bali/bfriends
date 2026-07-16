import { getPublicPrograms, type PublicProgram } from "@/lib/cms";
import { getSpaPageConfig, getSpaSlugs as getSupabaseSpaSlugs } from "@/lib/supabase-content";
import type { MockSpaPage, SpaSlug } from "@/mock/spa";

export type SpaSessionGroup = PublicProgram["sessions_group"][number];

export type SpaPageData = {
  config: MockSpaPage;
  programs: PublicProgram[];
  sessions_group: SpaSessionGroup[];
};

function matchProgramSlug(program: PublicProgram, slugs: string[]): boolean {
  const programSlug = program.general.slug.trim().toLowerCase();
  return slugs.some((s) => s.trim().toLowerCase() === programSlug);
}

function matchProgramForSpaPage(
  program: PublicProgram,
  slugs: string[],
  nameKeywords?: string[]
): boolean {
  if (matchProgramSlug(program, slugs)) return true;
  if (!nameKeywords?.length) return false;
  const name = program.general.name.trim().toLowerCase();
  return nameKeywords.some((k) => name.includes(k.trim().toLowerCase()));
}

function sessionSearchText(session: SpaSessionGroup["sessions"][number]): string {
  return `${session.name ?? ""} ${session.extra ?? ""} ${session.desc ?? ""}`.toLowerCase();
}

function groupMatchesKeywords(
  group: SpaSessionGroup,
  keywords: string[],
  checkSessions: boolean
): boolean {
  const name = (group.name ?? "").toLowerCase();
  if (keywords.some((k) => name.includes(k))) return true;
  if (!checkSessions) return false;
  return (group.sessions ?? []).some((s) =>
    keywords.some((k) => sessionSearchText(s).includes(k))
  );
}

const MARKETING_GROUP_PREFIX = /^(feel better|look better)\s*·\s*/i;

/** Strip program marketing labels from group headings shown on spa sub-pages. */
export function sanitizeSpaGroupDisplayName(name: string): string {
  const stripped = name.replace(MARKETING_GROUP_PREFIX, "").trim();
  if (/^(feel better|look better)$/i.test(stripped)) return "";
  return stripped;
}

export function mergeSpaSessionGroups(
  programs: PublicProgram[],
  options?: { prefixProgramName?: boolean }
): SpaSessionGroup[] {
  const useProgramPrefix =
    options?.prefixProgramName ?? programs.length > 1;

  return programs.flatMap((program) => {
    const groups = program.sessions_group ?? [];
    return groups.map((group) => {
      const groupName = group.name?.trim() ?? "";
      const prefixedName =
        useProgramPrefix && groupName
          ? `${program.general.name} · ${groupName}`
          : useProgramPrefix
            ? program.general.name
            : groupName;

      return {
        name: prefixedName,
        sessions: group.sessions ?? [],
      };
    });
  });
}

function sanitizeSessionGroupsForDisplay(
  groups: SpaSessionGroup[],
  slug: string
): SpaSessionGroup[] {
  if (slug === "spa") return groups;
  return groups.map((g) => ({
    ...g,
    name: sanitizeSpaGroupDisplayName(g.name ?? ""),
  }));
}

/** Include: keep groups (and sessions) that match keywords on group name or session text. */
export function filterSessionGroupsInclude(
  groups: SpaSessionGroup[],
  keywords?: string[]
): SpaSessionGroup[] {
  if (!keywords?.length) return groups;

  const normalized = keywords.map((k) => k.trim().toLowerCase()).filter(Boolean);
  if (!normalized.length) return groups;

  const result: SpaSessionGroup[] = [];

  for (const group of groups) {
    const groupNameMatches = normalized.some((k) =>
      (group.name ?? "").toLowerCase().includes(k)
    );

    const sessions = (group.sessions ?? []).filter(
      (s) =>
        groupNameMatches || normalized.some((k) => sessionSearchText(s).includes(k))
    );

    if (groupNameMatches || sessions.length > 0) {
      result.push({
        name: group.name,
        sessions: groupNameMatches ? group.sessions ?? [] : sessions,
      });
    }
  }

  return result;
}

/** Exclude: drop groups/sessions matching keywords on group name or session text. */
export function filterSessionGroupsExclude(
  groups: SpaSessionGroup[],
  keywords?: string[]
): SpaSessionGroup[] {
  if (!keywords?.length) return groups;

  const normalized = keywords.map((k) => k.trim().toLowerCase()).filter(Boolean);
  if (!normalized.length) return groups;

  const result: SpaSessionGroup[] = [];

  for (const group of groups) {
    if (groupMatchesKeywords(group, normalized, false)) continue;

    const sessions = (group.sessions ?? []).filter(
      (s) => !normalized.some((k) => sessionSearchText(s).includes(k))
    );

    if (sessions.length > 0) {
      result.push({ name: group.name, sessions });
    }
  }

  return result;
}

function applySpaSessionFilters(
  groups: SpaSessionGroup[],
  config: MockSpaPage
): SpaSessionGroup[] {
  let result = groups;

  if (config.session_group_exclude_keywords?.length) {
    result = filterSessionGroupsExclude(result, config.session_group_exclude_keywords);
  }

  if (config.session_group_keywords?.length) {
    result = filterSessionGroupsInclude(result, config.session_group_keywords);
  }

  return result;
}

export async function getSpaPageData(slug: string): Promise<SpaPageData | null> {
  const config = await getSpaPageConfig(slug);
  if (!config) return null;

  const allPrograms = await getPublicPrograms();
  const programs = allPrograms.filter((p) =>
    matchProgramForSpaPage(p, config.program_slugs, config.program_name_keywords)
  );

  const prefixProgramName = slug === "spa";

  let sessions_group = applySpaSessionFilters(
    mergeSpaSessionGroups(programs, { prefixProgramName }),
    config
  );

  // Hair/scalp (and similar) sessions may live under Spa or another program slug in CMS.
  const sessionCount = sessions_group.reduce(
    (n, g) => n + (g.sessions?.length ?? 0),
    0
  );
  if (config.session_group_keywords?.length && sessionCount === 0) {
    const fromAllPrograms = applySpaSessionFilters(
      mergeSpaSessionGroups(allPrograms, { prefixProgramName: false }),
      config
    );
    if (fromAllPrograms.some((g) => (g.sessions?.length ?? 0) > 0)) {
      sessions_group = fromAllPrograms;
    }
  }

  sessions_group = sanitizeSessionGroupsForDisplay(sessions_group, slug);

  return {
    config,
    programs: programs.length > 0 ? programs : allPrograms,
    sessions_group,
  };
}

export async function getSpaSlugs(): Promise<SpaSlug[]> {
  return getSupabaseSpaSlugs();
}
