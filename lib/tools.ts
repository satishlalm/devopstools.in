export type Category =
  | 'Linux'
  | 'Kubernetes'
  | 'Docker'
  | 'Terraform'
  | 'AWS'
  | 'Networking'
  | 'Security'
  | 'Developer';

export interface Tool {
  slug: string;
  name: string;
  category: Category;
  description: string; // used as meta description (140-160 chars)
  keywords: string[];
  implemented: boolean;
  popular?: boolean;
  isNew?: boolean;
  featured?: boolean;
}

export const CATEGORIES: { id: Category; blurb: string; icon: string }[] = [
  { id: 'Linux', blurb: 'Cron, systemd, regex, logs and encoding utilities for sysadmins.', icon: 'terminal' },
  { id: 'Kubernetes', blurb: 'Manifest generators, validators and capacity calculators.', icon: 'boxes' },
  { id: 'Docker', blurb: 'Dockerfile and Compose generators plus resource estimators.', icon: 'container' },
  { id: 'Terraform', blurb: 'Format, validate and scaffold IaC modules and variables.', icon: 'layers' },
  { id: 'AWS', blurb: 'IAM policies, ARNs, S3 policies and CloudFormation checks.', icon: 'cloud' },
  { id: 'Networking', blurb: 'CIDR and subnet math, DNS, ports and TLS certificates.', icon: 'network' },
  { id: 'Security', blurb: 'Passwords, hashes, JWTs, certificates and header audits.', icon: 'shield' },
  { id: 'Developer', blurb: 'Formatters for JSON, YAML, XML, SQL and Markdown.', icon: 'code' },
];

export const TOOLS: Tool[] = [
  // Linux
  { slug: 'cron-expression-generator', name: 'Cron Expression Generator', category: 'Linux', implemented: true, popular: true, featured: true, description: 'Build cron expressions visually with a human-readable preview. Free online cron generator for Linux crontab, Kubernetes CronJobs and CI schedules.', keywords: ['cron generator', 'crontab', 'cron expression', 'schedule'] },
  { slug: 'systemd-service-generator', name: 'Systemd Service Generator', category: 'Linux', implemented: false, description: 'Generate production-ready systemd unit files with restart policies, environment files and hardening options for Linux services.', keywords: ['systemd', 'unit file', 'service generator'] },
  { slug: 'regex-tester', name: 'Regex Tester', category: 'Linux', implemented: false, description: 'Test regular expressions against sample text with live match highlighting and group capture output. Supports JavaScript regex syntax.', keywords: ['regex tester', 'regular expression', 'grep'] },
  { slug: 'log-analyzer', name: 'Log Analyzer', category: 'Linux', implemented: false, description: 'Paste log output to get severity breakdowns, timeline patterns and frequent error extraction for faster Linux troubleshooting.', keywords: ['log analyzer', 'syslog', 'troubleshooting'] },
  { slug: 'base64-encoder-decoder', name: 'Base64 Encoder / Decoder', category: 'Linux', implemented: true, popular: true, description: 'Encode and decode Base64 strings instantly in your browser. Handles UTF-8 safely for Kubernetes secrets, auth headers and config files.', keywords: ['base64 encode', 'base64 decode', 'kubernetes secret'] },
  { slug: 'url-encoder-decoder', name: 'URL Encoder / Decoder', category: 'Linux', implemented: true, description: 'Percent-encode or decode URLs and query strings safely. Useful for curl commands, webhooks and API debugging.', keywords: ['url encode', 'url decode', 'percent encoding'] },
  { slug: 'jwt-decoder', name: 'JWT Decoder', category: 'Linux', implemented: true, popular: true, featured: true, description: 'Decode JSON Web Tokens client-side. Inspect header and payload claims and check expiry without sending your token to any server.', keywords: ['jwt decoder', 'json web token', 'jwt debugger'] },
  { slug: 'json-formatter', name: 'JSON Formatter', category: 'Developer', implemented: true, popular: true, featured: true, description: 'Beautify, minify and validate JSON online with precise error highlighting. Fast, private, in-browser JSON formatter for engineers.', keywords: ['json formatter', 'json beautify', 'json validator'] },
  { slug: 'yaml-validator', name: 'YAML Validator', category: 'Developer', implemented: true, isNew: true, description: 'Validate YAML syntax in the browser with exact line and column error reporting. Ideal for CI pipelines, Ansible and Helm values files.', keywords: ['yaml validator', 'yaml lint', 'yaml syntax'] },
  { slug: 'hash-generator', name: 'Hash Generator', category: 'Security', implemented: true, description: 'Generate SHA-256, SHA-384 and SHA-512 hashes locally using the Web Crypto API. Nothing you type ever leaves your browser.', keywords: ['hash generator', 'sha256', 'checksum'] },
  // Kubernetes
  { slug: 'kubernetes-yaml-validator', name: 'Kubernetes YAML Validator', category: 'Kubernetes', implemented: true, featured: true, popular: true, description: 'Validate Kubernetes manifests for YAML syntax and required fields like apiVersion, kind and metadata. Catch errors before kubectl apply.', keywords: ['kubernetes yaml validator', 'k8s manifest', 'kubectl'] },
  { slug: 'deployment-generator', name: 'Deployment Generator', category: 'Kubernetes', implemented: false, isNew: true, description: 'Generate Kubernetes Deployment manifests with replicas, probes, resource requests and limits using a guided form.', keywords: ['kubernetes deployment', 'manifest generator'] },
  { slug: 'service-generator', name: 'Service Generator', category: 'Kubernetes', implemented: false, description: 'Create Kubernetes Service manifests for ClusterIP, NodePort and LoadBalancer types with correct selectors and ports.', keywords: ['kubernetes service', 'clusterip', 'nodeport'] },
  { slug: 'ingress-generator', name: 'Ingress Generator', category: 'Kubernetes', implemented: false, description: 'Build Ingress resources with host rules, TLS sections and annotations for NGINX and ALB ingress controllers.', keywords: ['kubernetes ingress', 'ingress yaml'] },
  { slug: 'resource-calculator', name: 'Resource Calculator', category: 'Kubernetes', implemented: false, description: 'Estimate cluster capacity from pod requests and limits. Plan node sizing for CPU and memory headroom.', keywords: ['kubernetes resources', 'capacity planning'] },
  { slug: 'hpa-calculator', name: 'HPA Calculator', category: 'Kubernetes', implemented: false, description: 'Model HorizontalPodAutoscaler behavior: target utilization, min and max replicas and expected scale events under load.', keywords: ['hpa', 'autoscaling', 'kubernetes'] },
  { slug: 'namespace-generator', name: 'Namespace Generator', category: 'Kubernetes', implemented: false, description: 'Generate Namespace manifests with labels, ResourceQuota and LimitRange templates for multi-tenant clusters.', keywords: ['kubernetes namespace', 'resourcequota'] },
  // Docker
  { slug: 'dockerfile-generator', name: 'Dockerfile Generator', category: 'Docker', implemented: false, isNew: true, description: 'Generate multi-stage Dockerfiles for Node.js, Python, Go and Java with sensible caching and non-root defaults.', keywords: ['dockerfile generator', 'multi-stage build'] },
  { slug: 'docker-compose-generator', name: 'Docker Compose Generator', category: 'Docker', implemented: false, description: 'Compose multi-service stacks with networks, volumes and healthchecks through a guided builder.', keywords: ['docker compose', 'compose generator'] },
  { slug: 'image-size-estimator', name: 'Image Size Estimator', category: 'Docker', implemented: false, description: 'Estimate container image size from base image and layer contents to keep pulls fast and registries lean.', keywords: ['docker image size', 'image optimization'] },
  { slug: 'container-resource-calculator', name: 'Container Resource Calculator', category: 'Docker', implemented: false, description: 'Translate application memory and CPU profiles into container limits and host capacity requirements.', keywords: ['container resources', 'cpu limits'] },
  // Terraform
  { slug: 'terraform-formatter', name: 'Terraform Formatter', category: 'Terraform', implemented: false, description: 'Format HCL consistently in the browser, mirroring terraform fmt conventions for clean diffs and reviews.', keywords: ['terraform fmt', 'hcl formatter'] },
  { slug: 'terraform-validator', name: 'Terraform Validator', category: 'Terraform', implemented: false, description: 'Catch HCL syntax errors and common mistakes in Terraform configuration before you run terraform plan.', keywords: ['terraform validate', 'hcl'] },
  { slug: 'terraform-module-generator', name: 'Terraform Module Generator', category: 'Terraform', implemented: false, description: 'Scaffold Terraform modules with variables.tf, outputs.tf, versions.tf and README following registry conventions.', keywords: ['terraform module', 'iac scaffold'] },
  { slug: 'terraform-variable-generator', name: 'Variable Generator', category: 'Terraform', implemented: false, description: 'Generate typed Terraform variable blocks with descriptions, defaults and validation rules from a simple form.', keywords: ['terraform variables', 'tfvars'] },
  // AWS
  { slug: 'iam-policy-generator', name: 'IAM Policy Generator', category: 'AWS', implemented: false, popular: true, description: 'Compose least-privilege IAM policies with action pickers, resource ARNs and condition keys, then export valid JSON.', keywords: ['iam policy generator', 'aws iam', 'least privilege'] },
  { slug: 'arn-builder', name: 'ARN Builder', category: 'AWS', implemented: false, description: 'Build correct Amazon Resource Names for any service, region and account, with format hints per resource type.', keywords: ['arn builder', 'aws arn format'] },
  { slug: 's3-policy-generator', name: 'S3 Policy Generator', category: 'AWS', implemented: false, description: 'Generate S3 bucket policies for common patterns: public read, CloudFront OAC, cross-account access and TLS enforcement.', keywords: ['s3 bucket policy', 'aws s3'] },
  { slug: 'cloudformation-validator', name: 'CloudFormation Validator', category: 'AWS', implemented: false, description: 'Validate CloudFormation template structure and YAML/JSON syntax before deploying stacks.', keywords: ['cloudformation validator', 'cfn template'] },
  // Networking
  { slug: 'cidr-calculator', name: 'CIDR Calculator', category: 'Networking', implemented: true, popular: true, featured: true, description: 'Free CIDR calculator with real-time results: network and broadcast addresses, usable host range, subnet mask and wildcard mask.', keywords: ['cidr calculator', 'subnet calculator', 'ip range'] },
  { slug: 'subnet-calculator', name: 'Subnet Calculator', category: 'Networking', implemented: true, isNew: true, description: 'Split a network into equal subnets. See each subnet\u2019s range, mask and host count for VPC and on-prem planning.', keywords: ['subnet calculator', 'vpc subnets', 'network split'] },
  { slug: 'ip-converter', name: 'IP Converter', category: 'Networking', implemented: false, description: 'Convert IPv4 addresses between dotted-decimal, binary, hexadecimal and integer representations.', keywords: ['ip converter', 'ip to binary'] },
  { slug: 'dns-lookup', name: 'DNS Lookup', category: 'Networking', implemented: false, description: 'Query A, AAAA, CNAME, MX, TXT and NS records over DNS-over-HTTPS to debug records and propagation.', keywords: ['dns lookup', 'dig online'] },
  { slug: 'port-checker', name: 'Port Checker', category: 'Networking', implemented: false, description: 'Reference well-known ports and check reachability of public endpoints for firewall and security group debugging.', keywords: ['port checker', 'open port'] },
  { slug: 'ssl-certificate-checker', name: 'SSL Certificate Checker', category: 'Networking', implemented: false, description: 'Inspect certificate chain, expiry, SANs and protocol support for any public HTTPS endpoint.', keywords: ['ssl checker', 'certificate expiry'] },
  // Security
  { slug: 'password-generator', name: 'Password Generator', category: 'Security', implemented: true, popular: true, description: 'Generate cryptographically secure passwords locally with length and character class controls. Nothing leaves your browser.', keywords: ['password generator', 'secure password'] },
  { slug: 'jwt-analyzer', name: 'JWT Analyzer', category: 'Security', implemented: false, description: 'Audit JWTs for weak algorithms, missing claims, long expiries and other token hygiene issues.', keywords: ['jwt security', 'token audit'] },
  { slug: 'certificate-decoder', name: 'Certificate Decoder', category: 'Security', implemented: false, description: 'Paste a PEM certificate to view subject, issuer, validity, key details and SANs.', keywords: ['certificate decoder', 'pem decode'] },
  { slug: 'security-header-checker', name: 'Security Header Checker', category: 'Security', implemented: false, description: 'Audit HTTP security headers like CSP, HSTS and X-Frame-Options against current best practice.', keywords: ['security headers', 'csp check'] },
  // Developer
  { slug: 'yaml-formatter', name: 'YAML Formatter', category: 'Developer', implemented: false, description: 'Re-indent and normalize YAML with consistent spacing for clean, reviewable configuration files.', keywords: ['yaml formatter', 'yaml beautify'] },
  { slug: 'xml-formatter', name: 'XML Formatter', category: 'Developer', implemented: false, description: 'Pretty-print and minify XML documents with proper nesting and attribute handling.', keywords: ['xml formatter', 'xml beautify'] },
  { slug: 'sql-formatter', name: 'SQL Formatter', category: 'Developer', implemented: false, description: 'Format SQL queries with consistent keyword casing and indentation for readable reviews and runbooks.', keywords: ['sql formatter', 'sql beautify'] },
  { slug: 'markdown-previewer', name: 'Markdown Previewer', category: 'Developer', implemented: false, description: 'Live side-by-side Markdown editor and preview for READMEs, runbooks and documentation.', keywords: ['markdown preview', 'md editor'] },
  { slug: 'uuid-generator', name: 'UUID Generator', category: 'Developer', implemented: true, description: 'Generate RFC 4122 v4 UUIDs in bulk, locally in your browser, with one-click copy.', keywords: ['uuid generator', 'guid'] },
];

export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug);
export const byCategory = (c: Category) => TOOLS.filter((t) => t.category === c);
