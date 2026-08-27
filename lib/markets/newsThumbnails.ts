import type { MarketId } from "./types";

/** RSS 썸네일 없을 때 카테고리·시장별 대체 이미지 */
export function newsFallbackImage(
  market: MarketId,
  category: string,
): string {
  if (market === "kr-re" || category === "부동산") return "/images/news/realestate.svg";
  if (category === "정책") return "/images/news/policy.svg";
  if (category === "한국증시") return "/images/news/kr-stock.svg";
  if (category === "암호화폐") return "/images/news/crypto.svg";
  if (category === "현물") return "/images/news/gold.svg";
  if (market === "safe") return "/images/news/gold.svg";
  if (market === "kr") return "/images/news/kr-stock.svg";
  return "/images/news/market.svg";
}
