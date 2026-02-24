import { programsData } from "./programs-data";

/** Slug for each program (lowercase, e.g. "flow", "restore"). */
export const programSlugs = programsData.map((p) => p.name.toLowerCase());

/** Get program slug from name. */
export function getProgramSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/** Check if a string is a valid program slug. */
export function isValidProgramSlug(slug: string): boolean {
  return programSlugs.includes(slug);
}
