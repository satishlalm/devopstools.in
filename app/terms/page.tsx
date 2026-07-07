import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms of use for DevOpsTools.in: acceptable use, accuracy disclaimer and limitation of liability for the free tools provided.",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 py-12 leading-relaxed">
      <h1 className="text-3xl font-bold">Terms and conditions</h1>
      <p className="muted text-sm">Last updated: June 2026</p>
      <h2 className="text-xl font-semibold">Use of the service</h2>
      <p>DevOpsTools.in provides free, browser-based utilities for engineering work. You may use them for personal and commercial purposes. You may not scrape the site abusively, attempt to disrupt it, or misrepresent its output.</p>
      <h2 className="text-xl font-semibold">Accuracy</h2>
      <p>We work hard to keep every calculation correct and test tools against authoritative references. Nevertheless, output is provided “as is” without warranty. Always validate results before applying them to production systems — especially network changes, IAM policies and scheduled jobs.</p>
      <h2 className="text-xl font-semibold">Limitation of liability</h2>
      <p>To the maximum extent permitted by law, DevOpsTools.in is not liable for any damages arising from use of the tools or reliance on their output, including outages, data loss or security incidents.</p>
      <h2 className="text-xl font-semibold">Changes</h2>
      <p>We may update these terms; the “last updated” date reflects the current version. Continued use after changes constitutes acceptance.</p>
    </article>
  );
}
