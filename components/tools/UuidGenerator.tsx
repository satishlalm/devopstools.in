"use client";
import { useState } from "react";
import CopyButton from "./CopyButton";

export default function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState<string[]>([]);
  const gen = () => setIds(Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => crypto.randomUUID()));
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-2">
        <label className="block text-sm font-medium">
          How many
          <input className="input mt-1 w-28" type="number" min={1} max={100} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
        <button className="btn-primary" onClick={gen}>Generate</button>
        {ids.length > 0 && <CopyButton text={ids.join("\n")} />}
      </div>
      {ids.length > 0 && (
        <pre className="card overflow-x-auto p-4 font-mono text-sm text-primary">{ids.join("\n")}</pre>
      )}
    </div>
  );
}
