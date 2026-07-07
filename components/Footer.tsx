import Link from "next/link";
import { CATEGORIES } from "@/lib/tools";
import AdSlot from "./AdSlot";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-token">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <AdSlot slot="footer" className="mb-10" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="font-mono text-sm font-bold">devopstools<span className="text-accent">.in</span></p>
            <p className="muted mt-2 text-sm">Free, private, browser-based tools for DevOps, SRE and platform engineers. Built in India, used everywhere.</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Categories</p>
            <ul className="muted mt-2 space-y-1 text-sm">
              {CATEGORIES.slice(0, 5).map((c) => (
                <li key={c.id}><Link className="hover:text-primary" href={`/tools?category=${c.id}`}>{c.id} Tools</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Resources</p>
            <ul className="muted mt-2 space-y-1 text-sm">
              <li><Link className="hover:text-primary" href="/blog">Blog</Link></li>
              <li><Link className="hover:text-primary" href="/tools">All tools</Link></li>
              <li><Link className="hover:text-primary" href="/about">About</Link></li>
              <li><Link className="hover:text-primary" href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="muted mt-2 space-y-1 text-sm">
              <li><Link className="hover:text-primary" href="/privacy">Privacy policy</Link></li>
              <li><Link className="hover:text-primary" href="/terms">Terms and conditions</Link></li>
            </ul>
          </div>
        </div>
        <p className="muted mt-10 text-xs">© {new Date().getFullYear()} DevOpsTools.in — All tools run in your browser. We never store what you paste.</p>
      </div>
    </footer>
  );
}
