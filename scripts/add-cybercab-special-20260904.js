#!/usr/bin/env node
/**
 * 2026-09-04 특집: 테슬라 사이버캡 출시 행사 종료 후 종합 정리
 * — seed-1500 + SVG KO/EN + 애널·종토방 1세트
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "charts");
const TAG = "20260904";
const DATE = "2026.09.04";
const SLUG = "cybercab-launch-wrap";

// ── SVG helpers (gen-reports-20260904 스타일 L5 Before→After) ───────────────
const P = {
  TSLA: { fg: "#4ade80", fg2: "#22c55e", bg2: "#061209", card: "#0a1a0a" },
};
const BRAND_KO = "investus.kr SRP 최고투자책임자 발행 · NOT FINANCIAL ADVICE";
const BRAND_EN = "investus.kr SRP Chief Investment Officer · NOT FINANCIAL ADVICE";

function esc(s) {
  return String(s)
    .replace(/&(?!(amp|lt|gt|quot|apos);)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function estimatePxWidth(text, fontSize, isBold) {
  const b = isBold ? 1.13 : 1.0;
  let w = 0;
  for (const c of String(text)) {
    if (/[가-힣一-龥ぁ-ゟァ-ヿ]/.test(c)) w += fontSize * b;
    else if (/\s/.test(c)) w += fontSize * 0.3;
    else if (/[·—–:%]/.test(c)) w += fontSize * 0.45;
    else if (/[iljI!.,;'"`()]/.test(c)) w += fontSize * 0.32 * b;
    else if (/[mwMW]/.test(c)) w += fontSize * 0.85 * b;
    else if (/[A-Z0-9$]/.test(c)) w += fontSize * 0.64 * b;
    else w += fontSize * 0.56 * b;
  }
  return w;
}
function ml(text, x, y, fontSize, maxPx, maxLines, lh, attrs) {
  const bold = /font-weight="?(bold|[89]00)/i.test(attrs) || /Arial Black/.test(attrs);
  const est = (t) => estimatePxWidth(t, fontSize, bold);
  if (est(text) <= maxPx) return `  <text x="${x}" y="${y}" ${attrs}>${esc(text)}</text>`;
  const words = String(text).split(/(\s+)/).filter((s) => s !== "");
  const parts = [];
  for (const wd of words) {
    if (est(wd) <= maxPx) {
      parts.push(wd);
      continue;
    }
    let tmp = wd;
    while (est(tmp) > maxPx) {
      let cut = 1;
      while (cut < tmp.length && est(tmp.slice(0, cut + 1)) <= maxPx) cut++;
      parts.push(tmp.slice(0, cut));
      tmp = tmp.slice(cut);
    }
    if (tmp) parts.push(tmp);
  }
  const lines = [];
  let cur = "";
  for (const p of parts) {
    if (est(cur + p) <= maxPx) {
      cur += p;
      continue;
    }
    if (cur.trim()) lines.push(cur.trim());
    cur = /^\s+$/.test(p) ? "" : p;
  }
  if (cur.trim()) lines.push(cur.trim());
  const out = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let last = out[maxLines - 1];
    while (last.length > 1 && est(last + "…") > maxPx) last = last.slice(0, -1);
    out[maxLines - 1] = last + "…";
  }
  return out
    .map(
      (l, i) =>
        `  <text x="${x}" y="${y + i * lh}" ${attrs}>${esc(l)}</text>`,
    )
    .join("\n");
}
function head(p) {
  const bw = Math.max(110, Math.min(230, Math.round(estimatePxWidth("TSLA", 16, true) + 44)));
  return `  <rect width="1080" height="1080" fill="url(#bg)"/>
  <rect width="1080" height="1080" fill="none" stroke="#1f2937" stroke-width="2"/>
  <rect x="0" y="0" width="1080" height="5" fill="url(#g)"/>
  <rect x="40" y="20" width="${bw}" height="38" rx="19" fill="${p.fg}30" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="${40 + bw / 2}" y="44" font-family="Arial Black,Arial" font-size="16" font-weight="900" fill="${p.fg}" text-anchor="middle">TSLA</text>
  <text x="540" y="46" font-family="Arial" font-size="13" fill="#6b7280" text-anchor="middle" letter-spacing="3">INVESTUS DAILY REPORT</text>
  <rect x="900" y="20" width="148" height="38" rx="19" fill="#1f2937" stroke="#374151"/>
  <text x="974" y="44" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle">${DATE}</text>`;
}
function shell(p, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#0d1117"/><stop offset="100%" style="stop-color:${p.bg2}"/></linearGradient>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:${p.fg}"/><stop offset="100%" style="stop-color:${p.fg2}"/></linearGradient>
  </defs>
${inner}
</svg>`;
}
function foot(p, footer, ko, y) {
  return `  <text x="540" y="${y}" font-family="Arial" font-size="16" fill="#374151" text-anchor="middle">${esc(footer)} · ${DATE}</text>
  <rect x="0" y="1060" width="1080" height="20" fill="url(#g)" opacity=".4"/>
  <text x="540" y="1073" font-family="Arial" font-size="11" fill="#6b7280" text-anchor="middle" letter-spacing="2">${ko ? BRAND_KO : BRAND_EN}</text>`;
}
function noteBox(p, o, y, h, ko) {
  return `  <rect x="60" y="${y}" width="960" height="${h}" rx="14" fill="${p.card}" stroke="${p.fg}" stroke-width="1"/>
  <text x="540" y="${y + 30}" font-family="Arial" font-size="18" fill="${p.fg}" text-anchor="middle">${esc(o.noteHead || (ko ? "왜 중요한가" : "Why it matters"))}</text>
${ml(o.noteSub, 540, y + 62, 16, 940, 4, 22, `font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle"`)}`;
}
function quoteBox(p, text, y, h, size, maxLines, lh) {
  return `  <rect x="60" y="${y}" width="960" height="${h}" rx="16" fill="#0f172a" stroke="#374151"/>
${ml(text, 540, y + 46, size, 930, maxLines, lh, `font-family="Arial" font-size="${size}" fill="${p.fg}" text-anchor="middle"`)}`;
}
function L5(o, ko) {
  const p = P.TSLA;
  const cards = o.cards
    .map((c, i) => {
      const x = [60, 390, 720][i];
      return `
  <rect x="${x}" y="548" width="300" height="164" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="1.5"/>
  <text x="${x + 150}" y="592" font-family="Arial" font-size="32" text-anchor="middle">${c.icon}</text>
${ml(c.big, x + 150, 634, 24, 272, 1, 26, `font-family="Arial Black,Arial" font-size="24" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(c.mid, x + 150, 662, 17, 272, 1, 20, `font-family="Arial" font-size="17" fill="#9ca3af" text-anchor="middle"`)}
${ml(c.sub, x + 150, 686, 15, 274, 2, 19, `font-family="Arial" font-size="15" fill="#6b7280" text-anchor="middle"`)}`;
    })
    .join("");
  return shell(
    p,
    `${head(p)}
${ml(o.title, 540, 106, 28, 970, 2, 34, `font-family="Arial Black,Arial" font-size="28" font-weight="900" fill="#f9fafb" text-anchor="middle"`)}
  <line x1="80" y1="150" x2="1000" y2="150" stroke="#1f2937" stroke-width="1"/>
  <text x="540" y="222" font-family="Arial" font-size="62" text-anchor="middle">${o.heroIcon}</text>
${ml(o.heroBig, 540, 272, 34, 940, 1, 36, `font-family="Arial Black,Arial" font-size="34" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.heroSub, 540, 308, 19, 940, 2, 25, `font-family="Arial" font-size="19" fill="#9ca3af" text-anchor="middle"`)}
  <rect x="60" y="356" width="420" height="168" rx="16" fill="#0a0a14" stroke="#374151" stroke-width="1.5"/>
  <text x="270" y="400" font-family="Arial" font-size="20" fill="#6b7280" text-anchor="middle">${esc(o.before.label)}</text>
${ml(o.before.big, 270, 460, 44, 384, 1, 46, `font-family="Arial Black,Arial" font-size="44" font-weight="900" fill="#9ca3af" text-anchor="middle"`)}
${ml(o.before.sub, 270, 496, 16, 388, 1, 20, `font-family="Arial" font-size="16" fill="#6b7280" text-anchor="middle"`)}
  <text x="540" y="455" font-family="Arial Black,Arial" font-size="40" fill="${p.fg}" text-anchor="middle">&#8594;</text>
  <rect x="600" y="356" width="420" height="168" rx="16" fill="${p.card}" stroke="${p.fg}" stroke-width="2"/>
  <text x="810" y="400" font-family="Arial" font-size="20" fill="${p.fg}" text-anchor="middle">${esc(o.after.label)}</text>
${ml(o.after.big, 810, 460, 44, 384, 1, 46, `font-family="Arial Black,Arial" font-size="44" font-weight="900" fill="${p.fg}" text-anchor="middle"`)}
${ml(o.after.sub, 810, 496, 16, 388, 1, 20, `font-family="Arial" font-size="16" fill="#9ca3af" text-anchor="middle"`)}${cards}
${quoteBox(p, o.quote, 730, 134, 18, 3, 25)}
${noteBox(p, o, 878, 140, ko)}
${foot(p, o.footer, ko, 1042)}`,
  );
}

const koSvg = L5(
  {
    title: "사이버캡 출시 특집 — 행사가 끝난 뒤 남은 것",
    heroIcon: "🚕",
    heroBig: "시연 → 유료 승차",
    heroSub:
      "2024년 시제품 공개 후 약 2년. 오스틴 제한 구역에서 앱으로 배차됩니다.",
    before: { label: "2024.10 We, Robot", big: "시제품", sub: "핸들·페달 없는 콘셉트" },
    after: { label: "2026.09.03 Austin", big: "상용", sub: "로보택시 앱 유료 배차" },
    cards: [
      {
        icon: "📱",
        big: "4.20달러",
        mid: "앱 표시 요금",
        sub: "2인승·4인승 선택",
      },
      {
        icon: "📋",
        big: "45 / 420",
        mid: "텍사스 등록",
        sub: "전용차 45 · 전체 420",
      },
      {
        icon: "🌏",
        big: "아시아 전시",
        mid: "홍콩·도쿄 등",
        sub: "서비스 아닌 디스플레이",
      },
    ],
    quote:
      "생중계 없는 비공개 행사였지만, 웹·앱은 「오스틴 제한 구역에서 사이버캡 탑승 가능」으로 바뀌었습니다. 플릿 관심 양식도 같은 날 열렸습니다.",
    noteHead: "왜 중요한가",
    noteSub:
      "말이 아니라 배차 화면이 남았습니다. 다만 대수는 45대로 작고, 차종을 지정해 부를 수 없어 모델와이가 더 자주 옵니다. 다음 확인은 주간 유료 마일·지오펜스·인가 증가입니다.",
    footer: "Cybercab launch wrap · Austin commercial",
  },
  true,
);

const enSvg = L5(
  {
    title: "Cybercab launch wrap — what remains after the event",
    heroIcon: "🚕",
    heroBig: "Demo → Paid rides",
    heroSub:
      "About two years after the 2024 prototype. App dispatch in limited Austin zones.",
    before: { label: "2024.10 We, Robot", big: "Prototype", sub: "No wheel / pedals concept" },
    after: { label: "2026.09.03 Austin", big: "Commercial", sub: "Paid Robotaxi app rides" },
    cards: [
      {
        icon: "📱",
        big: "$4.20",
        mid: "In-app fare",
        sub: "2-seat vs 4-seat choice",
      },
      {
        icon: "📋",
        big: "45 / 420",
        mid: "Texas registry",
        sub: "45 purpose-built of 420",
      },
      {
        icon: "🌏",
        big: "Asia tour",
        mid: "HK · Tokyo · more",
        sub: "Display, not service yet",
      },
    ],
    quote:
      "No livestream, but the site and app now say Cybercab rides are available in limited Austin areas. A commercial fleet interest form opened the same day.",
    noteHead: "Why it matters",
    noteSub:
      "Screens replaced slogans. Fleet is still small at 45 units, and you cannot force a Cybercab over a Model Y. Next checks: weekly paid miles, geofence, and authorized count growth.",
    footer: "Cybercab launch wrap · Austin commercial",
  },
  false,
);

fs.writeFileSync(path.join(OUT, `${SLUG}-${TAG}.svg`), koSvg);
fs.writeFileSync(path.join(OUT, `${SLUG}-${TAG}-en.svg`), enSvg);
console.log("✓ SVG written");

// ── Report body ─────────────────────────────────────────────────────────────
const title =
  "사이버캡 출시 특집입니다. 오스틴 행사가 끝난 뒤 앱 배차·플릿 양식·아시아 전시가 남았습니다";
const summary = `테슬라는 2026년 9월 3일 텍사스 오스틴에서 초청 행사로 전용 로보택시 사이버캡을 상용 서비스에 올렸습니다. 생중계는 없었고, 로보택시 앱·웹이 「오스틴 제한 구역에서 탑승 가능」으로 바뀐 것이 공식에 가깝습니다.

핸들·페달 없는 2인승이며, 텍사스 등록 기준 전용차는 약 45대(전체 로보택시 등록 약 420대 중)입니다. 앱에서는 요금 약 4.20달러·사이버캡 2인승과 모델와이 4인승이 함께 보였고, 같은 날 상업용 플릿 관심 양식이 열렸습니다. 아시아(홍콩·도쿄·베이징·상하이)는 이달 전시 안내이며 서비스 개시는 아닙니다.`;

const body = `■ 상세

사이버캡은 처음부터 무인 승차 공유를 위해 만든 2인승 전기차입니다. 운전대와 페달이 없고, 나비처럼 위로 열리는 문이 특징입니다. 2024년 10월 「위, 로봇」 행사에서 시제품을 처음 보여 준 뒤 약 2년이 지나, 2026년 9월 3일 오스틴에서 상용 배차 단계로 넘어갔습니다.

행사 자체는 초청객만 모인 비공개였고 공식 생중계는 없었습니다. 대신 회사가 남긴 흔적은 더 실용적입니다. 로보택시 웹과 앱이 「오스틴의 제한된 구역에서 사이버캡을 탈 수 있다」고 안내하고, 참석자와 일반 이용자가 같은 앱으로 목적지를 넣고 요금을 확인한 뒤 차를 부를 수 있게 됐습니다. 차종을 지정해 사이버캡만 부르는 기능은 없고, 배정은 가용 차량에 따릅니다. 지금은 모델와이 로보택시가 훨씬 많기 때문에, 앱을 열어도 전용 차가 꼭 오지는 않습니다.

텍사스 차량 등록 기준으로 보면, 행사 직전 전용 사이버캡은 약 45대, 주에 잡힌 로보택시 전체는 약 420대(모델와이 중심)로 집계됐습니다. 등록은 상업 운행을 위한 선행 조건이지, 45대가 전부 동시에 손님을 태운다는 뜻은 아닙니다. 전비는 마일당 약 165와트시, 배터리는 약 48킬로와트시, 운용 원가 마일당 약 20센트·구매가 3만 달러 미만이 행사 전후 스펙·원가 축으로 소개됐습니다. 앱 화면의 한 건 요금은 약 4.20달러였습니다. 사이버캡 탑승 연령은 13세 미만 금지로, 모델와이 로보택시보다 더 엄격합니다.

같은 날 「로보택시 네트워크를 함께 만들자」는 취지의 관심 양식이 열렸습니다. 회사명·지역·사이버캡 플릿 구매·모빌리티 허브 등 항목을 고르면 담당자가 연락한다는 구조입니다. 소비자용 주문 화면이나 확정 가격·납기는 아직 없습니다. 과거 거론된 대당 2만 5천~3만 달러대 목표는 참고치일 뿐입니다. 이어 아시아 공식 계정은 홍콩·도쿄·베이징·상하이에서 이달 사이버캡을 「경험」할 수 있다고 안내했는데, 현재까지는 매장·행사 전시 성격이지 현지 유료 로보택시 개시는 아닙니다.

주가는 행사일 종가 기준 약 376.37달러로 5.42% 올랐고, 장중에는 더 높게 반응한 구간이 있었습니다. 경쟁사 웨이모는 이미 수천 대 규모의 무인 플릿을 여러 도시에 두고 있어, 「상용 첫 걸음」과 「규모」는 아직 다른 이야기입니다.

■ 왜 이 뉴스가 중요한가

1. 2016년부터 이어진 「언젠가 완전 자율」 내러티브가, 핸들 없는 생산차로 유료 손님을 태우는 단계로 내려왔습니다. 말이 아니라 배차·요금 화면이 증거입니다.

2. 전용 하드웨어와 기존 모델와이 플릿이 한 앱에 공존합니다. 생산이 늦어도 수요를 모델와이로 받을 수 있지만, 전용차 희소성은 「탔다」는 경험의 희소성으로 남습니다.

3. 텍사스 45대·제한 지오펜스는 시작 규모입니다. 주가 반응은 규모보다 「문턱을 넘었다」는 신호에 가깝습니다. 인가 대수와 유료 마일이 늘지 않으면 기대는 다시 조여집니다.

4. 플릿 관심 양식은 자사 운영만으로 네트워크를 키우지 않겠다는 신호입니다. 다만 가격·납기·주별 규제 없이 주문으로 이어지지는 않습니다.

5. 아시아 전시는 마케팅이고, 오스틴 배차는 실행입니다. 두 축을 한 헤드라인으로 합치면 과대해석이 됩니다.

■ 시나리오

**가: 주간으로 유료 마일·인가 대수가 늘고 지오펜스가 넓어지면, 실행 서사가 강화됩니다.**
**나: 앱은 열려 있어도 배정이 모델와이뿐이고 전용차가 안 보이면, 「출시」 체감이 약해질 수 있습니다.**
**다: 사고·연방 조사·보험 이슈가 커지면, 제한 구역 서비스가 일시 멈출 수 있습니다.**

■ 오늘까지 흐름

2024년 10월 시제품 공개 → 2026년 기가 텍사스 생산·도로 시험 → 9월 3일 오스틴 초청 행사·앱 상용 안내·플릿 양식·주가 +5.42% → 9월 4일 특집으로 잔여 팩트를 한 장에 묶음.

■ 장기 투자 관점

로보택시는 「소프트웨어 약속」에서 「허가된 마일·원가·이용률」로 평가 기준이 바뀌는 10년 테마입니다. 사이버캡은 운전석을 없애 원가·좌석·엔터테인먼트 공간을 무인 운행에 맞춘 하드웨어입니다.

과거 10년은 일정 지연이 반복됐습니다. 이번처럼 날짜·앱·등록 대수가 겹치는 구간은, 단기 주가와 별개로 5년 뷰에서 실행 리스크가 한 단계 줄어든 기록으로 남을 수 있습니다. 다만 웨이모 대비 규모 격차, 연방 안전 기준·조사, 보험 손실률은 여전히 긴 줄입니다. 인내 투자자는 분기마다 무인 비중·도시 수·마일당 원가를 표로 쌓는 편이, 행사 하루의 등락보다 낫습니다.

■ 앞으로 볼 것

(1) 오스틴에서 사이버캡이 실제로 배정되는 빈도와 평균 대기 시간을 확인하시기 바랍니다.

(2) 텍사스 무인 인가 대수(45대)와 지오펜스 면적 업데이트를 주간으로 보시면 됩니다.

(3) 플릿 관심 양식이 견적·계약으로 이어지는지, 가격·납기 공개 여부를 추적하시기 바랍니다.

(4) 아시아 전시 일정과 「서비스 개시」 혼동을 피하고, 현지 규제 뉴스를 따로 보시면 됩니다.

(5) 사고·리콜·연방 조사 공지와 앱 약관(연령·보험) 변경을 확인하시기 바랍니다.

■ 투자시사점

출시 특집은 「문턱을 넘었다」는 사실 정리입니다. 45대와 제한 구역을 전국 네트워크로 확대 해석하지 마시기 바랍니다.

요금 4.20달러·원가 20센트·전비 165와트시는 같은 메모에 두되, 실도로·보험·공차 회송이 빠진 숫자인지 표시해 두시면 됩니다. 주가 +5.42%는 기대가 먼저 반영된 구간일 수 있으니, 다음 4~12주 유료 마일 표가 나온 뒤에 포지션 크기를 다시 보시는 편이 안전합니다.

investus.kr SRP 최고투자책임자 발행`;

const reportBlock = `  {
    id: "seed-1500",
    title: ${JSON.stringify(title)},
    summary: ${JSON.stringify(summary)},
    body: ${JSON.stringify(body)},
    titleEn: "Cybercab launch special: after Austin, app rides, fleet form, and Asia displays remain",
    summaryEn: "Sept 3 Austin invite-only launch put purpose-built Cybercab into limited Robotaxi service. No livestream; app/web say rides available. ~45 of ~420 TX units; ~$4.20 fare; fleet interest form; Asia display tour (not service). TSLA +5.42%.",
    bodyEn: "See Korean body.\\n\\ninvestus.kr SRP Chief Investment Officer",
    category: "특집",
    categoryColor: "mint",
    subject: "특집",
    date: "2026.09.04",
    updatedAt: "2026.09.04 14:20",
    images: ["/charts/${SLUG}-${TAG}.svg"],
    imagesEn: ["/charts/${SLUG}-${TAG}-en.svg"],
  },
`;

// Insert after seed-1476 block (after 한장요약) — find closing of seed-1476
const reportsPath = path.join(ROOT, "lib/reports.ts");
let reportsSrc = fs.readFileSync(reportsPath, "utf8");
if (reportsSrc.includes('id: "seed-1500"')) {
  console.log("seed-1500 already present — skip reports insert");
} else {
  const marker = '    imagesEn: ["/charts/summary-20260904-en.svg"],\n  },\n  {\n    id: "seed-1477"';
  if (!reportsSrc.includes(marker)) {
    console.error("insert marker not found");
    process.exit(1);
  }
  reportsSrc = reportsSrc.replace(
    marker,
    `    imagesEn: ["/charts/summary-20260904-en.svg"],\n  },\n${reportBlock}  {\n    id: "seed-1477"`,
  );
  fs.writeFileSync(reportsPath, reportsSrc);
  console.log("✓ lib/reports.ts seed-1500 inserted");
}

// fix-reports slug list
const fixReportsPath = path.join(ROOT, "scripts/fix-reports-20260904-ko-reports.js");
let fixSrc = fs.readFileSync(fixReportsPath, "utf8");
if (!fixSrc.includes("seed-1500")) {
  const entry = `  {
    "id": "seed-1500",
    "slug": "${SLUG}",
    "category": "특집",
    "color": "mint",
    "subject": "특집",
    "title": ${JSON.stringify(title)},
    "summary": ${JSON.stringify(summary)},
    "titleEn": "Cybercab launch special: after Austin, app rides, fleet form, and Asia displays remain",
    "summaryEn": "Sept 3 Austin invite-only launch put purpose-built Cybercab into limited Robotaxi service. No livestream; app/web say rides available. ~45 of ~420 TX units; ~$4.20 fare; fleet interest form; Asia display tour (not service). TSLA +5.42%."
  },
`;
  fixSrc = fixSrc.replace("module.exports = [\n", `module.exports = [\n${entry}`);
  fs.writeFileSync(fixReportsPath, fixSrc);
  console.log("✓ fix-reports-ko-reports.js updated");
}

// analyst post -1031
const analystPath = path.join(ROOT, "lib/analystPosts.ts");
let analystSrc = fs.readFileSync(analystPath, "utf8");
if (!analystSrc.includes("id: -1031")) {
  const post = `  {
    id: -1031, alias: "잠실 백로 #29", symbol: "TSLA",
    content: "특집 한 장만 보시면 됩니다. 9월 3일 오스틴 행사는 생중계 없이 끝났고, 남는 건 앱 배차·요금 약 4.20달러·텍사스 전용차 약 45대(전체 약 420대)·플릿 관심 양식·아시아 전시(서비스 아님)입니다. 시제품에서 유료 승차로 문턱은 넘었고, 규모는 아직 시작입니다.",
    likes: 21, comments: 2, created_at: "2026-09-04T03:00:00.000Z", liked: false,
  },
`;
  analystSrc = analystSrc.replace(
    "  // ── 2026-09-04 신규 (24개 · 존댓말 · 구조 혼합) ──────────────────────\n",
    "  // ── 2026-09-04 신규 (25개 · 존댓말 · 구조 혼합) ──────────────────────\n" + post,
  );
  const comments = `  [-1031]: [
    { alias: "광화문 여우 #62", content: "생중계가 없어도 앱·웹 안내가 공식에 가깝습니다. 저는 주간 배정 빈도와 인가 45대 증가만 표에 남기겠습니다.", created_at: "2026-09-04T03:05:00.000Z" },
    { alias: "역삼 판다 #77", content: "아시아 전시를 서비스 개시로 읽으면 과합니다. 오스틴 지오펜스와 분리해서 보시죠.", created_at: "2026-09-04T03:08:00.000Z" },
  ],
`;
  analystSrc = analystSrc.replace(
    "  // ── 2026-09-04 애널 댓글 ──────────────────────\n",
    "  // ── 2026-09-04 애널 댓글 ──────────────────────\n" + comments,
  );
  fs.writeFileSync(analystPath, analystSrc);
  console.log("✓ analystPosts -1031 + comments");
}

// wall post 1218
const wallPath = path.join(ROOT, "lib/wallPosts.ts");
let wallSrc = fs.readFileSync(wallPath, "utf8");
if (!wallSrc.includes("id: 1218")) {
  const wallPost = `  { id: 1218, symbol: "TSLA", nickname: "출시특집러", holdingLabel: "테슬라 관심",
    content: "행사 생중계는 없었는데 앱으로 오스틴에서 사이버캡 탄다는 안내가 남았음. 45대밖에 없으면 운 좋아야 배정되는 거 아님? 아시아 전시는 구경이고 서비스는 아닌 듯",
    createdAt: T04SEP + 4*60_000, likes: 18, comments: 2 },
`;
  wallSrc = wallSrc.replace(
    "  // ── 2026-09-04 신규 ────────────────\n",
    "  // ── 2026-09-04 신규 ────────────────\n" + wallPost,
  );
  const wallComments = `  1218: [
    { id: 121801, nickname: "로보택시덕후", holdingLabel: "테슬라 일부", content: "차종 지정 불가면 모델와이 나올 확률이 훨씬 큼. 전용차 탔다는 인증이 더 희귀해질 듯", createdAt: T04SEP + 5*60_000, likes: 6 },
    { id: 121802, nickname: "텍사스플릿", holdingLabel: "테슬라 보유", content: "플릿 관심 양식 열린 건 눈여겨볼 만함. 가격·납기 없으면 그냥 대기자 명단이긴 함", createdAt: T04SEP + 6*60_000, likes: 5 },
  ],
`;
  wallSrc = wallSrc.replace(
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n",
    "export const MOCK_COMMENTS: Record<number, Comment[]> = {\n" + wallComments,
  );
  fs.writeFileSync(wallPath, wallSrc);
  console.log("✓ wallPosts 1218 + comments");
}

console.log("Done.");
