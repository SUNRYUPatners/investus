import { NextRequest, NextResponse } from "next/server";
import { oauthCanonicalSiteUrl } from "@/lib/auth/siteUrl";

export async function GET(req: NextRequest) {
  const clientId = process.env.NAVER_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Naver login not configured" }, { status: 501 });
  }

  const siteUrl = oauthCanonicalSiteUrl();
  const redirectUri = `${siteUrl}/api/auth/naver/callback`;
  const state = crypto.randomUUID();

  const naverUrl = new URL("https://nid.naver.com/oauth2.0/authorize");
  naverUrl.searchParams.set("response_type", "code");
  naverUrl.searchParams.set("client_id", clientId);
  naverUrl.searchParams.set("redirect_uri", redirectUri);
  naverUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(naverUrl.toString());
  res.cookies.set("naver_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
    domain: process.env.NODE_ENV === "production" ? ".investus.kr" : undefined,
  });
  return res;
}
