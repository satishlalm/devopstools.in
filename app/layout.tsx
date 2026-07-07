import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://devopstools.in';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'DevOpsTools.in — Free Online Tools for DevOps, SRE & Cloud Engineers',
    template: '%s | DevOpsTools.in',
  },
  description:
    'Free browser-based DevOps tools: CIDR calculator, cron generator, JSON formatter, JWT decoder, Kubernetes YAML validator and 40+ more. Private, fast, no signup.',
  keywords: ['DevOps tools', 'Kubernetes tools', 'Linux tools', 'Terraform tools', 'AWS tools', 'SRE tools', 'free DevOps tools', 'cloud engineering tools', 'online DevOps utilities'],
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'DevOpsTools.in',
    title: 'DevOpsTools.in — Free Online Tools for DevOps Engineers',
    description: '40+ free, private, browser-based tools for DevOps, SRE, Kubernetes, AWS and Linux work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOpsTools.in — Free DevOps Tools',
    description: '40+ free browser-based tools for DevOps, SRE and cloud engineers.',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevOpsTools.in',
  url: SITE,
  description: 'Free online tools for DevOps, SRE and cloud engineers.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE}/tools?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {GA && <Analytics gaId={GA} />}
        <Navbar />
        <main className="mx-auto max-w-6xl px-4">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
