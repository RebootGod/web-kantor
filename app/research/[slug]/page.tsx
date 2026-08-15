import type { Metadata } from "next";
import {
  generateResearchArticleMetadata,
  generateResearchArticleStaticParams,
  ResearchArticlePage,
  type ResearchArticlePageProps,
} from "@/features/research/frontend/research-article-page";

export function generateStaticParams() {
  return generateResearchArticleStaticParams();
}

export function generateMetadata(
  props: ResearchArticlePageProps,
): Promise<Metadata> {
  return generateResearchArticleMetadata(props);
}

export default ResearchArticlePage;
