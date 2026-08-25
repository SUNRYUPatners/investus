-- 애널리스트 공개 글은 API가 service_role로만 읽습니다. anon REST 직접 조회를 막습니다.
alter table if exists public.analyst_posts enable row level security;
alter table if exists public.analyst_post_comments enable row level security;
alter table if exists public.analyst_post_likes enable row level security;
alter table if exists public.analyst_verifications enable row level security;

revoke all on table public.analyst_posts from anon, authenticated;
revoke all on table public.analyst_post_comments from anon, authenticated;
revoke all on table public.analyst_post_likes from anon, authenticated;
revoke all on table public.analyst_verifications from anon, authenticated;

grant all on table public.analyst_posts to service_role;
grant all on table public.analyst_post_comments to service_role;
grant all on table public.analyst_post_likes to service_role;
grant all on table public.analyst_verifications to service_role;
