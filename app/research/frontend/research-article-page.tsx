import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResearchArticle,
  getResearchArticles,
} from "@/app/research/backend";
import { absoluteUrl } from "@/shared/config/site";
import { ResearchCta } from "@/shared/frontend/components/research-cta";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createPageMetadata } from "@/shared/seo/metadata";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  organizationSchema,
} from "@/shared/seo/schema";

export type ResearchArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateResearchArticleStaticParams() {
  const articles = await getResearchArticles();
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateResearchArticleMetadata({
  params,
}: ResearchArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getResearchArticle(slug);

  if (!article) return {};

  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/research/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    authors: [article.author],
  });
}

export async function ResearchArticlePage({
  params,
}: ResearchArticlePageProps) {
  const { slug } = await params;
  const article = await getResearchArticle(slug);

  if (!article) notFound();

  const { Content } = article;
  const publishedAt = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(article.publishedAt));
  const articlePath = `/research/${article.slug}`;
  const articleSchema = {
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@id": organizationSchema["@id"] },
    mainEntityOfPage: absoluteUrl(articlePath),
    image: absoluteUrl("/og.png"),
    inLanguage: "en",
  };
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: article.title, path: articlePath },
  ]);

  return (
    <div className="site-shell research-article-shell">
      <JsonLd data={createSchemaGraph([articleSchema, breadcrumbSchema])} />
      <SiteHeader />
      <main>
        <header className="research-article-hero section-pad">
          <Link className="service-back-link" href="/research">
            <span aria-hidden="true">←</span> All research
          </Link>
          <p className="eyebrow">
            <span className="status-dot" aria-hidden="true" />
            {article.category}
          </p>
          <h1>{article.title}</h1>
          <p className="research-article-excerpt">{article.excerpt}</p>
          <div className="research-article-meta">
            <span>{article.author}</span>
            <time dateTime={article.publishedAt}>{publishedAt}</time>
          </div>
        </header>

        <article className="research-article section-pad">
          <Content />
        </article>

        <ResearchCta />
      </main>

      <SiteFooter context={`Research / ${article.category}`} />
    </div>
  );
}
