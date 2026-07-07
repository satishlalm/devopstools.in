"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { TOOLS, CATEGORIES, type Category } from "@/lib/tools";
import ToolCard from "./ToolCard";

export default function ToolsBrowser() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState<Category | "All">((params.get("category") as Category) ?? "All");

  const filtered = useMemo(() => {
    const needle = q.toLowerCase();
    return TOOLS.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        (!needle || t.name.toLowerCase().includes(needle) || t.keywords.some((k) => k.includes(needle)))
    );
  }, [q, cat]);

  return (
    <div className="space-y-6">
      <input
        className="input max-w-md"
        placeholder="Search tools..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search tools"
      />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
        {(["All", ...CATEGORIES.map((c) => c.id)] as const).map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c as Category | "All")}
            className={`btn !px-3 !py-1.5 text-xs font-mono ${cat === c ? "bg-primary text-white" : "btn-ghost"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="muted font-mono text-xs">{filtered.length} tool{filtered.length === 1 ? "" : "s"}</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => <ToolCard key={t.slug} tool={t} />)}
      </div>
      {filtered.length === 0 && (
        <div className="card p-8 text-center">
          <p className="font-semibold">No tools match that search.</p>
          <p className="muted mt-1 text-sm">Try a broader term, or suggest the tool via the contact page.</p>
        </div>
      )}
    </div>
  );
}
