#!/usr/bin/env node
/**
 * 한글 리포트(title/summary/body)에 영문 키워드 덤프·스켈레톤이 섞였는지 검증.
 * insert-reports 일괄 삽입 시 영문 placeholder 유입 방지.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const VALIDATE_SINCE = "2026-08-29";
/** 분량·섹션 검증 — 9/2 4개 시장 전체 점검 (8/31 레거시·9/1 KR-RE 잔존분 제외) */
const VALIDATE_RICH_SINCE = "2026-09-02";
/** 2026-09-10~ 본문 리셋 — 초보 이해 구조 */
const BODY_RESET_SINCE = "2026-09-10";
/** 2026-09-30~ 개별 3단 — 스크린샷 그대로 + 뉴스 보충 + 기관·하우스 뷰 */
const BODY_HOUSE_SINCE = "2026-09-30";

/** date: "2026.09.04" | "2026-09-04" → "2026-09-04" */
function normalizeDate(d) {
  if (!d) return "";
  return d.replace(/\./g, "-");
}

/** 허용 약어·고유명 (소문자 비교) */
const ALLOW = new Set([
  "fomc", "etf", "btc", "eth", "hbm", "ota", "cid", "nim", "asp", "pmi", "dxy",
  "nvda", "tsla", "kospi", "semicon", "taiwan", "dram", "capex", "dsr", "ltv",
  "apr", "gdp", "cpi", "spy", "arkk", "mac", "cxmt", "kb", "sk", "ai", "sw", "ev",
  "fx", "usd", "krw", "ipo", "sec", "fed", "gdp", "l2", "sdv", "gu", "pm", "ui",
  "ux", "id", "api", "ceo", "cfo", "coo", "gpu", "cpu", "ram", "mix", "nim",
  // 기업명·기술 약어는 한글 문장 안에서도 영어 유지 (2026-09-09~) — 억지 음역 금지
  "asml", "tsmc", "euv", "nbis", "pltr", "nebius", "nvidia", "tesla", "spacex",
  "fsd", "llm", "agi", "ipo", "adr", "etfs", "usd", "mw", "mwh", "gwh",
  // 기관·하우스 뷰에 나오는 영문 하우스명 (2026-09-30~)
  "goldman", "sachs", "morgan", "stanley", "jpmorgan", "barclays", "deutsche",
  "nomura", "wedbush", "mizuho", "jefferies", "bernstein", "blackrock",
  "fidelity", "morningstar", "wellsfargo", "citigroup", "hsbc", "macquarie",
  "overweight", "outperform", "piper", "sandler", "canaccord",
]);

/** 한글 필드에 있으면 실패하는 영문 스켈레톤 패턴 */
const BAD_PATTERNS = [
  /\*\*A\s+[a-z]/i,
  /\bsupply fear\b/i,
  /\bflows vs\b/i,
  /\bTrack mix\b/i,
  /\bhike odds\b/i,
  /\bsafe assets repricing\b/i,
  /\bsoftware UX premium\b/i,
  /\bmacro linked\b/i,
  /\baffordability rotation\b/i,
  /\bSee Korean summary\b/,
  /\bBTC ~\d/i,
  /\bGold ~\d/i,
  /\bETH ~\d/i,
  /\bForeign sell\b/i,
  /\blisting tight\b/i,
  /\bopportunity cost\b/i,
  /\bdecorrelate\b/i,
  /\bunderperform\b/i,
  /\bbarometer\b/i,
  /\bforced sale\b/i,
  /\bpeak-out\b/i,
  /\bheat map\b/i,
  /\btier rotation\b/i,
  /;\s*[a-z]{3,}/, // "BTC ~78128, ETH ~2459;" style dumps
];

/** 본문 섹션에 반복 삽입되던 플레이스홀더 (2회 이상이면 실패) */
const SECTION_BOILERPLATES = [
  "장기 투자자는 단기 헤드라인과 분기 실적·실행 지표를 분리해 기록하시면 변동성에 흔들리지 않습니다",
  "장기 투자자는 단기 수급과 분기 실적·정책 일정을 분리해 기록하시기 바랍니다",
  "히어로 숫자",
  "실측 / 계획 / 의견",
  "실측/계획/의견",
  "하루짜리가 아니라 수년짜리",
  "해자를 기록",
];

/** 1회라도 실패 — 분량 맞추려 섹션마다 붙이던 패딩 문장 */
const FILLER_ONCE = [
  "초보 말로 한 번 더 적습니다",
  "숫자는 오늘 기준이며 다음 화면이 같으면 이야기가 두꺼워집니다",
  "한 번의 고점이나 시가는",
  "오늘 숫자는 화면·집계 기준이며 다음 공시가 같으면",
  "이 아침 추가로 적어 둘 배경입니다",
  "같은 주 숫자만 다시 정리하면",
  "초보가 기억하면 좋은 한 줄은",
];

/** 2026-09-11~ 금지: 초보가 못 읽는 금지·분리 지시문 */
const TONE_BANNED_SINCE = "2026-09-11";
const TONE_BANNED = [
  "칸을 나누",
  "가중치를 낮추",
  "합치지 마시기",
  "추격하지 마시기",
  "한 방향 베팅",
  "레버리지를 키우지",
  "레버리지를 줄이",
  "넣지 마시기",
  "나누시기",
  "다른 화면의 숫자",
];

const HOUSE_NAME_RE =
  /골드만|모건스탠리|JP모건|제이피모건|뱅크오브아메리카|뱅크 오브 아메리카|씨티그룹|씨티증권|바클레이|도이치|노무라|삼성증권|미래에셋|NH투자|한국투자|키움|신한투자|KB증권|대신증권|메리츠|유안타|하나증권|모닝스타|웰스파고|웨드부시|미즈호|제프리스|번스타인|블랙록|피델리티|아크인베스트|맥쿼리|하이투자|교보증권|유진투자|이베스트|한화투자|iM증권|로젠블랫|스팁펠|DS투자|CLSA|UBS|HSBC/;
const HOUSE_PT_RE = /목표가|목표 주가|목표주가|목표 가격|밸류에이션|적정가치|적정 가치|전망/;
const SCREENSHOT_META_SINCE = "2026-09-29";
const SCREENSHOT_META = [
  "보여 줬습니다",
  "가로축은",
  "색깔이 갈렸",
  "화면 복기 카드",
];
/** 2026-09-30~: 제목·요약은 발행 문장. 남의 글을 받아 적는 말투 금지 */
const PUBLISHER_TITLE_SINCE = "2026-09-30";
const PUBLISHER_TITLE_BANNED = [
  "적었습니다",
  "적혔습니다",
  "적혀 있",
  "적혀있",
  "글입니다",
  "글이 있습니다",
  "속보가 있습니다",
  "말이 나왔",
  "차트가 있습니다",
  "그래프 캡션",
  "트림과 가격은 없",
];

/** 2026-09-30~: 영상·사진 설명, 캡처에 없다는 문장 금지 */
const SCREENSHOT_ABSENCE_SINCE = "2026-09-30";
const SCREENSHOT_ABSENCE = [
  "캡처에 없습니다",
  "캡처에 없어",
  "영상 속",
  "글 아래에 있습니다",
  "사진에는",
  "화면에 없습니다",
  "카드에 없습니다",
  "이 글에 없습니다",
];

/** 한글 SVG(-en 제외) caption·본문 텍스트 검증 패턴 */
const SVG_BAD_PATTERNS = [
  /\bBTC ~\d/i,
  /\bgold ~\d/i,
  /\bSept hike\b/i,
  /\bETH-only\b/i,
  /\bshock\b/i,
  /\b odds\b/i,
  /\bbid를\b/i,
  /\bSilver\b/,
  /\b78K\b/,
  /\bgold\/silver ratio\b/i,
  /\baffordability rotation\b/i,
];

function validateSvgKo(filePath, iso) {
  const errors = [];
  const src = load(filePath);
  for (const re of SVG_BAD_PATTERNS) {
    if (re.test(src)) {
      errors.push(`${filePath}: 한글 SVG 영문 혼입 (${re})`);
    }
  }
  if (iso && iso >= TONE_BANNED_SINCE) {
    for (const phrase of TONE_BANNED) {
      if (src.includes(phrase)) {
        errors.push(
          `${filePath}: SVG 금지 말투 "${phrase}" (2026-09-11~). 스크린샷·뉴스 숫자·장면을 그대로 쓰세요.`,
        );
        break;
      }
    }
  }
  if (iso && iso >= SCREENSHOT_META_SINCE && /^summary/.test(path.basename(filePath))) {
    if (src.includes("…") || src.includes("...")) {
      errors.push(
        `${filePath}: 한장 요약 제목이 …로 잘렸습니다. 완전한 문장으로 2줄까지 넣고 말줄임 금지.`,
      );
    }
  }
  return errors;
}

function validateTextFields(text, label) {
  const errors = [];
  for (const re of BAD_PATTERNS) {
    if (re.test(text)) {
      errors.push(`${label}: 영문 스켈레톤 패턴 (${re})`);
      break;
    }
  }
  return errors;
}

function load(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

/** reports-*.ts에서 { id, title, summary, body, date } 추출 (단순 파서) */
function parseReports(src) {
  const reports = [];
  const blocks = src.split(/\n  \{\n    id: "/).slice(1);
  for (const chunk of blocks) {
    const id = chunk.match(/^([^"]+)"/)?.[1];
    const dateRaw = chunk.match(/date: "([^"]+)"/)?.[1];
    const date = normalizeDate(dateRaw);
    if (!id || !date) continue;
    const title = extractQuoted(chunk, "title:");
    const summary = extractQuoted(chunk, "summary:");
    const body = extractBody(chunk);
    const subject = extractQuoted(chunk, "subject:");
    const isPinned = /isPinned:\s*true/.test(chunk);
    reports.push({ id, date, title, summary, body, subject, isPinned });
  }
  return reports;
}

function unescapeTsChar(n) {
  if (n === "n") return "\n";
  if (n === "t") return "\t";
  if (n === "r") return "\r";
  if (n === '"') return '"';
  if (n === "'") return "'";
  if (n === "\\") return "\\";
  return n;
}

function extractQuoted(chunk, key) {
  const idx = chunk.indexOf(key);
  if (idx === -1) return "";
  const rest = chunk.slice(idx + key.length).trimStart();
  if (rest.startsWith('"')) {
    let out = "";
    let i = 1;
    while (i < rest.length) {
      if (rest[i] === "\\") {
        out += unescapeTsChar(rest[i + 1]);
        i += 2;
        continue;
      }
      if (rest[i] === '"') break;
      out += rest[i++];
    }
    return out;
  }
  if (rest.startsWith("'")) {
    let out = "";
    let i = 1;
    while (i < rest.length) {
      if (rest[i] === "\\") {
        out += unescapeTsChar(rest[i + 1]);
        i += 2;
        continue;
      }
      if (rest[i] === "'") break;
      out += rest[i++];
    }
    return out;
  }
  return "";
}

function extractBody(chunk) {
  const bodyIdx = chunk.indexOf("body:");
  if (bodyIdx === -1) return "";
  const rest = chunk.slice(bodyIdx);
  const tpl = rest.match(/body:\s*`([\s\S]*?)`/);
  if (tpl) return tpl[1];
  const fn = rest.match(/body:\s*body\(`([\s\S]*?)`\)/);
  if (fn) return fn[1];
  return extractQuoted(chunk, "body:");
}

function latinWordRatio(text) {
  const words = text.match(/[a-zA-Z]{4,}/g) || [];
  const bad = words.filter((w) => !ALLOW.has(w.toLowerCase()));
  return bad.length;
}

function extractSection(body, heading) {
  const re = new RegExp(
    `${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n\\n([\\s\\S]*?)(\\n\\n■ |\\n\\ninvestus|$)`,
  );
  const m = body.match(re);
  return m ? m[1].trim() : "";
}

function validateSectionSeparation(r, file) {
  const errors = [];
  if (r.date < BODY_RESET_SINCE) return errors;
  if (!r.body) return errors;

  for (const phrase of FILLER_ONCE) {
    if ((r.body && r.body.includes(phrase)) || (r.summary && r.summary.includes(phrase)) || (r.title && r.title.includes(phrase))) {
      errors.push(
        `${file} ${r.id}: 패딩 문장 "${phrase}" 금지. 섹션마다 같은 꼬리를 붙이지 말고 소재별 문단만 쓰세요.`,
      );
      break;
    }
  }

  if (r.isPinned || r.subject === "한장요약") return errors;

  for (const phrase of SECTION_BOILERPLATES) {
    const boilerCount = (r.body.match(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
      .length;
    if (boilerCount >= 2) {
      errors.push(
        `${file} ${r.id} body: 섹션 플레이스홀더 반복 (${boilerCount}회). 소재별 문장으로 다시 쓰세요.`,
      );
      break;
    }
  }

  const useNew = r.date >= BODY_RESET_SINCE;
  const useHouse = r.date >= BODY_HOUSE_SINCE;
  const detail = extractSection(
    r.body,
    useNew ? "■ 무슨 일인가요" : "■ 상세",
  );
  const more = extractSection(r.body, "■ 조금만 더 알려드리면");
  const longTerm = extractSection(
    r.body,
    useNew ? "■ 장기적으로 보면" : "■ 장기 투자 관점",
  );
  const invest = extractSection(
    r.body,
    useNew ? "■ 투자 시사점" : "■ 투자시사점",
  );
  const house = extractSection(r.body, "■ 기관·하우스 뷰");
  const sections = (useHouse
    ? [
        ["무슨 일", detail],
        ["조금만 더", more],
        ["기관·하우스 뷰", house],
      ]
    : [
        [useNew ? "무슨 일" : "상세", detail],
        [useNew ? "장기" : "장기투자", longTerm],
        ["투자시사점", invest],
      ]
  ).filter(([, text]) => text.length > 80);

  for (let i = 0; i < sections.length; i++) {
    for (let j = i + 1; j < sections.length; j++) {
      const [nameA, textA] = sections[i];
      const [nameB, textB] = sections[j];
      const parasA = textA.split(/\n\n+/).map((p) => p.trim()).filter((p) => p.length > 60);
      for (const para of parasA) {
        if (textB.includes(para)) {
          errors.push(
            `${file} ${r.id} body: ■ ${nameA}와 ■ ${nameB} 문단 중복. 섹션 역할을 나누세요.`,
          );
          break;
        }
      }
    }
  }

  return errors;
}

function validateNearDup(r, file) {
  const errors = [];
  if (r.date < BODY_RESET_SINCE) return errors;
  if (!r.body) return errors;
  const { findRepeatSentences, findPairs } = require("./lib/report-similarity");
  const sents = findRepeatSentences(r.body);
  if (sents.length) {
    errors.push(
      `${file} ${r.id} body: 같은 사실을 문장만 바꿔 반복 (${sents.length}쌍, 예: "${sents[0].a}"). 앞 섹션에 적었으면 뒤에서는 새 각도만 쓰세요.`,
    );
  }
  const pairs = findPairs(r.body);
  if (pairs.length) {
    errors.push(
      `${file} ${r.id} body: 유사 문단 ${pairs.length}쌍 (예: ${pairs[0].jaccard}%). 분량 맞추려고 같은 숫자를 다시 쓰지 마세요.`,
    );
  }
  return errors;
}

function validateRichness(r, file) {
  const errors = [];
  const isSummary =
    r.isPinned ||
    r.subject === "한장요약" ||
    /summary-(kr|safe|krre)/.test(r.id);

  const MIN_SUMMARY_LEN = 90;
  const MIN_BODY_SUMMARY = 560;
  const MIN_BODY_DETAIL = 680;

  if (r.summary && r.summary.length < MIN_SUMMARY_LEN) {
    errors.push(
      `${file} ${r.id} summary: 너무 짧음 (${r.summary.length}자 < ${MIN_SUMMARY_LEN}자). 8/29 kr-seed-118·safe-seed-107 수준의 팩트 문장으로 보강하세요.`,
    );
  }

  // 9/9 이전 quoted body는 구 템플릿이 많아 본문 분량·섹션은 2026-09-10부터 강제
  if (r.date < BODY_RESET_SINCE) return errors;

  const minBody = isSummary ? MIN_BODY_SUMMARY : MIN_BODY_DETAIL;
  if (r.body && r.body.length < minBody) {
    errors.push(
      `${file} ${r.id} body: 너무 짧음 (${r.body.length}자 < ${minBody}자). seed-994·kr-seed-118·safe-seed-107 길이를 참고하세요.`,
    );
  }

  const useNew = r.date >= BODY_RESET_SINCE;
  const useHouse = r.date >= BODY_HOUSE_SINCE;

  if (useNew) {
    const requiredSummary = ["■ 오늘의 큰 그림", "■ 투자 시사점"];
    const requiredDetail = useHouse
      ? ["■ 무슨 일인가요", "■ 조금만 더 알려드리면", "■ 기관·하우스 뷰"]
      : [
          "■ 무슨 일인가요",
          "■ 조금만 더 알려드리면",
          "■ 장기적으로 보면",
          "■ 투자 시사점",
        ];
    for (const sec of isSummary ? requiredSummary : requiredDetail) {
      if (r.body && !r.body.includes(sec)) {
        errors.push(`${file} ${r.id} body: 필수 섹션 누락 (${sec})`);
      }
    }

    if (!isSummary && r.body) {
      const whatMatch = r.body.match(/■ 무슨 일인가요\n\n([\s\S]*?)\n\n■/);
      if (whatMatch) {
        const paras = whatMatch[1].split(/\n\n/).filter((p) => p.trim().length > 24);
        if (paras.length < 3) {
          errors.push(
            `${file} ${r.id} body: ■ 무슨 일인가요 문단 부족 (${paras.length}개 < 3개). 스크린샷 글·이모지를 그대로 옮기세요.`,
          );
        }
      }
      const moreMatch = r.body.match(/■ 조금만 더 알려드리면\n\n([\s\S]*?)\n\n■/);
      if (moreMatch) {
        const paras = moreMatch[1].split(/\n\n/).filter((p) => p.trim().length > 24);
        if (paras.length < 2) {
          errors.push(
            `${file} ${r.id} body: ■ 조금만 더 알려드리면 문단 부족 (${paras.length}개 < 2개). 관련 뉴스로 보충하세요.`,
          );
        }
      }
      if (useHouse) {
        if (r.body.includes("■ 장기적으로 보면")) {
          errors.push(
            `${file} ${r.id} body: 2026-09-30~ 개별은 ■ 장기적으로 보면 대신 ■ 기관·하우스 뷰.`,
          );
        }
        if (r.body.includes("■ 투자 시사점")) {
          errors.push(
            `${file} ${r.id} body: 2026-09-30~ 개별은 ■ 투자 시사점 대신 ■ 기관·하우스 뷰로 닫으세요.`,
          );
        }
        const houseMatch = r.body.match(/■ 기관·하우스 뷰\n\n([\s\S]*?)(\n\ninvestus|$)/);
        if (houseMatch) {
          const houseText = houseMatch[1];
          const paras = houseText.split(/\n\n/).filter((p) => p.trim().length > 24);
          if (paras.length < 2) {
            errors.push(
              `${file} ${r.id} body: ■ 기관·하우스 뷰 문단 부족 (${paras.length}개 < 2개).`,
            );
          }
          if (!HOUSE_NAME_RE.test(houseText)) {
            errors.push(
              `${file} ${r.id} body: ■ 기관·하우스 뷰에 대형기관·증권 하우스 이름이 없습니다. 검색한 공개 전망만 쓰세요.`,
            );
          }
          if (!HOUSE_PT_RE.test(houseText)) {
            errors.push(
              `${file} ${r.id} body: ■ 기관·하우스 뷰에 목표가·밸류에이션·전망 숫자가 없습니다. 창작 금지, 검색한 공개값만.`,
            );
          }
        }
      } else {
        const longMatch = r.body.match(/■ 장기적으로 보면\n\n([\s\S]*?)\n\n■/);
        if (longMatch) {
          const paras = longMatch[1].split(/\n\n/).filter((p) => p.trim().length > 24);
          if (paras.length < 2) {
            errors.push(
              `${file} ${r.id} body: ■ 장기적으로 보면 문단 부족 (${paras.length}개 < 2개).`,
            );
          }
        }
        const investMatch = r.body.match(/■ 투자 시사점\n\n([\s\S]*?)(\n\ninvestus|$)/);
        if (investMatch) {
          const paras = investMatch[1].split(/\n\n/).filter((p) => p.trim().length > 20);
          if (paras.length < 2) {
            errors.push(
              `${file} ${r.id} body: ■ 투자 시사점 문단 부족 (${paras.length}개 < 2개).`,
            );
          }
        }
      }
    }

    if (isSummary && r.body) {
      const bigPic = r.body.match(/■ 오늘의 큰 그림\n\n([\s\S]*?)\n\n■/);
      if (bigPic) {
        const paras = bigPic[1].split(/\n\n/).filter((p) => p.trim().length > 24);
        if (paras.length < 3) {
          errors.push(
            `${file} ${r.id} body: ■ 오늘의 큰 그림 문단 부족 (${paras.length}개 < 3개).`,
          );
        }
      }
    }

    return errors;
  }

  // ——— 레거시 (2026-09-09 이하): 구 섹션 구조 ———
  const requiredSummary = ["■ 오늘의 큰 그림", "■ 앞으로 볼 것", "■ 투자시사점"];
  const requiredDetail = [
    "■ 상세",
    "■ 왜 이 뉴스가 중요한가",
    "■ 장기 투자 관점",
    "■ 투자시사점",
  ];
  for (const sec of isSummary ? requiredSummary : requiredDetail) {
    if (r.body && !r.body.includes(sec)) {
      errors.push(`${file} ${r.id} body: 필수 섹션 누락 (${sec})`);
    }
  }

  if (!isSummary && r.body) {
    const detailMatch = r.body.match(/■ 상세\n\n([\s\S]*?)\n\n■/);
    if (detailMatch) {
      const paras = detailMatch[1].split(/\n\n/).filter((p) => p.trim().length > 40);
      if (paras.length < 3) {
        errors.push(
          `${file} ${r.id} body: ■ 상세 문단 부족 (${paras.length}개 < 3개). 배경·숫자·맥락을 문단으로 이어 쓰세요.`,
        );
      }
    }
    const whyMatch = r.body.match(/■ 왜 이 뉴스가 중요한가\n\n([\s\S]*?)\n\n■/);
    if (whyMatch) {
      const items = (whyMatch[1].match(/^\d+\./gm) || []).length;
      if (items < 5) {
        errors.push(
          `${file} ${r.id} body: ■ 왜 항목 부족 (${items}개 < 5개). 번호마다 2~4문장 합니다체.`,
        );
      }
    }
    const investMatch = r.body.match(/■ 투자시사점\n\n([\s\S]*?)(\n\ninvestus|$)/);
    if (investMatch) {
      const paras = investMatch[1].split(/\n\n/).filter((p) => p.trim().length > 30);
      if (paras.length < 2) {
        errors.push(
          `${file} ${r.id} body: ■ 투자시사점 문단 부족 (${paras.length}개 < 2개).`,
        );
      }
    }
  }

  if (isSummary && r.body) {
    const bigPic = r.body.match(/■ 오늘의 큰 그림\n\n([\s\S]*?)\n\n■/);
    if (bigPic) {
      const paras = bigPic[1].split(/\n\n/).filter((p) => p.trim().length > 40);
      if (paras.length < 3) {
        errors.push(
          `${file} ${r.id} body: ■ 오늘의 큰 그림 문단 부족 (${paras.length}개 < 3개). 지수·수급·일정 등 팩트를 문단으로.`,
        );
      }
    }
  }

  return errors;
}

function validateTone(r, file) {
  const errors = [];
  if (!r.date || r.date < TONE_BANNED_SINCE) return errors;
  const fields = [
    ["title", r.title],
    ["summary", r.summary],
    ["body", r.body],
  ];
  for (const [name, val] of fields) {
    if (!val) continue;
    for (const phrase of TONE_BANNED) {
      if (val.includes(phrase)) {
        errors.push(
          `${file} ${r.id} ${name}: 금지 말투 "${phrase}" (2026-09-11~). 스크린샷을 풀고 긍정 장기 뷰로 다시 쓰세요.`,
        );
        break;
      }
    }
  }
  return errors;
}

function validateReport(r, file) {
  const errors = [];
  const fields = [
    ["title", r.title],
    ["summary", r.summary],
    ["body", r.body],
  ];
  for (const [name, val] of fields) {
    if (!val) continue;
    for (const re of BAD_PATTERNS) {
      if (re.test(val)) {
        errors.push(`${file} ${r.id} ${name}: 영문 스켈레톤 패턴 (${re})`);
        break;
      }
    }
    const badLatin = latinWordRatio(val);
    if (name === "summary" && badLatin >= 4) {
      errors.push(`${file} ${r.id} summary: 허용 외 영단어 ${badLatin}개`);
    }
    if (name === "body" && badLatin >= 12) {
      errors.push(`${file} ${r.id} body: 허용 외 영단어 ${badLatin}개 (과다)`);
    }
  }
  errors.push(...validateTone(r, file));
  errors.push(...validateScreenshotTranscript(r, file));
  errors.push(...validatePublisherTitle(r, file));
  return errors;
}

function validatePublisherTitle(r, file) {
  const errors = [];
  if (!r.date || r.date < PUBLISHER_TITLE_SINCE) return errors;
  const text = `${r.title || ""}\n${r.summary || ""}`;
  for (const phrase of PUBLISHER_TITLE_BANNED) {
    if (text.includes(phrase)) {
      errors.push(
        `${file} ${r.id}: 제목·요약은 발행 문장으로 쓰세요 ("${phrase}"). ~적었습니다·~글이 있습니다·~속보가 있습니다 금지.`,
      );
      break;
    }
  }
  return errors;
}

function validateScreenshotTranscript(r, file) {
  const errors = [];
  if (!r.date || r.date < SCREENSHOT_META_SINCE) return errors;
  const text = `${r.summary || ""}\n${r.body || ""}`;
  for (const phrase of SCREENSHOT_META) {
    if (text.includes(phrase)) {
      errors.push(
        `${file} ${r.id}: 스크린샷을 화면 묘사로 쓰지 마세요 ("${phrase}"). 화면에 적힌 글을 거의 그대로 옮긴 뒤 풀이하세요.`,
      );
      break;
    }
  }
  if (r.date >= SCREENSHOT_ABSENCE_SINCE) {
    for (const phrase of SCREENSHOT_ABSENCE) {
      if (text.includes(phrase)) {
        errors.push(
          `${file} ${r.id}: 영상·사진 설명은 넣지 마세요 ("${phrase}"). 적힌 글과 숫자만 옮기세요.`,
        );
        break;
      }
    }
  }
  return errors;
}

const FILES = [
  "lib/reports.ts",
  "lib/reports-kr.ts",
  "lib/reports-safe.ts",
  "lib/reports-kr-re.ts",
];

/** 분량·섹션 검증 대상 (8/31 사고 시장 — US·KR·Safe·KR-RE 4개 시장) */
const RICH_FILES = new Set([
  "lib/reports.ts",
  "lib/reports-kr.ts",
  "lib/reports-safe.ts",
  "lib/reports-kr-re.ts",
]);

const allErrors = [];
for (const file of FILES) {
  const src = load(file);
  const reports = parseReports(src);
  for (const r of reports) {
    if (r.date < VALIDATE_SINCE) continue;
    allErrors.push(...validateReport(r, file));
    if (r.date >= VALIDATE_RICH_SINCE && RICH_FILES.has(file)) {
      allErrors.push(...validateRichness(r, file));
      allErrors.push(...validateSectionSeparation(r, file));
      allErrors.push(...validateNearDup(r, file));
    }
  }
}

// 한글 SVG (public/charts/*YYYYMMDD.svg, *-en.svg 제외)
const chartsDir = path.join(ROOT, "public/charts");
if (fs.existsSync(chartsDir)) {
  for (const name of fs.readdirSync(chartsDir)) {
    if (!name.endsWith(".svg") || name.includes("-en.")) continue;
    const m = name.match(/(\d{8})\.svg$/);
    if (!m) continue;
    const ymd = m[1];
    const iso = `${ymd.slice(0, 4)}-${ymd.slice(4, 6)}-${ymd.slice(6, 8)}`;
    if (iso < VALIDATE_SINCE) continue;
    allErrors.push(...validateSvgKo(`public/charts/${name}`, iso));
  }
}

if (allErrors.length > 0) {
  console.error("✗ 한글 리포트·SVG 영문 혼입:\n" + allErrors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("✓ 한글 리포트(title/summary/body 분량·섹션) + SVG 영문 스켈레톤 검증 OK");
