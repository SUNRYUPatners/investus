import { redirect } from "next/navigation";

// The paid 1:1 course (and its performance claims) has been removed. Investus is
// ad-supported with no paid products; investment education now lives in the free
// /learn hub. A permanent redirect is also configured in next.config.ts.
export default function EducationPage() {
  redirect("/learn");
}
