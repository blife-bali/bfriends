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
  conclusion_1?: string;
  conclusion_2?: string;
  conclusion_3?: string;
  subpoints?: Subpoint[];
}

const empty: ProcessStep = { number: '', title: '', description: '', image: '', sort_order: 0, is_active: 1, subpoints: [] };
const emptySub: Subpoint = { title: '', description: '', sort_order: 0 };

export default function ProcessPage() {
  const [tab, setTab] = useState<'home' | 'customer-journey'>('home');
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
    loadItems('home');
  }, [router]);

  const loadItems = async (pageKey: 'home' | 'customer-journey' = tab) => {
    const res = await fetch(`/api/admin/process?page=${pageKey}`);
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    loadItems(tab);
  }, [tab]);

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/process/${editing.id}` : '/api/admin/process';
    const method = isEdit ? 'PUT' : 'POST';
    const { subpoints, conclusion_1, conclusion_2, conclusion_3, ...data } = editing;
    const mergedDescription = tab === 'home'
      ? [conclusion_1, conclusion_2, conclusion_3].map((s) => (s || '').trim()).filter(Boolean).join('\n\n')
      : data.description;
    const payload = {
      ...data,
      page_key: tab,
      number: tab === 'home' ? (data.number || 'home') : data.number,
      description: mergedDescription,
      subpoints: tab === 'customer-journey' ? subpoints : [],
    };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Step updated!' : 'Step created!', type: 'success' });
      setEditing(null);
      loadItems(tab);
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/process/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Step deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems(tab);
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

  const updateSubpoint = (idx: number, field: string, value: any) => {
    if (!editing) return;
    const subs = [...(editing.subpoints || [])];
    subs[idx] = { ...subs[idx], [field]: value };
    setEditing({ ...editing, subpoints: subs });
  };

  const parseConclusions = (description?: string) => {
    const parts = (description || '')
      .split('\n\n')
      .map((s) => s.trim())
      .filter(Boolean);
    return {
      conclusion_1: parts[0] || '',
      conclusion_2: parts[1] || '',
      conclusion_3: parts[2] || '',
    };
  };

  return (
    <AdminLayout title="Customer Journey" username={username}>
      <div className="admin-card">
        <div className="admin-tabs" style={{ marginBottom: 20 }}>
          <button className={`admin-tab ${tab === 'home' ? 'active' : ''}`} onClick={() => setTab('home')}>Home</button>
          <button className={`admin-tab ${tab === 'customer-journey' ? 'active' : ''}`} onClick={() => setTab('customer-journey')}>Customer Journey Page</button>
        </div>
        <div className="admin-card-header">
          <h2>{tab === 'home' ? 'Customer Journey (Home)' : 'Customer Journey (Page)'}</h2>
          {tab === 'customer-journey' && (
            <button onClick={() => setEditing({ ...empty, subpoints: [] })} className="admin-btn admin-btn-primary">
              + Add Step
            </button>
          )}
        </div>
        <DataTable
          columns={[
            ...(tab === 'customer-journey' ? [{ key: 'number', label: '#' }] : []),
            { key: 'title', label: tab === 'home' ? 'Headline' : 'Title' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => setEditing({ ...row, ...parseConclusions(row.description), subpoints: row.subpoints || [] })}
          onDelete={tab === 'customer-journey' ? (row) => setDeleteTarget(row) : undefined}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 700, maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? (tab === 'home' ? 'Edit Section' : 'Edit Step') : (tab === 'home' ? 'Add Section' : 'Add Step')}</h3>
            <div className="admin-form-row">
              {tab === 'customer-journey' && (
                <FormField label="Number" name="number" value={editing.number}
                  onChange={(v: string) => setEditing({ ...editing, number: v })} placeholder="01, 02, etc." />
              )}
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <FormField label={tab === 'home' ? 'Headline' : 'Title'} name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            {tab === 'customer-journey' && (
              <FormField label="Description" name="description" type="textarea" value={editing.description}
                onChange={(v: string) => setEditing({ ...editing, description: v })} required />
            )}
            {tab === 'home' && (
              <>
                <FormField label="Conclusion Text 1" name="conclusion_1" type="textarea" value={editing.conclusion_1 || ''}
                  onChange={(v: string) => setEditing({ ...editing, conclusion_1: v })} />
                <FormField label="Conclusion Text 2" name="conclusion_2" type="textarea" value={editing.conclusion_2 || ''}
                  onChange={(v: string) => setEditing({ ...editing, conclusion_2: v })} />
                <FormField label="Conclusion Text 3" name="conclusion_3" type="textarea" value={editing.conclusion_3 || ''}
                  onChange={(v: string) => setEditing({ ...editing, conclusion_3: v })} />
              </>
            )}
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />

            {tab === 'customer-journey' && (
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
            )}

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
