create table if not exists public.content_store (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.content_store enable row level security;
revoke all on table public.content_store from anon, authenticated;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do update set public = true;
