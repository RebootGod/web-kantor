import ResearchPage from "@/features/research/frontend/research-page";
import { createPageMetadata } from "@/shared/seo/metadata";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Read Forsecure security research, technical articles, company insights, and project field notes.",
  path: "/research",
});

export default ResearchPage;
