import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wfzkmglswaickaglneai.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmemttZ2xzd2FpY2thZ2xuZWFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYyOTUzNywiZXhwIjoyMDk0MjA1NTM3fQ.dyULmplzialWY_mommLinPt58acYF2oQwoXq1Rf7tJQ"
);

const { data, error } = await supabase
  .from("creator_verifications")
  .select("*")
  .order("submitted_at", { ascending: false });

if (error) {
  console.error("Error:", error);
} else {
  console.log("creator_verifications 목록:");
  console.log(JSON.stringify(data, null, 2));
}
