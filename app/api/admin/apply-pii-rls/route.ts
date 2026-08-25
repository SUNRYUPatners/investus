import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function probeAnon(): Promise<Record<string, { status: number; rows: number }>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const tables = ["edu_applications", "creator_verifications", "wall_posts", "wall_comments", "push_subscriptions"] as const;
  const result: Record<string, { status: number; rows: number }> = {};
  for (const t of tables) {
    const res = await fetch(`${url}/rest/v1/${t}?select=*&limit=1`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
    });
    const body = await res.json().catch(() => null);
    result[t] = { status: res.status, rows: Array.isArray(body) ? body.length : -1 };
  }
  return result;
}

function isAdmin(req: NextRequest): boolean {
  const secret = req.headers.get("x-admin-secret") ?? "";
  return !!(process.env.ADMIN_SECRET && secret === process.env.ADMIN_SECRET);
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ anonProbe: await probeAnon() });
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const anonProbe = await probeAnon();
  const leaked = Object.values(anonProbe).some((p) => p.status === 200 && p.rows !== 0);
  return NextResponse.json({
    applied: false,
    anonProbe,
    leaked,
    hint: "Supabase SQL Editor에서 supabase/migrations/20260825_lock_pii_rls.sql 을 실행하세요. DB 비밀번호는 이 저장소에 없습니다.",
  }, { status: leaked ? 503 : 200 });
}
