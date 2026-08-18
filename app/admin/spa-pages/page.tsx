'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';
import SupabaseSetupHint from '@/components/admin/SupabaseSetupHint';
import ImageUploader from '@/components/admin/ImageUploader';

interface SpaPage {
  slug: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  breadcrumb: string;
  header_image: string;
  program_slugs: string[];
  program_name_keywords: string[] | null;
  session_group_keywords: string[] | null;
  session_group_exclude_keywords: string[] | null;
  services_heading: string;
  sessions_title: string;
  seo_title: string;
  seo_description: string;
  is_active: boolean;
}

const empty: SpaPage = {
  slug: '',
  title: '',
  subtitle: '',
  eyebrow: '',
  breadcrumb: '',
  header_image: '',
  program_slugs: [],
  program_name_keywords: null,
  session_group_keywords: null,
  session_group_exclude_keywords: null,
  services_heading: '',
  sessions_title: '',
  seo_title: '',
  seo_description: '',
  is_active: true,
};

function csvToArray(value: string): string[] {
  return value.split(',').map((s) => s.trim()).filter(Boolean);
}

function arrayToCsv(value: string[] | null | undefined): string {
  return (value ?? []).join(', ');
}

export default function AdminSpaPagesPage() {
  const [username, setUsername] = useState('');
  const [items, setItems] = useState<SpaPage[]>([]);
  const [editing, setEditing] = useState<SpaPage | null>(null);
  const [programSlugsCsv, setProgramSlugsCsv] = useState('');
  const [nameKeywordsCsv, setNameKeywordsCsv] = useState('');
  const [groupKeywordsCsv, setGroupKeywordsCsv] = useState('');
  const [excludeKeywordsCsv, setExcludeKeywordsCsv] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/supabase/spa-pages');
    if (res.status === 503) {
      setSupabaseReady(false);
      return;
    }
    setSupabaseReady(true);
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then((r) => r.json()).then((d) => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadItems(); });
  }, [router]);

  

  const openEdit = (row: SpaPage) => {
    setEditing({ ...row });
    setProgramSlugsCsv(arrayToCsv(row.program_slugs));
    setNameKeywordsCsv(arrayToCsv(row.program_name_keywords));
    setGroupKeywordsCsv(arrayToCsv(row.session_group_keywords));
    setExcludeKeywordsCsv(arrayToCsv(row.session_group_exclude_keywords));
  };

  const save = async () => {
    if (!editing) return;
    const payload = {
      ...editing,
      program_slugs: csvToArray(programSlugsCsv),
      program_name_keywords: csvToArray(nameKeywordsCsv),
      session_group_keywords: csvToArray(groupKeywordsCsv),
      session_group_exclude_keywords: csvToArray(excludeKeywordsCsv),
    };
    const res = await fetch('/api/admin/supabase/spa-pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setToast({ message: 'Spa page saved!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const seedSupabase = async () => {
    const res = await fetch('/api/admin/supabase/seed', { method: 'POST' });
    if (res.ok) {
      setToast({ message: 'Supabase content seeded!', type: 'success' });
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Seed failed', type: 'error' });
    }
  };

  return (
    <AdminLayout title="Spa pages" username={username}>
      <AdminPageHint variant="live">
        Page chrome for <strong>/spa/*</strong>. Session lists still come from MySQL programs.
      </AdminPageHint>
      {!supabaseReady && <SupabaseSetupHint onSeed={seedSupabase} />}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Spa sub-pages</h2>
        </div>
        <DataTable
          columns={[
            { key: 'slug', label: 'Slug' },
            { key: 'title', label: 'Title' },
            { key: 'is_active', label: 'Status', render: (v: boolean) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => openEdit(row as SpaPage)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 720, maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h3>Edit spa page: {editing.slug}</h3>
            <FormField label="Slug" name="slug" value={editing.slug} onChange={(v: string) => setEditing({ ...editing, slug: v })} required />
            <FormField label="Title" name="title" value={editing.title} onChange={(v: string) => setEditing({ ...editing, title: v })} />
            <FormField label="Subtitle" name="subtitle" value={editing.subtitle} onChange={(v: string) => setEditing({ ...editing, subtitle: v })} />
            <FormField label="Eyebrow" name="eyebrow" value={editing.eyebrow} onChange={(v: string) => setEditing({ ...editing, eyebrow: v })} />
            <FormField label="Breadcrumb" name="breadcrumb" value={editing.breadcrumb} onChange={(v: string) => setEditing({ ...editing, breadcrumb: v })} />
            <div className="admin-form-group">
              <label>Header image</label>
              <ImageUploader value={editing.header_image} onChange={(url) => setEditing({ ...editing, header_image: url })} />
            </div>
            <FormField label="Program slugs" name="program_slugs" value={programSlugsCsv} onChange={(v: string) => setProgramSlugsCsv(v)} hint="Comma-separated MySQL program slugs" />
            <FormField label="Program name keywords" name="program_name_keywords" value={nameKeywordsCsv} onChange={(v: string) => setNameKeywordsCsv(v)} />
            <FormField label="Session group keywords" name="session_group_keywords" value={groupKeywordsCsv} onChange={(v: string) => setGroupKeywordsCsv(v)} />
            <FormField label="Exclude keywords" name="session_group_exclude_keywords" value={excludeKeywordsCsv} onChange={(v: string) => setExcludeKeywordsCsv(v)} />
            <FormField label="Services heading" name="services_heading" value={editing.services_heading} onChange={(v: string) => setEditing({ ...editing, services_heading: v })} />
            <FormField label="Sessions title" name="sessions_title" value={editing.sessions_title} onChange={(v: string) => setEditing({ ...editing, sessions_title: v })} />
            <FormField label="SEO title" name="seo_title" value={editing.seo_title} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} />
            <FormField label="SEO description" name="seo_description" type="textarea" value={editing.seo_description} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={save} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
