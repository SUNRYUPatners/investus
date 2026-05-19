"use client";

import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  {
    title: "제1조 (목적)",
    body: '이 약관은 Investus(이하 "서비스")가 제공하는 미국주식 투자 정보 서비스의 이용과 관련하여 서비스와 이용자 사이의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
  },
  {
    title: "제2조 (정의)",
    body: '"서비스"란 Investus가 운영하는 모바일 앱 및 웹 플랫폼을 통해 제공하는 미국주식 시세·뉴스·포트폴리오 관리 등 제반 서비스를 의미합니다.\n"이용자"란 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 개인 또는 법인을 말합니다.',
  },
  {
    title: "제3조 (약관의 효력 및 변경)",
    body: "본 약관은 서비스 화면에 게시하거나 이용자에게 공지함으로써 효력이 발생합니다. 서비스는 필요한 경우 약관을 변경할 수 있으며, 변경 시 사전 공지합니다. 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.",
  },
  {
    title: "제4조 (서비스 제공 및 변경)",
    body: "서비스는 미국주식 시세 정보, 관련 뉴스, 포트폴리오 관리 기능 등을 제공합니다. 서비스의 내용은 운영상·기술상 필요에 따라 변경될 수 있으며, 이 경우 변경 내용을 사전에 공지합니다.",
  },
  {
    title: "제5조 (서비스 중단)",
    body: "서비스는 시스템 점검, 보수, 교체, 고장 또는 통신 두절 등 부득이한 사유 발생 시 일시적으로 서비스 제공을 중단할 수 있습니다. 서비스 중단으로 인해 발생한 손해에 대해 서비스는 귀책사유가 없는 한 책임을 지지 않습니다.",
  },
  {
    title: "제6조 (이용자의 의무)",
    body: "이용자는 본 약관 및 관련 법령을 준수하여야 합니다. 이용자는 서비스가 제공하는 정보를 투자 권유로 해석하거나 이를 근거로 투자 결정을 내려서는 안 됩니다. 서비스 내 정보를 무단으로 복제·배포하거나 상업적으로 이용하는 행위는 금지됩니다.",
  },
  {
    title: "제7조 (유료 구독 및 결제)",
    body: "서비스는 월 ₩5,900의 유료 구독 서비스를 제공합니다. 구독 시 AI 질문 무제한 이용 및 전체 리포트 열람 권한이 부여됩니다.\n구독은 결제일로부터 1개월 단위로 자동 갱신되며, 이용자는 언제든지 구독을 해지할 수 있습니다.\n결제는 현재 관리자 승인 방식으로 처리됩니다. 향후 자동 결제 시스템이 도입될 경우 별도 공지합니다.\n구독 해지 후에는 해당 결제 기간 종료 시까지 서비스를 이용할 수 있습니다.",
  },
  {
    title: "제8조 (환불 정책)",
    body: "구독 결제 후 7일 이내에 서비스를 전혀 이용하지 않은 경우 전액 환불을 요청할 수 있습니다.\n이미 리포트 열람 또는 AI 질문 기능을 사용한 경우 환불이 제한될 수 있습니다.\n환불 요청은 서비스 내 문의하기 또는 이메일(sunryupatners@gmail.com)로 접수해 주세요.\n결제 오류 등 서비스 귀책 사유로 인한 경우 즉시 전액 환불합니다.",
  },
  {
    title: "제9조 (지적재산권)",
    body: "서비스가 제공하는 콘텐츠(디자인, UI, 소프트웨어, 데이터 등)에 대한 지적재산권은 서비스 또는 해당 권리자에게 귀속됩니다. 이용자는 서비스의 서면 허락 없이 이를 복제·수정·배포·판매할 수 없습니다.",
  },
  {
    title: "제10조 (책임 제한)",
    body: "서비스가 제공하는 시세·뉴스 등 각종 정보는 참고용으로만 제공됩니다. 서비스는 정보의 정확성·완전성을 보증하지 않으며, 이를 근거로 한 투자 결정과 그 결과에 대해 일체의 책임을 지지 않습니다.",
  },
  {
    title: "제11조 (준거법 및 분쟁 해결)",
    body: "본 약관은 대한민국 법률에 따라 해석되고 적용됩니다. 서비스 이용과 관련하여 분쟁이 발생한 경우 서비스 운영자의 주소지를 관할하는 법원을 제1심 관할 법원으로 합니다.",
  },
  {
    title: "부칙",
    body: "본 약관은 2026년 5월 18일부터 시행됩니다.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pb-safe" style={{ background: "var(--bg)" }}>
      <Header />
      <main className="max-w-[480px] lg:max-w-2xl mx-auto px-4 pb-24 lg:pb-10">
        <div className="pt-4 pb-2">
          <Link href="/more" className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--muted)" }}>
            <ChevronLeft className="w-3.5 h-3.5" /> 더보기
          </Link>
        </div>
        <h1 className="text-lg font-bold font-syne mb-1" style={{ color: "var(--text)" }}>이용약관</h1>
        <p className="text-[11px] mb-6" style={{ color: "var(--muted)" }}>최종 개정일: 2026년 5월 18일</p>

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
