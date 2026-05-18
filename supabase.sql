create table if not exists codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  product text not null,
  status text not null default 'unused',
  roblox_username text,
  created_at timestamp with time zone default now(),
  used_at timestamp with time zone
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  product text not null,
  roblox_username text not null,
  status text not null default 'waiting',
  created_at timestamp with time zone default now(),
  delivered_at timestamp with time zone
);

alter table codes enable row level security;
alter table orders enable row level security;

-- Örnek kodlar
insert into codes (code, product) values
('HACVAS78433', 'HARVESTER'),
('ICE99221', 'ICEPIERCER'),
('BAT77881', 'BATWING SET')
on conflict (code) do nothing;
