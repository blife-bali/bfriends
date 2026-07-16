'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface EcosystemItem {
  id?: number;
  name: string;
  description: string;
  url: string;
  sort_order: number;
  is_active: number;
}

const empty: EcosystemItem = { name: '', description: '', url: '', sort_order: 0, is_active: 1 };

export default function EcosystemPage() {
  const [items, setItems] = useState<EcosystemItem[]>([]);
  const [editing, setEditing] = useState<EcosystemItem | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<EcosystemItem | null>(null);
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
    const res = await fetch('/api/admin/ecosystem');
    if (res.ok) setItems(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/ecosystem/${editing.id}` : '/api/admin/ecosystem';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Item updated!' : 'Item created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/ecosystem/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Item deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems();
  };

  return (
    <AdminLayout title="BLife ecosystem" username={username}>
      <AdminPageHint variant="unused">
        Items can be managed here and there is a public API route, but the website footer still uses
        hardcoded ecosystem links. Edits here will not change the footer yet.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>BLife ecosystem items</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add item</button>
        </div>
        <DataTable
          columns={[
            { key: 'sort_order', label: 'Order' },
            { key: 'name', label: 'Name' },
            { key: 'description', label: 'Description', render: (v: string) => v?.length > 80 ? v.slice(0, 80) + '…' : v },
            { key: 'url', label: 'URL' },
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
            <h3>{editing.id ? 'Edit Item' : 'Add Item'}</h3>
            <FormField label="Name" name="name" value={editing.name}
              onChange={(v: string) => setEditing({ ...editing, name: v })} required />
            <FormField label="Description" name="description" type="textarea" value={editing.description}
              onChange={(v: string) => setEditing({ ...editing, description: v })} required />
            <FormField label="URL" name="url" value={editing.url || ''}
              onChange={(v: string) => setEditing({ ...editing, url: v })} placeholder="https://..." />
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

      {deleteTarget && <ConfirmDialog message={`Delete item "${deleteTarget.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
