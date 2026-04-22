'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';

interface ProgramStep { id?: number; step_id: string; title: string; description: string; sort_order: number; }
interface ProgramSession { id?: number; title: string; description: string; image: string; icon: string; sort_order: number; }

interface Program {
  id?: number;
  name: string; slug: string; eyebrow: string; title: string;
  subheading: string; image: string; button_label: string; quote: string;
  philosophy: string; breadcrumb: string; philosophy_image: string;
  pillars_image: string; previous_program: string; next_program: string;
  seo_title: string; seo_description: string;
  sort_order: number; is_active: number;
  steps: ProgramStep[]; sessions: ProgramSession[];
}

const emptyStep: ProgramStep = { step_id: '', title: '', description: '', sort_order: 0 };
const emptySession: ProgramSession = { title: '', description: '', image: '', icon: '', sort_order: 0 };

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === 'new';
  const [tab, setTab] = useState('general');
  const [program, setProgram] = useState<Program>({
    name: '', slug: '', eyebrow: '', title: '', subheading: '',
    image: '', button_label: '', quote: '', philosophy: '', breadcrumb: '',
    philosophy_image: '', pillars_image: '', previous_program: '', next_program: '',
    seo_title: '', seo_description: '',
    sort_order: 0, is_active: 1, steps: [], sessions: [],
  });
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetch('/api/admin/auth/session').then(r => r.json()).then(d => {
      if (!d.isLoggedIn) router.push('/admin/login');
      else setUsername(d.username);
    });
    if (!isNew) loadProgram();
  }, [router, params.id]);

  const loadProgram = async () => {
    const res = await fetch(`/api/admin/programs/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      setProgram({ ...data, steps: data.steps || [], sessions: data.sessions || [] });
    }
  };

  const handleSave = async () => {
    const url = isNew ? '/api/admin/programs' : `/api/admin/programs/${params.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(program) });
    if (res.ok) {
      const saved = await res.json();
      setToast({ message: 'Program saved!', type: 'success' });
      if (isNew && saved.id) router.push(`/admin/programs/${saved.id}`);
    } else {
      setToast({ message: 'Failed to save', type: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!program.id || isNew) return;
    if (!confirm('Delete this program?')) return;
    await fetch(`/api/admin/programs/${program.id}`, { method: 'DELETE' });
    router.push('/admin/programs');
  };

  const update = (field: string, value: any) => setProgram({ ...program, [field]: value });

  // Steps management
  const addStep = () => setProgram({ ...program, steps: [...program.steps, { ...emptyStep }] });
  const removeStep = (idx: number) => { const s = [...program.steps]; s.splice(idx, 1); setProgram({ ...program, steps: s }); };
  const updateStep = (idx: number, field: string, value: any) => {
    const s = [...program.steps]; s[idx] = { ...s[idx], [field]: value }; setProgram({ ...program, steps: s });
  };

  // Sessions
  const addSession = () => setProgram({ ...program, sessions: [...program.sessions, { ...emptySession }] });
  const removeSession = (idx: number) => { const s = [...program.sessions]; s.splice(idx, 1); setProgram({ ...program, sessions: s }); };
  const updateSession = (idx: number, field: string, value: any) => {
    const s = [...program.sessions]; s[idx] = { ...s[idx], [field]: value }; setProgram({ ...program, sessions: s });
  };

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'seo', label: 'SEO' },
    { key: 'philosophy', label: 'Philosophy' },
    { key: 'steps', label: 'Pillars' },
    { key: 'sessions', label: 'Sessions' },
  ];

  return (
    <AdminLayout title={isNew ? 'New Program' : `Edit: ${program.name}`} username={username}>
      <div className="admin-card">
        <div className="admin-tabs">
          {tabs.map(t => (
            <button key={t.key} className={`admin-tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>

        {tab === 'general' && (
          <div>
            <div className="admin-form-row">
              <FormField label="Name" name="name" value={program.name} onChange={(v: string) => update('name', v)} required />
            </div>
            <div className="admin-form-row">
              <FormField label="Slug" name="slug" value={program.slug} onChange={(v: string) => update('slug', v)} />
              <FormField label="Sort Order" name="sort_order" type="number" value={program.sort_order} onChange={(v: number) => update('sort_order', v)} />
            </div>
            <FormField label="Eyebrow" name="eyebrow" value={program.eyebrow || ''} onChange={(v: string) => update('eyebrow', v)} />
            <FormField label="Title" name="title" value={program.title || ''} onChange={(v: string) => update('title', v)} />
            <FormField label="Subheading" name="subheading" value={program.subheading || ''} onChange={(v: string) => update('subheading', v)} />
            <FormField label="Button Label" name="button_label" value={program.button_label || ''} onChange={(v: string) => update('button_label', v)} />
            <FormField label="Breadcrumb" name="breadcrumb" value={program.breadcrumb || ''} onChange={(v: string) => update('breadcrumb', v)} />
            <div className="admin-form-group">
              <label>Image</label>
              <ImageUploader value={program.image || ''} onChange={(url: string) => update('image', url)} />
            </div>
            <FormField label="Active" name="is_active" type="checkbox" value={!!program.is_active} onChange={(v: boolean) => update('is_active', v ? 1 : 0)} />
          </div>
        )}

        {tab === 'seo' && (
          <div>
            <FormField label="SEO Title" name="seo_title" value={program.seo_title || ''} onChange={(v: string) => update('seo_title', v)} placeholder="Override default page title for search engines" />
            <FormField label="SEO Description" name="seo_description" type="textarea" value={program.seo_description || ''} onChange={(v: string) => update('seo_description', v)} placeholder="Override default page description for search engines" />
          </div>
        )}

        {tab === 'philosophy' && (
          <div>
            <FormField label="Quote" name="quote" type="textarea" value={program.quote || ''} onChange={(v: string) => update('quote', v)} />
            <FormField label="Philosophy" name="philosophy" type="textarea" value={program.philosophy || ''} onChange={(v: string) => update('philosophy', v)} />
            <div className="admin-form-group">
              <label>Philosophy Image</label>
              <ImageUploader value={program.philosophy_image || ''} onChange={(url: string) => update('philosophy_image', url)} />
            </div>
            <div className="admin-form-row">
              <FormField label="Previous Program" name="previous_program" value={program.previous_program || ''} onChange={(v: string) => update('previous_program', v)} />
              <FormField label="Next Program" name="next_program" value={program.next_program || ''} onChange={(v: string) => update('next_program', v)} />
            </div>
          </div>
        )}

        {tab === 'steps' && (
          <div>
            <div className="admin-form-group" style={{ marginBottom: 16 }}>
              <label>Pillars Image</label>
              <ImageUploader value={program.pillars_image || ''} onChange={(url: string) => update('pillars_image', url)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <strong style={{ color: 'var(--admin-dark-blue)' }}>Program Pillars</strong>
              <button onClick={addStep} className="admin-btn admin-btn-secondary admin-btn-sm">+ Pillar</button>
            </div>
            {program.steps.map((step, idx) => (
              <div key={idx} style={{ background: 'var(--admin-cream-2)', padding: 16, borderRadius: 8, marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input style={{ flex: 0.5, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                    placeholder="01" value={step.step_id} onChange={(e) => updateStep(idx, 'step_id', e.target.value)} />
                  <input style={{ flex: 2, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                    placeholder="Title" value={step.title} onChange={(e) => updateStep(idx, 'title', e.target.value)} />
                  <button onClick={() => removeStep(idx)} className="admin-btn admin-btn-danger admin-btn-sm">X</button>
                </div>
                <textarea style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4, minHeight: 60, fontFamily: 'var(--font-sans)', fontSize: 14 }}
                  placeholder="Description" value={step.description} onChange={(e) => updateStep(idx, 'description', e.target.value)} />
              </div>
            ))}
          </div>
        )}

        {tab === 'sessions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <strong style={{ color: 'var(--admin-dark-blue)' }}>Program Sessions</strong>
              <button onClick={addSession} className="admin-btn admin-btn-secondary admin-btn-sm">+ Session</button>
            </div>
            {program.sessions.map((session, idx) => (
              <div key={idx} style={{ background: 'var(--admin-cream-2)', padding: 16, borderRadius: 8, marginBottom: 10 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input style={{ flex: 2, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                    placeholder="Title" value={session.title} onChange={(e) => updateSession(idx, 'title', e.target.value)} />
                  <input style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                    placeholder="Icon name" value={session.icon || ''} onChange={(e) => updateSession(idx, 'icon', e.target.value)} />
                  <button onClick={() => removeSession(idx)} className="admin-btn admin-btn-danger admin-btn-sm">X</button>
                </div>
                <textarea style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4, minHeight: 60, fontFamily: 'var(--font-sans)', fontSize: 14 }}
                  placeholder="Description" value={session.description} onChange={(e) => updateSession(idx, 'description', e.target.value)} />
                <div className="admin-form-group" style={{ marginTop: 8 }}>
                  <ImageUploader value={session.image || ''} onChange={(url: string) => updateSession(idx, 'image', url)} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <button onClick={handleSave} className="admin-btn admin-btn-primary">Save Program</button>
          {!isNew && <button onClick={handleDelete} className="admin-btn admin-btn-danger">Delete Program</button>}
          <button onClick={() => router.push('/admin/programs')} className="admin-btn admin-btn-outline">Back</button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
