import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const { name, phone, level, amount, message } = body as Record<string, string>;

  if (!name?.trim() || !phone?.trim() || !level?.trim()) {
    return NextResponse.json({ error: "필수 항목 누락" }, { status: 400 });
  }

  if (name.trim().length > 50 || phone.trim().length > 20 || level.trim().length > 100) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }
  if ((amount?.trim().length ?? 0) > 100 || (message?.trim().length ?? 0) > 500) {
    return NextResponse.json({ error: "입력값이 너무 깁니다" }, { status: 400 });
  }

  const supabase = createClient(url, key);

  const { error } = await supabase.from("edu_applications").insert([{
    name:    name.trim(),
    phone:   phone.trim(),
    level:   level.trim(),
    amount:  amount?.trim() ?? null,
    message: message?.trim() ?? null,
  }]);

  if (error) {
    console.error("edu_apply insert error:", error.message);
    return NextResponse.json({ error: "저장 실패. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
