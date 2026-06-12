import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wfzkmglswaickaglneai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmemttZ2xzd2FpY2thZ2xuZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYyOTUzNywiZXhwIjoyMDk0MjA1NTM3fQ.dyULmplzialWY_mommLinPt58acYF2oQwoXq1Rf7tJQ"
);

// 1. Delete existing
const { error: delErr } = await supabase
  .from("creator_verifications")
  .delete()
  .eq("phone", "sunryupatners@gmail.com");

if (delErr) { console.error("삭제 실패:", delErr); process.exit(1); }
console.log("✅ 기존 레코드 삭제 완료");

// 2. Insert clean test creator
const { error: insErr } = await supabase
  .from("creator_verifications")
  .insert({
    phone: "sunryupatners@gmail.com",
    nickname: "가치성장투자의 대가",
    avatar: "🚀",
    bio: "미래가치가 뛰어난, 성장 독점력이 뛰어난 기업에 장기 투자합니다.",
    status: "approved",
    annual_return: 103.69,
    portfolio_scale: "1억~5억",
    top_holdings: [
      { symbol: "TSLA",  name: "테슬라",           allocation: 88.84, returnPct: 100.49 },
      { symbol: "PLTR",  name: "팔란티어",          allocation: 10.16, returnPct: 133.24 },
      { symbol: "IBM",   name: "IBM",              allocation:  0.88, returnPct: 139.76 },
    ],
    tags: ["가치투자", "성장주", "테크"],
    subscription_enabled: false,
    subscription_price: null,
    submitted_at: new Date().toISOString(),
    reviewed_at: new Date().toISOString(),
  });

if (insErr) { console.error("삽입 실패:", insErr); process.exit(1); }
console.log("✅ 테스트 크리에이터 삽입 완료");

// 3. Confirm
const { data } = await supabase
  .from("creator_verifications")
  .select("phone, nickname, status, annual_return, top_holdings");
console.log("현재 DB:", JSON.stringify(data, null, 2));
