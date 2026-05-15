'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

interface Subpoint { id?: number; title: string; description: string; sort_order: number; }
interface ProcessStep {
  id?: number; number: string; title: string; description: string;
  image: string; sort_order: number; is_active: number; page_key?: string;
  subpoints?: Subpoint[];
}

const empty: ProcessStep = { number: '', title: '', description: '', image: '', sort_order: 0, is_active: 1, subpoints: [] };
const emptySub: Subpoint = { title: '', description: '', sort_order: 0 };

export default function ProcessPage() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<ProcessStep | null>(null);
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
    const res = await fetch('/api/admin/process?page=customer-journey');
    if (res.ok) setItems(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/process/${editing.id}` : '/api/admin/process';
    const method = isEdit ? 'PUT' : 'POST';
    const { subpoints, ...data } = editing;
    const payload = {
      ...data,
      page_key: 'customer-journey',
      description: data.description,
      subpoints: subpoints || [],
    };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Step updated!' : 'Step created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/process/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Step deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems();
  };

  const addSubpoint = () => {
    if (!editing) return;
    setEditing({ ...editing, subpoints: [...(editing.subpoints || []), { ...emptySub }] });
  };

  const removeSubpoint = (idx: number) => {
    if (!editing) return;
    const subs = [...(editing.subpoints || [])];
    subs.splice(idx, 1);
    setEditing({ ...editing, subpoints: subs });
  };

  const updateSubpoint = (idx: number, field: string, value: string | number) => {
    if (!editing) return;
    const subs = [...(editing.subpoints || [])];
    subs[idx] = { ...subs[idx], [field]: value };
    setEditing({ ...editing, subpoints: subs });
  };

  return (
    <AdminLayout title="Customer Journey" username={username}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Customer Journey (Page)</h2>
          <button onClick={() => setEditing({ ...empty, subpoints: [] })} className="admin-btn admin-btn-primary">
            + Add Step
          </button>
        </div>
        <DataTable
          columns={[
            { key: 'number', label: '#' },
            { key: 'title', label: 'Title' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => setEditing({ ...row, subpoints: row.subpoints || [] })}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 700, maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit Step' : 'Add Step'}</h3>
            <div className="admin-form-row">
              <FormField label="Number" name="number" value={editing.number}
                onChange={(v: string) => setEditing({ ...editing, number: v })} placeholder="01, 02, etc." />
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <FormField label="Title" name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <FormField label="Description" name="description" type="textarea" value={editing.description}
              onChange={(v: string) => setEditing({ ...editing, description: v })} required />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />

            <div style={{ marginTop: 20, borderTop: '1px solid var(--admin-border)', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <strong style={{ color: 'var(--admin-dark-blue)' }}>Subpoints</strong>
                <button onClick={addSubpoint} className="admin-btn admin-btn-secondary admin-btn-sm">+ Subpoint</button>
              </div>
              {(editing.subpoints || []).map((sub, idx) => (
                <div key={idx} style={{ background: 'var(--admin-cream-2)', padding: 12, borderRadius: 6, marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input className="admin-form-group" style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                      placeholder="Title" value={sub.title} onChange={(e) => updateSubpoint(idx, 'title', e.target.value)} />
                    <button onClick={() => removeSubpoint(idx)} className="admin-btn admin-btn-danger admin-btn-sm" style={{ flexShrink: 0 }}>X</button>
                  </div>
                  <textarea style={{ width: '100%', marginTop: 6, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4, minHeight: 60, fontFamily: 'var(--font-sans)', fontSize: 14 }}
                    placeholder="Description" value={sub.description} onChange={(e) => updateSubpoint(idx, 'description', e.target.value)} />
                </div>
              ))}
            </div>

            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Delete step "${deleteTarget.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
