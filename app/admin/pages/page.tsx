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

interface PageHeader {
  id?: number;
  page_key: string;
  title: string;
  breadcrumb: string;
  description?: string;
  image: string;
  seo_title: string;
  seo_description: string;
}

/** Keys the public site currently reads for headers / SEO */
const PAGE_KEY_HINTS: Record<string, string> = {
  home: 'Homepage SEO only (no banner header)',
  'customer-journey': 'BFriends Journey page (/journey)',
  philosophy: 'About page SEO (/about)',
  charm: 'Charm membership page',
  'bfriends-passport': 'Passport membership page',
  'event-workshop': 'Events listing page',
  'blife-ecosystem-news': 'Journal listing page',
};

export default function PagesPage() {
  const [headers, setHeaders] = useState<PageHeader[]>([]);
  const [editing, setEditing] = useState<PageHeader | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PageHeader | null>(null);
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadHeaders();
  }, [router]);

  const loadHeaders = async () => { const r = await fetch('/api/admin/page-headers'); if (r.ok) setHeaders(await r.json()); };

  const saveHeader = async () => {
    if (!editing) return;
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/page-headers/${editing.id}` : '/api/admin/page-headers';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) { setToast({ message: 'Saved!', type: 'success' }); setEditing(null); loadHeaders(); }
    else setToast({ message: 'Failed', type: 'error' });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await fetch(`/api/admin/page-headers/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Deleted!', type: 'success' });
    setDeleteTarget(null);
    loadHeaders();
  };

  return (
    <AdminLayout title="Page headers & SEO" username={username}>
      <AdminPageHint variant="live">
        Controls page banners (title, breadcrumb, image, subtitle) and search-engine title/description
        for pages that read these keys. Common keys:
        <code> customer-journey</code>, <code>charm</code>, <code>bfriends-passport</code>,
        <code> event-workshop</code>, <code>blife-ecosystem-news</code>, <code>philosophy</code>, <code>home</code>.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Page headers & SEO</h2>
          <button onClick={() => setEditing({ page_key: '', title: '', breadcrumb: '', description: '', image: '', seo_title: '', seo_description: '' })} className="admin-btn admin-btn-primary">+ Add</button>
        </div>
        <DataTable
          columns={[
            { key: 'page_key', label: 'Page', render: (v: string) => (
              <span>
                <strong>{v}</strong>
                {PAGE_KEY_HINTS[v] ? <span style={{ display: 'block', fontSize: 12, color: 'var(--admin-muted)', fontWeight: 400 }}>{PAGE_KEY_HINTS[v]}</span> : null}
              </span>
            )},
            { key: 'title', label: 'Title' },
            { key: 'breadcrumb', label: 'Breadcrumb' },
          ]}
          data={headers}
          onEdit={(row) => setEditing({ ...row })}
          onDelete={(row) => setDeleteTarget(row)}
        />
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit' : 'Add'}</h3>
            <FormField label="Page Key" name="page_key" value={editing.page_key || ''} onChange={(v: string) => setEditing({ ...editing, page_key: v })} placeholder="e.g. customer-journey, charm"
              hint={PAGE_KEY_HINTS[editing.page_key] || 'Must match the key the website page looks up.'} />
            <FormField label="Title" name="title" value={editing.title || ''} onChange={(v: string) => setEditing({ ...editing, title: v })} required
              hint="Banner title on listing / journey / membership pages." />
            <FormField label="Breadcrumb" name="breadcrumb" value={editing.breadcrumb || ''} onChange={(v: string) => setEditing({ ...editing, breadcrumb: v })} />
            <FormField label="Description" name="description" type="textarea" value={editing.description || ''} onChange={(v: string) => setEditing({ ...editing, description: v })} placeholder="Optional subtitle under the banner title"
              hint="Optional subtitle under the page banner (e.g. Events & Journal)." />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image || ''} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="SEO Title" name="seo_title" value={editing.seo_title || ''} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} placeholder="Override default page title for search engines" />
            <FormField label="SEO Description" name="seo_description" type="textarea" value={editing.seo_description || ''} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} placeholder="Override default page description for search engines" />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={saveHeader} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message="Delete this item?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
