import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wfzkmglswaickaglneai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmemttZ2xzd2FpY2thZ2xuZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYyOTUzNywiZXhwIjoyMDk0MjA1NTM3fQ.dyULmplzialWY_mommLinPt58acYF2oQwoXq1Rf7tJQ"
);

const { data, error } = await supabase.auth.admin.listUsers();
if (error) { console.error(error); process.exit(1); }

console.log("Auth 유저 목록:");
data.users.forEach((u) => {
  console.log(`  id=${u.id}, email=${u.email}, provider=${u.app_metadata?.provider}, naver_id=${u.user_metadata?.naver_id}`);
});
