import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, byCategory } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tool Categories",
  description: "DevOps tool categories: Linux, Kubernetes, Docker, Terraform, AWS, networking, security and developer utilities — all free and browser-based.",
};

export default function CategoriesPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CATEGORIES.map((c) => {
          const tools = byCategory(c.id);
          return (
            <div key={c.id} className="card p-5">
              <h2 className="font-mono text-lg font-bold text-primary">{c.id}</h2>
              <p className="muted mt-1 text-sm">{c.blurb}</p>
              <ul className="mt-3 space-y-1 text-sm">
                {tools.slice(0, 5).map((t) => (
                  <li key={t.slug}><Link href={`/tools/${t.slug}`} className="hover:text-accent">→ {t.name}</Link></li>
                ))}
              </ul>
              <Link href={`/tools?category=${c.id}`} className="mt-3 inline-block text-sm text-primary hover:underline">
                All {tools.length} {c.id} tools →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
