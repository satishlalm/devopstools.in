"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

export default function UrlTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className="space-y-4">
      <textarea className="input min-h-[120px]" placeholder="https://example.com/path?q=hello world" value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} aria-label="Input" />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => setOutput(encodeURIComponent(input))}>Encode</button>
        <button className="btn-ghost" onClick={() => { try { setOutput(decodeURIComponent(input)); } catch { setOutput("Not a valid percent-encoded string."); } }}>Decode</button>
      </div>
      {output && (
        <div className="card p-3">
          <div className="flex justify-end"><CopyButton text={output} /></div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
}
