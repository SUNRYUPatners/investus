import type { AnalystMockPost, AnalystMockComment } from "@/lib/analystPosts";

export const MOCK_ANALYST_POSTS_KR: AnalystMockPost[] = [
  {
    id: -1901, alias: "여의도 너구리 #11", symbol: "삼성전자",
    content: "삼성전자는 수급과 메모리 업황을 같이 보시면 됩니다.\n외국인 순매수가 이어지면 지수 방어력이 생깁니다.",
    likes: 14, comments: 1, created_at: "2026-08-26T06:00:00.000Z", liked: false,
  },
  {
    id: -1902, alias: "판교 치타 #22", symbol: "SK하이닉스",
    content: "하이닉스는 HBM 기대가 이미 큽니다.\n출하·판가 확인 전엔 변동성을 각오하세요.",
    likes: 12, comments: 1, created_at: "2026-08-26T06:10:00.000Z", liked: false,
  },
  {
    id: -1903, alias: "삼성동 여우 #08", symbol: "현대차",
    content: "현대차는 미국 판매와 인센티브를 먼저 보세요.\n마진이 흔들리면 주가도 같이 흔들립니다.",
    likes: 11, comments: 0, created_at: "2026-08-26T06:20:00.000Z", liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS_KR: Record<number, AnalystMockComment[]> = {
  [-1901]: [{ alias: "관찰자", content: "시총 1위라 코스피랑 동행이 큽니다.", created_at: "2026-08-26T06:30:00.000Z" }],
};

export const MOCK_ANALYST_POSTS_SAFE: AnalystMockPost[] = [
  {
    id: -1911, alias: "온체인 매 #03", symbol: "비트코인",
    content: "비트코인은 ETF 플로우와 달러 지수를 같이 보세요.\n위험선호 날과 헤지 날이 섞입니다.",
    likes: 16, comments: 1, created_at: "2026-08-26T00:00:00.000Z", liked: false,
  },
  {
    id: -1912, alias: "금벌레 #17", symbol: "금",
    content: "금은 실질금리가 핵심입니다.\n금리가 내려가면 상대 매력이 커집니다.",
    likes: 13, comments: 0, created_at: "2026-08-26T00:15:00.000Z", liked: false,
  },
  {
    id: -1913, alias: "이더러 #44", symbol: "이더리움",
    content: "이더는 비트보다 베타가 큽니다.\n리스크온 구간에서 상대 강세를 봅니다.",
    likes: 10, comments: 1, created_at: "2026-08-26T00:30:00.000Z", liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS_SAFE: Record<number, AnalystMockComment[]> = {
  [-1911]: [{ alias: "헷지", content: "금이랑 같이 오르면 매크로 헤지 수요입니다.", created_at: "2026-08-26T00:40:00.000Z" }],
};

export const MOCK_ANALYST_POSTS_KR_RE: AnalystMockPost[] = [
  {
    id: -1921, alias: "정책워처 #01", symbol: "정책",
    content: "공급 발표는 심리를 먼저 움직입니다.\n인허가·착공 시차를 꼭 보세요.",
    likes: 15, comments: 1, created_at: "2026-08-26T01:00:00.000Z", liked: false,
  },
  {
    id: -1922, alias: "전세러 #09", symbol: "전세",
    content: "전세가 오르면 매수 전환과 월세 이동이 동시에 나옵니다.\n대출 한도가 실행을 가릅니다.",
    likes: 12, comments: 1, created_at: "2026-08-26T01:20:00.000Z", liked: false,
  },
  {
    id: -1923, alias: "강남권 #05", symbol: "서울매매",
    content: "선호지와 비선호지 온도 차가 벌어지는 구간입니다.\n평균만 보면 놓칩니다.",
    likes: 9, comments: 0, created_at: "2026-08-26T01:40:00.000Z", liked: false,
  },
];

export const MOCK_ANALYST_COMMENTS_KR_RE: Record<number, AnalystMockComment[]> = {
  [-1921]: [{ alias: "실수요", content: "세부 시행령이 나와야 거래가 살아납니다.", created_at: "2026-08-26T01:50:00.000Z" }],
};
