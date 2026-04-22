'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

interface Stats {
  programs: number;
  events: number;
  news: number;
  hero: number;
  whyCards: number;
  processSteps: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(data => {
      if (!data.isLoggedIn) {
        router.push('/admin/login');
      } else {
        setUsername(data.username);
      }
    });

    fetch('/api/admin/seed').then(r => r.json()).then(setStats).catch(() => {});
  }, [router]);

  return (
    <AdminLayout title="Dashboard" username={username}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--admin-dark-blue)', marginBottom: 24, letterSpacing: '-0.04em' }}>
        Welcome to BFriends CMS
      </h2>

      <div className="admin-stat-grid">
        <a href="/admin/hero" className="admin-stat-card">
          <div className="stat-number">Hero</div>
          <div className="stat-label">Sections</div>
        </a>
        <a href="/admin/programs" className="admin-stat-card">
          <div className="stat-number">Programs</div>
          <div className="stat-label">F.R.I.E.N.D</div>
        </a>
        <a href="/admin/events" className="admin-stat-card">
          <div className="stat-number">Events</div>
          <div className="stat-label">Workshop & Event</div>
        </a>
        <a href="/admin/news" className="admin-stat-card">
          <div className="stat-number">News</div>
          <div className="stat-label">BLife Ecosystem</div>
        </a>
        <a href="/admin/why-bfriends" className="admin-stat-card">
          <div className="stat-number">Why</div>
          <div className="stat-label">BFriends Cards</div>
        </a>
        <a href="/admin/process" className="admin-stat-card">
          <div className="stat-number">Process</div>
          <div className="stat-label">Customer Journey</div>
        </a>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Quick Actions</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/admin/events')} className="admin-btn admin-btn-primary">+ Add Event</button>
          <button onClick={() => router.push('/admin/news')} className="admin-btn admin-btn-secondary">+ Add News</button>
          <button onClick={async () => {
            if (confirm('Seed data from static files to the database?')) {
              await fetch('/api/admin/seed', { method: 'POST' });
              alert('Data seeded successfully!');
            }
          }} className="admin-btn admin-btn-outline">Seed Data</button>
        </div>
      </div>
    </AdminLayout>
  );
}
