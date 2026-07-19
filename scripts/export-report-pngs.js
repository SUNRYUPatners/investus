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
  // ── 2026-07-20 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260720.svg',                        en: 'summary-20260720-en.svg',                        label: 'summary',                    date: '20260720' },
  { ko: 'cbrtruck-giga-texas-240-20260720.svg',        en: 'cbrtruck-giga-texas-240-20260720-en.svg',        label: 'cbrtruck-giga-texas-240',    date: '20260720' },
  { ko: 'cbrcab-giga-texas-200-20260720.svg',          en: 'cbrcab-giga-texas-200-20260720-en.svg',          label: 'cbrcab-giga-texas-200',      date: '20260720' },
  { ko: 'cbrcab-giga-austin-250-20260720.svg',         en: 'cbrcab-giga-austin-250-20260720-en.svg',         label: 'cbrcab-giga-austin-250',     date: '20260720' },
  { ko: 'cbrcab-california-delivery-20260720.svg',     en: 'cbrcab-california-delivery-20260720-en.svg',     label: 'cbrcab-california-delivery', date: '20260720' },
  { ko: 'robotaxi-fleet-770-20260720.svg',             en: 'robotaxi-fleet-770-20260720-en.svg',             label: 'robotaxi-fleet-770',         date: '20260720' },
  { ko: 'norway-ev-98pct-modely-20260720.svg',         en: 'norway-ev-98pct-modely-20260720-en.svg',         label: 'norway-ev-98pct-modely',     date: '20260720' },
  { ko: 'spcx-crash-shorts-6b1-20260720.svg',          en: 'spcx-crash-shorts-6b1-20260720-en.svg',          label: 'spcx-crash-shorts-6b1',      date: '20260720' },
  { ko: 'fsd-personalization-roadmap-20260720.svg',    en: 'fsd-personalization-roadmap-20260720-en.svg',    label: 'fsd-personalization-roadmap', date: '20260720' },
  { ko: 'tsla-physical-ai-leader-20260720.svg',        en: 'tsla-physical-ai-leader-20260720-en.svg',        label: 'tsla-physical-ai-leader',    date: '20260720' },
  { ko: 'alibaba-qwen3-max-preview-20260720.svg',      en: 'alibaba-qwen3-max-preview-20260720-en.svg',      label: 'alibaba-qwen3-max-preview',  date: '20260720' },
  { ko: 'meta-plus-20b-2030-20260720.svg',             en: 'meta-plus-20b-2030-20260720-en.svg',             label: 'meta-plus-20b-2030',         date: '20260720' },
  { ko: 'spx-valuation-1800s-high-20260720.svg',       en: 'spx-valuation-1800s-high-20260720-en.svg',       label: 'spx-valuation-1800s-high',   date: '20260720' },
  { ko: 'spx-forward-pe-20-20260720.svg',              en: 'spx-forward-pe-20-20260720-en.svg',              label: 'spx-forward-pe-20',          date: '20260720' },
  { ko: 'nvda-jevons-paradox-20260720.svg',            en: 'nvda-jevons-paradox-20260720-en.svg',            label: 'nvda-jevons-paradox',        date: '20260720' },
  { ko: 'buffett-google-investment-20260720.svg',      en: 'buffett-google-investment-20260720-en.svg',      label: 'buffett-google-investment',  date: '20260720' },
  { ko: 'bofa-summer-pullback-20260720.svg',           en: 'bofa-summer-pullback-20260720-en.svg',           label: 'bofa-summer-pullback',       date: '20260720' },
  // ── 2026-07-18 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260718.svg',                        en: 'summary-20260718-en.svg',                        label: 'summary',                    date: '20260718' },
  { ko: 'tsla-fsd-12b-crossed-20260718.svg',           en: 'tsla-fsd-12b-crossed-20260718-en.svg',           label: 'tsla-fsd-12b-crossed',       date: '20260718' },
  { ko: 'meta-anthropic-10b-deal-20260718.svg',        en: 'meta-anthropic-10b-deal-20260718-en.svg',        label: 'meta-anthropic-10b-deal',    date: '20260718' },
  { ko: 'meta-aws-hire-brown-20260718.svg',            en: 'meta-aws-hire-brown-20260718-en.svg',            label: 'meta-aws-hire-brown',        date: '20260718' },
  { ko: 'aapl-most-valuable-4t9-20260718.svg',         en: 'aapl-most-valuable-4t9-20260718-en.svg',         label: 'aapl-most-valuable-4t9',     date: '20260718' },
  { ko: 'spcx-pentagon-datacenter-20260718.svg',       en: 'spcx-pentagon-datacenter-20260718-en.svg',       label: 'spcx-pentagon-datacenter',   date: '20260718' },
  { ko: 'spcx-nasa-moon-pathway-20260718.svg',         en: 'spcx-nasa-moon-pathway-20260718-en.svg',         label: 'spcx-nasa-moon-pathway',     date: '20260718' },
  { ko: 'nvda-rubin-nvl72-950kw-20260718.svg',         en: 'nvda-rubin-nvl72-950kw-20260718-en.svg',         label: 'nvda-rubin-nvl72-950kw',     date: '20260718' },
  { ko: 'tsla-cybercab-austin-hire-20260718.svg',      en: 'tsla-cybercab-austin-hire-20260718-en.svg',      label: 'tsla-cybercab-austin-hire',  date: '20260718' },
  { ko: 'tsla-fsd-germany-path-20260718.svg',          en: 'tsla-fsd-germany-path-20260718-en.svg',          label: 'tsla-fsd-germany-path',      date: '20260718' },
  { ko: 'tsla-latvia-entry-20260718.svg',              en: 'tsla-latvia-entry-20260718-en.svg',              label: 'tsla-latvia-entry',          date: '20260718' },
  { ko: 'global-ev-2m-month-20260718.svg',             en: 'global-ev-2m-month-20260718-en.svg',             label: 'global-ev-2m-month',         date: '20260718' },
  { ko: 'nflx-q2-2026-20260718.svg',                   en: 'nflx-q2-2026-20260718-en.svg',                   label: 'nflx-q2-2026',               date: '20260718' },
  { ko: 'sox-bear-threshold-15-20260718.svg',          en: 'sox-bear-threshold-15-20260718-en.svg',          label: 'sox-bear-threshold-15',      date: '20260718' },
  { ko: 'msft-3y-4x-outlook-20260718.svg',             en: 'msft-3y-4x-outlook-20260718-en.svg',             label: 'msft-3y-4x-outlook',         date: '20260718' },
  { ko: 'moritz-tsla-msft-analogy-20260718.svg',       en: 'moritz-tsla-msft-analogy-20260718-en.svg',       label: 'moritz-tsla-msft-analogy',   date: '20260718' },
  { ko: 'cvx-iraq-mou-20260718.svg',                   en: 'cvx-iraq-mou-20260718-en.svg',                   label: 'cvx-iraq-mou',               date: '20260718' },
  // ── 2026-07-17 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260717.svg', en: 'summary-20260717-en.svg', label: 'summary', date: '20260717' },
  { ko: 'tsla-robotaxi-175-tx-20260717.svg', en: 'tsla-robotaxi-175-tx-20260717-en.svg', label: 'tsla-robotaxi-175-tx', date: '20260717' },
  { ko: 'qqq-volatility-20-26-20260717.svg', en: 'qqq-volatility-20-26-20260717-en.svg', label: 'qqq-volatility-20-26', date: '20260717' },
  { ko: 'tsla-fsd-12b-miles-20260717.svg', en: 'tsla-fsd-12b-miles-20260717-en.svg', label: 'tsla-fsd-12b-miles', date: '20260717' },
  { ko: 'kalshi-tsla-spcx-merge-20260717.svg', en: 'kalshi-tsla-spcx-merge-20260717-en.svg', label: 'kalshi-tsla-spcx-merge', date: '20260717' },
  { ko: 'nvda-japan-ai-factory-20260717.svg', en: 'nvda-japan-ai-factory-20260717-en.svg', label: 'nvda-japan-ai-factory', date: '20260717' },
  { ko: 'tsm-q2-beat-2026-20260717.svg', en: 'tsm-q2-beat-2026-20260717-en.svg', label: 'tsm-q2-beat-2026', date: '20260717' },
  { ko: 'tsm-arizona-100b-20260717.svg', en: 'tsm-arizona-100b-20260717-en.svg', label: 'tsm-arizona-100b', date: '20260717' },
  { ko: 'tsla-semi-tour-jul-20260717.svg', en: 'tsla-semi-tour-jul-20260717-en.svg', label: 'tsla-semi-tour-jul', date: '20260717' },
  { ko: 'nvda-jensen-ai-cycle-20260717.svg', en: 'nvda-jensen-ai-cycle-20260717-en.svg', label: 'nvda-jensen-ai-cycle', date: '20260717' },
  { ko: 'sox-correction-16-20260717.svg', en: 'sox-correction-16-20260717-en.svg', label: 'sox-correction-16', date: '20260717' },
  { ko: 'spcx-ai1-power-upgrade-20260717.svg', en: 'spcx-ai1-power-upgrade-20260717-en.svg', label: 'spcx-ai1-power-upgrade', date: '20260717' },
  { ko: 'aapl-china-ai-ms-20260717.svg', en: 'aapl-china-ai-ms-20260717-en.svg', label: 'aapl-china-ai-ms', date: '20260717' },
  { ko: 'uber-delivery-hero-20260717.svg', en: 'uber-delivery-hero-20260717-en.svg', label: 'uber-delivery-hero', date: '20260717' },
  { ko: 'ark-ai-capex-bubble-20260717.svg', en: 'ark-ai-capex-bubble-20260717-en.svg', label: 'ark-ai-capex-bubble', date: '20260717' },
  { ko: 'nvda-jetson-thor-20260717.svg', en: 'nvda-jetson-thor-20260717-en.svg', label: 'nvda-jetson-thor', date: '20260717' },
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
  // 2026-06-20
  { ko: 'summary-20260620.svg',                       en: 'summary-20260620-en.svg',                       label: '6월20일_요약',          date: '20260620' },
  { ko: 'tsla-cybercab-epa-20260620.svg',             en: 'tsla-cybercab-epa-20260620-en.svg',             label: 'TSLA_CybercabEPA',     date: '20260620' },
  { ko: 'tsla-liquid-armor-20260620.svg',             en: 'tsla-liquid-armor-20260620-en.svg',             label: 'TSLA_LiquidArmor',     date: '20260620' },
  { ko: 'tsla-cathie-wood-20260620.svg',              en: 'tsla-cathie-wood-20260620-en.svg',              label: 'TSLA_CathieWood20M',   date: '20260620' },
  { ko: 'tsla-credit-rating-20260620.svg',            en: 'tsla-credit-rating-20260620-en.svg',            label: 'TSLA_신용등급저평가',   date: '20260620' },
  { ko: 'spcx-unlock-timeline-20260620.svg',          en: 'spcx-unlock-timeline-20260620-en.svg',          label: 'SPCX_락업타임라인',     date: '20260620' },
  { ko: 'spcx-upmass-q1-20260620.svg',               en: 'spcx-upmass-q1-20260620-en.svg',               label: 'SPCX_Upmass86pct',     date: '20260620' },
  { ko: 'spcx-starlink-dts-20260620.svg',             en: 'spcx-starlink-dts-20260620-en.svg',             label: 'SPCX_StarlinkDTS30',   date: '20260620' },
  { ko: 'terafab-giga-texas-20260620.svg',            en: 'terafab-giga-texas-20260620-en.svg',            label: 'TeraFab_GigaTexas',    date: '20260620' },
  { ko: 'nvda-inference-74pct-20260620.svg',          en: 'nvda-inference-74pct-20260620-en.svg',          label: 'NVDA_추론74pct',        date: '20260620' },
  { ko: 'amzn-trainium-ext-20260620.svg',             en: 'amzn-trainium-ext-20260620-en.svg',             label: 'AMZN_Trainium외판',     date: '20260620' },
  { ko: 'amzn-aws-137b-20260620.svg',                 en: 'amzn-aws-137b-20260620-en.svg',                 label: 'AMZN_AWS137B',         date: '20260620' },
  { ko: 'macro-tom-lee-20260620.svg',                 en: 'macro-tom-lee-20260620-en.svg',                 label: '매크로_TomLee3단계',    date: '20260620' },
  { ko: 'macro-iran-deal-20260620.svg',               en: 'macro-iran-deal-20260620-en.svg',               label: '매크로_이란종전',        date: '20260620' },
  // ── 2026-06-22 ──────────────────────────────────────────────────────────
  { ko: 'summary-20260622.svg',                       en: 'summary-20260622-en.svg',                       label: '6월22일_요약',           date: '20260622' },
  { ko: 'spcx-cursor-80b-20260622.svg',               en: 'spcx-cursor-80b-20260622-en.svg',               label: 'SPCX_Cursor80B',        date: '20260622' },
  { ko: 'tsla-fsd-semi-lidar-20260622.svg',           en: 'tsla-fsd-semi-lidar-20260622-en.svg',           label: 'TSLA_FSD_Semi_LIDAR',   date: '20260622' },
  { ko: 'tsla-fsd-spain-275k-20260622.svg',           en: 'tsla-fsd-spain-275k-20260622-en.svg',           label: 'TSLA_FSD_Spain275K',    date: '20260622' },
  { ko: 'tsla-fsd-subs-142m-20260622.svg',            en: 'tsla-fsd-subs-142m-20260622-en.svg',            label: 'TSLA_FSD구독142만',      date: '20260622' },
  { ko: 'tsla-megapod-trademark-20260622.svg',        en: 'tsla-megapod-trademark-20260622-en.svg',        label: 'TSLA_MEGAPOD',          date: '20260622' },
  { ko: 'tsla-optimus-mass-prod-20260622.svg',        en: 'tsla-optimus-mass-prod-20260622-en.svg',        label: 'TSLA_Optimus양산',       date: '20260622' },
  { ko: 'tsla-grok-fsd-20260622.svg',                 en: 'tsla-grok-fsd-20260622-en.svg',                 label: 'TSLA_Grok_FSD',         date: '20260622' },
  { ko: 'tsla-amazing-abundance-20260622.svg',        en: 'tsla-amazing-abundance-20260622-en.svg',        label: 'TSLA_AmazingAbundance', date: '20260622' },
  { ko: 'spcx-spaceforce-2b-20260622.svg',            en: 'spcx-spaceforce-2b-20260622-en.svg',            label: 'SPCX_SpaceForce2.29B',  date: '20260622' },
  { ko: 'spcx-ai-satellite-20260622.svg',             en: 'spcx-ai-satellite-20260622-en.svg',             label: 'SPCX_AI위성로드맵',      date: '20260622' },
  { ko: 'spcx-usmobile-150-20260622.svg',             en: 'spcx-usmobile-150-20260622-en.svg',             label: 'SPCX_USMobile150국',     date: '20260622' },
  { ko: 'nasdaq100-rebalance-20260622.svg',           en: 'nasdaq100-rebalance-20260622-en.svg',           label: 'NASDAQ100_리밸런싱',     date: '20260622' },
  { ko: 'amzn-us1-revenue-20260622.svg',              en: 'amzn-us1-revenue-20260622-en.svg',              label: 'AMZN_미국매출1위',       date: '20260622' },
  { ko: 'cloud-backlog-aws480b-20260622.svg',         en: 'cloud-backlog-aws480b-20260622-en.svg',         label: '클라우드_백로그',        date: '20260622' },
  { ko: 'mu-operating-income-20260622.svg',           en: 'mu-operating-income-20260622-en.svg',           label: 'MU_영업이익급반등',      date: '20260622' },
  { ko: 'meta-msft-pvgo-20260622.svg',                en: 'meta-msft-pvgo-20260622-en.svg',                label: 'META_MSFT_PVGO',        date: '20260622' },
  { ko: 'googl-berkshire-20260622.svg',               en: 'googl-berkshire-20260622-en.svg',               label: 'GOOGL_버크셔5위',        date: '20260622' },
  { ko: 'intc-ceo-strategy-20260622.svg',             en: 'intc-ceo-strategy-20260622-en.svg',             label: 'INTC_CEO전략',          date: '20260622' },

  // ── 2026-06-23 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260623.svg',                       en: 'summary-20260623-en.svg',                       label: '6월23일_요약',           date: '20260623' },
  { ko: 'spcx-credit-ratings-20260623.svg',           en: 'spcx-credit-ratings-20260623-en.svg',           label: 'SPCX_신용등급3관왕',     date: '20260623' },
  { ko: 'spcx-cash-100b-20260623.svg',                en: 'spcx-cash-100b-20260623-en.svg',                label: 'SPCX_현금100B',          date: '20260623' },
  { ko: 'spcx-bond-issuance-20260623.svg',            en: 'spcx-bond-issuance-20260623-en.svg',            label: 'SPCX_채권발행',          date: '20260623' },
  { ko: 'spcx-ipo-price-20260623.svg',                en: 'spcx-ipo-price-20260623-en.svg',                label: 'SPCX_IPO주가흐름',       date: '20260623' },
  { ko: 'spcx-colossus-reflection-20260623.svg',      en: 'spcx-colossus-reflection-20260623-en.svg',      label: 'SPCX_Colossus6.3B',      date: '20260623' },
  { ko: 'tsla-jefferies-375-20260623.svg',            en: 'tsla-jefferies-375-20260623-en.svg',            label: 'TSLA_Jefferies375',      date: '20260623' },
  { ko: 'tsla-q2-deliveries-384k-20260623.svg',       en: 'tsla-q2-deliveries-384k-20260623-en.svg',       label: 'TSLA_Q2인도384k',        date: '20260623' },
  { ko: 'tsla-china-caam-q2-20260623.svg',            en: 'tsla-china-caam-q2-20260623-en.svg',            label: 'TSLA_중국CAAM',          date: '20260623' },
  { ko: 'tsla-optimus-fremont-20260623.svg',          en: 'tsla-optimus-fremont-20260623-en.svg',          label: 'TSLA_Optimus양산',       date: '20260623' },
  { ko: 'googl-deepmind-anthropic-20260623.svg',      en: 'googl-deepmind-anthropic-20260623-en.svg',      label: 'GOOGL_DeepMind6pct',     date: '20260623' },
  { ko: 'msft-xbox-spinoff-20260623.svg',             en: 'msft-xbox-spinoff-20260623-en.svg',             label: 'MSFT_Xbox스핀오프',      date: '20260623' },
  { ko: 'tsla-cybercab-giga-texas-20260623.svg',      en: 'tsla-cybercab-giga-texas-20260623-en.svg',      label: 'TSLA_사이버캡기가텍사스', date: '20260623' },
  { ko: 'tsla-lathrop-megafactory-20260623.svg',      en: 'tsla-lathrop-megafactory-20260623-en.svg',      label: 'TSLA_라스롭풀캐파',      date: '20260623' },

  // ── 2026-06-24 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260624.svg',                       en: 'summary-20260624-en.svg',                       label: '6월24일_요약',            date: '20260624' },
  { ko: 'tsla-accident-media-truth-20260624.svg',     en: 'tsla-accident-media-truth-20260624-en.svg',     label: 'TSLA_사고진실',           date: '20260624' },
  { ko: 'tsla-q2-deliveries-440k-20260624.svg',       en: 'tsla-q2-deliveries-440k-20260624-en.svg',       label: 'TSLA_Q2인도440k',         date: '20260624' },
  { ko: 'tsla-fsd-europe-finland-20260624.svg',       en: 'tsla-fsd-europe-finland-20260624-en.svg',       label: 'TSLA_FSD유럽핀란드',      date: '20260624' },
  { ko: 'tsla-megapack-northpower-20260624.svg',      en: 'tsla-megapack-northpower-20260624-en.svg',      label: 'TSLA_Megapack노스파워',   date: '20260624' },
  { ko: 'spcx-bond-89b-demand-20260624.svg',          en: 'spcx-bond-89b-demand-20260624-en.svg',          label: 'SPCX_채권89B',            date: '20260624' },
  { ko: 'xai-grok5-10t-params-20260624.svg',          en: 'xai-grok5-10t-params-20260624-en.svg',          label: 'xAI_Grok510T',            date: '20260624' },
  { ko: 'macro-dollar-iran-20260624.svg',              en: 'macro-dollar-iran-20260624-en.svg',              label: '매크로_달러이란',          date: '20260624' },
  { ko: 'tsla-deepseek-voice-20260624.svg',           en: 'tsla-deepseek-voice-20260624-en.svg',           label: 'TSLA_DeepSeek보이스',     date: '20260624' },
  { ko: 'tsla-optimus-china-supply-20260624.svg',     en: 'tsla-optimus-china-supply-20260624-en.svg',     label: 'TSLA_Optimus중국공급',    date: '20260624' },
  { ko: 'spcx-starlink-92m-20260624.svg',             en: 'spcx-starlink-92m-20260624-en.svg',             label: 'SPCX_Starlink9200만',     date: '20260624' },
  { ko: 'tsla-korea-fsd-20260624.svg',                en: 'tsla-korea-fsd-20260624-en.svg',                label: 'TSLA_한국FSD',            date: '20260624' },
  { ko: 'tsla-robotaxi-20260624.svg',                 en: 'tsla-robotaxi-20260624-en.svg',                 label: 'TSLA_로보택시마일',        date: '20260624' },
  { ko: 'spcx-space-capsule-20260624.svg',            en: 'spcx-space-capsule-20260624-en.svg',            label: 'SPCX_우주캡슐',           date: '20260624' },
  { ko: 'spcx-ark-buy-20260624.svg',                  en: 'spcx-ark-buy-20260624-en.svg',                  label: 'SPCX_ARK역발상매수',      date: '20260624' },

  // ── 2026-06-25 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260625.svg',                        en: 'summary-20260625-en.svg',                        label: '6월25일_요약',             date: '20260625' },
  { ko: 'tsla-cybercab-giga-outside-20260625.svg',     en: 'tsla-cybercab-giga-outside-20260625-en.svg',     label: 'TSLA_Cybercab150대외부',   date: '20260625' },
  { ko: 'tsla-fsd-finland-traficom-20260625.svg',      en: 'tsla-fsd-finland-traficom-20260625-en.svg',      label: 'TSLA_FSD핀란드Traficom',   date: '20260625' },
  { ko: 'tsla-fleet-income-20260625.svg',              en: 'tsla-fleet-income-20260625-en.svg',              label: 'TSLA_플릿수익화',          date: '20260625' },
  { ko: 'tsla-ark-4600-20260625.svg',                  en: 'tsla-ark-4600-20260625-en.svg',                  label: 'TSLA_ARK4600목표가',       date: '20260625' },
  { ko: 'tsla-accident-lawsuit-20260625.svg',          en: 'tsla-accident-lawsuit-20260625-en.svg',          label: 'TSLA_사고소송',            date: '20260625' },
  { ko: 'tsla-robotaxi-logistics-hiring-20260625.svg', en: 'tsla-robotaxi-logistics-hiring-20260625-en.svg', label: 'TSLA_로보택시물류채용',     date: '20260625' },
  { ko: 'spcx-nasdaq100-july6-20260625.svg',           en: 'spcx-nasdaq100-july6-20260625-en.svg',           label: 'SPCX_NASDAQ100편입',       date: '20260625' },
  { ko: 'spcx-starmind-20260625.svg',                  en: 'spcx-starmind-20260625-en.svg',                  label: 'SPCX_Starmind',            date: '20260625' },
  { ko: 'spcx-ai1-satellite-20260625.svg',             en: 'spcx-ai1-satellite-20260625-en.svg',             label: 'SPCX_AI1위성스펙',         date: '20260625' },
  { ko: 'spcx-oldendorff-20260625.svg',                en: 'spcx-oldendorff-20260625-en.svg',                label: 'SPCX_Oldendorff화물선',    date: '20260625' },
  { ko: 'tsla-spcx-renew-home-20260625.svg',           en: 'tsla-spcx-renew-home-20260625-en.svg',           label: 'TSLA_SPCX_RenewHome',      date: '20260625' },
  { ko: 'mu-q3-earnings-20260625.svg',                 en: 'mu-q3-earnings-20260625-en.svg',                 label: 'MU_Q3어닝서프라이즈',       date: '20260625' },
  // ── 2026-06-26 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260626.svg',                        en: 'summary-20260626-en.svg',                        label: '6월26일_요약',              date: '20260626' },
  { ko: 'spcx-nasdaq100-official-20260626.svg',        en: 'spcx-nasdaq100-official-20260626-en.svg',        label: 'SPCX_NASDAQ100공식',        date: '20260626' },
  { ko: 'tsla-capex-expansion-20260626.svg',           en: 'tsla-capex-expansion-20260626-en.svg',           label: 'TSLA_CapEx확대',            date: '20260626' },
  { ko: 'tsla-giga-berlin-7500-20260626.svg',          en: 'tsla-giga-berlin-7500-20260626-en.svg',          label: 'TSLA_기가베를린7500',        date: '20260626' },
  { ko: 'tsla-europe-sales-may-20260626.svg',          en: 'tsla-europe-sales-may-20260626-en.svg',          label: 'TSLA_유럽판매2배',           date: '20260626' },
  { ko: 'tsla-nhtsa-av-brake-20260626.svg',            en: 'tsla-nhtsa-av-brake-20260626-en.svg',            label: 'TSLA_NHTSA브레이크면제',     date: '20260626' },
  { ko: 'tsla-japan-demand-20260626.svg',              en: 'tsla-japan-demand-20260626-en.svg',              label: 'TSLA_일본수요폭발',          date: '20260626' },
  { ko: 'spcx-tmobile-acquisition-20260626.svg',       en: 'spcx-tmobile-acquisition-20260626-en.svg',       label: 'SPCX_T모바일인수',          date: '20260626' },
  { ko: 'spcx-natural-gas-pipeline-20260626.svg',      en: 'spcx-natural-gas-pipeline-20260626-en.svg',      label: 'SPCX_천연가스파이프라인',    date: '20260626' },
  { ko: 'sndk-leopold-780pct-20260626.svg',            en: 'sndk-leopold-780pct-20260626-en.svg',            label: 'SNDK_Leopold780%',          date: '20260626' },
  { ko: 'mu-q4-record-guidance-20260626.svg',          en: 'mu-q4-record-guidance-20260626-en.svg',          label: 'MU_Q4역대최대',             date: '20260626' },
  { ko: 'avgo-ai-1t-market-20260626.svg',              en: 'avgo-ai-1t-market-20260626-en.svg',              label: 'AVGO_AI1조시장',            date: '20260626' },
  { ko: 'aapl-m5-price-hike-20260626.svg',             en: 'aapl-m5-price-hike-20260626-en.svg',             label: 'AAPL_M5가격인상',           date: '20260626' },
  { ko: 'openai-ipo-delay-20260626.svg',               en: 'openai-ipo-delay-20260626-en.svg',               label: 'OpenAI_IPO지연',            date: '20260626' },
  { ko: 'macro-gdp-cathie-warning-20260626.svg',       en: 'macro-gdp-cathie-warning-20260626-en.svg',       label: '매크로_GDP_Cathie경고',      date: '20260626' },

  // ── 2026-06-29 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260629.svg',                        en: 'summary-20260629-en.svg',                        label: '6월29일_요약',               date: '20260629' },
  { ko: 'tsla-q2-delivery-consensus-20260629.svg',     en: 'tsla-q2-delivery-consensus-20260629-en.svg',     label: 'TSLA_Q2인도컨센서스',        date: '20260629' },
  { ko: 'tsla-cybercab-first-responder-20260629.svg',  en: 'tsla-cybercab-first-responder-20260629-en.svg',  label: 'TSLA_Cybercab퍼스트리스폰더', date: '20260629' },
  { ko: 'tsla-nhtsa-steering-resolved-20260629.svg',   en: 'tsla-nhtsa-steering-resolved-20260629-en.svg',   label: 'TSLA_NHTSA스티어링종결',     date: '20260629' },
  { ko: 'tsla-marketing-uruguay-20260629.svg',         en: 'tsla-marketing-uruguay-20260629-en.svg',         label: 'TSLA_광고우루과이',           date: '20260629' },
  { ko: 'spcx-first-bond-20b-20260629.svg',            en: 'spcx-first-bond-20b-20260629-en.svg',            label: 'SPCX_첫채권20B',             date: '20260629' },
  { ko: 'mu-deepdive-datacenter-20260629.svg',         en: 'mu-deepdive-datacenter-20260629-en.svg',         label: 'MU_데이터센터651pct',         date: '20260629' },
  { ko: 'nvda-indonesia-gpu-20260629.svg',             en: 'nvda-indonesia-gpu-20260629-en.svg',             label: 'NVDA_인도네시아17만GPU',      date: '20260629' },
  { ko: 'msft-burry-long-20260629.svg',                en: 'msft-burry-long-20260629-en.svg',                label: 'MSFT_버리콜옵션',             date: '20260629' },
  { ko: 'macro-delaware-exodus-20260629.svg',          en: 'macro-delaware-exodus-20260629-en.svg',          label: '매크로_델라웨어탈출',          date: '20260629' },

  // ── 2026-06-30 ─────────────────────────────────────────────────────────
  { ko: 'summary-20260630.svg',                      en: 'summary-20260630-en.svg',                      label: '6월30일_요약',               date: '20260630' },
  { ko: 'tsla-fsd-v14-lite-20260630.svg',            en: 'tsla-fsd-v14-lite-20260630-en.svg',            label: 'TSLA_FSDV14Lite',            date: '20260630' },
  { ko: 'tsla-cybercab-texas-cav-20260630.svg',      en: 'tsla-cybercab-texas-cav-20260630-en.svg',      label: 'TSLA_CybercabTexasCAV',      date: '20260630' },
  { ko: 'tsla-optimus-july8-20260630.svg',           en: 'tsla-optimus-july8-20260630-en.svg',           label: 'TSLA_Optimus7월8일',          date: '20260630' },
  { ko: 'spcx-falcon9-60-starlink-20260630.svg',     en: 'spcx-falcon9-60-starlink-20260630-en.svg',     label: 'SPCX_Falcon9_60Starlink',    date: '20260630' },
  { ko: 'nvda-hbm-micron-sp500-20260630.svg',        en: 'nvda-hbm-micron-sp500-20260630-en.svg',        label: 'NVDA_HBM_MU_SP500',          date: '20260630' },
  { ko: 'meta-claude-limits-20260630.svg',           en: 'meta-claude-limits-20260630-en.svg',           label: 'META_Claude제한',             date: '20260630' },
  { ko: 'aapl-china-chip-20260630.svg',              en: 'aapl-china-chip-20260630-en.svg',              label: 'AAPL_중국칩10B',              date: '20260630' },
  { ko: 'macro-congress-msft-vw-20260630.svg',       en: 'macro-congress-msft-vw-20260630-en.svg',       label: '매크로_MSFT의회VW해고',        date: '20260630' },
  { ko: 'spcx-starlink-nz-rural-20260630.svg',      en: 'spcx-starlink-nz-rural-20260630-en.svg',      label: 'SPCX_Starlink뉴질랜드농촌',   date: '20260630' },
  { ko: 'spcx-nasdaq100-20260630.svg',               en: 'spcx-nasdaq100-20260630-en.svg',               label: 'SPCX_Nasdaq100_7월8일',        date: '20260630' },
  { ko: 'macro-congress-msft-20260630.svg',          en: 'macro-congress-msft-20260630-en.svg',          label: '매크로_의회MSFT매수',           date: '20260630' },
  { ko: 'macro-vw-layoffs-20260630.svg',             en: 'macro-vw-layoffs-20260630-en.svg',             label: '매크로_VW10만해고',             date: '20260630' },
  // ── 2026-07-01 ──────────────────────────────────────────────────────────
  { ko: 'summary-20260701.svg',                      en: 'summary-20260701-en.svg',                      label: '7월1일_요약',                 date: '20260701' },
  { ko: 'tsla-q2-480k-breaking-20260701.svg',        en: 'tsla-q2-480k-breaking-20260701-en.svg',        label: 'TSLA_Q2납품480K',             date: '20260701' },
  { ko: 'tsla-cybercab-austin-test-20260701.svg',    en: 'tsla-cybercab-austin-test-20260701-en.svg',    label: 'TSLA_CyberCab오스틴',         date: '20260701' },
  { ko: 'tsla-cybercab-hiring-20260701.svg',         en: 'tsla-cybercab-hiring-20260701-en.svg',         label: 'TSLA_CyberCab채용',           date: '20260701' },
  { ko: 'tsla-cybercab-interior-20260701.svg',       en: 'tsla-cybercab-interior-20260701-en.svg',       label: 'TSLA_CyberCab인테리어',       date: '20260701' },
  { ko: 'tsla-fsd-v46-20260701.svg',                 en: 'tsla-fsd-v46-20260701-en.svg',                 label: 'TSLA_FSDv46',                 date: '20260701' },
  { ko: 'tsla-fsd-hw3-limits-20260701.svg',          en: 'tsla-fsd-hw3-limits-20260701-en.svg',          label: 'TSLA_FSDHW3제한',             date: '20260701' },
  { ko: 'tsla-fsd-unsupervised-20260701.svg',        en: 'tsla-fsd-unsupervised-20260701-en.svg',        label: 'TSLA_FSD비감독',              date: '20260701' },
  { ko: 'tsla-cathie-robotaxi-20260701.svg',         en: 'tsla-cathie-robotaxi-20260701-en.svg',         label: 'TSLA_Cathie로보택시',         date: '20260701' },
  { ko: 'tsla-optimus-dexterity-20260701.svg',       en: 'tsla-optimus-dexterity-20260701-en.svg',       label: 'TSLA_Optimus손재주',          date: '20260701' },
  { ko: 'tsla-optimus-production-20260701.svg',      en: 'tsla-optimus-production-20260701-en.svg',      label: 'TSLA_Optimus생산',            date: '20260701' },
  { ko: 'tsla-terafab-hire-20260701.svg',            en: 'tsla-terafab-hire-20260701-en.svg',            label: 'TSLA_TeraFab채용',            date: '20260701' },
  { ko: 'tsla-semi-jackknife-20260701.svg',          en: 'tsla-semi-jackknife-20260701-en.svg',          label: 'TSLA_Semi잭나이프',           date: '20260701' },
  { ko: 'tsla-semi-efficiency-20260701.svg',         en: 'tsla-semi-efficiency-20260701-en.svg',         label: 'TSLA_Semi효율',               date: '20260701' },
  { ko: 'tsla-service-24hr-20260701.svg',            en: 'tsla-service-24hr-20260701-en.svg',            label: 'TSLA_24hr서비스',             date: '20260701' },
  { ko: 'tsla-japan-delivery-20260701.svg',          en: 'tsla-japan-delivery-20260701-en.svg',          label: 'TSLA_일본납품',               date: '20260701' },
  { ko: 'tsla-malaysia-15k-20260701.svg',            en: 'tsla-malaysia-15k-20260701-en.svg',            label: 'TSLA_말레이시아15K',          date: '20260701' },
  { ko: 'tsla-megafactory-lfp-20260701.svg',         en: 'tsla-megafactory-lfp-20260701-en.svg',         label: 'TSLA_메가팩LFP',              date: '20260701' },
  { ko: 'tsla-q2-consensus-20260701.svg',            en: 'tsla-q2-consensus-20260701-en.svg',            label: 'TSLA_Q2컨센서스',             date: '20260701' },
  { ko: 'spcx-iridium-8b-20260701.svg',              en: 'spcx-iridium-8b-20260701-en.svg',              label: 'SPCX_Iridium8B',              date: '20260701' },
  { ko: 'spcx-memphis-community-20260701.svg',       en: 'spcx-memphis-community-20260701-en.svg',       label: 'SPCX_Memphis기여',            date: '20260701' },
  { ko: 'nvda-blackwell-software-20260701.svg',      en: 'nvda-blackwell-software-20260701-en.svg',      label: 'NVDA_Blackwell소프트웨어',    date: '20260701' },
  { ko: 'nvda-claude-azure-gb800-20260701.svg',      en: 'nvda-claude-azure-gb800-20260701-en.svg',      label: 'NVDA_Claude_Azure_GB800',     date: '20260701' },
  { ko: 'nke-q4-earnings-20260701.svg',              en: 'nke-q4-earnings-20260701-en.svg',              label: 'NKE_Q4어닝',                  date: '20260701' },
  { ko: 'rklb-acquisition-20260701.svg',             en: 'rklb-acquisition-20260701-en.svg',             label: 'RKLB_인수',                   date: '20260701' },
  { ko: 'figure-humanoid-bmw-20260701.svg',          en: 'figure-humanoid-bmw-20260701-en.svg',          label: 'Figure_BMW',                  date: '20260701' },
  { ko: 'bloom-energy-ai-20260701.svg',              en: 'bloom-energy-ai-20260701-en.svg',              label: 'BloomEnergy_AI',              date: '20260701' },
  { ko: 'burry-adobe-long-20260701.svg',             en: 'burry-adobe-long-20260701-en.svg',             label: 'Burry_ADBE롱',                date: '20260701' },
  { ko: 'amzn-pe-low-ackman-20260701.svg',           en: 'amzn-pe-low-ackman-20260701-en.svg',           label: 'AMZN_Ackman저평가',           date: '20260701' },
  { ko: 'dell-stock-drop-20260701.svg',              en: 'dell-stock-drop-20260701-en.svg',              label: 'DELL_급락',                   date: '20260701' },
  { ko: 'agentix-robotics-ipo-20260701.svg',         en: 'agentix-robotics-ipo-20260701-en.svg',         label: 'Agentix_로봇IPO',             date: '20260701' },
  { ko: 'memory-prices-dram-nand-20260701.svg',      en: 'memory-prices-dram-nand-20260701-en.svg',      label: '메모리_DRAM_NAND',            date: '20260701' },
  { ko: 'googl-sovereign-ai-20260701.svg',           en: 'googl-sovereign-ai-20260701-en.svg',           label: 'GOOGL_소버린AI',              date: '20260701' },
  { ko: 'market-us-q2-best-quarter-20260701.svg',    en: 'market-us-q2-best-quarter-20260701-en.svg',    label: '시장_Q2최고분기',              date: '20260701' },
  { ko: 'market-us-debt-gdp-20260701.svg',           en: 'market-us-debt-gdp-20260701-en.svg',           label: '시장_미국부채GDP',             date: '20260701' },

  // ── 2026-07-02 ─────────────────────────────────────────────────────────
  { ko: 'tsla-supercharger-q2-20260702.svg',        en: 'tsla-supercharger-q2-20260702-en.svg',        label: 'TSLA_Supercharger_Q2',        date: '20260702' },
  { ko: 'tsla-europe-june-20260702.svg',            en: 'tsla-europe-june-20260702-en.svg',            label: 'TSLA_유럽6월판매',            date: '20260702' },
  { ko: 'spcx-wedbush-150-20260702.svg',            en: 'spcx-wedbush-150-20260702-en.svg',            label: 'SPCX_Wedbush150',             date: '20260702' },
  { ko: 'spcx-ai-device-20260702.svg',              en: 'spcx-ai-device-20260702-en.svg',              label: 'SPCX_AI기기',                 date: '20260702' },
  { ko: 'tsla-optimus-fremont-20260702.svg',        en: 'tsla-optimus-fremont-20260702-en.svg',        label: 'TSLA_Optimus생산라인',        date: '20260702' },
  { ko: 'tsla-semi-europe-20260702.svg',            en: 'tsla-semi-europe-20260702-en.svg',            label: 'TSLA_Semi유럽',               date: '20260702' },
  { ko: 'elon-ai-power-20260702.svg',               en: 'elon-ai-power-20260702-en.svg',               label: 'Elon_AI전력',                 date: '20260702' },
  { ko: 'meta-cloud-ai-20260702.svg',               en: 'meta-cloud-ai-20260702-en.svg',               label: 'META_클라우드AI',              date: '20260702' },
  { ko: 'tsla-q2-delivery-day-20260702.svg',        en: 'tsla-q2-delivery-day-20260702-en.svg',        label: 'TSLA_Q2발표DDAY',             date: '20260702' },
  { ko: 'tsla-fsd-ae3-20260702.svg',                en: 'tsla-fsd-ae3-20260702-en.svg',                label: 'TSLA_FSD_AE3',                date: '20260702' },
  { ko: 'summary-20260702.svg',                     en: 'summary-20260702-en.svg',                     label: '7월02일_요약',                date: '20260702' },
  // 2026-07-03
  { ko: 'tsla-yl-20260703.svg',                     en: 'tsla-yl-20260703-en.svg',                     label: 'TSLA_ModelY8인승',            date: '20260703' },
  { ko: 'tsla-q2-result-20260703.svg',              en: 'tsla-q2-result-20260703-en.svg',              label: 'TSLA_Q2결과',                 date: '20260703' },
  { ko: 'tsla-energy-q2-20260703.svg',              en: 'tsla-energy-q2-20260703-en.svg',              label: 'TSLA_에너지저장Q2',           date: '20260703' },
  { ko: 'tsla-australia-20260703.svg',              en: 'tsla-australia-20260703-en.svg',              label: 'TSLA_호주6월',                date: '20260703' },
  { ko: 'tsla-china-jun-20260703.svg',              en: 'tsla-china-jun-20260703-en.svg',              label: 'TSLA_중국6월',                date: '20260703' },
  { ko: 'tsla-optimus-v3-hand-20260703.svg',        en: 'tsla-optimus-v3-hand-20260703-en.svg',        label: 'TSLA_OptimV3손',              date: '20260703' },
  { ko: 'msft-frontier-20260703.svg',               en: 'msft-frontier-20260703-en.svg',               label: 'MSFT_Frontier',               date: '20260703' },
  { ko: 'mu-trump-20260703.svg',                    en: 'mu-trump-20260703-en.svg',                    label: 'MU_트럼프어카운트',           date: '20260703' },
  { ko: 'us-jobs-jun-20260703.svg',                 en: 'us-jobs-jun-20260703-en.svg',                 label: '미국_6월고용',                date: '20260703' },
  { ko: 'tech-rotation-20260703.svg',               en: 'tech-rotation-20260703-en.svg',               label: 'AI_테크로테이션',             date: '20260703' },
  { ko: 'us-cash-8pct-20260703.svg',                en: 'us-cash-8pct-20260703-en.svg',                label: '가계현금8pct',                date: '20260703' },
  { ko: 'meta-wolfe-20260703.svg',                  en: 'meta-wolfe-20260703-en.svg',                  label: 'META_Wolfe200B',              date: '20260703' },
  { ko: 'ford-q2-20260703.svg',                     en: 'ford-q2-20260703-en.svg',                     label: 'Ford_Q2판매',                 date: '20260703' },
  { ko: 'sector-perf-20260703.svg',                 en: 'sector-perf-20260703-en.svg',                 label: '섹터퍼포먼스_0702',           date: '20260703' },
  { ko: 'summary-20260703.svg',                     en: 'summary-20260703-en.svg',                     label: '7월03일_요약',                date: '20260703' },
  // 2026-07-04
  { ko: 'tsla-robotaxi-5cities-20260704.svg',       en: 'tsla-robotaxi-5cities-20260704-en.svg',       label: 'TSLA_로보택시5도시',          date: '20260704' },
  { ko: 'tsla-fsd-germany-20260704.svg',            en: 'tsla-fsd-germany-20260704-en.svg',            label: 'TSLA_FSD독일',                date: '20260704' },
  { ko: 'nvda-ai-infra-20260704.svg',               en: 'nvda-ai-infra-20260704-en.svg',               label: 'NVDA_AI인프라',               date: '20260704' },
  { ko: 'openai-govt-stake-20260704.svg',           en: 'openai-govt-stake-20260704-en.svg',           label: 'OpenAI_정부지분5pct',         date: '20260704' },
  { ko: 'starlink-vs-amazon-20260704.svg',          en: 'starlink-vs-amazon-20260704-en.svg',          label: 'Starlink_vs_Amazon',          date: '20260704' },
  { ko: 'tsla-ai-200week-20260704.svg',             en: 'tsla-ai-200week-20260704-en.svg',             label: 'TSLA_AI200주',                date: '20260704' },
  { ko: 'meta-ai-agent-20260704.svg',               en: 'meta-ai-agent-20260704-en.svg',               label: 'META_AI에이전트',             date: '20260704' },
  { ko: 'tsla-fsd-manslaughter-20260704.svg',       en: 'tsla-fsd-manslaughter-20260704-en.svg',       label: 'TSLA_FSD기소',                date: '20260704' },
  { ko: 'mu-burry-short-20260704.svg',              en: 'mu-burry-short-20260704-en.svg',              label: 'MU_Burry공매도',              date: '20260704' },
  { ko: 'summary-20260704.svg',                     en: 'summary-20260704-en.svg',                     label: '7월04일_요약',                date: '20260704' },
  // 2026-07-06
  { ko: 'tsla-robotaxi-cybercab-100-20260706.svg', en: 'tsla-robotaxi-cybercab-100-20260706-en.svg', label: 'TSLA_Cybercab100비지도',      date: '20260706' },
  { ko: 'nvda-china-chip-4x-20260706.svg',         en: 'nvda-china-chip-4x-20260706-en.svg',         label: 'NVDA_중국칩4.7배',            date: '20260706' },
  { ko: 'tsla-fsd-129m-q2-20260706.svg',           en: 'tsla-fsd-129m-q2-20260706-en.svg',           label: 'TSLA_FSD129M_Q2',             date: '20260706' },
  { ko: 'googl-profit-double-tpu-20260706.svg',    en: 'googl-profit-double-tpu-20260706-en.svg',    label: 'GOOGL_순이익2배_TPU',         date: '20260706' },
  { ko: 'skhynix-dram-61pct-20260706.svg',         en: 'skhynix-dram-61pct-20260706-en.svg',         label: 'SKHynix_DRAM61pct',           date: '20260706' },
  { ko: 'hyperscaler-capex-576b-20260706.svg',     en: 'hyperscaler-capex-576b-20260706-en.svg',     label: '하이퍼스케일러_CAPEX576B',    date: '20260706' },
  { ko: 'eu-safety-mandate-20260706.svg',          en: 'eu-safety-mandate-20260706-en.svg',          label: 'EU_안전의무화',               date: '20260706' },
  { ko: 'tsla-american-desantis-20260706.svg',     en: 'tsla-american-desantis-20260706-en.svg',     label: 'TSLA_미국산DeSantis',         date: '20260706' },
  { ko: 'summary-20260706.svg',                    en: 'summary-20260706-en.svg',                    label: '7월06일_요약',                date: '20260706' },

  // ── 2026-07-07 ─────────────────────────────────────────────────────────
  { ko: 'tsla-japan-june-rank2-20260707.svg',      en: 'tsla-japan-june-rank2-20260707-en.svg',      label: 'TSLA_일본6월2위',        date: '20260707' },
  { ko: 'tsla-fsd-germany-bmv-20260707.svg',       en: 'tsla-fsd-germany-bmv-20260707-en.svg',       label: 'TSLA_독일FSD_TCMV',      date: '20260707' },
  { ko: 'tsla-cybercab-vs-waymo-20260707.svg',     en: 'tsla-cybercab-vs-waymo-20260707-en.svg',     label: 'TSLA_Cybercab_Waymo비교', date: '20260707' },
  { ko: 'tsla-fsd-v14-la-vegas-20260707.svg',      en: 'tsla-fsd-v14-la-vegas-20260707-en.svg',      label: 'TSLA_FSDv14_LA_Vegas',   date: '20260707' },
  { ko: 'morgan-stanley-robotaxi-1500-20260707.svg', en: 'morgan-stanley-robotaxi-1500-20260707-en.svg', label: 'MorganStanley_1500대', date: '20260707' },
  { ko: 'tepper-appaloosa-q1-20260707.svg',        en: 'tepper-appaloosa-q1-20260707-en.svg',        label: 'Tepper_Appaloosa',       date: '20260707' },
  { ko: 'msft-ai-layoffs-4800-20260707.svg',       en: 'msft-ai-layoffs-4800-20260707-en.svg',       label: 'MSFT_AI해고4800',        date: '20260707' },
  { ko: 'tsla-robotaxi-neworleans-20260707.svg',   en: 'tsla-robotaxi-neworleans-20260707-en.svg',   label: 'TSLA_Robotaxi뉴올리언스', date: '20260707' },
  { ko: 'spcx-nasdaq100-20260707.svg',             en: 'spcx-nasdaq100-20260707-en.svg',             label: 'SPCX_NASDAQ100_Optimus', date: '20260707' },
  { ko: 'tsla-uk-2nd-brand-20260707.svg',          en: 'tsla-uk-2nd-brand-20260707-en.svg',          label: 'TSLA_영국2위',           date: '20260707' },
  { ko: 'tsla-cybercab-blind-access-20260707.svg',  en: 'tsla-cybercab-blind-access-20260707-en.svg',  label: 'TSLA_시각장애인접근성',  date: '20260707' },
  { ko: 'tsla-optimus-china-mass-20260707.svg',    en: 'tsla-optimus-china-mass-20260707-en.svg',    label: 'TSLA_Optimus중국대량',   date: '20260707' },
  { ko: 'tsla-robotaxi-austin-coverage-20260707.svg', en: 'tsla-robotaxi-austin-coverage-20260707-en.svg', label: 'TSLA_Austin히트맵', date: '20260707' },
  { ko: 'tsla-giga-berlin-startups-20260707.svg',  en: 'tsla-giga-berlin-startups-20260707-en.svg',  label: 'TSLA_GigaBerlin스타트업', date: '20260707' },
  { ko: 'mu-dram-ai-optimism-20260707.svg',        en: 'mu-dram-ai-optimism-20260707-en.svg',        label: 'MU_DRAM_AI낙관론',       date: '20260707' },
  { ko: 'tsla-giga-texas-colors-20260707.svg',     en: 'tsla-giga-texas-colors-20260707-en.svg',     label: 'TSLA_기가텍사스컬러',    date: '20260707' },
  { ko: 'ms-portfolio-shift-20260707.svg',         en: 'ms-portfolio-shift-20260707-en.svg',         label: 'MS_포트폴리오전환',      date: '20260707' },
  { ko: 'summary-20260707.svg',                    en: 'summary-20260707-en.svg',                    label: '7월07일_요약',           date: '20260707' },
  { ko: 'nvda-kyber-rack-20260708.svg',           en: 'nvda-kyber-rack-20260708-en.svg',           label: 'NVDA_KyberRack',         date: '20260708' },
  { ko: 'tsla-home-energy-optiwatts-20260708.svg',en: 'tsla-home-energy-optiwatts-20260708-en.svg',label: 'TSLA_Optiwatts',         date: '20260708' },
  { ko: 'tsla-optimus-job-20260708.svg',          en: 'tsla-optimus-job-20260708-en.svg',          label: 'TSLA_OptimusJob',        date: '20260708' },
  { ko: 'oil-arab-light-crude-20260708.svg',      en: 'oil-arab-light-crude-20260708-en.svg',      label: 'OIL_ArabLight',          date: '20260708' },
  { ko: 'spcx-qqq-wsj-20260708.svg',             en: 'spcx-qqq-wsj-20260708-en.svg',             label: 'SPCX_QQQ_WSJ',           date: '20260708' },
  { ko: 'tsla-impact-cybercab-gpu-20260708.svg',  en: 'tsla-impact-cybercab-gpu-20260708-en.svg',  label: 'TSLA_CybercabGPU',       date: '20260708' },
  { ko: 'tsla-impact-fsd-safety-20260708.svg',    en: 'tsla-impact-fsd-safety-20260708-en.svg',    label: 'TSLA_FSDSafety',         date: '20260708' },
  { ko: 'tsla-impact-300features-20260708.svg',   en: 'tsla-impact-300features-20260708-en.svg',   label: 'TSLA_300Features',       date: '20260708' },
  { ko: 'tsla-impact-modely-cost-20260708.svg',   en: 'tsla-impact-modely-cost-20260708-en.svg',   label: 'TSLA_ModelYCost',        date: '20260708' },
  { ko: 'pltr-revenue-growth-20260708.svg',       en: 'pltr-revenue-growth-20260708-en.svg',       label: 'PLTR_Revenue',           date: '20260708' },
  { ko: 'treasury-ai-bubble-20260708.svg',        en: 'treasury-ai-bubble-20260708-en.svg',        label: 'Treasury_AIBubble',      date: '20260708' },
  { ko: 'spcx-raymond-james-550-20260708.svg',    en: 'spcx-raymond-james-550-20260708-en.svg',    label: 'SPCX_RJ550',             date: '20260708' },
  { ko: 'tsla-cybercab-spotted-20260708.svg',     en: 'tsla-cybercab-spotted-20260708-en.svg',     label: 'TSLA_CybercabSpotted',   date: '20260708' },
  { ko: 'tsla-cybercab-fleet-ebitda-20260708.svg',en: 'tsla-cybercab-fleet-ebitda-20260708-en.svg',label: 'TSLA_FleetEBITDA',       date: '20260708' },
  { ko: 'anthropic-overtakes-openai-20260708.svg',en: 'anthropic-overtakes-openai-20260708-en.svg',label: 'Anthropic_OpenAI',       date: '20260708' },
  { ko: 'tsla-megapack-global-15gw-20260708.svg', en: 'tsla-megapack-global-15gw-20260708-en.svg', label: 'TSLA_Megapack15GW',      date: '20260708' },
  { ko: 'summary-20260708.svg',                   en: 'summary-20260708-en.svg',                   label: '7월08일_요약',            date: '20260708' },
  { ko: 'tsla-impact-renewable-2040-20260709.svg',   en: 'tsla-impact-renewable-2040-20260709-en.svg',   label: 'TSLA_2040넷제로',        date: '20260709' },
  { ko: 'tsla-impact-battery-recycling-20260709.svg',en: 'tsla-impact-battery-recycling-20260709-en.svg',label: 'TSLA_배터리재활용',      date: '20260709' },
  { ko: 'tsla-cybercab-design-20260709.svg',         en: 'tsla-cybercab-design-20260709-en.svg',         label: 'TSLA_Cybercab설계',      date: '20260709' },
  { ko: 'tsla-robotaxi-florida-20260709.svg',        en: 'tsla-robotaxi-florida-20260709-en.svg',        label: 'TSLA_RobotaxiFL',        date: '20260709' },
  { ko: 'waymo-4cities-20260709.svg',                en: 'waymo-4cities-20260709-en.svg',                label: 'Waymo_4Cities',          date: '20260709' },
  { ko: 'xai-grok45-vs-opus48-20260709.svg',         en: 'xai-grok45-vs-opus48-20260709-en.svg',         label: 'xAI_Grok45',             date: '20260709' },
  { ko: 'aapl-broadcom-fortcollins-20260709.svg',    en: 'aapl-broadcom-fortcollins-20260709-en.svg',    label: 'AAPL_AVGO_FortCollins',  date: '20260709' },
  { ko: 'nvda-china-yuan-100-20260709.svg',          en: 'nvda-china-yuan-100-20260709-en.svg',          label: 'NVDA_ChinaYuan',         date: '20260709' },
  { ko: 'blueorigin-capital-raise-20260709.svg',     en: 'blueorigin-capital-raise-20260709-en.svg',     label: 'BlueOrigin_CapRaise',    date: '20260709' },
  { ko: 'cost-june-sales-20260709.svg',              en: 'cost-june-sales-20260709-en.svg',              label: 'COST_June',              date: '20260709' },
  { ko: 'jpy-hedge-short-2007-20260709.svg',         en: 'jpy-hedge-short-2007-20260709-en.svg',         label: 'JPY_Short2007',          date: '20260709' },
  { ko: 'summary-20260709.svg',                      en: 'summary-20260709-en.svg',                      label: '7월09일_요약',            date: '20260709' },
  { ko: 'tsla-optimus-giga-texas-20260710.svg',      en: 'tsla-optimus-giga-texas-20260710-en.svg',      label: 'TSLA_Optimus_GigaTX',    date: '20260710' },
  { ko: 'tsla-cybercab-austin-fence-20260710.svg',   en: 'tsla-cybercab-austin-fence-20260710-en.svg',   label: 'TSLA_Cybercab_Austin',   date: '20260710' },
  { ko: 'tsla-ubs-pt-442-20260710.svg',              en: 'tsla-ubs-pt-442-20260710-en.svg',              label: 'TSLA_UBS_PT442',         date: '20260710' },
  { ko: 'tsla-switzerland-model-y-20260710.svg',     en: 'tsla-switzerland-model-y-20260710-en.svg',     label: 'TSLA_Switzerland_1위',   date: '20260710' },
  { ko: 'spcx-raymond-james-pt8800-20260710.svg',    en: 'spcx-raymond-james-pt8800-20260710-en.svg',    label: 'SPCX_RJ_PT8800',         date: '20260710' },
  { ko: 'spcx-starlink-1589-h1-20260710.svg',        en: 'spcx-starlink-1589-h1-20260710-en.svg',        label: 'SPCX_Starlink1589',      date: '20260710' },
  { ko: 'mu-dram-nand-tight-2027-20260710.svg',      en: 'mu-dram-nand-tight-2027-20260710-en.svg',      label: 'MU_DRAM_NAND_2027',      date: '20260710' },
  { ko: 'nvda-burry-depreciation-20260710.svg',      en: 'nvda-burry-depreciation-20260710-en.svg',      label: 'NVDA_Burry_Depr',        date: '20260710' },
  { ko: 'meta-super-sensing-glasses-20260710.svg',   en: 'meta-super-sensing-glasses-20260710-en.svg',   label: 'META_SuperSensing',      date: '20260710' },
  { ko: 'summary-20260710.svg',                      en: 'summary-20260710-en.svg',                      label: '7월10일_요약',            date: '20260710' },
  { ko: 'tsla-robotaxi-hub-cleaning-robot-20260713.svg',  en: 'tsla-robotaxi-hub-cleaning-robot-20260713-en.svg',  label: 'TSLA_Hub_청소로봇',    date: '20260713' },
  { ko: 'tsla-ai5-chip-samsung-tapeout-20260713.svg',     en: 'tsla-ai5-chip-samsung-tapeout-20260713-en.svg',     label: 'TSLA_AI5_삼성',        date: '20260713' },
  { ko: 'tsla-chicago-project-buster-20260713.svg',       en: 'tsla-chicago-project-buster-20260713-en.svg',       label: 'TSLA_Chicago_Buster',  date: '20260713' },
  { ko: 'tsla-cybercab-eric-c-50rides-20260713.svg',      en: 'tsla-cybercab-eric-c-50rides-20260713-en.svg',      label: 'TSLA_EricC_50rides',   date: '20260713' },
  { ko: 'tsla-fsd-v4-lite-hw3-20260713.svg',              en: 'tsla-fsd-v4-lite-hw3-20260713-en.svg',              label: 'TSLA_FSD_V4Lite',      date: '20260713' },
  { ko: 'spcx-starlink-v3-20sats-20260713.svg',           en: 'spcx-starlink-v3-20sats-20260713-en.svg',           label: 'SPCX_StarV3_20sats',   date: '20260713' },
  { ko: 'spcx-starship-13-july16-20260713.svg',           en: 'spcx-starship-13-july16-20260713-en.svg',           label: 'SPCX_Starship13',      date: '20260713' },
  { ko: 'mu-q2-9b-july23-20260713.svg',                   en: 'mu-q2-9b-july23-20260713-en.svg',                   label: 'MU_Q2_9B',             date: '20260713' },
  { ko: 'summary-20260713.svg',                           en: 'summary-20260713-en.svg',                           label: '7월13일_요약',          date: '20260713' },

  // ── 2026-07-14 ─────────────────────────────────────────────────────────
  { ko: 'tsla-bofa-460-buy-20260714.svg',                 en: 'tsla-bofa-460-buy-20260714-en.svg',                 label: 'TSLA_BofA_460',         date: '20260714' },
  { ko: 'tsla-jefferies-400-pt-20260714.svg',             en: 'tsla-jefferies-400-pt-20260714-en.svg',             label: 'TSLA_Jefferies_400',    date: '20260714' },
  { ko: 'spcx-faa-flight12-closed-20260714.svg',          en: 'spcx-faa-flight12-closed-20260714-en.svg',          label: 'SPCX_FAA_F12',          date: '20260714' },
  { ko: 'spcx-ath-12t-drawdown-20260714.svg',             en: 'spcx-ath-12t-drawdown-20260714-en.svg',             label: 'SPCX_ATH_1_2T',         date: '20260714' },
  { ko: 'spcx-congress-buys-20260714.svg',                en: 'spcx-congress-buys-20260714-en.svg',                label: 'SPCX_Congress_Buys',    date: '20260714' },
  { ko: 'tsmc-q2-396b-20260714.svg',                      en: 'tsmc-q2-396b-20260714-en.svg',                      label: 'TSMC_Q2_396B',          date: '20260714' },
  { ko: 'meta-louisiana-50b-20260714.svg',                en: 'meta-louisiana-50b-20260714-en.svg',                label: 'META_LA_50B',           date: '20260714' },
  { ko: 'semis-hf-buy-35yr-20260714.svg',                 en: 'semis-hf-buy-35yr-20260714-en.svg',                 label: 'Semis_HF_3_5yr',        date: '20260714' },
  { ko: 'summary-20260714.svg',                           en: 'summary-20260714-en.svg',                           label: '7월14일_요약',          date: '20260714' },
  // ── 2026-07-15 ─────────────────────────────────────────────────────────
  { ko: 'cpi-june-neg04-20260715.svg', en: 'cpi-june-neg04-20260715-en.svg', label: 'CPI_June_neg04', date: '20260715' },
  { ko: 'chamath-spcx-tsla-mna-20260715.svg', en: 'chamath-spcx-tsla-mna-20260715-en.svg', label: 'Chamath_TSLA_MNA', date: '20260715' },
  { ko: 'tsla-robotaxi-fleet-765-20260715.svg', en: 'tsla-robotaxi-fleet-765-20260715-en.svg', label: 'TSLA_Fleet_765', date: '20260715' },
  { ko: 'lucid-alixpartners-crash-20260715.svg', en: 'lucid-alixpartners-crash-20260715-en.svg', label: 'LCID_AlixPartners', date: '20260715' },
  { ko: 'burry-ai-circular-financing-20260715.svg', en: 'burry-ai-circular-financing-20260715-en.svg', label: 'Burry_AI_Circular', date: '20260715' },
  { ko: 'googl-steel-river-arkansas-20260715.svg', en: 'googl-steel-river-arkansas-20260715-en.svg', label: 'GOOGL_Steel_River', date: '20260715' },
  { ko: 'nvda-china-ban-tracker-claim-20260715.svg', en: 'nvda-china-ban-tracker-claim-20260715-en.svg', label: 'NVDA_Pelosi_Claim', date: '20260715' },
  { ko: 'foreign-us-equity-inflows-20260715.svg', en: 'foreign-us-equity-inflows-20260715-en.svg', label: 'Foreign_Inflows_900B', date: '20260715' },
  { ko: 'hyperion-tsla-3033m-20260715.svg', en: 'hyperion-tsla-3033m-20260715-en.svg', label: 'Hyperion_TSLA', date: '20260715' },
  { ko: 'cathie-qt-bogeyman-20260715.svg', en: 'cathie-qt-bogeyman-20260715-en.svg', label: 'Cathie_QT', date: '20260715' },
  { ko: 'tsla-fsd-netherlands-obstruction-20260715.svg', en: 'tsla-fsd-netherlands-obstruction-20260715-en.svg', label: 'TSLA_FSD_NL', date: '20260715' },
  { ko: 'aapl-iphone-ai-shrink-20260715.svg', en: 'aapl-iphone-ai-shrink-20260715-en.svg', label: 'AAPL_AI_Shrink', date: '20260715' },
  { ko: 'tsla-cybercab-miami-20260715.svg', en: 'tsla-cybercab-miami-20260715-en.svg', label: 'TSLA_Cybercab_Miami', date: '20260715' },
  { ko: 'tsla-antidooring-2026203-20260715.svg', en: 'tsla-antidooring-2026203-20260715-en.svg', label: 'TSLA_Antidooring', date: '20260715' },
  { ko: 'tsla-robotaxi-eu-hiring-20260715.svg', en: 'tsla-robotaxi-eu-hiring-20260715-en.svg', label: 'TSLA_EU_Hiring', date: '20260715' },
  { ko: 'jpm-dimon-169b-20260715.svg', en: 'jpm-dimon-169b-20260715-en.svg', label: 'JPM_169B', date: '20260715' },
  { ko: 'nflx-model-169-20260715.svg', en: 'nflx-model-169-20260715-en.svg', label: 'NFLX_Model_169', date: '20260715' },
  { ko: 'burry-fnma-193b-20260715.svg', en: 'burry-fnma-193b-20260715-en.svg', label: 'Burry_FNMA_193B', date: '20260715' },
  { ko: 'mu-etf-weights-20260715.svg', en: 'mu-etf-weights-20260715-en.svg', label: 'MU_ETF_Weights', date: '20260715' },
  { ko: 'tsla-barclays-370-20260715.svg', en: 'tsla-barclays-370-20260715-en.svg', label: 'TSLA_Barclays_370', date: '20260715' },
  { ko: 'tsmc-june-ttm-140b-20260715.svg', en: 'tsmc-june-ttm-140b-20260715-en.svg', label: 'TSMC_TTM_140B', date: '20260715' },
  { ko: 'xpeng-europe-vla2-20260715.svg', en: 'xpeng-europe-vla2-20260715-en.svg', label: 'XPENG_VLA2', date: '20260715' },
  { ko: 'tsla-grok-voice-3mo-20260715.svg', en: 'tsla-grok-voice-3mo-20260715-en.svg', label: 'TSLA_Grok_Voice', date: '20260715' },
  { ko: 'sndk-evercore-3100-20260715.svg', en: 'sndk-evercore-3100-20260715-en.svg', label: 'SNDK_Evercore_3100', date: '20260715' },
  { ko: 'samsung-sdi-tesla-ess-20260715.svg', en: 'samsung-sdi-tesla-ess-20260715-en.svg', label: 'SDI_Tesla_ESS', date: '20260715' },
  { ko: 'ibm-q2-miss-20260715.svg', en: 'ibm-q2-miss-20260715-en.svg', label: 'IBM_Q2_Miss', date: '20260715' },
  { ko: 'ibm-chips-billion-pols-20260715.svg', en: 'ibm-chips-billion-pols-20260715-en.svg', label: 'IBM_CHIPS_Pols', date: '20260715' },
  { ko: 'buffett-brk-12m-donation-20260715.svg', en: 'buffett-brk-12m-donation-20260715-en.svg', label: 'BRK_12M_Donation', date: '20260715' },
  { ko: 'retail-net-flows-6yr-low-20260715.svg', en: 'retail-net-flows-6yr-low-20260715-en.svg', label: 'Retail_Flows_6yr', date: '20260715' },
  { ko: 'tsmc-pricing-power-74pct-20260715.svg', en: 'tsmc-pricing-power-74pct-20260715-en.svg', label: 'TSMC_Pricing_74', date: '20260715' },
  { ko: 'ark-spcx-21m-buy-20260715.svg', en: 'ark-spcx-21m-buy-20260715-en.svg', label: 'ARK_SPCX_21M', date: '20260715' },
  { ko: 'tsla-fsd-europe-50m-km-20260715.svg', en: 'tsla-fsd-europe-50m-km-20260715-en.svg', label: 'TSLA_FSD_EU_50M', date: '20260715' },
  { ko: 'tsla-fsd-1435-first-drive-20260715.svg', en: 'tsla-fsd-1435-first-drive-20260715-en.svg', label: 'TSLA_FSD_1435', date: '20260715' },
  { ko: 'spcx-james-quiver-20260715.svg', en: 'spcx-james-quiver-20260715-en.svg', label: 'SPCX_James_Quiver', date: '20260715' },
  { ko: 'summary-20260715.svg', en: 'summary-20260715-en.svg', label: '7월15일_요약', date: '20260715' },

  // ── 2026-07-16 ─────────────────────────────────────────────────────────
  { ko: 'tsla-fsd-2026-21-100-eu-20260716.svg', en: 'tsla-fsd-2026-21-100-eu-20260716-en.svg', label: 'tsla-fsd-2026-21-100-eu', date: '20260716' },
  { ko: 'tsla-optimus-1m-10m-lines-20260716.svg', en: 'tsla-optimus-1m-10m-lines-20260716-en.svg', label: 'tsla-optimus-1m-10m-lines', date: '20260716' },
  { ko: 'buffett-inflation-value-comments-20260716.svg', en: 'buffett-inflation-value-comments-20260716-en.svg', label: 'buffett-inflation-value-comments', date: '20260716' },
  { ko: 'tsla-price-cuts-winding-down-kbb-20260716.svg', en: 'tsla-price-cuts-winding-down-kbb-20260716-en.svg', label: 'tsla-price-cuts-winding-down-kbb', date: '20260716' },
  { ko: 'nvda-jensen-vera-rubin-production-20260716.svg', en: 'nvda-jensen-vera-rubin-production-20260716-en.svg', label: 'nvda-jensen-vera-rubin-production', date: '20260716' },
  { ko: 'tsla-robotaxi-texas-economics-20260716.svg', en: 'tsla-robotaxi-texas-economics-20260716-en.svg', label: 'tsla-robotaxi-texas-economics', date: '20260716' },
  { ko: 'tsla-model-y-europe-bestseller-20260716.svg', en: 'tsla-model-y-europe-bestseller-20260716-en.svg', label: 'tsla-model-y-europe-bestseller', date: '20260716' },
  { ko: 'trump-equinix-data-center-stock-20260716.svg', en: 'trump-equinix-data-center-stock-20260716-en.svg', label: 'trump-equinix-data-center-stock', date: '20260716' },
  { ko: 'aapl-ai-chip-acquisition-hunt-20260716.svg', en: 'aapl-ai-chip-acquisition-hunt-20260716-en.svg', label: 'aapl-ai-chip-acquisition-hunt', date: '20260716' },
  { ko: 'spcx-below-ipo-price-20260716.svg', en: 'spcx-below-ipo-price-20260716-en.svg', label: 'spcx-below-ipo-price', date: '20260716' },
  { ko: 'asml-earnings-beat-terafab-musk-20260716.svg', en: 'asml-earnings-beat-terafab-musk-20260716-en.svg', label: 'asml-earnings-beat-terafab-musk', date: '20260716' },
  { ko: 'bofa-fms-cash-level-sell-signal-20260716.svg', en: 'bofa-fms-cash-level-sell-signal-20260716-en.svg', label: 'bofa-fms-cash-level-sell-signal', date: '20260716' },
  { ko: 'tsla-v14-lite-coast-to-coast-20260716.svg', en: 'tsla-v14-lite-coast-to-coast-20260716-en.svg', label: 'tsla-v14-lite-coast-to-coast', date: '20260716' },
  { ko: 'ev-owners-switch-back-survey-20260716.svg', en: 'ev-owners-switch-back-survey-20260716-en.svg', label: 'ev-owners-switch-back-survey', date: '20260716' },
  { ko: 'googl-buffett-berkshire-stake-34pct-20260716.svg', en: 'googl-buffett-berkshire-stake-34pct-20260716-en.svg', label: 'googl-buffett-berkshire-stake-34pct', date: '20260716' },
  { ko: 'aapl-ondevice-ai-china-qwen-20260716.svg', en: 'aapl-ondevice-ai-china-qwen-20260716-en.svg', label: 'aapl-ondevice-ai-china-qwen', date: '20260716' },
  { ko: 'summary-20260716.svg', en: 'summary-20260716-en.svg', label: '7월16일_요약', date: '20260716' },
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
    .resize({ width: 1440, kernel: 'lanczos3' })
    .toFile(pngFile);
}

(async () => {
  if (!fs.existsSync(REPORT_DIR)) {
    console.error(`Report dir not found: ${REPORT_DIR}`);
    process.exit(1);
  }

  // 기본값: 오늘 날짜만 내보냄. --all 플래그로 전체 내보내기 가능
  const exportAll = process.argv.includes('--all');
  const dateArg = process.argv.find(a => /^\d{8}$/.test(a)); // 날짜 직접 지정 (e.g. 20260622)
  const kstOffset = 9 * 60 * 60 * 1000;
  const today = dateArg ?? new Date(Date.now() + kstOffset).toISOString().slice(0, 10).replace(/-/g, ''); // KST 'YYYYMMDD'
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
