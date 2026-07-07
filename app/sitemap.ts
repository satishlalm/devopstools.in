import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { ARTICLES } from "@/lib/blog";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://devopstools.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = ["", "/tools", "/categories", "/blog", "/about", "/contact", "/privacy", "/terms"].map((p) => ({
    url: `${SITE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const tools = TOOLS.map((t) => ({ url: `${SITE}/tools/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  const posts = ARTICLES.filter((a) => a.published).map((a) => ({ url: `${SITE}/blog/${a.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...statics, ...tools, ...posts];
}
