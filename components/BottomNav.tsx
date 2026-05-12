"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/",       emoji: "📊", label: "홈" },
  { href: "/search", emoji: "🔍", label: "검색" },
  { href: "/wall",   emoji: "💬", label: "종목이야기" },
  { href: "/insight",emoji: "💡", label: "인사이트" },
  { href: "/more",   emoji: "···", label: "더보기" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 border-t"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="max-w-[480px] mx-auto flex items-stretch h-16">
        {navItems.map(({ href, emoji, label }) => {
          const isActive = href === "/"
            ? pathname === "/"
            : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1"
              style={{ color: isActive ? "var(--mint)" : "var(--muted)" }}
            >
              <span
                className="text-[22px] leading-none"
                style={{ filter: isActive ? "drop-shadow(0 0 6px var(--mint))" : "none" }}
              >
                {emoji}
              </span>
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
