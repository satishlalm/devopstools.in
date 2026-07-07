"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.<>?",
};

export default function PasswordGenerator() {
  const [length, setLength] = useState(20);
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true });
  const [pw, setPw] = useState("");

  const generate = () => {
    const pool = (Object.keys(SETS) as (keyof typeof SETS)[]).filter((k) => opts[k]).map((k) => SETS[k]).join("");
    if (!pool) return;
    const bytes = new Uint32Array(length);
    crypto.getRandomValues(bytes);
    setPw(Array.from(bytes, (b) => pool[b % pool.length]).join(""));
  };

  return (
    <div className="space-y-4">
      <p className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">Generated with crypto.getRandomValues, entirely on your device.</p>
      <label className="block text-sm font-medium">
        Length: <span className="font-mono text-primary">{length}</span>
        <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="mt-2 w-full accent-[#2563EB]" />
      </label>
      <div className="flex flex-wrap gap-4 text-sm">
        {(Object.keys(SETS) as (keyof typeof SETS)[]).map((k) => (
          <label key={k} className="flex items-center gap-2 capitalize">
            <input type="checkbox" checked={opts[k]} onChange={() => setOpts({ ...opts, [k]: !opts[k] })} className="accent-[#2563EB]" />
            {k}
          </label>
        ))}
      </div>
      <button className="btn-primary" onClick={generate}>Generate password</button>
      {pw && (
        <div className="card flex items-center justify-between gap-3 p-4">
          <code className="break-all font-mono text-lg font-semibold text-accent">{pw}</code>
          <CopyButton text={pw} />
        </div>
      )}
    </div>
  );
}
