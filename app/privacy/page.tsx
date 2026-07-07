import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DevOpsTools.in handles data: tool inputs never leave your browser; analytics and advertising cookies are explained here.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 py-12 leading-relaxed">
      <h1 className="text-3xl font-bold">Privacy policy</h1>
      <p className="muted text-sm">Last updated: June 2026</p>
      <h2 className="text-xl font-semibold">Tool inputs</h2>
      <p>All tools on this site execute in your browser. Text you type or paste into a tool — including tokens, passwords, configuration files and IP addresses — is processed locally by JavaScript and is never transmitted to, logged by, or stored on our servers.</p>
      <h2 className="text-xl font-semibold">Analytics</h2>
      <p>We use Google Analytics 4 to understand aggregate usage: page views, approximate region, device type and which tools are popular. This relies on cookies and similar identifiers. You can decline non-essential cookies in the consent banner, and analytics will be disabled for your session.</p>
      <h2 className="text-xl font-semibold">Advertising</h2>
      <p>The site is supported by Google AdSense. Google and its partners may use cookies to serve ads based on prior visits to this or other websites. You can opt out of personalised advertising at Google Ads Settings (adssettings.google.com) and learn more at policies.google.com/technologies/ads.</p>
      <h2 className="text-xl font-semibold">Newsletter</h2>
      <p>If you subscribe to the newsletter, we store your email address solely to send the newsletter. Every email includes an unsubscribe link; unsubscribing deletes your address from our list.</p>
      <h2 className="text-xl font-semibold">Your rights</h2>
      <p>You may request access to or deletion of any personal data we hold (in practice, at most a newsletter email address) by writing to privacy@devopstools.in.</p>
    </article>
  );
}
