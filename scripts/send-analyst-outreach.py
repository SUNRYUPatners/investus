#!/usr/bin/env python3
"""
Investus — 애널리스트 크리에이터 모집 이메일 자동 발송 스크립트

사용법:
  1. Gmail App Password 발급: 구글 계정 > 보안 > 2단계 인증 > 앱 비밀번호
  2. 아래 GMAIL_APP_PASSWORD 변수에 발급받은 16자리 비밀번호 입력
  3. python3 scripts/send-analyst-outreach.py 실행

발송 속도: 메일 1통당 3초 간격 (스팸 필터 우회)
총 수신자: 130명 (KB·신한·하나·삼성·미래에셋·NH·대신·유안타)
"""

import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ── 설정 ──────────────────────────────────────────────
SENDER_EMAIL = "sunryupatners@gmail.com"
GMAIL_APP_PASSWORD = "korr iqun rwuu hoip"
DELAY_SECONDS = 3
# ─────────────────────────────────────────────────────

RECIPIENTS = [
    # ══════════════════════════════════════════════════
    # KB증권 리서치본부 (35명)
    # ══════════════════════════════════════════════════
    {"name": "김동원", "firm": "KB증권", "sector": "반도체/전기전자",        "email": "jeff.kim@kbfg.com"},
    {"name": "이은택", "firm": "KB증권", "sector": "주식투자전략",            "email": "et.lee@kbfg.com"},
    {"name": "김민규", "firm": "KB증권", "sector": "국내퀀트",                "email": "mingyu.kim@kbfg.com"},
    {"name": "하인환", "firm": "KB증권", "sector": "주식시황/파생",           "email": "inhwan.ha@kbfg.com"},
    {"name": "권희진", "firm": "KB증권", "sector": "매크로",                  "email": "heejin.gweon@kbfg.com"},
    {"name": "류진이", "firm": "KB증권", "sector": "매크로/한국경제",         "email": "jinleecon@kbfg.com"},
    {"name": "임재균", "firm": "KB증권", "sector": "채권",                    "email": "jk.lim@kbfg.com"},
    {"name": "박문현", "firm": "KB증권", "sector": "신용채권",                "email": "mh.park@kbfg.com"},
    {"name": "김일혁", "firm": "KB증권", "sector": "선진국투자전략",          "email": "holistic@kbfg.com"},
    {"name": "안소은", "firm": "KB증권", "sector": "미국주식시황",            "email": "se.ahn@kbfg.com"},
    {"name": "오재영", "firm": "KB증권", "sector": "원자재/FX",               "email": "jaeyoung.oh@kbfg.com"},
    {"name": "지세진", "firm": "KB증권", "sector": "상업용부동산",            "email": "sejin.ji@kbfg.com"},
    {"name": "박수현", "firm": "KB증권", "sector": "아시아투자전략",          "email": "shpark@kbfg.com"},
    {"name": "김승민", "firm": "KB증권", "sector": "아시아주식",              "email": "seungmin__kim@kbfg.com"},
    {"name": "노승국", "firm": "KB증권", "sector": "아시아주식",              "email": "seongguk.roh@kbfg.com"},
    {"name": "강승건", "firm": "KB증권", "sector": "금융/보험/핀테크",        "email": "cygun101@kbfg.com"},
    {"name": "이창민", "firm": "KB증권", "sector": "스마트폰/2차전지소재",    "email": "cm.lee@kbfg.com"},
    {"name": "장문준", "firm": "KB증권", "sector": "건설/리츠",               "email": "moonjoon.chang@kbfg.com"},
    {"name": "전우제", "firm": "KB증권", "sector": "정유/화학/2차전지",       "email": "wchun@kbfg.com"},
    {"name": "정동익", "firm": "KB증권", "sector": "조선/기계/방산",          "email": "newday@kbfg.com"},
    {"name": "최용현", "firm": "KB증권", "sector": "미디어",                  "email": "yonghyun.choi@kbfg.com"},
    {"name": "류은애", "firm": "KB증권", "sector": "음식료",                  "email": "eunae.ryu@kbfg.com"},
    {"name": "손민영", "firm": "KB증권", "sector": "화장품",                  "email": "minyoung.son@kbfg.com"},
    {"name": "성현동", "firm": "KB증권", "sector": "스몰캡",                  "email": "hdsung@kbfg.com"},
    {"name": "김선봉", "firm": "KB증권", "sector": "스몰캡",                  "email": "seonbong.kim@kbfg.com"},
    {"name": "강성진", "firm": "KB증권", "sector": "자동차/운송/모빌리티",    "email": "seongjin.kang@kbfg.com"},
    {"name": "이지은", "firm": "KB증권", "sector": "인터넷/게임",             "email": "je.lee@kbfg.com"},
    {"name": "김세환", "firm": "KB증권", "sector": "글로벌기업분석",          "email": "usa@kbfg.com"},
    {"name": "유중호", "firm": "KB증권", "sector": "글로벌기업분석",          "email": "yoojh@kbfg.com"},
    {"name": "박유안", "firm": "KB증권", "sector": "ETF",                     "email": "youan_park@kbfg.com"},
    {"name": "임정은", "firm": "KB증권", "sector": "시황컨설팅/디지털투자정보","email": "jungeun.lim@kbfg.com"},
    {"name": "태윤선", "firm": "KB증권", "sector": "시황컨설팅/디지털투자정보","email": "ystae@kbfg.com"},
    {"name": "김지원", "firm": "KB증권", "sector": "가상자산",                "email": "jw.kim@kbfg.com"},
    {"name": "김준섭", "firm": "KB증권", "sector": "통신/ESG",                "email": "joonsop.analyst@kbfg.com"},
    {"name": "정혜정", "firm": "KB증권", "sector": "유틸리티/ESG",            "email": "hyejung.jung@kbfg.com"},

    # ══════════════════════════════════════════════════
    # 신한투자증권 (17명)
    # ══════════════════════════════════════════════════
    {"name": "윤창용", "firm": "신한투자증권", "sector": "리서치본부장/투자전략",     "email": "cyyoon@shinhan.com"},
    {"name": "이병화", "firm": "신한투자증권", "sector": "기업분석/스몰캡",           "email": "bh.lee@shinhan.com"},
    {"name": "은경완", "firm": "신한투자증권", "sector": "은행/지주회사",             "email": "kw.eun@shinhan.com"},
    {"name": "임희연", "firm": "신한투자증권", "sector": "보험/증권",                 "email": "heeyeon.lim@shinhan.com"},
    {"name": "최승환", "firm": "신한투자증권", "sector": "스몰캡/비상장",             "email": "hani86@shinhan.com"},
    {"name": "허성규", "firm": "신한투자증권", "sector": "스몰캡/비상장",             "email": "sqheo@shinhan.com"},
    {"name": "김유민", "firm": "신한투자증권", "sector": "스몰캡/비상장",             "email": "yumin.kim@shinhan.com"},
    {"name": "엄민용", "firm": "신한투자증권", "sector": "제약/바이오",               "email": "my.eom@shinhan.com"},
    {"name": "이호철", "firm": "신한투자증권", "sector": "제약/바이오",               "email": "hclee1129@shinhan.com"},
    {"name": "오강호", "firm": "신한투자증권", "sector": "IT부품/전기전자",           "email": "snowKH@shinhan.com"},
    {"name": "김형태", "firm": "신한투자증권", "sector": "반도체/글로벌IT",           "email": "calebkim@shinhan.com"},
    {"name": "박현우", "firm": "신한투자증권", "sector": "디스플레이/반도체소부장",   "email": "phw@shinhan.com"},
    {"name": "최원석", "firm": "신한투자증권", "sector": "중국기업분석",              "email": "ws.choi@shinhan.com"},
    {"name": "이주은", "firm": "신한투자증권", "sector": "글로벌산업재",              "email": "junelee@shinhan.com"},
    {"name": "함형도", "firm": "신한투자증권", "sector": "글로벌신재생에너지",        "email": "hd.ham@shinhan.com"},
    {"name": "심지현", "firm": "신한투자증권", "sector": "글로벌IT S/W",             "email": "simjin@shinhan.com"},
    {"name": "하헌호", "firm": "신한투자증권", "sector": "글로벌전통에너지/헬스케어", "email": "hhh704@shinhan.com"},

    # ══════════════════════════════════════════════════
    # 하나증권 (33명)
    # ══════════════════════════════════════════════════
    {"name": "이재만",  "firm": "하나증권", "sector": "국내외 주식전략(선진국)", "email": "duke7594@hanafn.com"},
    {"name": "김두언",  "firm": "하나증권", "sector": "국내외 주식시황",         "email": "kimdooun@hanafn.com"},
    {"name": "전규연",  "firm": "하나증권", "sector": "경제/매크로",              "email": "kychun@hanafn.com"},
    {"name": "박준우",  "firm": "하나증권", "sector": "채권전략",                 "email": "junoopark@hanafn.com"},
    {"name": "김경환",  "firm": "하나증권", "sector": "중국/신흥국투자전략",      "email": "khstyle11@hanafn.com"},
    {"name": "김성은",  "firm": "하나증권", "sector": "중국주식분석",             "email": "seongeunk@hanafn.com"},
    {"name": "박승진",  "firm": "하나증권", "sector": "Global ETF",              "email": "sj81.park@hanafn.com"},
    {"name": "윤재성",  "firm": "하나증권", "sector": "에너지/화학",              "email": "js.yoon@hanafn.com"},
    {"name": "김록호",  "firm": "하나증권", "sector": "반도체/소부장",            "email": "roko.kim@hanafn.com"},
    {"name": "최정욱",  "firm": "하나증권", "sector": "은행",                     "email": "cuchoi@hanafn.com"},
    {"name": "박성봉",  "firm": "하나증권", "sector": "철강금속",                 "email": "sbpark@hanafn.com"},
    {"name": "송선재",  "firm": "하나증권", "sector": "자동차/부품",              "email": "sunjae.song@hanafn.com"},
    {"name": "허성우",  "firm": "하나증권", "sector": "해외채권",                 "email": "deanheo@hanafn.com"},
    {"name": "이영주",  "firm": "하나증권", "sector": "자산배분/해외크레딧",      "email": "leeyoungju@hanafn.com"},
    {"name": "김근아",  "firm": "하나증권", "sector": "글로벌매크로",             "email": "geunak@hanafn.com"},
    {"name": "유재선",  "firm": "하나증권", "sector": "에너지/유틸리티",          "email": "jaeseon.yoo@hanafn.com"},
    {"name": "김민경",  "firm": "하나증권", "sector": "기업분석",                 "email": "inkyung.kim@hanafn.com"},
    {"name": "이기훈",  "firm": "하나증권", "sector": "기업분석",                 "email": "sacredkh@hanafn.com"},
    {"name": "김홍식",  "firm": "하나증권", "sector": "통신/미디어",              "email": "pro11@hanafn.com"},
    {"name": "김승준",  "firm": "하나증권", "sector": "기업분석",                 "email": "sjunkim@hanafn.com"},
    {"name": "심은주",  "firm": "하나증권", "sector": "보험",                     "email": "yesej01@hanafn.com"},
    {"name": "박찬솔",  "firm": "하나증권", "sector": "기업분석",                 "email": "chansolpark@hanafn.com"},
    {"name": "김형준",  "firm": "하나증권", "sector": "에너지/화학 RA",           "email": "do200508@hanafn.com"},
    {"name": "고찬결",  "firm": "하나증권", "sector": "보험 RA",                  "email": "cgko@hanafn.com"},
    {"name": "윤채리",  "firm": "하나증권", "sector": "기업분석 RA",              "email": "yooncherry@hanafn.com"},
    {"name": "정소영",  "firm": "하나증권", "sector": "은행 RA",                  "email": "soyoungjung@hanafn.com"},
    {"name": "김영규",  "firm": "하나증권", "sector": "반도체 RA",               "email": "kyg1019@hanafn.com"},
    {"name": "신민건",  "firm": "하나증권", "sector": "ETF RA",                  "email": "mingun.shin@hanafn.com"},
    {"name": "박성제",  "firm": "하나증권", "sector": "주식전략 RA",              "email": "parksungjae@hanafn.com"},
    {"name": "김승규",  "firm": "하나증권", "sector": "철강금속 RA",              "email": "sgkim@hanafn.com"},
    {"name": "성무규",  "firm": "하나증권", "sector": "에너지 RA",               "email": "mukyu.sung@hanafn.com"},
    {"name": "김현수",  "firm": "하나증권", "sector": "기업분석 RA",              "email": "hyunsookim@hanafn.com"},
    {"name": "이상훈",  "firm": "하나증권", "sector": "통신 RA",                  "email": "sanghunlee0121@hanafn.com"},

    # ══════════════════════════════════════════════════
    # 삼성증권 (11명)
    # ══════════════════════════════════════════════════
    {"name": "이종욱",  "firm": "삼성증권", "sector": "반도체/Tech팀장",         "email": "jwstar.lee@samsung.com"},
    {"name": "임은혜",  "firm": "삼성증권", "sector": "ETP전략팀장",             "email": "e0124.lim@samsung.com"},
    {"name": "전균",    "firm": "삼성증권", "sector": "ETP/파생",                "email": "gyun.jun@samsung.com"},
    {"name": "한수진",  "firm": "삼성증권", "sector": "ETP",                     "email": "su.jin.han@samsung.com"},
    {"name": "김재우",  "firm": "삼성증권", "sector": "금융/소비재팀장",         "email": "jaewoo.kim@samsung.com"},
    {"name": "정민기",  "firm": "삼성증권", "sector": "금융/소비재",             "email": "mingi.jeong@samsung.com"},
    {"name": "윤희재",  "firm": "삼성증권", "sector": "금융 RA",                 "email": "heejae23.yoon@samsung.com"},
    {"name": "김지만",  "firm": "삼성증권", "sector": "글로벌채권",              "email": "jiman8.kim@samsung.com"},
    {"name": "양일우",  "firm": "삼성증권", "sector": "글로벌투자전략",          "email": "iw.yang@samsung.com"},
    {"name": "서지현",  "firm": "삼성증권", "sector": "Tech/로봇",               "email": "jihyeon.seo@samsung.com"},
    {"name": "김경빈",  "firm": "삼성증권", "sector": "반도체 RA",               "email": "kyoungbeen.kim@samsung.com"},

    # ══════════════════════════════════════════════════
    # 미래에셋증권 (2명)
    # ══════════════════════════════════════════════════
    {"name": "차유미",  "firm": "미래에셋증권", "sector": "기업분석",            "email": "yumi_cha@miraeasset.com"},
    {"name": "정태준",  "firm": "미래에셋증권", "sector": "기업분석",            "email": "taejoon.jeong@miraeasset.com"},

    # ══════════════════════════════════════════════════
    # NH투자증권 (3명)
    # ══════════════════════════════════════════════════
    {"name": "심의섭",  "firm": "NH투자증권", "sector": "제약/바이오",           "email": "esshim@nhqv.com"},
    {"name": "황지현",  "firm": "NH투자증권", "sector": "제약/바이오",           "email": "jh.whang@nhqv.com"},
    {"name": "목진원",  "firm": "NH투자증권", "sector": "제약/바이오 RA",        "email": "namuh.mok@nhqv.com"},

    # ══════════════════════════════════════════════════
    # 대신증권 (2명)
    # ══════════════════════════════════════════════════
    {"name": "이경민",  "firm": "대신증권", "sector": "주식전략",                "email": "kyoungmin.lee@daishin.com"},
    {"name": "정해창",  "firm": "대신증권", "sector": "글로벌전략",              "email": "haechang.chung@daishin.com"},

    # ══════════════════════════════════════════════════
    # 유안타증권 (1명)
    # ══════════════════════════════════════════════════
    {"name": "최현재",  "firm": "유안타증권", "sector": "리서치센터장",          "email": "hyunjae.choi@yuantakorea.com"},
]


def build_email(recipient: dict) -> MIMEMultipart:
    name   = recipient["name"]
    firm   = recipient["firm"]
    sector = recipient["sector"]

    subject = f"[INVESTUS] {name} 애널리스트님께 — 크리에이터 파트너 초대드립니다"

    body = f"""안녕하세요, {name} 애널리스트님.

저는 SUNRYU Partners의 CIO 류선규입니다.

저희는 개인 투자자를 위한 투자 인사이트 플랫폼 **INVESTUS(investus.kr)**를 운영하고 있습니다.
{firm}에서 {sector} 분야를 담당하고 계신 {name} 애널리스트님께 크리에이터 파트너를 제안드리고자 연락드렸습니다.


━━━━━━━━━━━━━━━━━━━━━━━━
  INVESTUS 크리에이터 파트너 제안
━━━━━━━━━━━━━━━━━━━━━━━━

■ 하실 수 있는 것
  - {sector} 분야에 대한 리포트·견해를 자유롭게 게시
  - 형식 제한 없음 — 짧은 코멘트부터 심층 분석까지
  - 기존 리서치 업무와 병행 가능 (주 1회 이상 권장)
  - 익명 또는 실명 선택 가능

■ 크리에이터 수익 구조
  - 구독자가 프리미엄 플랜 가입 시 → 기여도 비율로 수익 배분
  - 팔로워 수 증가에 따른 추가 인센티브
  - 투명한 정산 리포트 월간 제공

■ 플랫폼 현황
  - 국내·미국 증시 실시간 데이터 + AI 인사이트 통합
  - 종목별 토론방 및 리포트 피드 운영 중
  - 크리에이터 전용 대시보드 제공

■ 지원 방법
  아래 링크에서 간단한 신청서 작성 후 제출해 주시면
  48시간 내 답변 드리겠습니다.

  → https://investus.kr/creator/setup


{name} 애널리스트님의 {sector} 전문성이 개인 투자자들에게 큰 도움이 될 것이라 확신합니다.

바쁘신 중에 읽어주셔서 감사합니다.
궁금하신 점은 언제든 이 메일로 회신해 주시기 바랍니다.


류선규 드림
CIO, SUNRYU Partners
sunryupatners@gmail.com
https://investus.kr
"""

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = f"류선규 (INVESTUS) <{SENDER_EMAIL}>"
    msg["To"]      = recipient["email"]
    msg["Reply-To"] = SENDER_EMAIL
    msg.attach(MIMEText(body, "plain", "utf-8"))
    return msg


def main():
    if GMAIL_APP_PASSWORD == "YOUR_APP_PASSWORD_HERE":
        print("❌ GMAIL_APP_PASSWORD를 설정해주세요.")
        print("   구글 계정 → 보안 → 2단계 인증 → 앱 비밀번호 (16자리)")
        print(f"\n   총 발송 예정: {len(RECIPIENTS)}명")
        return

    print(f"📧 총 {len(RECIPIENTS)}명에게 발송 시작...\n")
    print(f"   증권사별: KB({sum(1 for r in RECIPIENTS if 'KB' in r['firm'])}) "
          f"신한({sum(1 for r in RECIPIENTS if '신한' in r['firm'])}) "
          f"하나({sum(1 for r in RECIPIENTS if '하나' in r['firm'])}) "
          f"삼성({sum(1 for r in RECIPIENTS if '삼성' in r['firm'])}) "
          f"미래에셋({sum(1 for r in RECIPIENTS if '미래에셋' in r['firm'])}) "
          f"NH({sum(1 for r in RECIPIENTS if 'NH' in r['firm'])}) "
          f"대신({sum(1 for r in RECIPIENTS if '대신' in r['firm'])}) "
          f"유안타({sum(1 for r in RECIPIENTS if '유안타' in r['firm'])})\n")

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.ehlo()
        server.starttls()
        server.login(SENDER_EMAIL, GMAIL_APP_PASSWORD)
        print("✅ Gmail SMTP 연결 성공\n")
    except Exception as e:
        print(f"❌ Gmail 연결 실패: {e}")
        return

    success, failed = 0, []

    def reconnect():
        s = smtplib.SMTP("smtp.gmail.com", 587)
        s.ehlo(); s.starttls()
        s.login(SENDER_EMAIL, GMAIL_APP_PASSWORD)
        return s

    for i, recipient in enumerate(RECIPIENTS, 1):
        try:
            msg = build_email(recipient)
            try:
                server.sendmail(SENDER_EMAIL, recipient["email"], msg.as_string())
            except (smtplib.SMTPServerDisconnected, smtplib.SMTPConnectionError, OSError):
                print(f"  ⚠️  연결 끊김 — 재연결 중...")
                server = reconnect()
                server.sendmail(SENDER_EMAIL, recipient["email"], msg.as_string())
            print(f"  [{i:03d}/{len(RECIPIENTS)}] ✅ {recipient['name']} ({recipient['firm']}/{recipient['sector']}) → {recipient['email']}")
            success += 1
        except Exception as e:
            print(f"  [{i:03d}/{len(RECIPIENTS)}] ❌ {recipient['name']} → {e}")
            failed.append(recipient["email"])

        if i < len(RECIPIENTS):
            time.sleep(DELAY_SECONDS)

    try:
        server.quit()
    except Exception:
        pass

    print(f"\n{'━'*50}")
    print(f"  완료: {success}명 성공 / {len(failed)}명 실패")
    print(f"  예상 소요 시간: {len(RECIPIENTS) * DELAY_SECONDS // 60}분 {len(RECIPIENTS) * DELAY_SECONDS % 60}초")
    if failed:
        print(f"  실패 목록: {', '.join(failed)}")
    print(f"{'━'*50}")


if __name__ == "__main__":
    main()
