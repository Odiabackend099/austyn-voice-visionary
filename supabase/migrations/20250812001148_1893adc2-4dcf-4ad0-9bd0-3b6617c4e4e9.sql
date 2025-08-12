-- Update existing courses by slug
with data as (
  select * from (values
    ('founder-mindset', 'Founder Mindset', 'Develop the mindset, discipline, and systems top African founders use to build through uncertainty and scale sustainably.', '/courses/founder-mindset.jpg', 0::numeric),
    ('fundraising-for-founders', 'Fundraising for Founders', 'A practical roadmap to funding options in Nigeria and across Africa—grants, angels, revenue financing, and venture capital.', '/courses/fundraising.jpg', 0::numeric),
    ('sales-psychology', 'Sales Psychology', 'Master buyer psychology, objection handling, and repeatable playbooks tailored to African markets.', '/courses/sales-psychology.jpg', 0::numeric),
    ('systems-for-scale', 'Systems for Scale', 'Implement processes, automation, and org design to scale from 0→1→10 sustainably.', '/courses/systems-scale.jpg', 0::numeric)
  ) as t(slug, title, description, cover_url, price)
)
update public.courses c
set title = d.title,
    description = d.description,
    cover_url = d.cover_url,
    price = d.price,
    updated_at = now()
from data d
where c.slug = d.slug;

-- Insert missing courses
with data as (
  select * from (values
    ('founder-mindset', 'Founder Mindset', 'Develop the mindset, discipline, and systems top African founders use to build through uncertainty and scale sustainably.', '/courses/founder-mindset.jpg', 0::numeric),
    ('fundraising-for-founders', 'Fundraising for Founders', 'A practical roadmap to funding options in Nigeria and across Africa—grants, angels, revenue financing, and venture capital.', '/courses/fundraising.jpg', 0::numeric),
    ('sales-psychology', 'Sales Psychology', 'Master buyer psychology, objection handling, and repeatable playbooks tailored to African markets.', '/courses/sales-psychology.jpg', 0::numeric),
    ('systems-for-scale', 'Systems for Scale', 'Implement processes, automation, and org design to scale from 0→1→10 sustainably.', '/courses/systems-scale.jpg', 0::numeric)
  ) as t(slug, title, description, cover_url, price)
)
insert into public.courses (slug, title, description, cover_url, price)
select d.slug, d.title, d.description, d.cover_url, d.price
from data d
where not exists (select 1 from public.courses c where c.slug = d.slug);

-- Insert lessons for Founder Mindset
with c as (
  select id from public.courses where slug = 'founder-mindset'
), lessons_data as (
  select * from (values
    (1, 'The Nigerian Founder Reality', 12),
    (2, 'Identity, Habits, and Focus', 14),
    (3, 'Biases and Decision Making', 13),
    (4, 'Resilience and Energy Management', 15),
    (5, 'Narrative and Storytelling', 11),
    (6, 'Execution Rhythm', 12)
  ) as t(order_index, title, duration)
)
insert into public.lessons (course_id, order_index, title, duration, video_url)
select c.id, l.order_index, l.title, l.duration, null
from c
cross join lessons_data l
where not exists (
  select 1 from public.lessons x
  where x.course_id = c.id and x.order_index = l.order_index
);

-- Insert lessons for Fundraising for Founders
with c as (
  select id from public.courses where slug = 'fundraising-for-founders'
), lessons_data as (
  select * from (values
    (1, 'Funding Landscape in Africa', 12),
    (2, 'Investor Readiness', 14),
    (3, 'Crafting the Data Room', 13),
    (4, 'Pitch Structure and Story', 15),
    (5, 'Term Sheets and Negotiation', 16),
    (6, 'Post-Money Ops', 12)
  ) as t(order_index, title, duration)
)
insert into public.lessons (course_id, order_index, title, duration, video_url)
select c.id, l.order_index, l.title, l.duration, null
from c
cross join lessons_data l
where not exists (
  select 1 from public.lessons x
  where x.course_id = c.id and x.order_index = l.order_index
);

-- Insert lessons for Sales Psychology
with c as (
  select id from public.courses where slug = 'sales-psychology'
), lessons_data as (
  select * from (values
    (1, 'Buyer Psychology 101', 12),
    (2, 'Discovery and Qualification', 14),
    (3, 'Offers and Objections', 13),
    (4, 'Demos that Convert', 15),
    (5, 'Pricing and Negotiation', 16),
    (6, 'Playbooks and Review', 12)
  ) as t(order_index, title, duration)
)
insert into public.lessons (course_id, order_index, title, duration, video_url)
select c.id, l.order_index, l.title, l.duration, null
from c
cross join lessons_data l
where not exists (
  select 1 from public.lessons x
  where x.course_id = c.id and x.order_index = l.order_index
);

-- Insert lessons for Systems for Scale
with c as (
  select id from public.courses where slug = 'systems-for-scale'
), lessons_data as (
  select * from (values
    (1, 'Principles of Scaling', 12),
    (2, 'Process and SOPs', 14),
    (3, 'Automation and Tooling', 13),
    (4, 'Org Design and Hiring', 15),
    (5, 'Metrics and Dashboards', 16),
    (6, 'Risk and Incident Response', 12)
  ) as t(order_index, title, duration)
)
insert into public.lessons (course_id, order_index, title, duration, video_url)
select c.id, l.order_index, l.title, l.duration, null
from c
cross join lessons_data l
where not exists (
  select 1 from public.lessons x
  where x.course_id = c.id and x.order_index = l.order_index
);
