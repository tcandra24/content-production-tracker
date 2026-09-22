import { drizzle  } from 'drizzle-orm/neon-serverless'
import { neonConfig, Pool } from "@neondatabase/serverless";
import ws from 'ws';

import * as schema from './schema.ts'

if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// const sql = neon(process.env.DATABASE_URL!)
// export const db = drizzle(sql, { schema })
const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const db = drizzle(pool, { schema })
