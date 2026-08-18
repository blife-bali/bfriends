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

interface JourneyPage {
  seo_title: string;
  seo_description: string;
  breadcrumb: string;
  hero_title: string;
  hero_description: string;
  header_image: string;
}

interface Team {
  id: string;
  title: string;
  image: string;
  image_alt: string;
  body: string;
  sort_order: number;
  is_active: boolean;
}

const emptyPage: JourneyPage = {
  seo_title: '',
  seo_description: '',
  breadcrumb: '',
  hero_title: '',
  hero_description: '',
  header_image: '',
};

const emptyTeam: Team = {
  id: '',
  title: '',
  image: '',
  image_alt: '',
  body: '',
  sort_order: 0,
  is_active: true,
};

export default function AdminJourneyPartnersPage() {
  const [username, setUsername] = useState('');
  const [page, setPage] = useState<JourneyPage>(emptyPage);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editing, setEditing] = useState<Team | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function loadAll() {
    const res = await fetch('/api/admin/supabase/journey-partners');
    if (res.status === 503) {
      setSupabaseReady(false);
      return;
    }
    setSupabaseReady(true);
    if (res.ok) {
      const json = await res.json();
      setPage({ ...emptyPage, ...json.page });
      setTeams(json.teams ?? []);
    }
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then((r) => r.json()).then((d) => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadAll(); });
  }, [router]);

  

  const saveAll = async (nextTeams?: Team[]) => {
    if (saving) return;
    setSaving(true);
    const teamsToSave = nextTeams ?? teams;
    try {
      const res = await fetch('/api/admin/supabase/journey-partners', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page, teams: teamsToSave }),
      });
      if (res.ok) {
        setToast({ message: 'Journey partners saved!', type: 'success' });
        await loadAll();
      } else {
        const err = await res.json().catch(() => ({}));
        setToast({ message: err.error || 'Failed to save', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to save — network error', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const updateTeam = async (team: Team) => {
    const next = (() => {
      const idx = teams.findIndex((t) => t.id === team.id);
      if (idx === -1) return [...teams, team];
      const copy = [...teams];
      copy[idx] = team;
      return copy;
    })();
    setTeams(next);
    setEditing(null);
    await saveAll(next);
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

  return (
    <AdminLayout title="Journey partners" username={username}>
      <AdminPageHint variant="live">
        Shown on <strong>/journey-partners</strong>.
      </AdminPageHint>
      {!supabaseReady && <SupabaseSetupHint onSeed={seedSupabase} />}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Page header</h2>
          <button type="button" onClick={() => saveAll()} className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save all'}
          </button>
        </div>
        <FormField label="SEO title" name="seo_title" value={page.seo_title} onChange={(v: string) => setPage({ ...page, seo_title: v })} />
        <FormField label="SEO description" name="seo_description" type="textarea" value={page.seo_description} onChange={(v: string) => setPage({ ...page, seo_description: v })} />
        <FormField label="Breadcrumb" name="breadcrumb" value={page.breadcrumb} onChange={(v: string) => setPage({ ...page, breadcrumb: v })} />
        <FormField label="Hero title" name="hero_title" value={page.hero_title} onChange={(v: string) => setPage({ ...page, hero_title: v })} />
        <FormField label="Hero description" name="hero_description" type="textarea" value={page.hero_description} onChange={(v: string) => setPage({ ...page, hero_description: v })} />
        <div className="admin-form-group">
          <label>Header image</label>
          <ImageUploader value={page.header_image} onChange={(url) => setPage({ ...page, header_image: url })} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Teams</h2>
          <button onClick={() => setEditing({ ...emptyTeam })} className="admin-btn admin-btn-primary">+ Add</button>
        </div>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: boolean) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={teams}
          onEdit={(row) => setEditing({ ...(row as Team) })}
          onDelete={(row) => setTeams((prev) => prev.filter((t) => t.id !== (row as Team).id))}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{teams.some((t) => t.id === editing.id) ? 'Edit team' : 'Add team'}</h3>
            <FormField label="ID" name="id" value={editing.id} onChange={(v: string) => setEditing({ ...editing, id: v })} required />
            <FormField label="Title" name="title" value={editing.title} onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Image alt" name="image_alt" value={editing.image_alt} onChange={(v: string) => setEditing({ ...editing, image_alt: v })} />
            <FormField label="Body" name="body" type="textarea" value={editing.body} onChange={(v: string) => setEditing({ ...editing, body: v })} />
            <FormField label="Sort order" name="sort_order" type="number" value={editing.sort_order} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v })} />
            <div className="admin-modal-actions">
              <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button type="button" onClick={() => updateTeam(editing)} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save team'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
