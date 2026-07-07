import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TOOLS, getTool, byCategory } from "@/lib/tools";
import ToolRenderer from "@/components/tools/ToolRenderer";
import ToolCard from "@/components/ToolCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — Free Online ${tool.category} Tool`,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: { title: tool.name, description: tool.description },
    alternates: { canonical: `/tools/${tool.slug}` },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();
  const related = byCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: tool.description,
  };

  return (
    <div className="grid gap-8 py-12 lg:grid-cols-[1fr_300px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <nav className="muted font-mono text-xs" aria-label="Breadcrumb">
          <Link href="/tools" className="hover:text-primary">tools</Link> / <span>{tool.category.toLowerCase()}</span> / <span className="text-primary">{tool.slug}</span>
        </nav>
        <h1 className="mt-3 text-3xl font-bold">{tool.name}</h1>
        <p className="muted mt-2 max-w-2xl">{tool.description}</p>
        <div className="card mt-6 p-5">
          <ToolRenderer slug={tool.slug} name={tool.name} />
        </div>
      </article>
      <aside className="space-y-4">
        <AdSlot slot="sidebar" className="min-h-[250px]" />
        <h2 className="text-sm font-semibold">Related {tool.category} tools</h2>
        {related.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </aside>
    </div>
  );
}
