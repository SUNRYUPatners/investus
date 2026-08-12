import { permanentRedirect } from "next/navigation";

/** 구 URL — 기초·대가 콘텐츠는 /learn 심화 가이드로 통합 */
export default function StudyRedirect() {
  permanentRedirect("/learn");
}
