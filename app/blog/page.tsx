import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — DevOps Guides & Tutorials",
  description: "Practical guides on Kubernetes troubleshooting, Linux commands, Terraform best practices, AWS cost optimization, CI/CD and more.",
};

export default function BlogPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="muted mt-2 max-w-2xl">Field-tested guides written by engineers who carry pagers. No fluff, lots of commands.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/blog/${a.slug}`} className="card group flex flex-col p-5 transition-colors hover:border-primary">
            <span className="font-mono text-xs text-accent">{a.category} · {a.readMins} min</span>
            <h2 className="mt-2 font-semibold group-hover:text-primary">{a.title}</h2>
            <p className="muted mt-2 line-clamp-3 text-sm">{a.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
