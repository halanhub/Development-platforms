create table public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null,
  submitted_by uuid,
  created_at timestamptz default now()
);

alter table public.articles enable row level security;

create policy "Anyone can read articles"
on public.articles
for select
to anon, authenticated
using (true);

create policy "Logged in users can create articles"
on public.articles
for insert
to authenticated
with check (
  auth.uid() = submitted_by
);