'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

interface Hero {
  id?: number;
  page: string;
  title: string;
  subtitle: string;
  video_url: string;
  image_url: string;
  sort_order: number;
  is_active: number;
}

const empty: Hero = { page: 'home', title: '', subtitle: '', video_url: '', image_url: '', sort_order: 0, is_active: 1 };

export default function HeroPage() {
  const [items, setItems] = useState<Hero[]>([]);
  const [editing, setEditing] = useState<Hero | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Hero | null>(null);
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
    const res = await fetch('/api/admin/hero');
    if (res.ok) setItems(await res.json());
  };

  const handleSave = async () => {
    const isEdit = !!editing?.id;
    const url = isEdit ? `/api/admin/hero/${editing!.id}` : '/api/admin/hero';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Hero updated!' : 'Hero created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      setToast({ message: 'Gagal menyimpan', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/hero/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Hero deleted!', type: 'success' });
    setDeleteTarget(null);
    loadItems();
  };

  return (
    <AdminLayout title="Hero Sections" username={username}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Hero Sections</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Tambah Hero</button>
        </div>
        <DataTable
          columns={[
            { key: 'page', label: 'Page' },
            { key: 'title', label: 'Title' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>
                {v ? 'Active' : 'Inactive'}
              </span>
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
            <h3>{editing.id ? 'Edit Hero' : 'Tambah Hero'}</h3>
            <div className="admin-form-row">
              <FormField label="Page" name="page" type="select" value={editing.page}
                onChange={(v: string) => setEditing({ ...editing, page: v })}
                options={[{ value: 'home', label: 'Home' }, { value: 'about', label: 'About' }, { value: 'community', label: 'Community' }]} />
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <FormField label="Title" name="title" value={editing.title}
              onChange={(v: string) => setEditing({ ...editing, title: v })} required />
            <FormField label="Subtitle" name="subtitle" type="textarea" value={editing.subtitle}
              onChange={(v: string) => setEditing({ ...editing, subtitle: v })} />
            <FormField label="Video URL" name="video_url" value={editing.video_url}
              onChange={(v: string) => setEditing({ ...editing, video_url: v })} placeholder="URL video untuk hero background" />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image_url} onChange={(url: string) => setEditing({ ...editing, image_url: url })} />
            </div>
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Batal</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Hapus hero "${deleteTarget.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
