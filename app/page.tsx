import { HomePage } from "@/app/homepage/frontend";
import { siteConfig } from "@/shared/config/site";
import { createPageMetadata } from "@/shared/seo/metadata";
import "./homepage/frontend/styles/homepage.css";

export const metadata = createPageMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  useAbsoluteTitle: true,
});

export default HomePage;
