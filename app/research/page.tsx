import { ResearchPage } from "@/app/research/frontend";
import { createPageMetadata } from "@/shared/seo/metadata";

export const metadata = createPageMetadata({
  title: "Research",
  description:
    "Read Forsecure security research, technical articles, company insights, and project field notes.",
  path: "/research",
});

export default ResearchPage;
