'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { section: 'Content' },
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },
  { href: '/admin/hero', label: 'Hero', icon: 'image' },
  { href: '/admin/intro', label: 'Intro', icon: 'type' },
  { href: '/admin/why-bfriends', label: 'Why BFriends', icon: 'heart' },
  { href: '/admin/philosophy', label: 'Philosophy', icon: 'book-open', disabled: true },
  { href: '/admin/core-beliefs', label: 'Core Beliefs', icon: 'heart' },
  { href: '/admin/ecosystem', label: 'BLife Ecosystem', icon: 'layers' },
  { href: '/admin/process', label: 'Customer Journey', icon: 'layers' },
  { href: '/admin/programs', label: 'Programs', icon: 'zap' },
  { href: '/admin/events', label: 'Events', icon: 'calendar' },
  { href: '/admin/news', label: 'News', icon: 'file-text' },
  { section: 'Pages' },
  { href: '/admin/pages', label: 'Page Headers', icon: 'book-open' },
  { href: '/admin/membership', label: 'Membership', icon: 'award' },
  { section: 'System' },
  { href: '/admin/settings', label: 'Settings', icon: 'settings' },
];

const icons: Record<string, React.ReactNode> = {
  grid: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  type: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  layers: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  calendar: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  'file-text': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  'book-open': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  award: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
};

export default function AdminSidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={`admin-sidebar${isOpen ? ' admin-sidebar-open' : ''}`}>
      <div className="admin-sidebar-logo">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>BFriends</h1>
          <button className="admin-sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <span>CMS Admin</span>
      </div>
      <nav>
        {menuItems.map((item, i) => {
          if ('section' in item) {
            return <div key={i} className="admin-sidebar-section">{item.section}</div>;
          }
          if (item.disabled) {
            return (
              <span key={i} className="admin-sidebar-disabled">
                {icons[item.icon!]}
                {item.label}
              </span>
            );
          }
          const href = item.href!;
          const isActive = pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href));
          return (
            <Link key={i} href={href} className={isActive ? 'active' : ''} onClick={onClose}>
              {icons[item.icon!]}
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
