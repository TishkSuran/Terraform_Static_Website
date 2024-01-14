# Terraform_Static_Website

### Terraform Providers Block
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.6"
}
```
In the provided Terraform configuration, we establish the ground work for managing our infrastructure on AWS. The <strong>'terraform'</strong> block sets the stage, indicating our dependency on the AWS provider and specifying version constraints to ensure compatability. The <strong>'required_providers'</strong> section precisely identifies the source as "hashicorp/aws" and sets a pessismitic version constraint of "~>5.0" This structured approach ensures version control as well as maintainability and consistency. 

<br>

### Terraform Variable Blocks 

```hcl
variable "region" {
  default = "eu-west-2"
}

variable "bucket_name_prefix" {
  default = "terraform-portfolio"
}
```
This project does not contain local variables; instead, we have opted for the use of input variables to allow for greater flexibility. The main difference between input variables and local variables in Terraform is that input variables can be changed, as the name implies, via inputs (such as var files or via the command line). However, local variables are private; you can only edit them by altering the code.

<br>

We have two input variables. One of them defines the AWS region in this case, 'eu-west-2' (London) as well as the bucket name prefix, which will be used to name our bucket later down the line.

<br>

### Extension of Terraform Provider Block

```hcl
provider "aws" {
  region = var.region
}
```

Here, using the variable <strong>region</strong> that we defined above, we declare the AWS region, which in this case is eu-west-2.

<br>

### Template Files Terraform Module 

```hcl
module "template_files" {
  source   = "hashicorp/dir/template"
  base_dir = "${path.module}/PPC"
}
```

This module instructs Terraform to use the module located in hte "hashicorp/dir/template" directory, which is a template module for preparing static files and templates. It sets the base_dir (base directory) to the directory PPC, which in my case, is the directory that contains all the files I want to host onto this S3 bucket.

<br>

### Random Numeric String Generator Resource Block

```hcl
resource "random_string" "string_suffix" {
  length      = 8
  special     = false
  upper       = false
  lower       = true
  numeric     = true
  min_numeric = 8
}
```
This resource block defines a random string that will generate a string of length 8. By configuring the parameters as shown above, only numeric digits will be included. This string will be appended to our S3 bucket name to ensure its uniqueness.

<br>

### AWS S3 Bucket Resource Block

```hcl
resource "aws_s3_bucket" "s3_bucket" {
  bucket = "${var.bucket_name_prefix}-${random_string.string_suffix.result}"

  tags = {
    Description = "Bucket used for hosting a static website."
  }
}
```

The only required parameter for S3 buckets is the bucket name. Here, we integrate one of the resource blocks we defined ('random_string') with one of the variables we declared near the start of this project ('bucket_name_prefix'). This naming approach for our S3 bucket ensures that the name is always unique, enhancing scalability and consistency in case of future expansion.

<br>

### AWS S3 Bucket Public Access Block 

```hcl
resource "aws_s3_bucket_public_access_block" "website" {
  bucket                   = aws_s3_bucket.s3_bucket.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
```

This Terraform configuration ensures that for the S3 bucket we created and specified by using ID identification ('aws_s3_bucket.s3_bucket.id') does not have restrictions on public access. It sets various parameters to fales, to allow public access control lists, public bucket policies as well as public access to objects within the bucket. We have added this block and set these parameters to make our static website publically accessible. 

<br>

### AWS S3 Bucket Policy Resource Block 

```hcl
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
```

This Terraform configuration defines an Amazon S3 bucket policy for the S3 bucket we previously created. This policy allows public read access to objects we added in the S3 bucket. The "jsonencode" function is used to convert the policy definition into JSON format, and this JSON policy is then associated with the S3 bucket specified in the "bucket" parameter.




