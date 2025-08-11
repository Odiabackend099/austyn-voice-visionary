-- Ensure required extension
create extension if not exists pgcrypto;

-- Timestamp trigger function (idempotent)
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Courses table
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  subtitle text,
  description text,
  level text check (level in ('beginner','intermediate','advanced')) default 'beginner',
  cover_url text,
  price_cents integer default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Lessons table
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  order_index integer not null,
  title text not null,
  content text,
  video_url text,
  duration_minutes integer,
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (course_id, order_index)
);

-- Triggers
create or replace trigger update_courses_updated_at
before update on public.courses
for each row execute function public.update_updated_at_column();

create or replace trigger update_lessons_updated_at
before update on public.lessons
for each row execute function public.update_updated_at_column();

-- Enable RLS
alter table public.courses enable row level security;
alter table public.lessons enable row level security;

-- Policies (idempotent: drop existing conflicting ones if any)
-- Courses readable if published
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'courses' and policyname = 'Public can read published courses'
  ) then
    create policy "Public can read published courses"
    on public.courses for select
    using (is_published);
  end if;
end$$;

-- Lessons readable if parent course is published
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'lessons' and policyname = 'Public can read lessons of published courses'
  ) then
    create policy "Public can read lessons of published courses"
    on public.lessons for select
    using (exists (
      select 1 from public.courses c
      where c.id = lessons.course_id and c.is_published
    ));
  end if;
end$$;

-- Indexes
create index if not exists idx_courses_slug on public.courses (slug);
create index if not exists idx_lessons_course_order on public.lessons (course_id, order_index);

-- Seed data (upserts by slug)
with upsert_courses as (
  insert into public.courses (slug, title, subtitle, description, level, cover_url, price_cents, is_published)
  values
    ('founder-mindset', 'Founder Mindset', 'Think like a resilient Nigerian founder',
     'Develop the mindset, discipline, and systems top African founders use to build through uncertainty and scale sustainably.',
     'beginner', '/courses/founder-mindset.jpg', 0, true),
    ('fundraising-for-founders', 'Fundraising for Founders', 'From bootstrapping to VC in Africa',
     'A practical roadmap to funding options in Nigeria and across Africa—grants, angels, revenue financing, and venture capital.',
     'intermediate', '/courses/fundraising.jpg', 0, true),
    ('sales-psychology', 'Sales Psychology', 'Close deals with trust, clarity, and structure',
     'Master buyer psychology, objection handling, and repeatable playbooks tailored to African markets.',
     'intermediate', '/courses/sales-psychology.jpg', 0, true),
    ('systems-for-scale', 'Systems for Scale', 'Design operations that compound',
     'Implement processes, automation, and org design to scale from 0→1→10 sustainably.',
     'advanced', '/courses/systems-scale.jpg', 0, true)
  on conflict (slug) do update set
    title = excluded.title,
    subtitle = excluded.subtitle,
    description = excluded.description,
    level = excluded.level,
    cover_url = excluded.cover_url,
    price_cents = excluded.price_cents,
    is_published = excluded.is_published,
    updated_at = now()
  returning id, slug
)
select * from upsert_courses;

-- Map slugs to ids for lesson inserts
with course_ids as (
  select slug, id from public.courses where slug in (
    'founder-mindset', 'fundraising-for-founders', 'sales-psychology', 'systems-for-scale'
  )
)
-- Founder Mindset lessons
insert into public.lessons (course_id, order_index, title, content, duration_minutes, is_preview)
select c.id, l.order_index, l.title, l.content, l.duration_minutes, l.is_preview
from course_ids c
join (
  values
    (1, 'The Nigerian Founder Reality', 'Operating context, constraints as features, antifragility as a strategy.', 12, true),
    (2, 'Identity, Habits, and Focus', 'Systems over goals, weekly review loop, timeboxing for deep work.', 14, false),
    (3, 'Biases and Decision Making', 'OODA loop, expected value thinking, pre-mortems, and base rates.', 13, false),
    (4, 'Resilience and Energy Management', 'Stress frameworks, recovery protocols, and founder mental models.', 15, false),
    (5, 'Narrative and Storytelling', 'Founder narrative arc, positioning, credibility indicators.', 11, false),
    (6, 'Execution Rhythm', 'Quarterly themes, weekly scorecards, daily sprints.', 12, false)
) as l(order_index, title, content, duration_minutes, is_preview)
  on c.slug = 'founder-mindset'
on conflict (course_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  is_preview = excluded.is_preview;

-- Fundraising for Founders lessons
with c as (
  select id from public.courses where slug = 'fundraising-for-founders'
)
insert into public.lessons (course_id, order_index, title, content, duration_minutes, is_preview)
select c.id, l.order_index, l.title, l.content, l.duration_minutes, l.is_preview
from c
cross join (
  values
    (1, 'Funding Landscape in Africa', 'Bootstrapping, grants, angels, venture—trade-offs and timing.', 12, true),
    (2, 'Investor Readiness', 'Metrics that matter, traction narratives, and unit economics basics.', 14, false),
    (3, 'Crafting the Data Room', 'Docs, dashboards, diligence checklists, and hygiene.', 13, false),
    (4, 'Pitch Structure and Story', 'Problem, insight, wedge, momentum—clear and credible pitch.', 15, false),
    (5, 'Term Sheets and Negotiation', 'SAFE vs equity, valuation, dilution, and protective provisions.', 16, false),
    (6, 'Post-Money Ops', 'Investor updates, governance, and runway discipline.', 12, false)
) as l(order_index, title, content, duration_minutes, is_preview)
on conflict (course_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  is_preview = excluded.is_preview;

-- Sales Psychology lessons
with c as (
  select id from public.courses where slug = 'sales-psychology'
)
insert into public.lessons (course_id, order_index, title, content, duration_minutes, is_preview)
select c.id, l.order_index, l.title, l.content, l.duration_minutes, l.is_preview
from c
cross join (
  values
    (1, 'Buyer Psychology 101', 'Trust, risk, status, and clarity—what buyers really buy.', 12, true),
    (2, 'Discovery and Qualification', 'SPICED/CHAMP, problem discovery, and budget authority.', 14, false),
    (3, 'Offers and Objections', 'Designing value props, handling objections without pressure.', 13, false),
    (4, 'Demos that Convert', 'Narrative demos, proof stacking, and next-step anchoring.', 15, false),
    (5, 'Pricing and Negotiation', 'Anchoring, bracketing, and concessions strategy.', 16, false),
    (6, 'Playbooks and Review', 'Pipeline hygiene, call reviews, and compounding systems.', 12, false)
) as l(order_index, title, content, duration_minutes, is_preview)
on conflict (course_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  is_preview = excluded.is_preview;

-- Systems for Scale lessons
with c as (
  select id from public.courses where slug = 'systems-for-scale'
)
insert into public.lessons (course_id, order_index, title, content, duration_minutes, is_preview)
select c.id, l.order_index, l.title, l.content, l.duration_minutes, l.is_preview
from c
cross join (
  values
    (1, 'Principles of Scaling', 'Complexity budgets, constraints, and leverage points.', 12, true),
    (2, 'Process and SOPs', 'Write once, execute repeatably—SOPs, QA, and audits.', 14, false),
    (3, 'Automation and Tooling', 'No-code, APIs, and event-driven automations that stick.', 13, false),
    (4, 'Org Design and Hiring', 'IC vs manager tracks, scorecards, and onboarding systems.', 15, false),
    (5, 'Metrics and Dashboards', 'North stars, leading indicators, and review cadence.', 16, false),
    (6, 'Risk and Incident Response', 'Runbooks, incident reviews, and learning loops.', 12, false)
) as l(order_index, title, content, duration_minutes, is_preview)
on conflict (course_id, order_index) do update set
  title = excluded.title,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  is_preview = excluded.is_preview;
