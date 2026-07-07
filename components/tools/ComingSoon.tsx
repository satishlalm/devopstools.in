import Link from "next/link";

export default function ComingSoon({ name }: { name: string }) {
  return (
    <div className="card p-8 text-center">
      <p className="font-mono text-sm text-accent">$ status --tool</p>
      <h2 className="mt-2 text-lg font-bold">{name} is in the build queue</h2>
      <p className="muted mx-auto mt-2 max-w-md text-sm">
        We ship new tools every week. Subscribe to the newsletter on the homepage to hear when this one lands, or try a related tool below.
      </p>
      <Link href="/tools" className="btn-primary mt-4">Browse all tools</Link>
    </div>
  );
}
