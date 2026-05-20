import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest, getAdminSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// DELETE /api/auth/delete-account  — requires JWT
// Removes all user data: wall posts, comments, creator verification, Supabase auth account.
export async function DELETE(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) {
    return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  }

  const admin = getAdminSupabase();

  try {
    // 1. Delete wall posts
    await admin.from("wall_posts").delete().eq("user_id", authUser.email);

    // 2. Delete wall comments
    await admin.from("wall_comments").delete().eq("user_id", authUser.email);

    // 3. Delete creator verification record
    await admin.from("creator_verifications").delete().eq("phone", authUser.email);

    // 4. Delete the Supabase auth user (must be last)
    const { error: deleteError } = await admin.auth.admin.deleteUser(authUser.id);
    if (deleteError) {
      return NextResponse.json({ error: "계정 삭제 중 오류가 발생했습니다." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "계정 삭제 중 오류가 발생했습니다." }, { status: 500 });
  }
}
