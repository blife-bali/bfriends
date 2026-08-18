'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import FormField from '@/components/admin/FormField';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface Setting { id: number; setting_key: string; setting_value: string; }

export default function SettingsPage() {
  // [ NOTES ] State for the hidden "Other site settings" UI (contact_*, site_name, etc. not on the public site). [ END NOTES ] //
  // const [settings, setSettings] = useState<Setting[]>([]);
  // const [newKey, setNewKey] = useState('');
  // const [newValue, setNewValue] = useState('');
  const [gaId, setGaId] = useState('');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  async function loadGaId() {
    const res = await fetch('/api/admin/settings');
    if (res.ok) {
      const data: Setting[] = await res.json();
      const ga = data.find((s) => s.setting_key === 'google_analytics_id');
      if (ga) setGaId(ga.setting_value);
    }
  };

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    void Promise.resolve().then(() => { loadGaId(); });
  }, [router]);

  

  // [ NOTES ] Handlers for the hidden generic key/value settings editor below. [ END NOTES ] //
  // const handleAddSetting = async () => { ... };
  // const updateSetting = async (key: string, value: string) => { ... };

  return (
    <AdminLayout title="Settings" username={username}>
      <AdminPageHint variant="live">
        <strong>Google Analytics</strong> measurement ID is used on the live website.
      </AdminPageHint>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Google Analytics</h2>
        </div>
        <div style={{ maxWidth: 500 }}>
          <FormField label="Measurement ID" name="ga_id" value={gaId}
            onChange={(v: string) => setGaId(v)} placeholder="e.g. G-XXXXXXXXXX" />
          <button onClick={async () => {
            await fetch('/api/admin/settings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ setting_key: 'google_analytics_id', setting_value: gaId }),
            });
            setToast({ message: 'Google Analytics ID saved!', type: 'success' });
            loadGaId();
          }} className="admin-btn admin-btn-primary">Save GA ID</button>
        </div>
      </div>

      {/* [ NOTES ] Other site settings (contact_*, site_name, etc.) are not wired to the public website yet. [ END NOTES ] */}
      {/*
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Other site settings</h2>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div className="admin-form-row" style={{ marginBottom: 12 }}>
            <FormField label="Key" name="newKey" value={newKey} onChange={setNewKey} placeholder="e.g. site_name" />
            <FormField label="Value" name="newValue" value={newValue} onChange={setNewValue} placeholder="e.g. BFriends" />
          </div>
          <button onClick={handleAddSetting} className="admin-btn admin-btn-primary">+ Add Setting</button>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {settings.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.setting_key}</strong></td>
                  <td>
                    <input
                      style={{ width: '100%', padding: '6px 10px', border: '1px solid var(--admin-border)', borderRadius: 4, fontSize: 14 }}
                      value={s.setting_value || ''}
                      onChange={(e) => {
                        const updated = settings.map(x => x.id === s.id ? { ...x, setting_value: e.target.value } : x);
                        setSettings(updated);
                      }}
                    />
                  </td>
                  <td>
                    <button onClick={() => updateSetting(s.setting_key, s.setting_value)} className="admin-btn admin-btn-secondary admin-btn-sm">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      */}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Change Password</h2>
        </div>
        <div style={{ maxWidth: 400 }}>
          <FormField label="Current Password" name="current" value={passwords.current}
            onChange={(v: string) => setPasswords({ ...passwords, current: v })} />
          <FormField label="New Password" name="new" value={passwords.new}
            onChange={(v: string) => setPasswords({ ...passwords, new: v })} />
          <FormField label="Confirm New Password" name="confirm" value={passwords.confirm}
            onChange={(v: string) => setPasswords({ ...passwords, confirm: v })} />
          <button onClick={async () => {
            if (passwords.new !== passwords.confirm) {
              setToast({ message: 'Passwords do not match', type: 'error' });
              return;
            }
            if (passwords.new.length < 6) {
              setToast({ message: 'Password must be at least 6 characters', type: 'error' });
              return;
            }
            const res = await fetch('/api/admin/settings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ setting_key: '_change_password', setting_value: passwords.new, current_password: passwords.current }),
            });
            const data = await res.json();
            if (data.success) {
              setToast({ message: 'Password changed!', type: 'success' });
              setPasswords({ current: '', new: '', confirm: '' });
            } else {
              setToast({ message: data.error || 'Failed to change password', type: 'error' });
            }
          }} className="admin-btn admin-btn-primary">Change Password</button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
