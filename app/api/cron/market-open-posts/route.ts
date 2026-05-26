import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";

export const maxDuration = 60;

type SessionType = "open" | "midday" | "close" | "report";

// 서학개미 주요 종목
const TARGET_SYMBOLS = ["NVDA", "TSLA", "AAPL", "MSFT", "PLTR", "META", "AMZN", "AMD"];

const SESSION_CONFIG: Record<SessionType, {
  label: string;
  pickCount: number;
  botUserId: string;
  botCommentUserId: string;
  promptContext: string;
  // 애널리스트 탭 봇 alias
  analystAlias: string;
  analystCommentAlias: string;
}> = {
  open: {
    label: "장시작",
    pickCount: 3,
    botUserId: "bot@investus.kr",
    botCommentUserId: "bot2@investus.kr",
    promptContext: "오늘 장이 막 시작되었습니다. 장 시작 분위기와 기대감 위주로",
    analystAlias: "여의도 봇 #01",
    analystCommentAlias: "강남 봇 #02",
  },
  midday: {
    label: "장중",
    pickCount: 2,
    botUserId: "bot-midday@investus.kr",
    botCommentUserId: "bot-midday2@investus.kr",
    promptContext: "지금 장 중간(장중)입니다. 오전 흐름을 반영한 현재 시황 위주로",
    analystAlias: "서초 봇 #11",
    analystCommentAlias: "판교 봇 #12",
  },
  close: {
    label: "장마감",
    pickCount: 2,
    botUserId: "bot-close@investus.kr",
    botCommentUserId: "bot-close2@investus.kr",
    promptContext: "장이 마감되었습니다. 오늘 하루 마감 소감과 내일 전망 위주로",
    analystAlias: "마포 봇 #21",
    analystCommentAlias: "용산 봇 #22",
  },
  report: {
    label: "리포트",
    pickCount: 2,
    botUserId: "bot-report@investus.kr",
    botCommentUserId: "bot-report2@investus.kr",
    promptContext: "새 리서치 리포트가 업로드되었습니다. 해당 종목의 밸류에이션 및 최근 이슈 위주로",
    analystAlias: "리서치 봇 #31",
    analystCommentAlias: "스터디 봇 #32",
  },
};

function makeAnonNick(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0x7fffffff;
  }
  return `익명_${String(hash % 10000).padStart(4, "0")}`;
}

async function fetchNewsHeadlines(): Promise<string[]> {
  const token = process.env.FINNHUB_API_KEY ?? "";
  if (!token) return [];
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/news?category=general&minId=0&token=${token}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return [];
    const items = await res.json() as { headline: string }[];
    return items.slice(0, 15).map((n) => n.headline);
  } catch {
    return [];
  }
}

async function generatePost(
  symbol: string,
  headlines: string[],
  apiKey: string,
  session: SessionType
): Promise<string | null> {
  const newsContext = headlines.slice(0, 5).join("\n- ");
  const ctx = SESSION_CONFIG[session].promptContext;

  const prompt = `다음 오늘의 뉴스 헤드라인을 참고하여, ${symbol} 종목에 대한 한국 서학개미 투자자 관점의 짧은 의견을 작성해줘.

현재 상황: ${ctx}

오늘 뉴스:
- ${newsContext}

작성 규칙:
- 반드시 한국어로 작성
- 50~150자 이내
- 투자자 커뮤니티 말투 (구어체, 자연스럽게)
- 수익 보장이나 매수/매도 권유 절대 금지
- 해당 종목이 뉴스와 관련 없더라도 최근 시장 분위기 기반으로 작성
- 이모지 1~2개 사용
- 의견글 형태로만 작성 (설명글 X)`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 10 ? text : null;
  } catch {
    return null;
  }
}

async function generateComment(postContent: string, symbol: string, apiKey: string): Promise<string | null> {
  const prompt = `다음 투자자 의견글에 짧게 반응하는 댓글 하나를 작성해줘.

원글 (${symbol}):
"${postContent}"

규칙:
- 한국어, 20~60자
- 공감·동의·가벼운 의견을 서술문으로만 작성
- 질문형 문장 절대 금지 (물음표 사용 금지)
- 선택지·옵션 제시 절대 금지
- 수익 보장·매매 권유 금지
- 이모지 0~1개
- 설명 없이 댓글 내용만 바로 출력`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 100,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 5 ? text : null;
  } catch {
    return null;
  }
}

// 애널리스트 탭용 — 전문 리서치 말투로 작성
async function generateAnalystPost(
  symbol: string,
  headlines: string[],
  apiKey: string,
  session: SessionType
): Promise<string | null> {
  const newsContext = headlines.slice(0, 5).join("\n- ");
  const ctx = SESSION_CONFIG[session].promptContext;

  const prompt = `다음 뉴스 헤드라인을 참고하여, ${symbol} 종목에 대한 전문 애널리스트 관점의 시황 코멘트를 작성해줘.

현재 상황: ${ctx}

오늘 뉴스:
- ${newsContext}

작성 규칙:
- 반드시 한국어로 작성
- 80~200자 이내
- 증권사 리서치 리포트 스타일의 전문적이고 간결한 문어체
- 밸류에이션·실적·기술적 관점 중 하나 이상 포함
- 수익 보장·투자 권유 절대 금지
- 이모지 사용 금지
- 코멘트 내용만 바로 출력 (제목·헤더 없이)`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 10 ? text : null;
  } catch {
    return null;
  }
}

// 애널리스트 탭용 댓글 — 전문적 반응
async function generateAnalystComment(postContent: string, symbol: string, apiKey: string): Promise<string | null> {
  const prompt = `다음 애널리스트 코멘트에 간결하게 동의하거나 추가 인사이트를 더하는 짧은 코멘트를 작성해줘.

원문 (${symbol}):
"${postContent}"

규칙:
- 한국어, 30~80자
- 전문적인 문어체 서술문으로만 작성
- 질문형 절대 금지 (물음표 사용 금지)
- 투자 권유·수익 보장 금지
- 이모지 사용 금지
- 내용만 바로 출력`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 120,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 5 ? text : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  // Verify Vercel cron secret
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no api key" }, { status: 503 });
  }

  const sessionParam = req.nextUrl.searchParams.get("session");
  const session: SessionType =
    sessionParam === "midday" ? "midday" :
    sessionParam === "close"  ? "close"  :
    sessionParam === "report" ? "report" : "open";

  const cfg = SESSION_CONFIG[session];
  const db = getAdminSupabase();
  const headlines = await fetchNewsHeadlines();

  const shuffled = [...TARGET_SYMBOLS].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, cfg.pickCount);

  const results: {
    symbol: string;
    session: string;
    postId?: number;
    commentId?: number;
    analystPostId?: number;
    analystCommentId?: number;
    error?: string;
  }[] = [];

  for (const symbol of picks) {
    const today = new Date().toISOString().slice(0, 10);
    const result: typeof results[0] = { symbol, session };

    // ── 종토방(wall_posts) 글 생성 ──
    const content = await generatePost(symbol, headlines, apiKey, session);
    if (!content) {
      result.error = "generation failed";
      results.push(result);
      continue;
    }

    const botSeed = `${cfg.botUserId}_${symbol}_${today}`;
    const nickname = makeAnonNick(botSeed);

    const { data: existing } = await db
      .from("wall_posts")
      .select("id")
      .eq("symbol", symbol)
      .eq("user_id", cfg.botUserId)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .maybeSingle();

    if (!existing) {
      const { data: post, error: postErr } = await db
        .from("wall_posts")
        .insert({ symbol, user_id: cfg.botUserId, nickname, holding_label: cfg.label, content })
        .select("id")
        .single();

      if (postErr || !post) {
        result.error = String(postErr?.message);
      } else {
        result.postId = post.id;

        const commentText = await generateComment(content, symbol, apiKey);
        if (commentText) {
          const commentSeed = `${cfg.botCommentUserId}_${symbol}_${today}`;
          const { data: comment } = await db
            .from("wall_comments")
            .insert({
              post_id: post.id,
              user_id: cfg.botCommentUserId,
              nickname: makeAnonNick(commentSeed),
              content: commentText,
              parent_id: null,
            })
            .select("id")
            .single();

          if (comment) {
            result.commentId = comment.id;
            await db.from("wall_posts").update({ comments: 1 }).eq("id", post.id);
          }
        }
      }
    }

    // ── 애널리스트 탭(analyst_posts) 글 생성 ──
    const analystContent = await generateAnalystPost(symbol, headlines, apiKey, session);
    if (analystContent) {
      // 오늘 같은 alias + symbol로 이미 올린 글이 있으면 skip
      const { data: existingAnalyst } = await db
        .from("analyst_posts")
        .select("id")
        .eq("symbol", symbol)
        .eq("alias", cfg.analystAlias)
        .gte("created_at", `${today}T00:00:00.000Z`)
        .maybeSingle();

      if (!existingAnalyst) {
        const { data: analystPost, error: analystErr } = await db
          .from("analyst_posts")
          .insert({ symbol, alias: cfg.analystAlias, content: analystContent, likes: 0 })
          .select("id")
          .single();

        if (!analystErr && analystPost) {
          result.analystPostId = analystPost.id;

          const analystCommentText = await generateAnalystComment(analystContent, symbol, apiKey);
          if (analystCommentText) {
            const { data: analystComment } = await db
              .from("analyst_post_comments")
              .insert({
                post_id: analystPost.id,
                alias: cfg.analystCommentAlias,
                content: analystCommentText,
              })
              .select("id")
              .single();

            if (analystComment) {
              result.analystCommentId = analystComment.id;
            }
          }
        }
      }
    }

    results.push(result);
  }

  return NextResponse.json({ ok: true, session, results });
}
