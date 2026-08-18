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

interface WhyCard {
  id?: number;
  point: string;
  subpoint: string;
  image: string;
  sort_order: number;
  is_active: number;
  hidden_in_home: number;
}

const empty: WhyCard = { point: '', subpoint: '', image: '', sort_order: 0, is_active: 1, hidden_in_home: 0 };

export default function WhyBFriendsPage() {
  const [items, setItems] = useState<WhyCard[]>([]);
  const [editing, setEditing] = useState<WhyCard | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<WhyCard | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/why-bfriends');
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
    const isEdit = !!editing?.id;
    const url = isEdit ? `/api/admin/why-bfriends/${editing!.id}` : '/api/admin/why-bfriends';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Card updated!' : 'Card created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/why-bfriends/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Card deleted!', type: 'success' });
    setDeleteTarget(null);
    void Promise.resolve().then(() => { loadItems(); });
  };

  return (
    <AdminLayout title="Why BFriends" username={username}>
      <AdminPageHint variant="unused">
        These cards are saved in the database but the homepage &quot;Why BFriends&quot; section is currently
        turned off, so edits here do not appear on the website.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Why BFriends cards</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add card</button>
        </div>
        <DataTable
          columns={[
            { key: 'image', label: 'Image', render: (v: string) => v ? <img src={v} alt="" /> : '-' },
            { key: 'point', label: 'Point' },
            { key: 'sort_order', label: 'Order' },
            { key: 'hidden_in_home', label: 'Home', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-inactive' : 'admin-badge-active'}`}>{v ? 'Hidden' : 'Shown'}</span>
            )},
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
            <h3>{editing.id ? 'Edit Card' : 'Add Card'}</h3>
            <FormField label="Point" name="point" value={editing.point}
              onChange={(v: string) => setEditing({ ...editing, point: v })} required />
            <FormField label="Subpoint" name="subpoint" type="textarea" value={editing.subpoint}
              onChange={(v: string) => setEditing({ ...editing, subpoint: v })} required />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
              onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            <FormField label="Hidden in home?" name="hidden_in_home" type="checkbox" value={!!editing.hidden_in_home}
              onChange={(v: boolean) => setEditing({ ...editing, hidden_in_home: v ? 1 : 0 })} />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Delete card "${deleteTarget.point}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
