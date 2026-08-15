import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { evaluate } from "@mdx-js/mdx";
import matter from "gray-matter";
import * as jsxRuntime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

const RESEARCH_DIRECTORY = path.join(process.cwd(), "content", "research");

export type ResearchArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  status: "Published" | "Draft";
};

type ResearchArticleSource = ResearchArticle & {
  content: string;
};

function parseArticle(slug: string, source: string): ResearchArticleSource {
  const { data, content } = matter(source);
  const status = data.status === "Draft" ? "Draft" : "Published";

  return {
    slug,
    title: String(data.title || slug),
    excerpt: String(data.excerpt || ""),
    category: String(data.category || "Security Research"),
    publishedAt: String(data.publishedAt || ""),
    author: String(data.author || "Forsecure Research"),
    status,
    content,
  };
}

async function readArticle(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  try {
    const source = await readFile(
      path.join(RESEARCH_DIRECTORY, `${slug}.mdx`),
      "utf8",
    );
    return parseArticle(slug, source);
  } catch {
    return null;
  }
}

export async function getResearchArticles() {
  let fileNames: string[] = [];

  try {
    fileNames = await readdir(RESEARCH_DIRECTORY);
  } catch {
    return [];
  }

  const articles = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return readArticle(slug);
      }),
  );

  return articles
    .filter(
      (article): article is ResearchArticleSource =>
        article !== null && article.status === "Published",
    )
    .map((article) => {
      const { content, ...summary } = article;
      void content;
      return summary;
    })
    .sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime(),
    );
}

export async function getResearchArticle(slug: string) {
  const article = await readArticle(slug);

  if (!article || article.status !== "Published") return null;

  const compiledModule = await evaluate(article.content, {
    ...jsxRuntime,
    baseUrl: import.meta.url,
    remarkPlugins: [remarkGfm],
  });
  const { content, ...metadata } = article;
  void content;

  return {
    ...metadata,
    Content: compiledModule.default,
  };
}
