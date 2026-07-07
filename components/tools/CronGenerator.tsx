"use client";
import { useMemo, useState } from "react";
import CopyButton from "./CopyButton";

const FIELDS = [
  { id: "minute", label: "Minute", max: 59 },
  { id: "hour", label: "Hour", max: 23 },
  { id: "dom", label: "Day of month", max: 31, min: 1 },
  { id: "month", label: "Month", max: 12, min: 1 },
  { id: "dow", label: "Day of week", max: 6 },
] as const;

const DOW = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function describe(parts: Record<string, string>): string {
  const { minute, hour, dom, month, dow } = parts;
  let when = "";
  if (minute.startsWith("*/")) when = `every ${minute.slice(2)} minutes`;
  else if (minute === "*" && hour === "*") when = "every minute";
  else if (hour === "*") when = `at minute ${minute} of every hour`;
  else if (hour.startsWith("*/")) when = `at minute ${minute === "*" ? "0" : minute}, every ${hour.slice(2)} hours`;
  else when = `at ${hour.padStart(2, "0")}:${(minute === "*" ? "0" : minute).padStart(2, "0")}`;
  let days = "";
  if (dow !== "*") days = ` on ${dow.split(",").map((d) => DOW[Number(d)] ?? d).join(", ")}`;
  else if (dom !== "*") days = ` on day ${dom} of the month`;
  const m = month !== "*" ? ` in ${month.split(",").map((x) => MONTHS[Number(x)] ?? x).join(", ")}` : "";
  return `Runs ${when}${days}${m}.`;
}

export default function CronGenerator() {
  const [v, setV] = useState<Record<string, string>>({ minute: "0", hour: "9", dom: "*", month: "*", dow: "1-5" });
  const expr = useMemo(() => FIELDS.map((f) => v[f.id] || "*").join(" "), [v]);
  const presets: [string, Record<string, string>][] = [
    ["Every minute", { minute: "*", hour: "*", dom: "*", month: "*", dow: "*" }],
    ["Hourly", { minute: "0", hour: "*", dom: "*", month: "*", dow: "*" }],
    ["Daily at midnight", { minute: "0", hour: "0", dom: "*", month: "*", dow: "*" }],
    ["Weekdays 9am", { minute: "0", hour: "9", dom: "*", month: "*", dow: "1-5" }],
    ["Every 15 min", { minute: "*/15", hour: "*", dom: "*", month: "*", dow: "*" }],
    ["Monthly", { minute: "0", hour: "0", dom: "1", month: "*", dow: "*" }],
  ];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {presets.map(([label, p]) => (
          <button key={label} className="btn-ghost !px-3 !py-1 text-xs" onClick={() => setV(p)}>{label}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {FIELDS.map((f) => (
          <label key={f.id} className="block text-xs font-medium">
            {f.label}
            <input className="input mt-1 text-center" value={v[f.id]} onChange={(e) => setV({ ...v, [f.id]: e.target.value.trim() || "*" })} spellCheck={false} />
          </label>
        ))}
      </div>
      <div className="card p-4">
        <div className="flex items-center justify-between gap-3">
          <code className="font-mono text-lg font-bold text-accent">{expr}</code>
          <CopyButton text={expr} />
        </div>
        <p className="muted mt-2 text-sm">{describe(v)}</p>
      </div>
      <p className="muted text-xs">Fields accept *, numbers, ranges (1-5), lists (1,3,5) and steps (*/15). Day of week: 0 = Sunday.</p>
    </div>
  );
}
