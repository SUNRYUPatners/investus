import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  alternates: await localizedAlternates("/more/terms"),
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
