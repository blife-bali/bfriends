'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value && <img src={value} alt="Preview" className="admin-image-preview" />}
      <div className="admin-image-upload-area" style={{ marginTop: 8 }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block', padding: '10px' }}>
          {uploading ? 'Uploading...' : value ? 'Ganti Gambar' : 'Upload Gambar'}
        </label>
      </div>
      <div className="admin-form-group" style={{ marginTop: 8 }}>
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Atau masukkan URL gambar..."
        />
      </div>
    </div>
  );
}
