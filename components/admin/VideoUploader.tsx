'use client';

import { useId, useState } from 'react';

interface VideoUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function VideoUploader({ value, onChange }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputId = useId();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

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
        <video src={value} className="admin-image-preview" controls muted playsInline />
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
      {error ? <p style={{ color: '#b00020', marginTop: 8 }}>{error}</p> : null}
    </div>
  );
}
