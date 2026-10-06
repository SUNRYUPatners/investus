const { US } = require("./data-20261007-us");
const by = Object.fromEntries(US.map((r) => [r.slug, r]));

function plain(s) {
  return String(s || "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
function sec(slug, name) {
  const body = by[slug].body;
  const re = new RegExp("■ " + name + "\\n\\n([\\s\\S]*?)\\n\\n■");
  const m = body.match(re);
  return plain(m ? m[1] : by[slug].summary);
}

module.exports = function (add) {
  const F = "2026.10.07";

  add("summary", "ROWS", "MACRO", {
    headline: "2026.10.07 한장 요약",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "172.38", title: "스페이스X는 일주일 17.52% 오른 172.38달러입니다", sub: "10월 6일 종가는 171.92달러입니다." },
      { color: "#60a5fa", fill: "#06121f", right: "1000", title: "웰스파고가 메타 목표 주가를 1,000달러로 올렸습니다", sub: "796달러에서 204달러 상향입니다." },
      { color: "#4ade80", fill: "#061209", right: "486532", title: "테슬라가 3분기에 48만 6,532대를 인도했습니다", sub: "생산은 46만 4,391대입니다." },
      { color: "#22c55e", fill: "#0a1a0a", right: "1위", title: "일본 상반기 외국차에서 모델Y가 처음 1위입니다", sub: "외국차 전기차 점유는 약 48%입니다." },
      { color: "#38bdf8", fill: "#061520", right: "7818", title: "S&P 500은 7,818.93으로 사상 최고 종가입니다", sub: "시가총액은 처음 71조 달러를 넘겼습니다." },
      { color: "#f59e0b", fill: "#1a1205", right: "377억", title: "마이크론 분기 순이익 377억 달러가 애플을 앞섰습니다", sub: "애플은 297.9억 달러입니다." },
      { color: "#a78bfa", fill: "#120b1f", right: "380MW", title: "두산이 380메가와트 가스터빈을 스페이스XSI로 보냈습니다", sub: "창원에서 나온 첫 미국 향입니다." },
      { color: "#fb7185", fill: "#1a0a10", right: "20%", title: "10월 15일 합병 루머의 올해 확률은 20%입니다", sub: "로드스터 행사에 붙어 있는 캘시입니다." },
    ],
    caption: "172.38달러 · 메타 1,000 · 인도 486,532 · 일본Y 1위 · S&P 7,818 · 마이크론 377억",
  }, {
    headline: "2026.10.07 Daily Snapshot",
    rows: [
      { color: "#c084fc", fill: "#140b1f", right: "172.38", title: "SpaceX is at $172.38 after a 17.52% week", sub: "The October 6 close was $171.92." },
      { color: "#60a5fa", fill: "#06121f", right: "1000", title: "Wells Fargo raised Meta to a $1,000 target", sub: "Up $204 from $796." },
      { color: "#4ade80", fill: "#061209", right: "486532", title: "Tesla delivered 486,532 vehicles in Q3", sub: "Production was 464,391." },
      { color: "#22c55e", fill: "#0a1a0a", right: "No.1", title: "Model Y led Japan foreign-brand models in H1", sub: "About 48% of foreign-brand EVs." },
      { color: "#38bdf8", fill: "#061520", right: "7818", title: "The S&P 500 closed at a record 7,818.93", sub: "Market value topped $71 trillion." },
      { color: "#f59e0b", fill: "#1a1205", right: "$37.7B", title: "Micron's $37.7B net income topped Apple", sub: "Apple printed $29.79 billion." },
      { color: "#a78bfa", fill: "#120b1f", right: "380MW", title: "Doosan shipped a 380 MW turbine to SpaceXSI", sub: "First U.S.-bound unit from Changwon." },
      { color: "#fb7185", fill: "#1a0a10", right: "20%", title: "Kalshi prices a 20% merger chance this year", sub: "Tied to the October 15 Roadster event." },
    ],
    caption: "$172.38 · Meta $1,000 · 486,532 deliveries · Japan Y No.1 · S&P 7,818 · Micron $37.7B",
  });

  function pair(file, layout, pal, ko, en) {
    ko.footer = F;
    en.footer = F;
    ko.noteHead = "왜 중요한가";
    en.noteHead = "Why it matters";
    ko.quote = ko.quote || sec(file, "무슨 일인가요");
    ko.noteSub = ko.noteSub || sec(file, "조금만 더 알려드리면");
    const enBase = plain(by[file].titleEn + " " + by[file].summaryEn);
    en.quote = en.quote || enBase;
    en.noteSub = en.noteSub || enBase;
    add(file, layout, pal, ko, en);
  }
  const c3 = (a, b, c) => [a, b, c];

  pair("spcx-week-172", "L1", "SPCX", {
    badge: "SPCX", title: "스페이스X가 일주일 17.52% 올라 172.38달러입니다",
    heroIcon: "🚀", heroBig: "172.38", heroSub: "한 주 사이 25.70달러가 붙었습니다. 10월 6일 종가는 171.92달러입니다.",
    cards: c3(
      { icon: "📈", big: "+17.52%", mid: "일주일", sub: "25.70달러 상승" },
      { icon: "💵", big: "171.92", mid: "종가", sub: "하루 0.49% 상승" },
      { icon: "📊", big: "176.42", mid: "고가", sub: "10월 6일 장중" },
    ),
  }, {
    badge: "SPCX", title: "SpaceX is at $172.38 after a 17.52% week",
    heroIcon: "🚀", heroBig: "$172.38", heroSub: "Up $25.70 in a week. The October 6 close was $171.92.",
    cards: c3(
      { icon: "📈", big: "+17.52%", mid: "Week", sub: "Up $25.70" },
      { icon: "💵", big: "171.92", mid: "Close", sub: "Up 0.49% on the day" },
      { icon: "📊", big: "176.42", mid: "High", sub: "October 6 session" },
    ),
  });

  pair("tsla-japan-y", "L5", "TSLA", {
    badge: "TSLA", title: "일본 상반기 외국차에서 모델Y가 처음 1위입니다",
    heroIcon: "🇯🇵", heroBig: "No.1", heroSub: "자토 다이내믹스 1~6월입니다. 전기차에 한정하지 않은 외국차 표입니다.",
    before: { label: "외국차 EV", big: "48%", sub: "여섯 달 연속 1위" },
    after: { label: "차종 전체", big: "1위", sub: "반기 처음" },
    cards: c3(
      { icon: "🗾", big: "19곳", mid: "1위", sub: "도도부현" },
      { icon: "📍", big: "38곳", mid: "5위 안", sub: "광역자치단체" },
      { icon: "📅", big: "12년", mid: "모델S 후", sub: "국내 도입 뒤" },
    ),
  }, {
    badge: "TSLA", title: "Model Y took first among foreign-brand models in Japan",
    heroIcon: "🇯🇵", heroBig: "No.1", heroSub: "JATO Dynamics, January to June. All foreign brands, not just EVs.",
    before: { label: "Foreign EV", big: "48%", sub: "First all six months" },
    after: { label: "All models", big: "No.1", sub: "First half-year" },
    cards: c3(
      { icon: "🗾", big: "19", mid: "Prefectures", sub: "Model first" },
      { icon: "📍", big: "38", mid: "Top five", sub: "Nationwide" },
      { icon: "📅", big: "12 yrs", mid: "Since S", sub: "Japan launch" },
    ),
  });

  pair("tsla-q3-del", "L2", "TSLA", {
    badge: "TSLA", title: "테슬라가 3분기에 48만 6,532대를 인도했습니다",
    heroIcon: "🚗", heroBig: "486,532", heroSub: "생산은 46만 4,391대입니다. 에너지 저장은 13.7기가와시입니다.",
    cards: [
      { label: "생산", big: "464,391", mid: "대", sub: "3분기 공장 출고" },
      { label: "3·Y 인도", big: "478,237", mid: "대", sub: "주력 두 차종" },
      { label: "저장", big: "13.7", mid: "GWh", sub: "에너지 제품" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "컨센서스 46만 1,974대를 약 2만 5,000대 웃었습니다.",
      "작년 3분기보다 2.1% 적고 2분기보다 1.3% 많습니다.",
      "실적 발표는 10월 21일 장 마감 뒤입니다.",
    ],
  }, {
    badge: "TSLA", title: "Tesla delivered 486,532 vehicles in the third quarter",
    heroIcon: "🚗", heroBig: "486,532", heroSub: "Production was 464,391. Energy storage deployed 13.7 GWh.",
    cards: [
      { label: "Built", big: "464,391", mid: "units", sub: "Q3 factory output" },
      { label: "3/Y", big: "478,237", mid: "units", sub: "Core two models" },
      { label: "Storage", big: "13.7", mid: "GWh", sub: "Energy products" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Deliveries beat a 461,974 consensus by about 25,000.",
      "Down 2.1% from last year's third quarter and up 1.3% from the second.",
      "Earnings land after the close on October 21.",
    ],
  });

  pair("xlk-vs-spx", "L1", "NVDA", {
    badge: "XLK", title: "기술주가 나머지 S&P 500을 사상 가장 큰 격차로 앞섭니다",
    heroIcon: "📊", heroBig: "34%+", heroSub: "매그니피센트7 시가총액 비중입니다. 같은 날 지수는 사상 최고 종가입니다.",
    cards: c3(
      { icon: "📈", big: "7818", mid: "종가", sub: "0.58% 상승" },
      { icon: "🔝", big: "7844", mid: "장중", sub: "사상 고점" },
      { icon: "📅", big: "28번째", mid: "올해", sub: "최고 종가" },
    ),
  }, {
    badge: "XLK", title: "Technology is beating the rest of the S&P 500 by the widest margin",
    heroIcon: "📊", heroBig: "34%+", heroSub: "Magnificent 7 market-value share. The index printed a record close.",
    cards: c3(
      { icon: "📈", big: "7818", mid: "Close", sub: "Up 0.58%" },
      { icon: "🔝", big: "7844", mid: "Intraday", sub: "Session high" },
      { icon: "📅", big: "28th", mid: "2026", sub: "Record close" },
    ),
  });

  pair("meta-wf-1000", "L5", "MSFT", {
    badge: "META", title: "웰스파고가 메타 목표 주가를 1,000달러로 올렸습니다",
    heroIcon: "∞", heroBig: "$1000", heroSub: "796달러에서 204달러 상향입니다. 오버웨이트를 유지했습니다.",
    before: { label: "이전", big: "796", sub: "목표 주가" },
    after: { label: "신규", big: "1000", sub: "오버웨이트" },
    cards: c3(
      { icon: "🎵", big: "뮤즈", mid: "에이전트", sub: "9월 8일 공개" },
      { icon: "📉", big: "2027", mid: "저점", sub: "주당순이익 가정" },
      { icon: "📈", big: "+20%", mid: "이후", sub: "공개 뒤 주가" },
    ),
  }, {
    badge: "META", title: "Wells Fargo raised Meta's price target to $1,000",
    heroIcon: "∞", heroBig: "$1000", heroSub: "Up $204 from $796. Overweight kept.",
    before: { label: "Prior", big: "796", sub: "Price target" },
    after: { label: "New", big: "1000", sub: "Overweight" },
    cards: c3(
      { icon: "🎵", big: "Muse", mid: "Agent", sub: "Launched Sept 8" },
      { icon: "📉", big: "2027", mid: "Trough", sub: "EPS assumption" },
      { icon: "📈", big: "+20%", mid: "Since", sub: "After launch" },
    ),
  });

  pair("spcx-doosan-380", "L3", "SPCX", {
    badge: "SPCX", title: "두산에너빌리티가 380메가와트 가스터빈을 스페이스XSI로 처음 보냈습니다",
    heroIcon: "✅", heroBig: "380MW", heroSub: "창원 본사 출하식입니다. 모델은 DGT6-300H S2입니다.",
    cards: c3(
      { icon: "🏭", big: "창원", mid: "본사", sub: "첫 미국 향" },
      { icon: "📦", big: "12대", mid: "계약", sub: "미국 기업 전체" },
      { icon: "⚡", big: "5대", mid: "향", sub: "스페이스XSI로 거론" },
    ),
  }, {
    badge: "SPCX", title: "Doosan shipped its first 380 MW gas turbine to SpaceXSI",
    heroIcon: "✅", heroBig: "380MW", heroSub: "A Changwon shipment. The model is DGT6-300H S2.",
    cards: c3(
      { icon: "🏭", big: "Changwon", mid: "Plant", sub: "First U.S. unit" },
      { icon: "📦", big: "12", mid: "Contracted", sub: "U.S. customers" },
      { icon: "⚡", big: "5", mid: "Slated", sub: "For SpaceXSI" },
    ),
  });

  pair("nvda-buyback-cy30", "L2", "NVDA", {
    badge: "NVDA", title: "엔비디아가 2030년까지 주식의 약 15~20%를 사들일 수 있습니다",
    heroIcon: "💹", heroBig: "20%", heroSub: "캔터 누적 모형입니다. 2030년 1조 1,160억 달러입니다.",
    cards: [
      { label: "2030 누적", big: "1.116조$", mid: "환매", sub: "지금 시총 대비 20%" },
      { label: "설비투자", big: "<4%", mid: "FCF", sub: "직전 분기" },
      { label: "한도", big: "1500억$", mid: "승인", sub: "자사주 한도" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "씨티 목표 주가는 315달러입니다.",
      "10월 6일 종가는 238.90달러입니다.",
      "모형 누적과 승인 한도를 한 숫자로 만들지 않습니다.",
    ],
  }, {
    badge: "NVDA", title: "Nvidia could buy back about 15 to 20 percent of shares through 2030",
    heroIcon: "💹", heroBig: "20%", heroSub: "A Cantor cumulative model. $1.116 trillion by 2030.",
    cards: [
      { label: "CY30 sum", big: "$1.116T", mid: "Buybacks", sub: "20% of today's value" },
      { label: "Capex", big: "<4%", mid: "of FCF", sub: "Last quarter" },
      { label: "Auth.", big: "$150B", mid: "Limit", sub: "Repurchase authorization" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Citi keeps a $315 price target.",
      "The October 6 close was $238.90.",
      "The model sum and the authorization are different columns.",
    ],
  });

  pair("spcx-louisiana-hub", "L4", "SPCX", {
    badge: "SPCX", badgeLine: "허가 신청", title: "스페이스X가 루이지애나 버밀리언에 대형 화물 허브를 신청했습니다",
    heroIcon: "🛳️", heroBig: "15.75mi", heroSub: "페컨 아일랜드 남쪽 중량 도로입니다. 공사 시작은 2027년 3월입니다.",
    cards: c3(
      { icon: "📅", big: "2027.3", mid: "착공", sub: "제안 시작일" },
      { icon: "🏁", big: "2032.9", mid: "완공", sub: "제안 종료일" },
      { icon: "📝", big: "P2026", mid: "허가", sub: "9월 29일 접수" },
    ),
  }, {
    badge: "SPCX", badgeLine: "Permit", title: "SpaceX applied for a Vermilion Parish cargo hub",
    heroIcon: "🛳️", heroBig: "15.75mi", heroSub: "A heavy-haul road south of Pecan Island. Construction is proposed for March 2027.",
    cards: c3(
      { icon: "📅", big: "Mar 27", mid: "Start", sub: "Proposed" },
      { icon: "🏁", big: "Sep 32", mid: "Finish", sub: "Proposed" },
      { icon: "📝", big: "P2026", mid: "Permit", sub: "Received Sept 29" },
    ),
  });

  pair("mu-vs-aapl", "L5", "NVDA", {
    badge: "MU", title: "마이크론 분기 순이익 377억 달러가 애플을 앞섰습니다",
    heroIcon: "💾", heroBig: "$37.7B", heroSub: "회계 4분기입니다. 애플은 297.9억 달러입니다.",
    before: { label: "애플", big: "297.9억", sub: "같은 분기 순이익" },
    after: { label: "마이크론", big: "377억", sub: "약 80억 달러 많음" },
    cards: c3(
      { icon: "📦", big: "542억", mid: "매출", sub: "회계 4분기" },
      { icon: "💧", big: "332억", mid: "FCF", sub: "조정 잉여현금" },
      { icon: "🎯", big: "2000", mid: "목표", sub: "캔터 오버웨이트" },
    ),
  }, {
    badge: "MU", title: "Micron's $37.7 billion quarterly net income topped Apple",
    heroIcon: "💾", heroBig: "$37.7B", heroSub: "Fiscal fourth quarter. Apple printed $29.79 billion.",
    before: { label: "Apple", big: "$29.8B", sub: "Same-quarter NI" },
    after: { label: "Micron", big: "$37.7B", sub: "About $8B more" },
    cards: c3(
      { icon: "📦", big: "$54.2B", mid: "Revenue", sub: "Fiscal Q4" },
      { icon: "💧", big: "$33.2B", mid: "FCF", sub: "Adjusted" },
      { icon: "🎯", big: "$2000", mid: "Target", sub: "Cantor Overweight" },
    ),
  });

  pair("us-78-months", "L4", "MACRO", {
    badge: "US", badgeLine: "확장", title: "미국 경제가 78개월 연속 침체 없이 이어지고 있습니다",
    heroIcon: "📆", heroBig: "78개월", heroSub: "1854년 이후 여섯 번째로 긴 확장입니다. 평균은 약 49개월입니다.",
    cards: c3(
      { icon: "📊", big: "49", mid: "평균", sub: "장기 개월" },
      { icon: "📉", big: "38", mid: "중앙값", sub: "장기 개월" },
      { icon: "🏆", big: "128", mid: "기록", sub: "2009~2020년" },
    ),
  }, {
    badge: "US", badgeLine: "Expansion", title: "The U.S. expansion has run 78 months without a recession",
    heroIcon: "📆", heroBig: "78 mo", heroSub: "Sixth-longest since 1854. The long-term average is about 49 months.",
    cards: c3(
      { icon: "📊", big: "49", mid: "Average", sub: "Long-term months" },
      { icon: "📉", big: "38", mid: "Median", sub: "Long-term months" },
      { icon: "🏆", big: "128", mid: "Record", sub: "2009 to 2020" },
    ),
  });

  pair("spx-ath-71t", "L6", "MACRO", {
    badge: "SPX", breaking: "사상 최고", title: "S&P 500이 7,818.93으로 사상 최고 종가이고 시가총액은 71조 달러를 넘겼습니다",
    heroBig: "7,818", heroSub: "하루 0.58% 상승입니다. 나스닥100도 같이 사상 최고입니다.",
    grid: [
      { icon: "📈", big: "+45", mid: "포인트", sub: "하루 상승" },
      { icon: "🔝", big: "7844", mid: "장중", sub: "고점" },
      { icon: "💰", big: "71조$", mid: "시총", sub: "처음 돌파" },
      { icon: "📅", big: "28", mid: "올해", sub: "최고 종가" },
    ],
    ctx1: "네 거래일 연속 상승이고 나흘 동안 2.19% 올랐습니다",
    ctx2: "10년 금리가 5%대인 날의 최고가입니다",
  }, {
    badge: "SPX", breaking: "Record", title: "The S&P 500 closed at a record 7,818.93 and market value topped $71 trillion",
    heroBig: "7,818", heroSub: "Up 0.58% on the day. The Nasdaq 100 also printed a record.",
    grid: [
      { icon: "📈", big: "+45", mid: "Points", sub: "One-day gain" },
      { icon: "🔝", big: "7844", mid: "Intraday", sub: "High" },
      { icon: "💰", big: "$71T", mid: "Value", sub: "First print" },
      { icon: "📅", big: "28", mid: "2026", sub: "Record closes" },
    ],
    ctx1: "A four-day winning streak and a 2.19% four-day gain",
    ctx2: "A record close with the 10-year still above 5%",
  });

  pair("tsla-spcx-merge-oct15", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "루머", title: "10월 15일 로드스터 행사에서 테슬라와 스페이스X 합병 루머가 돌고 있습니다",
    heroIcon: "🗓️", heroBig: "20%", heroSub: "캘시 올해 성사 확률입니다. 공시가 아닙니다.",
    cards: c3(
      { icon: "🚗", big: "10/15", mid: "행사", sub: "로드스터 연기" },
      { icon: "📊", big: "70%", mid: "2028전", sub: "다른 만기 계약" },
      { icon: "📝", big: "루머", mid: "단계", sub: "딜 확정 전" },
    ),
  }, {
    badge: "TSLA", badgeLine: "Rumor", title: "A merger rumor is attached to the October 15 Roadster event",
    heroIcon: "🗓️", heroBig: "20%", heroSub: "Kalshi odds this year. Not a filed deal.",
    cards: c3(
      { icon: "🚗", big: "Oct 15", mid: "Event", sub: "Roadster delay" },
      { icon: "📊", big: "70%", mid: "Pre-2028", sub: "A different contract" },
      { icon: "📝", big: "Rumor", mid: "Stage", sub: "No deal filing" },
    ),
  });

  pair("starlink-v3-f14", "L3", "SPCX", {
    badge: "SPCX", title: "스타십 14번째 비행이 스타링크 V3 26기를 궤도에 올렸습니다",
    heroIcon: "✅", heroBig: "26기", heroSub: "기당 용량은 약 1테라비트입니다. V2 미니의 약 10배입니다.",
    cards: c3(
      { icon: "📡", big: "1Tbps", mid: "기당", sub: "설계 용량" },
      { icon: "🚀", big: "60기", mid: "다음", sub: "한 방 목표" },
      { icon: "📞", big: "전부", mid: "연락", sub: "26기 확인" },
    ),
  }, {
    badge: "SPCX", title: "Starship Flight 14 put 26 Starlink V3 satellites in orbit",
    heroIcon: "✅", heroBig: "26", heroSub: "About 1 Tbps each. Roughly 10 times a V2 Mini.",
    cards: c3(
      { icon: "📡", big: "1 Tbps", mid: "Each", sub: "Design capacity" },
      { icon: "🚀", big: "60", mid: "Next", sub: "One-flight goal" },
      { icon: "📞", big: "All", mid: "Contact", sub: "26 confirmed" },
    ),
  });

  pair("bonds-534-570", "L2", "RATES", {
    badge: "UST", title: "미국 10년 금리가 5.34%, 30년이 5.70%까지 갔습니다",
    heroIcon: "📉", heroBig: "5.34%", heroSub: "2002년 이후 가장 높은 자리입니다. 다음날 10년은 5.270%입니다.",
    cards: [
      { label: "30년 고점", big: "5.70%", mid: "수익률", sub: "24년 만 최고" },
      { label: "다음날", big: "5.270%", mid: "10년", sub: "4bp 하락" },
      { label: "물가", big: "74.0", mid: "ISM", sub: "서비스 물가지수" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "회사채 매도가 같은 아침에 번졌습니다.",
      "나흘 랠리 지수와 하루 금리 하락이 겹친 날입니다.",
      "오늘 밤 의사록이 다음 힌트입니다.",
    ],
  }, {
    badge: "UST", title: "The 10-year yield touched 5.34% and the 30-year 5.70%",
    heroIcon: "📉", heroBig: "5.34%", heroSub: "The highest since 2002. The next day the 10-year eased to 5.270%.",
    cards: [
      { label: "30-year", big: "5.70%", mid: "Yield", sub: "24-year high" },
      { label: "Next day", big: "5.270%", mid: "10-year", sub: "Down 4 bp" },
      { label: "Prices", big: "74.0", mid: "ISM", sub: "Services prices" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "The sell-off reached corporate credit the same morning.",
      "A four-day equity rally met a one-day bond bounce.",
      "Tonight's minutes are the next hint.",
    ],
  });

  pair("amd-lisa-su", "L4", "NVDA", {
    badge: "AMD", badgeLine: "수요", title: "AMD는 수요가 공급을 계속 앞선다고 했습니다",
    heroIcon: "💬", heroBig: "수요>", heroSub: "리사 수 최고경영자입니다. 2027년에 공급을 크게 늘립니다.",
    cards: c3(
      { icon: "📅", big: "2027", mid: "공급", sub: "크게 확대" },
      { icon: "💾", big: "메모리", mid: "부족", sub: "넓은 제약" },
      { icon: "🎯", big: "800", mid: "씨티", sub: "목표 주가" },
    ),
  }, {
    badge: "AMD", badgeLine: "Demand", title: "AMD said demand is still running ahead of supply",
    heroIcon: "💬", heroBig: "Demand", heroSub: "Lisa Su's comment. Supply rises substantially in 2027.",
    cards: c3(
      { icon: "📅", big: "2027", mid: "Supply", sub: "A large increase" },
      { icon: "💾", big: "Memory", mid: "Tight", sub: "Broad constraint" },
      { icon: "🎯", big: "800", mid: "Citi", sub: "Price target" },
    ),
  });

  pair("googl-nuclear-1b", "L1", "GOOGL", {
    badge: "GOOGL", title: "구글이 컨스텔레이션과 10억 달러 원전 전력 계약을 앞두고 있습니다",
    heroIcon: "⚛️", heroBig: "$1B", heroSub: "데이터센터용 원자력 전력입니다. 수년 계약으로 거론됩니다.",
    cards: c3(
      { icon: "🏢", big: "DC", mid: "전력", sub: "데이터센터" },
      { icon: "⚡", big: "690MW", mid: "아마존", sub: "같은 회사 계약" },
      { icon: "🎯", big: "417", mid: "목표", sub: "웰스파고 알파벳" },
    ),
  }, {
    badge: "GOOGL", title: "Google is near a $1 billion nuclear-power deal with Constellation",
    heroIcon: "⚛️", heroBig: "$1B", heroSub: "Nuclear power for data centers. A multi-year contract is in view.",
    cards: c3(
      { icon: "🏢", big: "DC", mid: "Power", sub: "Data centers" },
      { icon: "⚡", big: "690MW", mid: "Amazon", sub: "Same counterparty" },
      { icon: "🎯", big: "417", mid: "Target", sub: "Wells Fargo Alphabet" },
    ),
  });

  pair("tsla-ai5-72gb", "L5", "TSLA", {
    badge: "TSLA", title: "테슬라 AI5 메모리는 72기가바이트, AI6는 144기가바이트입니다",
    heroIcon: "🧠", heroBig: "72GB", heroSub: "AI5를 절반으로 줄였습니다. AI6는 144기가바이트입니다.",
    before: { label: "AI5 이전", big: "144GB", sub: "절반으로 축소" },
    after: { label: "AI5 지금", big: "72GB", sub: "대량 생산용" },
    cards: c3(
      { icon: "🤖", big: "144GB", mid: "AI6", sub: "약 3분의 1" },
      { icon: "🏭", big: "물량", mid: "우선", sub: "옵티머스 대량" },
      { icon: "✅", big: "확인", mid: "머스크", sub: "용량 축소" },
    ),
  }, {
    badge: "TSLA", title: "Tesla AI5 memory is 72 GB and AI6 is 144 GB",
    heroIcon: "🧠", heroBig: "72GB", heroSub: "AI5 was cut in half. AI6 is 144 GB.",
    before: { label: "AI5 was", big: "144GB", sub: "Cut in half" },
    after: { label: "AI5 now", big: "72GB", sub: "For volume" },
    cards: c3(
      { icon: "🤖", big: "144GB", mid: "AI6", sub: "About one-third" },
      { icon: "🏭", big: "Volume", mid: "First", sub: "Optimus scale" },
      { icon: "✅", big: "Yes", mid: "Musk", sub: "Confirmed the cut" },
    ),
  });

  pair("tsla-robotaxi-10cities", "L6", "TSLA", {
    badge: "TSLA", breaking: "채용", title: "테슬라가 텍사스 10개 도시에서 로보택시 인력 21명을 뽑습니다",
    heroBig: "10도시", heroSub: "플릿 지원 21명입니다. 엘패소부터 오스틴까지입니다.",
    grid: [
      { icon: "🚕", big: "21명", mid: "채용", sub: "플릿 지원" },
      { icon: "🌃", big: "야간", mid: "근무", sub: "공고 복수" },
      { icon: "📍", big: "10", mid: "도시", sub: "텍사스" },
      { icon: "🗺️", big: "전역", mid: "확대", sub: "운행 칸" },
    ],
    ctx1: "엘패소 타일러 러벅 코퍼스 올미토 댈러스 샌안토니오 포트워스 휴스턴 오스틴입니다",
    ctx2: "인가 대수가 도시 밖으로 퍼지는 인력 칸입니다",
  }, {
    badge: "TSLA", breaking: "Hiring", title: "Tesla is hiring 21 robotaxi specialists across 10 Texas cities",
    heroBig: "10 cities", heroSub: "21 fleet-support roles. El Paso through Austin.",
    grid: [
      { icon: "🚕", big: "21", mid: "Roles", sub: "Fleet support" },
      { icon: "🌃", big: "Night", mid: "Shifts", sub: "Several postings" },
      { icon: "📍", big: "10", mid: "Cities", sub: "Texas" },
      { icon: "🗺️", big: "State", mid: "Ramp", sub: "Beyond one city" },
    ],
    ctx1: "El Paso, Tyler, Lubbock, Corpus, Olmito, Dallas, San Antonio, Fort Worth, Houston, Austin",
    ctx2: "Hiring that follows authorized cabs out of one city",
  });

  pair("spcx-iss-five", "L3", "SPCX", {
    badge: "SPCX", title: "스페이스X가 미국 우주정거장 최단 도킹 5자리를 모두 갖고 있습니다",
    heroIcon: "✅", heroBig: "7h55m", heroSub: "크루13은 10월 1일입니다. 이전 미국 기록보다 네 시간 넘게 짧습니다.",
    cards: c3(
      { icon: "🥇", big: "5자리", mid: "전부", sub: "미국 최단" },
      { icon: "🚀", big: "드래곤", mid: "다섯", sub: "임무 모두" },
      { icon: "💵", big: "59.2억$", mid: "계약", sub: "상용 승무 총액" },
    ),
  }, {
    badge: "SPCX", title: "SpaceX holds all five fastest U.S. launch-to-docking times",
    heroIcon: "✅", heroBig: "7h55m", heroSub: "Crew-13 on October 1. More than four hours faster than the old U.S. mark.",
    cards: c3(
      { icon: "🥇", big: "5/5", mid: "Spots", sub: "Fastest U.S." },
      { icon: "🚀", big: "Dragon", mid: "All five", sub: "Missions" },
      { icon: "💵", big: "$5.92B", mid: "Contract", sub: "Commercial crew" },
    ),
  });

  pair("spcx-florida-pipe", "L1", "SPCX", {
    badge: "SPCX", title: "스페이스X가 플로리다에 스타십 연료용 32마일 가스관을 제안했습니다",
    heroIcon: "⛽", heroBig: "32mi", heroSub: "케이프 커내버럴 스타십 연료용입니다. 제안 단계입니다.",
    cards: c3(
      { icon: "🌴", big: "케이프", mid: "거점", sub: "동쪽 발사" },
      { icon: "📝", big: "제안", mid: "단계", sub: "착공 전" },
      { icon: "🛣️", big: "15.75", mid: "도로", sub: "루이지애나와 다른 주" },
    ),
  }, {
    badge: "SPCX", title: "SpaceX proposed a 32-mile Florida gas pipeline for Starship",
    heroIcon: "⛽", heroBig: "32mi", heroSub: "Natural gas for Starship at the Cape. Still a proposal.",
    cards: c3(
      { icon: "🌴", big: "Cape", mid: "Site", sub: "East coast" },
      { icon: "📝", big: "Proposal", mid: "Stage", sub: "Before a start" },
      { icon: "🛣️", big: "15.75", mid: "Road", sub: "Louisiana, other state" },
    ),
  });

  pair("tsla-houston-144", "L6", "TSLA", {
    badge: "TSLA", breaking: "현장", title: "휴스턴 주차장에 사이버캡 144대가 서 있습니다",
    heroBig: "144대", heroSub: "10월 24일 부지로 적힌 항공 사진입니다. 시험이 드나듭니다.",
    grid: [
      { icon: "🅿️", big: "144", mid: "주차", sub: "한 부지" },
      { icon: "📅", big: "10/24", mid: "부지", sub: "적힌 날짜" },
      { icon: "🚕", big: "시험", mid: "드나듦", sub: "바쁜 날" },
      { icon: "🏭", big: "출고", mid: "관측", sub: "임박 평가" },
    ],
    ctx1: "인가 169대와 주차 144대는 다른 칸입니다",
    ctx2: "휴스턴 운행 개시가 다음 확인입니다",
  }, {
    badge: "TSLA", breaking: "Lot", title: "144 Cybercabs are parked in a Houston lot",
    heroBig: "144", heroSub: "An aerial dated October 24. Testing traffic is moving in and out.",
    grid: [
      { icon: "🅿️", big: "144", mid: "Parked", sub: "One lot" },
      { icon: "📅", big: "Oct 24", mid: "Lot date", sub: "On the post" },
      { icon: "🚕", big: "Tests", mid: "In-out", sub: "A busy day" },
      { icon: "🏭", big: "Rollout", mid: "View", sub: "Called imminent" },
    ],
    ctx1: "Authorized 169 and parked 144 are different columns",
    ctx2: "Houston service start is the next check",
  });

  pair("cathie-ai-boom", "L2", "AI", {
    badge: "ARKK", title: "캐시 우드는 미국이 인공지능 투자 붐에 들어갔다고 했습니다",
    heroIcon: "🏗️", heroBig: "90%", heroSub: "세계 데이터센터 금융이 미국에 몰려 있습니다. 첫해 100% 상각입니다.",
    cards: [
      { label: "금융", big: "90%", mid: "미국", sub: "세계 데이터센터" },
      { label: "상각", big: "100%", mid: "첫해", sub: "제조·데이터센터" },
      { label: "세", big: "환급", mid: "확대", sub: "재투자로 순환" },
    ],
    detailHead: "같이 둘 숫자",
    detailLines: [
      "기술주는 같은 주 지수 나머지를 사상 최대 격차로 앞섰습니다.",
      "아크인베스트는 인공지능 인프라 전망을 유지합니다.",
      "90%와 하루 등락을 한 속도로 만들지 않습니다.",
    ],
  }, {
    badge: "ARKK", title: "Cathie Wood said the United States has entered an AI investment boom",
    heroIcon: "🏗️", heroBig: "90%", heroSub: "Global data-center financing is concentrated in the U.S. Year-one 100% write-off.",
    cards: [
      { label: "Finance", big: "90%", mid: "U.S.", sub: "Global data centers" },
      { label: "Write-off", big: "100%", mid: "Year 1", sub: "Plants and DCs" },
      { label: "Tax", big: "Refunds", mid: "Larger", sub: "Recycled into expansion" },
    ],
    detailHead: "Keep separate",
    detailLines: [
      "Tech beat the rest of the S&P by the widest margin the same week.",
      "ARK keeps its AI-infrastructure view.",
      "Do not turn 90% into a one-day speed.",
    ],
  });

  pair("tsla-germany-fsd", "L4", "TSLA", {
    badge: "TSLA", badgeLine: "유럽", title: "독일 교통장관이 테슬라 운전자 지원을 유럽연합 승인으로 밀고 있습니다",
    heroIcon: "🇩🇪", heroBig: "EU", heroSub: "슈테펜 빌거 장관입니다. 필요하면 독일이 자체 경로를 찾습니다.",
    cards: c3(
      { icon: "🗣️", big: "장관", mid: "발언", sub: "전역 승인" },
      { icon: "🛤️", big: "독일", mid: "대안", sub: "막히면 자체" },
      { icon: "📝", big: "공문", mid: "전", sub: "허가 전 단계" },
    ),
  }, {
    badge: "TSLA", badgeLine: "Europe", title: "Germany's transport minister is pushing Tesla assistance toward EU approval",
    heroIcon: "🇩🇪", heroBig: "EU", heroSub: "Steffen Bilger. Germany will seek its own path if needed.",
    cards: c3(
      { icon: "🗣️", big: "Minister", mid: "Comment", sub: "EU-wide" },
      { icon: "🛤️", big: "Germany", mid: "Backup", sub: "Own path" },
      { icon: "📝", big: "Permit", mid: "Later", sub: "Not a decree yet" },
    ),
  });

  pair("dimon-debt", "L4", "RATES", {
    badge: "JPM", badgeLine: "발언", title: "제이미 다이먼은 정부가 끝없이 빌릴 수 없다고 했습니다",
    heroIcon: "🏦", heroBig: "ATH", heroSub: "미국 정부 부채는 사상 최고입니다. 같은 주 10년은 5.34%까지 갔습니다.",
    cards: c3(
      { icon: "📉", big: "5.34%", mid: "10년", sub: "그 주 고점" },
      { icon: "🏢", big: "회사채", mid: "매도", sub: "같은 아침" },
      { icon: "📅", big: "의사록", mid: "밤", sub: "다음 달력" },
    ),
  }, {
    badge: "JPM", badgeLine: "Comment", title: "Jamie Dimon said governments cannot borrow endlessly",
    heroIcon: "🏦", heroBig: "ATH", heroSub: "U.S. government debt is at a record. The 10-year touched 5.34% the same week.",
    cards: c3(
      { icon: "📉", big: "5.34%", mid: "10-year", sub: "Week high" },
      { icon: "🏢", big: "Credit", mid: "Sold", sub: "Same morning" },
      { icon: "📅", big: "Minutes", mid: "Tonight", sub: "Next calendar" },
    ),
  });

  pair("starmind-1m", "L3", "SPCX", {
    badge: "SPCX", title: "스타마인드 100만 기 별자리 모습이 공개됐습니다",
    heroIcon: "✅", heroBig: "100만", heroSub: "점은 크기를 나타내지 않습니다. 10기 안팎이 10테라비트로 연결됩니다.",
    cards: c3(
      { icon: "🛰️", big: "10기", mid: "군집", sub: "안팎 연결" },
      { icon: "📡", big: "10Tbps", mid: "대역", sub: "군집 안" },
      { icon: "🧠", big: "연산", mid: "결맞음", sub: "인공지능 모델" },
    ),
  }, {
    badge: "SPCX", title: "A look at a one-million-satellite Starmind constellation was released",
    heroIcon: "✅", heroBig: "1M", heroSub: "Dots are not to scale. Clusters of about 10 satellites link at 10 terabits.",
    cards: c3(
      { icon: "🛰️", big: "~10", mid: "Cluster", sub: "Satellites" },
      { icon: "📡", big: "10Tbps", mid: "Link", sub: "Inside the cluster" },
      { icon: "🧠", big: "Compute", mid: "Coherent", sub: "For AI models" },
    ),
  });
};
