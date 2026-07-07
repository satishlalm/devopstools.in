import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "DevOpsTools.in is a free, privacy-first toolkit for DevOps, SRE and cloud engineers, built and maintained by working infrastructure engineers.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-5 py-12 leading-relaxed">
      <h1 className="text-3xl font-bold">About DevOpsTools.in</h1>
      <p>DevOpsTools.in is a free collection of browser-based utilities for the people who keep infrastructure running: DevOps engineers, site reliability engineers, platform engineers, cloud engineers and Linux administrators.</p>
      <p>The project started from a simple irritation: the calculators and converters engineers rely on daily are scattered across dozens of ad-choked sites, many of which silently ship your input to a server. We wanted one fast, trustworthy workbench where everything runs locally and nothing you paste is ever transmitted or stored.</p>
      <h2 className="text-xl font-semibold">Who builds this</h2>
      <p>The site is built and maintained by infrastructure engineers with hands-on production experience across Linux system administration, Kubernetes operations, AWS networking and large-scale log pipelines. Tools are designed around real on-call workflows, and every implementation is reviewed for correctness against authoritative references — RFCs for networking math, the Kubernetes API reference for manifest validation, and platform documentation for everything else.</p>
      <h2 className="text-xl font-semibold">Our principles</h2>
      <p>Client-side first: your data stays on your device. Free forever: no accounts, no paywalls on basic utilities. Honest monetisation: clearly marked ads around content, never inside it. Built in the open: report issues or request tools any time via the contact page.</p>
    </article>
  );
}
