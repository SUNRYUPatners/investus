import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wfzkmglswaickaglneai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmemttZ2xzd2FpY2thZ2xuZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYyOTUzNywiZXhwIjoyMDk0MjA1NTM3fQ.dyULmplzialWY_mommLinPt58acYF2oQwoXq1Rf7tJQ"
);

const { error } = await supabase
  .from("creator_verifications")
  .delete()
  .eq("phone", "sunryupatners@gmail.com");

if (error) {
  console.error("삭제 실패:", error);
} else {
  console.log("✅ sunryupatners@gmail.com 크리에이터 등록 삭제 완료");
}

// 삭제 후 확인
const { data } = await supabase.from("creator_verifications").select("phone, nickname, status");
console.log("남은 레코드:", data);
