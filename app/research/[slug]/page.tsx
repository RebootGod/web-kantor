import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getResearchArticle,
  getResearchArticles,
} from "../../../lib/research";
import { SiteHeader } from "../../site-header";

type ResearchArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getResearchArticles();
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ResearchArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getResearchArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} — Forsecure Research`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} — Forsecure Research`,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function ResearchArticlePage({
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

  return (
    <div className="site-shell research-article-shell">
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

        <section className="research-contact section-pad">
          <div>
            <p className="kicker kicker-dark">Work with us</p>
            <h2>Have a security problem worth exploring?</h2>
          </div>
          <Link className="button button-primary" href="/contact">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark brand-mark-small" aria-hidden="true"><span>F</span><span>S</span></span>
          <div><b>Forsecure</b><span>Offensive Security &amp; Secure Engineering</span></div>
        </div>
        <p>Research / {article.category}</p>
        <p className="copyright">© {new Date().getFullYear()} Forsecure</p>
      </footer>
    </div>
  );
}
