# ---------------------------------------------------------------------------
# OIDC — GitHub Actions federates into AWS, no long-lived credentials
#
# How it works:
#   1. GitHub Actions job requests a short-lived JWT from GitHub's OIDC provider
#   2. AWS STS validates the JWT against the OIDC thumbprint
#   3. STS returns temporary credentials (valid for 1 hour)
#   4. Job uses those creds — nothing stored in GitHub secrets
# ---------------------------------------------------------------------------

# GitHub's OIDC provider — register it once per AWS account
# If it already exists in your account, import it:
#   terraform import aws_iam_openid_connect_provider.github \
#     arn:aws:iam::<account_id>:oidc-provider/token.actions.githubusercontent.com

resource "aws_iam_openid_connect_provider" "github" {
  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]

  # GitHub's OIDC thumbprint (SHA-1 of their TLS cert root CA)
  # Stable — only changes if GitHub rotates their root CA
  thumbprint_list = ["22ff89586561fc2d52f77491e9f1eff1b80be33e"]

  tags = {
    Project   = "portfolio"
    ManagedBy = "terraform"
  }
}

# IAM Role — assumed by GitHub Actions via OIDC federation
resource "aws_iam_role" "github_actions" {
  name        = "portfolio-github-actions-role"
  description = "Assumed by GitHub Actions OIDC for sagarsawant.dev deploys"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "GitHubOIDCFederation"
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            # Locks the role to YOUR repo only — not any GitHub repo
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:ref:refs/heads/main"
          }
        }
      }
    ]
  })

  tags = {
    Project   = "portfolio"
    ManagedBy = "terraform"
  }
}

# Least-privilege policy — S3 sync + CloudFront invalidation only
resource "aws_iam_role_policy" "github_actions" {
  name = "portfolio-deploy-policy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3SyncPortfolio"
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:GetObject",
          "s3:ListBucket",
        ]
        Resource = [
          aws_s3_bucket.portfolio.arn,
          "${aws_s3_bucket.portfolio.arn}/*",
        ]
      },
      {
        Sid    = "CloudFrontInvalidate"
        Effect = "Allow"
        Action = [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:ListInvalidations",
        ]
        Resource = data.aws_cloudfront_distribution.portfolio.arn
      }
    ]
  })
}
