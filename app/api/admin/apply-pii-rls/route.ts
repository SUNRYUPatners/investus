import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function probeAnon(): Promise<Record<string, { status: number; rows: number }>> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const tables = [
    "edu_applications", "creator_verifications", "push_subscriptions",
    "wall_posts", "wall_comments", "session_chat_messages",
    "analyst_posts", "analyst_post_comments", "analyst_post_likes", "analyst_verifications",
  ] as const;
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
  const leaked = Object.values(anonProbe).some((p) => p.status === 200);
  return NextResponse.json({
    applied: false,
    anonProbe,
    leaked,
    hint: "SQL Editor에서 20260825_lock_pii_rls.sql 와 20260825_lock_analyst_rls.sql 을 실행하세요.",
  }, { status: leaked ? 503 : 200 });
}
