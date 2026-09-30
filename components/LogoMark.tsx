const SIZES = {
  sm: "w-8 h-8 rounded-lg",
  md: "w-9 h-9 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
  xl: "w-16 h-16 rounded-2xl",
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
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Investus"
      className={`${SIZES[size]} object-cover flex-shrink-0 ${className}`}
      style={{
        boxShadow: shadow ? "0 8px 24px rgba(10, 10, 35, 0.35)" : undefined,
      }}
    />
  );
}
