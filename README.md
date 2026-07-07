# DevOpsTools.in

Free, private, browser-based tools for DevOps engineers, SREs, platform engineers and Linux administrators.

## Stack
- **Next.js 14 (App Router) + TypeScript** — SSG for every tool/blog page, API routes for newsletter
- **Tailwind CSS** — design tokens via CSS variables, dark/light mode (`class` strategy)
- **Framer Motion** — available; current animations are CSS-first for performance
- **Prisma + PostgreSQL** — newsletter, tool analytics, blog CMS, future auth (schema in `prisma/`)
- **Docker / Kubernetes / Vercel** — `output: 'standalone'` image, manifests in `k8s/`

## Getting started
```bash
npm install
cp .env.example .env        # fill in DATABASE_URL, GA, AdSense IDs
npm run dev                 # http://localhost:3000
```
With the database:
```bash
docker compose up -d db
npm run db:push
```

## Architecture
```
lib/tools.ts        ← single source of truth: every tool, category, SEO description
lib/blog.ts         ← 20 SEO-ready article templates (titles, descriptions, outlines)
app/tools/[slug]    ← statically generated page per tool (generateStaticParams)
components/tools/   ← one client component per implemented tool + ToolRenderer registry
app/sitemap.ts      ← sitemap built automatically from both registries
```
**Adding a tool** = add one entry to `lib/tools.ts`, one component in `components/tools/`, one line in `ToolRenderer.tsx`. The listing page, search, category filter, sitemap and SEO metadata all update automatically.

### Implemented tools (11)
CIDR Calculator · Subnet Calculator · Cron Generator · JSON Formatter · JWT Decoder · YAML Validator · Kubernetes YAML Validator · Base64 · URL Encoder · UUID Generator · Password Generator · Hash Generator (SHA-2 family)

All remaining registry entries render a graceful "in the build queue" page and are already indexed in search/sitemap, so shipping them is purely additive.

## Design system
- Primary `#2563EB`, secondary `#0F172A`, accent `#10B981` (per brand spec)
- Inter (body) + JetBrains Mono (terminal/code) via `next/font`
- Signature element: the terminal-style command palette on the homepage
- Theme tokens are CSS variables (`--bg`, `--fg`, `--card`, `--border`) toggled by the `dark` class
- Accessibility: semantic landmarks, aria labels on all controls, visible focus rings, `prefers-reduced-motion` respected

## SEO
- Per-page metadata + Open Graph + Twitter cards (`generateMetadata`)
- JSON-LD: `WebSite` + `SearchAction` (layout), `SoftwareApplication` (tool pages), `TechArticle` (blog), `FAQPage` (homepage)
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` and `/robots.txt`
- Canonical URLs on tool and blog pages

## Monetisation (AdSense)
Ad placements are stubbed in `components/AdSlot.tsx` (header, sidebar, in-content, footer). Before applying:
1. Write the full articles for at least 15 of the 20 blog templates — templates alone are thin content.
2. Privacy, terms, about and contact pages are already in place.
3. Cookie consent banner is wired (`components/CookieConsent.tsx`); connect it to a CMP for EU traffic.

## Deployment
- **Vercel:** push to GitHub, import — zero config.
- **Docker:** `docker build -t devopstools . && docker run -p 3000:3000 devopstools`
- **AWS (ECS Fargate / EKS / S3+CloudFront):** full guide in `docs/AWS-DEPLOYMENT.md`.

## Roadmap
1. Implement remaining generators (Deployment, Dockerfile, IAM Policy are highest-traffic keywords)
2. Swap textarea for Monaco in the Kubernetes validator (`@monaco-editor/react`)
3. Auth.js + saved snippets (schema already supports it)
4. DNS lookup & SSL checker via DNS-over-HTTPS / a tiny API route
