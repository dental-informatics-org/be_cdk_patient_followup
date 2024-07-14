import { config } from 'dotenv';
config();

export const environment = {
  ENV: 'dev',
  PGHOST: String(process.env.PGHOST),
  PGUSER: String(process.env.PGUSER),
  PGPASSWORD: String(process.env.PGPASSWORD),
  PGDATABASE: String(process.env.PGDATABASE),
  DATABASE_URL: String(process.env.DATABASE_URL),
  META_ACCOUNT_ID: String(process.env.META_ACCOUNT_ID),
  META_API_VERSION: String(process.env.META_API_VERSION),
  META_GRAPH_URL: String(process.env.META_GRAPH_URL),
  META_BEARERTOKEN: String(process.env.META_BEARERTOKEN),
  META_WEBHOOK_VERIFY_TOKEN: String(process.env.META_WEBHOOK_VERIFY_TOKEN)
};
