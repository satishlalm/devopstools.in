import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32 text-center">
      <p className="font-mono text-sm text-accent">$ curl -I devopstools.in/this-page</p>
      <h1 className="mt-2 text-4xl font-extrabold">HTTP/2 404</h1>
      <p className="muted mt-2">That page does not exist — but the tools do.</p>
      <Link href="/tools" className="btn-primary mt-6">Browse tools</Link>
    </div>
  );
}
