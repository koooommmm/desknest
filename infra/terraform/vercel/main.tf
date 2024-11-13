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
  framework = "vite"
  git_repository = {
    type = "github"
    repo = "koooommmm/desknest"
  }
}

data "vercel_project_directory" "main" {
  path = "../../../frontend"
}

resource "vercel_deployment" "main" {
  project_id  = vercel_project.main.id
  files       = data.vercel_project_directory.main.files
  path_prefix = "../../../frontend"
  production  = true
}
