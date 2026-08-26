import type { IndexQuote, Quote } from "@/lib/api";

/** 목업 — 실거래가 공공 API 연동 전 미리보기용. 출처 라벨: KB부동산 추세 가정 */

export const KR_RE_INDICES: IndexQuote[] = [
  {
    symbol: "KB-SALE",
    name: "KB매매",
    fullName: "KB국민은행 매매가격지수 (목업)",
    value: 92.4,
    change: 0.18,
    changePercent: 0.19,
    sparkline: [91.8, 91.9, 92.0, 92.1, 92.15, 92.2, 92.25, 92.3, 92.4],
  },
  {
    symbol: "KB-JEONSE",
    name: "KB전세",
    fullName: "KB국민은행 전세가격지수 (목업)",
    value: 98.1,
    change: 0.32,
    changePercent: 0.33,
    sparkline: [97.4, 97.5, 97.6, 97.7, 97.8, 97.9, 98.0, 98.05, 98.1],
  },
  {
    symbol: "POLICY",
    name: "정책지수",
    fullName: "정부 주택정책 모멘텀 (목업)",
    value: 64,
    change: 4,
    changePercent: 6.7,
    sparkline: [55, 56, 58, 59, 60, 61, 62, 63, 64],
  },
];

export const KR_RE_QUOTES: Quote[] = [
  { symbol: "SEOUL-SALE", name: "서울 매매", price: 112.3, change: 0.4, changePercent: 0.36, sparkline: [111, 111.2, 111.4, 111.6, 111.8, 112, 112.1, 112.2, 112.3], volume: "—", marketCap: "—" },
  { symbol: "SEOUL-JEONSE", name: "서울 전세", price: 105.8, change: 0.6, changePercent: 0.57, sparkline: [104.5, 104.7, 104.9, 105.1, 105.3, 105.5, 105.6, 105.7, 105.8], volume: "—", marketCap: "—" },
  { symbol: "CAPITAL-SALE", name: "수도권 매매", price: 101.2, change: 0.2, changePercent: 0.2, sparkline: [100.6, 100.7, 100.8, 100.9, 101, 101.05, 101.1, 101.15, 101.2], volume: "—", marketCap: "—" },
  { symbol: "GYEONGGI-SALE", name: "경기 매매", price: 98.7, change: 0.15, changePercent: 0.15, sparkline: [98.2, 98.3, 98.4, 98.45, 98.5, 98.55, 98.6, 98.65, 98.7], volume: "—", marketCap: "—" },
  { symbol: "INCHEON-SALE", name: "인천 매매", price: 96.4, change: -0.1, changePercent: -0.1, sparkline: [96.7, 96.65, 96.6, 96.55, 96.5, 96.48, 96.45, 96.42, 96.4], volume: "—", marketCap: "—" },
  { symbol: "BUSAN-SALE", name: "부산 매매", price: 94.1, change: 0.05, changePercent: 0.05, sparkline: [93.9, 93.95, 94, 94.02, 94.04, 94.06, 94.08, 94.09, 94.1], volume: "—", marketCap: "—" },
  { symbol: "DAEGU-SALE", name: "대구 매매", price: 91.8, change: -0.2, changePercent: -0.22, sparkline: [92.4, 92.3, 92.2, 92.1, 92, 91.95, 91.9, 91.85, 91.8], volume: "—", marketCap: "—" },
  { symbol: "POLICY", name: "정책 모멘텀", price: 64, change: 4, changePercent: 6.7, sparkline: [55, 56, 58, 59, 60, 61, 62, 63, 64], volume: "—", marketCap: "—" },
];

export type RegionCell = {
  id: string;
  name: string;
  changePercent: number;
  type: "sale" | "jeonse";
};

export const KR_RE_REGIONS: RegionCell[] = [
  { id: "gangnam", name: "강남", changePercent: 0.55, type: "sale" },
  { id: "seocho", name: "서초", changePercent: 0.42, type: "sale" },
  { id: "songpa", name: "송파", changePercent: 0.38, type: "sale" },
  { id: "yongsan", name: "용산", changePercent: 0.28, type: "sale" },
  { id: "mapo", name: "마포", changePercent: 0.22, type: "sale" },
  { id: "seongdong", name: "성동", changePercent: 0.18, type: "sale" },
  { id: "nowon", name: "노원", changePercent: -0.12, type: "sale" },
  { id: "gangbuk", name: "강북", changePercent: -0.2, type: "sale" },
  { id: "bundang", name: "분당", changePercent: 0.25, type: "sale" },
  { id: "ilsan", name: "일산", changePercent: 0.08, type: "sale" },
  { id: "suwon", name: "수원", changePercent: 0.12, type: "sale" },
  { id: "incheon", name: "인천", changePercent: -0.1, type: "sale" },
  { id: "busan", name: "부산", changePercent: 0.05, type: "sale" },
  { id: "daegu", name: "대구", changePercent: -0.22, type: "sale" },
  { id: "daejeon", name: "대전", changePercent: 0.02, type: "sale" },
  { id: "gwangju", name: "광주", changePercent: -0.05, type: "sale" },
  { id: "seoul-j", name: "서울전세", changePercent: 0.57, type: "jeonse" },
  { id: "gg-j", name: "경기전세", changePercent: 0.31, type: "jeonse" },
  { id: "incheon-j", name: "인천전세", changePercent: 0.15, type: "jeonse" },
  { id: "busan-j", name: "부산전세", changePercent: 0.1, type: "jeonse" },
];

export const KR_RE_POLICIES = [
  {
    title: "공급 확대 패키지",
    body: "도심 공공주택·재건축 규제 완화 논의가 이어지며 대기 매수 심리가 일부 회복되고 있습니다.",
  },
  {
    title: "전세 대출 · DSR",
    body: "전세자금대출과 DSR 한도 조정이 실수요 전세 수요에 직접 영향을 주는 구간입니다.",
  },
  {
    title: "세제 · 다주택",
    body: "보유세·양도세 완화 여부가 매물 출회와 거래량을 좌우하는 핵심 변수입니다.",
  },
];
