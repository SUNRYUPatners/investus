const WALL_NICKS = [
  "칠천피존버", "반도체장기", "나스닥야행", "배당수확자", "금리추적러",
  "테슬라존버", "엔비디아매수", "삼전존버", "하이닉스팬", "외인수급러",
  "단타왕초보", "장기투자자", "옵션감시", "실적시즌", "매크로덕후",
  "익명_2847", "익명_5193", "익명_7301", "익명_0428", "익명_6612",
  "강남호랑이", "여의도독수리", "판교올빼미", "을지로황소", "광화문여우",
];

export function pickSessionNick(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0x7fffffff;
  }
  return WALL_NICKS[hash % WALL_NICKS.length];
}
