'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
// [ NOTES ] ImageUploader only used by the hidden journey-section image field that is not on /journey. [ END NOTES ] //
// import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface JourneySection {
  id?: number;
  headline: string;
  body: string;
  image: string;
  sort_order: number;
  is_active: number;
}

const empty: JourneySection = { headline: '', body: '', image: '', sort_order: 0, is_active: 1 };

export default function JourneySectionPage() {
  const [items, setItems] = useState<JourneySection[]>([]);
  const [editing, setEditing] = useState<JourneySection | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<JourneySection | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadItems();
  }, [router]);

  const loadItems = async () => {
    const res = await fetch('/api/admin/journey-section');
    if (res.ok) setItems(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/journey-section/${editing.id}` : '/api/admin/journey-section';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Journey section updated!' : 'Journey section created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/journey-section/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Journey section deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems();
  };

  return (
    <AdminLayout title="Journey page intro" username={username}>
      <AdminPageHint variant="live">
        Shown on <strong>BFriends Journey</strong> (<code>/journey</code>) as the heading and body above the steps.
        Only the first active entry is used.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Journey page intro</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add</button>
        </div>
        <DataTable
          columns={[
            { key: 'headline', label: 'Headline' },
            { key: 'body', label: 'Body', render: (v: string) => v?.length > 80 ? v.slice(0, 80) + '…' : v },
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
            <h3>{editing.id ? 'Edit Journey Section' : 'Add Journey Section'}</h3>
            <FormField label="Headline" name="headline" value={editing.headline}
              onChange={(v: string) => setEditing({ ...editing, headline: v })} required
              hint="Heading above the journey steps on /journey." />
            <FormField label="Body" name="body" type="textarea" value={editing.body}
              onChange={(v: string) => setEditing({ ...editing, body: v })} required
              hint="Supporting text under the heading on /journey." />
            {/* [ NOTES ] Image is not on /journey yet. Existing image value is preserved on save. [ END NOTES ] */}
            {/*
            <FormField label="Image URL" name="image" value={editing.image || ''}
              onChange={(v: string) => setEditing({ ...editing, image: v })} placeholder="/images/Integrate/DDK09558.jpg" />
            */}
            <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
              onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Delete journey section "${deleteTarget.headline}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
