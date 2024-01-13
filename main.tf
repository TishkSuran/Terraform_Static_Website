module "template_files" {
  source   = "hashicorp/dir/template"
  base_dir = "${path.module}/PPC"
}

resource "random_string" "string_suffix" {
  length      = 8
  special     = false
  upper       = false
  lower       = true
  numeric     = true
  min_numeric = 8
}

resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket_name_prefix}-${random_string.string_suffix.result}"

  tags = {
    Name = "Bucket used for hosting a static website."
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                   = aws_s3_bucket.s3_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "hosting_bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket.bucket
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.s3_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "hosting_bucket_website_configuration" {
  bucket = aws_s3_bucket.s3_bucket.id

  index_document {
    suffix = "index.html"
  }
}

resource "aws_s3_object" "hosting_bucket_files" {
  bucket = aws_s3_bucket.s3_bucket.id

  for_each     = module.template_files.files
  key          = each.key
  content_type = each.value.content_type
  source       = each.value.source_path
  content      = each.value.content
  etag         = each.value.digests.md5
}
