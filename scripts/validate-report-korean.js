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

/** 허용 약어·고유명 (소문자 비교) */
const ALLOW = new Set([
  "fomc", "etf", "btc", "eth", "hbm", "ota", "cid", "nim", "asp", "pmi", "dxy",
  "nvda", "tsla", "kospi", "semicon", "taiwan", "dram", "capex", "dsr", "ltv",
  "apr", "gdp", "cpi", "spy", "arkk", "mac", "cxmt", "kb", "sk", "ai", "sw", "ev",
  "fx", "usd", "krw", "ipo", "sec", "fed", "gdp", "l2", "sdv", "gu", "pm", "ui",
  "ux", "id", "api", "ceo", "cfo", "coo", "gpu", "cpu", "ram", "mix", "nim",
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

function validateSvgKo(filePath) {
  const errors = [];
  const src = load(filePath);
  for (const re of SVG_BAD_PATTERNS) {
    if (re.test(src)) {
      errors.push(`${filePath}: 한글 SVG 영문 혼입 (${re})`);
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
    const date = chunk.match(/date: "([^"]+)"/)?.[1];
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

function extractQuoted(chunk, key) {
  const idx = chunk.indexOf(key);
  if (idx === -1) return "";
  const rest = chunk.slice(idx + key.length).trimStart();
  if (rest.startsWith('"')) {
    let out = "";
    let i = 1;
    while (i < rest.length) {
      if (rest[i] === "\\") {
        out += rest[i + 1];
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
        out += rest[i + 1];
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
  return "";
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
  if (!r.body || r.isPinned || r.subject === "한장요약") return errors;

  for (const phrase of SECTION_BOILERPLATES) {
    const boilerCount = (r.body.match(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || [])
      .length;
    if (boilerCount >= 2) {
      errors.push(
        `${file} ${r.id} body: 섹션 플레이스홀더 반복 (${boilerCount}회). 상세·장기투자·투자시사점을 분리하세요.`,
      );
      break;
    }
  }

  const detail = extractSection(r.body, "■ 상세");
  const longTerm = extractSection(r.body, "■ 장기 투자 관점");
  const invest = extractSection(r.body, "■ 투자시사점");
  const sections = [
    ["상세", detail],
    ["장기투자", longTerm],
    ["투자시사점", invest],
  ].filter(([, text]) => text.length > 80);

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

function validateRichness(r, file) {
  const errors = [];
  const isSummary =
    r.isPinned ||
    r.subject === "한장요약" ||
    /summary-(kr|safe|krre)/.test(r.id);

  const MIN_SUMMARY_LEN = 90;
  const MIN_BODY_SUMMARY = 800;
  const MIN_BODY_DETAIL = 1000;

  if (r.summary && r.summary.length < MIN_SUMMARY_LEN) {
    errors.push(
      `${file} ${r.id} summary: 너무 짧음 (${r.summary.length}자 < ${MIN_SUMMARY_LEN}자). 8/29 kr-seed-118·safe-seed-107 수준의 팩트 문장으로 보강하세요.`,
    );
  }

  const minBody = isSummary ? MIN_BODY_SUMMARY : MIN_BODY_DETAIL;
  if (r.body && r.body.length < minBody) {
    errors.push(
      `${file} ${r.id} body: 너무 짧음 (${r.body.length}자 < ${minBody}자). seed-994·kr-seed-118·safe-seed-107 길이를 참고하세요.`,
    );
  }

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
    allErrors.push(...validateSvgKo(`public/charts/${name}`));
  }
}

if (allErrors.length > 0) {
  console.error("✗ 한글 리포트·SVG 영문 혼입:\n" + allErrors.map((e) => `  - ${e}`).join("\n"));
  process.exit(1);
}

console.log("✓ 한글 리포트(title/summary/body 분량·섹션) + SVG 영문 스켈레톤 검증 OK");
