"use client";
import { useMemo, useState } from "react";
import CopyButton from "./CopyButton";

function decodeSegment(seg: string) {
  const b64 = seg.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(
    atob(b64).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
  );
  return JSON.parse(json);
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const result = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "A JWT has three dot-separated segments: header.payload.signature" };
    try {
      const header = decodeSegment(parts[0]);
      const payload = decodeSegment(parts[1]);
      let expiry: { label: string; ok: boolean } | null = null;
      if (typeof payload.exp === "number") {
        const expDate = new Date(payload.exp * 1000);
        const ok = expDate.getTime() > Date.now();
        expiry = { label: `${ok ? "Expires" : "Expired"} ${expDate.toLocaleString()}`, ok };
      }
      return { header, payload, expiry };
    } catch {
      return { error: "Could not decode token — segments must be valid base64url JSON." };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">Decoding happens entirely in your browser. The token is never sent to a server.</p>
      <textarea className="input min-h-[120px]" placeholder="Paste a JWT (eyJhbGciOi...)" value={token} onChange={(e) => setToken(e.target.value)} spellCheck={false} aria-label="JWT input" />
      {result && "error" in result && result.error && <p className="font-mono text-sm text-red-500">{result.error}</p>}
      {result && "header" in result && (
        <div className="space-y-4">
          {result.expiry && (
            <p className={`rounded-lg p-3 font-mono text-sm ${result.expiry.ok ? "border border-accent/40 bg-accent/10 text-accent" : "border border-red-500/40 bg-red-500/10 text-red-500"}`}>
              {result.expiry.ok ? "✓ " : "✗ "}{result.expiry.label}
            </p>
          )}
          {(["header", "payload"] as const).map((k) => (
            <div key={k} className="card p-3">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs uppercase muted">{k}</h3>
                <CopyButton text={JSON.stringify(result[k], null, 2)} />
              </div>
              <pre className="mt-2 overflow-x-auto font-mono text-sm text-primary">{JSON.stringify(result[k], null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
