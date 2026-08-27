#!/usr/bin/env python3
"""Replace TOPICS and summary rows in build-report-update-20260828.mjs for Aug 28."""
import re
from pathlib import Path

path = Path(__file__).parent / "build-report-update-20260828.mjs"
text = path.read_text(encoding="utf-8")

summary_ko = """  const rows = ko ? [
    { stroke: '#60a5fa', fill: '#0a1420', title: '엔비디아가 정규장에서 8.74% 급등하며 기술주 랠리를 이끌었습니다', body: '나스닥 +1.57%, S&P500 +0.72%로 마감했습니다. 3분기 매출 전망 1,080억 달러가 핵심입니다.', stat: 'NVDA' },
    { stroke: '#94a3b8', fill: '#0f1419', title: '오늘 잭슨홀에서 워시 연준 의장의 첫 기조연설이 예정돼 있습니다', body: '인플레이션·30년물 국채·추가 금리 인상 가능성에 대한 단서를 찾을 것으로 보입니다.', stat: 'JH' },
    { stroke: '#facc15', fill: '#1a1600', title: '미국 전력망 보호 행정명령이 전력기기·변압器주를 들썩이게 했습니다', body: '미국 현지 생산 거점을 둔 업체의 경쟁력이 부각됐습니다.', stat: 'PWR' },
    { stroke: '#ef4444', fill: '#1a0a0a', title: '30년물 국채 금리가 5.31%까지 올라 장기 금리 부담이 커졌습니다', body: '재정·발행 우려와 연준 메시지가 겹치는 구간입니다.', stat: '5.31%' },
    { stroke: '#a78bfa', fill: '#120b1f', title: '비트코인은 약 78,800달러 부근에서 잭슨홀을 앞두고 관망했습니다', body: '위험자산·유동성·달러 방향에 민감하게 반응할 이벤트입니다.', stat: 'BTC' },
    { stroke: '#4ade80', fill: '#061209', title: '한국 증시도 엔비디아 후속과 전력기기 강세로 7,000선을 재시도했습니다', body: '코스피 6,984.95(+1.05%)로 마감했습니다.', stat: 'KR' },
  ]"""

summary_en = """  ] : [
    { stroke: '#60a5fa', fill: '#0a1420', title: 'Nvidia rallied 8.74% in the regular session', body: 'Nasdaq +1.57%, S&P 500 +0.72%. Q3 revenue guide of $108B is the key.', stat: 'NVDA' },
    { stroke: '#94a3b8', fill: '#111827', title: 'Jackson Hole: Chair Warsh keynote today', body: 'Markets seek clues on inflation, 30Y yields, and hikes.', stat: 'JH' },
    { stroke: '#facc15', fill: '#1a1600', title: 'US grid protection order lifted power equipment', body: 'Names with US manufacturing footprints gained.', stat: 'PWR' },
    { stroke: '#ef4444', fill: '#1a0a0a', title: '30-year Treasury yield reached 5.31%', body: 'Long-end pressure overlaps with Fed messaging.', stat: '5.31%' },
    { stroke: '#a78bfa', fill: '#1a1030', title: 'Bitcoin near $78,800 ahead of Jackson Hole', body: 'Sensitive to liquidity, USD, and risk tone.', stat: 'BTC' },
    { stroke: '#4ade80', fill: '#0a1a0a', title: 'Korea retested 7,000 on NVDA spillover', body: 'KOSPI closed 6,984.95 (+1.05%).', stat: 'KR' },
  ];"""

text = re.sub(
    r"  const rows = ko \? \[.*?\] : \[.*?\];",
    summary_ko + "\n" + summary_en,
    text,
    count=1,
    flags=re.S,
)

footer_ko = "더 볼 것: NVDA +8.74% · 잭슨홀 워시 · 전력망 EO · 30년물 5.31% · BTC 78,800 · 코스피 7,000 재시도"
footer_en = "Also: NVDA +8.74% · Jackson Hole Warsh · grid EO · 30Y 5.31% · BTC ~78.8K · KOSPI 7K retest"
text = re.sub(
    r"\? '더 볼 것:.*?'",
    f"? '{footer_ko}'",
    text,
    count=1,
)
text = re.sub(
    r": 'Also:.*?';",
    f": '{footer_en}';",
    text,
    count=1,
)

# Replace buildSeedSummary block
new_summary_fn = '''function buildSeedSummary() {
  return `  // ── 2026-08-28 신규 ──────────────────────────────────────────────────────
  { id: "seed-1301", title: '2026년 8월 28일 한장 요약입니다. 엔비디아 8.74% 급등·잭슨홀 워시 연설·전력망 행정명령·30년물 5.31%·비트코인·코스피 7,000 재시도를 모았습니다', summary: '엔비디아가 정규장에서 8.74% 급등하며 나스닥 +1.57%, S&P500 +0.72%로 마감했습니다. 3분기 매출 전망 1,080억 달러가 핵심입니다. 오늘 잭슨홀 워시 연준 의장 연설, 미국 전력망 보호 행정명령, 30년물 5.31%, 비트코인 약 78,800달러, 코스피 6,984.95(+1.05%) 7,000 재시도도 같이 보시기 바랍니다.',
    body: "",
    titleEn: 'Daily snapshot August 28, 2026: NVDA +8.74%, Jackson Hole Warsh, grid EO, 30Y 5.31%, BTC, KOSPI 7K retest',
    summaryEn: 'Nvidia +8.74%, Nasdaq +1.57%, S&P +0.72%, Q3 guide $108B. Jackson Hole Warsh speech, US grid EO, 30Y 5.31%, BTC ~$78.8K, KOSPI 6,984.95.',
    category: '특집', categoryColor: 'mint', subject: '한장요약',
    date: "${DATE_ISO}", updatedAt: "${UPDATED_AT}",
    images: ["/charts/summary-${DATETAG}.svg"],
    imagesEn: ["/charts/summary-${DATETAG}-en.svg"],
    isPinned: true, imageOnly: true,
  }`;
}'''

text = re.sub(r"function buildSeedSummary\(\) \{[\s\S]*?\};", new_summary_fn + "\n", text, count=1)

# Replace patch anchor to insert before Aug 27 block
text = text.replace(
    "c = patch(c, 'export const SEED_REPORTS: Report[] = [\\n  // ── 2026-08-26'",
    "c = patch(c, 'export const SEED_REPORTS: Report[] = [\\n  // ── 2026-08-27'",
)
text = text.replace(
    "`export const SEED_REPORTS: Report[] = [\\n${insert}  // ── 2026-08-26`",
    "`export const SEED_REPORTS: Report[] = [\\n${insert}  // ── 2026-08-27`",
)
text = text.replace(
    "c = patch(c, 'export const REPORT_TICKERS: Record<string, string[]> = {\\n  // 2026-08-26'",
    "c = patch(c, 'export const REPORT_TICKERS: Record<string, string[]> = {\\n  // 2026-08-27'",
)
text = text.replace(
    "`export const REPORT_TICKERS: Record<string, string[]> = {\\n${tickers}  // 2026-08-26`",
    "`export const REPORT_TICKERS: Record<string, string[]> = {\\n${tickers}  // 2026-08-27`",
)
text = text.replace(
    "c = patch(c, 'export const MOCK_POSTS: Post[] = [\\n  // ── 2026-08-26'",
    "c = patch(c, 'export const MOCK_POSTS: Post[] = [\\n  // ── 2026-08-27'",
)
text = text.replace(
    "c = patch(c, 'export const MOCK_COMMENTS: Record<number, Comment[]> = {\\n  // ── 2026-08-26'",
    "c = patch(c, 'export const MOCK_COMMENTS: Record<number, Comment[]> = {\\n  // ── 2026-08-27'",
)
text = text.replace(
    "c = patch(c, 'export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\\n  // ── 2026-08-26'",
    "c = patch(c, 'export const MOCK_ANALYST_POSTS: AnalystMockPost[] = [\\n  // ── 2026-08-27'",
)

# Unpin seed-1201 instead of seed-1101
text = text.replace(
    '/(\\{ id: "seed-1101"[\\s\\S]*?)isPinned: true/',
    '$1isPinned: false',
)
text = text.replace(
    'c = c.replace(\n    /(\\{ id: "seed-1101"[\\s\\S]*?)isPinned: true/,',
    'c = c.replace(\n    /(\\{ id: "seed-1201"[\\s\\S]*?)isPinned: true/,',
)

path.write_text(text, encoding="utf-8")
print("✅ patched build-report-update-20260828.mjs summary + anchors")
