# sagarsawant.dev

Personal portfolio built with React, TypeScript, and Vite. Deployed on AWS S3 + CloudFront with Cloudflare DNS, Terraform IaC, and GitHub Actions CI/CD.

---

## Architecture

```
![Architecture](/docs/architecture.png)
```


| Component | Purpose |
|---|---|
| **Cloudflare** | DNS + proxy, hides CloudFront origin |
| **ACM** | TLS certificate attached to CloudFront |
| **CloudFront** | CDN, HTTPS termination, SPA routing fix |
| **OAC** | Signs CloudFront → S3 requests with SigV4 |
| **S3** | Hosts static build, not publicly accessible |
| **Bucket policy** | Allows access only from this CloudFront distribution |

---

## Infrastructure (Terraform)

State stored remotely in a dedicated S3 bucket (`sagarsawant-portfolio-tfstate`).

```bash
cd infrastructure
terraform init
terraform plan
terraform apply
```

---

## AWS Auth (GitHub Actions OIDC)

No long-lived keys. GitHub Actions authenticates via OIDC federation — requests a signed JWT, exchanges it with AWS STS for temporary credentials scoped to this repo and branch only.

```yaml
permissions:
  id-token: write
  contents: read
```

---

## Deployment

Every push to `main` (excluding `infrastructure/**` and `.github/workflows/**`) triggers:

1. `npm run build` → `dist/`
2. Sync HTML + PDF → S3 (`no-cache`)
3. Sync assets → S3 (`max-age=31536000, immutable`, `--delete`)
4. Invalidate CloudFront `/*`

---

## Local dev

```bash
npm install
npm run dev
npm run build
```
