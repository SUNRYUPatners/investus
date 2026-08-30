import type { Post, Comment } from "@/lib/wallPosts";

const T = 1787698800000; // 2026-08-26 08:00 KST
const T31 = 1788130800000; // 2026-08-31 08:00 KST
const T29 = 1787958000000; // 2026-08-29 08:00 KST
const T28 = 1787871600000; // 2026-08-28 08:00 KST
const T27 = 1787785200000; // 2026-08-27 08:00 KST

/** 한국 종토방 — 심볼 자리에 종목명(한글) 사용 */
export const MOCK_POSTS_KR: Post[] = [
  { id: 9029, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "관심종목", content: "6788.88 -1.79%. 이번 주 SemiCon·FOMC·9/4 고용", createdAt: T31 - 0, likes: 30, comments: 2, },
  { id: 9030, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "관심종목", content: "CXMT +874% vs 자사주 1.5조. 공급 vs 환원", createdAt: T31 - 1800000, likes: 29, comments: 2, },
  { id: 9031, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "관심종목", content: "-4.45%인데 에이전트 메모리 24배 전망", createdAt: T31 - 3600000, likes: 28, comments: 2, },
  { id: 9032, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "관심종목", content: "CID 실망 -3.73%. SW 프리미엄 테스트", createdAt: T31 - 5400000, likes: 27, comments: 2, },
  { id: 9033, symbol: "KB금융", nickname: "은행주러", holdingLabel: "관심종목", content: "+2.08% 금리 기대", createdAt: T31 - 7200000, likes: 26, comments: 2, },
  { id: 9034, symbol: "수급", nickname: "외국인추적", holdingLabel: "관심종목", content: "주간 외국인 8.3조 순매도", createdAt: T31 - 9000000, likes: 25, comments: 2, },
  { id: 9035, symbol: "코스피", nickname: "매크로덕후", holdingLabel: "관심종목", content: "9월 인상 57.5%·환율·수급 세 줄", createdAt: T31 - 10800000, likes: 24, comments: 2, },
  { id: 9021, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "6788.88 -1.79%. 어제 6900 올라선 거 하루 만에 거의 다 반납했습니다. 장중에 6901까지 갔다가 6780까지 밀렸어요. 하루 변동 폭이 120포인트 넘습니다.", createdAt: T29, likes: 42, comments: 3 },
  { id: 9022, symbol: "코스피", nickname: "외국인추적", holdingLabel: "관망", content: "외국인 1조 7564억 순매도. 아침 9시 13분엔 407억이었는데 마감까지 43배로 늘었네요. 잭슨홀 앞두고 대기 성격 매도였다고 봅니다.", createdAt: T29 - 1800_000, likes: 37, comments: 3 },
  { id: 9023, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "3% 안팎 하락. 어제 밤 미국 AI 반도체 실적 좋았는데 우리는 반대로 갔습니다. 좋은 뉴스가 이미 가격에 있으면 더 못 올린다는 걸 오늘 배웠어요.", createdAt: T29 - 3600_000, likes: 31, comments: 2 },
  { id: 9024, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "165.3만원 -4.45%. 시총 상위 중에 제일 많이 빠졌네요. 그런데 같은 주에 메모리 부족이 2030년 말까지 간다는 발언이 나왔습니다. 주가랑 전망이 정반대.", createdAt: T29 - 5400_000, likes: 45, comments: 3 },
  { id: 9025, symbol: "KB금융", nickname: "은행주러", holdingLabel: "KB금융 보유", content: "2%대 상승. 금리 더 오를 수 있다는 전망 나오면 은행은 예금·대출 이자 차이가 커질 수 있으니까요. 하락장에서 이런 날이 오네요.", createdAt: T29 - 7200_000, likes: 23, comments: 2 },
  { id: 9026, symbol: "환율", nickname: "환율보는사람", holdingLabel: "관심종목", content: "1372.5원, 8.4원 하락. 외국인이 1조 7천억 팔았는데 환율이 내렸다는 게 특이합니다. 세계적인 달러 약세가 환전 수요를 눌렀다는 얘기죠.", createdAt: T29 - 9000_000, likes: 28, comments: 2 },
  { id: 9027, symbol: "코스피", nickname: "매크로덕후", holdingLabel: "관망", content: "잭슨홀 매파였습니다. 9월 인상 확률 35.4 → 59.7. 다음 주 원달러·외국인 순매수·9월 확률 세 줄만 적어두면 방향 보입니다.", createdAt: T29 - 10800_000, likes: 34, comments: 3 },
  { id: 9028, symbol: "코스닥", nickname: "중소형주", holdingLabel: "코스닥 보유", content: "838.41 +0.09%. 코스피는 1.79% 빠졌는데 코스닥은 강보합. 개인이 1275억 받아냈어요. 외국인 매도가 대형주에 몰렸다는 신호로 봅니다.", createdAt: T29 - 12600_000, likes: 19, comments: 1 },

  { id: 9011, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "오늘 6984.95 +1.05%. 장중 7000 터치했는데 마감까지 못 버텼네요. 터치랑 안착은 다른 문제입니다. 잭슨홀 연설 나오면 내일 또 출렁일 듯.", createdAt: T28, likes: 38, comments: 3 },
  { id: 9012, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "269,500원 +1.32%. 어제 밤 NVDA 8.74% 급등 보고 아침에 바로 반응한 느낌. AH -2%랑 정규장 +8%는 완전히 다른 세계더라.", createdAt: T28 - 1800_000, likes: 29, comments: 2 },
  { id: 9013, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "175.5만원 +1.45%. 삼전보다 더 갔어요. 3분기 가이던스 1080억 달러 보면 HBM 쪽 기대는 아직 안 죽은 듯.", createdAt: T28 - 3600_000, likes: 24, comments: 2 },
  { id: 9014, symbol: "HD현대일렉트릭", nickname: "전력망", holdingLabel: "관심종목", content: "895,000원. 트럼프 전력장비 EO 때문에 어제도 오르고 오늘도 분위기 좋네요. 근데 수주 공시 없으면 테마로 끝날 수도.", createdAt: T28 - 5400_000, likes: 31, comments: 2 },
  { id: 9015, symbol: "삼성SDI", nickname: "배터리존버", holdingLabel: "삼성SDI 보유", content: "어제 10% 넘게 오르고 오늘 -2.46%. 딱 예상한 패턴. 반은 팔았습니다. 수주 나올 때까지는 조심.", createdAt: T28 - 7200_000, likes: 44, comments: 3 },
  { id: 9016, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "402,000 +1%. 오늘 장은 반도체·전력이 주인공이었고 자동차는 그냥 따라간 정도. 미국 판매 나오면 다시 보죠.", createdAt: T28 - 9000_000, likes: 17, comments: 1 },
  { id: 9017, symbol: "코스피", nickname: "매크로덕후", holdingLabel: "관망", content: "오늘 밤 잭슨홀 워시 연설… 매파 나오면 내일 외국인부터 빠질 수 있어요. 환율이랑 3년물 금리 같이 켜두고 자려고요.", createdAt: T28 - 10800_000, likes: 26, comments: 2 },
  { id: 9018, symbol: "네이버", nickname: "플랫폼러", holdingLabel: "관심종목", content: "218,000 +0.69%. 오늘도 크게 튀진 않았는데 금리 부담 있는 업종치고는 괜찮았어요. 광고 회복 숫자 나올 때까지는 관망.", createdAt: T28 - 12600_000, likes: 14, comments: 1 },

  { id: 9001, symbol: "코스피", nickname: "지수만본다", holdingLabel: "인덱스 보유", content: "금리 두 번 연속 올렸는데 지수가 1.53% 올랐습니다. 솔직히 오늘 아침엔 빠질 각오하고 있었는데 완전히 반대로 갔네요. 6,900선 안착까지는 봤는데 7,000은 한 번에 안 뚫리는 게 정상이라고 봅니다.", createdAt: T27, likes: 41, comments: 3 },
  { id: 9002, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "266,000원 마감, +1.72%. 금리 올린 날에 시총 1위가 올라주면 그날 장은 일단 합격입니다. 다만 오늘 상승 재료가 우리 실적이 아니라 미국 AI 반도체 실적이라는 건 잊지 말아야죠. 수출 통계로 확인되기 전까지는 기대에 얹혀 있는 가격입니다.", createdAt: T27 - 1800_000, likes: 33, comments: 2 },
  { id: 9003, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "173만원 찍고 +2.49%로 마쳤어요. 삼전보다 더 갔다는 게 포인트입니다. HBM 쪽 기대는 여전히 살아있는데, 증설 비용이 이익률 먼저 갉아먹는 구간이라 저는 분기 영업이익률만 보고 있습니다.", createdAt: T27 - 3600_000, likes: 27, comments: 2 },
  { id: 9004, symbol: "삼성SDI", nickname: "배터리존버", holdingLabel: "삼성SDI 보유", content: "하루에 10.27%요. 569,000원. 2년 가까이 물려 있다가 이런 날 만나니 손이 떨립니다. 근데 냉정하게 보면 공매도 환매 물량도 섞여 있을 겁니다. 수주 공시 나오기 전까지는 저도 반은 의심하면서 보고 있어요.", createdAt: T27 - 5400_000, likes: 52, comments: 3 },
  { id: 9005, symbol: "LG에너지솔루션", nickname: "엔솔주주", holdingLabel: "LG엔솔 보유", content: "370,500원 +5.56%. 셀 회사랑 LG화학 같은 소재 회사가 같은 날 같이 올랐다는 게 제일 반가운 부분입니다. 한 종목만 튀면 개별 재료지만 셀·소재가 같이 가면 업종을 다시 보기 시작했다는 뜻이니까요.", createdAt: T27 - 7200_000, likes: 24, comments: 1 },
  { id: 9006, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "398,000원 +2.45%로 마감했습니다. 협력사 AI 공동훈련센터 소식이 같이 나왔는데, 솔직히 이건 실적에 바로 잡히는 항목은 아니에요. 그래도 부품사 불량률 내려가면 결국 완성차 원가로 돌아오니까 장기로는 나쁘지 않다고 봅니다.", createdAt: T27 - 9000_000, likes: 19, comments: 2 },
  { id: 9007, symbol: "기아", nickname: "기아매니아", holdingLabel: "기아 보유", content: "126,100원 +4.03%, 오늘은 형보다 아우가 더 갔네요. 같은 부품망 쓰는데 폭이 다르면 대개 차종 구성이나 지역 비중 차이입니다. 월간 판매 자료 나오면 이유가 보일 거예요.", createdAt: T27 - 10800_000, likes: 16, comments: 1 },
  { id: 9008, symbol: "네이버", nickname: "플랫폼러", holdingLabel: "관심종목", content: "216,500원 +1.59%. 금리 올린 날에 플랫폼이 오른 게 좀 신기했습니다. 원래 금리 오르면 제일 먼저 눌리는 쪽인데요. 광고 회복 기대가 그만큼 컸다는 얘기 같은데, 저는 분기 광고 매출 증가율 나올 때까지는 관망합니다.", createdAt: T27 - 12600_000, likes: 13, comments: 1 },
];

export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {
  9021: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "하루에 오르고 내리는 폭이 120포인트면 종가 하나로 판단하기 어렵습니다.", createdAt: T29 + 600_000, likes: 9 },
    { id: 2, nickname: "지수관찰", holdingLabel: "인덱스 보유", content: "전날 상승분을 하루에 반납하는 건 상승 동력이 국내가 아니라는 뜻이죠.", createdAt: T29 + 1200_000, likes: 7 },
    { id: 3, nickname: "십년차개미", holdingLabel: "인덱스 보유", content: "6800 회복부터 확인하고 움직이려고요.", createdAt: T29 + 1800_000, likes: 5 },
  ],
  9022: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관망", content: "집계 기관에 따라 1조 7564억에서 2조 550억까지 차이가 나던데요.", createdAt: T29 - 1200_000, likes: 8 },
    { id: 2, nickname: "환율보는사람", holdingLabel: "관심종목", content: "환율은 내렸는데 순매도는 늘었으니 원인이 해외에 있다는 신호입니다.", createdAt: T29 - 900_000, likes: 6 },
    { id: 3, nickname: "개인투자", holdingLabel: "인덱스 보유", content: "개인 4244억으로는 1조 7천억을 못 받아냅니다.", createdAt: T29 - 600_000, likes: 4 },
  ],
  9023: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관망", content: "미국 실적이 우리 계약 가격으로 오기까지 시차가 있습니다.", createdAt: T29 - 3000_000, likes: 7 },
    { id: 2, nickname: "메모리사이클", holdingLabel: "관심종목", content: "월간 수출 증가율하고 서버 메모리 계약가 두 개만 보면 됩니다.", createdAt: T29 - 2400_000, likes: 5 },
  ],
  9024: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "시장은 2028년 해소를 봤는데 2030년 말이면 2년 더 긴 겁니다.", createdAt: T29 - 4800_000, likes: 11 },
    { id: 2, nickname: "장비쪽사람", holdingLabel: "관망", content: "인디애나 공장은 2029년 하반기 양산이라 당장 실적은 아니에요.", createdAt: T29 - 4200_000, likes: 6 },
    { id: 3, nickname: "이익률체크", holdingLabel: "하이닉스 보유", content: "증설 구간이면 매출 늘어도 영업이익률은 내려갈 수 있습니다.", createdAt: T29 - 3600_000, likes: 8 },
  ],
  9025: [
    { id: 1, nickname: "금리보는사람", holdingLabel: "관망", content: "금리 오르는 국면에서는 금융이 상대적으로 유리한 게 맞습니다.", createdAt: T29 - 6600_000, likes: 5 },
    { id: 2, nickname: "배당러", holdingLabel: "KB금융 보유", content: "금리만이 아니라 배당·자본 정책 기대도 섞여 있어요.", createdAt: T29 - 6000_000, likes: 4 },
  ],
  9026: [
    { id: 1, nickname: "환율덕후", holdingLabel: "관망", content: "원화 약세는 수출 실적에는 유리하고 외국인에는 불리합니다.", createdAt: T29 - 8400_000, likes: 6 },
    { id: 2, nickname: "수급쟁이", holdingLabel: "관망", content: "환율과 수급이 반대로 가는 날은 해외 요인이 큰 날이죠.", createdAt: T29 - 7800_000, likes: 5 },
  ],
  9027: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "다른 예측시장은 49%로 보고 있어서 아직 확정은 아닙니다.", createdAt: T29 - 10200_000, likes: 7 },
    { id: 2, nickname: "미장러", holdingLabel: "관심종목", content: "9월 초 미국 고용·물가가 확률을 또 흔들 겁니다.", createdAt: T29 - 9600_000, likes: 6 },
    { id: 3, nickname: "환율보는사람", holdingLabel: "관심종목", content: "세 줄 적어두기 좋은 방법이네요. 저도 그렇게 하겠습니다.", createdAt: T29 - 9000_000, likes: 4 },
  ],
  9028: [
    { id: 1, nickname: "중소형주팬", holdingLabel: "코스닥 보유", content: "코스피랑 코스닥이 반대로 마감하는 날은 수급 성격이 강합니다.", createdAt: T29 - 12000_000, likes: 5 },
  ],
  9011: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "7000 터치하고 내려오면 윗꼬리 남는 거라 다음날 변동성 커지기 쉽습니다.", createdAt: T28 + 600_000, likes: 8 },
    { id: 2, nickname: "지수관찰", holdingLabel: "인덱스 보유", content: "잭슨홀 전에는 무리하게 추격 매수 안 하는 게 낫죠.", createdAt: T28 + 1500_000, likes: 6 },
  ],
  9012: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관망", content: "NVDA 급등이 우리 수출로 이어지는지 월간 통계로 확인해야죠.", createdAt: T28 - 1200_000, likes: 5 },
  ],
  9014: [
    { id: 1, nickname: "전력설비", holdingLabel: "관심종목", content: "미국 현지 공장 있는 곳만 버티는 장세일 수 있습니다.", createdAt: T28 - 4800_000, likes: 9 },
  ],
  9015: [
    { id: 1, nickname: "숏커버관찰", holdingLabel: "관망", content: "급등 다음날 -2%는 흔한 패턴 맞습니다.", createdAt: T28 - 6600_000, likes: 10 },
  ],
  9017: [
    { id: 1, nickname: "환율보는사람", holdingLabel: "관심종목", content: "워시 연설 나오면 원달러부터 움직입니다. 같이 보세요.", createdAt: T28 - 10200_000, likes: 7 },
  ],

  9001: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "인상 자체보다 '여기서 멈추나'를 본 것 같아요. 국고채 3년물 방향 같이 보시면 재밌습니다.", createdAt: T27 + 600_000, likes: 9 },
    { id: 2, nickname: "십년차개미", holdingLabel: "인덱스 보유", content: "7,000은 찍는 것보다 그 위에서 사흘 버티는 게 어렵습니다. 저는 그때 판단하려고요.", createdAt: T27 + 1500_000, likes: 7 },
    { id: 3, nickname: "환율보는사람", holdingLabel: "관심종목", content: "환율 같이 안 보면 외국인 순매수 해석이 틀어집니다. 오늘은 그래도 우호적이었네요.", createdAt: T27 + 2400_000, likes: 4 },
  ],
  9002: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관망", content: "월간 반도체 수출 증가율 나오면 그때 기대가 진짜인지 갈릴 겁니다.", createdAt: T27 - 1200_000, likes: 6 },
    { id: 2, nickname: "외국인추적", holdingLabel: "삼성전자 보유", content: "외국인은 들어올 때 삼전부터 삽니다. 순매수 금액만 매일 적어도 흐름 보여요.", createdAt: T27 - 600_000, likes: 5 },
  ],
  9003: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "출하량이랑 평균 판가 둘 다 올라야 이익이 늘죠. 하나만 오르면 반쪽입니다.", createdAt: T27 - 3000_000, likes: 8 },
    { id: 2, nickname: "장비쪽사람", holdingLabel: "관망", content: "고객사 몇 곳에 물량이 몰려 있는 구조라, 한 곳 재고 조정하면 체감이 큽니다.", createdAt: T27 - 2400_000, likes: 5 },
  ],
  9004: [
    { id: 1, nickname: "숏커버관찰", holdingLabel: "관망", content: "저도 같은 생각입니다. 급등 다음 날 흐름 보면 성격이 대충 나옵니다.", createdAt: T27 - 4800_000, likes: 11 },
    { id: 2, nickname: "전기차타는중", holdingLabel: "삼성SDI 보유", content: "결국 미국·유럽 전기차 판매 대수가 살아나야 오래 갑니다. 축하는 드리지만 저는 반은 덜어냈어요.", createdAt: T27 - 4200_000, likes: 8 },
    { id: 3, nickname: "양극재쟁이", holdingLabel: "LG화학 보유", content: "소재까지 같이 올라준 게 진짜 반가운 부분이었습니다.", createdAt: T27 - 3600_000, likes: 6 },
  ],
  9005: [
    { id: 1, nickname: "가동률체크", holdingLabel: "관심종목", content: "공장 가동률 낮으면 고정비가 계속 이익률을 누릅니다. 수주 공시가 먼저예요.", createdAt: T27 - 6600_000, likes: 5 },
  ],
  9006: [
    { id: 1, nickname: "부품사근무", holdingLabel: "관망", content: "현장에서 보면 협력사는 AI 도입할 인력 자체가 없습니다. 교육 지원은 방향은 맞아요.", createdAt: T27 - 8400_000, likes: 12 },
    { id: 2, nickname: "미국판매러", holdingLabel: "현대차 보유", content: "그래도 본체는 미국 판매랑 인센티브죠. 재고 일수 늘면 할인부터 늡니다.", createdAt: T27 - 7800_000, likes: 6 },
  ],
  9007: [
    { id: 1, nickname: "형제주보기", holdingLabel: "기아 보유", content: "두 종목 같이 놓고 보면 확실히 편합니다. 방향은 거의 같이 가니까요.", createdAt: T27 - 10200_000, likes: 4 },
  ],
  9008: [
    { id: 1, nickname: "광고업계", holdingLabel: "관망", content: "광고비는 경기 좋아지면 제일 먼저 늘어나는 예산이라 신호로 쓸 만합니다.", createdAt: T27 - 12000_000, likes: 5 },
  ],
};

export const MOCK_POSTS_SAFE: Post[] = [
  { id: 9125, symbol: "비트코인", nickname: "온체인러", holdingLabel: "관심종목", content: "~78128, 78K 재테스트", createdAt: T31 - 0, likes: 28, comments: 2, },
  { id: 9126, symbol: "금", nickname: "금벌레", holdingLabel: "관심종목", content: "~4635, 실질금리 변수", createdAt: T31 - 1800000, likes: 27, comments: 2, },
  { id: 9127, symbol: "이더리움", nickname: "이더러", holdingLabel: "관심종목", content: "~2459, 2500 선", createdAt: T31 - 3600000, likes: 26, comments: 2, },
  { id: 9128, symbol: "은", nickname: "실물러", holdingLabel: "관심종목", content: "금+산업 수요, Au/Ag ratio", createdAt: T31 - 5400000, likes: 25, comments: 2, },
  { id: 9129, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관심종목", content: "인상 57.5%, BTC·금 같이 재가격", createdAt: T31 - 7200000, likes: 24, comments: 2, },
  { id: 9121, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "자정에 79,623달러였는데 새벽 1시 25분쯤 78,000 깨졌습니다. 워시 발언 이후 청산이 몰렸어요. 24시간 청산 3억 6900만 달러.", createdAt: T29, likes: 41, comments: 3 },
  { id: 9122, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "장중에 100달러 넘게 빠져서 4500 아래로 갔습니다. 24시간 -2.3%. 며칠 올린 걸 하루에 되돌렸네요. 안전자산인데 금리에 이렇게 민감합니다.", createdAt: T29 - 1800_000, likes: 33, comments: 3 },
  { id: 9123, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "2,516달러에서 2500 선 내줬습니다. 비트보다는 덜 빠졌어요. 파생 거래량이 줄어서 새 자금보다 기존 포지션 정리 국면 같습니다.", createdAt: T29 - 3600_000, likes: 21, comments: 2 },
  { id: 9124, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "미국 2년물 4.286%로 7월 말 이후 최고 찍고 장중에 10bp 더 올라 4.33%. 금이랑 비트가 같이 빠진 이유가 여기 있습니다.", createdAt: T29 - 5400_000, likes: 27, comments: 2 },
  { id: 9111, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "78,800달러 부근. 잭슨홀 전이라 솔직히 포지션 줄였어요. 워시 매파 나오면 75k 테스트?", createdAt: T28, likes: 34, comments: 2 },
  { id: 9112, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "30년물 5.31%면 금 숨통 조이는데… 잭슨홀 비둘기 나오면 반등?", createdAt: T28 - 1800_000, likes: 22, comments: 2 },
  { id: 9113, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "BTC랑 같이 관망. 리스크온이면 ETH 베타 더 큼.", createdAt: T28 - 3600_000, likes: 15, comments: 1 },
  { id: 9114, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "30Y 5.31% + 잭슨홀. 오늘 밤 연설 각오하고 있음.", createdAt: T28 - 5400_000, likes: 19, comments: 1 },
  { id: 9115, symbol: "비트코인", nickname: "ETF추적", holdingLabel: "관심", content: "ETF 플로우 꺾이면 BTC 먼저 반응. DXY 같이 켜두세요.", createdAt: T28 - 7200_000, likes: 17, comments: 1 },

  { id: 9101, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "ETF 플로우가 꺾이면 단기 조정이 나와요. 중장기는 여전히 매크로 싸움.", createdAt: T, likes: 30, comments: 2 },
  { id: 9102, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더는 리스크온일 때 비트보다 베타가 큽니다.", createdAt: T - 1800_000, likes: 14, comments: 1 },
  { id: 9103, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "실질금리만 보면 금 방향이 보여요. 달러도 같이 보세요.", createdAt: T - 5400_000, likes: 19, comments: 1 },
  { id: 9104, symbol: "은", nickname: "실버맨", holdingLabel: "관심", content: "은은 금이랑 같이 가다가 산업수요에서 벌어지기도 해요.", createdAt: T - 7200_000, likes: 9, comments: 0 },
  { id: 9105, symbol: "솔라나", nickname: "솔러버", holdingLabel: "SOL 보유", content: "알트 중에서는 베타가 커서 비트 움직일 때 같이 보시면 됩니다.", createdAt: T - 9000_000, likes: 11, comments: 1 },
];

export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {
  9121: [
    { id: 1, nickname: "헷지러", holdingLabel: "금+BTC", content: "청산 8만 7082명이면 레버리지 쓴 사람이 그만큼 많았다는 뜻이죠.", createdAt: T29 + 600_000, likes: 8 },
    { id: 2, nickname: "실질금리", holdingLabel: "관망", content: "이자 없는 자산이라 금리 기대에 먼저 반응합니다.", createdAt: T29 + 1200_000, likes: 6 },
    { id: 3, nickname: "ETF추적", holdingLabel: "관심", content: "현물 ETF 순유입이 이어지면 낙폭은 제한될 겁니다.", createdAt: T29 + 1800_000, likes: 5 },
  ],
  9122: [
    { id: 1, nickname: "실질금리", holdingLabel: "관망", content: "명목금리보다 물가 뺀 실질금리를 보시는 게 맞습니다.", createdAt: T29 - 1200_000, likes: 7 },
    { id: 2, nickname: "금선물러", holdingLabel: "금 ETF", content: "지지선 4530 유지되는지가 다음 확인 지점이죠.", createdAt: T29 - 900_000, likes: 5 },
    { id: 3, nickname: "달러보기", holdingLabel: "관망", content: "달러가 강해지면 다른 통화 기준 금값이 올라 수요가 줍니다.", createdAt: T29 - 600_000, likes: 4 },
  ],
  9123: [
    { id: 1, nickname: "온체인러", holdingLabel: "BTC 보유", content: "이더 점유율은 올라갔던데 상대적으로 버틴 셈입니다.", createdAt: T29 - 3000_000, likes: 4 },
  ],
  9124: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관망", content: "단기 금리가 튀면 이자 없는 자산부터 눌립니다.", createdAt: T29 - 4800_000, likes: 6 },
    { id: 2, nickname: "미장러", holdingLabel: "관심", content: "9월 초 물가 지표가 방향을 다시 정할 겁니다.", createdAt: T29 - 4200_000, likes: 5 },
  ],
  9111: [
    { id: 1, nickname: "헷지러", holdingLabel: "금+BTC", content: "잭슨홀 전엔 레버리지 줄이는 게 맞죠.", createdAt: T28 + 900_000, likes: 6 },
  ],
  9112: [
    { id: 1, nickname: "실질금리", holdingLabel: "관망", content: "5.31% 30Y면 금 압박 맞습니다.", createdAt: T28 - 1200_000, likes: 5 },
  ],

  9101: [
    { id: 1, nickname: "헷지러", holdingLabel: "금+BTC", content: "금이랑 같이 가는 날은 매크로 헤지 수요입니다.", createdAt: T + 900_000, likes: 4 },
  ],
};

export const MOCK_POSTS_KR_RE: Post[] = [
  { id: 9225, symbol: "서울매매", nickname: "실수요자", holdingLabel: "관심", content: "서울 +0.29%, 강남 -0.11% 3주", createdAt: T31 - 0, likes: 26, comments: 2, },
  { id: 9226, symbol: "강남", nickname: "강남권", holdingLabel: "관심", content: "세제 부담 급매", createdAt: T31 - 2400000, likes: 25, comments: 2, },
  { id: 9227, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "전세 +0.22%", createdAt: T31 - 4800000, likes: 24, comments: 2, },
  { id: 9228, symbol: "중랑", nickname: "외곽거주", holdingLabel: "관심", content: "중랑 +0.56%", createdAt: T31 - 7200000, likes: 23, comments: 2, },
  { id: 9221, symbol: "서울매매", nickname: "실수요자", holdingLabel: "관망", content: "서울 아파트 0.29% 상승. 전주 0.22%보다 커졌고 6주 만에 최대 폭이네요. 그런데 오른 곳은 강남이 아니라 중랑·성북·강북입니다.", createdAt: T29, likes: 32, comments: 3 },
  { id: 9222, symbol: "강남", nickname: "강남권", holdingLabel: "자가", content: "강남 -0.11%, 서초 -0.05%로 3주 연속 하락. 강남은 낙폭이 더 커졌습니다. 세제개편 부담에 급매물이 나온 영향이라는 해석이 많네요.", createdAt: T29 - 2400_000, likes: 29, comments: 3 },
  { id: 9223, symbol: "전세", nickname: "전세러", holdingLabel: "전세", content: "서울 전세 0.22%, 전주 0.19%에서 커졌습니다. 매매 강한 지역에서 전세도 같이 오르는 구조예요. 전세 물건 자체가 줄어든 것도 있고요.", createdAt: T29 - 4800_000, likes: 26, comments: 2 },
  { id: 9224, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "전월세 안심신탁 9월 말 공고, 10월 신청, 12월 입주. 전세금을 공적 기관이 맡고 집주인은 운용수익을 월세처럼 받는 구조. 예상 수익률 4~5%입니다.", createdAt: T29 - 7200_000, likes: 24, comments: 3 },
  { id: 9211, symbol: "금리", nickname: "대출걱정", holdingLabel: "전세", content: "한은 3% 올렸는데… 전세대출 금리 얼마나 더 오를지. 매매는 더 망설여짐.", createdAt: T28, likes: 28, comments: 2 },
  { id: 9212, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 발표는 심리만 움직이고 착공은 늦어요. 또 그 패턴.", createdAt: T28 - 2400_000, likes: 18, comments: 1 },
  { id: 9213, symbol: "전세", nickname: "전세러", holdingLabel: "전세", content: "전세 매물 줄면 보증금부터 오릅니다. 근데 3%면 대출 한도가 막혀요.", createdAt: T28 - 4800_000, likes: 21, comments: 2 },
  { id: 9214, symbol: "서울매매", nickname: "실수요자", holdingLabel: "관망", content: "코스피 7000 재시도해도 부동산은 별개. DSR 걸리면 실행 안 됨.", createdAt: T28 - 7200_000, likes: 16, comments: 1 },

  { id: 9201, symbol: "서울매매", nickname: "실수요자", holdingLabel: "전세", content: "전세가 오르니까 매수 고민이 커지는데, DSR이 막혀서 실행이 안 됩니다.", createdAt: T, likes: 22, comments: 2 },
  { id: 9202, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 발표는 심리부터 움직입니다. 실제 착공까지는 시차가 길어요.", createdAt: T - 2400_000, likes: 16, comments: 1 },
  { id: 9203, symbol: "전세", nickname: "전세러", holdingLabel: "전세", content: "매물 줄면 보증금부터 움직입니다. 대출 한도가 실행을 가릅니다.", createdAt: T - 3600_000, likes: 12, comments: 1 },
  { id: 9204, symbol: "강남", nickname: "강남권", holdingLabel: "자가", content: "선호지랑 비선호지 온도 차가 더 벌어지는 느낌입니다.", createdAt: T - 4800_000, likes: 9, comments: 0 },
];

export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {
  9221: [
    { id: 1, nickname: "통계보는사람", holdingLabel: "관망", content: "성북·강북·종로는 14년 3개월 만에 최고 주간 상승률이라던데요.", createdAt: T29 + 600_000, likes: 8 },
    { id: 2, nickname: "외곽거주", holdingLabel: "자가", content: "강남이 눌린 만큼 외곽이 키 맞추기 하는 흐름으로 보입니다.", createdAt: T29 + 1200_000, likes: 6 },
    { id: 3, nickname: "실수요준비", holdingLabel: "전세", content: "서울 평균만 보면 이 차이를 놓치게 되네요.", createdAt: T29 + 1800_000, likes: 4 },
  ],
  9222: [
    { id: 1, nickname: "세제확인", holdingLabel: "관망", content: "동남권 상승률이 0.03%까지 내려온 게 더 눈에 띕니다.", createdAt: T29 - 1800_000, likes: 7 },
    { id: 2, nickname: "송파주민", holdingLabel: "자가", content: "송파는 하락 전환은 아닌데 상승세가 계속 둔화되고 있어요.", createdAt: T29 - 1200_000, likes: 5 },
    { id: 3, nickname: "급매관찰", holdingLabel: "관심", content: "대기 매수세가 급락을 막는지가 관건이겠네요.", createdAt: T29 - 600_000, likes: 4 },
  ],
  9223: [
    { id: 1, nickname: "월세전환", holdingLabel: "관심", content: "전세 물건이 줄어서 오르는 부분과 수요로 오르는 부분을 나눠 봐야죠.", createdAt: T29 - 4200_000, likes: 6 },
    { id: 2, nickname: "대출상담", holdingLabel: "관망", content: "보증금 오르면 전세대출 이자 부담도 같이 늘어납니다.", createdAt: T29 - 3600_000, likes: 5 },
  ],
  9224: [
    { id: 1, nickname: "임대인입장", holdingLabel: "자가", content: "제시 수익률이 시장 월세 수익률보다 낮으면 참여 안 하겠죠.", createdAt: T29 - 6600_000, likes: 7 },
    { id: 2, nickname: "전세대출", holdingLabel: "전세", content: "시세 20억 이하 우선이라 대상이 꽤 넓긴 합니다.", createdAt: T29 - 6000_000, likes: 5 },
    { id: 3, nickname: "정책관찰", holdingLabel: "관심", content: "올해 시범이 500호라 가격 영향은 제한적일 겁니다.", createdAt: T29 - 5400_000, likes: 4 },
  ],
  9211: [
    { id: 1, nickname: "전세대출", holdingLabel: "관망", content: "3%면 갈아타는 사람 이자 부담 커집니다.", createdAt: T28 + 700_000, likes: 4 },
  ],
  9213: [
    { id: 1, nickname: "월세전환", holdingLabel: "관심", content: "전세→월세로 가는 수요도 늘 수 있어요.", createdAt: T28 - 4200_000, likes: 5 },
  ],

  9201: [
    { id: 1, nickname: "대출상담", holdingLabel: "관망", content: "전세대출 한도가 관건이죠.", createdAt: T + 700_000, likes: 3 },
  ],
};
