'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormField from '@/components/admin/FormField';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

interface MembershipContent { id?: number; section_key: string; headline: string; body: string; image: string; seo_title: string; seo_description: string; is_active: number; }
interface CharmTier { id?: number; name: string; tagline: string; credits: number; bonus: string; is_popular: number; sort_order: number; is_active: number; }
interface CharmUsage { id?: number; service: string; credits: number; sort_order: number; is_active: number; }

export default function MembershipPage() {
  const [tab, setTab] = useState<'content' | 'tiers' | 'usage'>('content');
  const [content, setContent] = useState<MembershipContent[]>([]);
  const [tiers, setTiers] = useState<CharmTier[]>([]);
  const [usage, setUsage] = useState<CharmUsage[]>([]);
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
    loadData();
  }, [router]);

  const loadData = async () => {
    const [c, t, u] = await Promise.all([
      fetch('/api/admin/membership').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/charm-tiers').then(r => r.ok ? r.json() : []),
      fetch('/api/admin/charm-usage').then(r => r.ok ? r.json() : []),
    ]);
    setContent(c); setTiers(t); setUsage(u);
  };

  const handleSave = async () => {
    const apiMap: Record<string, string> = { content: 'membership', tiers: 'charm-tiers', usage: 'charm-usage' };
    const api = apiMap[tab];
    const isEdit = !!editing.id;
    const url = isEdit ? `/api/admin/${api}/${editing.id}` : `/api/admin/${api}`;
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) });
    if (res.ok) { setToast({ message: 'Saved!', type: 'success' }); setEditing(null); loadData(); }
    else setToast({ message: 'Gagal', type: 'error' });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const apiMap: Record<string, string> = { content: 'membership', tiers: 'charm-tiers', usage: 'charm-usage' };
    await fetch(`/api/admin/${apiMap[tab]}/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Deleted!', type: 'success' }); setDeleteTarget(null); loadData();
  };

  return (
    <AdminLayout title="Membership" username={username}>
      <div className="admin-card">
        <div className="admin-tabs" style={{ marginBottom: 20 }}>
          <button className={`admin-tab ${tab === 'content' ? 'active' : ''}`} onClick={() => setTab('content')}>Content</button>
          <button className={`admin-tab ${tab === 'tiers' ? 'active' : ''}`} onClick={() => setTab('tiers')}>Charm Tiers</button>
          <button className={`admin-tab ${tab === 'usage' ? 'active' : ''}`} onClick={() => setTab('usage')}>Charm Usage</button>
        </div>

        {tab === 'content' && (
          <>
            <div className="admin-card-header">
              <h2>Membership Content</h2>
              <button onClick={() => setEditing({ section_key: '', headline: '', body: '', image: '', seo_title: '', seo_description: '', is_active: 1 })} className="admin-btn admin-btn-primary">+ Tambah</button>
            </div>
            <DataTable
              columns={[
                { key: 'section_key', label: 'Key' },
                { key: 'headline', label: 'Headline' },
                { key: 'is_active', label: 'Status', render: (v: number) => (
                  <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
                )},
              ]}
              data={content}
              onEdit={(row) => setEditing({ ...row })}
              onDelete={(row) => setDeleteTarget(row)}
            />
          </>
        )}

        {tab === 'tiers' && (
          <>
            <div className="admin-card-header">
              <h2>Charm Tiers</h2>
              <button onClick={() => setEditing({ name: '', tagline: '', credits: 0, bonus: '', is_popular: 0, sort_order: 0, is_active: 1 })} className="admin-btn admin-btn-primary">+ Tambah</button>
            </div>
            <DataTable
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'credits', label: 'Credits' },
                { key: 'is_popular', label: 'Popular', render: (v: number) => v ? 'Yes' : 'No' },
                { key: 'sort_order', label: 'Order' },
              ]}
              data={tiers}
              onEdit={(row) => setEditing({ ...row })}
              onDelete={(row) => setDeleteTarget(row)}
            />
          </>
        )}

        {tab === 'usage' && (
          <>
            <div className="admin-card-header">
              <h2>Charm Usage Menu</h2>
              <button onClick={() => setEditing({ service: '', credits: 0, sort_order: 0, is_active: 1 })} className="admin-btn admin-btn-primary">+ Tambah</button>
            </div>
            <DataTable
              columns={[
                { key: 'service', label: 'Service' },
                { key: 'credits', label: 'Credits' },
                { key: 'sort_order', label: 'Order' },
              ]}
              data={usage}
              onEdit={(row) => setEditing({ ...row })}
              onDelete={(row) => setDeleteTarget(row)}
            />
          </>
        )}
      </div>

      {editing && (
        <div className="admin-modal-overlay" onClick={() => setEditing(null)}>
          <div className="admin-modal" style={{ width: 500 }} onClick={(e) => e.stopPropagation()}>
            <h3>{editing.id ? 'Edit' : 'Tambah'}</h3>
            {tab === 'content' && (
              <>
                <FormField label="Section Key" name="section_key" value={editing.section_key || ''} onChange={(v: string) => setEditing({ ...editing, section_key: v })} />
                <FormField label="Headline" name="headline" value={editing.headline || ''} onChange={(v: string) => setEditing({ ...editing, headline: v })} />
                <FormField label="Body" name="body" type="textarea" value={editing.body || ''} onChange={(v: string) => setEditing({ ...editing, body: v })} />
                <FormField label="SEO Title" name="seo_title" value={editing.seo_title || ''} onChange={(v: string) => setEditing({ ...editing, seo_title: v })} placeholder="Override default page title for search engines" />
                <FormField label="SEO Description" name="seo_description" type="textarea" value={editing.seo_description || ''} onChange={(v: string) => setEditing({ ...editing, seo_description: v })} placeholder="Override default page description for search engines" />
                <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active} onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
              </>
            )}
            {tab === 'tiers' && (
              <>
                <FormField label="Name" name="name" value={editing.name || ''} onChange={(v: string) => setEditing({ ...editing, name: v })} required />
                <FormField label="Tagline" name="tagline" value={editing.tagline || ''} onChange={(v: string) => setEditing({ ...editing, tagline: v })} />
                <FormField label="Credits" name="credits" type="number" value={editing.credits || 0} onChange={(v: number) => setEditing({ ...editing, credits: v })} />
                <FormField label="Bonus" name="bonus" value={editing.bonus || ''} onChange={(v: string) => setEditing({ ...editing, bonus: v })} />
                <FormField label="Popular" name="is_popular" type="checkbox" value={!!editing.is_popular} onChange={(v: boolean) => setEditing({ ...editing, is_popular: v ? 1 : 0 })} />
                <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order || 0} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
              </>
            )}
            {tab === 'usage' && (
              <>
                <FormField label="Service" name="service" value={editing.service || ''} onChange={(v: string) => setEditing({ ...editing, service: v })} required />
                <FormField label="Credits" name="credits" type="number" value={editing.credits || 0} onChange={(v: number) => setEditing({ ...editing, credits: v })} />
                <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order || 0} onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
              </>
            )}
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Batal</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Simpan</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message="Hapus item ini?" onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
