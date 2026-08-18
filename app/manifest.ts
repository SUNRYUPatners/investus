import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Investus — 인베스트어스",
    short_name: "Investus",
    description: "미국 주식 시장 실시간 정보 앱",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#07090e",
    theme_color: "#10203c",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["finance", "business"],
  };
}
