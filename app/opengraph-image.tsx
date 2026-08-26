import { ImageResponse } from "next/og";

// Edge는 1MB 한도 — next/og 번들이 Hobby 한도를 넘김. Node 런타임으로 생성.
export const runtime     = "nodejs";
export const alt         = "Investus 인베스트어스 — AI 기반 WM 핀테크";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#b38f38";
const NAVY = "#1a365d";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#f3f4f7",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(179,143,56,0.14) 0%, transparent 70%)`,
          top: "-100px",
          left: "-100px",
          display: "flex",
        }} />
        <div style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(16,32,60,0.10) 0%, transparent 70%)`,
          bottom: "-100px",
          right: "-80px",
          display: "flex",
        }} />

        <div style={{ display: "flex", alignItems: "center", gap: "28px", marginBottom: "28px" }}>
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            background: NAVY,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <svg width="58" height="58" viewBox="0 0 24 24" fill="none">
              <polyline points="3,17 9,11 13,15 21,7" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="15,7 21,7 21,13" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{
              fontSize: "72px",
              fontWeight: "800",
              color: NAVY,
              letterSpacing: "-1px",
              lineHeight: 1,
            }}>
              Investus
            </span>
            <span style={{
              fontSize: "26px",
              color: GOLD,
              fontWeight: "600",
              marginTop: "6px",
              letterSpacing: "1px",
            }}>
              인베스트어스
            </span>
          </div>
        </div>

        <div style={{
          fontSize: "30px",
          color: "rgba(18,24,38,0.55)",
          fontWeight: "400",
          letterSpacing: "0.5px",
        }}>
          글로벌 자산(주식·암호화폐·금·부동산) · AI 리포트 · WM 인사이트
        </div>

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
                background: "rgba(179,143,56,0.12)",
                border: "1px solid rgba(179,143,56,0.32)",
                color: NAVY,
                fontSize: "20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div style={{
          position: "absolute",
          bottom: "32px",
          right: "40px",
          fontSize: "22px",
          color: "rgba(18,24,38,0.35)",
          letterSpacing: "0.5px",
        }}>
          investus.kr
        </div>
      </div>
    ),
    { ...size },
  );
}
