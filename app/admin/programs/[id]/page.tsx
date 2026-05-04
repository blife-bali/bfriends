'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';

interface ProgramStep { id?: number; step_id: string; title: string; description: string; sort_order: number; }
interface ProgramSession { id?: number; title: string; description: string; image: string; icon: string; sort_order: number; }
interface ProgramSessionType { id?: number | null; title: string; sort_order: number; sessions: ProgramSession[]; }

interface Program {
  id?: number;
  name: string; slug: string; eyebrow: string; title: string;
  subheading: string; image: string; button_label: string; quote: string;
  philosophy: string; breadcrumb: string; philosophy_image: string;
  pillars_image: string; pillars_title: string; pillars_paragraph: string;
  previous_program: string; next_program: string;
  seo_title: string; seo_description: string;
  sort_order: number; is_active: number;
  steps: ProgramStep[];
  /** Nested groups persisted as `session_types` on save; `sessions` kept empty so PUT uses groups only. */
  session_types: ProgramSessionType[];
  sessions?: ProgramSession[];
}

const emptySession: ProgramSession = { title: '', description: '', image: '', icon: '', sort_order: 0 };

function mapLoadedSession(s: Record<string, unknown>): ProgramSession {
  return {
    id: typeof s.id === 'number' ? s.id : undefined,
    title: String(s.title ?? ''),
    description: String(s.description ?? ''),
    image: String(s.image ?? ''),
    icon: String(s.icon ?? ''),
    sort_order: typeof s.sort_order === 'number' ? s.sort_order : 0,
  };
}

export default function ProgramDetailPage() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === 'new';
  const [tab, setTab] = useState('general');
  const [program, setProgram] = useState<Program>({
    name: '', slug: '', eyebrow: '', title: '', subheading: '',
    image: '', button_label: '', quote: '', philosophy: '', breadcrumb: '',
    philosophy_image: '', pillars_image: '', pillars_title: '', pillars_paragraph: '',
    previous_program: '', next_program: '',
    seo_title: '', seo_description: '',
    sort_order: 0, is_active: 1, steps: [],
    session_types: [{ title: 'Signature Sessions', sort_order: 0, sessions: [] }],
    sessions: [],
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
      let session_types: ProgramSessionType[];
      if (Array.isArray(data.session_types) && data.session_types.length > 0) {
        session_types = data.session_types.map((t: Record<string, unknown>, i: number) => ({
          id: typeof t.id === 'number' ? t.id : (t.id === null ? null : undefined),
          title: String(t.title ?? ''),
          sort_order: typeof t.sort_order === 'number' ? t.sort_order : i,
          sessions: Array.isArray(t.sessions)
            ? (t.sessions as Record<string, unknown>[]).map(mapLoadedSession)
            : [],
        }));
      } else if (Array.isArray(data.sessions) && data.sessions.length > 0) {
        session_types = [
          {
            title: 'Signature Sessions',
            sort_order: 0,
            sessions: (data.sessions as Record<string, unknown>[]).map(mapLoadedSession),
          },
        ];
      } else {
        session_types = [{ title: 'Signature Sessions', sort_order: 0, sessions: [] }];
      }
      setProgram({ ...data, steps: data.steps || [], session_types, sessions: [] });
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

  // Session types + nested sessions (PUT `session_types`)
  const addSessionType = () =>
    setProgram({
      ...program,
      session_types: [
        ...program.session_types,
        { title: 'New category', sort_order: program.session_types.length, sessions: [] },
      ],
    });
  const removeSessionType = (ti: number) => {
    const st = [...program.session_types];
    st.splice(ti, 1);
    setProgram({ ...program, session_types: st.length ? st : [{ title: 'Signature Sessions', sort_order: 0, sessions: [] }] });
  };
  const updateSessionType = (ti: number, field: keyof ProgramSessionType, value: unknown) => {
    const st = [...program.session_types];
    st[ti] = { ...st[ti], [field]: value } as ProgramSessionType;
    setProgram({ ...program, session_types: st });
  };
  const addSession = (ti: number) => {
    const st = [...program.session_types];
    const sessions = [...(st[ti].sessions || []), { ...emptySession, sort_order: st[ti].sessions.length }];
    st[ti] = { ...st[ti], sessions };
    setProgram({ ...program, session_types: st });
  };
  const removeSession = (ti: number, si: number) => {
    const st = [...program.session_types];
    const sessions = [...st[ti].sessions];
    sessions.splice(si, 1);
    st[ti] = { ...st[ti], sessions };
    setProgram({ ...program, session_types: st });
  };
  const updateSession = (ti: number, si: number, field: string, value: unknown) => {
    const st = [...program.session_types];
    const sessions = [...st[ti].sessions];
    sessions[si] = { ...sessions[si], [field]: value } as ProgramSession;
    st[ti] = { ...st[ti], sessions };
    setProgram({ ...program, session_types: st });
  };

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'seo', label: 'SEO' },
    { key: 'philosophy', label: 'Philosophy' },
    { key: 'framework', label: 'Framework' },
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

        {tab === 'framework' && (
          <div>
            <p style={{ color: 'var(--admin-muted)', marginBottom: 16, fontSize: 14 }}>
              Same layout as the home intro: wide image, then two columns (title left, body right).
            </p>
            <div className="admin-form-group" style={{ marginBottom: 16 }}>
              <label>Framework image</label>
              <ImageUploader value={program.pillars_image || ''} onChange={(url: string) => update('pillars_image', url)} />
            </div>
            <FormField label="Framework title" name="pillars_title" value={program.pillars_title || ''} onChange={(v: string) => update('pillars_title', v)} placeholder="Headline for the left column" />
            <FormField label="Framework paragraph" name="pillars_paragraph" type="textarea" value={program.pillars_paragraph || ''} onChange={(v: string) => update('pillars_paragraph', v)} placeholder="Supporting copy for the right column (line breaks are preserved)" />
          </div>
        )}

        {tab === 'sessions' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
              <strong style={{ color: 'var(--admin-dark-blue)' }}>Program sessions</strong>
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={addSessionType} className="admin-btn admin-btn-secondary admin-btn-sm">+ Session type</button>
              </div>
            </div>
            <p style={{ color: 'var(--admin-muted)', marginBottom: 16, fontSize: 14 }}>
              Each type becomes a heading on the public program page. Sessions are listed in a grid under that heading.
            </p>
            {program.session_types.map((stype, ti) => (
              <div key={ti} style={{ background: 'var(--admin-cream-2)', padding: 16, borderRadius: 8, marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                  <input
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                    placeholder="Type title (e.g. Facial treatments)"
                    value={stype.title}
                    onChange={(e) => updateSessionType(ti, 'title', e.target.value)}
                  />
                  <button type="button" onClick={() => addSession(ti)} className="admin-btn admin-btn-secondary admin-btn-sm">+ Session</button>
                  <button type="button" onClick={() => removeSessionType(ti)} className="admin-btn admin-btn-danger admin-btn-sm">Remove type</button>
                </div>
                {(stype.sessions || []).map((session, si) => (
                  <div key={si} style={{ background: 'var(--color-white-100)', padding: 12, borderRadius: 6, marginBottom: 10, border: '1px solid var(--admin-border)' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                      <input style={{ flex: 2, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                        placeholder="Title" value={session.title} onChange={(e) => updateSession(ti, si, 'title', e.target.value)} />
                      <input style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4 }}
                        placeholder="Icon name" value={session.icon || ''} onChange={(e) => updateSession(ti, si, 'icon', e.target.value)} />
                      <button type="button" onClick={() => removeSession(ti, si)} className="admin-btn admin-btn-danger admin-btn-sm">X</button>
                    </div>
                    <textarea style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--admin-border)', borderRadius: 4, minHeight: 60, fontFamily: 'var(--font-sans)', fontSize: 14 }}
                      placeholder="Description" value={session.description} onChange={(e) => updateSession(ti, si, 'description', e.target.value)} />
                    <div className="admin-form-group" style={{ marginTop: 8 }}>
                      <ImageUploader value={session.image || ''} onChange={(url: string) => updateSession(ti, si, 'image', url)} />
                    </div>
                  </div>
                ))}
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
