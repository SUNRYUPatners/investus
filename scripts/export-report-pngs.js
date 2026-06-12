#!/usr/bin/env node
// SVG → PNG export script for 2026-06-13 reports
// Usage: node scripts/export-report-pngs.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CHARTS_DIR = path.join(__dirname, '../public/charts');
const REPORT_DIR = path.join(__dirname, '../01.investus 리포트');

const PAIRS = [
  { ko: 'spcx-ipo-close-17268-20260613.svg',          en: 'spcx-ipo-close-17268-20260613-en.svg',          label: 'SPCX_IPO첫날' },
  { ko: 'spcx-market-cap-rank6-20260613.svg',          en: 'spcx-market-cap-rank6-20260613-en.svg',          label: 'SPCX_시총6위' },
  { ko: 'spcx-founders-ron-baron-20260613.svg',        en: 'spcx-founders-ron-baron-20260613-en.svg',        label: 'SPCX_기관수요' },
  { ko: 'spcx-colossus1-anthropic-20260613.svg',       en: 'spcx-colossus1-anthropic-20260613-en.svg',       label: 'SPCX_Colossus임대' },
  { ko: 'spcx-shotwell-cnbc-20260613.svg',             en: 'spcx-shotwell-cnbc-20260613-en.svg',             label: 'SPCX_Shotwell' },
  { ko: 'spcx-early-investor-returns-20260613.svg',    en: 'spcx-early-investor-returns-20260613-en.svg',    label: 'SPCX_초기수익' },
  { ko: 'spcx-elon-opening-bell-20260613.svg',         en: 'spcx-elon-opening-bell-20260613-en.svg',         label: 'SPCX_개장벨' },
  { ko: 'tsla-fsd-v1434-20260613.svg',                 en: 'tsla-fsd-v1434-20260613-en.svg',                 label: 'TSLA_FSDv14' },
  { ko: 'tsla-semi-5units-20260613.svg',               en: 'tsla-semi-5units-20260613-en.svg',               label: 'TSLA_Semi5대' },
  { ko: 'tsla-europe-weekly-5100-20260613.svg',        en: 'tsla-europe-weekly-5100-20260613-en.svg',        label: 'TSLA_유럽판매' },
  { ko: 'nvda-datacenter-100x-20260613.svg',           en: 'nvda-datacenter-100x-20260613-en.svg',           label: 'NVDA_100x' },
  { ko: 'summary-20260613.svg',                        en: 'summary-20260613-en.svg',                        label: '6월13일_요약' },
];

async function convert(svgFile, pngFile) {
  const svgPath = path.join(CHARTS_DIR, svgFile);
  const svgContent = fs.readFileSync(svgPath);
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
  for (const { ko, en, label } of PAIRS) {
    const koOut = path.join(REPORT_DIR, `KO_${label}_20260613.png`);
    const enOut = path.join(REPORT_DIR, `EN_${label}_20260613.png`);
    try {
      await convert(ko, koOut);
      console.log(`✓ KO  ${label}`);
      ok++;
    } catch (e) {
      console.error(`✗ KO  ${label}: ${e.message}`);
      fail++;
    }
    try {
      await convert(en, enOut);
      console.log(`✓ EN  ${label}`);
      ok++;
    } catch (e) {
      console.error(`✗ EN  ${label}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\n완료: ${ok}개 성공, ${fail}개 실패`);
})();
