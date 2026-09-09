/**
 * Fix truncated US analyst posts (summary.slice mid-sentence).
 * Only rewrites 2026-09-09 and 2026-09-08 blocks — markers must match exactly.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const FILE = path.join(ROOT, "lib/analystPosts.ts");

const ALIASES = [
  "종로 까치 #41", "광화문 여우 #62", "여의도 수리 #28", "송파 독수리 #66", "분당 매 #31",
  "성수 너구리 #15", "한남 재규어 #27", "역삼 판다 #77", "마곡 펠리컨 #63", "마포 살괭이 #08",
  "판교 늑대 #90", "인천 갈매기 #52", "압구정 치타 #44", "잠실 백로 #29", "청담 여우 #11",
  "합정 수달 #07", "이태원 부엉이 #18", "성북 참새 #33", "여의도 학 #12",
];

function clean(s) {
  return s.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

function takeComplete(s, max = 420) {
  let t = clean(s);
  if (t.length > max) {
    const cut = t.lastIndexOf("습니다.", max);
    if (cut >= 80) t = t.slice(0, cut + 4);
  }
  if (!/(습니다|바랍니다|니다)\.?$/.test(t)) {
    const cut = t.lastIndexOf("습니다.");
    if (cut >= 40) t = t.slice(0, cut + 4);
  }
  return t;
}

function usAnalystCopy(r, i) {
  const s = takeComplete(r.summary);
  const modes = [
    () => `표에 숫자만 남깁니다. ${s}`,
    () => `현장 질문부터입니다. ${r.title}`,
    () => `${r.subject}만 따로 보면 ${s}`,
    () => `회의록 한 줄로 정리합니다. ${s}`,
    () => `캘린더 기준으로 보면 ${s}`,
    () => `가정과 실측을 갈랐습니다. ${s}`,
    () => `리스크 칸에 먼저 씁니다. ${s}`,
    () => `다음 게이트만 적습니다. ${s}`,
    () => `한장으로 안 묶습니다. ${s}`,
    () => `정의부터 확인합니다. ${s}`,
  ];
  return modes[i % modes.length]();
}

function buildBlock(label, US, startId, dateIso) {
  return (
    `  // ── ${label} ──────────────────────\n` +
    US.map((r, i) => {
      const id = startId - i;
      const content = usAnalystCopy(r, i);
      return `  {
    id: ${id}, alias: ${JSON.stringify(ALIASES[i % ALIASES.length])}, symbol: ${JSON.stringify(r.pinned ? "MACRO" : (r.tickers && r.tickers[0]) || "MACRO")},
    content: ${JSON.stringify(content)},
    likes: ${14 + (i % 8)}, comments: ${i % 3 === 0 ? 2 : 1}, created_at: "${dateIso}T${String(Math.floor((i * 6) / 60)).padStart(2, "0")}:${String((i * 6) % 60).padStart(2, "0")}:00.000Z", liked: false,
  },`;
    }).join("\n") +
    "\n"
  );
}

function replaceBetween(src, startNeedle, endNeedle, newBlock) {
  const start = src.indexOf(startNeedle);
  if (start < 0) throw new Error(`start missing: ${startNeedle}`);
  const end = src.indexOf(endNeedle, start + startNeedle.length);
  if (end < 0) throw new Error(`end missing: ${endNeedle}`);
  return src.slice(0, start) + newBlock + src.slice(end);
}

let c = fs.readFileSync(FILE, "utf8");

const us09 = require("./data-20260909-us.js").US;
const us08 = require("./data-20260908-us.js").US;

c = replaceBetween(
  c,
  "  // ── 2026-09-09 신규",
  "  // ── 2026-09-08 신규",
  buildBlock("2026-09-09 신규 (18개 · 존댓말 · 구조 혼합)", us09, -1143, "2026-09-09"),
);

c = replaceBetween(
  c,
  "  // ── 2026-09-08 신규",
  "  // ── 2026-09-07",
  buildBlock("2026-09-08 신규 (19개 · 존댓말 · 구조 혼합)", us08, -1124, "2026-09-08"),
);

fs.writeFileSync(FILE, c);

// Verify no mid-sentence cuts in those date ranges
function scan() {
  const re =
    /id:\s*(-?\d+)[\s\S]*?content:\s*"((?:[^"\\]|\\.)*)"[\s\S]*?created_at:\s*"(\d{4}-\d{2}-\d{2})/g;
  let m;
  const bad = [];
  while ((m = re.exec(c))) {
    const created = m[3];
    if (created !== "2026-09-09" && created !== "2026-09-08") continue;
    const text = m[2]
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .trim();
    if (
      /마시기 바$|마시기 바랍$|전기차 점$|킬로와시\)를\s*$|공개되기$|슬로베니아가$|필요합$/.test(
        text,
      ) ||
      (text.length >= 100 &&
        !/(습니다|바랍니다|니다|요|다)\.?$/.test(text) &&
        /[을를이가은는에의와과도로자시바점칸기]$/.test(text))
    ) {
      bad.push({ id: m[1], end: text.slice(-40) });
    }
  }
  return bad;
}

const bad = scan();
if (bad.length) {
  console.error("still truncated:", bad);
  process.exit(1);
}
console.log("✓ fixed 2026-09-09 + 2026-09-08 US analyst posts (complete sentences)");
