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

