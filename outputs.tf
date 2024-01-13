output "website_endpoint" {
  description = "URL of the hosted website"
  value       = aws_s3_bucket_website_configuration.hosting_bucket_website_configuration.website_endpoint
}

output "s3_bucket_name" {
  value = aws_s3_bucket.s3_bucket.bucket
}
