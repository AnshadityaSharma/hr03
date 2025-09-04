create table employees(
 id uuid primary key default gen_random_uuid(),
 employee_id text unique,
 name text,
 email text unique,
 dept text,
 role text,
 manager_id uuid,
 hire_date date default now()
);
create table leaves(
 id uuid primary key default gen_random_uuid(),
 employee_id uuid references employees(id),
 start_date date,
 end_date date,
 reason text,
 status text,
 approver_id uuid,
 created_at timestamptz default now()
);
create table assets_inventory(
 id uuid primary key default gen_random_uuid(),
 asset_type text,
 model text,
 serial text,
 status text
);
create table assets_issued(
 id uuid primary key default gen_random_uuid(),
 employee_id uuid references employees(id),
 inventory_id uuid references assets_inventory(id),
 issued_on date,
 status text
);
create table policy_docs(
 id uuid primary key default gen_random_uuid(),
 title text,
 content text
);
