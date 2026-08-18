import mysql, { type Pool, type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';

/** MySQL row; columns depend on the query. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- CMS selects vary by table
export type DbRow = any;
export type { ResultSetHeader, RowDataPacket };

export function asInsertResult(result: unknown): ResultSetHeader {
  return result as ResultSetHeader;
}

export function mysqlErrorCode(error: unknown): string | undefined {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: unknown }).code;
    return typeof code === 'string' ? code : undefined;
  }
  return undefined;
}

declare global {
  // eslint-disable-next-line no-var
  var __bfriendsMysqlPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __bfriendsMysqlPoolShutdownRegistered: boolean | undefined;
}

function createPool(): Pool {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'bfriends_cms',
    waitForConnections: true,
    connectionLimit: 60,
    maxIdle: 2,
    idleTimeout: 60_000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10_000,
  });
}

const pool: Pool = globalThis.__bfriendsMysqlPool ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__bfriendsMysqlPool = pool;
}

if (!globalThis.__bfriendsMysqlPoolShutdownRegistered) {
  const shutdown = async () => {
    try {
      await pool.end();
    } catch {}
  };
  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
  process.once('beforeExit', shutdown);
  globalThis.__bfriendsMysqlPoolShutdownRegistered = true;
}

export async function withConnection<T>(
  fn: (conn: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const conn = await pool.getConnection();
  try {
    return await fn(conn);
  } finally {
    conn.release();
  }
}

export default pool;
