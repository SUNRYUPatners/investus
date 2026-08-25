-- 익명 키로 고객 이메일·수강신청·종토방 user_id가 읽히던 권한을 잠급니다.
-- 앱 API는 service_role만 사용합니다. 실행: Supabase SQL Editor 또는
-- POST /api/admin/apply-pii-rls 은 SQL을 실행하지 않고 anon 노출만 점검합니다.

alter table if exists public.edu_applications enable row level security;
alter table if exists public.creator_verifications enable row level security;
alter table if exists public.push_subscriptions enable row level security;
alter table if exists public.wall_posts enable row level security;
alter table if exists public.wall_comments enable row level security;

revoke all on table public.edu_applications from anon, authenticated;
revoke all on table public.creator_verifications from anon, authenticated;
revoke all on table public.push_subscriptions from anon, authenticated;
revoke all on table public.wall_posts from anon, authenticated;
revoke all on table public.wall_comments from anon, authenticated;

grant all on table public.edu_applications to service_role;
grant all on table public.creator_verifications to service_role;
grant all on table public.push_subscriptions to service_role;
grant all on table public.wall_posts to service_role;
grant all on table public.wall_comments to service_role;
