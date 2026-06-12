export type ContentType = "lecture" | "book" | "report" | "post"

export type CreatorHolding = {
  symbol: string
  name: string
  allocation: number  // percent of portfolio
  avgReturn: number   // % gain on position
}

export type CreatorContent = {
  id: string
  type: ContentType
  title: string
  description: string
  thumbnail: string   // emoji
  createdAt: string
  duration?: string   // for lectures
  pages?: number      // for books
  likeCount: number
  viewCount: number
  isPremium?: boolean // requires subscription when creator.subscriptionEnabled
  body?: string       // ebook full text content
  pdfPath?: string    // Supabase Storage path for PDF (e.g. "email/contentId.pdf")
  fileLabel?: string  // original PDF filename (display only)
}

export type Creator = {
  id: string
  nickname: string
  avatar: string
  coverGradient: string
  bio: string
  tags: string[]
  followerCount: number
  annualReturn: number
  totalReturn: number
  inceptionDate: string
  isVerified: boolean
  accountBroker: string
  portfolio: CreatorHolding[]
  contents: CreatorContent[]
  subscriptionEnabled?: boolean  // club leader opt-in to paid tier
  subscriptionPrice?: number     // monthly price in KRW (e.g., 5900)
}

export const CREATORS: Creator[] = []

export function getCreator(id: string): Creator | undefined {
  return CREATORS.find((c) => c.id === id)
}

export function contentTypeLabel(t: ContentType): string {
  return { lecture: "강의", book: "전자책", report: "리포트", post: "게시글" }[t]
}
