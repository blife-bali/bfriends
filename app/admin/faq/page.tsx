'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';
import { stripHtml } from '@/lib/rich-text';

interface Faq {
  id?: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: number;
}

const empty: Faq = { question: '', answer: '', sort_order: 0, is_active: 1 };

export default function FaqPage() {
  const [items, setItems] = useState<Faq[]>([]);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);
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
    const res = await fetch('/api/admin/faqs');
    if (res.ok) setItems(await res.json());
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!stripHtml(editing.answer)) {
      setToast({ message: 'Answer is required', type: 'error' });
      return;
    }
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/faqs/${editing.id}` : '/api/admin/faqs';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'FAQ updated!' : 'FAQ created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/faqs/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'FAQ deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems();
  };

  return (
    <AdminLayout title="FAQ" username={username}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>FAQ / Frequently Asked Questions</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add FAQ</button>
        </div>
        <DataTable
          columns={[
            { key: 'sort_order', label: 'Order' },
            { key: 'question', label: 'Question' },
            { key: 'answer', label: 'Answer', render: (v: string) => {
              const plain = stripHtml(v ?? '');
              return plain.length > 80 ? plain.slice(0, 80) + '…' : plain;
            }},
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
          <div className="admin-modal" style={{ width: 720 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit FAQ' : 'Add FAQ'}</h3>
            <FormField label="Question" name="question" value={editing.question}
              onChange={(v: string) => setEditing({ ...editing, question: v })} required />
            <RichTextEditor label="Answer" value={editing.answer}
              onChange={(v: string) => setEditing({ ...editing, answer: v })} />
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

      {deleteTarget && <ConfirmDialog message={`Delete FAQ "${deleteTarget.question}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
