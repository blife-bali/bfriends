import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';
import { getSession } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
    }

    const [rows] = await pool.execute(
      'SELECT id, username, password_hash, display_name FROM bfriends_admin_users WHERE username = ?',
      [username]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
    }

    const session = await getSession();
    session.userId = user.id;
    session.username = user.username;
    session.isLoggedIn = true;
    await session.save();

    return NextResponse.json({ success: true, user: { id: user.id, username: user.username, display_name: user.display_name } });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 });
  }
}
