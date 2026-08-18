'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface Program {
  id: number;
  name: string;
  slug: string;
  eyebrow: string;
  title: string;
  image: string;
  sort_order: number;
  is_active: number;
}

export default function ProgramsPage() {
  const [items, setItems] = useState<Program[]>([]);
  const [username, setUsername] = useState('');
  const router = useRouter();

  async function loadItems() {
    const res = await fetch('/api/admin/programs');
    if (res.ok) setItems(await res.json());
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadItems(); });
  }, [router]);

  

  return (
    <AdminLayout title="Programs" username={username}>
      <AdminPageHint variant="live">
        Powers <code>/programs</code>, each program detail page, spa session lists, navigation, and the sitemap.
        Edit a program to manage steps, pillars, and sessions (pricing / service list).
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Programs</h2>
          <Link href="/admin/programs/new" className="admin-btn admin-btn-primary">+ Add program</Link>
        </div>
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'sort_order', label: 'Order' },
            { key: 'is_active', label: 'Status', render: (v: number) => (
              <span className={`admin-badge ${v ? 'admin-badge-active' : 'admin-badge-inactive'}`}>{v ? 'Active' : 'Inactive'}</span>
            )},
          ]}
          data={items}
          onEdit={(row) => router.push(`/admin/programs/${row.id}`)}
        />
      </div>
    </AdminLayout>
  );
}
