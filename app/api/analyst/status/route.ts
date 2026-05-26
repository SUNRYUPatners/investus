import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";
import { anonymize } from "@/lib/analystCrypto";

export async function GET(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ status: "none" });

  const { userHash } = anonymize(user.id);

  const { data } = await getAdminSupabase()
    .from("analyst_verifications")
    .select("status, alias, ai_reason")
    .eq("user_hash", userHash)
    .maybeSingle();

  return NextResponse.json({
    status:  data?.status    ?? "none",
    alias:   data?.alias     ?? null,
    reason:  data?.ai_reason ?? null,
  });
}
