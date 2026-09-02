const BANNED_PATTERNS = [
  /수익\s*(보장|확실|100%)/i,
  /절대\s*(수익|안전|손실\s*없)/i,
  /https?:\/\/(?!investus\.kr)/i,
];

export function isSessionChatBanned(text: string): boolean {
  return BANNED_PATTERNS.some((re) => re.test(text));
}
