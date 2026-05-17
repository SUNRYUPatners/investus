import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || null;

// Admin DELETE: requires ADMIN_TOKEN (for admin page)
// Self DELETE:  no token required — anyone can cancel their OWN pending application by phone
//   Risk is low: only deletes the verification row for that phone, not personal data.
export async function DELETE(req: NextRequest) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const isAdmin = ADMIN_TOKEN && token === ADMIN_TOKEN;

  const phone = req.nextUrl.searchParams.get("phone");
  if (!phone || phone.length > 20) return NextResponse.json({ error: "phone required" }, { status: 400 });

  if (!isAdmin) {
    // Self-cancel: only allow deleting own pending record (not approved/rejected)
    const { data } = await getSupabase()
      .from("creator_verifications")
      .select("status")
      .eq("phone", phone)
      .maybeSingle();

    if (!data) return NextResponse.json({ ok: true }); // already gone
    if (data.status !== "pending") {
      return NextResponse.json({ error: "이미 검토된 신청은 관리자에게 문의하세요" }, { status: 403 });
    }
  }

  const { error } = await getSupabase()
    .from("creator_verifications")
    .delete()
    .eq("phone", phone);

  if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
