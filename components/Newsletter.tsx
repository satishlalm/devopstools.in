"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = async () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }).catch(() => {});
    setDone(true);
  };
  return (
    <section className="card p-8 text-center">
      <h2 className="text-xl font-bold">One useful tool tip per week</h2>
      <p className="muted mx-auto mt-2 max-w-md text-sm">New tools, cheat sheets and production troubleshooting guides. No spam, unsubscribe anytime.</p>
      {done ? (
        <p className="mt-4 font-mono text-sm text-accent">✓ Subscribed — check your inbox.</p>
      ) : (
        <div className="mx-auto mt-4 flex max-w-md gap-2">
          <input className="input" type="email" placeholder="you@company.com" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary shrink-0" onClick={submit}>Subscribe</button>
        </div>
      )}
    </section>
  );
}
