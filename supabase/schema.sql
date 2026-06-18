create extension if not exists pgcrypto;

create table if not exists public.cats (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  slug text not null unique,
  age text not null,
  sex text not null check (sex in ('Femelle', 'Mâle', 'Inconnu')),
  sterilized boolean not null default false,
  vaccinated boolean not null default false,
  health_condition text not null,
  personality text not null,
  rescue_story text not null,
  adoption_fee text not null,
  special_needs text not null default 'Aucun besoin particulier connu.',
  status text not null default 'brouillon' check (status in ('brouillon', 'publie', 'adopte')),
  published_at timestamptz,
  adopted_at timestamptz,
  photos text[] not null default '{}'
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_cats_updated_at on public.cats;
create trigger set_cats_updated_at before update on public.cats for each row execute function public.set_updated_at();

alter table public.cats enable row level security;

drop policy if exists "Tout le monde lit les chats publics" on public.cats;
create policy "Tout le monde lit les chats publics" on public.cats for select using (status in ('publie', 'adopte'));

drop policy if exists "Admins connectes lisent tout" on public.cats;
create policy "Admins connectes lisent tout" on public.cats for select to authenticated using (true);

drop policy if exists "Admins connectes ajoutent" on public.cats;
create policy "Admins connectes ajoutent" on public.cats for insert to authenticated with check (true);

drop policy if exists "Admins connectes modifient" on public.cats;
create policy "Admins connectes modifient" on public.cats for update to authenticated using (true) with check (true);

drop policy if exists "Admins connectes suppriment" on public.cats;
create policy "Admins connectes suppriment" on public.cats for delete to authenticated using (true);

insert into storage.buckets (id, name, public)
values ('cat-photos', 'cat-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "Photos visibles publiquement" on storage.objects;
create policy "Photos visibles publiquement" on storage.objects for select using (bucket_id = 'cat-photos');

drop policy if exists "Admins ajoutent des photos" on storage.objects;
create policy "Admins ajoutent des photos" on storage.objects for insert to authenticated with check (bucket_id = 'cat-photos');

drop policy if exists "Admins modifient des photos" on storage.objects;
create policy "Admins modifient des photos" on storage.objects for update to authenticated using (bucket_id = 'cat-photos') with check (bucket_id = 'cat-photos');

drop policy if exists "Admins suppriment des photos" on storage.objects;
create policy "Admins suppriment des photos" on storage.objects for delete to authenticated using (bucket_id = 'cat-photos');
