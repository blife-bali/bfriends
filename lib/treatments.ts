import { getPublicPrograms, type PublicProgram } from "@/lib/cms";
import { getMockTreatmentPage, type MockTreatmentPage, treatmentSlugs } from "@/mock/treatments";

export type TreatmentSessionGroup = PublicProgram["sessions_group"][number];

export type TreatmentPageData = {
  config: MockTreatmentPage;
  programs: PublicProgram[];
  sessions_group: TreatmentSessionGroup[];
};

function matchProgramSlug(program: PublicProgram, slugs: string[]): boolean {
  const programSlug = program.general.slug.trim().toLowerCase();
  return slugs.some((s) => s.trim().toLowerCase() === programSlug);
}

export function mergeTreatmentSessionGroups(programs: PublicProgram[]): TreatmentSessionGroup[] {
  const useProgramPrefix = programs.length > 1;

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

export async function getTreatmentPageData(slug: string): Promise<TreatmentPageData | null> {
  const config = getMockTreatmentPage(slug);
  if (!config) return null;

  const allPrograms = await getPublicPrograms();
  const programs = allPrograms.filter((p) => matchProgramSlug(p, config.program_slugs));

  return {
    config,
    programs,
    sessions_group: mergeTreatmentSessionGroups(programs),
  };
}

export function getTreatmentSlugs(): string[] {
  return [...treatmentSlugs];
}
