import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import { isNYSEHoliday } from "@/lib/marketHours";

export const maxDuration = 60;

type SessionType = "open" | "midday" | "close" | "report";

const TARGET_SYMBOLS = ["NVDA", "TSLA", "AAPL", "MSFT", "PLTR", "META", "AMZN", "AMD"];

// 실제 애널리스트처럼 보이는 alias 풀 — 봇 느낌 전혀 없도록
const ALIAS_POOL = [
  "여의도 독수리 #08", "여의도 매 #33", "여의도 황소 #51", "여의도 표범 #76", "여의도 콘도르 #19",
  "강남 사자 #24", "강남 호랑이 #47", "강남 팔콘 #62", "강남 올빼미 #85", "강남 여우 #13",
  "서초 곰 #39", "서초 늑대 #58", "서초 수리부엉이 #91", "서초 독수리 #27", "서초 매 #64",
  "을지로 황소 #05", "을지로 표범 #43", "을지로 사자 #77", "을지로 팔콘 #16", "을지로 콘도르 #88",
  "광화문 호랑이 #35", "광화문 곰 #52", "광화문 늑대 #69", "광화문 매 #04", "광화문 독수리 #93",
  "마포 수리부엉이 #28", "마포 여우 #46", "마포 올빼미 #73", "마포 황소 #11", "마포 팔콘 #57",
  "판교 사자 #22", "판교 호랑이 #84", "판교 표범 #37", "판교 곰 #66", "판교 늑대 #09",
  "잠실 독수리 #41", "잠실 매 #78", "잠실 콘도르 #53", "잠실 여우 #17", "잠실 황소 #95",
];

// 오늘 날짜 + symbol 기반으로 alias를 결정론적으로 선택 (매번 달라지되 예측 불가)
function pickAlias(seed: string, offset = 0): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0x7fffffff;
  }
  return ALIAS_POOL[(hash + offset) % ALIAS_POOL.length];
}

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

// 세션별 맥락 — 자연스러운 타이밍 느낌
const SESSION_CTX: Record<SessionType, string> = {
  open:   "지금 막 장이 열렸음. 프리마켓이나 어제 마감 느낌 기반으로 오늘 분위기",
  midday: "장 중반 지나고 있음. 오전 흐름 보고 나서 느낀 점",
  close:  "장 방금 마감됨. 오늘 하루 결과 보고 드는 생각, 내일 전망",
  report: "새 리서치 리포트 봤는데 할 말 생김. 리포트 내용이나 종목 현황 관련",
};

async function generatePost(
  symbol: string,
  headlines: string[],
  apiKey: string,
  session: SessionType,
  alias: string
): Promise<string | null> {
  const newsCtx = headlines.slice(0, 6).join("\n- ");
  const sessionCtx = SESSION_CTX[session];

  // 페르소나별 글쓰기 스타일 랜덤화
  const styles = [
    "요즘 내 포지션 얘기 섞어서 솔직하게",
    "공식 리포트엔 못 쓰는 내부 분위기 암시하는 뉘앙스로",
    "숫자 한 개 콕 집어서 그게 왜 중요한지 설명하는 식으로",
    "시장이 틀렸다고 생각하는 포인트 지적하는 식으로",
    "단기 노이즈 무시하고 본질 얘기하는 식으로",
    "남들이 놓치고 있는 포인트 하나 짚어주는 식으로",
  ];
  const style = styles[Math.floor(Math.random() * styles.length)];

  const prompt = `너는 증권사에서 10년 넘게 일하는 애널리스트야. 닉네임은 "${alias}".
공식 리포트 말고 익명 투자자 커뮤니티에 솔직한 시황 코멘트를 짧게 남길 거야.

상황: ${sessionCtx}
종목: ${symbol}

오늘 관련 뉴스:
- ${newsCtx}

작성 스타일: ${style}

규칙:
- 반드시 한국어 구어체 (말하듯이 자연스럽게, "~임", "~함", "~거임" 등)
- 80~180자
- 첫 문장이 뉴스 요약이나 "지정학적" "거시적" 같은 뻔한 말로 시작하면 절대 안 됨
- 종목 특성에 맞는 구체적 수치나 팩트 한 개 이상 언급
- "공식 리포트엔 못 쓰지만", "솔직히", "내부에선", "개인적으론" 같은 표현 자연스럽게 섞기
- 매수/매도 직접 권유 금지
- 이모지 없음
- 코멘트 내용만 바로 출력 (설명·제목·번호 없이)`;

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
        max_tokens: 250,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 20 ? text : null;
  } catch {
    return null;
  }
}

async function generateComment(
  postContent: string,
  symbol: string,
  apiKey: string,
  commentAlias: string
): Promise<string | null> {
  const reactionTypes = [
    "동의하면서 자기 경험 한 마디 추가",
    "살짝 다른 시각 제시하되 싸우는 느낌 없이",
    "구체적인 수치나 팩트로 원글 보완",
    "공감하되 리스크 한 가지 덧붙이기",
  ];
  const reaction = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];

  const prompt = `투자자 커뮤니티에서 아래 글을 읽고 짧게 반응하는 댓글이야. 너는 "${commentAlias}" 닉네임의 애널리스트.

원글 (${symbol}): "${postContent}"

반응 방식: ${reaction}

규칙:
- 한국어 구어체 ("~임", "~함", "~거 같음")
- 25~70자
- 물음표 사용 금지 (질문 형태 금지)
- 선택지나 옵션 나열 금지
- 매매 권유 금지
- 이모지 없음
- 댓글 내용만 바로 출력`;

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

// 애널리스트 탭용 — 공식 리포트 뒤에 숨은 속마음 느낌
async function generateAnalystPost(
  symbol: string,
  headlines: string[],
  apiKey: string,
  session: SessionType,
  alias: string
): Promise<string | null> {
  const newsCtx = headlines.slice(0, 6).join("\n- ");
  const sessionCtx = SESSION_CTX[session];

  const angles = [
    "리포트 목표주가와 내 실제 뷰의 갭을 암시하는 방식으로",
    "시장 컨센서스가 놓치고 있는 포인트를 지적하는 방식으로",
    "최근 데이터 포인트 하나를 콕 집어서 그 함의를 설명하는 방식으로",
    "단기 노이즈 vs 중장기 본질을 대비시키는 방식으로",
    "공식 발표 뒤에 있는 내부 분위기를 암시하는 방식으로",
  ];
  const angle = angles[Math.floor(Math.random() * angles.length)];

  const prompt = `너는 증권사 리서치센터에서 일하는 애널리스트. 닉네임 "${alias}".
익명 투자자 커뮤니티 '애널들은 탭'에 오늘의 시황 코멘트를 솔직하게 남길 거야.

상황: ${sessionCtx}
종목: ${symbol}

오늘 관련 뉴스:
- ${newsCtx}

접근 방식: ${angle}

규칙:
- 반드시 한국어 구어체 ("~임", "~함", "~거임", "~하는 중" 등)
- 100~220자
- 첫 문장이 뉴스 요약이나 거시 지표 언급으로 시작하면 절대 안 됨 — 바로 본론부터
- 구체적인 수치(%, $, 배수 등) 한 개 이상 포함
- "공식 리포트엔 못 쓰지만", "솔직히", "내부에선", "개인 계좌로는", "팀에서" 같은 표현 자연스럽게 포함
- 매수/매도 직접 권유 금지
- 이모지 없음
- 코멘트 내용만 바로 출력`;

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
        max_tokens: 350,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return null;
    const data = await res.json() as { content?: { text: string }[] };
    const text = data.content?.[0]?.text?.trim() ?? "";
    return text.length >= 20 ? text : null;
  } catch {
    return null;
  }
}

async function generateAnalystComment(
  postContent: string,
  symbol: string,
  apiKey: string,
  commentAlias: string
): Promise<string | null> {
  const reactions = [
    "동의하면서 근거 데이터 한 줄 추가",
    "다른 각도에서 보완하는 시각 제시",
    "공감하되 반대 리스크 하나 언급",
    "팀 내부 분위기도 비슷하다는 뉘앙스로 공감",
  ];
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];

  const prompt = `애널리스트 커뮤니티에서 아래 코멘트 읽고 짧게 반응하는 댓글이야. 너는 "${commentAlias}".

원문 (${symbol}): "${postContent}"

반응 방식: ${reaction}

규칙:
- 한국어 구어체 ("~임", "~함", "~거 같음")
- 30~90자
- 물음표 금지
- 선택지 나열 금지
- 매매 권유 금지
- 이모지 없음
- 댓글 내용만 바로 출력`;

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
        max_tokens: 150,
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

// 세션별 봇 user_id (DB 중복 체크용, 노출 안 됨)
const BOT_USER_IDS: Record<SessionType, { post: string; comment: string }> = {
  open:   { post: "bot@investus.kr",        comment: "bot2@investus.kr" },
  midday: { post: "bot-midday@investus.kr",  comment: "bot-midday2@investus.kr" },
  close:  { post: "bot-close@investus.kr",   comment: "bot-close2@investus.kr" },
  report: { post: "bot-report@investus.kr",  comment: "bot-report2@investus.kr" },
};

const PICK_COUNT: Record<SessionType, number> = {
  open: 3, midday: 2, close: 2, report: 2,
};

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;
  if (secret && auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // NYSE 휴일이면 글 생성 스킵 (Memorial Day, 독립기념일 등)
  const sessionParam = req.nextUrl.searchParams.get("session");
  const isReportSession = sessionParam === "report";
  if (!isReportSession && isNYSEHoliday()) {
    return NextResponse.json({ ok: false, reason: "NYSE holiday — no posts generated" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "no api key" }, { status: 503 });
  }

  const session: SessionType =
    sessionParam === "midday" ? "midday" :
    sessionParam === "close"  ? "close"  :
    sessionParam === "report" ? "report" : "open";

  const db = getAdminSupabase();
  const headlines = await fetchNewsHeadlines();
  const today = new Date().toISOString().slice(0, 10);

  const shuffled = [...TARGET_SYMBOLS].sort(() => Math.random() - 0.5);
  const picks = shuffled.slice(0, PICK_COUNT[session]);
  const { post: botPost, comment: botComment } = BOT_USER_IDS[session];

  const results: {
    symbol: string;
    session: string;
    postId?: number;
    commentId?: number;
    analystPostId?: number;
    analystCommentId?: number;
    error?: string;
  }[] = [];

  for (let i = 0; i < picks.length; i++) {
    const symbol = picks[i];
    const result: typeof results[0] = { symbol, session };

    // alias를 종목+날짜+세션+인덱스로 결정론적으로 선택 (매 실행마다 다르게)
    const aliasSeed = `${symbol}_${today}_${session}_${i}_${Date.now().toString().slice(-4)}`;
    const wallAlias = pickAlias(aliasSeed, 0);
    const commentAlias = pickAlias(aliasSeed, 7);
    const analystAlias = pickAlias(aliasSeed, 14);
    const analystCommentAlias = pickAlias(aliasSeed, 21);

    // ── 종토방(wall_posts) 글 ──
    const content = await generatePost(symbol, headlines, apiKey, session, wallAlias);
    if (!content) {
      result.error = "generation failed";
      results.push(result);
      continue;
    }

    const botSeed = `${botPost}_${symbol}_${today}`;
    const nickname = makeAnonNick(botSeed);

    const { data: existing } = await db
      .from("wall_posts")
      .select("id")
      .eq("symbol", symbol)
      .eq("user_id", botPost)
      .gte("created_at", `${today}T00:00:00.000Z`)
      .maybeSingle();

    if (!existing) {
      const { data: post, error: postErr } = await db
        .from("wall_posts")
        .insert({ symbol, user_id: botPost, nickname, holding_label: session, content })
        .select("id")
        .single();

      if (postErr || !post) {
        result.error = String(postErr?.message);
      } else {
        result.postId = post.id;

        const commentText = await generateComment(content, symbol, apiKey, commentAlias);
        if (commentText) {
          const commentSeed = `${botComment}_${symbol}_${today}`;
          const { data: comment } = await db
            .from("wall_comments")
            .insert({
              post_id: post.id,
              user_id: botComment,
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

    // ── 애널리스트 탭(analyst_posts) 글 ──
    const analystContent = await generateAnalystPost(symbol, headlines, apiKey, session, analystAlias);
    if (analystContent) {
      const { data: existingAnalyst } = await db
        .from("analyst_posts")
        .select("id")
        .eq("symbol", symbol)
        .eq("alias", analystAlias)
        .gte("created_at", `${today}T00:00:00.000Z`)
        .maybeSingle();

      if (!existingAnalyst) {
        const { data: analystPost, error: analystErr } = await db
          .from("analyst_posts")
          .insert({ symbol, alias: analystAlias, content: analystContent, likes: 0 })
          .select("id")
          .single();

        if (!analystErr && analystPost) {
          result.analystPostId = analystPost.id;

          const analystCommentText = await generateAnalystComment(analystContent, symbol, apiKey, analystCommentAlias);
          if (analystCommentText) {
            const { data: analystComment } = await db
              .from("analyst_post_comments")
              .insert({
                post_id: analystPost.id,
                alias: analystCommentAlias,
                content: analystCommentText,
              })
              .select("id")
              .single();

            if (analystComment) result.analystCommentId = analystComment.id;
          }
        }
      }
    }

    results.push(result);
  }

  return NextResponse.json({ ok: true, session, results });
}
