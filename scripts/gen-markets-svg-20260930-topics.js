// 2026-09-30 kr / safe / kr-re SVG
module.exports = function (add) {
  const F = "2026.09.30";
  function go(file, layout, pal, ko, en) {
    ko.footer = F; en.footer = F;
    ko.noteHead = "왜 중요한가"; en.noteHead = "Why it matters";
    add(file, layout, pal, ko, en);
  }
  function rows(file, pal, koRows, enRows, capK, capE, headK, headE) {
    add(file, "ROWS", pal, { headline: headK, rows: koRows, caption: capK }, { headline: headE, rows: enRows, caption: capE });
  }
  const R = (color, fill, right, title, sub) => ({ color, fill, right, title, sub });

  rows("summary-kr", "KOSPI", [
    R("#38bdf8","#061520","6870","코스피가 0.27% 내린 6,870.81로 마감했습니다","외국인 2조 9,033억 원 순매도, 개인 1조 1,433억 원 순매수입니다."),
    R("#60a5fa","#06121f","+0.93%","삼성전자는 배당락일에도 27만 2,500원으로 올랐습니다","26만 6,000원에 열려 장중 27만 6,000원까지 갔습니다."),
    R("#f59e0b","#1a1205","-0.17%","SK하이닉스는 176만 5,000원으로 낙폭을 대부분 만회했습니다","저가는 173만 6,000원, 외국인 순매도 1위는 1조 5,564억 원입니다."),
    R("#4ade80","#061209","-3.16%","LG에너지솔루션은 35만 2,500원으로 지수보다 더 빠졌습니다","전장 대비 1만 1,500원 하락입니다."),
    R("#94a3b8","#0c1017","-1.27%","현대차는 1.27% 하락해 반도체 반등과 갈렸습니다","바이오 1.07%, KB금융 0.40% 하락이 같은 문장에 있습니다."),
    R("#22d3ee","#06171c","+1.93%","삼성전기는 152만 8,000원, 서버 부품 계약 2,900억 원이 붙었습니다","하나증권 목표주가 300만 원, 매수 의견입니다."),
  ], [
    R("#38bdf8","#061520","6870","KOSPI closed at 6,870.81, down 0.27%","Foreigners sold 2.9033 trillion won. Individuals bought 1.1433 trillion."),
    R("#60a5fa","#06121f","+0.93%","Samsung rose to 272,500 won on the ex-dividend day","Opened 266,000 and traded as high as 276,000."),
    R("#f59e0b","#1a1205","-0.17%","SK hynix closed at 1,765,000 won after a deeper dip","Low 1,736,000. Top foreign sale was 1.5564 trillion won."),
    R("#4ade80","#061209","-3.16%","LG Energy Solution closed at 352,500 won, down harder than the index","Down 11,500 won on the day."),
    R("#94a3b8","#0c1017","-1.27%","Hyundai Motor fell 1.27%, apart from the chip bounce","Bio was down 1.07% and KB Financial 0.40% in the same note."),
    R("#22d3ee","#06171c","+1.93%","Samsung Electro-Mechanics closed at 1,528,000 won on a parts contract","290 billion won. Hana target 3 million won, buy."),
  ], "더 볼 것: 6,870.81 · 삼성 272,500 · 하이닉스 1,765,000 · 엔솔 352,500 · 전기 +1.93%",
     "Watch: 6,870.81 · Samsung 272,500 · Hynix 1,765,000 · LGES 352,500 · Semco +1.93%",
     "2026.09.30 한국주식 한장 요약", "2026.09.30 Korea Snapshot");

  go("samsung-exdiv-kr","L1","SEC",{
    badge:"005930", title:"배당락일에도 삼성전자가 27만 2,500원으로 올랐습니다",
    heroIcon:"📈", heroBig:"272,500", heroSub:"0.93% 상승. 시가는 26만 6,000원, 고가는 27만 6,000원입니다.",
    cards:[
      {icon:"🏷", big:"배당락", mid:"권리 소멸", sub:"그런데도 플러스로 마감"},
      {icon:"🌍", big:"6,022억", mid:"외국인 매도", sub:"순매도 상위 2위"},
      {icon:"🎯", big:"63만", mid:"유안타", sub:"목표주가 상향, 매수"},
    ],
    quote:"DS투자증권은 3분기 영업이익 104조 원으로 시장 평균 111조 원보다 낮게 봤습니다. 환율이 이유입니다.",
    noteSub:"목표주가 53만 원 매수 유지는 그 낮은 눈높이와 같이 있습니다. 하루 주가 방향과 분기 이익 추정은 다른 표입니다. 거래대금은 한 종목 4조 원대로 적혔습니다.",
  },{
    badge:"005930", title:"Samsung closed at 272,500 won on the ex-dividend day",
    heroIcon:"📈", heroBig:"272,500", heroSub:"Up 0.93%. Open 266,000, high 276,000.",
    cards:[
      {icon:"🏷", big:"Ex-div", mid:"Rights off", sub:"Still finished higher"},
      {icon:"🌍", big:"₩602bn", mid:"Foreign sale", sub:"Second-largest net sell"},
      {icon:"🎯", big:"630k", mid:"Yuanta", sub:"Target raised, buy"},
    ],
    quote:"DS Securities sees third-quarter operating profit at 104 trillion won, below a 111 trillion consensus, on the currency.",
    noteSub:"A 530,000 won buy target sits next to that lower estimate. The day's price and the quarterly estimate are different tables.",
  });

  go("hynix-close-kr","L2","HYNIX",{
    badge:"000660", title:"하이닉스가 173만 원대까지 갔다가 176만 5,000원에 마쳤습니다",
    heroIcon:"📉", heroBig:"1,765,000", heroSub:"0.17% 하락. 외국인 순매도 1위는 1조 5,564억 원입니다.",
    cards:[
      {label:"저가", big:"1,736,000", mid:"-1.81%", sub:"오후 한때의 바닥"},
      {label:"종가", big:"1,765,000", mid:"-0.17%", sub:"낙폭을 대부분 만회"},
      {label:"대금", big:"4.99조", mid:"시장 1위", sub:"가격은 보합에 가깝습니다"},
    ],
    detailHead:"하우스",
    detailLines:["iM증권 목표주가 350만 원, 매수.","DS 목표주가 264만 원으로 하향, 매수는 유지.","3분기 이익 추정 70조 원은 평균 78조 원보다 낮습니다."],
    noteSub:"환율 가정을 1,370원으로 내린 것이 이익 눈높이를 낮춘 이유입니다. 하루 등락과 그 추정은 다른 표입니다. 창구에 외국계가 사고 판 날이기도 합니다.",
  },{
    badge:"000660", title:"Hynix touched 1.736 million and closed at 1.765 million",
    heroIcon:"📉", heroBig:"1,765,000", heroSub:"Down 0.17%. Top foreign sale 1.5564 trillion won.",
    cards:[
      {label:"Low", big:"1,736,000", mid:"-1.81%", sub:"Afternoon trough"},
      {label:"Close", big:"1,765,000", mid:"-0.17%", sub:"Most of the drop erased"},
      {label:"Value", big:"₩5.0tn", mid:"Market #1", sub:"Price nearly flat"},
    ],
    detailHead:"HOUSES",
    detailLines:["iM target 3.5 million won, buy.","DS cut its target to 2.64 million and kept a buy.","Q3 profit view 70 trillion vs 78 trillion consensus."],
    noteSub:"A lower won assumption pulled the profit view down. The day's move and that estimate are different tables.",
  });

  go("lges-drop-kr","L5","TSLA",{
    badge:"373220", title:"에너지솔루션이 3.16% 내린 35만 2,500원입니다",
    heroIcon:"🔋", heroBig:"352,500", heroSub:"지수 하락 0.27%보다 깊은 하루입니다.",
    before:{label:"전일 흐름", big:"상승", sub:"지수가 빠진 날의 강세"},
    after:{label:"어제", big:"-3.16%", sub:"35만 2,500원"},
    cards:[
      {icon:"📉", big:"-11,500", mid:"원", sub:"전장 대비"},
      {icon:"🎯", big:"51만", mid:"미래에셋", sub:"매수 유지"},
      {icon:"🎯", big:"48만", mid:"NH", sub:"매수, ESS 수주"},
    ],
    quote:"미래에셋은 3분기 영업이익 눈높이를 4,037억 원으로 올려 기존 2,230억 원보다 높게 봤습니다.",
    noteSub:"NH는 올해 저장장치 수주 목표 90기가와트시 가운데 하반기 비중이 크다고 했습니다. 어제 주가는 그 메모의 확인이 아니라 하루 수급입니다.",
  },{
    badge:"373220", title:"LG Energy Solution fell 3.16% to 352,500 won",
    heroIcon:"🔋", heroBig:"352,500", heroSub:"Deeper than the index decline of 0.27%.",
    before:{label:"Prior day", big:"Up", sub:"Strong on a down index"},
    after:{label:"Yesterday", big:"-3.16%", sub:"352,500 won"},
    cards:[
      {icon:"📉", big:"-11,500", mid:"won", sub:"Versus prior close"},
      {icon:"🎯", big:"510k", mid:"Mirae", sub:"Buy kept"},
      {icon:"🎯", big:"480k", mid:"NH", sub:"Buy, ESS orders"},
    ],
    quote:"Mirae lifted its third-quarter operating-profit view to 403.7 billion won from 223 billion.",
    noteSub:"NH points to a 90 GWh storage-order goal weighted to the second half. Yesterday's price is one day's flow, not that memo.",
  });

  go("hyundai-drop-kr","L4","MACRO",{
    badge:"005380", badgeLine:"매수 유지 · 목표 하향", title:"현대차가 1.27% 하락했습니다",
    heroIcon:"🚗", heroBig:"-1.27%", heroSub:"원화 종가는 그 문장에 없고 등락률만 있습니다.",
    cards:[
      {icon:"🏭", big:"6~7만", mid:"생산 차질", sub:"3분기 파업 설명"},
      {icon:"🎯", big:"50만", mid:"삼성증권", sub:"60만에서 하향, 매수"},
      {icon:"🎯", big:"74만", mid:"교보", sub:"80만에서 조정, 매수"},
    ],
    quote:"원가 절감은 2027년, 주행 데이터는 2028년부터라는 삼성증권 일정입니다.",
    noteSub:"눈높이는 내려도 매수 의견이 남은 하우스입니다. 하루 1.27%와 분기 생산 차질 대수를 한 칸에 더하지 않습니다.",
  },{
    badge:"005380", badgeLine:"Buy kept · target cut", title:"Hyundai Motor fell 1.27%",
    heroIcon:"🚗", heroBig:"-1.27%", heroSub:"The note gave the percent, not a won close.",
    cards:[
      {icon:"🏭", big:"60-70k", mid:"Output gap", sub:"Q3 strike explanation"},
      {icon:"🎯", big:"500k", mid:"Samsung Sec.", sub:"Cut from 600k, buy"},
      {icon:"🎯", big:"740k", mid:"Kyobo", sub:"Cut from 800k, buy"},
    ],
    quote:"Samsung Securities puts cost cuts in 2027 and driving data in 2028.",
    noteSub:"Targets came down and the buy tag stayed. Do not add the day's 1.27% to the quarter's lost vehicles.",
  });

  go("semco-mlcc-kr","L6","SEC",{
    badge:"009150", breaking:"서버 부품", title:"삼성전기가 1.93% 오른 152만 8,000원입니다",
    heroBig:"1,528,000", heroSub:"장기 공급 계약 2,900억 원이 호재로 적혔습니다.",
    grid:[
      {icon:"📄", big:"2,900억", mid:"계약", sub:"서버용 부품"},
      {icon:"⏱", big:"48~56주", mid:"리드타임", sub:"정상은 12주"},
      {icon:"🎯", big:"300만", mid:"하나증권", sub:"매수 유지"},
      {icon:"📈", big:"+1.93%", mid:"종가", sub:"지수와 다른 방향"},
    ],
    ctx1:"계약 금액과 목표주가는 단위가 다릅니다.",
    ctx2:"판가 협상은 아직 진행 중이라는 메모입니다.",
    quote:"기판·수동부품이 오른 것은 메모리 매도와 다른 청구서입니다.",
    noteSub:"하나증권은 정보기술 부품 가운데 공급이 가장 빠듯하다고 봤습니다. 2,900억 원은 이미 묶인 공급이고 단가 인상은 별도 협상입니다.",
  },{
    badge:"009150", breaking:"Server parts", title:"Samsung Electro-Mechanics rose 1.93% to 1,528,000 won",
    heroBig:"1,528,000", heroSub:"A 290 billion won long-term supply deal was the cited catalyst.",
    grid:[
      {icon:"📄", big:"₩290bn", mid:"Contract", sub:"Server parts"},
      {icon:"⏱", big:"48-56w", mid:"Lead time", sub:"Normal is 12 weeks"},
      {icon:"🎯", big:"3.0m", mid:"Hana", sub:"Buy kept"},
      {icon:"📈", big:"+1.93%", mid:"Close", sub:"Opposite the index"},
    ],
    ctx1:"Contract value and the share target use different units.",
    ctx2:"Price talks are still underway.",
    quote:"Parts rose on a different invoice from the memory selloff.",
    noteSub:"Hana calls this the tightest supply in IT components. The 290 billion won is booked supply. A price hike is a separate talk.",
  });

  rows("summary-safe","BTC",[
    R("#f7931a","#1a0f00","$83,607","비트코인이 8만 3,607달러로 전일 꼭지보다 소폭 높았습니다","포춘 동부 오후 2시 45분. 이더는 2,694달러입니다."),
    R("#facc15","#1a1600","+1.14%","금 현물이 4,162.84달러로 하루 1.14% 반등했습니다","은 현물은 61.05달러로 거의 보합입니다."),
    R("#fb923c","#1a0d02","$92.60","서부텍사스유가 배럴당 92.60달러에 머물렀습니다","호르무즈 협상이 더디고 우회 송유관은 하루 350만 배럴 보도입니다."),
    R("#94a3b8","#0c1017","68배","금은 비율은 약 68로 금이 반등을 더 했습니다","선물 금·은의 큰 하락 숫자와 현물을 한 칸에 두지 않습니다."),
  ],[
    R("#f7931a","#1a0f00","$83,607","Bitcoin was $83,607, a little above the prior mark","Fortune, 2:45 p.m. Eastern. Ether $2,694."),
    R("#facc15","#1a1600","+1.14%","Spot gold rebounded to $4,162.84, up 1.14%","Spot silver was $61.05, nearly flat."),
    R("#fb923c","#1a0d02","$92.60","WTI held $92.60 a barrel","Hormuz talks were slow. Bypass flows near 3.5 million barrels a day."),
    R("#94a3b8","#0c1017","68×","The gold-silver ratio was about 68 as gold bounced harder","Do not merge futures selloffs with the spot bounce."),
  ], "더 볼 것: 비트 83,607 · 금 4,163 · 은 61.05 · 유가 92.60",
     "Watch: BTC 83,607 · gold 4,163 · silver 61.05 · WTI 92.60",
     "2026.09.30 안전자산 한장 요약", "2026.09.30 Safe Assets");

  go("btc-83607-safe","L1","BTC",{
    badge:"BTC", title:"비트코인이 8만 3,607달러입니다",
    heroIcon:"₿", heroBig:"$83,607", heroSub:"전일 보고보다 538달러 높습니다. 시가총액 약 1조 3,300억 달러.",
    cards:[
      {icon:"➕", big:"+$538", mid:"전일 꼭지 대비", sub:"같은 보고 기준"},
      {icon:"📆", big:"8.5만", mid:"주말 고점", sub:"되돌린 뒤의 화요일"},
      {icon:"2️⃣", big:"$2,694", mid:"이더", sub:"같은 시각 이웃"},
    ],
    quote:"국채 금리와 해협 뉴스가 위험자산 할인을 키운 밤입니다. 파생 잔고 숫자는 이 표에 없습니다.",
    noteSub:"블랙록과 피델리티의 장기 배분 전망은 하루 538달러와 시계가 다릅니다. 목표 가격을 매일 내놓지는 않습니다.",
  },{
    badge:"BTC", title:"Bitcoin was $83,607",
    heroIcon:"₿", heroBig:"$83,607", heroSub:"$538 above the prior mark. Market value about $1.33 trillion.",
    cards:[
      {icon:"➕", big:"+$538", mid:"Vs prior mark", sub:"Same report series"},
      {icon:"📆", big:"$85k", mid:"Weekend high", sub:"Given back before Tuesday"},
      {icon:"2️⃣", big:"$2,694", mid:"Ether", sub:"Same-hour neighbor"},
    ],
    quote:"Yields and the strait news raised the discount on risk assets. Derivatives balances are not on this table.",
    noteSub:"BlackRock and Fidelity allocation views run on a longer clock than $538. They do not print a daily target.",
  });

  go("gold-4163-safe","L2","GOLD",{
    badge:"GOLD", title:"금 현물이 4,162.84달러로 1.14% 반등했습니다",
    heroIcon:"🥇", heroBig:"$4,163", heroSub:"하루 47달러. 은은 61.05달러로 조용했습니다.",
    cards:[
      {label:"현물", big:"4,162.84", mid:"+1.14%", sub:"저가 매수 설명"},
      {label:"은", big:"61.05", mid:"+0.11%", sub:"비율 약 68"},
      {label:"중앙은행", big:"20.2톤", mid:"8월 중국", sub:"월간 매수, 하루 시세 아님"},
    ],
    detailHead:"나누어 읽을 것",
    detailLines:["선물 급락 숫자와 현물 반등은 다른 표입니다.","국경절 앞 실물 수요가 문장에 있습니다.","유가 90달러 위는 금리 기대를 통해 금속을 누릅니다."],
    noteSub:"중앙은행 매수는 가격 하단 전망의 배경입니다. 화요일 47달러가 그 톤 수의 결과는 아닙니다.",
  },{
    badge:"GOLD", title:"Spot gold rebounded to $4,162.84, up 1.14%",
    heroIcon:"🥇", heroBig:"$4,163", heroSub:"Up $47. Silver was quiet at $61.05.",
    cards:[
      {label:"Spot", big:"4,162.84", mid:"+1.14%", sub:"Bargain buying"},
      {label:"Silver", big:"61.05", mid:"+0.11%", sub:"Ratio about 68"},
      {label:"PBOC", big:"20.2t", mid:"August", sub:"Monthly buy, not the day"},
    ],
    detailHead:"KEEP SEPARATE",
    detailLines:["Futures selloffs and the spot bounce are different tables.","Pre-holiday physical demand is in the note.","Oil above $90 leans on metals through rate expectations."],
    noteSub:"Central-bank buying is the backdrop for a floor view. Tuesday's $47 is not the result of that monthly tonnage.",
  });

  go("eth-2694-safe","L4","ETH",{
    badge:"ETH", badgeLine:"같은 날 두 시각", title:"이더리움이 2,693달러대입니다",
    heroIcon:"◈", heroBig:"$2,694", heroSub:"다른 시각 기사는 2,698달러, 하루 1.8%입니다.",
    cards:[
      {icon:"➕", big:"+$24", mid:"전일 보고", sub:"포춘 기준"},
      {icon:"1️⃣", big:"1.8%", mid:"다른 시각", sub:"2,698달러"},
      {icon:"💤", big:"보합", mid:"솔라나 등", sub:"대형 둘만 플러스"},
    ],
    quote:"금리·유가 재료는 비트와 같습니다. 이더만의 업그레이드 뉴스는 아닙니다.",
    noteSub:"블랙록 배분 전망의 중심은 비트코인 현물 펀드이고 이더는 다음 칸입니다. 하루 24달러는 수수료 전망의 확인이 아닙니다.",
  },{
    badge:"ETH", badgeLine:"Two clocks, one day", title:"Ether was about $2,694",
    heroIcon:"◈", heroBig:"$2,694", heroSub:"Another clock showed $2,698, up 1.8%.",
    cards:[
      {icon:"➕", big:"+$24", mid:"Prior mark", sub:"Fortune print"},
      {icon:"1️⃣", big:"1.8%", mid:"Other clock", sub:"$2,698"},
      {icon:"💤", big:"Flat", mid:"Solana etc.", sub:"Only the two majors up"},
    ],
    quote:"Rates and oil are the same backdrop as bitcoin. This is not an ether-only upgrade.",
    noteSub:"BlackRock's allocation view centers on the bitcoin fund. Ether is the next sleeve. $24 is not proof of the fee outlook.",
  });

  go("silver-61-safe","L5","SILVER",{
    badge:"XAG", title:"은 현물은 61.05달러, 금보다 조용했습니다",
    heroIcon:"🥈", heroBig:"$61.05", heroSub:"하루 0.11%. 금은 1.14% 올랐습니다.",
    before:{label:"선물 표", big:"$60.65", sub:"5%대 하락 인쇄"},
    after:{label:"현물", big:"$61.05", sub:"+0.11%"},
    cards:[
      {icon:"⚖️", big:"68배", mid:"금은 비율", sub:"금이 반등을 주도"},
      {icon:"☀️", big:"산업", mid:"태양광·전자", sub:"귀금속이자 소재"},
      {icon:"🚫", big:"평균 금지", mid:"두 표", sub:"현물과 선물을 섞지 않음"},
    ],
    quote:"산업 수요가 약하면 금 반등을 다 따라가지 못하는 날이 나옵니다.",
    noteSub:"비율 68이 줄어드는지가 장기 전망의 확인입니다. 하루 0.07달러는 방향보다 멈춤에 가깝습니다.",
  },{
    badge:"XAG", title:"Spot silver was $61.05, quieter than gold",
    heroIcon:"🥈", heroBig:"$61.05", heroSub:"Up 0.11%. Gold rose 1.14%.",
    before:{label:"Futures print", big:"$60.65", sub:"A 5% decline"},
    after:{label:"Spot", big:"$61.05", sub:"+0.11%"},
    cards:[
      {icon:"⚖️", big:"68×", mid:"Gold/silver", sub:"Gold led the bounce"},
      {icon:"☀️", big:"Industry", mid:"Solar, electronics", sub:"Metal and material"},
      {icon:"🚫", big:"Don't blend", mid:"Two tables", sub:"Spot is not futures"},
    ],
    quote:"When industrial demand is soft, silver can skip a gold bounce.",
    noteSub:"A narrowing ratio is the long-view check. Seven cents is closer to a pause than a trend.",
  });

  go("wti-9260-safe","L6","OIL",{
    badge:"WTI", breaking:"90달러 위", title:"서부텍사스유가 92.60달러입니다",
    heroBig:"$92.60", heroSub:"전일보다 0.19달러. 해협 협상이 더딥니다.",
    grid:[
      {icon:"🚢", big:"해협", mid:"재개 지연", sub:"가격을 받친 설명"},
      {icon:"🛢", big:"350만", mid:"우회 배럴", sub:"사우디 동서 관"},
      {icon:"📄", big:"제재", mid:"완화 검토", sub:"진전 때만"},
      {icon:"🔥", big:"가스", mid:"$3", sub:"원유와 다른 등락"},
    ],
    ctx1:"우회 물량이 늘면 프리미엄은 얇아집니다.",
    ctx2:"금속 반등과 유가 유지는 다른 반응입니다.",
    quote:"제안 거절과 제재 완화 검토가 한 주에 같이 있습니다.",
    noteSub:"92달러는 해협 헤드라인과 송유관 유량 사이의 화요일 가격입니다. 하루 목표가를 확정한 수치는 아닙니다.",
  },{
    badge:"WTI", breaking:"Above $90", title:"WTI was $92.60",
    heroBig:"$92.60", heroSub:"Up $0.19. Strait talks stayed slow.",
    grid:[
      {icon:"🚢", big:"Strait", mid:"Slow reopen", sub:"The support line"},
      {icon:"🛢", big:"3.5m", mid:"Bypass bbl", sub:"Saudi east-west"},
      {icon:"📄", big:"Sanctions", mid:"Relief talk", sub:"Only if progress"},
      {icon:"🔥", big:"Gas", mid:"$3", sub:"Not the oil move"},
    ],
    ctx1:"More bypass barrels would thin the premium.",
    ctx2:"A metals bounce and sticky oil are different reactions.",
    quote:"A rejected proposal and relief talk sat in the same week.",
    noteSub:"$92 is Tuesday's price between headlines and pipeline flow. It is not a published daily target.",
  });

  rows("summary-krre","POLICY",[
    R("#fb923c","#1a0d02","251","계양 이번 모집은 663가구 중 251가구입니다","특별 213, 일반 38. 접수는 오늘부터 10월 2일."),
    R("#f97316","#1a0d02","10/21","계양 당첨 발표는 10월 21일입니다","사전청약 당첨자 접수는 9월 17~18일에 끝났습니다."),
    R("#fdba74","#1a0d02","426","광명 에듀하임은 426가구, 일반 190·특별 236입니다","1순위는 오늘과 10월 1일, 발표는 10월 12일."),
    R("#94a3b8","#111827","935","지방 신규 8건 합계 935가구에는 계양이 빠져 있습니다","진주 판문 690가구는 29일 칸입니다."),
  ],[
    R("#fb923c","#1a0d02","251","Gyeyang's round is 251 of 663 homes","213 special, 38 general. Open today through Oct. 2."),
    R("#f97316","#1a0d02","Oct 21","Gyeyang winners are due Oct. 21","Prior winners already applied Sept. 17–18."),
    R("#fdba74","#1a0d02","426","Gwangmyeong lists 426 homes, 190 general and 236 special","First priority today and Oct. 1. Results Oct. 12."),
    R("#94a3b8","#111827","935","Eight new projects total 935 homes, excluding Gyeyang","Jinju's 690 homes were on the 29th."),
  ], "더 볼 것: 계양 251 · 일반 38 · 광명 426 · 발표 10/12와 10/21",
     "Watch: Gyeyang 251 · 38 general · Gwangmyeong 426 · Oct. 12 and Oct. 21",
     "2026.09.30 부동산 한장 요약", "2026.09.30 Housing Snapshot");

  go("gyeyang-open-krre","L2","POLICY",{
    badge:"계양", title:"계양 일반 접수가 오늘 열리고 대상은 251가구입니다",
    heroIcon:"🏗", heroBig:"251가구", heroSub:"공급 663 가운데 이번 용지. 일반 38, 특별 213.",
    cards:[
      {label:"일반", big:"38", mid:"가구", sub:"경쟁이 붙기 쉬운 칸"},
      {label:"특별", big:"213", mid:"가구", sub:"자격이 먼저"},
      {label:"발표", big:"10/21", mid:"당첨", sub:"오늘 숫자는 모집"},
    ],
    detailHead:"이미 지난 접수",
    detailLines:["사전청약 당첨자는 9월 17~18일에 접수했습니다.","2023년 9월 사전청약 단지입니다.","창구는 10월 2일까지 사흘입니다."],
    noteSub:"경쟁률은 아직 없습니다. 10월 21일이 38가구 일반의 배수를 보여 줍니다. 663과 251을 같은 모집 수로 적지 않습니다.",
  },{
    badge:"Gyeyang", title:"Gyeyang general entry opens today for 251 homes",
    heroIcon:"🏗", heroBig:"251 homes", heroSub:"Of 663 supplied. 38 general, 213 special.",
    cards:[
      {label:"General", big:"38", mid:"homes", sub:"Where competition piles up"},
      {label:"Special", big:"213", mid:"homes", sub:"Eligibility first"},
      {label:"Results", big:"Oct 21", mid:"Winners", sub:"Today is the offer count"},
    ],
    detailHead:"ALREADY CLOSED",
    detailLines:["Prior winners applied Sept. 17–18.","The project held a 2023 pre-sale.","The window runs three days through Oct. 2."],
    noteSub:"There is no competition ratio yet. Oct. 21 shows the multiple on 38 general homes. Do not treat 663 and 251 as the same offer.",
  });

  go("gwangmyeong-426-krre","L1","POLICY",{
    badge:"광명", title:"광명 에듀하임 426가구, 발표는 10월 12일입니다",
    heroIcon:"🏢", heroBig:"426", heroSub:"일반 190, 특별 236. 계양 발표일 10월 21일과 다릅니다.",
    cards:[
      {icon:"1️⃣", big:"9/30", mid:"1순위", sub:"오늘"},
      {icon:"2️⃣", big:"10/1", mid:"이어서", sub:"접수가 나뉩니다"},
      {icon:"📅", big:"10/12", mid:"당첨", sub:"계양보다 이릅"},
    ],
    quote:"특별이 일반보다 많습니다. 일반 경쟁률만 보면 236가구가 빠집니다.",
    noteSub:"민간 분양과 계양 공공 본청약의 자격은 다릅니다. 426과 251을 한 공급으로 더하지 않습니다.",
  },{
    badge:"Gwangmyeong", title:"Gwangmyeong lists 426 homes, results on Oct. 12",
    heroIcon:"🏢", heroBig:"426", heroSub:"190 general, 236 special. Gyeyang results are Oct. 21.",
    cards:[
      {icon:"1️⃣", big:"Sep 30", mid:"Priority", sub:"Today"},
      {icon:"2️⃣", big:"Oct 1", mid:"Next", sub:"Entry is split"},
      {icon:"📅", big:"Oct 12", mid:"Winners", sub:"Earlier than Gyeyang"},
    ],
    quote:"Special supply exceeds general. A general-only ratio drops 236 homes.",
    noteSub:"Private-sale rules differ from Gyeyang's public round. Do not add 426 and 251 into one supply number.",
  });

  go("cheongyak-split-krre","L6","POLICY",{
    badge:"청약", breaking:"달력이 나뉨", title:"29일 지방과 30일 수도권이 다른 칸입니다",
    heroBig:"935", heroSub:"신규 8건 합계. 계양 공공분양은 이 합에 없습니다.",
    grid:[
      {icon:"🏘", big:"690", mid:"진주", sub:"29일 대형 단지"},
      {icon:"🏗", big:"251", mid:"계양", sub:"합계 밖"},
      {icon:"🏢", big:"426", mid:"광명", sub:"30일 칸"},
      {icon:"📅", big:"10월", mid:"발표", sub:"6일부터 21일"},
    ],
    ctx1:"지방 합계에 계양을 더하면 두 번 셉니다.",
    ctx2:"지역 제한 때문에 전국 합이 경쟁률이 아닙니다.",
    quote:"사전청약 당첨자와 오늘 일반 접수는 계양 안에서도 날짜가 다릅니다.",
    noteSub:"한 주의 청약을 한 날짜의 당첨으로 적지 않습니다. 단지별 배수가 주택 수요 전망의 확인입니다.",
  },{
    badge:"Sales", breaking:"Split calendar", title:"The 29th was local and the 30th is the capital region",
    heroBig:"935", heroSub:"Eight new projects. Gyeyang's public sale is outside this sum.",
    grid:[
      {icon:"🏘", big:"690", mid:"Jinju", sub:"Large site on the 29th"},
      {icon:"🏗", big:"251", mid:"Gyeyang", sub:"Outside the sum"},
      {icon:"🏢", big:"426", mid:"Gwangmyeong", sub:"The 30th"},
      {icon:"📅", big:"October", mid:"Results", sub:"From the 6th to the 21st"},
    ],
    ctx1:"Adding Gyeyang onto the local sum double counts.",
    ctx2:"Region rules mean a national sum is not a competition ratio.",
    quote:"Inside Gyeyang, prior winners and today's general entry used different dates.",
    noteSub:"Do not collapse a week of sales into one result day. Project-level multiples are the check on housing demand.",
  });
};
