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

  // ── 2026-06-16 ─────────────────────────────────────────────────────────
  { ko: 'tsla-cybertruck-giga-texas-20260616.svg',    en: 'tsla-cybertruck-giga-texas-20260616-en.svg',    label: 'TSLA_Cybertruck150대', date: '20260616' },
  { ko: 'tsla-modely-japan-may-20260616.svg',         en: 'tsla-modely-japan-may-20260616-en.svg',         label: 'TSLA_ModelY일본1위',   date: '20260616' },
  { ko: 'tsla-shanghai-may-prod-20260616.svg',        en: 'tsla-shanghai-may-prod-20260616-en.svg',        label: 'TSLA_상하이생산최고',  date: '20260616' },
  { ko: 'tsla-cybercab-epa-cert-20260616.svg',        en: 'tsla-cybercab-epa-cert-20260616-en.svg',        label: 'TSLA_CybercabEPA인증', date: '20260616' },
  { ko: 'tsla-cybercab-epa-specs-20260616.svg',       en: 'tsla-cybercab-epa-specs-20260616-en.svg',       label: 'TSLA_CybercabEPA스펙', date: '20260616' },
  { ko: 'tsla-robotaxi-nhtsa-20260616.svg',           en: 'tsla-robotaxi-nhtsa-20260616-en.svg',           label: 'TSLA_RobotaxiNHTSA',   date: '20260616' },
  { ko: 'nvda-net-income-2029-20260616.svg',          en: 'nvda-net-income-2029-20260616-en.svg',          label: 'NVDA_순이익210B',      date: '20260616' },
  { ko: 'nvda-google-samsung-tpu-20260616.svg',       en: 'nvda-google-samsung-tpu-20260616-en.svg',       label: 'NVDA_GoogleTPU',       date: '20260616' },
  { ko: 'amd-q1-2026-20260616.svg',                   en: 'amd-q1-2026-20260616-en.svg',                   label: 'AMD_Q1실적',           date: '20260616' },
  { ko: 'mrvl-bam-mext-20260616.svg',                 en: 'mrvl-bam-mext-20260616-en.svg',                 label: 'MRVL_MetaMEXT인수',    date: '20260616' },
  { ko: 'spcx-ipo-857b-20260616.svg',                 en: 'spcx-ipo-857b-20260616-en.svg',                 label: 'SPCX_IPO857B',         date: '20260616' },
  { ko: 'spcx-ai-spend-20260616.svg',                 en: 'spcx-ai-spend-20260616-en.svg',                 label: 'SPCX_AI지출15B',       date: '20260616' },
  { ko: 'spcx-ir-website-20260616.svg',               en: 'spcx-ir-website-20260616-en.svg',               label: 'SPCX_IR웹사이트',      date: '20260616' },
  { ko: 'spcx-cuba-polymarket-20260616.svg',          en: 'spcx-cuba-polymarket-20260616-en.svg',          label: 'SPCX_쿠바Polymarket',  date: '20260616' },
  { ko: 'summary-20260616.svg',                       en: 'summary-20260616-en.svg',                       label: '6월16일_요약',         date: '20260616' },

  // ── 2026-06-17 ─────────────────────────────────────────────────────────
  { ko: 'spcx-ron-baron-1b-20260617.svg',             en: 'spcx-ron-baron-1b-20260617-en.svg',             label: 'SPCX_RonBaron1B',      date: '20260617' },
  { ko: 'spcx-cursor-9b-20260617.svg',                en: 'spcx-cursor-9b-20260617-en.svg',                label: 'SPCX_Cursor9B',        date: '20260617' },
  { ko: 'spcx-financials-2025-20260617.svg',          en: 'spcx-financials-2025-20260617-en.svg',          label: 'SPCX_FY2025실적',      date: '20260617' },
  { ko: 'spcx-index-inclusion-20260617.svg',          en: 'spcx-index-inclusion-20260617-en.svg',          label: 'SPCX_인덱스편입',      date: '20260617' },
  { ko: 'tsla-ron-baron-5t-robotaxi-20260617.svg',    en: 'tsla-ron-baron-5t-robotaxi-20260617-en.svg',    label: 'TSLA_RonBaron5T로보택시', date: '20260617' },
  { ko: 'tsla-goldman-q2-20260617.svg',               en: 'tsla-goldman-q2-20260617-en.svg',               label: 'TSLA_GoldmanQ2',       date: '20260617' },
  { ko: 'tsla-fsd-taiwan-20260617.svg',               en: 'tsla-fsd-taiwan-20260617-en.svg',               label: 'TSLA_FSD대만',         date: '20260617' },
  { ko: 'amd-nvda-ecosystem-20260617.svg',            en: 'amd-nvda-ecosystem-20260617-en.svg',            label: 'AMD_NVDA생태계',       date: '20260617' },
  { ko: 'oil-iran-50b-20260617.svg',                  en: 'oil-iran-50b-20260617-en.svg',                  label: '유가_이란호르무즈',    date: '20260617' },
  { ko: 'tsmc-amkor-partnership-20260617.svg',        en: 'tsmc-amkor-partnership-20260617-en.svg',        label: 'TSMC_AMKOR10년',       date: '20260617' },
  { ko: 'us-market-vs-gdp-20260617.svg',              en: 'us-market-vs-gdp-20260617-en.svg',              label: '미국시장_GDP비교',     date: '20260617' },
  { ko: 'summary-20260617.svg',                       en: 'summary-20260617-en.svg',                       label: '6월17일_요약',         date: '20260617' },

  // ── 2026-06-18 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260618.svg',                       en: 'summary-20260618-en.svg',                       label: '6월18일_요약',         date: '20260618' },
  { ko: 'iran-us-deal-20260618.svg',                  en: 'iran-us-deal-20260618-en.svg',                  label: '이란핵합의_유가',      date: '20260618' },
  { ko: 'memory-shortage-20260618.svg',               en: 'memory-shortage-20260618-en.svg',               label: '메모리부족_MU_SNDK',   date: '20260618' },
  { ko: 'tsla-fsd-rdw-europe-20260618.svg',           en: 'tsla-fsd-rdw-europe-20260618-en.svg',           label: 'TSLA_FSD유럽RDW',     date: '20260618' },
  { ko: 'nvda-bond-25b-20260618.svg',                 en: 'nvda-bond-25b-20260618-en.svg',                 label: 'NVDA_25B채권',         date: '20260618' },
  { ko: 'fed-hold-sp500-20260618.svg',                en: 'fed-hold-sp500-20260618-en.svg',                label: '연준동결_SP500최악',   date: '20260618' },
  { ko: 'tsla-vs-spcx-20260618.svg',                  en: 'tsla-vs-spcx-20260618-en.svg',                  label: 'TSLA_vs_SPCX재무',    date: '20260618' },
  { ko: 'tsla-optimus-giga-20260618.svg',             en: 'tsla-optimus-giga-20260618-en.svg',             label: 'TSLA_Optimus3층',     date: '20260618' },
  { ko: 'tsla-europe-q2-20260618.svg',                en: 'tsla-europe-q2-20260618-en.svg',                label: 'TSLA_유럽Q2판매',     date: '20260618' },

  // ── 2026-06-19 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260619.svg',                       en: 'summary-20260619-en.svg',                       label: '6월19일_요약',         date: '20260619' },
  { ko: 'tsla-fsd-voice-20260619.svg',                en: 'tsla-fsd-voice-20260619-en.svg',                label: 'TSLA_FSD보이스커맨드', date: '20260619' },
  { ko: 'tsla-elon-form4-20260619.svg',               en: 'tsla-elon-form4-20260619-en.svg',               label: 'TSLA_Elon_Form4',      date: '20260619' },
  { ko: 'tsla-openclass-20260619.svg',                en: 'tsla-openclass-20260619-en.svg',                label: 'TSLA_OpenClass',       date: '20260619' },
  { ko: 'tsla-model-y-ncap-20260619.svg',             en: 'tsla-model-y-ncap-20260619-en.svg',             label: 'TSLA_ModelY_NCAP',     date: '20260619' },
  { ko: 'tsla-fsd-korea-20260619.svg',                en: 'tsla-fsd-korea-20260619-en.svg',                label: 'TSLA_FSD한국구독',      date: '20260619' },
  { ko: 'tsla-fsd-spain-20260619.svg',                en: 'tsla-fsd-spain-20260619-en.svg',                label: 'TSLA_FSD스페인',        date: '20260619' },
  { ko: 'tsla-megapack-25k-20260619.svg',             en: 'tsla-megapack-25k-20260619-en.svg',             label: 'TSLA_Megapack25K',     date: '20260619' },
  { ko: 'spcx-bond-moodys-20260619.svg',              en: 'spcx-bond-moodys-20260619-en.svg',              label: 'SPCX_채권Baa1_20B',    date: '20260619' },
  { ko: 'spcx-ark-funds-20260619.svg',                en: 'spcx-ark-funds-20260619-en.svg',                label: 'SPCX_ARK5펀드',        date: '20260619' },
  { ko: 'spcx-starlink-flow-20260619.svg',            en: 'spcx-starlink-flow-20260619-en.svg',            label: 'SPCX_Starlink허리케인', date: '20260619' },
  { ko: 'terafab-20260619.svg',                       en: 'terafab-20260619-en.svg',                       label: 'TeraFab_250B',         date: '20260619' },
  { ko: 'amzn-aws-valuation-20260619.svg',            en: 'amzn-aws-valuation-20260619-en.svg',            label: 'AMZN_AWS_PE29',        date: '20260619' },
  { ko: 'aapl-iphone-price-20260619.svg',             en: 'aapl-iphone-price-20260619-en.svg',             label: 'AAPL_iPhone가격인상',   date: '20260619' },
  { ko: 'nflx-buyback-20260619.svg',                  en: 'nflx-buyback-20260619-en.svg',                  label: 'NFLX_37B자사주매입',   date: '20260619' },
  { ko: 'intc-gov-sold-20260619.svg',                 en: 'intc-gov-sold-20260619-en.svg',                 label: 'INTC_정부매도손실',    date: '20260619' },
  { ko: 'nvda-saas-thesis-20260619.svg',              en: 'nvda-saas-thesis-20260619-en.svg',              label: 'NVDA_SaaS역전',        date: '20260619' },
  { ko: 'msft-rpo-20260619.svg',                      en: 'msft-rpo-20260619-en.svg',                      label: 'MSFT_RPO97',           date: '20260619' },
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

  // 기본값: 오늘 날짜만 내보냄. --all 플래그로 전체 내보내기 가능
  const exportAll = process.argv.includes('--all');
  const today = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 'YYYYMMDD'
  const targets = exportAll ? PAIRS : PAIRS.filter(p => p.date === today);

  if (!exportAll) {
    console.log(`오늘 날짜(${today}) 이미지만 내보내기 — 전체 내보내려면 --all 플래그 사용\n`);
  }

  let ok = 0, fail = 0;
  for (const { ko, en, label, date } of targets) {
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
