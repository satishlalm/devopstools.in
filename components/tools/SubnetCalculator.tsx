"use client";
import { useMemo, useState } from "react";

function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const v = Number(p);
    if (!/^\d+$/.test(p) || v > 255) return null;
    n = n * 256 + v;
  }
  return n >>> 0;
}
const intToIp = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");

export default function SubnetCalculator() {
  const [cidr, setCidr] = useState("10.0.0.0/16");
  const [count, setCount] = useState(4);

  const subnets = useMemo(() => {
    const [ip, prefixStr] = cidr.split("/");
    const base = ipToInt(ip || "");
    const prefix = Number(prefixStr);
    if (base === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 30) return null;
    const bits = Math.ceil(Math.log2(Math.max(count, 1)));
    const newPrefix = prefix + bits;
    if (newPrefix > 30) return null;
    const size = 2 ** (32 - newPrefix);
    return Array.from({ length: count }, (_, i) => {
      const net = (base + i * size) >>> 0;
      return { cidr: `${intToIp(net)}/${newPrefix}`, range: `${intToIp(net + 1)} – ${intToIp(net + size - 2)}`, hosts: (size - 2).toLocaleString() };
    });
  }, [cidr, count]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Parent network
          <input className="input mt-1" value={cidr} onChange={(e) => setCidr(e.target.value)} spellCheck={false} />
        </label>
        <label className="block text-sm font-medium">
          Number of subnets
          <input className="input mt-1" type="number" min={1} max={256} value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </label>
      </div>
      {!subnets ? (
        <p className="font-mono text-sm text-red-500">Enter a valid CIDR (prefix ≤ /30) and a subnet count that fits.</p>
      ) : (
        <div className="card overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead><tr className="border-b border-token text-xs uppercase muted"><th className="p-3">Subnet</th><th className="p-3">Usable range</th><th className="p-3">Hosts</th></tr></thead>
            <tbody>
              {subnets.map((s) => (
                <tr key={s.cidr} className="border-b border-token last:border-0">
                  <td className="p-3 font-semibold text-primary">{s.cidr}</td>
                  <td className="p-3">{s.range}</td>
                  <td className="p-3">{s.hosts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
