'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import FormField from '@/components/admin/FormField';
import Toast from '@/components/admin/Toast';
import AdminPageHint from '@/components/admin/AdminPageHint';
import SupabaseSetupHint from '@/components/admin/SupabaseSetupHint';
import ImageUploader from '@/components/admin/ImageUploader';
import type { MockContactHoursSection, MockContactPlatform } from '@/mock/contact';

interface ContactPageData {
  seo_title: string;
  seo_description: string;
  title: string;
  description: string;
  image: string;
  image_alt: string;
  location_name: string;
  address: string;
  map_href: string;
  hours_sections: MockContactHoursSection[];
  platforms: MockContactPlatform[];
}

const empty: ContactPageData = {
  seo_title: '',
  seo_description: '',
  title: '',
  description: '',
  image: '',
  image_alt: '',
  location_name: '',
  address: '',
  map_href: '',
  hours_sections: [],
  platforms: [],
};

export default function AdminContactPage() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState<ContactPageData>(empty);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [supabaseReady, setSupabaseReady] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/auth/session').then((r) => r.json()).then((d) => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    loadData();
  }, [router]);

  const loadData = async () => {
    const res = await fetch('/api/admin/supabase/contact-page');
    if (res.status === 503) {
      setSupabaseReady(false);
      return;
    }
    setSupabaseReady(true);
    if (res.ok) {
      const json = await res.json();
      setData({
        ...empty,
        ...json,
        hours_sections: json.hours_sections ?? [],
        platforms: json.platforms ?? [],
      });
    }
  };

  const save = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/supabase/contact-page', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setToast({ message: 'Contact page saved!', type: 'success' });
      else {
        const err = await res.json().catch(() => ({}));
        setToast({ message: err.error || 'Failed to save', type: 'error' });
      }
    } catch {
      setToast({ message: 'Failed to save — network error', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const seedSupabase = async () => {
    const res = await fetch('/api/admin/supabase/seed', { method: 'POST' });
    if (res.ok) {
      setToast({ message: 'Supabase content seeded!', type: 'success' });
      loadData();
    } else {
      const err = await res.json().catch(() => ({}));
      setToast({ message: err.error || 'Seed failed', type: 'error' });
    }
  };

  const updateHoursSection = (index: number, patch: Partial<MockContactHoursSection>) => {
    const next = [...data.hours_sections];
    next[index] = { ...next[index], ...patch };
    setData({ ...data, hours_sections: next });
  };

  const updatePlatform = (index: number, patch: Partial<MockContactPlatform>) => {
    const next = [...data.platforms];
    next[index] = { ...next[index], ...patch };
    setData({ ...data, platforms: next });
  };

  return (
    <AdminLayout title="Contact" username={username}>
      <AdminPageHint variant="live">
        Shown on <strong>/contact</strong> — hero, location, hours, and platform links.
      </AdminPageHint>
      {!supabaseReady && <SupabaseSetupHint onSeed={seedSupabase} />}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Contact page</h2>
          <button type="button" onClick={save} className="admin-btn admin-btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
        <FormField label="SEO title" name="seo_title" value={data.seo_title} onChange={(v: string) => setData({ ...data, seo_title: v })} />
        <FormField label="SEO description" name="seo_description" type="textarea" value={data.seo_description} onChange={(v: string) => setData({ ...data, seo_description: v })} />
        <FormField label="Title" name="title" value={data.title} onChange={(v: string) => setData({ ...data, title: v })} />
        <FormField label="Description" name="description" type="textarea" value={data.description} onChange={(v: string) => setData({ ...data, description: v })} />
        <div className="admin-form-group">
          <label>Image</label>
          <ImageUploader value={data.image} onChange={(url) => setData({ ...data, image: url })} />
        </div>
        <FormField label="Image alt" name="image_alt" value={data.image_alt} onChange={(v: string) => setData({ ...data, image_alt: v })} />
        <FormField label="Location name" name="location_name" value={data.location_name} onChange={(v: string) => setData({ ...data, location_name: v })} />
        <FormField label="Address" name="address" type="textarea" value={data.address} onChange={(v: string) => setData({ ...data, address: v })} />
        <FormField label="Map link" name="map_href" value={data.map_href} onChange={(v: string) => setData({ ...data, map_href: v })} />
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Opening hours</h2>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => setData({ ...data, hours_sections: [...data.hours_sections, { title: '', entries: [{ text: '' }] }] })}
          >
            + Add section
          </button>
        </div>
        {data.hours_sections.map((section, si) => (
          <div key={si} style={{ border: '1px solid var(--admin-border, #ddd)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <FormField label="Section title" name={`hours_title_${si}`} value={section.title} onChange={(v: string) => updateHoursSection(si, { title: v })} />
            {(section.entries ?? []).map((entry, ei) => (
              <div key={ei} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 8, marginBottom: 8 }}>
                <FormField
                  label={ei === 0 ? 'Label (optional)' : ''}
                  name={`hours_label_${si}_${ei}`}
                  value={entry.label ?? ''}
                  onChange={(v: string) => {
                    const entries = [...(section.entries ?? [])];
                    entries[ei] = { ...entries[ei], label: v };
                    updateHoursSection(si, { entries });
                  }}
                />
                <FormField
                  label={ei === 0 ? 'Hours text' : ''}
                  name={`hours_text_${si}_${ei}`}
                  value={entry.text}
                  onChange={(v: string) => {
                    const entries = [...(section.entries ?? [])];
                    entries[ei] = { ...entries[ei], text: v };
                    updateHoursSection(si, { entries });
                  }}
                />
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  style={{ alignSelf: ei === 0 ? 'end' : 'center', marginBottom: ei === 0 ? 0 : 0 }}
                  onClick={() => {
                    const entries = (section.entries ?? []).filter((_, i) => i !== ei);
                    updateHoursSection(si, { entries: entries.length ? entries : [{ text: '' }] });
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={() => updateHoursSection(si, { entries: [...(section.entries ?? []), { text: '' }] })}
              >
                + Add hours line
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-outline"
                onClick={() => setData({ ...data, hours_sections: data.hours_sections.filter((_, i) => i !== si) })}
              >
                Remove section
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Platforms</h2>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => setData({
              ...data,
              platforms: [...data.platforms, { id: 'whatsapp', label: '', href: '' }],
            })}
          >
            + Add platform
          </button>
        </div>
        {data.platforms.map((platform, pi) => (
          <div key={pi} style={{ border: '1px solid var(--admin-border, #ddd)', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <FormField
              label="ID"
              name={`platform_id_${pi}`}
              value={platform.id}
              onChange={(v: string) => updatePlatform(pi, { id: v as MockContactPlatform['id'] })}
              hint="whatsapp, zenoti, or instagram"
            />
            <FormField label="Label" name={`platform_label_${pi}`} value={platform.label} onChange={(v: string) => updatePlatform(pi, { label: v })} />
            <FormField label="Link" name={`platform_href_${pi}`} value={platform.href} onChange={(v: string) => updatePlatform(pi, { href: v })} />
            <button
              type="button"
              className="admin-btn admin-btn-outline"
              onClick={() => setData({ ...data, platforms: data.platforms.filter((_, i) => i !== pi) })}
            >
              Remove platform
            </button>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
