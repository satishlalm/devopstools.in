"use client";
import { useMemo, useState } from "react";
import CopyButton from "./CopyButton";

function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = n * 256 + v;
  }
  return n >>> 0;
}
const intToIp = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");

export default function CidrCalculator() {
  const [cidr, setCidr] = useState("10.0.0.0/24");

  const result = useMemo(() => {
    const [ip, prefixStr] = cidr.split("/");
    const prefix = Number(prefixStr);
    const ipInt = ipToInt(ip || "");
    if (ipInt === null || !Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
      return { error: "Enter a valid CIDR like 10.0.0.0/24" };
    }
    const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
    const network = (ipInt & mask) >>> 0;
    const broadcast = (network | (~mask >>> 0)) >>> 0;
    const total = 2 ** (32 - prefix);
    const usable = prefix >= 31 ? total : total - 2;
    return {
      network: intToIp(network),
      broadcast: prefix >= 31 ? "—" : intToIp(broadcast),
      firstHost: prefix >= 31 ? intToIp(network) : intToIp(network + 1),
      lastHost: prefix >= 31 ? intToIp(broadcast) : intToIp(broadcast - 1),
      mask: intToIp(mask),
      wildcard: intToIp(~mask >>> 0),
      total: total.toLocaleString(),
      usable: usable.toLocaleString(),
      prefix,
    };
  }, [cidr]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium">
        CIDR block
        <input className="input mt-1" value={cidr} onChange={(e) => setCidr(e.target.value)} placeholder="10.0.0.0/24" spellCheck={false} />
      </label>
      {"error" in result ? (
        <p className="font-mono text-sm text-red-500">{result.error}</p>
      ) : (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            ["Network address", result.network],
            ["Broadcast address", result.broadcast],
            ["First usable host", result.firstHost],
            ["Last usable host", result.lastHost],
            ["Subnet mask", result.mask],
            ["Wildcard mask", result.wildcard],
            ["Total addresses", result.total],
            ["Usable hosts", result.usable],
          ].map(([k, v]) => (
            <div key={k as string} className="card flex items-center justify-between p-3">
              <div>
                <dt className="muted text-xs">{k}</dt>
                <dd className="font-mono text-sm font-semibold">{v}</dd>
              </div>
              <CopyButton text={String(v)} />
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
