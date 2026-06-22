-- NEWME MEDTECH CMS + lead capture schema for Supabase/PostgreSQL
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  public_url text not null,
  alt_text text not null default '',
  caption text,
  width integer check (width is null or width > 0),
  height integer check (height is null or height > 0),
  mime_type text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.systems (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null,
  hero_media_id uuid references public.media_assets(id) on delete set null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.technologies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  type text not null check (type in ('light','energy','skin-care')),
  definition text not null,
  mechanism text not null,
  hero_media_id uuid references public.media_assets(id) on delete set null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text not null,
  clinical_outcomes text[] not null default '{}',
  clinical_disclaimer text,
  hero_media_id uuid references public.media_assets(id) on delete set null,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  system_id uuid not null references public.systems(id) on delete restrict,
  primary_technology_id uuid not null references public.technologies(id) on delete restrict,
  description text not null,
  workflow_role text,
  key_features text[] not null default '{}',
  specs jsonb not null default '{}'::jsonb check (jsonb_typeof(specs) = 'object'),
  regulatory_note text,
  content_generated_by text,
  ai_core_version text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.system_technologies (
  system_id uuid not null references public.systems(id) on delete cascade,
  technology_id uuid not null references public.technologies(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (system_id, technology_id)
);

create table if not exists public.system_applications (
  system_id uuid not null references public.systems(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (system_id, application_id)
);

create table if not exists public.technology_applications (
  technology_id uuid not null references public.technologies(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (technology_id, application_id)
);

create table if not exists public.product_applications (
  product_id uuid not null references public.products(id) on delete cascade,
  application_id uuid not null references public.applications(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (product_id, application_id)
);

create table if not exists public.product_images (
  product_id uuid not null references public.products(id) on delete cascade,
  media_id uuid not null references public.media_assets(id) on delete cascade,
  role text not null default 'gallery' check (role in ('hero','gallery','detail','before','after')),
  sort_order integer not null default 0,
  primary key (product_id, media_id)
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null,
  eyebrow text,
  content jsonb not null default '{}'::jsonb,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  category text,
  excerpt text,
  sections jsonb not null default '[]'::jsonb check (jsonb_typeof(sections) = 'array'),
  read_time text,
  seo_title text,
  seo_description text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.article_systems (
  article_id uuid not null references public.articles(id) on delete cascade,
  system_id uuid not null references public.systems(id) on delete cascade,
  primary key (article_id, system_id)
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  content_generated_by text,
  ai_core_version text,
  technology_id uuid references public.technologies(id) on delete cascade,
  system_id uuid references public.systems(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  application_id uuid references public.applications(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (num_nonnulls(technology_id, system_id, product_id, application_id) <= 1)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  whatsapp text,
  country text,
  company text,
  business_type text,
  budget text,
  interested_product text,
  source text not null default 'website',
  message text,
  status text not null default 'new' check (status in ('new','qualified','contacted','won','lost','spam')),
  created_at timestamptz not null default now(),
  check (nullif(trim(coalesce(email,'')),'') is not null or nullif(trim(coalesce(whatsapp,'')),'') is not null)
);

create index if not exists products_system_idx on public.products(system_id, sort_order);
create index if not exists products_technology_idx on public.products(primary_technology_id, sort_order);
create index if not exists articles_published_idx on public.articles(published_at desc) where status='published';
create index if not exists leads_created_at_idx on public.leads(created_at desc);

do $$ declare table_name text; begin
  foreach table_name in array array['media_assets','systems','technologies','applications','products','pages','articles','faqs'] loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', table_name, table_name);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', table_name, table_name);
  end loop;
end $$;

alter table public.media_assets enable row level security;
alter table public.systems enable row level security;
alter table public.technologies enable row level security;
alter table public.applications enable row level security;
alter table public.products enable row level security;
alter table public.system_technologies enable row level security;
alter table public.system_applications enable row level security;
alter table public.technology_applications enable row level security;
alter table public.product_applications enable row level security;
alter table public.product_images enable row level security;
alter table public.pages enable row level security;
alter table public.articles enable row level security;
alter table public.article_systems enable row level security;
alter table public.faqs enable row level security;
alter table public.leads enable row level security;

drop policy if exists "public read media" on public.media_assets;
create policy "public read media" on public.media_assets for select using (true);
drop policy if exists "public read published systems" on public.systems;
create policy "public read published systems" on public.systems for select using (status='published');
drop policy if exists "public read published technologies" on public.technologies;
create policy "public read published technologies" on public.technologies for select using (status='published');
drop policy if exists "public read published applications" on public.applications;
create policy "public read published applications" on public.applications for select using (status='published');
drop policy if exists "public read published products" on public.products;
create policy "public read published products" on public.products for select using (status='published');
drop policy if exists "public read published pages" on public.pages;
create policy "public read published pages" on public.pages for select using (status='published');
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles" on public.articles for select using (status='published' and (published_at is null or published_at<=now()));
drop policy if exists "public read published faqs" on public.faqs;
create policy "public read published faqs" on public.faqs for select using (status='published');

-- Relationship tables are safe to expose; inaccessible draft entities remain protected by their own RLS.
drop policy if exists "public read system technologies" on public.system_technologies;
create policy "public read system technologies" on public.system_technologies for select using (true);
drop policy if exists "public read system applications" on public.system_applications;
create policy "public read system applications" on public.system_applications for select using (true);
drop policy if exists "public read technology applications" on public.technology_applications;
create policy "public read technology applications" on public.technology_applications for select using (true);
drop policy if exists "public read product applications" on public.product_applications;
create policy "public read product applications" on public.product_applications for select using (true);
drop policy if exists "public read product images" on public.product_images;
create policy "public read product images" on public.product_images for select using (true);
drop policy if exists "public read article systems" on public.article_systems;
create policy "public read article systems" on public.article_systems for select using (true);

-- Lead inserts are handled by the server-side service-role client. No public lead SELECT policy is created.

-- Optional public media bucket used by CMS uploads.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('cms-media','cms-media',true,10485760,array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml'])
on conflict (id) do update set public=excluded.public,file_size_limit=excluded.file_size_limit,allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "public read cms media" on storage.objects;
create policy "public read cms media" on storage.objects for select using (bucket_id='cms-media');
drop policy if exists "authenticated upload cms media" on storage.objects;
create policy "authenticated upload cms media" on storage.objects for insert to authenticated with check (bucket_id='cms-media');
drop policy if exists "authenticated update cms media" on storage.objects;
create policy "authenticated update cms media" on storage.objects for update to authenticated using (bucket_id='cms-media') with check (bucket_id='cms-media');
drop policy if exists "authenticated delete cms media" on storage.objects;
create policy "authenticated delete cms media" on storage.objects for delete to authenticated using (bucket_id='cms-media');

-- Privacy-conscious conversion and feedback loop. No IP address, fingerprint, form value, or medical data is stored.
create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  session_id uuid not null,
  event_name text not null check (event_name in ('page_view','section_view','cta_click','inquiry_start','lead_submit','lead_error','whatsapp_click','chat_open','page_exit')),
  path text not null check (char_length(path) between 1 and 500),
  entity_type text check (entity_type is null or entity_type in ('system','technology','product','application','article','page')),
  entity_slug text,
  section_id text,
  referrer_path text,
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata)='object'),
  occurred_at timestamptz not null default now()
);

create table if not exists public.conversion_insights (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  period_start timestamptz not null,
  period_end timestamptz not null,
  bottleneck_type text not null,
  severity text not null check (severity in ('low','medium','high')),
  metrics jsonb not null default '{}'::jsonb,
  decision jsonb not null default '{}'::jsonb,
  core_version text not null,
  status text not null default 'open' check (status in ('open','accepted','dismissed','implemented')),
  created_at timestamptz not null default now()
);

create table if not exists public.content_strategy_recommendations (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  entity_type text,
  entity_slug text,
  priority integer not null check (priority between 0 and 100),
  content_action text not null,
  conversion_action text not null,
  preferred_cta text not null default 'inquiry' check (preferred_cta in ('inquiry','whatsapp','chat')),
  reason text not null,
  source_insight_id uuid references public.conversion_insights(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft','active','dismissed','completed')),
  valid_until timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists analytics_events_time_idx on public.analytics_events(occurred_at desc);
create index if not exists analytics_events_path_idx on public.analytics_events(path,event_name,occurred_at desc);
create index if not exists analytics_events_session_idx on public.analytics_events(session_id,occurred_at);
create index if not exists conversion_insights_path_idx on public.conversion_insights(path,created_at desc);
create index if not exists content_strategy_active_idx on public.content_strategy_recommendations(path,created_at desc) where status='active';

drop trigger if exists set_content_strategy_recommendations_updated_at on public.content_strategy_recommendations;
create trigger set_content_strategy_recommendations_updated_at before update on public.content_strategy_recommendations for each row execute function public.set_updated_at();

alter table public.analytics_events enable row level security;
alter table public.conversion_insights enable row level security;
alter table public.content_strategy_recommendations enable row level security;
-- Events are inserted through the server-side API. No public event or insight policies are created.

-- Upgrade-safe AI provenance columns for installations created from an earlier schema version.
alter table public.products add column if not exists content_generated_by text;
alter table public.products add column if not exists ai_core_version text;
alter table public.faqs add column if not exists content_generated_by text;
alter table public.faqs add column if not exists ai_core_version text;

create or replace function public.assert_published_cms_relationships()
returns trigger language plpgsql as $$
begin
  if exists(select 1 from public.technologies t where t.status='published' and not exists(select 1 from public.system_technologies st where st.technology_id=t.id)) then raise exception 'Published technology must belong to at least one system'; end if;
  if exists(select 1 from public.applications a where a.status='published' and (not exists(select 1 from public.system_applications sa where sa.application_id=a.id) or not exists(select 1 from public.technology_applications ta where ta.application_id=a.id))) then raise exception 'Published application must connect to a system and a technology'; end if;
  if exists(select 1 from public.products p where p.status='published' and (not exists(select 1 from public.product_applications pa where pa.product_id=p.id) or not exists(select 1 from public.faqs f where f.product_id=p.id and f.status='published') or nullif(trim(coalesce(p.seo_title,'')),'') is null or nullif(trim(coalesce(p.seo_description,'')),'') is null or nullif(trim(coalesce(p.ai_core_version,'')),'') is null)) then raise exception 'Published product requires an application, FAQ, SEO metadata, and AI core provenance'; end if;
  return null;
end;
$$;

do $$ declare table_name text; begin
  foreach table_name in array array['systems','technologies','applications','products','system_technologies','system_applications','technology_applications','product_applications','faqs'] loop
    execute format('drop trigger if exists validate_%I_relationships on public.%I',table_name,table_name);
    execute format('create constraint trigger validate_%I_relationships after insert or update or delete on public.%I deferrable initially deferred for each row execute function public.assert_published_cms_relationships()',table_name,table_name);
  end loop;
end $$;
