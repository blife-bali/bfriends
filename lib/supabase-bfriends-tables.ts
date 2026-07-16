import type { SupabaseClient } from '@supabase/supabase-js';
import type { TreatmentCta, TreatmentSpecGroup } from '@/mock/treatments';
import type { MockContactHoursSection, MockContactPlatform } from '@/mock/contact';

export type TreatmentRow = {
  id: string;
  name: string;
  facility: string;
  pillar: string | null;
  pillar_label: string | null;
  floor: string | null;
  image: string | null;
  sub: string | null;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  hero_headline: string | null;
  about_body: string | null;
  spec_section_label: string | null;
  cta_headline: string | null;
  cta_description: string | null;
  cta_label: string | null;
  cta_href: string | null;
  cta_external: boolean | null;
  is_active: boolean;
};

export function ctaFromRow(row: Pick<TreatmentRow, 'cta_headline' | 'cta_description' | 'cta_label' | 'cta_href' | 'cta_external'>): TreatmentCta {
  return {
    headline: row.cta_headline ?? '',
    description: row.cta_description ?? '',
    label: row.cta_label ?? '',
    href: row.cta_href ?? '',
    external: row.cta_external ?? undefined,
  };
}

export function ctaToColumns(cta: TreatmentCta | null | undefined) {
  return {
    cta_headline: cta?.headline ?? '',
    cta_description: cta?.description ?? '',
    cta_label: cta?.label ?? '',
    cta_href: cta?.href ?? '',
    cta_external: !!cta?.external,
  };
}

export async function loadSpecGroupsByTreatment(
  supabase: SupabaseClient,
  treatmentIds: string[]
): Promise<Map<string, TreatmentSpecGroup[]>> {
  const map = new Map<string, TreatmentSpecGroup[]>();
  if (!treatmentIds.length) return map;

  const { data: groups } = await supabase
    .from('bfriends_treatment_spec_groups')
    .select('id, treatment_id, title, description, sort_order')
    .in('treatment_id', treatmentIds)
    .order('sort_order');

  if (!groups?.length) return map;

  const groupIds = groups.map((g) => g.id);
  const { data: items } = await supabase
    .from('bfriends_treatment_spec_items')
    .select('group_id, item_text, sort_order')
    .in('group_id', groupIds)
    .order('sort_order');

  const itemsByGroup = new Map<string, string[]>();
  for (const item of items ?? []) {
    const list = itemsByGroup.get(item.group_id) ?? [];
    list.push(item.item_text);
    itemsByGroup.set(item.group_id, list);
  }

  for (const group of groups) {
    const list = map.get(group.treatment_id) ?? [];
    list.push({
      title: group.title,
      description: group.description ?? undefined,
      items: itemsByGroup.get(group.id) ?? [],
    });
    map.set(group.treatment_id, list);
  }

  return map;
}

export async function replaceSpecGroups(
  supabase: SupabaseClient,
  treatmentId: string,
  specGroups: TreatmentSpecGroup[]
) {
  await supabase.from('bfriends_treatment_spec_groups').delete().eq('treatment_id', treatmentId);

  for (let gi = 0; gi < specGroups.length; gi++) {
    const group = specGroups[gi];
    const { data: inserted, error } = await supabase
      .from('bfriends_treatment_spec_groups')
      .insert({
        treatment_id: treatmentId,
        title: group.title || '',
        description: group.description || null,
        sort_order: gi,
      })
      .select('id')
      .single();
    if (error || !inserted) throw new Error(error?.message || 'Failed to save spec group');

    const rows = (group.items ?? [])
      .map((text, ii) => ({ group_id: inserted.id, item_text: text, sort_order: ii }))
      .filter((r) => r.item_text.trim());
    if (rows.length) {
      const { error: itemError } = await supabase.from('bfriends_treatment_spec_items').insert(rows);
      if (itemError) throw new Error(itemError.message);
    }
  }
}

export async function loadContactHours(supabase: SupabaseClient): Promise<MockContactHoursSection[]> {
  const { data: sections } = await supabase
    .from('bfriends_contact_hours_sections')
    .select('id, title, sort_order')
    .order('sort_order');

  if (!sections?.length) return [];

  const { data: entries } = await supabase
    .from('bfriends_contact_hours_entries')
    .select('section_id, label, entry_text, sort_order')
    .in(
      'section_id',
      sections.map((s) => s.id)
    )
    .order('sort_order');

  const bySection = new Map<string, { label?: string; text: string }[]>();
  for (const entry of entries ?? []) {
    const list = bySection.get(entry.section_id) ?? [];
    list.push({
      label: entry.label || undefined,
      text: entry.entry_text,
    });
    bySection.set(entry.section_id, list);
  }

  return sections.map((s) => ({
    title: s.title,
    entries: bySection.get(s.id) ?? [],
  }));
}

export async function loadContactPlatforms(supabase: SupabaseClient): Promise<MockContactPlatform[]> {
  const { data } = await supabase
    .from('bfriends_contact_platforms')
    .select('id, label, href, sort_order')
    .order('sort_order');

  return (data ?? []).map((p) => ({
    id: p.id as MockContactPlatform['id'],
    label: p.label,
    href: p.href,
  }));
}

export async function replaceContactHours(
  supabase: SupabaseClient,
  hoursSections: MockContactHoursSection[]
) {
  const { data: existing } = await supabase.from('bfriends_contact_hours_sections').select('id');
  if (existing?.length) {
    await supabase
      .from('bfriends_contact_hours_sections')
      .delete()
      .in(
        'id',
        existing.map((s) => s.id)
      );
  }

  for (let si = 0; si < hoursSections.length; si++) {
    const section = hoursSections[si];
    const { data: inserted, error } = await supabase
      .from('bfriends_contact_hours_sections')
      .insert({ title: section.title || '', sort_order: si })
      .select('id')
      .single();
    if (error || !inserted) throw new Error(error?.message || 'Failed to save hours section');

    const rows = (section.entries ?? [])
      .map((entry, ei) => ({
        section_id: inserted.id,
        label: entry.label || null,
        entry_text: entry.text || '',
        sort_order: ei,
      }))
      .filter((r) => r.entry_text.trim());
    if (rows.length) {
      const { error: entryError } = await supabase.from('bfriends_contact_hours_entries').insert(rows);
      if (entryError) throw new Error(entryError.message);
    }
  }
}

export async function replaceContactPlatforms(
  supabase: SupabaseClient,
  platforms: MockContactPlatform[]
) {
  const { data: existing } = await supabase.from('bfriends_contact_platforms').select('id');
  if (existing?.length) {
    await supabase
      .from('bfriends_contact_platforms')
      .delete()
      .in(
        'id',
        existing.map((p) => p.id)
      );
  }

  if (!platforms.length) return;

  const { error } = await supabase.from('bfriends_contact_platforms').insert(
    platforms.map((p, i) => ({
      id: p.id,
      label: p.label,
      href: p.href,
      sort_order: i,
    }))
  );
  if (error) throw new Error(error.message);
}

export function treatmentPayloadColumns(body: Record<string, unknown>) {
  const cta = (body.cta as TreatmentCta | undefined) ?? undefined;
  const {
    spec_groups: _spec,
    cta: _cta,
    cta_headline: _h,
    cta_description: _d,
    cta_label: _l,
    cta_href: _href,
    cta_external: _ext,
    ...rest
  } = body;

  return {
    ...rest,
    ...ctaToColumns(cta),
  };
}
