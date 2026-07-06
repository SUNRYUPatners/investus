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
