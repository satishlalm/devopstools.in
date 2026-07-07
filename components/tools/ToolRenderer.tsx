"use client";
import dynamic from "next/dynamic";
import ComingSoon from "./ComingSoon";

const registry: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "cidr-calculator": dynamic(() => import("./CidrCalculator")),
  "subnet-calculator": dynamic(() => import("./SubnetCalculator")),
  "cron-expression-generator": dynamic(() => import("./CronGenerator")),
  "json-formatter": dynamic(() => import("./JsonFormatter")),
  "jwt-decoder": dynamic(() => import("./JwtDecoder")),
  "yaml-validator": dynamic(() => import("./YamlValidator")),
  "base64-encoder-decoder": dynamic(() => import("./Base64Tool")),
  "url-encoder-decoder": dynamic(() => import("./UrlTool")),
  "uuid-generator": dynamic(() => import("./UuidGenerator")),
  "password-generator": dynamic(() => import("./PasswordGenerator")),
  "hash-generator": dynamic(() => import("./HashGenerator")),
};

export default function ToolRenderer({ slug, name }: { slug: string; name: string }) {
  if (slug === "kubernetes-yaml-validator") {
    const Yaml = registry["yaml-validator"];
    return <Yaml k8s={true} />;
  }
  const Cmp = registry[slug];
  return Cmp ? <Cmp /> : <ComingSoon name={name} />;
}
