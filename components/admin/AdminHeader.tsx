'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader({ title, username, onMenuToggle }: { title: string; username?: string; onMenuToggle?: () => void }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <div className="admin-header-title">{title}</div>
      </div>
      <div className="admin-header-user">
        {username && <span className="admin-header-username">{username}</span>}
        <button onClick={handleLogout} className="admin-btn admin-btn-outline admin-btn-sm">
          Logout
        </button>
      </div>
    </header>
  );
}
