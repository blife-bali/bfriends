'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
// [ NOTES ] ImageUploader only used by hidden intro fields (body / image / CTA) that are not on the public homepage. [ END NOTES ] //
// import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface Intro {
  id?: number;
  page: string;
  headline: string;
  body: string;
  image_url: string;
  show_cta: number;
  sort_order: number;
  is_active: number;
}

const empty: Intro = { page: 'home', headline: '', body: '', image_url: '', show_cta: 1, sort_order: 0, is_active: 1 };

export default function IntroPage() {
  const [items, setItems] = useState<Intro[]>([]);
  const [editing, setEditing] = useState<Intro | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Intro | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/intro');
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadItems(); });
  }, [router]);

  

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing?.id;
    const url = isEdit ? `/api/admin/intro/${editing!.id}` : '/api/admin/intro';
    const method = isEdit ? 'PUT' : 'POST';
    const payload = { ...editing, page: 'home' };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Intro updated!' : 'Intro created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/intro/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Intro deleted!', type: 'success' });
    setDeleteTarget(null);
    void Promise.resolve().then(() => { loadItems(); });
  };

  return (
    <AdminLayout title="Intro headline" username={username}>
      <AdminPageHint variant="live">
        Shown on the <strong>homepage</strong> as the section headline below the hero.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Intro headline</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add intro</button>
        </div>
        <DataTable
          columns={[
            { key: 'headline', label: 'Headline' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => setEditing({ ...row })}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit Intro' : 'Add Intro'}</h3>
            <div className="admin-form-row">
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <FormField label="Headline" name="headline" value={editing.headline}
              onChange={(v: string) => setEditing({ ...editing, headline: v })} required
              hint="Shown on the homepage intro section." />
            {/* [ NOTES ] Body, image, and CTA are not on the public homepage yet. Existing values are still preserved on save. [ END NOTES ] */}
            {/*
            <FormField label="Body" name="body" type="textarea" value={editing.body}
              onChange={(v: string) => setEditing({ ...editing, body: v })} />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image_url} onChange={(url: string) => setEditing({ ...editing, image_url: url })} />
            </div>
            <FormField label="Show CTA" name="show_cta" type="checkbox" value={!!editing.show_cta}
              onChange={(v: boolean) => setEditing({ ...editing, show_cta: v ? 1 : 0 })} />
            */}
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Delete intro "${deleteTarget.headline}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
