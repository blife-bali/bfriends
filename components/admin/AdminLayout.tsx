'use client';

import { useState, useSyncExternalStore } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

const SIDEBAR_COLLAPSED_KEY = 'bfriends-admin-sidebar-collapsed';
const SIDEBAR_EVENT = 'bfriends-admin-sidebar';

function subscribeCollapsed(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(SIDEBAR_EVENT, onChange);
  return () => {
    window.removeEventListener('storage', onChange);
    window.removeEventListener(SIDEBAR_EVENT, onChange);
  };
}

function getCollapsedSnapshot() {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === '1';
  } catch {
    return false;
  }
}

export default function AdminLayout({ children, title, username }: { children: React.ReactNode; title: string; username?: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarCollapsed = useSyncExternalStore(subscribeCollapsed, getCollapsedSnapshot, () => false);

  const toggleSidebarCollapsed = () => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, getCollapsedSnapshot() ? '0' : '1');
      window.dispatchEvent(new Event(SIDEBAR_EVENT));
    } catch {
      /* ignore */
    }
  };

  return (
    <div className={`admin-layout${sidebarCollapsed ? ' admin-layout--sidebar-collapsed' : ''}`}>
      {sidebarOpen && (
        <div className="admin-sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapsed}
      />
      <div className="admin-main">
        <AdminHeader title={title} username={username} onMenuToggle={() => setSidebarOpen(o => !o)} />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
}
