import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

const BOT_USER_IDS = [
  "bot@investus.kr",
  "bot2@investus.kr",
  "bot-midday@investus.kr",
  "bot-midday2@investus.kr",
  "bot-close@investus.kr",
  "bot-close2@investus.kr",
  "bot-report@investus.kr",
  "bot-report2@investus.kr",
];

// "솔직히" 단어 제거 후 공백 정리
function stripSoljtki(text: string): string {
  return text
    .replace(/솔직히[,\s]*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function randomShares(): string {
  return `${Math.floor(Math.random() * 1001)}주 보유`;
}

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-admin-secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getAdminSupabase();

  // ── 1. 솔직히 content 정리 ────────────────────────────────────────────────
  const { data: posts, error: fetchErr } = await db
    .from("wall_posts")
    .select("id, content, holding_label, user_id")
    .in("user_id", BOT_USER_IDS);

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });

  let contentFixed = 0;
  let labelFixed   = 0;

  for (const post of posts ?? []) {
    const newContent = post.content?.includes("솔직히")
      ? stripSoljtki(post.content)
      : post.content;

    const needsLabelFix =
      !post.holding_label ||
      !/주 보유$/.test(post.holding_label) ||
      ["보유확인", "보유인증", "관심종목", "open", "midday", "close", "report"].includes(post.holding_label);

    const newLabel = needsLabelFix ? randomShares() : post.holding_label;

    const changed =
      newContent !== post.content || newLabel !== post.holding_label;
    if (!changed) continue;

    const { error: upErr } = await db
      .from("wall_posts")
      .update({ content: newContent, holding_label: newLabel })
      .eq("id", post.id);

    if (!upErr) {
      if (newContent !== post.content) contentFixed++;
      if (newLabel !== post.holding_label) labelFixed++;
    }
  }

  return NextResponse.json({
    ok: true,
    scanned: (posts ?? []).length,
    contentFixed,
    labelFixed,
  });
}
