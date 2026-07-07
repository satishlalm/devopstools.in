import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ARTICLES, getArticle } from "@/lib/blog";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    robots: a.published ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.description,
    author: { "@type": "Organization", name: "DevOpsTools.in" },
  };
  return (
    <article className="mx-auto max-w-3xl py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="muted font-mono text-xs"><Link href="/blog" className="hover:text-primary">blog</Link> / {a.category.toLowerCase()}</nav>
      <h1 className="mt-3 text-3xl font-bold leading-tight">{a.title}</h1>
      <p className="muted mt-3">{a.description}</p>
      <div className="card mt-8 p-5">
        <h2 className="font-mono text-xs uppercase muted">In this guide</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
          {a.outline.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </div>
      <AdSlot slot="in-content" className="mt-8" />
      <div className="card mt-8 p-6 text-center">
        <p className="font-semibold">Full article coming soon</p>
        <p className="muted mt-1 text-sm">This template defines the structure and SEO metadata. Replace it with the written article (1,500+ words) before publishing — thin content hurts AdSense approval.</p>
      </div>
    </article>
  );
}
