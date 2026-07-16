'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import FormField from '@/components/admin/FormField';
import ImageUploader from '@/components/admin/ImageUploader';
import Toast from '@/components/admin/Toast';
import ProgramSessionsEditor, {
  type ProgramSession,
  type ProgramSessionType,
} from '@/components/admin/ProgramSessionsEditor';
import AdminPageHint from '@/components/admin/AdminPageHint';

interface ProgramStep { id?: number; step_id: string; title: string; description: string; sort_order: number; }

interface Program {
  id?: number;
  name: string; slug: string; eyebrow: string; title: string;
  subheading: string; image: string; video: string; button_label: string; book_now_button: number; quote: string;
  philosophy: string; breadcrumb: string; philosophy_image: string;
  pillars_image: string; pillars_title: string; pillars_paragraph: string;
  previous_program: string; next_program: string;
  seo_title: string; seo_description: string;
  intro_title: string; intro_sub: string;
  sort_order: number; is_active: number;
  steps: ProgramStep[];
  /** Nested groups persisted as `session_types` on save; `sessions` kept empty so PUT uses groups only. */
  session_types: ProgramSessionType[];
  sessions?: ProgramSession[];
}

function mapLoadedSession(s: Record<string, unknown>): ProgramSession {
  return {
    id: typeof s.id === 'number' ? s.id : undefined,
    title: String(s.title ?? ''),
    extra: String(s.extra ?? ''),
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
    image: '', video: '', button_label: '', book_now_button: 1, quote: '', philosophy: '', breadcrumb: '',
    philosophy_image: '', pillars_image: '', pillars_title: '', pillars_paragraph: '',
    previous_program: '', next_program: '',
    seo_title: '', seo_description: '',
    intro_title: '', intro_sub: '',
    sort_order: 0, is_active: 1, steps: [],
    session_types: [{ title: 'Signature Sessions', sort_order: 0, sessions: [] }],
    sessions: [],
  });
  const [username, setUsername] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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
    if (isSaving) return;
    setIsSaving(true);
    const url = isNew ? '/api/admin/programs' : `/api/admin/programs/${params.id}`;
    const method = isNew ? 'POST' : 'PUT';
    try {
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(program) });
      if (res.ok) {
        router.push('/admin/programs');
      } else {
        setToast({ message: 'Failed to save', type: 'error' });
        setIsSaving(false);
      }
    } catch {
      setToast({ message: 'Failed to save', type: 'error' });
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!program.id || isNew) return;
    if (!confirm('Delete this program?')) return;
    await fetch(`/api/admin/programs/${program.id}`, { method: 'DELETE' });
    router.push('/admin/programs');
  };

  const update = (field: string, value: any) => setProgram({ ...program, [field]: value });

  const tabs = [
    { key: 'general', label: 'General' },
    { key: 'seo', label: 'SEO' },
    { key: 'intro', label: 'Intro' },
    // [ NOTES ] Philosophy tab (quote / philosophy / philosophy image / prev-next) is not rendered on /programs/[slug]. Prev/next nav is hard-disabled in ProgramContent. [ END NOTES ] //
    // { key: 'philosophy', label: 'Philosophy' },
    { key: 'framework', label: 'Framework' },
    { key: 'sessions', label: 'Sessions & pricing' },
  ];

  return (
    <AdminLayout title={isNew ? 'New Program' : `Edit: ${program.name}`} username={username}>
      <AdminPageHint variant="live">
        Shown on <code>/programs/{'{slug}'}</code> and used for spa session lists. <strong>Sessions</strong> are the
        service / pricing groups visitors see. Inactive programs are hidden from the public site.
      </AdminPageHint>
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
            {/* [ NOTES ] Eyebrow is stored in DB but not mapped into PublicProgram / not shown on the public site. [ END NOTES ] */}
            {/* <FormField label="Eyebrow" name="eyebrow" value={program.eyebrow || ''} onChange={(v: string) => update('eyebrow', v)} /> */}
            <FormField label="Title" name="title" value={program.title || ''} onChange={(v: string) => update('title', v)} hint="Used on community programme cards; intro title can override the on-page intro heading" />
            <FormField label="Subheading" name="subheading" value={program.subheading || ''} onChange={(v: string) => update('subheading', v)} hint="Shown on /programs list and community cards" />
            <FormField label="Button Label" name="button_label" value={program.button_label || ''} onChange={(v: string) => update('button_label', v)} hint="Community About Services cards (not the program detail WhatsApp CTA)" />
            <FormField label="Book Now Button" name="book_now_button" type="checkbox" value={!!program.book_now_button} onChange={(v: boolean) => update('book_now_button', v ? 1 : 0)} />
            <FormField label="Video URL" name="video" value={program.video || ''} onChange={(v: string) => update('video', v)} placeholder="/videos/BFriends2.mp4" />
            {/* [ NOTES ] Program breadcrumb is not used — /programs/[slug] PageHeader uses name only; /programs list hardcodes "Programmes". [ END NOTES ] */}
            {/* <FormField label="Breadcrumb" name="breadcrumb" value={program.breadcrumb || ''} onChange={(v: string) => update('breadcrumb', v)} /> */}
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

        {tab === 'intro' && (
          <div>
            <FormField label="Intro Title" name="intro_title" value={program.intro_title || ''} onChange={(v: string) => update('intro_title', v)} />
            <FormField label="Intro Subheading" name="intro_sub" type="textarea" value={program.intro_sub || ''} onChange={(v: string) => update('intro_sub', v)} />
          </div>
        )}

        {/* [ NOTES ] Philosophy tab not on the public program page. Values remain in state/DB on save. [ END NOTES ] */}
        {/* {tab === 'philosophy' && (
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
        )} */}

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
            <strong style={{ color: 'var(--admin-dark-blue)', display: 'block', marginBottom: 12 }}>
              Program sessions
            </strong>
            <ProgramSessionsEditor
              sessionTypes={program.session_types}
              onChange={(session_types) => setProgram({ ...program, session_types })}
            />
          </div>
        )}

        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Program'}
          </button>
          {!isNew && <button onClick={handleDelete} className="admin-btn admin-btn-danger">Delete Program</button>}
          <button onClick={() => router.push('/admin/programs')} className="admin-btn admin-btn-outline">Back</button>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AdminLayout>
  );
}
