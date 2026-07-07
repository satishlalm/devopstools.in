import Link from 'next/link';
import TerminalSearch from '@/components/TerminalSearch';
import ToolCard from '@/components/ToolCard';
import Newsletter from '@/components/Newsletter';
import AdSlot from '@/components/AdSlot';
import { TOOLS, CATEGORIES } from '@/lib/tools';

const faqs = [
  { q: 'Are these tools really free?', a: 'Yes. Every tool on DevOpsTools.in is free with no account, no trial and no usage limits. The site is supported by unobtrusive advertising.' },
  { q: 'Is my data safe when I paste tokens or configs?', a: 'Everything you type runs in your own browser using JavaScript and the Web Crypto API. Tokens, passwords, YAML and JSON are never transmitted to our servers or stored anywhere.' },
  { q: 'Can I use these tools at work?', a: 'Yes. Because processing is client-side, nothing sensitive leaves your machine, which makes the tools suitable even in environments with strict data handling policies. Always follow your own organisation’s rules.' },
  { q: 'How often are new tools added?', a: 'We ship new tools and improvements weekly, prioritised by user requests. Use the contact page to suggest one.' },
  { q: 'Do the tools work offline?', a: 'Once a tool page has loaded, most calculations keep working without a connection because all logic runs locally.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  const popular = TOOLS.filter((t) => t.popular).slice(0, 8);
  const fresh = TOOLS.filter((t) => t.isNew).slice(0, 4);
  const featured = TOOLS.filter((t) => t.featured).slice(0, 6);

  return (
    <div className="space-y-20 pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="pt-16 text-center sm:pt-24">
        <p className="mx-auto mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
          40+ tools · no signup · runs in your browser
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          The toolbox your <span className="text-primary">terminal</span> wishes it had
        </h1>
        <p className="muted mx-auto mt-4 max-w-2xl text-lg">
          Free, fast, private utilities for DevOps engineers, SREs, platform teams and Linux administrators.
          Calculate subnets, build cron schedules, decode JWTs and validate Kubernetes YAML — without sending a byte to anyone.
        </p>
        <div className="mt-8 animate-fade-up">
          <TerminalSearch />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-xs">
          {['cidr-calculator', 'cron-expression-generator', 'jwt-decoder', 'kubernetes-yaml-validator'].map((s) => (
            <Link key={s} href={`/tools/${s}`} className="btn-ghost !px-3 !py-1">{s.replace(/-/g, ' ')}</Link>
          ))}
        </div>
      </section>

      <AdSlot slot="header" />

      {/* Popular */}
      <section aria-labelledby="popular">
        <div className="mb-4 flex items-end justify-between">
          <h2 id="popular" className="text-2xl font-bold">Popular tools</h2>
          <Link href="/tools" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* New */}
      <section aria-labelledby="new">
        <h2 id="new" className="mb-4 text-2xl font-bold">New this month</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {fresh.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Featured */}
      <section aria-labelledby="featured">
        <h2 id="featured" className="mb-4 text-2xl font-bold">Featured: deep, polished, production-tested</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      {/* Categories */}
      <section aria-labelledby="categories">
        <h2 id="categories" className="mb-4 text-2xl font-bold">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link key={c.id} href={`/tools?category=${c.id}`} className="card group p-4 transition-colors hover:border-accent">
              <h3 className="font-mono font-semibold group-hover:text-accent">{c.id}</h3>
              <p className="muted mt-1 text-sm">{c.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot slot="in-content" />

      {/* Long-form SEO / EEAT content */}
      <section className="mx-auto max-w-3xl space-y-5 leading-relaxed" aria-labelledby="about-platform">
        <h2 id="about-platform" className="text-2xl font-bold">Why DevOpsTools.in exists</h2>
        <p>
          Every infrastructure engineer keeps a private collection of half-remembered one-liners, bookmarked
          calculators of questionable provenance, and that one cron expression they copy from an old runbook every
          time. We built DevOpsTools.in to replace that pile with a single, dependable workbench — one that loads in
          under a second, works the same on a laptop and a phone, and treats everything you paste as none of our
          business.
        </p>
        <p>
          The site was created by working engineers, not marketers. Between us we have spent years carrying pagers
          for Linux fleets, Kubernetes clusters and AWS estates, which shapes what gets built and how. The CIDR
          calculator shows the broadcast address and wildcard mask because security group and ACL work needs both.
          The cron generator translates expressions into plain English because the most expensive scheduling bugs are
          the ones nobody notices for a month. The JWT decoder runs entirely client-side because pasting a production
          bearer token into a random website is exactly the kind of thing security teams lose sleep over — and they
          are right to.
        </p>
        <h3 className="text-xl font-semibold">Privacy is the architecture, not a policy</h3>
        <p>
          Most online utilities send your input to a server, process it there, and return a result. Ours do not.
          Every calculation — subnetting math, hashing, encoding, parsing, validation — executes as JavaScript in
          your own browser, using standard APIs like Web Crypto. There is no request to inspect, no log to leak and
          no database of pasted secrets to breach, because none of those things exist. You can open the network tab
          and verify it yourself; we would honestly encourage it.
        </p>
        <h3 className="text-xl font-semibold">Built for the whole on-call rotation</h3>
        <p>
          The catalogue covers eight categories that map onto real responsibilities. Linux tools handle the daily
          mechanics of scheduling, encoding and log work. Kubernetes tools focus on the manifest mistakes that cost
          the most time: missing selectors, mis-sized resource requests, autoscaler settings that fight each other.
          Networking tools cover CIDR and subnet planning for VPCs and on-prem ranges alike. AWS tools concentrate on
          IAM, where small wording differences in a policy decide whether an audit passes. Security and developer
          tools round out the set with password generation, hashing and the formatters everyone reaches for during a
          code review.
        </p>
        <h3 className="text-xl font-semibold">Free now, free later</h3>
        <p>
          The tools are free and will stay free. The site is supported by clearly marked, non-intrusive advertising
          placed around the content, never inside tool inputs or outputs. There are no accounts, no paywalled
          “pro” versions of basic utilities, and no dark patterns nudging you to subscribe before you can copy a
          result. If a tool you need is missing, tell us through the contact page — user requests set the roadmap,
          and most suggested tools ship within a few weeks.
        </p>
      </section>

      <Newsletter />

      {/* FAQ */}
      <section aria-labelledby="faq" className="mx-auto max-w-3xl">
        <h2 id="faq" className="mb-4 text-2xl font-bold">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="card group p-4">
              <summary className="cursor-pointer font-semibold marker:text-primary">{f.q}</summary>
              <p className="muted mt-2 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
