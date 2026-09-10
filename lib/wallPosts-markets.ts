import type { Post, Comment } from "@/lib/wallPosts";

const T = 1787698800000; // 2026-08-26 08:00 KST
const T11 = 1789081200000; // 2026-09-11 08:00 KST
const T10 = 1788994800000; // 2026-09-10 08:00 KST
const T09 = 1788908400000; // 2026-09-09 08:00 KST
const T08 = 1788822000000; // 2026-09-08 08:00 KST
const T07 = 1788735600000; // 2026-09-07 08:00 KST
const T04 = 1788476400000; // 2026-09-04 08:00 KST
const T03 = 1788390000000; // 2026-09-03 08:00 KST
const T02 = 1788303600000; // 2026-09-02 08:00 KST
const T01 = 1788217200000; // 2026-09-01 08:00 KST
const T31 = 1788130800000; // 2026-08-31 08:00 KST
const T29 = 1787958000000; // 2026-08-29 08:00 KST
const T28 = 1787871600000; // 2026-08-28 08:00 KST
const T27 = 1787785200000; // 2026-08-27 08:00 KST

/** 한국 종토방 — 심볼 자리에 종목명(한글) 사용 */
export const MOCK_POSTS_KR: Post[] = [
  { id: 9099, symbol: "코스피", nickname: "칠천피사수", holdingLabel: "인덱스 보유", content: "어제 7033.92(−0.25%)에 저점 6898. 종가 7000은 지킴. 외인 −2.48조랑 등락을 한 셀에 넣지 마", createdAt: T11 - 0, likes: 44, comments: 2, },
  { id: 9100, symbol: "코스피", nickname: "네마녀수급", holdingLabel: "관심종목", content: "선물옵션 만기+리밸런싱. 기타법인 +1.67조는 자사주 칸. 기관 6일 연속 매수", createdAt: T11 - 1800000, likes: 43, comments: 2, },
  { id: 9101, symbol: "삼성전자", nickname: "이십육만구천", holdingLabel: "삼성전자 보유", content: "269000(−0.19%). 장중 263500 되돌림. 외인 −1.41조·기관 +1.01조", createdAt: T11 - 3600000, likes: 42, comments: 2, },
  { id: 9102, symbol: "SK하이닉스", nickname: "백팔십오만삼", holdingLabel: "하이닉스 보유", content: "1853000(−0.16%)에 저점 1811000. 외인 −1.78조. 리밸런싱이랑 종가 분리", createdAt: T11 - 5400000, likes: 41, comments: 2, },
  { id: 9103, symbol: "LG에너지솔루션", nickname: "엔솔일점육", holdingLabel: "관심종목", content: "365000(−1.62%). 전날 +6.46% 다음날. 유가 101이 원가 줄", createdAt: T11 - 7200000, likes: 40, comments: 2, },
  { id: 9104, symbol: "삼성바이오로직스", nickname: "삼바이퍼", holdingLabel: "관심종목", content: "1423000(−2.00%). 제약 베타. 반도체 외인 매도 연장으로 안 읽음", createdAt: T11 - 9000000, likes: 39, comments: 2, },
  { id: 9105, symbol: "현대차", nickname: "완성차영점이", holdingLabel: "현대차 관심", content: "+0.26%면 지수·엔솔이랑 온도 다름. 유가 101·금리 4.92%가 할부 줄", createdAt: T11 - 10800000, likes: 38, comments: 2, },
  { id: 9092, symbol: "코스피", nickname: "칠천피재돌파", holdingLabel: "인덱스 보유", content: "어제 7051(+1.40%)에 고점 7112. 33거래일 만에 종가 7000 위. 개인 −2.5조·기관 +9005억을 등락이랑 한 셀에 넣지 마", createdAt: T10 - 0, likes: 44, comments: 2, },
  { id: 9093, symbol: "코스피", nickname: "수급오일치", holdingLabel: "관심종목", content: "기관 5거래일 연속 매수인데 외인은 −1702억. 코스닥은 외인 +2980억이라 시장이 갈림", createdAt: T10 - 1800000, likes: 43, comments: 2, },
  { id: 9094, symbol: "삼성전자", nickname: "이십칠만보합", holdingLabel: "삼성전자 보유", content: "269500 보합. 장중 275000 반납. 하이닉스 +3.51%랑 온도 다름", createdAt: T10 - 3600000, likes: 42, comments: 2, },
  { id: 9095, symbol: "SK하이닉스", nickname: "백팔십오만", holdingLabel: "하이닉스 보유", content: "1856000(+3.51%)에 장중 1883000. 반도체 지수 +2.88%랑 같이 보되 종가만 추격 금지", createdAt: T10 - 5400000, likes: 41, comments: 2, },
  { id: 9096, symbol: "LG에너지솔루션", nickname: "엔솔육퍼", holdingLabel: "관심종목", content: "371000(+6.46%)면 중국 배터리 규제 스필오버+ESS 쪽. 수주랑 베타 분리", createdAt: T10 - 7200000, likes: 40, comments: 2, },
  { id: 9097, symbol: "삼성전기", nickname: "전장전기체크", holdingLabel: "관심종목", content: "1404000(+2.48%). 패키지·전장 축. 삼성전자 보합이랑 한 줄로 안 묶음", createdAt: T10 - 9000000, likes: 39, comments: 2, },
  { id: 9098, symbol: "현대차", nickname: "완성차영점칠", holdingLabel: "현대차 관심", content: "+0.78%면 지수·엔솔보다 작음. 유가 101·금리 4.83%가 할부 줄", createdAt: T10 - 10800000, likes: 38, comments: 2, },
  { id: 9086, symbol: "코스피", nickname: "칠천되돌림", holdingLabel: "인덱스 보유", content: "어제 7171까지 찍고 6954로 마감… 고점 대비 되돌림이 핵심이지 −0.58%만 보면 놓침", createdAt: T09 - 0, likes: 44, comments: 2, },
  { id: 9087, symbol: "삼성전자", nickname: "이십칠만방어", holdingLabel: "삼성전자 보유", content: "276500 넘었다가 269500. 리밸런싱 0.2조 추정은 수급 칸, 테일러는 중기 칸", createdAt: T09 - 1800000, likes: 43, comments: 2, },
  { id: 9088, symbol: "SK하이닉스", nickname: "리밸런싱경계", holdingLabel: "하이닉스 보유", content: "+0.56%인데 리밸런싱 1.2조대 매도 추정 겹침. 종가 강세랑 섞지 말자", createdAt: T09 - 3600000, likes: 42, comments: 2, },
  { id: 9089, symbol: "LG에너지솔루션", nickname: "엔솔급락체크", holdingLabel: "관심종목", content: "−3.86%면 반도체보다 세게 맞음. 유가·금리 체인으로만 일단 분류", createdAt: T09 - 5400000, likes: 41, comments: 2, },
  { id: 9090, symbol: "현대차", nickname: "완성차베타", holdingLabel: "현대차 관심", content: "약 −2%면 유가·할부 수요 쪽. 모빌리티 뉴스는 중기에만", createdAt: T09 - 7200000, likes: 40, comments: 2, },
  { id: 9091, symbol: "KB금융", nickname: "금리은행줄", holdingLabel: "KB금융 관심", content: "미 10년 4.8% 서사에 은행 −1%대. NIM이랑 연체 한 화면에", createdAt: T09 - 9000000, likes: 39, comments: 2, },
  { id: 9080, symbol: "코스피", nickname: "칠천피돌파러", holdingLabel: "인덱스 보유", content: "어제 6995 찍고 +4.61%… 7000 직전인데 외인이 삼전·하이닉스에만 몰린 느낌이라 지수=전업종 강세로 안 읽어요", createdAt: T08 - 0, likes: 42, comments: 2, },
  { id: 9081, symbol: "삼성전자", nickname: "반도체수급러", holdingLabel: "삼성전자 보유", content: "27만 +5.68%에 외인 8800억대면 수급은 세긴 한데, 목표가 40만은 의견이라 종가랑 칸을 나눔", createdAt: T08 - 1800000, likes: 41, comments: 2, },
  { id: 9082, symbol: "SK하이닉스", nickname: "HBM베타", holdingLabel: "하이닉스 보유", content: "178만 +8%대면 베타가 지수보다 훨씬 큼. 1.37조 외인만 보고 추격하진 않을게요", createdAt: T08 - 3600000, likes: 40, comments: 2, },
  { id: 9083, symbol: "현대차", nickname: "완성차체크", holdingLabel: "현대차 관심", content: "반도체 불꽃인데 현대는 +2.48%만. 환율·유가 표 따로 두고 봄", createdAt: T08 - 5400000, likes: 39, comments: 2, },
  { id: 9084, symbol: "KB금융", nickname: "금융동행러", holdingLabel: "KB금융 관심", content: "어제는 −3%대였는데 오늘은 +2%대. 금리 민감은 여전해서 FOMC 전엔 추격 패스", createdAt: T08 - 7200000, likes: 38, comments: 2, },
  { id: 9085, symbol: "삼성바이오로직스", nickname: "바이오동행", holdingLabel: "삼바 관심", content: "삼바 +1.31%는 따라가되 덜 감. 수주 공시 없으면 비중 안 키움", createdAt: T08 - 9000000, likes: 37, comments: 2, },
  { id: 9070, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "금요일 6687 찍고 주말 넘겼는데, 이번 주는 물가·옵션만기·FOMC가 한 주에 몰려요. 자사주 방패만 믿고 추격하진 않을게요", createdAt: T07 - 0, likes: 40, comments: 2, },
  { id: 9071, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "자사주가 기타법인으로 잡히니까 수급이 예뻐 보이는데, 남은 물량이 줄면 하단이 얇아질 수 있어서 진행률만 따로 적어요", createdAt: T07 - 1800000, likes: 39, comments: 2, },
  { id: 9072, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "ADR이 밤에 세게 올랐다는 이야기랑 현물 164만 선을 같은 표에 두면 착시가 나요. 축을 나눠야", createdAt: T07 - 3600000, likes: 38, comments: 2, },
  { id: 9073, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "금요일엔 배터리만 처진 느낌이었어요. 반도체 강세랑 디커플이면 추격 근거가 약함", createdAt: T07 - 5400000, likes: 37, comments: 2, },
  { id: 9074, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "보합으로 숨 고른 날. 오만 수소버스 뉴스는 모멘텀이지 당기 실적은 아니라서 워치만", createdAt: T07 - 7200000, likes: 36, comments: 2, },
  { id: 9075, symbol: "KB금융", nickname: "은행주러", holdingLabel: "KB금융 관심", content: "금융주가 하루 크게 조이면 금리 민감도 재확인. 이번주 물가 나오기 전엔 비중 추가 안 함", createdAt: T07 - 9000000, likes: 35, comments: 2, },
  { id: 9060, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "종가는 강보합인데 장중엔 롤러코스터였어요. 기타법인이 받친 자리라 외국인 복귀로 착각하면 다음날 당합니다", createdAt: T04 - 0, likes: 40, comments: 2, },
  { id: 9061, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "지수는 올랐는데 삼전만 따로 간 느낌. 자사주가 기타법인으로 잡히니까 수급이 좋아 보이는 착시가 있음", createdAt: T04 - 1800000, likes: 39, comments: 2, },
  { id: 9062, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "소각 매입 있어도 오후 급락 때 더 빠지더라고요. 환원 호재로 당일 베타를 막아주진 못함", createdAt: T04 - 3600000, likes: 38, comments: 2, },
  { id: 9063, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "공시 없이 ESS·태양광 이야기로만 튀었네요. 목표가 이야기만으로 따라가긴 이릅니다", createdAt: T04 - 5400000, likes: 37, comments: 2, },
  { id: 9064, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "환율은 좋은데 유가 91달러는 부담. 완성차 되돌림인지 하루짜리인지 아직 모름", createdAt: T04 - 7200000, likes: 36, comments: 2, },
  { id: 9065, symbol: "KB금융", nickname: "은행주러", holdingLabel: "KB금융 관심", content: "금리 수혜로 돌긴 돌았는데 고용 한 방에 뒤집힐 수 있어서 추격은 안 함. 비중 작게만", createdAt: T04 - 9000000, likes: 35, comments: 2, },
  { id: 9054, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "6562.72 -3.99% 급락. WTI $91+·10년 4.8%·외국인 1.9~2.4조 매도가 겹친 shock 날이에요", createdAt: T03 - 0, likes: 40, comments: 2, },
  { id: 9055, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "250,500원 -4.02%. 유가·금리 shock에 반도체가 같이 빠졌어요. 수급보다 매크로가 먼저인 날", createdAt: T03 - 1800000, likes: 32, comments: 2, },
  { id: 9056, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "161.3만원 -4.73%. 성장주 베타에 외국인 대량 매도가 겹쳤습니다", createdAt: T03 - 3600000, likes: 30, comments: 2, },
  { id: 9057, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "-5.31%로 2차전지가 크게 약세. 유가·금리·성장주 약세가 한꺼번에", createdAt: T03 - 5400000, likes: 28, comments: 2, },
  { id: 9058, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "-5.62%. WTI $91+ shock에 완성차도 약세. 오늘 밤 사이버캡 행사는 별도 변수", createdAt: T03 - 7200000, likes: 27, comments: 2, },
  { id: 9059, symbol: "코스피", nickname: "외국인추적", holdingLabel: "관망", content: "외국인 1.9~2.4조·기관 2.43조 매도 vs 개인 2.3조 매수. shock 다음 날 수급이 더 중요해요", createdAt: T03 - 9000000, likes: 26, comments: 2, },
  { id: 9048, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "인덱스 보유", content: "6,875 +0.9%로 9/1 6,812 대비 수급이 살아났어요. 외국인 412억→890억 전환은 체감 큽니다. 다만 기관·개인이 역방향이면 지수만 오르는 날일 수 있어요.", createdAt: T02 - 0, likes: 38, comments: 2, },
  { id: 9049, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "삼전 +1.8%는 코스피 +0.9%보다 두 배 빠르게 움직였습니다. HBM 테마 맞는데 사이버캡 D-1 전이라 내일 변동성 각오 중이에요.", createdAt: T02 - 1800000, likes: 31, comments: 2, },
  { id: 9050, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "하이닉스 +1.6%. 삼전 +1.8%랑 같이 올랐는데 외국인 890억이 업종 전체에 퍼진 건지 종목별 순매수는 따로 봐야 합니다.", createdAt: T02 - 3600000, likes: 29, comments: 2, },
  { id: 9051, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "사이버캡 45대·지오펜스 확대 뉴스에 완성차도 같이 움직였어요. 국내 실적보다 글로벌 로보택시 심리가 먼저인 날입니다.", createdAt: T02 - 5400000, likes: 27, comments: 2, },
  { id: 9052, symbol: "코스피", nickname: "외국인추적", holdingLabel: "관망", content: "외국인 890억 순매수인데 환율은 1,366.5원으로 원화 강세예요. 둘이 같이 오면 우호적이지만 하루만으로 추세라고 보긴 어렵습니다.", createdAt: T02 - 7200000, likes: 26, comments: 2, },
  { id: 9053, symbol: "환율", nickname: "환율보는사람", holdingLabel: "관심종목", content: "1,369.2→1,366.5원, 약 2.7원 강세. 수출주는 환율만 보고 판단하면 틀리기 쉬워서 그날 외국인 수급을 같이 적어두려고요.", createdAt: T02 - 9000000, likes: 24, comments: 2, },
  { id: 9036, symbol: "코스피", nickname: "칠천피존버", holdingLabel: "관심종목", content: "6812.44 +0.35% · 외국인 412억 순매수 · SemiCon·FOMC", createdAt: T01 - 0, likes: 30, comments: 2, },
  { id: 9037, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "관심종목", content: "HBM 70%·HBM3E 5× · +0.82%", createdAt: T01 - 1800000, likes: 29, comments: 2, },
  { id: 9038, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "관심종목", content: "+1.12% · HBM 품귀 전망", createdAt: T01 - 3600000, likes: 28, comments: 2, },
  { id: 9039, symbol: "LG에너지솔루션", nickname: "배터리존버", holdingLabel: "관심종목", content: "+0.55% · 2차전지 지수 받침", createdAt: T01 - 5400000, likes: 27, comments: 2, },
  { id: 9040, symbol: "기아", nickname: "자동차매니아", holdingLabel: "관심종목", content: "+0.91% · 로보택시 314대 글로벌", createdAt: T01 - 7200000, likes: 26, comments: 2, },
  { id: 9041, symbol: "NAVER", nickname: "플랫폼러", holdingLabel: "관심종목", content: "-0.34% · 플랫폼 약세", createdAt: T01 - 9000000, likes: 25, comments: 2, },
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
  9099: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "외인 2.48조는 이벤트 수급 칸이에요", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "칠천피사수", holdingLabel: "인덱스 보유", content: "저점 6898 되돌림을 종가랑 같이 적죠", createdAt: T11 + 1200000, likes: 4 },
  ],
  9100: [
    { id: 1, nickname: "기관육일", holdingLabel: "관심종목", content: "6일 연속이 전환인지는 다음 주 확인", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "자사주방파", holdingLabel: "관심종목", content: "기타법인 1.67조를 추세 매수로 읽지 마", createdAt: T11 + 1200000, likes: 4 },
  ],
  9101: [
    { id: 1, nickname: "이십육만구천", holdingLabel: "삼성전자 보유", content: "장중 저가 반납은 수급이지 펀더 아님", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "메모리비교", holdingLabel: "관심종목", content: "하이닉스 −0.16%랑 온도만 옆에 둠", createdAt: T11 + 1200000, likes: 4 },
  ],
  9102: [
    { id: 1, nickname: "백팔십오만삼", holdingLabel: "하이닉스 보유", content: "장중 181.1만이 지지인지는 내일 확인", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "리밸런싱줄", holdingLabel: "관심종목", content: "지수 변경 매물이랑 종가 약보합 분리", createdAt: T11 + 1200000, likes: 4 },
  ],
  9103: [
    { id: 1, nickname: "엔솔일점육", holdingLabel: "관심종목", content: "전날 급등 되돌림이랑 유가 칸을 두 줄로", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "원가줄체크", holdingLabel: "관심종목", content: "브렌트 101이 원가 칸에 먼저", createdAt: T11 + 1200000, likes: 4 },
  ],
  9104: [
    { id: 1, nickname: "삼바이퍼", holdingLabel: "관심종목", content: "수주 없으면 하루 베타로만 태그", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "제약갈림", holdingLabel: "관심종목", content: "의료정밀 상승이랑 바이오 낙폭이 업종 안에서도 갈림", createdAt: T11 + 1200000, likes: 4 },
  ],
  9105: [
    { id: 1, nickname: "완성차영점이", holdingLabel: "현대차 관심", content: "판매·인센티브 전엔 상대 성과만 적음", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "할부금리줄", holdingLabel: "관심종목", content: "10년 4.92%면 완성차 레버리지 줄임", createdAt: T11 + 1200000, likes: 4 },
  ],
  9092: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "개인 2.5조 매도는 이벤트 수급 칸이에요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "칠천피재돌파", holdingLabel: "인덱스 보유", content: "고점 7112 반납을 종가랑 같이 적죠", createdAt: T10 + 1200000, likes: 4 },
  ],
  9093: [
    { id: 1, nickname: "기관오일", holdingLabel: "관심종목", content: "5일 연속이 전환인지는 다음 주 확인", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "외인갈림", holdingLabel: "관심종목", content: "코스피 외인 매도·코스닥 외인 매수를 한 문장 금지", createdAt: T10 + 1200000, likes: 4 },
  ],
  9094: [
    { id: 1, nickname: "이십칠만보합", holdingLabel: "삼성전자 보유", content: "장중 고가 반납은 수급이지 펀더 아님", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "메모리비교", holdingLabel: "관심종목", content: "하이닉스 상대 성과만 옆에 둠", createdAt: T10 + 1200000, likes: 4 },
  ],
  9095: [
    { id: 1, nickname: "백팔십오만", holdingLabel: "하이닉스 보유", content: "장중 188.3만이 저항인지 내일 확인", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "반도체베타", holdingLabel: "관심종목", content: "KRX 반도체 +2.88%랑 종목 베타 분리", createdAt: T10 + 1200000, likes: 4 },
  ],
  9096: [
    { id: 1, nickname: "엔솔육퍼", holdingLabel: "관심종목", content: "규제 헤드라인이랑 ESS 수요를 두 줄로", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "원가줄체크", holdingLabel: "관심종목", content: "유가 100달러권이 원가 칸에 먼저", createdAt: T10 + 1200000, likes: 4 },
  ],
  9097: [
    { id: 1, nickname: "전장전기체크", holdingLabel: "관심종목", content: "기판·카메라 믹스가 안 나오면 추격 패스", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "패키지축", holdingLabel: "관심종목", content: "삼성전자 보합과 전기 강세를 섞지 마", createdAt: T10 + 1200000, likes: 4 },
  ],
  9098: [
    { id: 1, nickname: "완성차영점칠", holdingLabel: "현대차 관심", content: "판매·인센티브 전엔 상대 성과만 적음", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "할부금리줄", holdingLabel: "관심종목", content: "10년 4.83%면 완성차 레버리지 줄임", createdAt: T10 + 1200000, likes: 4 },
  ],
  9086: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "개인 매도·외인 매수를 지수 등락이랑 한 셀에 넣지 마세요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "칠천되돌림", holdingLabel: "인덱스 보유", content: "7000 회복은 종가+유가 안정일 때만", createdAt: T09 + 1200000, likes: 4 },
  ],
  9087: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "장중 고가랑 종가 칸을 나눔", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "이십칠만방어", holdingLabel: "삼성전자 보유", content: "리밸런싱 11일 적용 전후 수급만 체크", createdAt: T09 + 1200000, likes: 4 },
  ],
  9088: [
    { id: 1, nickname: "리밸런싱경계", holdingLabel: "하이닉스 보유", content: "비중 상한 매도는 이벤트 수급이에요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "장비유입러", holdingLabel: "관심종목", content: "한미·주성 상대 성과도 옆에", createdAt: T09 + 1200000, likes: 4 },
  ],
  9089: [
    { id: 1, nickname: "엔솔급락체크", holdingLabel: "관심종목", content: "배터리 수주랑 업종 베타 분리", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "유가보는사람", holdingLabel: "관심종목", content: "브렌트 98 근처면 원가 줄이 먼저", createdAt: T09 + 1200000, likes: 4 },
  ],
  9090: [
    { id: 1, nickname: "완성차베타", holdingLabel: "현대차 관심", content: "판매·인센티브 숫자 나오기 전엔 관망", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "할부수요체크", holdingLabel: "관심종목", content: "금리 급등 구간 추격 패스", createdAt: T09 + 1200000, likes: 4 },
  ],
  9091: [
    { id: 1, nickname: "금리은행줄", holdingLabel: "KB금융 관심", content: "NIM 기대와 주가 급락은 시계가 다름", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "연체표러", holdingLabel: "관심종목", content: "회의 전 은행 레버리지 줄임", createdAt: T09 + 1200000, likes: 4 },
  ],
  9080: [
    { id: 1, nickname: "수급표작성", holdingLabel: "관망", content: "종목별 외인이랑 지수 등락을 한 셀에 넣지 마세요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "칠천피돌파러", holdingLabel: "인덱스 보유", content: "7000 종가+외인 지속일 때만 안착으로 적을게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9081: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "목표가 상향은 컨센서스 칸, 체결은 수급 칸", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "반도체수급러", holdingLabel: "삼성전자 보유", content: "하이닉스랑 상대 성과만 표에 남겨둘게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9082: [
    { id: 1, nickname: "HBM베타", holdingLabel: "하이닉스 보유", content: "고베라는 물가·FOMC에 먼저 흔들려요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "외인추적", holdingLabel: "관심종목", content: "1.37조가 이틀 이어지는지가 관건", createdAt: T08 + 1200000, likes: 4 },
  ],
  9083: [
    { id: 1, nickname: "완성차체크", holdingLabel: "현대차 관심", content: "원달러 1340 근처면 채산성 해석이 갈려요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "유가보는사람", holdingLabel: "관심종목", content: "반도체 베타랑 자동차 수요는 시계가 다름", createdAt: T08 + 1200000, likes: 4 },
  ],
  9084: [
    { id: 1, nickname: "금리표러", holdingLabel: "관심종목", content: "NIM이랑 연체를 한 화면에 둬야 착시가 줄어요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "금융동행러", holdingLabel: "KB금융 관심", content: "위험온 날 은행 추격은 사이즈 작게", createdAt: T08 + 1200000, likes: 4 },
  ],
  9085: [
    { id: 1, nickname: "바이오동행", holdingLabel: "삼바 관심", content: "시총 상위 동행이지 수주 증명 아님", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "공시 나오기 전엔 관망이 맞음", createdAt: T08 + 1200000, likes: 4 },
  ],
  9070: [
    { id: 1, nickname: "외국인추적", holdingLabel: "관망", content: "옵션만기 주는 선물이 현물을 흔들 수 있어서 종가만 보면 안 돼요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "수급쟁이", holdingLabel: "관심종목", content: "기타법인=자사주 비중부터 빼고 외국인을 봐야죠", createdAt: T07 + 1200000, likes: 4 },
  ],
  9071: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "자사주 소진 속도가 예상보다 빠르다는 보도도 있어서 종료 시점을 적어둘게요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "지수랑 1위가 같이 간 날은 그래도 수급 착시가 덜해요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9072: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "ADR 갭은 시차로 메워질 수 있어서 개장 초만 보고 단정 안 함", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "소각은 중기, 오늘 베타는 단기. 둘 다 표에", createdAt: T07 + 1200000, likes: 4 },
  ],
  9073: [
    { id: 1, nickname: "이차전지", holdingLabel: "관심종목", content: "업종 대비 더 빠진 건지부터 확인해야", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "배터리존버", holdingLabel: "LG엔솔 관심", content: "수주 공시 없으면 반등 추격은 패스", createdAt: T07 + 1200000, likes: 4 },
  ],
  9074: [
    { id: 1, nickname: "수출통계러", holdingLabel: "관심종목", content: "모빌리티 해외 뉴스는 테마로만 분류할게요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "환율·유가 둘 다 표에 두고 주초 흐름 볼게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9075: [
    { id: 1, nickname: "금리보는사람", holdingLabel: "관심종목", content: "물가 서프라이즈면 금융 로테이션이 하루 만에 뒤집혀요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "은행주러", holdingLabel: "KB금융 관심", content: "연체·마진도 같이 봐야 금리 수혜죠", createdAt: T07 + 1200000, likes: 4 },
  ],
  9060: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관심종목", content: "기타법인 12일 연속이면 자사주부터 빼서 봐야죠", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "장중폭", holdingLabel: "관심종목", content: "243포인트면 종가 매매는 비추", createdAt: T04 + 1199000, likes: 4 },
  ],
  9061: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "공시랑 외국인 순매도를 한 칸에 넣지 마세요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "25만 원 지지는 고용 전후로 다시 볼게요", createdAt: T04 + 1199000, likes: 4 },
  ],
  9062: [
    { id: 1, nickname: "베타주의", holdingLabel: "관심종목", content: "중기 소각이랑 오늘 낙폭은 다른 이야기", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "ASP대기", holdingLabel: "관심종목", content: "분기 숫자 전엔 추격 안 해요", createdAt: T04 + 1199000, likes: 4 },
  ],
  9063: [
    { id: 1, nickname: "공시대기", holdingLabel: "관심종목", content: "수주 나오기 전엔 관망이 맞아요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "이차전지", holdingLabel: "관심종목", content: "5%대 공시 없는 날엔 추격 금지", createdAt: T04 + 1199000, likes: 4 },
  ],
  9064: [
    { id: 1, nickname: "환율유가", holdingLabel: "관심종목", content: "둘이 반대로 당기면 해석이 갈려요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "축분리", holdingLabel: "관심종목", content: "사이버캡이랑 내수는 따로 적을게요", createdAt: T04 + 1199000, likes: 4 },
  ],
  9065: [
    { id: 1, nickname: "금리보는사람", holdingLabel: "관심종목", content: "발표 끝나고 다시 볼게요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "연체라인", holdingLabel: "관심종목", content: "수혜 프레임이면 연체도 같이 봐야죠", createdAt: T04 + 1199000, likes: 4 },
  ],
  9054: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관심종목", content: "-3.99%면 shock 맞습니다. 내일 외국인 이어지는지 봐야죠", createdAt: T03 + 600_000, likes: 5 },
    { id: 2, nickname: "유가체크", holdingLabel: "관심종목", content: "WTI $91+가 코스피에 바로 전달됐네요", createdAt: T03 + 1200_000, likes: 4 },
  ],
  9055: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "매크로 shock 때는 HBM 테마도 잠깐 뒤로 밀리죠", createdAt: T03 - 1200_000, likes: 5 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "250,500원 마감 기록해두겠습니다", createdAt: T03 - 900_000, likes: 4 },
  ],
  9056: [
    { id: 1, nickname: "HBM러버", holdingLabel: "관심종목", content: "-4.73%는 베타가 크게 작용한 날", createdAt: T03 - 3000_000, likes: 5 },
    { id: 2, nickname: "이익률체크", holdingLabel: "관심종목", content: "shock 구간에선 분기 실적보다 수급 먼저", createdAt: T03 - 2400_000, likes: 4 },
  ],
  9057: [
    { id: 1, nickname: "배터리존버", holdingLabel: "관심종목", content: "-5.31%는 2차전지 베타가 선명한 날", createdAt: T03 - 4800_000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "유가 shock에 LGES도 같이 빠졌네요", createdAt: T03 - 4200_000, likes: 4 },
  ],
  9058: [
    { id: 1, nickname: "자동차매니아", holdingLabel: "관심종목", content: "완성차는 유가·금리 민감도가 높죠", createdAt: T03 - 6600_000, likes: 5 },
    { id: 2, nickname: "미국판매러", holdingLabel: "관심종목", content: "오늘 밤 사이버캡은 별도 트랙", createdAt: T03 - 6000_000, likes: 4 },
  ],
  9059: [
    { id: 1, nickname: "수급파트", holdingLabel: "관심종목", content: "개인 2.3조 매수 vs 외국인·기관 매도 패턴이네요", createdAt: T03 - 8400_000, likes: 4 },
    { id: 2, nickname: "환율데스크", holdingLabel: "관심종목", content: "10년 4.8%·유가·환율 한 표에 적어둘게요", createdAt: T03 - 7800_000, likes: 3 },
  ],
  9048: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관망", content: "기관이 팔았는지 집계 다시 봐야겠네요.", createdAt: T02 + 600_000, likes: 5 },
    { id: 2, nickname: "지수관찰", holdingLabel: "인덱스 보유", content: "6,900선은 아직 심리 구간 맞습니다.", createdAt: T02 + 1200_000, likes: 4 },
  ],
  9049: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "HBM은 분기 ASP로 검증해야죠.", createdAt: T02 - 1200_000, likes: 6 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관망", content: "사이버캡은 글로벌 변수라 내일이 더 중요해요.", createdAt: T02 - 900_000, likes: 5 },
  ],
  9050: [
    { id: 1, nickname: "이익률체크", holdingLabel: "하이닉스 보유", content: "하이닉스 단독 순매수도 같이 볼게요.", createdAt: T02 - 3000_000, likes: 5 },
    { id: 2, nickname: "장비쪽사람", holdingLabel: "관망", content: "CapEx 우려 나오면 마진 가이던스가 먼저입니다.", createdAt: T02 - 2400_000, likes: 4 },
  ],
  9051: [
    { id: 1, nickname: "미국판매러", holdingLabel: "관심", content: "9/3 행사 결과가 단기 촉매겠죠.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "완성차존버", holdingLabel: "현대차 관심", content: "국내 월간 수출도 같이 추적하겠습니다.", createdAt: T02 - 6000_000, likes: 4 },
  ],
  9052: [
    { id: 1, nickname: "환율덕후", holdingLabel: "관망", content: "DXY랑 원달러 같이 적어두는 게 맞아요.", createdAt: T02 - 8400_000, likes: 4 },
    { id: 2, nickname: "개인투자", holdingLabel: "관망", content: "지수만 오르고 개인은 손실 나는 날도 많습니다.", createdAt: T02 - 7800_000, likes: 3 },
  ],
  9053: [
    { id: 1, nickname: "수출주러", holdingLabel: "관심종목", content: "환율↓=수출주↓만 고정하면 틀리기 쉽습니다.", createdAt: T02 - 10200_000, likes: 5 },
    { id: 2, nickname: "채권쟁이", holdingLabel: "관망", content: "9/4 고용 나오면 환율부터 움직일 겁니다.", createdAt: T02 - 9600_000, likes: 4 },
  ],

  9036: [
    { id: 1, nickname: "수급쟁이", holdingLabel: "관심종목", content: "외국인 412억은 금요일 대비 크게 줄었네요.", createdAt: T01 + 600_000, likes: 5 },
    { id: 2, nickname: "지수관찰", holdingLabel: "관심종목", content: "6800선 회복 확인했습니다.", createdAt: T01 + 1200_000, likes: 4 },
  ],
  9037: [
    { id: 1, nickname: "메모리사이클", holdingLabel: "관심종목", content: "HBM 70% 전망은 분기 출하로 검증해야죠.", createdAt: T01 - 1200_000, likes: 6 },
    { id: 2, nickname: "수출통계러", holdingLabel: "관심종목", content: "현물 5배는 품귀 신호 맞습니다.", createdAt: T01 - 900_000, likes: 5 },
  ],
  9038: [
    { id: 1, nickname: "HBM러버", holdingLabel: "관심종목", content: "+1.12%는 HBM 테마가 먼저 반응한 날이네요.", createdAt: T01 - 3000_000, likes: 5 },
    { id: 2, nickname: "이익률체크", holdingLabel: "관심종목", content: "분기 ASP 같이 봐야 합니다.", createdAt: T01 - 2400_000, likes: 4 },
  ],
  9039: [
    { id: 1, nickname: "배터리존버", holdingLabel: "관심종목", content: "2차전지가 지수 받쳐준 날 맞습니다.", createdAt: T01 - 4800_000, likes: 5 },
    { id: 2, nickname: "가동률체크", holdingLabel: "관심종목", content: "수주 공시 나올 때까지는 조심.", createdAt: T01 - 4200_000, likes: 4 },
  ],
  9040: [
    { id: 1, nickname: "자동차매니아", holdingLabel: "관심종목", content: "미국 로보택시 314대는 완성차 심리 변수죠.", createdAt: T01 - 6600_000, likes: 5 },
    { id: 2, nickname: "미국판매러", holdingLabel: "관심종목", content: "9/3 사이버캡 행사도 같이 봐야겠어요.", createdAt: T01 - 6000_000, likes: 4 },
  ],
  9041: [
    { id: 1, nickname: "플랫폼러", holdingLabel: "관심종목", content: "반등장에서 플랫폼은 상대 약세 패턴.", createdAt: T01 - 8400_000, likes: 4 },
    { id: 2, nickname: "광고업계", holdingLabel: "관심종목", content: "분기 광고 매출 나올 때까지 관망.", createdAt: T01 - 7800_000, likes: 3 },
  ],
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
  { id: 9188, symbol: "매크로", nickname: "물가금리표", holdingLabel: "관망", content: "BTC 7.7만권·금 4365·브렌트 101.21·10년 4.92%가 한 아침. PPI 5.4%를 완화로 읽지 마", createdAt: T11 - 0, likes: 44, comments: 2, },
  { id: 9189, symbol: "비트코인", nickname: "칠만칠천권", holdingLabel: "BTC 보유", content: "8만 재돌파 실패. 77~78k. 금이랑 속도가 다름. 할인율 4.92% 칸 따로", createdAt: T11 - 1800000, likes: 43, comments: 2, },
  { id: 9190, symbol: "금", nickname: "사천삼육오", holdingLabel: "금 ETF", content: "온스 4365, 4400 아래. 8월 ETF 180억이랑 하루 가격 시계 다름", createdAt: T11 - 3600000, likes: 42, comments: 2, },
  { id: 9191, symbol: "이더리움", nickname: "이더이사육공", holdingLabel: "관심", content: "2460권. BTC 베타. 알트 레버 먼저 줄임", createdAt: T11 - 5400000, likes: 41, comments: 2, },
  { id: 9192, symbol: "원유", nickname: "브렌트백일이", holdingLabel: "관심", content: "브렌트 101.21(+3.36%). 7/23 이후 첫 종가 100. 금 헤지랑 같은 칸 금지", createdAt: T11 - 7200000, likes: 40, comments: 2, },
  { id: 9193, symbol: "금리", nickname: "십년사구이", holdingLabel: "관망", content: "10년 4.92%(+0.08). PPI 5.4 vs 5.3. CPI·9/16이 게이트", createdAt: T11 - 9000000, likes: 39, comments: 2, },
  { id: 9182, symbol: "매크로", nickname: "안전자산표", holdingLabel: "관망", content: "BTC 7.82만·금 4375·브렌트 101·엔 153이 한 아침. 바이백 60억 해도 10년 4.83%", createdAt: T10 - 0, likes: 41, comments: 2, },
  { id: 9183, symbol: "비트코인", nickname: "팔만실패", holdingLabel: "BTC 보유", content: "8만 재돌파 실패 78208. ETF 4665만 유출·청산 1.52억. 금이랑 속도가 다름", createdAt: T10 - 1800000, likes: 40, comments: 2, },
  { id: 9184, symbol: "금", nickname: "사천삼칠오", holdingLabel: "금 ETF", content: "현물 4375(+0.58%)·선물 4451. 비트보다 느림. 실질금리 칸 따로", createdAt: T10 - 3600000, likes: 39, comments: 2, },
  { id: 9185, symbol: "이더리움", nickname: "이더약세", holdingLabel: "관심", content: "2464(−0.59%). 1년 전 4311 대비 약 42% 아래. BTC 베타로만 안 봄", createdAt: T10 - 5400000, likes: 38, comments: 2, },
  { id: 9186, symbol: "원유", nickname: "브렌트백일", holdingLabel: "관심", content: "브렌트 101+·WTI 96+. 금 헤지랑 같은 칸 금지. 지정학 프리미엄", createdAt: T10 - 7200000, likes: 37, comments: 2, },
  { id: 9187, symbol: "엔", nickname: "엔백오삼", holdingLabel: "관망", content: "달러엔 153이면 2월 이후 엔 강세. BOJ 0.25pt는 기대지 결정 아님", createdAt: T10 - 9000000, likes: 36, comments: 2, },
  { id: 9176, symbol: "매크로", nickname: "확률갈림러", holdingLabel: "관망", content: "폴리마켓 인상 51.5%인데 CME는 더 높다… 시장 간 괴리부터 표에", createdAt: T09 - 0, likes: 41, comments: 2, },
  { id: 9177, symbol: "비트코인", nickname: "팔만이탈러", holdingLabel: "BTC 보유", content: "78300~78500이면 8만 이탈 후 심리. 금 상관이랑 청산 맵을 한 줄에 안 넣음", createdAt: T09 - 1800000, likes: 40, comments: 2, },
  { id: 9178, symbol: "금", nickname: "사천사백밴드", holdingLabel: "금 ETF", content: "4400달러대 금은 느리게, 비트는 빠르게. 확률 숫자로 방향 단정 안 함", createdAt: T09 - 3600000, likes: 39, comments: 2, },
  { id: 9179, symbol: "원유", nickname: "브렌트구십팔", holdingLabel: "관심", content: "브렌트 98이면 인플레·위험자산 동시에 건드려. 금이랑 같은 칸 금지", createdAt: T09 - 5400000, likes: 38, comments: 2, },
  { id: 9180, symbol: "달러", nickname: "디엑시캘린더", holdingLabel: "관망", content: "CPI 11일·FOMC 15~16이 한 주. 원달러만 보면 오독", createdAt: T09 - 7200000, likes: 37, comments: 2, },
  { id: 9181, symbol: "은", nickname: "은이중줄", holdingLabel: "관심", content: "헤지 옆에 산업 수요 줄. 금은비율 벌어지면 해석 갈림", createdAt: T09 - 9000000, likes: 36, comments: 2, },
  { id: 9170, symbol: "매크로", nickname: "비율체크러", holdingLabel: "관망", content: "비트/금 비율 18온스대 + 상관 0.56… 증폭 금 서사는 이해되는데 레버리지 이유는 아님", createdAt: T08 - 0, likes: 40, comments: 2, },
  { id: 9171, symbol: "비트코인", nickname: "팔만지지러", holdingLabel: "BTC 보유", content: "80700 안팎이면 8만 안착 테스트. 유입 없으면 숏커버로만 분류", createdAt: T08 - 1800000, likes: 39, comments: 2, },
  { id: 9172, symbol: "금", nickname: "온스밴드러", holdingLabel: "금 ETF", content: "4400달러대 금은 느리게, 비트는 빠르게. 비율이랑 상관을 한 줄에 안 넣음", createdAt: T08 - 3600000, likes: 38, comments: 2, },
  { id: 9173, symbol: "은", nickname: "은이중성격", holdingLabel: "관심", content: "헤지 옆자리에 산업 수요 줄 따로. 금은비율 벌어지면 해석이 갈림", createdAt: T08 - 5400000, likes: 37, comments: 2, },
  { id: 9174, symbol: "달러", nickname: "디엑시공통", holdingLabel: "관망", content: "DXY가 공통 분모인데 원달러만 보면 헷갈림. 두 표로 분리", createdAt: T08 - 7200000, likes: 36, comments: 2, },
  { id: 9175, symbol: "구리", nickname: "구리온도계", holdingLabel: "관심", content: "금·비트가 헤지일 때 구리는 성장 온도계. 같이 올랐는지부터", createdAt: T08 - 9000000, likes: 35, comments: 2, },
  { id: 9160, symbol: "매크로", nickname: "상관체크러", holdingLabel: "관망", content: "비트랑 금 상관이 50% 넘었다는 주말 메모… 나스닥 베타만 보던 프레임을 잠시 접고 안전자산 축도 같이 볼게요", createdAt: T07 - 0, likes: 38, comments: 2, },
  { id: 9161, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "8만 달러 안팎에서 주말 횡보. 81400 찍고 내려온 자리라 지지 테스트로만 인식", createdAt: T07 - 1800000, likes: 37, comments: 2, },
  { id: 9162, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "금이 비트랑 같이 움직이면 ‘기술주 대리’가 아니라 ‘통화·금리’ 쪽 해석이 늘어나요", createdAt: T07 - 3600000, likes: 36, comments: 2, },
  { id: 9163, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "비트 베타가 큰 날은 알트 레버리지부터 접는 게 속 편함. 물가 주간이라 더", createdAt: T07 - 5400000, likes: 35, comments: 2, },
  { id: 9164, symbol: "금리", nickname: "채권덕후", holdingLabel: "관망", content: "월러 동결 기대가 50%대면 아직 동전 던지기. CPI 나오기 전 TLT 추격은 패스", createdAt: T07 - 7200000, likes: 34, comments: 2, },
  { id: 9165, symbol: "WTI", nickname: "유가러", holdingLabel: "관심", content: "고유가가 인플레 재점화하면 동결 시나리오가 흔들려요. 유가 밴드를 금리 표 옆에", createdAt: T07 - 9000000, likes: 33, comments: 2, },
  { id: 9152, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "비트·금·유가가 같은 날 움직이면 한 방향 베팅은 금물. 고용 전까지는 관망이 답이에요", createdAt: T04 - 0, likes: 40, comments: 2, },
  { id: 9153, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "8만 다시 밟았는데 기사마다 종가가 다르네요. 거래소 하나로 맞추고, 고용 전 레버리지는 접었습니다", createdAt: T04 - 1800000, likes: 39, comments: 2, },
  { id: 9154, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "전날 저점에서 되돌린 자리라 4,500 안착은 고용 보고 판단할래요. 급락 반등은 숏커버일 수도", createdAt: T04 - 3600000, likes: 38, comments: 2, },
  { id: 9155, symbol: "은", nickname: "실물러", holdingLabel: "관심", content: "금보다 출렁여서 비중은 더 작게. 산업 수요인지 헤지인지 아직 갈림", createdAt: T04 - 5400000, likes: 37, comments: 2, },
  { id: 9156, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "비트 베타로 따라온 자리. 2,500 아래면 심리선 탈환이 먼저라 알트 추격은 안 함", createdAt: T04 - 7200000, likes: 36, comments: 2, },
  { id: 9157, symbol: "WTI", nickname: "유가러", holdingLabel: "관심", content: "90달러가 버티면 금리 기대가 쉽게 안 내려가요. 서비스 확장이랑 같이 보는 중", createdAt: T04 - 9000000, likes: 35, comments: 2, },
  { id: 9146, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "WTI $91+·10년 4.80%·코스피 -3.99%. 유가·금리 shock가 공통 변수예요", createdAt: T03 - 0, likes: 30, comments: 2, },
  { id: 9147, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "~106,000달러, 리스크오프 조정. 직전 10.8만$ 대비 소폭 약세 구간", createdAt: T03 - 1800000, likes: 29, comments: 2, },
  { id: 9148, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "~3,600달러, 유가·지정학 헤지. 실질금리·DXY 같이 봐야 해요", createdAt: T03 - 3600000, likes: 28, comments: 2, },
  { id: 9149, symbol: "WTI", nickname: "유가러", holdingLabel: "관심", content: "WTI $91+·중동 shock·인플레·금리. 코스피 -3.99%와 같은 날", createdAt: T03 - 5400000, likes: 27, comments: 2, },
  { id: 9150, symbol: "달러인덱스", nickname: "환율보는사람", holdingLabel: "관심", content: "DXY·원·달러·EM 변수. 유가 shock 때 달러 반응은 케이스별", createdAt: T03 - 7200000, likes: 26, comments: 2, },
  { id: 9151, symbol: "은", nickname: "실물러", holdingLabel: "관심", content: "금·은비·산업 수요. 금 ~3600과 PMI·유가 연동", createdAt: T03 - 9000000, likes: 25, comments: 2, },
  { id: 9141, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "108,248달러, 10.8만$ 심리선 부근이에요. 공포탐욕 44(1주 전 56)면 리스크온보다는 조심스러운 구간 같습니다.", createdAt: T02 - 0, likes: 32, comments: 2, },
  { id: 9142, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "금 3,475달러. 코스피 +0.9%인데 금도 버티는 날이면 매크로 헤지 수요가 섞인 걸로 봅니다.", createdAt: T02 - 1800000, likes: 28, comments: 2, },
  { id: 9143, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더 4,512달러, 4,500$ 선 위. 단기엔 BTC·금리 베타가 크고 스테이킹 수익은 2년물 국채랑 비교 중이에요.", createdAt: T02 - 3600000, likes: 26, comments: 2, },
  { id: 9144, symbol: "은", nickname: "실물러", holdingLabel: "관심", content: "은은 금보다 변동성이 커서 금 3,475 강세 때 추격하고 PMI 둔화면 먼저 약해지는 패턴이 반복됩니다.", createdAt: T02 - 5400000, likes: 23, comments: 2, },
  { id: 9145, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관망", content: "DXY 98.2·인상 57%·FOMC 9/15~16. 이번 주 사이버캡·고용까지 겹치면 BTC·금·코스피가 같이 재가격될 수 있어요.", createdAt: T02 - 7200000, likes: 25, comments: 2, },
  { id: 9130, symbol: "비트코인", nickname: "온체인러", holdingLabel: "관심종목", content: "~108248 · 10.8만$ 선", createdAt: T01 - 0, likes: 28, comments: 2, },
  { id: 9131, symbol: "금", nickname: "금벌레", holdingLabel: "관심종목", content: "~3475 · 금>달러 준비자산", createdAt: T01 - 1800000, likes: 27, comments: 2, },
  { id: 9132, symbol: "이더리움", nickname: "이더러", holdingLabel: "관심종목", content: "~4512 · 4500$ 선", createdAt: T01 - 3600000, likes: 26, comments: 2, },
  { id: 9133, symbol: "은", nickname: "실물러", holdingLabel: "관심종목", content: "금+산업 수요 · Au/Ag ratio", createdAt: T01 - 5400000, likes: 25, comments: 2, },
  { id: 9134, symbol: "매크로", nickname: "채권덕후", holdingLabel: "관심종목", content: "9월 인상 57% · FOMC 9/15~16", createdAt: T01 - 7200000, likes: 24, comments: 2, },
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
  9188: [
    { id: 1, nickname: "할인율체크", holdingLabel: "관망", content: "무이자 자산 기회비용이 커진 아침", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "물가금리표", holdingLabel: "관망", content: "유가랑 금을 한 헤지로 안 묶음", createdAt: T11 + 1200000, likes: 4 },
  ],
  9189: [
    { id: 1, nickname: "칠만칠천권", holdingLabel: "BTC 보유", content: "8만은 심리선이지 스위치 아님", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "이티에프유출", holdingLabel: "관심", content: "유출이 며칠 이어지는지가 중기", createdAt: T11 + 1200000, likes: 4 },
  ],
  9190: [
    { id: 1, nickname: "사천삼육오", holdingLabel: "금 ETF", content: "실질금리 칸을 온스랑 같이 적죠", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "사천사백아래", holdingLabel: "관심", content: "4400 회복 전엔 추격 패스", createdAt: T11 + 1200000, likes: 4 },
  ],
  9191: [
    { id: 1, nickname: "이더이사육공", holdingLabel: "관심", content: "BTC 베타만으로 알트 안 늘림", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "레버먼저", holdingLabel: "관심", content: "물가 주간에 알트부터 줄임", createdAt: T11 + 1200000, likes: 4 },
  ],
  9192: [
    { id: 1, nickname: "브렌트백일이", holdingLabel: "관심", content: "종가 100은 테이프, 재고가 다음", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "지정학프리미엄", holdingLabel: "관심", content: "금 온스랑 같은 헤지 아님", createdAt: T11 + 1200000, likes: 4 },
  ],
  9193: [
    { id: 1, nickname: "십년사구이", holdingLabel: "관망", content: "바이백이랑 금리 상승을 완화로 안 봄", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "피피아이오사", holdingLabel: "관심", content: "CPI 나오기 전 경로 확정 금지", createdAt: T11 + 1200000, likes: 4 },
  ],
  9182: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "자산마다 시계가 달라서 한 방향 베팅 안 함", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "안전자산표", holdingLabel: "관망", content: "물가 이틀 앞에 알트 레버리지 줄임", createdAt: T10 + 1200000, likes: 4 },
  ],
  9183: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유출 있는 날 반등은 숏커버 태그", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "팔만실패", holdingLabel: "BTC 보유", content: "다음 심리는 8만 재돌파 여부", createdAt: T10 + 1200000, likes: 4 },
  ],
  9184: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스보다 실질금리 방향이 먼저예요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "사천삼칠오", holdingLabel: "금 ETF", content: "선물 4451이랑 현물을 같은 칸에 안 넣음", createdAt: T10 + 1200000, likes: 4 },
  ],
  9185: [
    { id: 1, nickname: "이더약세", holdingLabel: "관심", content: "1년 낙폭이랑 당일 −0.59%는 시계가 다름", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "알트베타", holdingLabel: "관심종목", content: "BTC만 보고 이더 추격하진 않음", createdAt: T10 + 1200000, likes: 4 },
  ],
  9186: [
    { id: 1, nickname: "브렌트백일", holdingLabel: "관심", content: "재고·감산·지정학을 세 줄로 적어요", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "인플레체크", holdingLabel: "관심종목", content: "항공·화학 파급은 옆에만", createdAt: T10 + 1200000, likes: 4 },
  ],
  9187: [
    { id: 1, nickname: "엔백오삼", holdingLabel: "관망", content: "원달러랑 달러엔을 다른 시트에", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "보이제기대", holdingLabel: "관심종목", content: "9월 28일권 회의 전 캐리 레버리지 패스", createdAt: T10 + 1200000, likes: 4 },
  ],
  9176: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "확률 괴리는 포지션 차이일 수 있어요", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "확률갈림러", holdingLabel: "관망", content: "회의 전엔 사이즈부터 줄일게요", createdAt: T09 + 1200000, likes: 4 },
  ],
  9177: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 없는 반등은 숏커버 태그", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "팔만이탈러", holdingLabel: "BTC 보유", content: "다음 심리는 7.8만 지지 여부", createdAt: T09 + 1200000, likes: 4 },
  ],
  9178: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스보다 실질금리 방향이 먼저", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "사천사백밴드", holdingLabel: "금 ETF", content: "비트만 급락하면 상관이 깨져요", createdAt: T09 + 1200000, likes: 4 },
  ],
  9179: [
    { id: 1, nickname: "브렌트구십팔", holdingLabel: "관심", content: "재고·감산·지정학을 세 줄로", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "인플레체크", holdingLabel: "관심종목", content: "항공·화학 파급도 옆에", createdAt: T09 + 1200000, likes: 4 },
  ],
  9180: [
    { id: 1, nickname: "디엑시캘린더", holdingLabel: "관망", content: "DXY랑 원달러를 다른 시트에", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "금리표러", holdingLabel: "관심종목", content: "회의 전 달러 레버리지 패스", createdAt: T09 + 1200000, likes: 4 },
  ],
  9181: [
    { id: 1, nickname: "은이중줄", holdingLabel: "관심", content: "산업 수요 줄 없으면 헤지 추격 안 함", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "금은비율러", holdingLabel: "관망", content: "비율이랑 달러를 같이", createdAt: T09 + 1200000, likes: 4 },
  ],
  9170: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "상관은 후행이라 앞으로를 보장하진 않아요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "비율체크러", holdingLabel: "관망", content: "FOMC 전엔 사이즈부터 줄일게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9171: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 맵이랑 청산 히트맵을 가격 옆에", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "팔만지지러", holdingLabel: "BTC 보유", content: "8만 깨지면 다음 심리는 7.9만 쪽", createdAt: T08 + 1200000, likes: 4 },
  ],
  9172: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "온스 밴드보다 실질금리 방향이 먼저", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "온스밴드러", holdingLabel: "금 ETF", content: "비트만 급락하면 상관이 다시 깨져요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9173: [
    { id: 1, nickname: "은이중성격", holdingLabel: "관심", content: "산업 수요 줄 없으면 헤지 추격 안 함", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "디엑시공통", holdingLabel: "관망", content: "달러 강하면 은이 금보다 더 눌려요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9174: [
    { id: 1, nickname: "디엑시공통", holdingLabel: "관망", content: "원달러랑 DXY를 같은 셀에 넣지 마세요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "금리표러", holdingLabel: "관심종목", content: "회의 전 달러 레버리지는 패스", createdAt: T08 + 1200000, likes: 4 },
  ],
  9175: [
    { id: 1, nickname: "구리온도계", holdingLabel: "관심", content: "재고·중국 수요는 구리 고유 칸", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "비율체크러", holdingLabel: "관망", content: "헤지랑 성장을 한 방향으로만 안 묶음", createdAt: T08 + 1200000, likes: 4 },
  ],
  9160: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "상관은 후행이라 앞으로 방향을 보장하진 않아요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "달러보는사람", holdingLabel: "관심종목", content: "DXY랑 같이 적어야 설득력이 생겨요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9161: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 없이 숏커버면 되돌림이 빠를 수 있음", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "온체인러", holdingLabel: "BTC 보유", content: "8만 지지가 깨지면 다음 심리는 7.9만 쪽", createdAt: T07 + 1200000, likes: 4 },
  ],
  9162: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "금은 실질금리 대용이랑 같이 보면 덜 헷갈려요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "금벌레", holdingLabel: "금 ETF", content: "주중 물가 전엔 비중 유지가 기본", createdAt: T07 + 1200000, likes: 4 },
  ],
  9163: [
    { id: 1, nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더는 비트보다 출렁여서 포지션 절반만", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "온체인러", holdingLabel: "관심종목", content: "알트 레버리지는 FOMC 전 접는 편", createdAt: T07 + 1200000, likes: 4 },
  ],
  9164: [
    { id: 1, nickname: "채권덕후", holdingLabel: "관망", content: "확률 50%면 포지션도 반만", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "금리보는사람", holdingLabel: "관심종목", content: "CPI 서프라이즈 시나리오를 미리 적어둘게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9165: [
    { id: 1, nickname: "인플레체크", holdingLabel: "관심종목", content: "유가 90달러대가 버티면 서비스 물가도 같이 봐요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "유가러", holdingLabel: "관심", content: "지정학 헤드라인은 단기, 재고는 중기", createdAt: T07 + 1200000, likes: 4 },
  ],
  9152: [
    { id: 1, nickname: "매크로올빼미", holdingLabel: "관심종목", content: "공통 변수는 달러·금리·고용뿐", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "포지션줄임", holdingLabel: "관심종목", content: "발표 15분만 지켜보고 움직이죠", createdAt: T04 + 1199000, likes: 4 },
  ],
  9153: [
    { id: 1, nickname: "청산맵", holdingLabel: "관심종목", content: "지지인지 숏커버인지 청산부터", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "ETF추적", holdingLabel: "관심종목", content: "유입 없이 반등이면 토할 수 있어요", createdAt: T04 + 1199000, likes: 4 },
  ],
  9154: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "달러·실질금리 같이 풀리는지", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "이틀관찰", holdingLabel: "관심종목", content: "안착은 하루로 단정 안 함", createdAt: T04 + 1199000, likes: 4 },
  ],
  9155: [
    { id: 1, nickname: "금은비", holdingLabel: "관심종목", content: "비율이 줄어드는지 볼게요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "태양광러", holdingLabel: "관심종목", content: "산업 줄은 따로 적어야죠", createdAt: T04 + 1199000, likes: 4 },
  ],
  9156: [
    { id: 1, nickname: "심리선", holdingLabel: "관심종목", content: "2,500 먼저, 그다음 이야기", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "알트접음", holdingLabel: "관심종목", content: "고용 전 알트 레버리지 접었어요", createdAt: T04 + 1199000, likes: 4 },
  ],
  9157: [
    { id: 1, nickname: "인플레체크", holdingLabel: "관심종목", content: "지불가격 지수랑 같이 봐야죠", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "10년물", holdingLabel: "관심종목", content: "유가·금리·위험자산 삼각", createdAt: T04 + 1199000, likes: 4 },
  ],
  9146: [
    { id: 1, nickname: "헷지", holdingLabel: "관심종목", content: "유가·금리·코스피 세 줄 같이 기록하겠습니다", createdAt: T03 - 3000_000, likes: 5 },
    { id: 2, nickname: "실질금리", holdingLabel: "관심종목", content: "shock 구간에선 안전자산도 같이 재가격", createdAt: T03 - 2400_000, likes: 4 },
  ],
  9147: [
    { id: 1, nickname: "ETF추적", holdingLabel: "관심종목", content: "10.6만$대와 ETF 순유입 같이 봐야죠", createdAt: T03 - 4800_000, likes: 5 },
    { id: 2, nickname: "헷지", holdingLabel: "관심종목", content: "리스크오프면 청산 변수도", createdAt: T03 - 4200_000, likes: 4 },
  ],
  9148: [
    { id: 1, nickname: "실질금리", holdingLabel: "관심종목", content: "3600달러대면 지정학 헤지 수요 섞인 듯", createdAt: T03 - 6600_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심종목", content: "DXY·금 같이 추적", createdAt: T03 - 6000_000, likes: 4 },
  ],
  9149: [
    { id: 1, nickname: "유가러", holdingLabel: "관심종목", content: "$91+면 인플레·금리 변수 같이", createdAt: T03 - 8400_000, likes: 4 },
    { id: 2, nickname: "매크로", holdingLabel: "관심종목", content: "코스피 shock와 같은 날 맞네요", createdAt: T03 - 7800_000, likes: 3 },
  ],
  9150: [
    { id: 1, nickname: "환율데스크", holdingLabel: "관심종목", content: "유가 shock 때 DXY 반응은 케이스별이죠", createdAt: T03 - 10200_000, likes: 5 },
    { id: 2, nickname: "EM체크", holdingLabel: "관심종목", content: "원·달러·EM 같이 기록", createdAt: T03 - 9600_000, likes: 4 },
  ],
  9151: [
    { id: 1, nickname: "실물러", holdingLabel: "관심종목", content: "금 강세 때 은 추격·PMI 둔화면 약세 패턴", createdAt: T03 - 12000_000, likes: 4 },
    { id: 2, nickname: "비율체크", holdingLabel: "관심종목", content: "Au/Ag ratio 추적", createdAt: T03 - 11400_000, likes: 3 },
  ],
  9141: [
    { id: 1, nickname: "ETF추적", holdingLabel: "BTC 보유", content: "현물 ETF 순유입이 이어지는지 먼저 볼게요.", createdAt: T02 + 600_000, likes: 5 },
    { id: 2, nickname: "헷지러", holdingLabel: "관망", content: "공포44면 레버리지는 줄이는 게 맞죠.", createdAt: T02 + 1200_000, likes: 4 },
  ],
  9142: [
    { id: 1, nickname: "실질금리", holdingLabel: "관망", content: "금은 이자 없어서 금리 기대에 민감합니다.", createdAt: T02 - 1200_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심", content: "DXY 98.2 방향이 같이 중요해요.", createdAt: T02 - 900_000, likes: 4 },
  ],
  9143: [
    { id: 1, nickname: "스테이커", holdingLabel: "ETH 보유", content: "ETH/BTC 비율도 같이 기록하겠습니다.", createdAt: T02 - 3000_000, likes: 4 },
    { id: 2, nickname: "온체인러", holdingLabel: "관심", content: "4,500$ 선 지지되는지가 단기 포인트.", createdAt: T02 - 2400_000, likes: 3 },
  ],
  9144: [
    { id: 1, nickname: "비율체크", holdingLabel: "관심", content: "금은비 극단이면 상대가치 논쟁 나옵니다.", createdAt: T02 - 4800_000, likes: 4 },
    { id: 2, nickname: "실물러", holdingLabel: "관심", content: "태양광 수요 뉴스도 챙기겠습니다.", createdAt: T02 - 4200_000, likes: 3 },
  ],
  9145: [
    { id: 1, nickname: "미장러", holdingLabel: "관망", content: "9/4 고용이 확률부터 흔들 겁니다.", createdAt: T02 - 6600_000, likes: 5 },
    { id: 2, nickname: "환율데스크", holdingLabel: "관심", content: "원·달러 1366.5랑 DXY 같이 보는 게 맞네요.", createdAt: T02 - 6000_000, likes: 4 },
  ],

  9130: [
    { id: 1, nickname: "헷지러", holdingLabel: "관심종목", content: "10.8만$ 선 지키는지 봐야겠어요.", createdAt: T01 + 600_000, likes: 5 },
    { id: 2, nickname: "실질금리", holdingLabel: "관심종목", content: "인상 57%면 기회비용 재계산이죠.", createdAt: T01 + 1200_000, likes: 4 },
  ],
  9131: [
    { id: 1, nickname: "금선물러", holdingLabel: "관심종목", content: "금>달러 준비자산 서사 계속 추적.", createdAt: T01 - 1200_000, likes: 5 },
    { id: 2, nickname: "달러보기", holdingLabel: "관심종목", content: "FOMC 9/15~16이 변수네요.", createdAt: T01 - 900_000, likes: 4 },
  ],
  9132: [
    { id: 1, nickname: "스테이커", holdingLabel: "관심종목", content: "4500$ 선 위면 비트보다 버틴 셈.", createdAt: T01 - 3000_000, likes: 4 },
    { id: 2, nickname: "온체인러", holdingLabel: "관심종목", content: "비트 10.8만과 같이 봐야죠.", createdAt: T01 - 2400_000, likes: 3 },
  ],
  9133: [
    { id: 1, nickname: "실물러", holdingLabel: "관심종목", content: "금은비 높으면 은이 뒤늦게 따라올 수 있어요.", createdAt: T01 - 4800_000, likes: 4 },
    { id: 2, nickname: "헷지러", holdingLabel: "관심종목", content: "산업 수요 PMI도 챙기겠습니다.", createdAt: T01 - 4200_000, likes: 3 },
  ],
  9134: [
    { id: 1, nickname: "채권쟁이", holdingLabel: "관심종목", content: "57%면 이자 없는 자산이 먼저 반응.", createdAt: T01 - 6600_000, likes: 5 },
    { id: 2, nickname: "미장러", holdingLabel: "관심종목", content: "9/4 고용 나오면 확률부터 움직일 겁니다.", createdAt: T01 - 6000_000, likes: 4 },
  ],
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
  { id: 9293, symbol: "서울", nickname: "키맞춤서울", holdingLabel: "관심", content: "서울 매매 +0.20%인데 강북 +0.33·강남3구 전부 하락. 평균만 보면 오독", createdAt: T11 - 0, likes: 44, comments: 2, },
  { id: 9294, symbol: "강남", nickname: "강남세구하락", holdingLabel: "관심", content: "강남 −0.35·서초 −0.30·송파 −0.02. 5주·낙폭확대·21주 만. 서울 하락은 아님", createdAt: T11 - 1800000, likes: 43, comments: 2, },
  { id: 9295, symbol: "전세", nickname: "노원서초전세", holdingLabel: "관심", content: "노원 전세 +0.38, 서초 −0.21. 입주 칸이랑 대단지 칸이 다름. 한도 조회 먼저", createdAt: T11 - 3600000, likes: 42, comments: 2, },
  { id: 9296, symbol: "공급", nickname: "목동팔십오", holdingLabel: "관심", content: "브라운스톤 목동 85세대 중 일반 29. 계약 11~12일. 단지 규모랑 일반 창 분리", createdAt: T11 - 5400000, likes: 41, comments: 2, },
  { id: 9297, symbol: "서울", nickname: "오름폭둔화", holdingLabel: "관심", content: "매매 0.22→0.20, 전세 0.21→0.19. 둔화지 하락 전환은 아님. 구별 실거래부터", createdAt: T11 - 7200000, likes: 40, comments: 2, },
  { id: 9288, symbol: "정책", nickname: "종부세유지", holdingLabel: "관심", content: "비거주 1주택 공제 12억 유지·상한 150%. 9억 인하·200%는 철회. 전세 매물이랑 한 신호 금지", createdAt: T10 - 0, likes: 39, comments: 2, },
  { id: 9289, symbol: "전세", nickname: "전세만이구", holdingLabel: "관심", content: "서울 전세매물 19902(−12.8% YoY). 구별 표 없으면 도시만으로 계약 안 함", createdAt: T10 - 1800000, likes: 38, comments: 2, },
  { id: 9290, symbol: "전세", nickname: "월세만이육", holdingLabel: "관심", content: "월세 매물 16921(−11.9%). 전세 감소랑 같은 방향이어도 전환 비율은 별도", createdAt: T10 - 3600000, likes: 37, comments: 2, },
  { id: 9291, symbol: "정책", nickname: "청년임대예산", holdingLabel: "관심", content: "2027 공공임대+서울 보증금 이자 최대 2억·연 2.0%. 19~39·소득 5천만. 한도 조회 먼저", createdAt: T10 - 5400000, likes: 36, comments: 2, },
  { id: 9292, symbol: "서울매매", nickname: "과표사십사", holdingLabel: "관심", content: "과표 12억≈시가 44억대. 중저가 전월세난이랑 대상이 다름. 시행령 전 세액 확정 금지", createdAt: T10 - 7200000, likes: 35, comments: 2, },
  { id: 9284, symbol: "전세", nickname: "팔십팔퍼센트", holdingLabel: "관심", content: "갱신권 없이 88%가 보증금 올림… 평균 4680만. 꼬리 사례랑 평균 섞지 말자", createdAt: T09 - 0, likes: 39, comments: 2, },
  { id: 9285, symbol: "전세", nickname: "매물이만사", holdingLabel: "관심", content: "서울 전세매물 20432에 −12%. 지수 101.9면 협상력 기울기 신호", createdAt: T09 - 1800000, likes: 38, comments: 2, },
  { id: 9286, symbol: "전세", nickname: "월세전환러", holdingLabel: "관심", content: "전세→월세 전환에 가을 이사 겹치면 성급 계약 위험. 한도 조회 먼저", createdAt: T09 - 3600000, likes: 37, comments: 2, },
  { id: 9287, symbol: "정책", nickname: "공급규제시계", holdingLabel: "관심", content: "지을 속도랑 규제 속도가 다르면 실수요만 힘듦. 전세 통계랑 한 신호로 안 묶음", createdAt: T09 - 5400000, likes: 36, comments: 2, },
  { id: 9280, symbol: "정책", nickname: "정합성체크", holdingLabel: "관심", content: "집 짓겠다는 동네랑 대출 막는 동네가 겹치면 실수요만 힘듦. 공급 헤드라인으로 급매수 안 함", createdAt: T08 - 0, likes: 38, comments: 2, },
  { id: 9281, symbol: "전세", nickname: "전세대출러", holdingLabel: "관심", content: "전세가보다 은행 한도가 계약 관문. 한도 안 나오면 노룩 계약 유혹 거절", createdAt: T08 - 1800000, likes: 37, comments: 2, },
  { id: 9282, symbol: "강남", nickname: "직주학군러", holdingLabel: "관심", content: "매매는 묶여도 전세 실수요는 남아요. 전세가율+대출 가능액부터", createdAt: T08 - 3600000, likes: 36, comments: 2, },
  { id: 9283, symbol: "정책", nickname: "세제일정러", holdingLabel: "관심", content: "국회 올라간 세제는 일정이 생긴 관망. 시행령 전 숫자로 매도·매수 안 함", createdAt: T08 - 5400000, likes: 35, comments: 2, },
  { id: 9270, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "서울 평균 전세 7.1억 넘었다는 숫자… 매물 줄어 ‘노룩 계약’ 이야기도 같이 들려요. 급하면 더 비싸짐", createdAt: T07 - 0, likes: 36, comments: 2, },
  { id: 9271, symbol: "강남", nickname: "서울러", holdingLabel: "관심", content: "송파는 전세가 매매보다 더 오른다는 집계. 세제 때문에 매매만 식고 전세는 달리는 구간", createdAt: T07 - 1800000, likes: 35, comments: 2, },
  { id: 9272, symbol: "매물", nickname: "실수요자", holdingLabel: "관심", content: "전세 물건이 한 달 새 줄면 가격표보다 매물 수가 먼저 신호예요", createdAt: T07 - 3600000, likes: 34, comments: 2, },
  { id: 9273, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "종부세·세제 개편안은 관망 구간. 실거주 압력과 전세 부족이 동시에 오면 세입자만 힘듦", createdAt: T07 - 5400000, likes: 33, comments: 2, },
  { id: 9257, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "12억 유지가 ‘감세 잔치’는 아니에요. 9억으로 깎이던 안이 철회된 완화일 뿐", createdAt: T04 - 0, likes: 40, comments: 2, },
  { id: 9258, symbol: "종부세", nickname: "실수요자", holdingLabel: "관심", content: "실거주 14억이랑 비거주 12억 차이, 고지서로 다시 찍어봐야 체감이 옵니다", createdAt: T04 - 1800000, likes: 39, comments: 2, },
  { id: 9259, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "ISA 원상복구면 여윳돈이 집으로만 가진 않을 수도. 한도 숫자 나와야 판단 가능", createdAt: T04 - 3600000, likes: 38, comments: 2, },
  { id: 9260, symbol: "매매", nickname: "서울러", holdingLabel: "관심", content: "2029년 장특 보유공제 사라지면 투자 매각 일정을 지금부터 짜야 해요", createdAt: T04 - 5400000, likes: 37, comments: 2, },
  { id: 9253, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급·LTV·DSR·전세대출 규제 유지. 유가·금리 충격이 주담대 심리 변수", createdAt: T03 - 0, likes: 28, comments: 2, },
  { id: 9254, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "전세 관망·입주 물량·FOMC 9/15 전후. shock 구간에선 거래량 먼저", createdAt: T03 - 1200000, likes: 27, comments: 2, },
  { id: 9255, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "WTI $91+·10년 4.8%·wealth effect. 매매 관망 지속", createdAt: T03 - 2400000, likes: 26, comments: 2, },
  { id: 9256, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "매크로 shock·정책 규제·전세·매매 관망. 지역별 온도차 분리", createdAt: T03 - 3600000, likes: 25, comments: 2, },
  { id: 9244, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "강남·마포는 소폭 반등인데 외곽은 다릅니다. 서울 평균 한 줄만 보면 구별 온도차를 놓치기 쉬워요.", createdAt: T02 - 0, likes: 28, comments: 2, },
  { id: 9245, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "학군·역세권 전세는 버티는데 9월 입주 물량이 변수예요. 보증금은 오늘 숫자보다 다음 달 공급이 먼저입니다.", createdAt: T02 - 1200000, likes: 27, comments: 2, },
  { id: 9246, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "FOMC·세금 부담으로 매매는 관망이 이어집니다. 가격보다 거래량이 먼저 줄어드는 패턴이에요.", createdAt: T02 - 2400000, likes: 26, comments: 2, },
  { id: 9247, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 확대 수사는 심리부터 움직이고 LTV·DSR 규제가 수요에 바로 닿습니다. 구호랑 숫자를 분리해서 봐야 해요.", createdAt: T02 - 3600000, likes: 25, comments: 2, },
  { id: 9248, symbol: "경기", nickname: "경기거주", holdingLabel: "관심", content: "수도권 외곽은 GTX 기대와 입주 물량이 동시에 변수입니다. 서울 뉴스만 보고 경기 판단하면 왜곡되기 쉽습니다.", createdAt: T02 - 4800000, likes: 24, comments: 2, },
  { id: 9249, symbol: "부산", nickname: "부산러", holdingLabel: "관심", content: "부산·제주는 관광·이전 수요가 섞여 서울이랑 사이클이 다릅니다. 거래량 얇은 지역은 하루 체감이 크게 왜곡돼요.", createdAt: T02 - 6000000, likes: 23, comments: 2, },
  { id: 9233, symbol: "서울", nickname: "서울러", holdingLabel: "관심", content: "강남·마포 일부 0.2~0.4% 소폭 반등. 구별로 온도 차 큽니다.", createdAt: T01 - 0, likes: 28, comments: 2, },
  { id: 9234, symbol: "경기", nickname: "경기거주", holdingLabel: "관심", content: "수도권 외곽 전세 0.19% 확대. 서울보다 완만하지만 입주 물량 변수.", createdAt: T01 - 1200000, likes: 27, comments: 2, },
  { id: 9235, symbol: "부산", nickname: "부산러", holdingLabel: "관심", content: "해운대·센텀은 버티는데 외은 약세. 지역 내 격차 큼.", createdAt: T01 - 2400000, likes: 26, comments: 2, },
  { id: 9236, symbol: "제주", nickname: "제주민", holdingLabel: "관심", content: "관광·이전 수요 vs 공급. 전세·매매 둘 다 서울이랑 다른 그림.", createdAt: T01 - 3600000, likes: 25, comments: 2, },
  { id: 9237, symbol: "인천", nickname: "인천러", holdingLabel: "관심", content: "GTX·역세권 기대 있는 데 FOMC 전엔 관망 많아요.", createdAt: T01 - 4800000, likes: 24, comments: 2, },
  { id: 9238, symbol: "대구", nickname: "대구러", holdingLabel: "관심", content: "수도권 대비 거래량 얇음. 금리 변수에 더 민감하게 반응.", createdAt: T01 - 6000000, likes: 23, comments: 2, },
  { id: 9229, symbol: "전세", nickname: "전세러", holdingLabel: "관심", content: "학군·역세권 소폭 반등", createdAt: T01 - 7200000, likes: 26, comments: 2, },
  { id: 9230, symbol: "매매", nickname: "실수요자", holdingLabel: "관심", content: "FOMC·세금 부담 관망", createdAt: T01 - 8400000, likes: 25, comments: 2, },
  { id: 9231, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 확대·대출 규제 유지", createdAt: T01 - 9600000, likes: 24, comments: 2, },
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
  9293: [
    { id: 1, nickname: "키맞춤서울", holdingLabel: "관심", content: "강남 약세를 서울 하락으로 읽지 마", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "강북삼삼", holdingLabel: "관심", content: "강북 0.33%를 평균 옆에 둠", createdAt: T11 + 1200000, likes: 4 },
  ],
  9294: [
    { id: 1, nickname: "강남세구하락", holdingLabel: "관심", content: "송파 21주 만 하락은 전환 힌트일 뿐", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "호가체결", holdingLabel: "관심", content: "호가 낮춘 매물이 체결되는지 다음", createdAt: T11 + 1200000, likes: 4 },
  ],
  9295: [
    { id: 1, nickname: "노원서초전세", holdingLabel: "관심", content: "도시 평균 0.19%는 가림막", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "한도관문", holdingLabel: "관심", content: "한도 안 나오면 노룩 거절", createdAt: T11 + 1200000, likes: 4 },
  ],
  9296: [
    { id: 1, nickname: "목동팔십오", holdingLabel: "관심", content: "85는 단지, 29가 일반 창", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "임의공급추첨", holdingLabel: "관심", content: "가점 없는 추첨·후분양 조건부터", createdAt: T11 + 1200000, likes: 4 },
  ],
  9297: [
    { id: 1, nickname: "오름폭둔화", holdingLabel: "관심", content: "2주 연속 둔화지 방향 전환은 다음 주", createdAt: T11 + 600000, likes: 5 },
    { id: 2, nickname: "구별실거래", holdingLabel: "관심", content: "평균 상승으로 급매수 안 함", createdAt: T11 + 1200000, likes: 4 },
  ],
  9288: [
    { id: 1, nickname: "공제십이억", holdingLabel: "관심종목", content: "실거주 14억이랑 비거주 12억 차등을 유지", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "종부세유지", holdingLabel: "관심", content: "공정시장가액 70%는 내년 칸", createdAt: T10 + 1200000, likes: 4 },
  ],
  9289: [
    { id: 1, nickname: "전세만이구", holdingLabel: "관심", content: "아실 1일 기준이라 주간 추이를 옆에", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "구별호가", holdingLabel: "관심종목", content: "대출 가능액 없이 평균만 보고 계약 금지", createdAt: T10 + 1200000, likes: 4 },
  ],
  9290: [
    { id: 1, nickname: "월세만이육", holdingLabel: "관심", content: "전세→월세 전환은 주거비 구조 변화", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "가을이사", holdingLabel: "관심종목", content: "등기·확정일자 양보 안 함", createdAt: T10 + 1200000, likes: 4 },
  ],
  9291: [
    { id: 1, nickname: "청년임대예산", holdingLabel: "관심", content: "생애 한 번인 경우가 많아 대기부터", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "소득오천만", holdingLabel: "관심종목", content: "기혼 6천만 한도도 서류로 확인", createdAt: T10 + 1200000, likes: 4 },
  ],
  9292: [
    { id: 1, nickname: "과표사십사", holdingLabel: "관심", content: "고가 보유세 대상과 중저가 시장을 나눔", createdAt: T10 + 600000, likes: 5 },
    { id: 2, nickname: "고지서대기", holdingLabel: "관심종목", content: "시행령 전 헤드라인을 세액으로 안 씀", createdAt: T10 + 1200000, likes: 4 },
  ],
  9284: [
    { id: 1, nickname: "갱신권체크", holdingLabel: "관심종목", content: "갱신권 유무가 인상폭을 가릅니다", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "팔십팔퍼센트", holdingLabel: "관심", content: "1억·3억 꼬리는 분포로만", createdAt: T09 + 1200000, likes: 4 },
  ],
  9285: [
    { id: 1, nickname: "매물이만사", holdingLabel: "관심", content: "구별 표 없으면 도시만으로 계약 금지", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "지수신고", holdingLabel: "관심종목", content: "101.9는 22년 10월 이후 최고 수준", createdAt: T09 + 1200000, likes: 4 },
  ],
  9286: [
    { id: 1, nickname: "월세전환러", holdingLabel: "관심", content: "등기·확정일자 양보 안 함", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "대출한도먼저", holdingLabel: "관심종목", content: "한도 안 나오면 노룩 거절", createdAt: T09 + 1200000, likes: 4 },
  ],
  9287: [
    { id: 1, nickname: "공급규제시계", holdingLabel: "관심", content: "입주 캘린더랑 대출 규정을 한 표에", createdAt: T09 + 600000, likes: 5 },
    { id: 2, nickname: "실수요서류", holdingLabel: "관심종목", content: "시행령 전 숫자를 확정으로 안 씀", createdAt: T09 + 1200000, likes: 4 },
  ],
  9280: [
    { id: 1, nickname: "실수요계산", holdingLabel: "관심종목", content: "입주 캘린더랑 대출 규정을 한 표에", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "정합성체크", holdingLabel: "관심", content: "국감 숫자도 시나리오로만 적을게요", createdAt: T08 + 1200000, likes: 4 },
  ],
  9281: [
    { id: 1, nickname: "전세대출러", holdingLabel: "관심", content: "월세 전환 비율이 매물 신호예요", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "보증체크", holdingLabel: "관심종목", content: "등기·확정일자 양보 안 함", createdAt: T08 + 1200000, likes: 4 },
  ],
  9282: [
    { id: 1, nickname: "직주학군러", holdingLabel: "관심", content: "구별 호가·실거래 세 줄로 나눔", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "전세가율러", holdingLabel: "관심종목", content: "전환 압력≠대출 가능", createdAt: T08 + 1200000, likes: 4 },
  ],
  9283: [
    { id: 1, nickname: "세제일정러", holdingLabel: "관심", content: "실거주·투자 목적부터 서류로", createdAt: T08 + 600000, likes: 5 },
    { id: 2, nickname: "고지서시뮬", holdingLabel: "관심종목", content: "공시가 시뮬레이션 전에 급매 금지", createdAt: T08 + 1200000, likes: 4 },
  ],
  9270: [
    { id: 1, nickname: "갭투자경계", holdingLabel: "관심종목", content: "보증금 올리면 임차만 더 조여요. 매물 수부터", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "가계약부터 걸라는 말이 나올 정도면 수급이 기울어진 거죠", createdAt: T07 + 1200000, likes: 4 },
  ],
  9271: [
    { id: 1, nickname: "서울러", holdingLabel: "관심", content: "전세>매매 상승이면 전세가율도 같이 봐야", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "정책워처", holdingLabel: "관심", content: "강남은 매매 위축·전세 강세 조합이 자주 나와요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9272: [
    { id: 1, nickname: "실수요자", holdingLabel: "관심", content: "매물 실종이면 호가 협상력이 집주인으로 가요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "입주 물량 달력도 같이 적어둘게요", createdAt: T07 + 1200000, likes: 4 },
  ],
  9273: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "법안 확정 전 감세 잔치로 읽으면 위험해요", createdAt: T07 + 600000, likes: 5 },
    { id: 2, nickname: "실수요자", holdingLabel: "관심", content: "실거주 전환 압력이 전세 매물을 더 줄일 수 있음", createdAt: T07 + 1200000, likes: 4 },
  ],
  9257: [
    { id: 1, nickname: "세무사보", holdingLabel: "관심종목", content: "국회에서 또 바뀔 수 있어요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "실수요자", holdingLabel: "관심종목", content: "상한 150%도 같이 계산해야죠", createdAt: T04 + 1199000, likes: 4 },
  ],
  9258: [
    { id: 1, nickname: "공동명의", holdingLabel: "관심종목", content: "6억×2도 요건이 있어요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "전입일정", holdingLabel: "관심종목", content: "실거주 서류부터", createdAt: T04 + 1199000, likes: 4 },
  ],
  9259: [
    { id: 1, nickname: "금융상품", holdingLabel: "관심종목", content: "계좌 유인이 생길 수는 있어요", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "시행령대기", holdingLabel: "관심종목", content: "한도 확정 전엔 단정 금지", createdAt: T04 + 1199000, likes: 4 },
  ],
  9260: [
    { id: 1, nickname: "양도세", holdingLabel: "관심종목", content: "거주 8%만 남는 구조로 이해", createdAt: T04 + 600000, likes: 5 },
    { id: 2, nickname: "캘린더", holdingLabel: "관심종목", content: "매각 시점을 당겨야 할 수도", createdAt: T04 + 1199000, likes: 4 },
  ],
  9253: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "공급 수사 vs LTV·DSR 실행 분리", createdAt: T03 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "유가 충격이 주담대 심리에도", createdAt: T03 + 1200_000, likes: 3 },
  ],
  9254: [
    { id: 1, nickname: "전세러", holdingLabel: "관심", content: "입주 물량·FOMC 전후 점검", createdAt: T03 - 600_000, likes: 4 },
    { id: 2, nickname: "대출상담", holdingLabel: "관심", content: "전세대출 규제가 수요 제한", createdAt: T03 - 300_000, likes: 3 },
  ],
  9255: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "wealth effect에 shock 겹치면 관망", createdAt: T03 - 1800_000, likes: 4 },
    { id: 2, nickname: "세제확인", holdingLabel: "관심", content: "10년 4.8%면 주담대 부담", createdAt: T03 - 1200_000, likes: 3 },
  ],
  9256: [
    { id: 1, nickname: "서울러", holdingLabel: "관심", content: "서울·경기·지방 분리 기록", createdAt: T03 - 3000_000, likes: 4 },
    { id: 2, nickname: "실수요", holdingLabel: "관심", content: "shock 구간에선 거래량 선행", createdAt: T03 - 2400_000, likes: 3 },
  ],
  9244: [
    { id: 1, nickname: "실수요", holdingLabel: "관심", content: "구별로 온도 차 큰 날 맞습니다.", createdAt: T02 + 600_000, likes: 4 },
    { id: 2, nickname: "전세대출", holdingLabel: "관심", content: "FOMC 전엔 관망 거래 늘기 쉽죠.", createdAt: T02 + 1200_000, likes: 3 },
  ],
  9245: [
    { id: 1, nickname: "대출상담", holdingLabel: "관심", content: "9월 입주 일정 먼저 확인하겠습니다.", createdAt: T02 - 600_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "LTV·DSR이 수요를 바로 제한합니다.", createdAt: T02 - 300_000, likes: 3 },
  ],
  9246: [
    { id: 1, nickname: "세제확인", holdingLabel: "관심", content: "거래량 없으면 가격만 보면 오해하기 쉽습니다.", createdAt: T02 - 1800_000, likes: 4 },
    { id: 2, nickname: "실수요", holdingLabel: "관심", content: "급매물 늘면 하방 신호일 수 있어요.", createdAt: T02 - 1200_000, likes: 3 },
  ],
  9247: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "시행령 바뀌는지부터 볼게요.", createdAt: T02 - 3000_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "공급 수사랑 규제 숫자는 시간 축이 다릅니다.", createdAt: T02 - 2400_000, likes: 3 },
  ],
  9248: [
    { id: 1, nickname: "GTX기대", holdingLabel: "관심", content: "철도 일정이 가격에 반영되는 시차가 있어요.", createdAt: T02 - 4200_000, likes: 4 },
    { id: 2, nickname: "경기거주", holdingLabel: "관심", content: "외곽은 입주 물량 체크가 먼저입니다.", createdAt: T02 - 3600_000, likes: 3 },
  ],
  9249: [
    { id: 1, nickname: "부산러", holdingLabel: "관심", content: "해운대·센텀은 버티는데 외곽은 다릅니다.", createdAt: T02 - 5400_000, likes: 4 },
    { id: 2, nickname: "제주민", holdingLabel: "관심", content: "관광 수요는 계절성이 커요.", createdAt: T02 - 4800_000, likes: 3 },
  ],

  9233: [
    { id: 1, nickname: "강남권", holdingLabel: "관심", content: "강남·마포만 올라도 서울 평균은 올라 보여요. 구별로 봐야죠.", createdAt: T01 + 600_000, likes: 4 },
    { id: 2, nickname: "실수요준비", holdingLabel: "관심", content: "FOMC 전이라 반등이 지속될지는 미지수네요.", createdAt: T01 + 1200_000, likes: 3 },
  ],
  9234: [
    { id: 1, nickname: "경기남부", holdingLabel: "관심", content: "분당·판교는 서울이랑 비슷하게 움직이는데 외곽은 다릅니다.", createdAt: T01 - 600_000, likes: 4 },
    { id: 2, nickname: "입주추적", holdingLabel: "관심", content: "9월 입주 물량이 경기 전세에 더 크게 올 수 있어요.", createdAt: T01 - 0, likes: 3 },
  ],
  9235: [
    { id: 1, nickname: "해운대", holdingLabel: "관심", content: "해운대·센텀은 버티는데 북구·서구는 약해요.", createdAt: T01 - 1800_000, likes: 4 },
    { id: 2, nickname: "지방관망", holdingLabel: "관심", content: "거래량 얇으면 한 건에도 지수가 흔들립니다.", createdAt: T01 - 1200_000, likes: 3 },
  ],
  9236: [
    { id: 1, nickname: "제주전세", holdingLabel: "관심", content: "관광 수요랑 실거주 수요가 섞여서 해석이 어렵네요.", createdAt: T01 - 3000_000, likes: 4 },
    { id: 2, nickname: "이전수요", holdingLabel: "관심", content: "본토에서 내려오는 수요가 있는지도 봐야죠.", createdAt: T01 - 2400_000, likes: 3 },
  ],
  9237: [
    { id: 1, nickname: "송도", holdingLabel: "관심", content: "GTX 기대 있는 구역은 관망 속에도 문의는 들어온다더라고요.", createdAt: T01 - 4200_000, likes: 4 },
    { id: 2, nickname: "경기남부", holdingLabel: "관심", content: "인천은 서울·경기랑 같이 묶지 말고 따로 보는 게 맞습니다.", createdAt: T01 - 3600_000, likes: 3 },
  ],
  9238: [
    { id: 1, nickname: "수도권비교", holdingLabel: "관심", content: "대구는 금리에 더 민감하게 반응하는 느낌이에요.", createdAt: T01 - 5400_000, likes: 4 },
    { id: 2, nickname: "지방거래", holdingLabel: "관심", content: "거래량 적으면 급매 한 건에도 지수가 흔들려요.", createdAt: T01 - 4800_000, likes: 3 },
  ],
  9229: [
    { id: 1, nickname: "전세대출", holdingLabel: "관심", content: "FOMC 결과가 전세 심리 좌우하겠네요.", createdAt: T01 + 600_000, likes: 4 },
    { id: 2, nickname: "실수요준비", holdingLabel: "관심", content: "입주 물량이 변수 맞습니다.", createdAt: T01 + 1200_000, likes: 3 },
  ],
  9230: [
    { id: 1, nickname: "대출걱정", holdingLabel: "관심", content: "세금 부담에 FOMC까지 겹치면 관망이 길어지죠.", createdAt: T01 - 1800_000, likes: 4 },
    { id: 2, nickname: "실수요자", holdingLabel: "관심", content: "보합~ -0.1% 구간 맞네요.", createdAt: T01 - 1200_000, likes: 3 },
  ],
  9231: [
    { id: 1, nickname: "정책워처", holdingLabel: "관심", content: "공급 수사만으로는 단기 가격 안 잡혀요.", createdAt: T01 - 4200_000, likes: 4 },
    { id: 2, nickname: "전세러", holdingLabel: "관심", content: "LTV·DSR 규제가 더 직접적이죠.", createdAt: T01 - 3600_000, likes: 3 },
  ],
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
