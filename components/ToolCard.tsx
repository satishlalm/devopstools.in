import Link from "next/link";
import type { Tool } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="card group block p-4 transition-colors hover:border-primary">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-primary">{tool.category}</span>
        {tool.isNew && <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">NEW</span>}
      </div>
      <h3 className="mt-2 font-semibold group-hover:text-primary">{tool.name}</h3>
      <p className="muted mt-1 line-clamp-2 text-sm">{tool.description}</p>
    </Link>
  );
}
