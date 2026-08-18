import type { PoolConnection } from "mysql2/promise";
import { asInsertResult, type DbRow } from "@/lib/db";

export type SessionTypeInput = {
  title?: string;
  sort_order?: number;
  sessions?: Array<{
    title?: string;
    extra?: string | null;
    description?: string;
    image?: string | null;
    icon?: string | null;
    sort_order?: number;
  }>;
};

function normalizeSessionTypes(
  session_types?: SessionTypeInput[] | null,
  legacySessions?: SessionTypeInput["sessions"] | null
): SessionTypeInput[] {
  if (Array.isArray(session_types) && session_types.length > 0) {
    return session_types;
  }
  if (Array.isArray(legacySessions) && legacySessions.length > 0) {
    return [{ title: "Signature Sessions", sort_order: 0, sessions: legacySessions }];
  }
  return [];
}

type ProgramStepInput = {
  step_id?: string;
  title?: string;
  description?: string;
  sort_order?: number;
};

export async function replaceProgramChildren(
  connection: PoolConnection,
  programId: string,
  steps: ProgramStepInput[] = [],
  session_types?: SessionTypeInput[] | null,
  legacySessions?: SessionTypeInput["sessions"] | null
) {
  const resolveStepSortOrder = (step: ProgramStepInput, fallbackIndex: number) => {
    const numberFromStepId = Number.parseInt(String(step?.step_id ?? ""), 10);
    if (Number.isFinite(numberFromStepId)) return numberFromStepId - 1;
    return step?.sort_order ?? fallbackIndex;
  };

  await connection.execute("DELETE FROM bfriends_program_steps WHERE program_id = ?", [programId]);
  await connection.execute("DELETE FROM bfriends_program_sessions WHERE program_id = ?", [programId]);
  await connection.execute("DELETE FROM bfriends_program_session_types WHERE program_id = ?", [programId]);

  if (Array.isArray(steps)) {
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      await connection.execute(
        `INSERT INTO bfriends_program_steps (program_id, step_id, title, description, sort_order)
         VALUES (?, ?, ?, ?, ?)`,
        [
          programId,
          step.step_id || String(i + 1).padStart(2, "0"),
          step.title || "",
          step.description || "",
          resolveStepSortOrder(step, i),
        ]
      );
    }
  }

  const groups = normalizeSessionTypes(session_types, legacySessions);
  for (let ti = 0; ti < groups.length; ti++) {
    const g = groups[ti];
    const [typeRes] = await connection.execute(
      `INSERT INTO bfriends_program_session_types (program_id, title, sort_order) VALUES (?, ?, ?)`,
      [programId, (g.title || "Sessions").trim() || "Sessions", g.sort_order ?? ti]
    );
    const typeId = asInsertResult(typeRes).insertId;
    const sessions = g.sessions || [];
    for (let si = 0; si < sessions.length; si++) {
      const session = sessions[si];
      await connection.execute(
        `INSERT INTO bfriends_program_sessions (program_id, session_type_id, title, extra, description, image, icon, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          programId,
          typeId,
          session.title || "",
          session.extra || null,
          session.description || "",
          session.image || null,
          session.icon || null,
          session.sort_order ?? si,
        ]
      );
    }
  }
}

/** Build nested session_types for admin GET from flat DB rows. */
export function buildSessionTypesForAdmin(typesRows: DbRow[], sessionsRows: DbRow[]) {
  const types = [...typesRows].sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  );
  const sessions = [...sessionsRows];
  const nested = types.map((t) => ({
    id: t.id,
    title: t.title,
    sort_order: t.sort_order ?? 0,
    sessions: sessions
      .filter((s) => s.session_type_id === t.id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
  }));
  const orphans = sessions
    .filter((s) => s.session_type_id == null)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  if (orphans.length > 0) {
    nested.push({
      id: null,
      title: "Signature Sessions",
      sort_order: 9999,
      sessions: orphans,
    });
  }
  return nested;
}

export function buildSessionGroupsPublic(typesRows: DbRow[], sessionsRows: DbRow[]) {
  const admin = buildSessionTypesForAdmin(typesRows, sessionsRows);
  return admin.map((g) => ({
    name: g.title,
    sessions: (g.sessions || []).map((s) => ({
      name: String(s.title ?? ""),
      extra: String(s.extra ?? ""),
      desc: String(s.description ?? ""),
      image: String(s.image ?? ""),
    })),
  }));
}
