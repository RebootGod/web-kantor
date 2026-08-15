import { getResearchArticles } from "@/features/research/backend/research-repository";
import { ResearchCta } from "@/shared/frontend/components/research-cta";
import { SiteFooter } from "@/shared/frontend/components/site-footer";
import { SiteHeader } from "@/shared/frontend/components/site-header";
import { JsonLd } from "@/shared/seo/json-ld";
import { createBreadcrumbSchema, createSchemaGraph } from "@/shared/seo/schema";
import { ResearchList, type ResearchItem } from "./research-list";

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
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
  ]);

  return (
    <div className="site-shell">
      <JsonLd data={createSchemaGraph([breadcrumbSchema])} />
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

        <ResearchCta />
      </main>

      <SiteFooter context="Research / Articles / Projects" />
    </div>
  );
}
