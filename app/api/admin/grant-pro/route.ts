import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

/**
 * Pro 활성화 — ADMIN_SECRET 헤더 필요
 * POST { email: string, pro?: boolean }
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret") ?? "";
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { email, pro = true } = body as { email?: string; pro?: boolean };
  if (!email?.trim()) {
    return NextResponse.json({ error: "email 필요" }, { status: 400 });
  }

  const admin = getAdminSupabase();
  const { data: list, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 });
  if (listErr) {
    return NextResponse.json({ error: listErr.message }, { status: 500 });
  }

  const user = list.users.find((u) => u.email?.toLowerCase() === email.trim().toLowerCase());
  if (!user) {
    return NextResponse.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
  }

  const { error } = await admin.auth.admin.updateUserById(user.id, {
    user_metadata: { ...user.user_metadata, investus_pro: pro === true },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: user.id, email: user.email, investus_pro: pro === true });
}
