import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the DevOpsTools.in team to report a bug, request a tool, or ask about advertising and partnerships.",
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 py-12 leading-relaxed">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p>We read every message. Pick the address that matches your reason for writing and we will get back to you, usually within two business days.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["Tool requests & bugs", "tools@devopstools.in"],
          ["Advertising & partnerships", "partners@devopstools.in"],
          ["Privacy & data questions", "privacy@devopstools.in"],
          ["Everything else", "hello@devopstools.in"],
        ].map(([label, email]) => (
          <div key={email} className="card p-4">
            <p className="text-sm font-semibold">{label}</p>
            <a className="font-mono text-sm text-primary hover:underline" href={`mailto:${email}`}>{email}</a>
          </div>
        ))}
      </div>
      <p className="muted text-sm">When reporting a tool bug, include the tool name, your input (redact anything sensitive) and what you expected to happen.</p>
    </article>
  );
}
