"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

export default function JsonFormatter() {
  const [input, setInput] = useState("{\n  \"service\": \"api\",\n  \"replicas\": 3\n}");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const run = (mode: "beautify" | "minify" | "validate") => {
    try {
      const parsed = JSON.parse(input);
      setError("");
      if (mode === "beautify") setOutput(JSON.stringify(parsed, null, 2));
      else if (mode === "minify") setOutput(JSON.stringify(parsed));
      else setOutput("✓ Valid JSON");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      const m = msg.match(/position (\d+)/);
      if (m) {
        const pos = Number(m[1]);
        const before = input.slice(0, pos);
        const line = before.split("\n").length;
        const col = pos - before.lastIndexOf("\n");
        setError(`${msg} (line ${line}, column ${col})`);
      } else setError(msg);
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <textarea className="input min-h-[200px]" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} aria-label="JSON input" />
      <div className="flex flex-wrap gap-2">
        <button className="btn-primary" onClick={() => run("beautify")}>Beautify</button>
        <button className="btn-ghost" onClick={() => run("minify")}>Minify</button>
        <button className="btn-ghost" onClick={() => run("validate")}>Validate</button>
      </div>
      {error && <p className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 font-mono text-sm text-red-500">{error}</p>}
      {output && (
        <div className="card p-3">
          <div className="flex justify-end"><CopyButton text={output} /></div>
          <pre className="overflow-x-auto font-mono text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
}
