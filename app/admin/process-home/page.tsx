'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';

interface ProcessStep {
  id?: number; number: string; title: string; description: string;
  image: string; sort_order: number; is_active: number; page_key?: string;
  conclusion_1?: string;
  conclusion_2?: string;
  conclusion_3?: string;
}

export default function ProcessHomePage() {
  const [items, setItems] = useState<ProcessStep[]>([]);
  const [editing, setEditing] = useState<ProcessStep | null>(null);
  const [username, setUsername] = useState('');
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
    const res = await fetch('/api/admin/process?page=home');
    if (res.ok) setItems(await res.json());
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

  const handleSave = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/process/${editing.id}` : '/api/admin/process';
    const method = isEdit ? 'PUT' : 'POST';
    const { conclusion_1, conclusion_2, conclusion_3, ...data } = editing;
    const mergedDescription = [conclusion_1, conclusion_2, conclusion_3]
      .map((s) => (s || '').trim())
      .filter(Boolean)
      .join('\n\n');
    const payload = {
      ...data,
      page_key: 'home',
      number: data.number || 'home',
      description: mergedDescription,
      subpoints: [],
    };
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Section updated!' : 'Section created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  return (
    <AdminLayout title="Customer Journey (Home)" username={username}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Customer Journey (Home)</h2>
        </div>
        <DataTable
          columns={[
            { key: 'title', label: 'Headline' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => setEditing({ ...row, ...parseConclusions(row.description) })}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 700, maxHeight: '85vh' }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit Section' : 'Add Section'}</h3>
            <div className="admin-form-row">
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <FormField label="Headline" name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <FormField label="Conclusion Text 1" name="conclusion_1" type="textarea" value={editing.conclusion_1 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_1: v })} />
            <FormField label="Conclusion Text 2" name="conclusion_2" type="textarea" value={editing.conclusion_2 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_2: v })} />
            <FormField label="Conclusion Text 3" name="conclusion_3" type="textarea" value={editing.conclusion_3 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_3: v })} />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
