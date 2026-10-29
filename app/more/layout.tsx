import type { Metadata } from "next";
import { localizedAlternates } from "@/lib/localeMeta";

export async function generateMetadata(): Promise<Metadata> {
  return {
  alternates: await localizedAlternates("/more"),
  };
}

export default function MoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
