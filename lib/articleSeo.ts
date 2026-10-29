import type { Metadata } from "next";
import type { Article, ArticleLocale } from "./articles";
import { pickText } from "./articles";

export const SITE_URL = "https://www.investus.kr";

export function localePath(locale: ArticleLocale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? clean : `/ko${clean}`;
}

/** Build hreflang alternates (en default + ko + x-default) for a given path. */
export function hreflangAlternates(path: string, locale: ArticleLocale): Metadata["alternates"] {
  const enUrl = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const koUrl = `${SITE_URL}/ko${path.startsWith("/") ? path : `/${path}`}`;
  const canonical = locale === "en" ? enUrl : koUrl;
  return {
    canonical,
    languages: {
      en: enUrl,
      ko: koUrl,
      "x-default": enUrl,
    },
  };
}

function plainDescription(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

export function articleMetadata(a: Article, locale: ArticleLocale): Metadata {
  const t = pickText(a, locale);
  const path = `/news/${a.slug}`;
  const alternates = hreflangAlternates(path, locale);
  const image = (locale === "en" ? a.imagesEn[0] : a.images[0]) ?? "/icons/icon-512.png";
  const isKo = locale === "ko";
  const title = `${t.title} | Investus`;
  const description = plainDescription(t.summary);
  return {
    title,
    description,
    alternates,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: t.title,
      description,
      url: `${SITE_URL}${locale === "en" ? path : `/ko${path}`}`,
      siteName: "Investus",
      locale: isKo ? "ko_KR" : "en_US",
      type: "article",
      publishedTime: `${a.date}T00:00:00+09:00`,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title: t.title, description, images: [image] },
  };
}

export function articleJsonLd(a: Article, locale: ArticleLocale) {
  const t = pickText(a, locale);
  const url = `${SITE_URL}${locale === "en" ? "" : "/ko"}/news/${a.slug}`;
  const image = (locale === "en" ? a.imagesEn[0] : a.images[0]);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: t.title,
    description: plainDescription(t.summary, 300),
    datePublished: `${a.date}T00:00:00+09:00`,
    dateModified: `${a.date}T00:00:00+09:00`,
    inLanguage: locale === "en" ? "en" : "ko-KR",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(image ? { image: [`${SITE_URL}${image}`] } : {}),
    author: {
      "@type": "Organization",
      name: "Investus Editorial",
      url: `${SITE_URL}${locale === "en" ? "" : "/ko"}/news/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Investus",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png` },
    },
    isAccessibleForFree: true,
  };
}
