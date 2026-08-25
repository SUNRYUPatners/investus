import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || null;

export async function DELETE(req: NextRequest) {
  const auth  = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  const isAdmin = !!(ADMIN_TOKEN && token === ADMIN_TOKEN);
  const db = getAdminSupabase();

  if (isAdmin) {
    const phone = req.nextUrl.searchParams.get("phone");
    if (!phone || phone.length > 200) return NextResponse.json({ error: "phone required" }, { status: 400 });
    const { error } = await db.from("creator_verifications").delete().eq("phone", phone);
    if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const authUser = await getUserFromRequest(req);
  if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await db
    .from("creator_verifications")
    .select("status")
    .eq("phone", authUser.email)
    .maybeSingle();

  if (!data) return NextResponse.json({ ok: true });
  if (data.status !== "pending") {
    return NextResponse.json({ error: "이미 검토된 신청은 관리자에게 문의하세요" }, { status: 403 });
  }

  const { error } = await db.from("creator_verifications").delete().eq("phone", authUser.email);
  if (error) return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
