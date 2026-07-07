'use client';
import { useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TOOLS } from '@/lib/tools';

/**
 * The site's signature element: a terminal-style command palette.
 * Type to fuzzy-filter every tool; Enter opens the highlighted one.
 */
export default function TerminalSearch() {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(needle) ||
        t.category.toLowerCase().includes(needle) ||
        t.keywords.some((k) => k.includes(needle))
    ).slice(0, 7);
  }, [q]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx((i) => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[idx]) router.push(`/tools/${results[idx].slug}`);
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl text-left">
      <div
        className="card overflow-hidden font-mono text-sm shadow-2xl shadow-primary/10"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-1.5 border-b border-token px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="muted ml-2 text-xs">devops — search</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-3">
          <span className="text-accent">$</span>
          <span className="text-primary">find-tool</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={onKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder='"cidr", "cron", "jwt", "yaml"...'
            aria-label="Search tools"
            className="w-full bg-transparent outline-none placeholder:opacity-40"
          />
          <span className="animate-blink text-accent">▌</span>
        </div>
      </div>
      {focused && results.length > 0 && (
        <ul className="card absolute z-40 mt-2 w-full overflow-hidden py-1 font-mono text-sm shadow-xl" role="listbox">
          {results.map((t, i) => (
            <li key={t.slug} role="option" aria-selected={i === idx}>
              <button
                className={`flex w-full items-center justify-between px-4 py-2 text-left ${i === idx ? 'bg-primary/10 text-primary' : ''}`}
                onMouseEnter={() => setIdx(i)}
                onClick={() => router.push(`/tools/${t.slug}`)}
              >
                <span>{t.name}</span>
                <span className="muted text-xs">{t.category}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
