import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Investus 인베스트어스 — 미국주식 투자 플랫폼";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#07091a",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow circles */}
        <div style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,160,0.07) 0%, transparent 70%)",
          top: "-100px",
          left: "-100px",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          bottom: "-100px",
          right: "-80px",
          display: "flex",
        }} />

        {/* Logo + Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px", marginBottom: "28px" }}>
          {/* App icon */}
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            background: "#0a0f1e",
            border: "2px solid rgba(0,229,160,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {/* TrendingUp arrow SVG */}
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
              <polyline points="3,17 9,11 13,15 21,7" stroke="#00e5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="15,7 21,7 21,13" stroke="#00e5a0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Text */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1,
            }}>
              Investus
            </span>
            <span style={{
              fontSize: "26px",
              color: "#00e5a0",
              fontWeight: "600",
              marginTop: "6px",
              letterSpacing: "1px",
            }}>
              인베스트어스
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: "30px",
          color: "rgba(255,255,255,0.5)",
          fontWeight: "400",
          letterSpacing: "0.5px",
        }}>
          미국주식 실시간 분석 · 리포트 · 투자 커뮤니티
        </div>

        {/* Bottom tag pills */}
        <div style={{
          display: "flex",
          gap: "12px",
          marginTop: "36px",
        }}>
          {["S&P 500", "나스닥", "실시간 시세", "AI 분석", "투자 리포트"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                background: "rgba(0,229,160,0.08)",
                border: "1px solid rgba(0,229,160,0.2)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{
          position: "absolute",
          bottom: "32px",
          right: "40px",
          fontSize: "22px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.5px",
        }}>
          investus.kr
        </div>
      </div>
    ),
    { ...size },
  );
}
