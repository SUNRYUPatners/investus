"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "1. 개인정보 수집 항목 및 방법",
    body: "서비스는 회원가입 시 다음과 같은 최소한의 정보를 수집합니다.\n\n• 이메일/비밀번호 가입: 이메일 주소, 비밀번호(암호화 저장)\n• 소셜 로그인(Google, Kakao): 이메일 주소, 프로필 닉네임 (해당 제공자 정책에 따름)\n• 자동 수집: 서비스 이용 기록, 접속 로그, 기기 식별 정보(광고 ID), 앱 버전\n\n개인정보는 이용자가 직접 입력하는 방식 또는 서비스 이용 과정에서 자동으로 생성·수집됩니다.",
  },
  {
    title: "2. 개인정보 수집 및 이용 목적",
    body: "수집된 개인정보는 아래 목적으로만 이용됩니다.\n\n• 회원 식별 및 서비스 이용 관리\n• 맞춤형 투자 정보 및 알림 제공\n• 부정 이용 방지 및 보안 강화\n• 서비스 개선을 위한 통계·분석\n• 법적 의무 이행",
  },
  {
    title: "3. 개인정보 보유 및 이용 기간",
    body: "서비스는 회원 탈퇴 또는 개인정보 수집·이용 목적 달성 시 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 의해 보존이 필요한 경우 법령에서 정한 기간 동안 보관합니다.\n\n• 계약 또는 청약철회 등 기록: 5년 (전자상거래법)\n• 로그인 기록: 3개월 (통신비밀보호법)",
  },
  {
    title: "4. 개인정보의 제3자 제공 및 국외 이전",
    body: "서비스는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.\n\n• 이용자가 사전에 동의한 경우\n• 법령의 규정에 의거하거나 수사 기관의 요청이 있는 경우\n\n[개인정보 국외 이전]\n크리에이터 인증 신청 시 이메일 알림 발송을 위해 아래 업체에 최소한의 정보(이메일, 닉네임, 자기소개)가 전송됩니다.\n\n• 이전 받는 자: Formspree Inc.\n• 이전 국가: 미국\n• 이전 목적: 이메일 알림 전송\n• 보유 기간: 이메일 전송 완료 후 즉시 파기\n\n위 사항에 동의하지 않으실 경우 크리에이터 인증 신청이 제한될 수 있습니다.",
  },
  {
    title: "5. 개인정보 처리 위탁",
    body: "서비스는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁합니다.\n\n• Vercel Inc. (미국) — 서비스 호스팅 및 서버 운영\n• Supabase Inc. (미국) — 회원 인증 및 데이터베이스 저장\n• Upstash Inc. (미국) — 요청 횟수 제한(Rate Limiting) 처리\n• Formspree Inc. (미국) — 크리에이터 인증 신청 이메일 알림 전송 (이메일, 닉네임, 자기소개 포함)\n\n위탁 계약 시 개인정보 보호 관련 사항을 명시하고 이를 준수하도록 관리합니다. 위 업체들은 모두 미국에 서버를 두며, 해당국의 개인정보 보호 법규를 따릅니다.",
  },
  {
    title: "6. 이용자의 권리 및 행사 방법",
    body: "이용자는 언제든지 다음의 권리를 행사할 수 있습니다.\n\n• 개인정보 열람·수정 요청\n• 개인정보 처리 정지 요청\n• 개인정보 삭제(잊혀질 권리) 요청\n• 회원 탈퇴 및 계정 완전 삭제\n\n계정 삭제 시 작성한 게시글·댓글·크리에이터 인증 정보가 모두 삭제됩니다. 권리 행사는 이메일(sunryupatners@gmail.com)을 통해 가능하며, 서비스는 접수일로부터 10일 이내에 처리합니다.",
  },
  {
    title: "7. 개인정보 보호를 위한 기술·관리적 조치",
    body: "서비스는 이용자의 개인정보 보호를 위해 아래와 같은 조치를 취하고 있습니다.\n\n• 비밀번호 암호화 저장\n• 접근 권한 최소화 및 접근 로그 관리\n• 보안 취약점 정기 점검\n• 내부 관리 계획 수립 및 시행",
  },
  {
    title: "8. 쿠키 및 유사 기술 사용",
    body: "서비스는 이용자 편의 제공 및 서비스 개선을 위해 로컬 스토리지(localStorage)를 사용합니다. 저장되는 정보는 포트폴리오, 즐겨찾기 등 앱 내 설정이며 서버로 전송되지 않습니다.",
  },
  {
    title: "9. 개인정보 처리방침 변경",
    body: "본 방침이 변경되는 경우 앱 내 공지사항 또는 팝업을 통해 최소 7일 전에 사전 고지합니다. 중요한 변경이 있는 경우 별도의 동의를 받을 수 있습니다.",
  },
  {
    title: "10. 개인정보 보호 책임자",
    body: "개인정보 관련 문의·불만·피해 구제를 위한 연락처는 아래와 같습니다.\n\n• 책임자: Investus 운영팀\n• 이메일: sunryupatners@gmail.com\n• 처리 기간: 접수일로부터 10일 이내 답변",
  },
  {
    title: "부칙",
    body: "본 방침은 2026년 5월 20일부터 시행됩니다. (2026년 5월 18일 방침 대비 제4조·제5조·제6조 개정)",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 lg:pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 더보기
          </Link>
        </div>
        <h1 className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>개인정보처리방침</h1>
        <p className="text-[11px] mb-6" style={{ color: "var(--muted)" }}>최종 개정일: 2026년 5월 20일</p>

        <div className="flex flex-col gap-5">
          {SECTIONS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl p-4 border"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <p className="text-sm font-bold mb-2 font-syne" style={{ color: "var(--text)" }}>{s.title}</p>
              <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: "var(--muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
