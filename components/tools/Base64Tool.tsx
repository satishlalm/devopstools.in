"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try { setOutput(btoa(unescape(encodeURIComponent(input)))); setError(""); }
    catch { setError("Could not encode this input."); }
  };
  const decode = () => {
    try { setOutput(decodeURIComponent(escape(atob(input.trim())))); setError(""); }
    catch { setError("Not valid Base64."); }
  };

  return (
    <div className="space-y-4">
      <textarea className="input min-h-[140px]" placeholder="Text or Base64..." value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} aria-label="Input" />
      <div className="flex gap-2">
        <button className="btn-primary" onClick={encode}>Encode</button>
        <button className="btn-ghost" onClick={decode}>Decode</button>
      </div>
      {error && <p className="font-mono text-sm text-red-500">{error}</p>}
      {output && (
        <div className="card p-3">
          <div className="flex justify-end"><CopyButton text={output} /></div>
          <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm">{output}</pre>
        </div>
      )}
    </div>
  );
}
