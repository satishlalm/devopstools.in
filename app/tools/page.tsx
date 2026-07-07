import { Suspense } from "react";
import type { Metadata } from "next";
import ToolsBrowser from "@/components/ToolsBrowser";

export const metadata: Metadata = {
  title: "All DevOps Tools — Free Online Utilities",
  description: "Browse 40+ free browser-based tools for Linux, Kubernetes, Docker, Terraform, AWS, networking, security and development. Search and filter by category.",
};

export default function ToolsPage() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">All tools</h1>
      <p className="muted mt-2 max-w-2xl">Every tool runs locally in your browser. Filter by category or search by name and keyword.</p>
      <div className="mt-8">
        <Suspense><ToolsBrowser /></Suspense>
      </div>
    </div>
  );
}
