'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem =
  | { type: 'link'; href: string; label: string; icon: string }
  | { type: 'group'; id: string; label: string; icon: string; children: { href: string; label: string }[] }
  | { type: 'section'; label: string };

const menuItems: MenuItem[] = [
  { type: 'link', href: '/admin/dashboard', label: 'Dashboard', icon: 'grid' },

  { type: 'group', id: 'home', label: 'Home', icon: 'home', children: [
    { href: '/admin/hero', label: 'Hero' },
    { href: '/admin/intro', label: 'Intro' },
    { href: '/admin/process-home', label: 'BFriends Journey' },
    { href: '/admin/why-bfriends', label: 'Why BFriends' },
    { href: '/admin/video-block', label: 'Video Block' },
  ]},

  { type: 'group', id: 'about', label: 'About', icon: 'book-open', children: [
    { href: '/admin/journey-section', label: 'Journey Section' },
    { href: '/admin/ecosystem', label: 'BLife Ecosystem' },
  ]},

  { type: 'link', href: '/admin/process', label: 'BFriends Journey', icon: 'map' },
  { type: 'link', href: '/admin/programs', label: 'Programs', icon: 'zap' },

  { type: 'link', href: '/admin/events', label: 'Events', icon: 'calendar' },
  { type: 'link', href: '/admin/news', label: 'News', icon: 'file-text' },
  { type: 'link', href: '/admin/faq', label: 'FAQ', icon: 'help-circle' },

  { type: 'section', label: 'System' },
  { type: 'link', href: '/admin/pages', label: 'Page Headers', icon: 'book-open' },
  { type: 'link', href: '/admin/settings', label: 'Settings', icon: 'settings' },
];

const icons: Record<string, React.ReactNode> = {
  grid: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  home: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  image: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  type: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg>,
  heart: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  layers: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  zap: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  calendar: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  'file-text': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  'help-circle': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  'map': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  'book-open': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  award: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  settings: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>,
};

const iconChevronLeft = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const iconChevronRight = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const iconChevronDown = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const GROUPS_OPEN_KEY = 'bfriends-admin-sidebar-groups';

function getInitialGroupsOpen(pathname: string): Record<string, boolean> {
  let stored: Record<string, boolean> = {};
  try {
    const raw = localStorage.getItem(GROUPS_OPEN_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch { /* ignore */ }

  for (const item of menuItems) {
    if (item.type === 'group') {
      const hasActiveChild = item.children.some(
        (c) => pathname === c.href || pathname.startsWith(c.href + '/')
      );
      if (hasActiveChild) stored[item.id] = true;
      if (stored[item.id] === undefined) stored[item.id] = false;
    }
  }
  return stored;
}

export default function AdminSidebar({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const pathname = usePathname();
  const [groupsOpen, setGroupsOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setGroupsOpen(getInitialGroupsOpen(pathname));
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const toggleGroup = (id: string) => {
    setGroupsOpen((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try { localStorage.setItem(GROUPS_OPEN_KEY, JSON.stringify(next)); } catch { /* */ }
      return next;
    });
  };

  const isLinkActive = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href + '/'));

  const isGroupActive = (children: { href: string }[]) =>
    children.some((c) => isLinkActive(c.href));

  return (
    <aside className={`admin-sidebar${isOpen ? ' admin-sidebar-open' : ''}`}>
      <div className="admin-sidebar-logo">
        <div className="admin-sidebar-logo-row">
          <div className="admin-sidebar-logo-column">
            <h1 className="admin-sidebar-logo-heading">
              <Link
                href="/admin/dashboard"
                className="admin-sidebar-logo-link"
                aria-label="BFriends CMS home"
                onClick={onClose}
              >
                <span className="admin-sidebar-logo-chip">
                  <span className="admin-sidebar-logo-full">BFriends</span>
                  <span className="admin-sidebar-logo-short" aria-hidden="true">B</span>
                </span>
              </Link>
            </h1>
            <span className="admin-sidebar-logo-tagline">CMS Admin</span>
          </div>
          <button type="button" className="admin-sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <nav>
        {menuItems.map((item, i) => {
          if (item.type === 'section') {
            return <div key={i} className="admin-sidebar-section">{item.label}</div>;
          }

          if (item.type === 'group') {
            const open = !!groupsOpen[item.id];
            const active = isGroupActive(item.children);
            return (
              <div key={i} className={`admin-sidebar-group${open ? ' open' : ''}${active ? ' active' : ''}`}>
                <button
                  type="button"
                  className="admin-sidebar-group-header"
                  onClick={() => toggleGroup(item.id)}
                  title={item.label}
                  aria-expanded={open}
                >
                  {icons[item.icon]}
                  <span className="admin-sidebar-link-label">{item.label}</span>
                  <span className="admin-sidebar-group-chevron">{iconChevronDown}</span>
                </button>
                <div className="admin-sidebar-group-children">
                  {item.children.map((child, ci) => {
                    const childActive = isLinkActive(child.href);
                    return (
                      <Link
                        key={ci}
                        href={child.href}
                        className={childActive ? 'active' : ''}
                        title={child.label}
                        onClick={onClose}
                      >
                        <span className="admin-sidebar-link-label">{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          // type === 'link'
          const active = isLinkActive(item.href);
          return (
            <Link
              key={i}
              href={item.href}
              className={active ? 'active' : ''}
              title={item.label}
              onClick={onClose}
            >
              {icons[item.icon]}
              <span className="admin-sidebar-link-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar-footer">
        <button
          type="button"
          className="admin-sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? iconChevronRight : iconChevronLeft}
          <span className="admin-sidebar-collapse-label">{collapsed ? 'Expand' : 'Collapse'}</span>
        </button>
      </div>
    </aside>
  );
}
