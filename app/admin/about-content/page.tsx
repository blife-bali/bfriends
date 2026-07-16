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

interface AboutIntro {
  eyebrow: string;
  title: string;
  sub: string;
}

interface Pillar {
  id: string;
  image: string;
  image_alt: string;
  title: string;
  description: string;
  button_label: string;
  href: string;
  sort_order: number;
  is_active: boolean;
}

const emptyIntro: AboutIntro = { eyebrow: '', title: '', sub: '' };
const emptyPillar: Pillar = {
  id: '',
  image: '',
  image_alt: '',
  title: '',
  description: '',
  button_label: '',
  href: '',
  sort_order: 0,
  is_active: true,
};

export default function AdminAboutContentPage() {
  const [username, setUsername] = useState('');
  const [intro, setIntro] = useState<AboutIntro>(emptyIntro);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [editing, setEditing] = useState<Pillar | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then((r) => r.json()).then((d) => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadAll();
  }, [router]);

  const loadAll = async () => {
    const res = await fetch('/api/admin/supabase/about');
    if (res.status === 503) {
      setSupabaseReady(false);
      return;
    }
    setSupabaseReady(true);
    if (res.ok) {
      const json = await res.json();
      setIntro({ ...emptyIntro, ...json.intro });
      setPillars(json.pillars ?? []);
    }
  };

  const saveAll = async (nextPillars?: Pillar[]) => {
    if (saving) return;
    setSaving(true);
    const pillarsToSave = nextPillars ?? pillars;
    try {
      const res = await fetch('/api/admin/supabase/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ intro, pillars: pillarsToSave }),
      });
      if (res.ok) {
        setToast({ message: 'About content saved!', type: 'success' });
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

  const updatePillar = async (pillar: Pillar) => {
    const next = (() => {
      const idx = pillars.findIndex((p) => p.id === pillar.id);
      if (idx === -1) return [...pillars, pillar];
      const copy = [...pillars];
      copy[idx] = pillar;
      return copy;
    })();
    setPillars(next);
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
    <AdminLayout title="About body" username={username}>
      <AdminPageHint variant="live">
        Intro and pillar cards on <strong>/about</strong>. Page SEO still comes from MySQL page headers (<code>philosophy</code> key).
      </AdminPageHint>
      {!supabaseReady && <SupabaseSetupHint onSeed={seedSupabase} />}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>About intro</h2>
          <button type="button" onClick={() => saveAll()} className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save all'}
          </button>
        </div>
        <FormField label="Eyebrow" name="eyebrow" value={intro.eyebrow} onChange={(v: string) => setIntro({ ...intro, eyebrow: v })} />
        <FormField label="Title" name="title" value={intro.title} onChange={(v: string) => setIntro({ ...intro, title: v })} />
        <FormField label="Subtext" name="sub" type="textarea" value={intro.sub} onChange={(v: string) => setIntro({ ...intro, sub: v })} />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Pillar cards</h2>
          <button onClick={() => setEditing({ ...emptyPillar })} className="admin-btn admin-btn-primary">+ Add</button>
        </div>
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: boolean) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={pillars}
          onEdit={(row) => setEditing({ ...(row as Pillar) })}
          onDelete={(row) => setPillars((prev) => prev.filter((p) => p.id !== (row as Pillar).id))}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{pillars.some((p) => p.id === editing.id) ? 'Edit pillar' : 'Add pillar'}</h3>
            <FormField label="ID" name="id" value={editing.id} onChange={(v: string) => setEditing({ ...editing, id: v })} required />
            <FormField label="Title" name="title" value={editing.title} onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Image alt" name="image_alt" value={editing.image_alt} onChange={(v: string) => setEditing({ ...editing, image_alt: v })} />
            <FormField label="Description" name="description" type="textarea" value={editing.description} onChange={(v: string) => setEditing({ ...editing, description: v })} />
            <FormField label="Button label" name="button_label" value={editing.button_label} onChange={(v: string) => setEditing({ ...editing, button_label: v })} />
            <FormField label="Link" name="href" value={editing.href} onChange={(v: string) => setEditing({ ...editing, href: v })} />
            <FormField label="Sort order" name="sort_order" type="number" value={editing.sort_order} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v })} />
            <div className="admin-modal-actions">
              <button type="button" onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button type="button" onClick={() => updatePillar(editing)} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save pillar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
