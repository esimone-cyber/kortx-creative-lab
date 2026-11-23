-- Per-ad framing size (px added to the crop width in the 1200x1000 share-page viewport; negative = enlarge the ad).
alter table public.creatives add column if not exists crop_dw integer not null default 0;
