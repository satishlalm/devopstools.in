# Deploying DevOpsTools.in on AWS

Three viable architectures, in order of recommendation for this workload.

---

## Option A (recommended): ECS Fargate + ALB + CloudFront

Best cost/ops balance for a Next.js site with API routes. This mirrors the stack you already run with Terraform — the same modules (ECS service, ALB, ACM, CloudFront) apply directly.

### Architecture
```
Route 53 (devopstools.in)
   └── CloudFront (caching, WAF, ACM cert in us-east-1)
         └── ALB (HTTPS, ACM cert in ap-south-1)
               └── ECS Fargate service (2+ tasks, private subnets)
                     └── RDS PostgreSQL (db.t4g.micro, private subnets)
```

### Step-by-step

**1. Prerequisites**
```bash
aws configure                       # IAM user/role with ECR, ECS, RDS, CloudFront perms
export AWS_REGION=ap-south-1
export ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
```

**2. Build and push the image**
```bash
aws ecr create-repository --repository-name devopstools
aws ecr get-login-password | docker login --username AWS \
  --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

docker build -t devopstools:latest .
docker tag devopstools:latest $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/devopstools:latest
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/devopstools:latest
```

**3. Network**
- VPC 10.0.0.0/16, two AZs (ap-south-1a / 1b)
- Public subnets 10.0.0.0/24, 10.0.1.0/24 → ALB + NAT gateway
- Private subnets 10.0.10.0/24, 10.0.11.0/24 → ECS tasks + RDS
- Security groups: ALB-sg (443 from 0.0.0.0/0) → app-sg (3000 from ALB-sg) → db-sg (5432 from app-sg)

**4. Database**
```bash
aws rds create-db-instance \
  --db-instance-identifier devopstools-db \
  --db-instance-class db.t4g.micro \
  --engine postgres --engine-version 16 \
  --allocated-storage 20 --storage-type gp3 \
  --master-username devops --manage-master-user-password \
  --no-publicly-accessible \
  --vpc-security-group-ids <db-sg-id> \
  --db-subnet-group-name devopstools-private
```
Store `DATABASE_URL` in SSM Parameter Store (SecureString) or Secrets Manager.

**5. ECS service**
- Cluster: `devopstools` (Fargate)
- Task definition: 0.25 vCPU / 512 MB, container port 3000, secrets injected from SSM
- Service: desired count 2, attach to ALB target group (target type `ip`, health check path `/`)
- Auto scaling: target tracking on 70% CPU, min 2 / max 6 tasks

**6. TLS + DNS**
- ACM cert for `devopstools.in` + `www.devopstools.in` in **ap-south-1** (for the ALB) and another in **us-east-1** (CloudFront requirement)
- Route 53 alias: `devopstools.in` → CloudFront distribution

**7. CloudFront**
- Origin: the ALB (HTTPS only)
- Cache policy: cache `/_next/static/*` and `/tools` pages aggressively (they are static), bypass cache for `/api/*`
- Attach AWS WAF managed rule set (Common + KnownBadInputs) — cheap protection
- Enable HTTP/3 and compression

**8. CI/CD (GitHub Actions)**
```yaml
name: deploy
on: { push: { branches: [main] } }
permissions: { id-token: write, contents: read }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::<ACCOUNT_ID>:role/devopstools-deploy   # OIDC, no long-lived keys
          aws-region: ap-south-1
      - uses: aws-actions/amazon-ecr-login@v2
      - run: |
          docker build -t $ECR_REPO:$GITHUB_SHA .
          docker push $ECR_REPO:$GITHUB_SHA
      - run: |
          aws ecs update-service --cluster devopstools \
            --service devopstools-web --force-new-deployment
```

**Estimated monthly cost (ap-south-1):** 2× Fargate tasks (~$18) + ALB (~$18) + NAT (~$35, or use VPC endpoints / public tasks to avoid) + RDS t4g.micro (~$14) + CloudFront/Route53 (~$3 at low traffic) ≈ **$55–90/month**. Drop NAT by giving tasks public IPs in public subnets with a tight security group if budget matters early on.

---

## Option B: EKS (use the manifests in `k8s/`)

Only worth it if you already operate a cluster — the control plane alone is $73/month.

```bash
eksctl create cluster --name devopstools --region ap-south-1 \
  --nodegroup-name ng-1 --node-type t3.medium --nodes 2

# AWS Load Balancer Controller for the ALB Ingress
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system --set clusterName=devopstools

kubectl create secret generic devopstools-env --from-literal=DATABASE_URL=...
kubectl apply -f k8s/
```
The `k8s/ingress.yaml` provisions an internet-facing ALB with ACM TLS; point Route 53 at its DNS name.

---

## Option C: S3 + CloudFront (cheapest, static-only)

If you drop the API routes and database (newsletter via a third-party form), Next.js can export statically:
```js
// next.config.mjs → output: 'export'
```
```bash
npm run build
aws s3 sync out/ s3://devopstools.in --delete
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```
Cost: ~$1–3/month. All tools still work because they are client-side. Revisit Fargate when you need the newsletter API, usage analytics or auth.

---

## Post-deploy checklist
- [ ] `curl -I https://devopstools.in` → 200, HSTS header present
- [ ] Submit `https://devopstools.in/sitemap.xml` in Google Search Console
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Lighthouse: aim ≥95 performance, 100 SEO/accessibility
- [ ] Set up CloudWatch alarms: ALB 5xx > 1%, target response time p95 > 1s, ECS task count < desired
- [ ] Enable RDS automated backups (7 days) and deletion protection
- [ ] Apply for AdSense only after 15–20 fully written blog articles are live (thin templates will be rejected)
