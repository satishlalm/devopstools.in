import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-token backdrop-blur-md" style={{ backgroundColor: "rgb(var(--bg) / 0.85)" }}>
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4" aria-label="Main">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-bold">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white"><Terminal size={15} /></span>
          devopstools<span className="text-accent">.in</span>
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link href="/tools" className="btn-ghost !border-0">Tools</Link>
          <Link href="/categories" className="btn-ghost !border-0 hidden sm:inline-flex">Categories</Link>
          <Link href="/blog" className="btn-ghost !border-0 hidden sm:inline-flex">Blog</Link>
          <Link href="/about" className="btn-ghost !border-0 hidden md:inline-flex">About</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
