import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SUPABASE_DB_URL) {
  throw new Error("Missing SUPABASE_DB_URL in .env");
}

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.SUPABASE_DB_URL,
    ssl: { rejectUnauthorized: false } 
  },
  pool: {
    min: 0,
    max: 5, 
    acquireTimeoutMillis: 15000,
    idleTimeoutMillis: 10000,
    reapIntervalMillis: 3000,
  },
});

export default db;
