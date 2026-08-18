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

interface Event {
  id?: number;
  slug: string;
  name: string;
  ecosystem: string;
  event_date: string;
  event_time: string;
  text: string;
  image: string;
  seo_title: string;
  seo_description: string;
  sort_order: number;
  is_active: number;
}

const ecosystems = ['BFriends', 'BLive', 'BWork', 'BNesta', 'Alam Kulkul', 'Nulook'];
const empty: Event = { slug: '', name: '', ecosystem: 'BFriends', event_date: '', event_time: '', text: '', image: '', seo_title: '', seo_description: '', sort_order: 0, is_active: 1 };

export default function EventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [editing, setEditing] = useState<Event | null>(null);
  const [username, setUsername] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/events');
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadItems(); });
  }, [router]);

  

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleSave = async () => {
    if (!editing) return;
    const data = { ...editing, slug: editing.slug || generateSlug(editing.name) };
    const isEdit = !!data.id;
    const url = isEdit ? `/api/admin/events/${data.id}` : '/api/admin/events';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (res.ok) {
      setToast({ message: isEdit ? 'Event updated!' : 'Event created!', type: 'success' });
      setEditing(null);
      loadItems();
    } else {
      const err = await res.json();
      setToast({ message: err.error || 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget?.id) return;
    await fetch(`/api/admin/events/${deleteTarget.id}`, { method: 'DELETE' });
    setToast({ message: 'Event deleted!', type: 'success' });
    setDeleteTarget(null);
    void Promise.resolve().then(() => { loadItems(); });
  };

  return (
    <AdminLayout title="Events & workshops" username={username}>
      <AdminPageHint variant="live">
        Shown on <strong>Event & Workshop</strong> (<code>/community/event-workshop</code>) and each event detail page
        (<code> /community/event/[slug]</code>.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Events & workshops</h2>
          <button onClick={() => setEditing({ ...empty })} className="admin-btn admin-btn-primary">+ Add event</button>
        </div>
        <DataTable
          columns={[
            { key: 'image', label: 'Image', render: (v: string) => v ? <img src={v} alt="" /> : '-' },
            { key: 'name', label: 'Name' },
            { key: 'ecosystem', label: 'Ecosystem' },
            { key: 'event_date', label: 'Date' },
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
            <h3>{editing.id ? 'Edit Event' : 'Add Event'}</h3>
            <FormField label="Name" name="name" value={editing.name}
              onChange={(v: string) => setEditing({ ...editing, name: v, slug: generateSlug(v) })} required />
            <FormField label="Slug" name="slug" value={editing.slug}
              onChange={(v: string) => setEditing({ ...editing, slug: v })} placeholder="Auto-generated from name" />
            <div className="admin-form-row">
              <FormField label="Ecosystem" name="ecosystem" type="select" value={editing.ecosystem}
                onChange={(v: string) => setEditing({ ...editing, ecosystem: v })}
                options={ecosystems.map(e => ({ value: e, label: e }))} />
              <FormField label="Sort Order" name="sort_order" type="number" value={editing.sort_order}
                onChange={(v: number) => setEditing({ ...editing, sort_order: v })} />
            </div>
            <div className="admin-form-row">
              <FormField label="Date" name="event_date" value={editing.event_date}
                onChange={(v: string) => setEditing({ ...editing, event_date: v })} placeholder="Mar 15, 2025" />
              <FormField label="Time" name="event_time" value={editing.event_time}
                onChange={(v: string) => setEditing({ ...editing, event_time: v })} placeholder="10:00 AM - 12:00 PM" />
            </div>
            <FormField label="Description" name="text" type="textarea" value={editing.text}
              onChange={(v: string) => setEditing({ ...editing, text: v })} required />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={editing.image} onChange={(url: string) => setEditing({ ...editing, image: url })} />
            </div>
            <FormField label="SEO Title" name="seo_title" value={editing.seo_title || ''}
              onChange={(v: string) => setEditing({ ...editing, seo_title: v })} placeholder="Override default page title for search engines" />
            <FormField label="SEO Description" name="seo_description" type="textarea" value={editing.seo_description || ''}
              onChange={(v: string) => setEditing({ ...editing, seo_description: v })} placeholder="Override default page description for search engines" />
            <FormField label="Active" name="is_active" type="checkbox" value={!!editing.is_active}
              onChange={(v: boolean) => setEditing({ ...editing, is_active: v ? 1 : 0 })} />
            <div className="admin-modal-actions">
              <button onClick={() => setEditing(null)} className="admin-btn admin-btn-outline">Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && <ConfirmDialog message={`Delete event "${deleteTarget.name}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
