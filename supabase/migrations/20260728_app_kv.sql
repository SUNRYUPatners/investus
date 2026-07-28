-- Generic JSON cache for server-side snapshots (13F holdings, etc.)
create table if not exists app_kv (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table app_kv enable row level security;

-- service role only (no public policies)
