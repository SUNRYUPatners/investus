import { permanentRedirect } from "next/navigation";

/** 구 URL — 투자 기초·대가 전략은 /learn 에 통합 */
export default function InvestmentBasicsRedirect() {
  permanentRedirect("/learn");
}
