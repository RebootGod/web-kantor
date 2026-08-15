import HomePage from "@/features/homepage/frontend/homepage-page";
import { siteConfig } from "@/shared/config/site";
import { createPageMetadata } from "@/shared/seo/metadata";

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  useAbsoluteTitle: true,
});

export default HomePage;
