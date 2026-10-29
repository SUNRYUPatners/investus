import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { articleMetadata, articleJsonLd } from "@/lib/articleSeo";
import { ArticlePageFrame, ArticleFull } from "@/components/news/NewsUI";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  // Pre-render the most recent articles; the rest render on-demand via ISR.
  return getAllArticles()
    .slice(0, 40)
    .map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  // Trigger the 404 during metadata (before the body streams) so unknown slugs
  // return a real HTTP 404 instead of a soft 404 (200).
  if (!a) notFound();
  return articleMetadata(a, "en");
}

export default async function ArticlePageEn({ params }: Props) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) notFound();
  return (
    <ArticlePageFrame>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a, "en")) }}
      />
      <ArticleFull a={a} locale="en" />
    </ArticlePageFrame>
  );
}
