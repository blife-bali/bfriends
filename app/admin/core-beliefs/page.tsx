'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface CoreBelief {
  id?: number;
  title: string;
  body: string;
  sort_order: number;
  is_active: number;
}

const empty: CoreBelief = { title: '', body: '', sort_order: 0, is_active: 1 };

export default function CoreBeliefsPage() {
  const [items, setItems] = useState<CoreBelief[]>([]);
  const [editing, setEditing] = useState<CoreBelief | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<CoreBelief | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/core-beliefs');
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
    const url = isEdit ? `/api/admin/core-beliefs/${editing.id}` : '/api/admin/core-beliefs';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Belief updated!' : 'Belief created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/core-beliefs/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Belief deleted!', type: 'success' });
    setDeleteTarget(null);
    void Promise.resolve().then(() => { loadItems(); });
  };

  return (
    <AdminLayout title="Core beliefs" username={username}>
      <AdminPageHint variant="unused">
        Stored in the database and editable here, but no public page currently displays core beliefs.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Core beliefs</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add belief</button>
        </div>
        <DataTable
          columns={[
            { key: 'sort_order', label: 'Order' },
            { key: 'title', label: 'Title' },
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
            <h3>{editing.id ? 'Edit Belief' : 'Add Belief'}</h3>
            <FormField label="Title" name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <FormField label="Body" name="body" type="textarea" value={editing.body}
              onChange={(v: string) => setEditing({ ...editing, body: v })} required />
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

      {deleteTarget && <ConfirmDialog message={`Delete belief "${deleteTarget.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
