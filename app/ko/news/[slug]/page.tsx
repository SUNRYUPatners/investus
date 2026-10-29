import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { articleMetadata, articleJsonLd } from "@/lib/articleSeo";
import { NewsChrome, ArticleFull } from "@/components/news/NewsUI";

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllArticles()
    .slice(0, 40)
    .map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return { robots: { index: false, follow: false } };
  return articleMetadata(a, "ko");
}

export default async function ArticlePageKo({ params }: Props) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) notFound();
  return (
    <NewsChrome locale="ko" altHref={`/news/${a.slug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(a, "ko")) }}
      />
      <ArticleFull a={a} locale="ko" />
    </NewsChrome>
  );
}
