"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

const ALGOS = ["SHA-256", "SHA-384", "SHA-512"] as const;

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const run = async () => {
    const data = new TextEncoder().encode(input);
    const out: Record<string, string> = {};
    for (const algo of ALGOS) {
      const buf = await crypto.subtle.digest(algo, data);
      out[algo] = Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    }
    setHashes(out);
  };

  return (
    <div className="space-y-4">
      <textarea className="input min-h-[120px]" placeholder="Text to hash..." value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} aria-label="Input" />
      <button className="btn-primary" onClick={run}>Generate hashes</button>
      {Object.entries(hashes).map(([algo, hex]) => (
        <div key={algo} className="card p-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase muted">{algo}</span>
            <CopyButton text={hex} />
          </div>
          <code className="mt-1 block break-all font-mono text-sm text-primary">{hex}</code>
        </div>
      ))}
    </div>
  );
}
