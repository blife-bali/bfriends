import { readFileSync } from 'node:fs';
import mysql from 'mysql2/promise';

for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i === -1) continue;
  process.env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

await pool.execute(`
  CREATE TABLE IF NOT EXISTS bfriends_intro_pillars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    body TEXT NOT NULL,
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
`);

const [countRows] = await pool.execute('SELECT COUNT(*) AS c FROM bfriends_intro_pillars');
const c = Number(countRows[0].c);
if (c === 0) {
  const defaults = [
    ['Data-Driven Assessment', "Gain valuable insights into your body's current condition through a comprehensive wellness assessment.", 0],
    ['Personalised Recommendations', 'Receive tailored guidance based on your individual needs, goals, and lifestyle.', 1],
    ['Expert-Led Support', 'Work alongside experienced wellness professionals who help you navigate every stage of your journey.', 2],
  ];
  for (const [title, body, sort] of defaults) {
    await pool.execute(
      'INSERT INTO bfriends_intro_pillars (title, body, sort_order, is_active) VALUES (?, ?, ?, 1)',
      [title, body, sort]
    );
  }
  console.log('seeded 3 pillars');
} else {
  console.log('already has', c, 'rows');
}

const [rows] = await pool.execute('SELECT id, title, sort_order FROM bfriends_intro_pillars ORDER BY sort_order');
console.log(rows);
await pool.end();
