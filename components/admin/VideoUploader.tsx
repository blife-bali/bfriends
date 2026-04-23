'use client';

import { useEffect, useId, useState } from 'react';
import AlertDialog from './AlertDialog';

interface VideoUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

const MAX_VIDEO_UPLOAD_MB = (() => {
  const n = Number(process.env.NEXT_PUBLIC_MAX_VIDEO_UPLOAD_MB);
  return Number.isFinite(n) && n > 0 ? n : 50;
})();
const MAX_VIDEO_SIZE = MAX_VIDEO_UPLOAD_MB * 1024 * 1024;

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justUploaded, setJustUploaded] = useState(false);
  const inputId = useId();

  useEffect(() => {
    if (!justUploaded) return;
    const t = setTimeout(() => setJustUploaded(false), 2500);
    return () => clearTimeout(t);
  }, [justUploaded]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > MAX_VIDEO_SIZE) {
      setError(`File terlalu besar. Maksimal ${MAX_VIDEO_UPLOAD_MB}MB.`);
      e.target.value = '';
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Upload failed');
      }

      if (data.url) {
        onChange(data.url);
        setJustUploaded(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div>
      {value ? (
        <video
          key={value}
          src={value}
          className="admin-image-preview"
          controls
          muted
          playsInline
        />
      ) : null}
      <div className="admin-image-upload-area" style={{ marginTop: 8 }}>
        <input
          type="file"
          accept="video/mp4,video/webm,video/ogg"
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: 'none' }}
          id={inputId}
        />
        <label htmlFor={inputId} style={{ cursor: 'pointer', display: 'block', padding: '10px' }}>
          {uploading ? 'Uploading...' : value ? 'Ganti Video' : 'Upload Video'}
        </label>
      </div>
      <div className="admin-form-group" style={{ marginTop: 8 }}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Atau masukkan URL video..."
        />
      </div>
      <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
        Maks {MAX_VIDEO_UPLOAD_MB}MB. Format: mp4, webm, ogg.
      </p>
      {justUploaded && (
        <p style={{ fontSize: 13, color: '#1a7f37', marginTop: 6 }}>
          ✓ Video berhasil diupload
        </p>
      )}
      {error && (
        <AlertDialog
          title="Upload Gagal"
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
}
