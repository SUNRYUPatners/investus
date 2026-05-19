import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Unique per Vercel deployment (VERCEL_GIT_COMMIT_SHA) or random on cold-start locally
const BUILD_ID =
  process.env.VERCEL_GIT_COMMIT_SHA ??
  process.env.VERCEL_DEPLOYMENT_ID ??
  Math.random().toString(36).slice(2);

export async function GET() {
  return NextResponse.json({ buildId: BUILD_ID }, {
    headers: { "Cache-Control": "no-store" },
  });
}
