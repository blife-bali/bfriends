import fs from 'node:fs';
import mysql from 'mysql2/promise';
import { mockSpaPrograms } from '../mock/programs.ts';

for (const line of fs.readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const index = line.indexOf('=');
  if (index > 0) process.env[line.slice(0, index)] = line.slice(index + 1);
}

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function addColumn(table, column, definition) {
  const [rows] = await connection.execute(
    'SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?',
    [process.env.DB_NAME, table, column]
  );
  if (rows.length === 0) {
    await connection.execute(`ALTER TABLE ${table} ADD COLUMN ${definition}`);
    console.log(`added ${table}.${column}`);
  } else {
    console.log(`exists ${table}.${column}`);
  }
}

function normalizeSlug(slug) {
  return String(slug || '').trim().toLowerCase().replace(/\s+/g, '-');
}

try {
  await addColumn('bfriends_programs', 'book_now_button', 'book_now_button TINYINT(1) NOT NULL DEFAULT 1 AFTER button_label');
  await addColumn('bfriends_programs', 'video', 'video VARCHAR(500) DEFAULT NULL AFTER image');
  await addColumn('bfriends_programs', 'intro_title', 'intro_title VARCHAR(500) DEFAULT NULL AFTER seo_description');
  await addColumn('bfriends_programs', 'intro_sub', 'intro_sub TEXT DEFAULT NULL AFTER intro_title');
  await addColumn('bfriends_program_sessions', 'extra', 'extra VARCHAR(255) DEFAULT NULL AFTER title');

  await connection.beginTransaction();

  await connection.execute('DELETE FROM bfriends_program_steps');
  await connection.execute('DELETE FROM bfriends_program_pillars');
  await connection.execute('DELETE FROM bfriends_program_sessions');
  await connection.execute('DELETE FROM bfriends_program_session_types');
  await connection.execute('DELETE FROM bfriends_programs');

  for (const program of mockSpaPrograms) {
    const [result] = await connection.execute(
      `INSERT INTO bfriends_programs (
        letter, name, slug, title, subheading, image, video, button_label, book_now_button,
        breadcrumb, pillars_image, pillars_title, pillars_paragraph,
        seo_title, seo_description, intro_title, intro_sub, sort_order, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        program.general.name.charAt(0).toUpperCase(),
        program.general.name,
        normalizeSlug(program.general.slug),
        program.general.title,
        program.general.subheading,
        program.general.image,
        program.general.video || null,
        program.general.button_label,
        program.general.book_now_button ? 1 : 0,
        `Programs / ${program.general.name}`,
        program.framework.image || null,
        program.framework.title || null,
        program.framework.sub || null,
        program.seo.seo_title || null,
        program.seo.seo_description || null,
        program.intro.title || null,
        program.intro.sub || null,
        program.general.sort_order ?? 0,
        1,
      ]
    );

    const programId = result.insertId;
    for (let groupIndex = 0; groupIndex < program.sessions_group.length; groupIndex++) {
      const group = program.sessions_group[groupIndex];
      const [typeResult] = await connection.execute(
        'INSERT INTO bfriends_program_session_types (program_id, title, sort_order) VALUES (?, ?, ?)',
        [programId, group.name || 'Sessions', groupIndex]
      );
      const typeId = typeResult.insertId;

      for (let sessionIndex = 0; sessionIndex < group.sessions.length; sessionIndex++) {
        const session = group.sessions[sessionIndex];
        await connection.execute(
          `INSERT INTO bfriends_program_sessions
            (program_id, session_type_id, title, extra, description, image, icon, sort_order)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            programId,
            typeId,
            session.name || '',
            session.extra || null,
            session.desc || '',
            null,
            null,
            sessionIndex,
          ]
        );
      }
    }
  }

  await connection.commit();

  const [programCount] = await connection.execute('SELECT COUNT(*) AS total FROM bfriends_programs');
  const [sessionCount] = await connection.execute('SELECT COUNT(*) AS total FROM bfriends_program_sessions');
  console.log(`imported programs: ${programCount[0].total}`);
  console.log(`imported sessions: ${sessionCount[0].total}`);
} catch (error) {
  try {
    await connection.rollback();
  } catch {}
  throw error;
} finally {
  await connection.end();
}
