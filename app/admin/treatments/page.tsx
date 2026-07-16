'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';
import SupabaseSetupHint from '@/components/admin/SupabaseSetupHint';
import ImageUploader from '@/components/admin/ImageUploader';
import type { TreatmentCta, TreatmentSpecGroup } from '@/mock/treatments';

interface TreatmentsPageData {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  header_title: string;
  header_image: string;
  intro_title: string;
  intro_body: string;
}

interface Treatment {
  id: string;
  name: string;
  facility: string;
  pillar: string;
  pillar_label: string;
  floor: string;
  image: string;
  sub: string;
  sort_order: number;
  seo_title: string;
  seo_description: string;
  hero_headline: string;
  about_body: string;
  spec_section_label: string;
  spec_groups: TreatmentSpecGroup[];
  cta: TreatmentCta;
  is_active: boolean;
}

const emptyPage: TreatmentsPageData = {
  seo_title: '',
  seo_description: '',
  breadcrumb: '',
  header_title: '',
  header_image: '',
  intro_title: '',
  intro_body: '',
};

const emptyCta: TreatmentCta = { headline: '', description: '', label: '', href: '' };

const emptyTreatment: Treatment = {
  id: '',
  name: '',
  facility: '',
  pillar: '',
  pillar_label: '',
  floor: '',
  image: '',
  sub: '',
  sort_order: 0,
  seo_title: '',
  seo_description: '',
  hero_headline: '',
  about_body: '',
  spec_section_label: 'Specifications',
  spec_groups: [],
  cta: emptyCta,
  is_active: true,
};

export default function AdminTreatmentsPage() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState<TreatmentsPageData>(emptyPage);
  const [items, setItems] = useState<Treatment[]>([]);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Treatment | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then((r) => r.json()).then((d) => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadAll();
  }, [router]);

  const loadAll = async () => {
    const [pageRes, itemsRes] = await Promise.all([
      fetch('/api/admin/supabase/treatments-page'),
      fetch('/api/admin/supabase/treatments'),
    ]);
    if (pageRes.status === 503 || itemsRes.status === 503) {
      setSupabaseReady(false);
      return;
    }
    setSupabaseReady(true);
    if (pageRes.ok) setPage({ ...emptyPage, ...(await pageRes.json()) });
    if (itemsRes.ok) setItems(await itemsRes.json());
  };

  const savePage = async () => {
    const res = await fetch('/api/admin/supabase/treatments-page', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(page),
    });
    if (res.ok) setToast({ message: 'Treatments page updated!', type: 'success' });
    else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save page', type: 'error' });
    }
  };

  const openEdit = (row: Treatment) => {
    setEditing({
      ...row,
      spec_groups: row.spec_groups?.length ? row.spec_groups.map((g) => ({ ...g, items: [...(g.items ?? [])] })) : [],
      cta: { ...emptyCta, ...(row.cta ?? {}) },
    });
  };

  const handleSaveTreatment = async () => {
    if (!editing) return;
    const isEdit = items.some((t) => t.id === editing.id);
    const url = isEdit ? `/api/admin/supabase/treatments/${editing.id}` : '/api/admin/supabase/treatments';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setToast({ message: isEdit ? 'Treatment updated!' : 'Treatment created!', type: 'success' });
      setEditing(null);
      loadAll();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/supabase/treatments/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Treatment deleted!', type: 'success' });
    setDeleteTarget(null);
    loadAll();
  };

  const seedSupabase = async () => {
    const res = await fetch('/api/admin/supabase/seed', { method: 'POST' });
    if (res.ok) {
      setToast({ message: 'Supabase content seeded!', type: 'success' });
      loadAll();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Seed failed', type: 'error' });
    }
  };

  const updateSpecGroup = (index: number, patch: Partial<TreatmentSpecGroup>) => {
    if (!editing) return;
    const next = [...editing.spec_groups];
    next[index] = { ...next[index], ...patch };
    setEditing({ ...editing, spec_groups: next });
  };

  const updateSpecItemsText = (index: number, text: string) => {
    updateSpecGroup(index, {
      items: text.split('\n').map((s) => s.trim()).filter(Boolean),
    });
  };

  return (
    <AdminLayout title="Treatments" username={username}>
      <AdminPageHint variant="live">
        Shown on <strong>/treatments</strong>, treatment detail pages, navbar, and footer.
      </AdminPageHint>
      {!supabaseReady && <SupabaseSetupHint onSeed={seedSupabase} />}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Treatments index page</h2>
          <button onClick={savePage} className="admin-btn admin-btn-primary">Save page</button>
        </div>
        <FormField label="SEO title" name="seo_title" value={page.seo_title} onChange={(v: string) => setPage({ ...page, seo_title: v })} />
        <FormField label="SEO description" name="seo_description" type="textarea" value={page.seo_description} onChange={(v: string) => setPage({ ...page, seo_description: v })} />
        <FormField label="Breadcrumb" name="breadcrumb" value={page.breadcrumb} onChange={(v: string) => setPage({ ...page, breadcrumb: v })} />
        <FormField label="Header title" name="header_title" value={page.header_title} onChange={(v: string) => setPage({ ...page, header_title: v })} />
        <div className="admin-form-group">
          <label>Header image</label>
          <ImageUploader value={page.header_image} onChange={(url) => setPage({ ...page, header_image: url })} />
        </div>
        <FormField label="Intro title" name="intro_title" value={page.intro_title} onChange={(v: string) => setPage({ ...page, intro_title: v })} />
        <FormField label="Intro body" name="intro_body" type="textarea" value={page.intro_body} onChange={(v: string) => setPage({ ...page, intro_body: v })} />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Treatment facilities</h2>
          <button onClick={() => openEdit({ ...emptyTreatment })} className="admin-btn admin-btn-primary">+ Add</button>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'name', label: 'Name' },
            { key: 'facility', label: 'Facility' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: boolean) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => openEdit(row as Treatment)}
          onDelete={(row) => setDeleteTarget(row as Treatment)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 720, maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h3>{items.some((t) => t.id === editing.id) ? 'Edit treatment' : 'Add treatment'}</h3>
            <FormField label="ID (slug)" name="id" value={editing.id} onChange={(v: string) => setEditing({ ...editing, id: v })} required hint="URL: /treatments/[id]" />
            <FormField label="Pillar name" name="name" value={editing.name} onChange={(v: string) => setEditing({ ...editing, name: v })} required />
            <FormField label="Facility" name="facility" value={editing.facility} onChange={(v: string) => setEditing({ ...editing, facility: v })} required />
            <FormField label="Pillar key" name="pillar" value={editing.pillar} onChange={(v: string) => setEditing({ ...editing, pillar: v })} />
            <FormField label="Pillar label" name="pillar_label" value={editing.pillar_label} onChange={(v: string) => setEditing({ ...editing, pillar_label: v })} />
            <FormField label="Floor" name="floor" value={editing.floor} onChange={(v: string) => setEditing({ ...editing, floor: v })} />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Card subtitle" name="sub" type="textarea" value={editing.sub} onChange={(v: string) => setEditing({ ...editing, sub: v })} />
            <FormField label="Hero headline" name="hero_headline" value={editing.hero_headline} onChange={(v: string) => setEditing({ ...editing, hero_headline: v })} />
            <FormField label="About body" name="about_body" type="textarea" value={editing.about_body} onChange={(v: string) => setEditing({ ...editing, about_body: v })} />
            <FormField label="SEO title" name="seo_title" value={editing.seo_title} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} />
            <FormField label="SEO description" name="seo_description" type="textarea" value={editing.seo_description} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} />
            <FormField label="Spec section label" name="spec_section_label" value={editing.spec_section_label} onChange={(v: string) => setEditing({ ...editing, spec_section_label: v })} />

            <div className="admin-form-group" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ margin: 0 }}>Spec groups</label>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setEditing({ ...editing, spec_groups: [...editing.spec_groups, { title: '', items: [] }] })}
                >
                  + Add group
                </button>
              </div>
              {editing.spec_groups.map((group, gi) => (
                <div key={gi} style={{ border: '1px solid var(--admin-border, #ddd)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                  <FormField label="Group title" name={`spec_title_${gi}`} value={group.title} onChange={(v: string) => updateSpecGroup(gi, { title: v })} />
                  <FormField label="Group description (optional)" name={`spec_desc_${gi}`} value={group.description ?? ''} onChange={(v: string) => updateSpecGroup(gi, { description: v })} />
                  <FormField
                    label="Items (one per line)"
                    name={`spec_items_${gi}`}
                    type="textarea"
                    value={(group.items ?? []).join('\n')}
                    onChange={(v: string) => updateSpecItemsText(gi, v)}
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => setEditing({ ...editing, spec_groups: editing.spec_groups.filter((_, i) => i !== gi) })}
                  >
                    Remove group
                  </button>
                </div>
              ))}
            </div>

            <div className="admin-form-group" style={{ marginTop: 8 }}>
              <label>Call to action</label>
              <FormField label="CTA headline" name="cta_headline" value={editing.cta.headline} onChange={(v: string) => setEditing({ ...editing, cta: { ...editing.cta, headline: v } })} />
              <FormField label="CTA description" name="cta_description" type="textarea" value={editing.cta.description} onChange={(v: string) => setEditing({ ...editing, cta: { ...editing.cta, description: v } })} />
              <FormField label="CTA button label" name="cta_label" value={editing.cta.label} onChange={(v: string) => setEditing({ ...editing, cta: { ...editing.cta, label: v } })} />
              <FormField label="CTA link" name="cta_href" value={editing.cta.href} onChange={(v: string) => setEditing({ ...editing, cta: { ...editing.cta, href: v } })} />
              <FormField label="Open in new tab" name="cta_external" type="checkbox" value={!!editing.cta.external} onChange={(v: boolean) => setEditing({ ...editing, cta: { ...editing.cta, external: v } })} />
            </div>

            <FormField label="Sort order" name="sort_order" type="number" value={editing.sort_order} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSaveTreatment} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          message={`Delete treatment "${deleteTarget.name} | ${deleteTarget.facility}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
