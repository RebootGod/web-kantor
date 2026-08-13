import type { Metadata } from "next";
import Link from "next/link";
import { getResearchArticles } from "../../lib/research";
import { SiteHeader } from "../site-header";
import { ResearchList, type ResearchItem } from "./research-list";

export const metadata: Metadata = {
  title: "Research — ForSecure",
  description:
    "ForSecure research, technical articles, company insights, and security project write-ups.",
};

export default async function ResearchPage() {
  const articles = await getResearchArticles();
  const researchItems: ResearchItem[] = articles.map((article, index) => ({
    number: String(index + 1).padStart(2, "0"),
    slug: article.slug,
    title: article.title,
    copy: article.excerpt,
    status: new Intl.DateTimeFormat("en", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(article.publishedAt)),
    category: article.category,
    publishedAt: article.publishedAt,
  }));

  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="page-hero research-hero section-pad" aria-labelledby="research-title">
          <div>
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" />
              Research and field notes
            </p>
            <h1 id="research-title">Ideas worth sharing.</h1>
          </div>
          <p>
            A place for technical articles, company perspectives, security
            research, and notes from projects we are building or exploring.
          </p>
        </section>

        <section className="research-streams section-pad" aria-labelledby="research-streams-title">
          <div className="section-heading">
            <div>
              <p className="kicker">Latest publications</p>
              <h2 id="research-streams-title">Field notes and findings.</h2>
            </div>
            <p>
              Practical articles covering security research, company insights,
              and notes from projects we are building or exploring.
            </p>
          </div>

          {researchItems.length > 0 ? (
            <ResearchList items={researchItems} />
          ) : (
            <p className="research-empty">The first publication is being prepared.</p>
          )}
        </section>

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
          <div><b>ForSecure</b><span>Offensive Security &amp; Secure Engineering</span></div>
        </div>
        <p>Research / Articles / Projects</p>
        <p className="copyright">© {new Date().getFullYear()} ForSecure</p>
      </footer>
    </div>
  );
}
