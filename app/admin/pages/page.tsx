'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

interface PageHeader { id?: number; page_key: string; title: string; breadcrumb: string; image: string; seo_title: string; seo_description: string; }
interface Philosophy { id?: number; section_key: string; headline: string; body: string; image: string; seo_title: string; seo_description: string; sort_order: number; is_active: number; }

export default function PagesPage() {
  const [tab, setTab] = useState<'headers' | 'philosophy'>('headers');
  const [headers, setHeaders] = useState<PageHeader[]>([]);
  const [philosophies, setPhilosophies] = useState<Philosophy[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadHeaders();
    loadPhilosophy();
  }, [router]);

  const loadHeaders = async () => { const r = await fetch('/api/admin/page-headers'); if (r.ok) setHeaders(await r.json()); };
  const loadPhilosophy = async () => { const r = await fetch('/api/admin/philosophy'); if (r.ok) setPhilosophies(await r.json()); };

  const saveHeader = async () => {
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/page-headers/${editing.id}` : '/api/admin/page-headers';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) { setToast({ message: 'Saved!', type: 'success' }); setEditing(null); loadHeaders(); }
    else setToast({ message: 'Gagal', type: 'error' });
  };

  const savePhilosophy = async () => {
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/philosophy/${editing.id}` : '/api/admin/philosophy';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) { setToast({ message: 'Saved!', type: 'success' }); setEditing(null); loadPhilosophy(); }
    else setToast({ message: 'Gagal', type: 'error' });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const apiBase = tab === 'headers' ? 'page-headers' : 'philosophy';
    await fetch(`/api/admin/${apiBase}/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Deleted!', type: 'success' });
    setDeleteTarget(null);
    tab === 'headers' ? loadHeaders() : loadPhilosophy();
  };

  return (
    <AdminLayout title="Pages" username={username}>
      <div className="admin-card">
        <div className="admin-tabs" style={{ marginBottom: 20 }}>
          <button className={`admin-tab ${tab === 'headers' ? 'active' : ''}`} onClick={() => setTab('headers')}>Page Headers</button>
          <button className={`admin-tab ${tab === 'philosophy' ? 'active' : ''}`} onClick={() => setTab('philosophy')}>Philosophy</button>
        </div>

        {tab === 'headers' && (
          <>
            <div className="admin-card-header">
              <h2>Page Headers</h2>
              <button onClick={() => setEditing({ page_key: '', title: '', breadcrumb: '', image: '', seo_title: '', seo_description: '' })} className="admin-btn admin-btn-primary">+ Tambah</button>
            </div>
            <DataTable
              columns={[
                { key: 'page_key', label: 'Key' },
                { key: 'title', label: 'Title' },
                { key: 'breadcrumb', label: 'Breadcrumb' },
              ]}
              data={headers}
              onEdit={(row) => setEditing({ ...row })}
              onDelete={(row) => setDeleteTarget(row)}
            />
          </>
        )}

        {tab === 'philosophy' && (
          <>
            <div className="admin-card-header">
              <h2>Philosophy Sections</h2>
              <button onClick={() => setEditing({ section_key: '', headline: '', body: '', image: '', seo_title: '', seo_description: '', sort_order: 0, is_active: 1 })} className="admin-btn admin-btn-primary">+ Tambah</button>
            </div>
            <DataTable
              columns={[
                { key: 'section_key', label: 'Key' },
                { key: 'headline', label: 'Headline' },
                { key: 'is_active', label: 'Status', render: (v: number) => (
                  <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
                )},
              ]}
              data={philosophies}
              onEdit={(row) => setEditing({ ...row })}
              onDelete={(row) => setDeleteTarget(row)}
            />
          </>
        )}
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit' : 'Tambah'}</h3>
            {tab === 'headers' ? (
              <>
                <FormField label="Page Key" name="page_key" value={editing.page_key || ''} onChange={(v: string) => setEditing({ ...editing, page_key: v })} placeholder="e.g. philosophy, customer-journey" />
                <FormField label="Title" name="title" value={editing.title || ''} onChange={(v: string) => setEditing({ ...editing, title: v })} required />
                <FormField label="Breadcrumb" name="breadcrumb" value={editing.breadcrumb || ''} onChange={(v: string) => setEditing({ ...editing, breadcrumb: v })} />
                <div className="admin-form-group">
                  <label>Image</label>
                  <ImageUploader value={editing.image || ''} onChange={(url: string) => setEditing({ ...editing, image: url })} />
                </div>
                <FormField label="SEO Title" name="seo_title" value={editing.seo_title || ''} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} placeholder="Override default page title for search engines" />
                <FormField label="SEO Description" name="seo_description" type="textarea" value={editing.seo_description || ''} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} placeholder="Override default page description for search engines" />
                <div className="admin-modal-actions">
                  <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Batal</button>
                  <button onClick={saveHeader} className="admin-btn admin-btn-primary">Simpan</button>
                </div>
              </>
            ) : (
              <>
                <FormField label="Section Key" name="section_key" value={editing.section_key || ''} onChange={(v: string) => setEditing({ ...editing, section_key: v })} placeholder="e.g. manifesto, core-beliefs" />
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
                  <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Batal</button>
                  <button onClick={savePhilosophy} className="admin-btn admin-btn-primary">Simpan</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message="Hapus item ini?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
