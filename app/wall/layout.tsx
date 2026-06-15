import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://investus.kr/wall" },
};

export default function WallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
