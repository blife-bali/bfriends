'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import FormField from '@/components/admin/FormField';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import styles from './ProgramSessionsEditor.module.css';

export interface ProgramSession {
  id?: number;
  title: string;
  extra: string;
  description: string;
  /** Kept in state for save; not shown in editor UI */
  image: string;
  /** Kept in state for save; not shown in editor UI */
  icon: string;
  sort_order: number;
}

export interface ProgramSessionType {
  id?: number | null;
  title: string;
  sort_order: number;
  sessions: ProgramSession[];
}

export const emptySession: ProgramSession = {
  title: '',
  extra: '',
  description: '',
  image: '',
  icon: '',
  sort_order: 0,
};

const DEFAULT_GROUP_TITLE = 'Signature Sessions';

type DeleteTarget =
  | { kind: 'group'; groupIndex: number }
  | { kind: 'session'; groupIndex: number; sessionIndex: number };

interface ProgramSessionsEditorProps {
  sessionTypes: ProgramSessionType[];
  onChange: (sessionTypes: ProgramSessionType[]) => void;
}

function sessionKey(groupIndex: number, sessionIndex: number) {
  return `${groupIndex}-${sessionIndex}`;
}

export default function ProgramSessionsEditor({
  sessionTypes,
  onChange,
}: ProgramSessionsEditorProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<number>>(new Set());
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const groupTitleRefs = useRef<Map<number, HTMLInputElement>>(new Map());
  const sessionTitleRefs = useRef<Map<string, HTMLInputElement>>(new Map());
  const focusGroupIndex = useRef<number | null>(null);
  const focusSessionKey = useRef<string | null>(null);

  const updateTypes = useCallback(
    (next: ProgramSessionType[]) => {
      onChange(next);
    },
    [onChange]
  );

  const isGroupOpen = (gi: number) => !collapsedGroups.has(gi);

  const toggleGroup = (gi: number) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(gi)) next.delete(gi);
      else next.add(gi);
      return next;
    });
  };

  const isSessionOpen = (gi: number, si: number, session: ProgramSession) => {
    const key = sessionKey(gi, si);
    if (expandedSessions.has(key)) return true;
    return !session.title.trim();
  };

  const toggleSession = (gi: number, si: number) => {
    const key = sessionKey(gi, si);
    setExpandedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const addGroup = () => {
    const next = [
      ...sessionTypes,
      { title: '', sort_order: sessionTypes.length, sessions: [] },
    ];
    focusGroupIndex.current = next.length - 1;
    setCollapsedGroups((prev) => {
      const collapsed = new Set(prev);
      collapsed.delete(next.length - 1);
      return collapsed;
    });
    updateTypes(next);
  };

  const removeGroup = (gi: number) => {
    const next = [...sessionTypes];
    next.splice(gi, 1);
    updateTypes(
      next.length ? next : [{ title: DEFAULT_GROUP_TITLE, sort_order: 0, sessions: [] }]
    );
    setDeleteTarget(null);
  };

  const updateGroupTitle = (gi: number, title: string) => {
    const next = [...sessionTypes];
    next[gi] = { ...next[gi], title };
    updateTypes(next);
  };

  const addSession = (gi: number) => {
    const next = [...sessionTypes];
    const sessions = [
      ...(next[gi].sessions || []),
      { ...emptySession, sort_order: (next[gi].sessions || []).length },
    ];
    next[gi] = { ...next[gi], sessions };
    const si = sessions.length - 1;
    focusSessionKey.current = sessionKey(gi, si);
    setCollapsedGroups((prev) => {
      const collapsed = new Set(prev);
      collapsed.delete(gi);
      return collapsed;
    });
    setExpandedSessions((prev) => new Set(prev).add(sessionKey(gi, si)));
    updateTypes(next);
  };

  const removeSession = (gi: number, si: number) => {
    const next = [...sessionTypes];
    const sessions = [...next[gi].sessions];
    sessions.splice(si, 1);
    next[gi] = { ...next[gi], sessions };
    updateTypes(next);
    setDeleteTarget(null);
    setExpandedSessions((prev) => {
      const updated = new Set<string>();
      prev.forEach((k) => {
        const [g, s] = k.split('-').map(Number);
        if (g !== gi) updated.add(k);
        else if (s < si) updated.add(k);
        else if (s > si) updated.add(`${g}-${s - 1}`);
      });
      return updated;
    });
  };

  const updateSession = (
    gi: number,
    si: number,
    field: keyof Pick<ProgramSession, 'title' | 'extra' | 'description'>,
    value: string
  ) => {
    const next = [...sessionTypes];
    const sessions = [...next[gi].sessions];
    sessions[si] = { ...sessions[si], [field]: value };
    next[gi] = { ...next[gi], sessions };
    updateTypes(next);
  };

  useEffect(() => {
    if (focusGroupIndex.current !== null) {
      const gi = focusGroupIndex.current;
      focusGroupIndex.current = null;
      requestAnimationFrame(() => {
        groupTitleRefs.current.get(gi)?.focus();
      });
    }
  }, [sessionTypes.length]);

  useEffect(() => {
    if (focusSessionKey.current) {
      const key = focusSessionKey.current;
      focusSessionKey.current = null;
      requestAnimationFrame(() => {
        sessionTitleRefs.current.get(key)?.focus();
        document.getElementById(`session-row-${key}`)?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      });
    }
  }, [sessionTypes]);

  const deleteMessage =
    deleteTarget?.kind === 'group'
      ? `Remove session group "${sessionTypes[deleteTarget.groupIndex]?.title || 'Untitled'}" and all its sessions?`
      : deleteTarget?.kind === 'session'
        ? `Remove session "${sessionTypes[deleteTarget.groupIndex]?.sessions[deleteTarget.sessionIndex]?.title || 'Untitled'}"?`
        : '';

  return (
    <div className={styles.root}>
      <p className={styles.help}>
        Session groups become headings on the public program page. Each session appears as an accordion
        item (name, subtitle, and description). Image and icon fields are stored in the database but
        are not edited here.
      </p>

      <div className={styles.groups}>
        {sessionTypes.map((group, gi) => {
          const sessions = group.sessions || [];
          const open = isGroupOpen(gi);
          const canRemoveGroup = sessionTypes.length > 1;

          return (
            <div key={gi} className={styles.groupCard}>
              <div className={`${styles.groupHeader} ${open ? styles.groupHeaderOpen : ''}`}>
                <button
                  type="button"
                  className={styles.chevronBtn}
                  onClick={() => toggleGroup(gi)}
                  aria-expanded={open}
                  aria-label={open ? 'Collapse group' : 'Expand group'}
                >
                  {open ? '▾' : '▸'}
                </button>
                <input
                  ref={(el) => {
                    if (el) groupTitleRefs.current.set(gi, el);
                    else groupTitleRefs.current.delete(gi);
                  }}
                  className={styles.groupTitleInput}
                  placeholder="Group name (e.g. Facial treatments)"
                  value={group.title}
                  onChange={(e) => updateGroupTitle(gi, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={styles.badge}>
                  {sessions.length} session{sessions.length === 1 ? '' : 's'}
                </span>
                {canRemoveGroup && (
                  <div className={styles.groupActions}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => setDeleteTarget({ kind: 'group', groupIndex: gi })}
                    >
                      Remove group
                    </button>
                  </div>
                )}
              </div>

              {open && (
                <div className={styles.groupBody}>
                  {sessions.length === 0 ? (
                    <div className={styles.emptyGroup}>
                      <p style={{ margin: '0 0 12px' }}>No sessions in this group yet.</p>
                      <button
                        type="button"
                        className={`admin-btn admin-btn-primary ${styles.addSessionBtn} ${styles.addSessionBtnBlock}`}
                        onClick={() => addSession(gi)}
                      >
                        + Add session
                      </button>
                    </div>
                  ) : (
                    <>
                      <ul className={styles.sessionList}>
                        {sessions.map((session, si) => {
                          const key = sessionKey(gi, si);
                          const sessionOpen = isSessionOpen(gi, si, session);
                          const hasTitle = Boolean(session.title.trim());

                          return (
                            <li
                              key={key}
                              id={`session-row-${key}`}
                              className={styles.sessionCard}
                            >
                              <div
                                className={styles.sessionHeader}
                                role="button"
                                tabIndex={0}
                                onClick={() => toggleSession(gi, si)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    toggleSession(gi, si);
                                  }
                                }}
                                aria-expanded={sessionOpen}
                              >
                                <span className={styles.chevronBtn} aria-hidden>
                                  {sessionOpen ? '▾' : '▸'}
                                </span>
                                <div className={styles.sessionPreview}>
                                  <p
                                    className={`${styles.sessionPreviewTitle} ${!hasTitle ? styles.sessionPreviewTitleUntitled : ''}`}
                                  >
                                    {hasTitle ? session.title : 'Untitled session'}
                                  </p>
                                  {session.extra?.trim() && (
                                    <p className={styles.sessionPreviewExtra}>{session.extra}</p>
                                  )}
                                </div>
                              </div>

                              {sessionOpen && (
                                <div className={styles.sessionBody}>
                                  <div className={styles.sessionBodyInner}>
                                    <div
                                      ref={(el) => {
                                        const input = el?.querySelector('input');
                                        if (input) sessionTitleRefs.current.set(key, input);
                                        else sessionTitleRefs.current.delete(key);
                                      }}
                                    >
                                      <FormField
                                        label="Session name"
                                        name={`session-title-${gi}-${si}`}
                                        value={session.title}
                                        onChange={(v: string) => updateSession(gi, si, 'title', v)}
                                        placeholder="e.g. Deep Tissue Massage"
                                        required
                                      />
                                    </div>
                                    <FormField
                                      label="Subtitle / meta"
                                      name={`session-extra-${gi}-${si}`}
                                      value={session.extra || ''}
                                      onChange={(v: string) => updateSession(gi, si, 'extra', v)}
                                      placeholder="e.g. IDR 770K | 60 Minutes"
                                    />
                                    <FormField
                                      label="Description"
                                      name={`session-desc-${gi}-${si}`}
                                      type="textarea"
                                      value={session.description}
                                      onChange={(v: string) => updateSession(gi, si, 'description', v)}
                                      placeholder="What guests can expect from this session"
                                    />
                                    <div className={styles.sessionFooter}>
                                      <button
                                        type="button"
                                        className="admin-btn admin-btn-danger admin-btn-sm"
                                        onClick={() =>
                                          setDeleteTarget({
                                            kind: 'session',
                                            groupIndex: gi,
                                            sessionIndex: si,
                                          })
                                        }
                                      >
                                        Remove session
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      <button
                        type="button"
                        className={`admin-btn admin-btn-secondary ${styles.addSessionBtn} ${styles.addSessionBtnBlock}`}
                        onClick={() => addSession(gi)}
                      >
                        + Add session
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.addGroupWrap}>
        <button type="button" className="admin-btn admin-btn-secondary" onClick={addGroup}>
          + Add session group
        </button>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          message={deleteMessage}
          onConfirm={() => {
            if (deleteTarget.kind === 'group') removeGroup(deleteTarget.groupIndex);
            else removeSession(deleteTarget.groupIndex, deleteTarget.sessionIndex);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
