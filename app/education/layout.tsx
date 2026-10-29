import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  alternates: await localizedAlternates("/education"),
  };
}

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
