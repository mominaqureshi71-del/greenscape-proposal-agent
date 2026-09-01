-- Run this once in Supabase's SQL Editor (Supabase dashboard -> SQL Editor -> New query)

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  project_address text,
  site_walk_notes text not null,
  scope_items jsonb,
  draft_content text,
  total_estimate numeric,
  needs_render boolean default false,
  status text default 'draft', -- draft | pending_approval | approved | sent
  created_at timestamp with time zone default now()
);

-- Allow the app's anon key to read/write (fine for a demo/take-home;
-- in a real production app you'd lock this down with proper policies)
alter table proposals enable row level security;

create policy "Allow all access for demo"
  on proposals
  for all
  using (true)
  with check (true);
