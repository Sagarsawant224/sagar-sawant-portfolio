variable "aws_region" {
  description = "Primary AWS region for S3 bucket"
  type        = string
  default     = "ap-south-1"
}

variable "domain_name" {
  description = "Root domain"
  type        = string
  default     = "sagarsawant.dev"
}

variable "www_domain_name" {
  description = "www subdomain"
  type        = string
  default     = "www.sagarsawant.dev"
}

variable "github_repo" {
  description = "GitHub repo in owner/repo format — OIDC trust is scoped to this repo's main branch"
  type        = string
  default     = "Sagarsawant224/sagar-sawant-portfolio"
}
