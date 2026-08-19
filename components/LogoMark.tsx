import { TrendingUp } from "lucide-react";

const SIZES = {
  sm: { box: "w-8 h-8 rounded-lg", icon: "w-4 h-4" },
  md: { box: "w-9 h-9 rounded-xl", icon: "w-[18px] h-[18px]" },
  lg: { box: "w-14 h-14 rounded-2xl", icon: "w-7 h-7" },
  xl: { box: "w-16 h-16 rounded-2xl", icon: "w-8 h-8" },
} as const;

export function LogoMark({
  size = "md",
  className = "",
  shadow = false,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  shadow?: boolean;
}) {
  const s = SIZES[size];
  return (
    <div
      className={`${s.box} flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        background: "var(--logo-bg)",
        boxShadow: shadow ? "0 8px 24px rgba(var(--logo-bg-rgb),0.35)" : undefined,
      }}
    >
      <TrendingUp className={s.icon} style={{ color: "var(--logo-icon)" }} strokeWidth={2.5} />
    </div>
  );
}
