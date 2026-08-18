'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface Philosophy {
  id?: number;
  section_key: string;
  headline: string;
  body: string;
  image: string;
  seo_title: string;
  seo_description: string;
  sort_order: number;
  is_active: number;
}

export default function PhilosophyPage() {
  const [items, setItems] = useState<Philosophy[]>([]);
  const [editing, setEditing] = useState<Philosophy | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Philosophy | null>(null);
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/philosophy');
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
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/philosophy/${editing.id}` : '/api/admin/philosophy';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      setToast({ message: 'Saved!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Failed', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/philosophy/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Deleted!', type: 'success' });
    setDeleteTarget(null);
    void Promise.resolve().then(() => { loadItems(); });
  };

  return (
    <AdminLayout title="Philosophy sections" username={username}>
      <AdminPageHint variant="unused">
        Content is editable here but the public <strong>About</strong> page (<code>/about</code>) still uses
        hardcoded copy. Changing these sections will not update the website until About is connected.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Philosophy sections</h2>
          <button
            onClick={() => setEditing({ section_key: '', headline: '', body: '', image: '', seo_title: '', seo_description: '', sort_order: 0, is_active: 1 })}
            className="admin-btn admin-btn-primary"
          >
            + Add
          </button>
        </div>
        <DataTable
          columns={[
            { key: 'section_key', label: 'Key' },
            { key: 'headline', label: 'Headline' },
            {
              key: 'is_active', label: 'Status', render: (v: number) => (
                <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
              ),
            },
          ]}
          data={items}
          onEdit={(row) => setEditing({ ...row })}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit' : 'Add'}</h3>
            <FormField label="Section Key" name="section_key" value={editing.section_key || ''} onChange={(v: string) => setEditing({ ...editing, section_key: v })} placeholder="e.g. manifesto, integrated_self" />
            <FormField label="Headline" name="headline" value={editing.headline || ''} onChange={(v: string) => setEditing({ ...editing, headline: v })} />
            <FormField label="Body" name="body" type="textarea" value={editing.body || ''} onChange={(v: string) => setEditing({ ...editing, body: v })} />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image || ''} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="SEO Title" name="seo_title" value={editing.seo_title || ''} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} placeholder="Override default page title for search engines" />
            <FormField label="SEO Description" name="seo_description" type="textarea" value={editing.seo_description || ''} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} placeholder="Override default page description for search engines" />
            <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order || 0} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message="Delete this section?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
