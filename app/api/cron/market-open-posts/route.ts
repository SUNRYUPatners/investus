import { NextRequest, NextResponse } from "next/server";

// ──────────────────────────────────────────────────────────────────────────
// DISABLED (AdSense compliance).
//
// This endpoint previously used an LLM to generate discussion/analyst posts
// under fabricated human analyst personas ("여의도 매 #33" etc.) and inserted
// them into `wall_posts`, `wall_comments`, `analyst_posts` and
// `analyst_post_comments`. Presenting AI-generated content as if written by
// real human analysts violates Google AdSense policy and undermines E-E-A-T,
// so the generation has been removed entirely and the cron schedules were
// deleted from `vercel.json`.
//
// The route is kept as an explicit no-op so any lingering scheduler or bookmark
// receives a clear 410 instead of silently regenerating fake content.
//
// To purge previously generated rows, see the SQL in the pull request
// description (delete wall_posts/analyst_posts rows for the bot user_ids and
// the fabricated analyst aliases).
// ──────────────────────────────────────────────────────────────────────────

export const dynamic = "force-static";

function disabled() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      reason:
        "Fake-persona post generation has been permanently disabled for AdSense compliance.",
    },
    { status: 410 },
  );
}

export function GET(_req: NextRequest) {
  return disabled();
}

export function POST(_req: NextRequest) {
  return disabled();
}
