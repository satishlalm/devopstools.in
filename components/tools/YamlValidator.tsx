"use client";
import { useState } from "react";
import yaml from "js-yaml";

export default function YamlValidator({ k8s = false }: { k8s?: boolean }) {
  const [input, setInput] = useState(
    k8s
      ? "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: web\nspec:\n  replicas: 2\n  selector:\n    matchLabels:\n      app: web\n  template:\n    metadata:\n      labels:\n        app: web\n    spec:\n      containers:\n        - name: web\n          image: nginx:1.27\n"
      : "service: api\nreplicas: 3\nports:\n  - 8080\n"
  );
  const [result, setResult] = useState<{ ok: boolean; lines: string[] } | null>(null);

  const validate = () => {
    const lines: string[] = [];
    let docs: unknown[] = [];
    try {
      docs = yaml.loadAll(input);
    } catch (e: unknown) {
      const err = e as { message?: string; mark?: { line: number; column: number } };
      const loc = err.mark ? ` at line ${err.mark.line + 1}, column ${err.mark.column + 1}` : "";
      setResult({ ok: false, lines: [`Syntax error${loc}: ${err.message?.split("\n")[0] ?? "invalid YAML"}`] });
      return;
    }
    if (k8s) {
      docs.forEach((doc, i) => {
        const d = doc as Record<string, unknown> | null;
        const tag = docs.length > 1 ? `Document ${i + 1}: ` : "";
        if (!d || typeof d !== "object") { lines.push(`${tag}empty or non-object document`); return; }
        for (const field of ["apiVersion", "kind", "metadata"]) {
          if (!(field in d)) lines.push(`${tag}missing required field "${field}"`);
        }
        const meta = d.metadata as Record<string, unknown> | undefined;
        if (meta && !meta.name && !meta.generateName) lines.push(`${tag}metadata.name is missing`);
        if (d.kind === "Deployment") {
          const spec = d.spec as Record<string, unknown> | undefined;
          if (!spec?.selector) lines.push(`${tag}Deployment requires spec.selector`);
          if (!spec?.template) lines.push(`${tag}Deployment requires spec.template`);
        }
      });
    }
    setResult(lines.length ? { ok: false, lines } : { ok: true, lines: [`✓ Valid ${k8s ? "Kubernetes manifest" : "YAML"} (${docs.length} document${docs.length === 1 ? "" : "s"})`] });
  };

  return (
    <div className="space-y-4">
      <textarea className="input min-h-[280px]" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} aria-label="YAML input" />
      <button className="btn-primary" onClick={validate}>Validate</button>
      {result && (
        <ul className={`rounded-lg border p-3 font-mono text-sm ${result.ok ? "border-accent/40 bg-accent/10 text-accent" : "border-red-500/40 bg-red-500/10 text-red-500"}`}>
          {result.lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
      )}
    </div>
  );
}
