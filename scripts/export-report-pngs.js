#!/usr/bin/env node
// SVG → PNG export script for investus reports
// Usage: node scripts/export-report-pngs.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CHARTS_DIR = path.join(__dirname, '../public/charts');
const REPORT_DIR = path.join(__dirname, '../01.investus 리포트');

// Each entry: { ko, en (optional), label, date }
// en: null if no English version exists
const PAIRS = [
  // ── 2026-06-13 ─────────────────────────────────────────────────────────
  { ko: 'spcx-ipo-close-17268-20260613.svg',          en: 'spcx-ipo-close-17268-20260613-en.svg',          label: 'SPCX_IPO첫날',     date: '20260613' },
  { ko: 'spcx-market-cap-rank6-20260613.svg',          en: 'spcx-market-cap-rank6-20260613-en.svg',          label: 'SPCX_시총6위',     date: '20260613' },
  { ko: 'spcx-founders-ron-baron-20260613.svg',        en: 'spcx-founders-ron-baron-20260613-en.svg',        label: 'SPCX_기관수요',    date: '20260613' },
  { ko: 'spcx-colossus1-anthropic-20260613.svg',       en: 'spcx-colossus1-anthropic-20260613-en.svg',       label: 'SPCX_Colossus임대', date: '20260613' },
  { ko: 'spcx-shotwell-cnbc-20260613.svg',             en: 'spcx-shotwell-cnbc-20260613-en.svg',             label: 'SPCX_Shotwell',    date: '20260613' },
  { ko: 'spcx-early-investor-returns-20260613.svg',    en: 'spcx-early-investor-returns-20260613-en.svg',    label: 'SPCX_초기수익',    date: '20260613' },
  { ko: 'spcx-elon-opening-bell-20260613.svg',         en: 'spcx-elon-opening-bell-20260613-en.svg',         label: 'SPCX_개장벨',      date: '20260613' },
  { ko: 'tsla-fsd-v1434-20260613.svg',                 en: 'tsla-fsd-v1434-20260613-en.svg',                 label: 'TSLA_FSDv14',      date: '20260613' },
  { ko: 'tsla-semi-5units-20260613.svg',               en: 'tsla-semi-5units-20260613-en.svg',               label: 'TSLA_Semi5대',     date: '20260613' },
  { ko: 'tsla-europe-weekly-5100-20260613.svg',        en: 'tsla-europe-weekly-5100-20260613-en.svg',        label: 'TSLA_유럽판매',    date: '20260613' },
  { ko: 'nvda-datacenter-100x-20260613.svg',           en: 'nvda-datacenter-100x-20260613-en.svg',           label: 'NVDA_100x',        date: '20260613' },
  { ko: 'summary-20260613.svg',                        en: 'summary-20260613-en.svg',                        label: '6월13일_요약',     date: '20260613' },

  // ── 2026-06-15 ─────────────────────────────────────────────────────────
  { ko: 'anthropic-fable5-ban-20260615.svg',           en: null,                                             label: 'Anthropic_Fable5차단', date: '20260615' },
  { ko: 'spcx-ellison-windfall-20260615.svg',          en: null,                                             label: 'SPCX_Ellison수익',     date: '20260615' },
  { ko: 'spcx-shotwell-reaction-20260615.svg',         en: null,                                             label: 'SPCX_Shotwell반응',    date: '20260615' },
  { ko: 'spcx-westly-moonshots-20260615.svg',          en: null,                                             label: 'SPCX_3Moonshots',      date: '20260615' },
  { ko: 'spcx-revenue-milestone-20260615.svg',         en: null,                                             label: 'SPCX_매출188B',        date: '20260615' },
  { ko: 'tsla-lasvegas-av-20260615.svg',               en: null,                                             label: 'TSLA_라스베이거스AV',  date: '20260615' },
  { ko: 'tsla-fsd-v1433-robotaxi-20260615.svg',        en: null,                                             label: 'TSLA_FSD로보택시',     date: '20260615' },
  { ko: 'tsla-optimus-valuation-20260615.svg',         en: null,                                             label: 'TSLA_Optimus25T',      date: '20260615' },
  { ko: 'mu-memory-trio-707b-20260615.svg',            en: null,                                             label: 'MU_메모리트리오',      date: '20260615' },
  { ko: 'mu-ai-monopoly-20260615.svg',                 en: null,                                             label: 'MU_AI독점',            date: '20260615' },
  { ko: 'nvda-forward-pe-20260615.svg',                en: null,                                             label: 'NVDA_PER저평가',       date: '20260615' },
  { ko: 'iran-deal-implications-20260615.svg',         en: null,                                             label: '미이란_핵합의',        date: '20260615' },
  { ko: 'ai-data-moat-20260615.svg',                   en: null,                                             label: 'AI_데이터해자',        date: '20260615' },
  { ko: 'summary-20260615.svg',                        en: 'summary-20260615-en.svg',                        label: '6월15일_요약',         date: '20260615' },
];

// macOS librsvg/Pango는 일부 이모지를 렌더링하지 못해 크래시 발생
// SVG 텍스트에서 이모지를 제거하고 Buffer로 변환 후 렌더링
function stripEmoji(svgStr) {
  return svgStr
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')  // 일반 이모지 (🚀🧠🤖 등)
    .replace(/[\u{2600}-\u{27BF}]/gu, '')     // 잡다한 기호 (⛔⚡⚠ 등)
    .replace(/[\u{FE00}-\u{FE0F}]/gu, '');   // 변형 선택자 (variation selectors)
}

async function convert(svgFile, pngFile) {
  const svgPath = path.join(CHARTS_DIR, svgFile);
  const raw = fs.readFileSync(svgPath, 'utf8');
  const svgContent = Buffer.from(stripEmoji(raw));
  await sharp(svgContent)
    .png({ quality: 100 })
    .resize({ width: 960, kernel: 'lanczos3' })
    .toFile(pngFile);
}

(async () => {
  if (!fs.existsSync(REPORT_DIR)) {
    console.error(`Report dir not found: ${REPORT_DIR}`);
    process.exit(1);
  }

  let ok = 0, fail = 0;
  for (const { ko, en, label, date } of PAIRS) {
    const koOut = path.join(REPORT_DIR, `KO_${label}_${date}.png`);
    try {
      await convert(ko, koOut);
      console.log(`✓ KO  ${label}`);
      ok++;
    } catch (e) {
      console.error(`✗ KO  ${label}: ${e.message}`);
      fail++;
    }
    if (en) {
      const enOut = path.join(REPORT_DIR, `EN_${label}_${date}.png`);
      try {
        await convert(en, enOut);
        console.log(`✓ EN  ${label}`);
        ok++;
      } catch (e) {
        console.error(`✗ EN  ${label}: ${e.message}`);
        fail++;
      }
    }
  }
  console.log(`\n완료: ${ok}개 성공, ${fail}개 실패`);
})();
