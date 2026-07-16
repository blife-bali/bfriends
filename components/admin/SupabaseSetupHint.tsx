'use client';

import AdminPageHint from '@/components/admin/AdminPageHint';

export default function SupabaseSetupHint({ onSeed }: { onSeed?: () => void }) {
  return (
    <AdminPageHint variant="partial">
      <strong>Supabase is not connected yet.</strong> Add{' '}
      <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{' '}
      <code>SUPABASE_SERVICE_ROLE_KEY</code> to <code>.env</code>, then run the SQL migration in{' '}
      <code>supabase/migrations/001_bfriends_priority_content.sql</code> via the Supabase SQL Editor.
      {onSeed ? (
        <>
          {' '}
          After that,{' '}
          <button type="button" className="admin-btn admin-btn-outline" style={{ marginLeft: 8 }} onClick={onSeed}>
            Seed from static files
          </button>
        </>
      ) : null}
    </AdminPageHint>
  );
}
