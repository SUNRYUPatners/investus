const { KR, SAFE, KR_RE } = require("./data-20261001-markets");
const all = [...KR, ...SAFE, ...KR_RE];
const by = Object.fromEntries(all.map((r) => [r.slug, r]));

function plain(s) {
  return String(s || "").replace(/\s+/g, " ").trim();
}
function sec(slug, name) {
  const body = by[slug].body;
  const re = new RegExp("■ " + name + "\\n\\n([\\s\\S]*?)\\n\\n■");
  const m = body.match(re);
  return plain(m ? m[1] : by[slug].summary);
}

module.exports = function (add) {
  const F = "2026.10.01";

  add("summary-kr", "ROWS", "KOSPI", {
    headline: "2026.10.01 한국 마감",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6838", title: "코스피는 0.48% 내린 6,838.04로 마감했습니다", sub: "6,943에 열려 6,965까지 갔다가 6,818까지 밀렸습니다." },
      { color: "#60a5fa", fill: "#06121f", right: "268500", title: "삼성전자는 1.47% 내린 26만 8,500원입니다", sub: "우선주는 19만 5,200원으로 4.31% 내렸습니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "177.6만", title: "SK하이닉스는 0.62% 오른 177만 6,000원입니다", sub: "외국인 창구는 6,085억 원 순매도입니다." },
      { color: "#22d3ee", fill: "#06171c", right: "2.05조", title: "외국인 순매도는 2조 520억 원입니다", sub: "기관 7,680억 매도, 개인 1조 1,667억 매수입니다." },
      { color: "#fb7185", fill: "#1a0a10", right: "345000", title: "현대차는 1.43% 내린 34만 5,000원입니다", sub: "LG에너지솔루션은 35만 7,000원으로 1.28% 올랐습니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "855.91", title: "코스닥은 0.72% 오른 855.91입니다", sub: "달러-원은 3.9원 내린 1,352.8원입니다." },
    ],
    caption: "6,838.04 · 삼성 26만 8,500 · 하이닉스 177만 6,000 · 외국인 2조 520억 · 코스닥 855.91",
  }, {
    headline: "2026.10.01 Korea close",
    rows: [
      { color: "#38bdf8", fill: "#061520", right: "6838", title: "KOSPI closed at 6,838.04, down 0.48%", sub: "Opened 6,943, high 6,965, low 6,818." },
      { color: "#60a5fa", fill: "#06121f", right: "268500", title: "Samsung Electronics closed at 268,500 won, down 1.47%", sub: "Preferred shares fell 4.31% to 195,200." },
      { color: "#f59e0b", fill: "#1a1205", right: "1.776M", title: "SK hynix closed at 1,776,000 won, up 0.62%", sub: "Foreigners still sold 608.5 billion won." },
      { color: "#22d3ee", fill: "#06171c", right: "2.05T", title: "Foreigners sold 2.052 trillion won", sub: "Institutions sold 768 billion. Individuals bought 1.167 trillion." },
      { color: "#fb7185", fill: "#1a0a10", right: "345000", title: "Hyundai Motor closed at 345,000 won, down 1.43%", sub: "LG Energy Solution rose 1.28% to 357,000." },
      { color: "#a78bfa", fill: "#120b1f", right: "855.91", title: "Kosdaq closed at 855.91, up 0.72%", sub: "The won firmed to 1,352.8 per dollar." },
    ],
    caption: "6,838.04 · Samsung 268,500 · Hynix 1,776,000 · foreigners 2.05T · Kosdaq 855.91",
  });

  add("summary-safe", "ROWS", "GOLD", {
    headline: "2026.10.01 안전자산",
    rows: [
      { color: "#facc15", fill: "#1a1600", right: "4156", title: "금 현물은 저녁 기준 4,156.10달러로 0.60% 내렸습니다", sub: "아침 4,211달러대와 섞지 않습니다." },
      { color: "#94a3b8", fill: "#111827", right: "60.18", title: "은 현물은 같은 시각 60.180달러로 1.90% 내렸습니다", sub: "금과 은을 한 등락으로 평균 내지 않습니다." },
      { color: "#f97316", fill: "#1a0d02", right: "90.42", title: "WTI는 90.42달러, 브렌트는 103.50달러 부근입니다", sub: "하루 등락 폭은 그 문장에 없습니다." },
      { color: "#f7931a", fill: "#1a0f00", right: "84376", title: "비트코인은 8만 5,598달러 뒤 8만 4,376달러입니다", sub: "그 스냅샷에서는 약 0.9% 상승입니다." },
    ],
    caption: "금 4,156.10 · 은 60.180 · WTI 90.42 · 브렌트 103.50 · 비트코인 84,376",
  }, {
    headline: "2026.10.01 Safe assets",
    rows: [
      { color: "#facc15", fill: "#1a1600", right: "4156", title: "Spot gold was $4,156.10 in the evening note, down 0.60%", sub: "Do not average it with the morning print above $4,200." },
      { color: "#94a3b8", fill: "#111827", right: "60.18", title: "Spot silver was $60.180 in that same sentence, down 1.90%", sub: "Gold and silver are not one average." },
      { color: "#f97316", fill: "#1a0d02", right: "90.42", title: "WTI was near $90.42 and Brent near $103.50", sub: "The evening note did not give the day's change." },
      { color: "#f7931a", fill: "#1a0f00", right: "84376", title: "Bitcoin hit $85,598 and eased to $84,376", sub: "About 0.9% higher at that snapshot." },
    ],
    caption: "Gold $4,156.10 · silver $60.180 · WTI $90.42 · Brent $103.50 · bitcoin $84,376",
  });

  add("summary-krre", "ROWS", "POLICY", {
    headline: "2026.10.01 청약",
    rows: [
      { color: "#60a5fa", fill: "#06121f", right: "426", title: "광명 에듀하임 기타지역 1순위는 오늘입니다", sub: "426세대. 일반 190, 특별 236. 발표는 10월 12일." },
      { color: "#34d399", fill: "#052015", right: "251", title: "계양 A6 본청약 접수가 오늘도 이어집니다", sub: "이번 모집 251. 공급 규모 663과 더하지 않습니다." },
      { color: "#fb923c", fill: "#1a0d02", right: "발표", title: "화서역 호수공원 아너스빌이 오늘 당첨자를 발표합니다", sub: "세대수는 이 아침에 확인하지 못했습니다." },
    ],
    caption: "광명 426 · 기타지역 오늘 · 계양 251 · 발표 10월 21일 · 화서역 당첨 발표",
  }, {
    headline: "2026.10.01 Subscriptions",
    rows: [
      { color: "#60a5fa", fill: "#06121f", right: "426", title: "Gwangmyeong Eduheim takes other-region applications today", sub: "426 homes. General 190, special 236. Winners October 12." },
      { color: "#34d399", fill: "#052015", right: "251", title: "Gyeyang A6 applications continue today", sub: "This round is 251. Do not add it to the 663-home supply." },
      { color: "#fb923c", fill: "#1a0d02", right: "Winners", title: "Hwaseo Station Honorsville announces winners today", sub: "The household count is not confirmed this morning." },
    ],
    caption: "Gwangmyeong 426 · Gyeyang round 251 · winners October 21 · Hwaseo announcement",
  });

  function pair(file, layout, pal, ko, en) {
    ko.footer = F;
    en.footer = F;
    ko.noteHead = "왜 중요한가";
    en.noteHead = "Why it matters";
    ko.quote = sec(file, "무슨 일인가요");
    ko.noteSub = sec(file, "조금만 더 알려드리면");
    const base = plain(by[file].titleEn + " " + by[file].summaryEn);
    en.quote = base;
    en.noteSub = base;
    add(file, layout, pal, ko, en);
  }
  const c3 = (a, b, c) => [a, b, c];

  pair("samsung-close-kr", "L1", "KOSPI", {
    badge: "삼성", title: "삼성전자는 26만 8,500원으로 마감했습니다",
    heroIcon: "📉", heroBig: "268,500", heroSub: "1.47% 하락. 우선주는 4.31% 하락.",
    cards: c3(
      { icon: "💰", big: "-4,000", mid: "원", sub: "보통주 하루" },
      { icon: "📄", big: "195,200", mid: "우선주", sub: "4.31% 하락" },
      { icon: "🌍", big: "8,667억", mid: "외국인", sub: "종목 창구" },
    ),
  }, {
    badge: "SEC", title: "Samsung closed at 268,500 won",
    heroIcon: "📉", heroBig: "268,500", heroSub: "Down 1.47%. Preferred shares fell 4.31%.",
    cards: c3(
      { icon: "💰", big: "-4,000", mid: "won", sub: "Common stock" },
      { icon: "📄", big: "195,200", mid: "Preferred", sub: "Down 4.31%" },
      { icon: "🌍", big: "867bn", mid: "Foreign", sub: "That name" },
    ),
  });

  pair("hynix-close-kr", "L2", "HYNIX", {
    badge: "하이닉스", title: "SK하이닉스는 177만 6,000원으로 올랐습니다",
    heroIcon: "📈", heroBig: "177.6만", heroSub: "0.62% 상승. 외국인 창구는 매도입니다.",
    cards: [
      { label: "종가", big: "177.6만", mid: "+1만 1,000원", sub: "0.62%" },
      { label: "외국인", big: "6,085억", mid: "순매도", sub: "가격과 부호가 갈림" },
      { label: "목표", big: "350만", mid: "iM 매수", sub: "하루 상승의 결론 아님" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "종가는 올랐고 외국인 창구는 매도입니다.",
      "iM증권 목표주가는 350만 원입니다.",
      "DS 목표주가 264만 원과 평균 내지 않습니다.",
    ],
  }, {
    badge: "Hynix", title: "SK hynix closed at 1,776,000 won",
    heroIcon: "📈", heroBig: "1.776M", heroSub: "Up 0.62%, while foreigners were net sellers.",
    cards: [
      { label: "Close", big: "1.776M", mid: "+11,000", sub: "0.62%" },
      { label: "Foreign", big: "609bn", mid: "Net sell", sub: "Price and flow split" },
      { label: "Target", big: "3.5M", mid: "iM buy", sub: "Not a conclusion from one day" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The close rose. The foreign desk sold.",
      "iM's target is 3.5 million won.",
      "Do not average that with 2.64 million.",
    ],
  });

  pair("kospi-flow-kr", "L3", "FLOW", {
    badge: "수급", title: "외국인이 2조 520억 원을 순매도했습니다",
    heroIcon: "💸", heroBig: "2.05조", heroSub: "기관 7,680억 매도. 개인 1조 1,667억 매수.",
    cards: c3(
      { icon: "🌍", big: "2.05조", mid: "외국인", sub: "순매도" },
      { icon: "🏦", big: "7,680억", mid: "기관", sub: "순매도" },
      { icon: "🧑", big: "1.17조", mid: "개인", sub: "순매수, 지수 하락" },
    ),
  }, {
    badge: "Flow", title: "Foreigners sold 2.052 trillion won",
    heroIcon: "💸", heroBig: "2.05T", heroSub: "Institutions sold 768 billion. Individuals bought 1.17 trillion.",
    cards: c3(
      { icon: "🌍", big: "2.05T", mid: "Foreign", sub: "Net sell" },
      { icon: "🏦", big: "768bn", mid: "Institutions", sub: "Net sell" },
      { icon: "🧑", big: "1.17T", mid: "Individuals", sub: "Bought, index still fell" },
    ),
  });

  pair("hyundai-close-kr", "L4", "AUTO", {
    badge: "현대차", badgeLine: "1.43% 하락", title: "현대차는 34만 5,000원으로 마감했습니다",
    heroIcon: "🚗", heroBig: "345,000", heroSub: "5,000원 하락. 지수 0.48%보다 깊습니다.",
    cards: c3(
      { icon: "📉", big: "-5,000", mid: "원", sub: "1.43%" },
      { icon: "🎯", big: "50만", mid: "삼성증권", sub: "60만에서 하향, 매수" },
      { icon: "🎯", big: "74만", mid: "교보", sub: "50만과 평균 안 냄" },
    ),
  }, {
    badge: "Hyundai", badgeLine: "Down 1.43%", title: "Hyundai Motor closed at 345,000 won",
    heroIcon: "🚗", heroBig: "345,000", heroSub: "Down 5,000 won, more than the index.",
    cards: c3(
      { icon: "📉", big: "-5,000", mid: "won", sub: "1.43%" },
      { icon: "🎯", big: "500k", mid: "Samsung Sec", sub: "Cut from 600k, still buy" },
      { icon: "🎯", big: "740k", mid: "Kyobo", sub: "Not an average with 500k" },
    ),
  });

  pair("kosdaq-fx-kr", "L5", "KOSPI", {
    badge: "코스닥", title: "코스닥은 855.91, 달러-원은 1,352.8원입니다",
    heroIcon: "💱", heroBig: "855.91", heroSub: "0.72% 상승. 코스피와 부호가 갈렸습니다.",
    before: { label: "코스피", big: "-0.48%", sub: "6,838.04" },
    after: { label: "코스닥", big: "+0.72%", sub: "855.91" },
    cards: c3(
      { icon: "📈", big: "+6.11", mid: "포인트", sub: "코스닥" },
      { icon: "💵", big: "1352.8", mid: "원", sub: "3.9원 하락" },
      { icon: "🚫", big: "금액없음", mid: "투자자", sub: "기사 숫자가 갈림" },
    ),
  }, {
    badge: "Kosdaq", title: "Kosdaq 855.91, won at 1,352.8 per dollar",
    heroIcon: "💱", heroBig: "855.91", heroSub: "Up 0.72%. The KOSPI fell.",
    before: { label: "KOSPI", big: "-0.48%", sub: "6,838.04" },
    after: { label: "Kosdaq", big: "+0.72%", sub: "855.91" },
    cards: c3(
      { icon: "📈", big: "+6.11", mid: "points", sub: "Kosdaq" },
      { icon: "💵", big: "1352.8", mid: "won", sub: "Dollar down 3.9 won" },
      { icon: "🚫", big: "No flow", mid: "Investors", sub: "Sources disagree" },
    ),
  });

  pair("gold-kitco-pm", "L6", "GOLD", {
    badge: "금", breaking: "저녁 시황", title: "금 현물은 4,156.10달러입니다",
    heroBig: "4,156", heroSub: "0.60% 하락. 아침 4,211달러와 섞지 않습니다.",
    grid: [
      { icon: "🥇", big: "4156", mid: "금", sub: "-0.60%" },
      { icon: "🥈", big: "60.18", mid: "은", sub: "-1.90%" },
      { icon: "🌅", big: "4211", mid: "아침", sub: "다른 시각" },
      { icon: "📊", big: "3.4%", mid: "PCE", sub: "전년, 근원 3.0%" },
    ],
    ctx1: "10월 인상 확률은 저녁 기준 약 37%",
    ctx2: "장중 5.302%는 트레이드웹 시각",
  }, {
    badge: "Gold", breaking: "Evening", title: "Spot gold was $4,156.10",
    heroBig: "$4,156", heroSub: "Down 0.60%. Not the morning print.",
    grid: [
      { icon: "🥇", big: "4156", mid: "Gold", sub: "-0.60%" },
      { icon: "🥈", big: "60.18", mid: "Silver", sub: "-1.90%" },
      { icon: "🌅", big: "4211", mid: "Morning", sub: "A different time" },
      { icon: "📊", big: "3.4%", mid: "PCE", sub: "Core 3.0% y/y" },
    ],
    ctx1: "October hike odds were about 37% that evening",
    ctx2: "The 5.302% print is the Tradeweb snapshot",
  });

  pair("oil-settle-pm", "L1", "OIL", {
    badge: "원유", title: "WTI 90.42달러, 브렌트 103.50달러 부근",
    heroIcon: "🛢️", heroBig: "90.42", heroSub: "브렌트는 103.50달러 부근. 등락 폭은 없습니다.",
    cards: c3(
      { icon: "🇺🇸", big: "90.42", mid: "WTI", sub: "부근" },
      { icon: "🌍", big: "103.50", mid: "브렌트", sub: "마감 부근" },
      { icon: "🚢", big: "피격", mid: "수요일", sub: "해협 유조선 보도" },
    ),
  }, {
    badge: "Oil", title: "WTI near $90.42, Brent near $103.50",
    heroIcon: "🛢️", heroBig: "90.42", heroSub: "Brent near $103.50. No daily change in that note.",
    cards: c3(
      { icon: "🇺🇸", big: "90.42", mid: "WTI", sub: "Nearby" },
      { icon: "🌍", big: "103.50", mid: "Brent", sub: "Settled nearby" },
      { icon: "🚢", big: "Struck", mid: "Wednesday", sub: "A tanker report" },
    ),
  });

  pair("btc-pce-bounce", "L2", "BTC", {
    badge: "BTC", title: "비트코인은 8만 4,376달러로 되돌아왔습니다",
    heroIcon: "₿", heroBig: "84,376", heroSub: "고점 85,598달러. 약 0.9% 상승 스냅샷.",
    cards: [
      { label: "고점", big: "85,598", mid: "달러", sub: "터치 후 되돌림" },
      { label: "이후", big: "84,376", mid: "약 0.9%", sub: "디크립트 시각" },
      { label: "시가", big: "83,624", mid: "캔들", sub: "평균 내지 않음" },
    ],
    detailHead: "재료",
    detailLines: [
      "전체 물가 전년 3.4%, 예상 3.7%보다 낮습니다.",
      "근원 전년 3.0%, 예상 3.3%보다 낮습니다.",
      "고점을 돌파 종가로 부르지 않습니다.",
    ],
  }, {
    badge: "BTC", title: "Bitcoin eased to $84,376",
    heroIcon: "₿", heroBig: "84,376", heroSub: "High $85,598. About 0.9% at that snapshot.",
    cards: [
      { label: "High", big: "85,598", mid: "dollars", sub: "Then it eased" },
      { label: "After", big: "84,376", mid: "about 0.9%", sub: "Decrypt snapshot" },
      { label: "Open", big: "83,624", mid: "candle", sub: "Not an average" },
    ],
    detailHead: "The cue",
    detailLines: [
      "Headline PCE was 3.4% y/y versus 3.7% expected.",
      "Core was 3.0% y/y versus 3.3% expected.",
      "The high is not a closing breakout.",
    ],
  });

  pair("gyeyang-a6-day2", "L3", "POLICY", {
    badge: "계양", title: "계양 A6 본청약 접수가 오늘도 이어집니다",
    heroIcon: "🏢", heroBig: "251", heroSub: "이번 모집. 공급 규모 663과 더하지 않습니다.",
    cards: c3(
      { icon: "🏠", big: "663", mid: "공급 규모", sub: "단지 전체" },
      { icon: "📝", big: "251", mid: "이번 모집", sub: "특별 213 일반 38" },
      { icon: "📅", big: "10/21", mid: "발표", sub: "일반 창은 10/2까지" },
    ),
  }, {
    badge: "Gyeyang", title: "Gyeyang A6 applications continue today",
    heroIcon: "🏢", heroBig: "251", heroSub: "This round. Do not add it to the 663-home supply.",
    cards: c3(
      { icon: "🏠", big: "663", mid: "Supply", sub: "The whole project" },
      { icon: "📝", big: "251", mid: "This round", sub: "213 special, 38 general" },
      { icon: "📅", big: "Oct 21", mid: "Winners", sub: "General window through Oct 2" },
    ),
  });

  pair("gwangmyeong-other-region", "L4", "POLICY", {
    badge: "광명", badgeLine: "기타지역 오늘", title: "에듀하임 기타지역 1순위는 오늘입니다",
    heroIcon: "🏙️", heroBig: "426", heroSub: "일반 190, 특별 236. 발표는 10월 12일.",
    cards: c3(
      { icon: "📅", big: "9/29", mid: "특별", sub: "이미 접수" },
      { icon: "📅", big: "9/30", mid: "해당 1순위", sub: "어제" },
      { icon: "📅", big: "10/1", mid: "기타 1순위", sub: "오늘" },
    ),
  }, {
    badge: "Gwangmyeong", badgeLine: "Other region today", title: "Eduheim's other-region round is today",
    heroIcon: "🏙️", heroBig: "426", heroSub: "General 190, special 236. Winners October 12.",
    cards: c3(
      { icon: "📅", big: "Sep 29", mid: "Special", sub: "Already taken" },
      { icon: "📅", big: "Sep 30", mid: "Local first", sub: "Yesterday" },
      { icon: "📅", big: "Oct 1", mid: "Other region", sub: "Today" },
    ),
  });

  pair("hwaseo-winners-today", "L5", "JEONSE", {
    badge: "화서역", title: "화서역 아너스빌이 오늘 당첨자를 발표합니다",
    heroIcon: "📣", heroBig: "발표", heroSub: "수원 권선구 서둔동. 세대수는 비워 둡니다.",
    before: { label: "오늘 접수", big: "광명·계양", sub: "창이 열린 쪽" },
    after: { label: "오늘 발표", big: "화서역", sub: "당첨자" },
    cards: c3(
      { icon: "📍", big: "서둔동", mid: "권선구", sub: "위치만 확인" },
      { icon: "❓", big: "미확인", mid: "세대수", sub: "합계에 넣지 않음" },
      { icon: "📣", big: "10/1", mid: "발표일", sub: "이투데이 일정" },
    ),
  }, {
    badge: "Hwaseo", title: "Hwaseo Honorsville announces winners today",
    heroIcon: "📣", heroBig: "Today", heroSub: "Seodun-dong, Suwon. Household count left blank.",
    before: { label: "Applications", big: "Two sites", sub: "Still open today" },
    after: { label: "Winners", big: "Hwaseo", sub: "Announcement" },
    cards: c3(
      { icon: "📍", big: "Seodun", mid: "Gwonseon", sub: "Location only" },
      { icon: "❓", big: "Unknown", mid: "Homes", sub: "Not added to a total" },
      { icon: "📣", big: "Oct 1", mid: "The day", sub: "Etoday calendar" },
    ),
  });
};
