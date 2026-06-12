# ---------------------------------------------------------------------------
# Outputs
# ---------------------------------------------------------------------------

output "s3_bucket_name" {
  description = "S3 bucket name for GitHub Actions sync"
  value       = aws_s3_bucket.portfolio.bucket
}

output "github_actions_role_arn" {
  description = "Add as GitHub secret: AWS_ROLE_ARN"
  value       = aws_iam_role.github_actions.arn
}

