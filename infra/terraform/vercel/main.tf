terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}

resource "vercel_project" "main" {
  name      = "desknest"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "koooommmm/desknest"
  }
  root_directory = "frontend"
}
