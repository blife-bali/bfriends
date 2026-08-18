'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
// [ NOTES ] ImageUploader only used by hidden home-narrative fields (title / image) that are not on the public homepage. [ END NOTES ] //
// import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

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

  async function loadItems() {
    const res = await fetch('/api/admin/process?page=home');
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadItems(); });
  }, [router]);

  

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
    <AdminLayout title="Home narrative" username={username}>
      <AdminPageHint variant="live">
        On the <strong>homepage</strong>, these paragraphs appear as the narrative text above the journey steps
        (first active entry).
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Home narrative</h2>
        </div>
        <DataTable
          columns={[
            // [ NOTES ] Title column hidden — title is not shown on the homepage; still stored in DB. [ END NOTES ] //
            // { key: 'title', label: 'Internal label' },
            {
              key: 'description',
              label: 'Narrative preview',
              render: (v: string) => {
                const first = (v || '').split('\n\n').map((s) => s.trim()).filter(Boolean)[0] || '';
                return first.length > 80 ? first.slice(0, 80) + '…' : first || '—';
              },
            },
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
            {/* [ NOTES ] Headline/title field is not on the public homepage yet. Existing title is preserved on save. [ END NOTES ] */}
            {/*
            <FormField label="Headline" name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            */}
            <FormField label="Paragraph 1" name="conclusion_1" type="textarea" value={editing.conclusion_1 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_1: v })}
              hint="Shown on the homepage as the first narrative paragraph." />
            <FormField label="Paragraph 2" name="conclusion_2" type="textarea" value={editing.conclusion_2 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_2: v })}
              hint="Shown on the homepage as the second narrative paragraph." />
            <FormField label="Paragraph 3" name="conclusion_3" type="textarea" value={editing.conclusion_3 || ''}
              onChange={(v: string) => setEditing({ ...editing, conclusion_3: v })}
              hint="Shown on the homepage as the third narrative paragraph." />
            {/* [ NOTES ] Image field is not on the public homepage yet. Existing image is preserved on save. [ END NOTES ] */}
            {/*
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
