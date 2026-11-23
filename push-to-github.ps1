<#
.SYNOPSIS
  Interactive helper to commit and push GuessMaster Pro updates/bugfixes to GitHub.
#>

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

Write-Host "=== GuessMaster Pro — GitHub Push Helper ===" -ForegroundColor Cyan

# Ensure remote origin exists
$remotes = git remote
if (-not ($remotes -contains "origin")) {
  $repoUrl = Read-Host "Paste your empty GitHub repo URL (e.g. https://github.com/USERNAME/guessmaster-pro.git)"
  if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Aborted: No GitHub repository URL provided." -ForegroundColor Red
    exit 1
  }
  git remote add origin $repoUrl
  Write-Host "Added remote origin: $repoUrl" -ForegroundColor Green
}

git status -s

$status = git status --porcelain
if (-not [string]::IsNullOrWhiteSpace($status)) {
  $msg = Read-Host "Enter commit message (leave blank for 'Update app / fix bugs')"
  if ([string]::IsNullOrWhiteSpace($msg)) {
    $msg = "Update app / fix bugs"
  }
  git add -A
  git commit -m $msg
} else {
  Write-Host "No new file changes to commit; pushing existing commits..." -ForegroundColor Yellow
}

git branch -M main
git push -u origin main
Write-Host "Successfully pushed to GitHub! GitHub Pages / Vercel will auto-deploy shortly." -ForegroundColor Green
