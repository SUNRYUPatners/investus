import type { Post, Comment } from "@/lib/wallPosts";

const T = 1787698800000; // 2026-08-26 08:00 KST

/** 한국 종토방 — 심볼 자리에 종목명(한글) 사용 */
export const MOCK_POSTS_KR: Post[] = [
  { id: 9001, symbol: "삼성전자", nickname: "반도체장기", holdingLabel: "삼성전자 보유", content: "삼전은 결국 수급이 답입니다. 외국인 순매수 이어지면 코스피도 같이 갑니다.", createdAt: T, likes: 24, comments: 3 },
  { id: 9002, symbol: "SK하이닉스", nickname: "HBM러버", holdingLabel: "하이닉스 보유", content: "HBM 스토리는 살아있는 것 같아요. 다만 눈높이는 이미 높아서 조정은 각오해야죠.", createdAt: T - 3600_000, likes: 18, comments: 2 },
  { id: 9003, symbol: "현대차", nickname: "자동차매니아", holdingLabel: "현대차 관심", content: "미국 판매만 보면 되는데 인센티브가 늘면 마진이 걱정입니다.", createdAt: T - 7200_000, likes: 11, comments: 1 },
  { id: 9004, symbol: "기아", nickname: "기아매니아", holdingLabel: "기아 보유", content: "현대차랑 같이 보면 돼요. 해외 판매 믹스가 핵심입니다.", createdAt: T - 9000_000, likes: 8, comments: 1 },
  { id: 9005, symbol: "네이버", nickname: "플랫폼러", holdingLabel: "관심", content: "광고·커머스·AI를 같이 봐야 해요. 단기 테마만 쫓으면 흔들립니다.", createdAt: T - 10800_000, likes: 7, comments: 0 },
];

export const MOCK_COMMENTS_KR: Record<number, Comment[]> = {
  9001: [
    { id: 1, nickname: "지수관찰", holdingLabel: "관망", content: "시총 1위라 지수랑 동행이 세죠.", createdAt: T + 600_000, likes: 2 },
  ],
};

export const MOCK_POSTS_SAFE: Post[] = [
  { id: 9101, symbol: "비트코인", nickname: "온체인러", holdingLabel: "BTC 보유", content: "ETF 플로우가 꺾이면 단기 조정이 나와요. 중장기는 여전히 매크로 싸움.", createdAt: T, likes: 30, comments: 2 },
  { id: 9102, symbol: "이더리움", nickname: "스테이커", holdingLabel: "ETH 보유", content: "이더는 리스크온일 때 비트보다 베타가 큽니다.", createdAt: T - 1800_000, likes: 14, comments: 1 },
  { id: 9103, symbol: "금", nickname: "금벌레", holdingLabel: "금 ETF", content: "실질금리만 보면 금 방향이 보여요. 달러도 같이 보세요.", createdAt: T - 5400_000, likes: 19, comments: 1 },
  { id: 9104, symbol: "은", nickname: "실버맨", holdingLabel: "관심", content: "은은 금이랑 같이 가다가 산업수요에서 벌어지기도 해요.", createdAt: T - 7200_000, likes: 9, comments: 0 },
  { id: 9105, symbol: "솔라나", nickname: "솔러버", holdingLabel: "SOL 보유", content: "알트 중에서는 베타가 커서 비트 움직일 때 같이 보시면 됩니다.", createdAt: T - 9000_000, likes: 11, comments: 1 },
];

export const MOCK_COMMENTS_SAFE: Record<number, Comment[]> = {
  9101: [
    { id: 1, nickname: "헷지러", holdingLabel: "금+BTC", content: "금이랑 같이 가는 날은 매크로 헤지 수요입니다.", createdAt: T + 900_000, likes: 4 },
  ],
};

export const MOCK_POSTS_KR_RE: Post[] = [
  { id: 9201, symbol: "서울매매", nickname: "실수요자", holdingLabel: "전세", content: "전세가 오르니까 매수 고민이 커지는데, DSR이 막혀서 실행이 안 됩니다.", createdAt: T, likes: 22, comments: 2 },
  { id: 9202, symbol: "정책", nickname: "정책워처", holdingLabel: "관심", content: "공급 발표는 심리부터 움직입니다. 실제 착공까지는 시차가 길어요.", createdAt: T - 2400_000, likes: 16, comments: 1 },
  { id: 9203, symbol: "전세", nickname: "전세러", holdingLabel: "전세", content: "매물 줄면 보증금부터 움직입니다. 대출 한도가 실행을 가릅니다.", createdAt: T - 3600_000, likes: 12, comments: 1 },
  { id: 9204, symbol: "강남", nickname: "강남권", holdingLabel: "자가", content: "선호지랑 비선호지 온도 차가 더 벌어지는 느낌입니다.", createdAt: T - 4800_000, likes: 9, comments: 0 },
];

export const MOCK_COMMENTS_KR_RE: Record<number, Comment[]> = {
  9201: [
    { id: 1, nickname: "대출상담", holdingLabel: "관망", content: "전세대출 한도가 관건이죠.", createdAt: T + 700_000, likes: 3 },
  ],
};
