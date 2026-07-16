'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPageHint from '@/components/admin/AdminPageHint';

const LIVE_LINKS = [
  { href: '/admin/hero', title: 'Home hero', desc: 'Homepage video & titles' },
  { href: '/admin/intro', title: 'Intro headline', desc: 'Homepage section headline' },
  { href: '/admin/process-home', title: 'Home narrative', desc: 'Homepage body paragraphs' },
  { href: '/admin/process', title: 'Journey steps', desc: 'Home + /journey steps' },
  { href: '/admin/programs', title: 'Programs', desc: '/programs & spa sessions' },
  { href: '/admin/events', title: 'Events', desc: 'Community events' },
  { href: '/admin/news', title: 'Journal', desc: 'News articles' },
  { href: '/admin/membership', title: 'Membership', desc: 'Charm & Passport' },
  { href: '/admin/faq', title: 'FAQ', desc: '/faq page' },
  { href: '/admin/treatments', title: 'Treatments', desc: '/treatments (Supabase)' },
  { href: '/admin/contact', title: 'Contact', desc: '/contact (Supabase)' },
  { href: '/admin/journey-partners', title: 'Journey partners', desc: '/journey-partners (Supabase)' },
  { href: '/admin/spa-pages', title: 'Spa pages', desc: '/spa/* chrome (Supabase)' },
  { href: '/admin/about-content', title: 'About body', desc: '/about intro & pillars (Supabase)' },
  { href: '/admin/pages', title: 'Headers & SEO', desc: 'Page banners & search titles' },
];

export default function DashboardPage() {
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
  }, [router]);

  return (
    <AdminLayout title="Dashboard" username={username}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'var(--admin-dark-blue)', marginBottom: 8, letterSpacing: '-0.04em' }}>
        Welcome to BFriends CMS
      </h2>
      <p style={{ color: 'var(--admin-muted)', fontSize: 14, marginBottom: 24, maxWidth: 560 }}>
        Edit content that appears on the public website. Menu groups follow the live site structure.
      </p>

      <AdminPageHint variant="live">
        These shortcuts open content that is currently rendered on the website.
      </AdminPageHint>

      <div className="admin-stat-grid">
        {LIVE_LINKS.map((item) => (
          <Link key={item.href} href={item.href} className="admin-stat-card">
            <div className="stat-number" style={{ fontSize: 18 }}>{item.title}</div>
            <div className="stat-label">{item.desc}</div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Quick actions</h2>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => router.push('/admin/events')} className="admin-btn admin-btn-primary">+ Add event</button>
          <button onClick={() => router.push('/admin/news')} className="admin-btn admin-btn-secondary">+ Add journal article</button>
          <button onClick={async () => {
            if (confirm('Seed MySQL CMS data from static files?')) {
              await fetch('/api/admin/seed', { method: 'POST' });
              alert('MySQL data seeded successfully!');
            }
          }} className="admin-btn admin-btn-outline">Seed MySQL</button>
          <button onClick={async () => {
            if (confirm('Seed Supabase marketing content from static mock files?')) {
              const res = await fetch('/api/admin/supabase/seed', { method: 'POST' });
              if (res.ok) alert('Supabase content seeded successfully!');
              else {
                const err = await res.json().catch(() => ({}));
                alert(err.error || 'Supabase seed failed — check .env and run the SQL migration first.');
              }
            }
          }} className="admin-btn admin-btn-outline">Seed Supabase</button>
        </div>
      </div>

      {/* [ NOTES ] Reminder: treatments, contact, journey partners, location, and most about copy are still hardcoded outside the CMS. [ END NOTES ] */}
      {/*
      <AdminPageHint variant="unused">
        Treatments, contact page, journey partners, location, and most about-page copy are still
        hardcoded in the website code — they are not editable here yet.
      </AdminPageHint>
      */}
    </AdminLayout>
  );
}
