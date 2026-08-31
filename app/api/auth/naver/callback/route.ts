import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabase } from "@/lib/supabase";
import {
  isSupabaseUserAlreadyExists,
  oauthCanonicalSiteUrl,
} from "@/lib/auth/siteUrl";

function loginFailedRedirect(siteUrl: string, reason: string) {
  console.error(`[naver/callback] ${reason}`);
  const url = new URL(`${siteUrl}/more`);
  url.searchParams.set("login_error", "naver");
  return NextResponse.redirect(url.toString());
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const siteUrl = oauthCanonicalSiteUrl();

  // Validate CSRF state
  const storedState = req.cookies.get("naver_oauth_state")?.value;
  if (!code || !state || state !== storedState) {
    return loginFailedRedirect(siteUrl, "invalid state or missing code");
  }

  const clientId = process.env.NAVER_CLIENT_ID!;
  const clientSecret = process.env.NAVER_CLIENT_SECRET!;
  const redirectUri = `${siteUrl}/api/auth/naver/callback`;

  // 1. Exchange authorization code for Naver access token
  const tokenRes = await fetch(
    `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&client_secret=${encodeURIComponent(clientSecret)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&code=${encodeURIComponent(code)}` +
    `&state=${encodeURIComponent(state)}`,
    { cache: "no-store" }
  );
  const tokenData = await tokenRes.json() as { access_token?: string; error?: string };

  if (!tokenData.access_token) {
    return loginFailedRedirect(siteUrl, `token exchange failed: ${tokenData.error ?? "unknown"}`);
  }

  // 2. Get Naver user profile
  const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
    cache: "no-store",
  });
  const profileData = await profileRes.json() as {
    resultcode: string;
    response?: { id: string; email?: string; nickname?: string; name?: string };
  };

  const naverUser = profileData.response;
  if (!naverUser?.email) {
    return loginFailedRedirect(siteUrl, "no email in Naver profile");
  }

  const email = naverUser.email;
  const nickname = naverUser.nickname ?? naverUser.name ?? `투자자_${email.split("@")[0].slice(-4)}`;
  const naverId = naverUser.id;

  const admin = getAdminSupabase();

  // 3. Create user if not exists — 재로그인 시 「already been registered」는 정상
  const { error: createError } = await admin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { nickname, naver_id: naverId, provider: "naver" },
  });
  if (createError && !isSupabaseUserAlreadyExists(createError)) {
    return loginFailedRedirect(siteUrl, `createUser failed: ${createError.message}`);
  }

  // 4. Generate a one-time magic link to establish Supabase session
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "magiclink",
    email,
    options: { redirectTo: `${siteUrl}/auth/callback` },
  });

  if (linkError || !linkData?.properties?.hashed_token) {
    return loginFailedRedirect(siteUrl, `generateLink failed: ${linkError?.message ?? "no token"}`);
  }

  // 5. Redirect to our callback with the token_hash — callback calls verifyOtp
  const callbackUrl = new URL(`${siteUrl}/auth/callback`);
  callbackUrl.searchParams.set("token_hash", linkData.properties.hashed_token);
  callbackUrl.searchParams.set("type", "magiclink");

  const res = NextResponse.redirect(callbackUrl.toString());
  res.cookies.delete("naver_oauth_state");
  return res;
}
