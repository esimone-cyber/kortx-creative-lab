-- Per-ad framing nudge for Captivate share-page previews (px in the 1200x1000 share-page viewport).
alter table public.creatives add column if not exists crop_dx integer not null default 0;
alter table public.creatives add column if not exists crop_dy integer not null default 0;
-- Optional Celtra creative ID: renders the bare ad instead of the cropped share page.
alter table public.creatives add column if not exists celtra_id text;
