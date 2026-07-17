-- 포트원 V2 정기결제 스키마
-- 실행: Supabase Dashboard → SQL Editor 에서 이 파일 붙여넣기

-- 구독 (billingKey 기반 정기결제)
create table if not exists portone_subscriptions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  user_email      text not null,
  plan_kind       text not null,          -- 'pro' | 'creator'
  plan_ref        text,                    -- creator subscription 시 creator_id
  billing_key     text not null,           -- PortOne billingKey
  status          text not null default 'active', -- 'active' | 'cancelled' | 'failed' | 'past_due'
  price_krw       integer not null,
  next_billing_at timestamptz not null,
  last_charged_at timestamptz,
  last_payment_id text,
  cancelled_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique (user_id, plan_kind, plan_ref)
);

create index if not exists idx_portone_sub_user      on portone_subscriptions (user_id);
create index if not exists idx_portone_sub_status    on portone_subscriptions (status);
create index if not exists idx_portone_sub_next      on portone_subscriptions (next_billing_at) where status = 'active';

-- 결제 이벤트 로그 (모든 성공/실패 결제 기록)
create table if not exists portone_payments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete set null,
  user_email      text,
  payment_id      text not null unique,    -- 포트원 paymentId
  subscription_id uuid references portone_subscriptions(id) on delete set null,
  item_kind       text not null,          -- 'pro' | 'creator' | 'ebook'
  item_ref        text,                    -- ebook: 상품ID, creator: creator_id
  amount_krw      integer not null,
  status          text not null,          -- 'paid' | 'failed' | 'cancelled' | 'refunded'
  pg_provider     text,                    -- 'INICIS' | 'TOSSPAYMENTS' | 'KAKAOPAY' 등
  raw_event       jsonb,                    -- 웹훅 원본 저장
  paid_at         timestamptz,
  created_at      timestamptz not null default now()
);

create index if not exists idx_portone_pay_user    on portone_payments (user_id);
create index if not exists idx_portone_pay_status  on portone_payments (status);
create index if not exists idx_portone_pay_kind    on portone_payments (item_kind);

-- 자동 updated_at 트리거
create or replace function bump_portone_sub_updated_at() returns trigger as $$
begin
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tr_portone_sub_updated on portone_subscriptions;
create trigger tr_portone_sub_updated
  before update on portone_subscriptions
  for each row execute function bump_portone_sub_updated_at();

-- RLS 정책 (사용자는 본인 것만 조회, 서비스 role만 쓰기)
alter table portone_subscriptions enable row level security;
alter table portone_payments enable row level security;

drop policy if exists "own_sub_read"  on portone_subscriptions;
drop policy if exists "own_pay_read"  on portone_payments;
create policy "own_sub_read" on portone_subscriptions for select using (auth.uid() = user_id);
create policy "own_pay_read" on portone_payments      for select using (auth.uid() = user_id);
