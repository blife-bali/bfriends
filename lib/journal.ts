/** Newest-first by sort_order then index (matches EventsContent / NewsContent). */
export function pickLatestJournalItem<T extends { sort_order?: number | null; index?: number | null }>(
  items: T[]
): T | null {
  if (!items.length) return null;
  return [...items].sort(
    (a, b) => (b.sort_order ?? b.index ?? 0) - (a.sort_order ?? a.index ?? 0)
  )[0];
}
