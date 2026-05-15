'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import VideoUploader from '@/components/admin/VideoUploader';
import Toast from '@/components/admin/Toast';

export default function VideoBlockPage() {
  const [username, setUsername] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
  }, [router]);

  const handleSave = () => {
    setToast({ message: 'Saved locally (not yet connected to database)', type: 'success' });
  };

  return (
    <AdminLayout title="Video Block" username={username}>
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Video Block</h2>
        </div>
        <p style={{ color: 'var(--admin-muted)', fontSize: 13, marginBottom: 20 }}>
          This form is not yet connected to the database. Changes are only saved locally in this session.
        </p>

        <div className="admin-form-group">
          <label>Upload Video</label>
          <VideoUploader value={videoUrl} onChange={(url: string) => setVideoUrl(url)} />
        </div>

        {videoUrl && (
          <div style={{ marginTop: 12 }}>
            <video
              src={videoUrl}
              controls
              style={{ width: '100%', maxWidth: 480, borderRadius: 'var(--radius-md)', border: '1px solid var(--admin-border)' }}
            />
          </div>
        )}

        <div style={{ marginTop: 20 }}>
          <button onClick={handleSave} className="admin-btn admin-btn-primary">Save</button>
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
