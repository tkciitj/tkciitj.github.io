#!/usr/bin/env pwsh
# Git Cleanup Script for GitHub Pages Deployment
# Run this in your portfolio folder

Write-Host "🧹 Starting Git cleanup process..." -ForegroundColor Cyan

# Step 1: Check current status
Write-Host "`n📊 Current git status:" -ForegroundColor Yellow
git status --short

# Step 2: Remove node_modules from git tracking
Write-Host "`n🗑️  Removing node_modules from git tracking..." -ForegroundColor Yellow
git rm --cached -r node_modules 2>$null | Out-Null
Write-Host "✅ node_modules removed"

# Step 3: Remove tsconfig.tsbuildinfo
Write-Host "🗑️  Removing tsconfig.tsbuildinfo..." -ForegroundColor Yellow
git rm --cached tsconfig.tsbuildinfo 2>$null | Out-Null
Write-Host "✅ tsconfig.tsbuildinfo removed"

# Step 4: Remove react-resume-template submodule
Write-Host "🗑️  Removing react-resume-template submodule..." -ForegroundColor Yellow
git rm --cached react-resume-template -r -f 2>$null | Out-Null
if (Test-Path "react-resume-template") {
    Remove-Item "react-resume-template" -Recurse -Force
    Write-Host "✅ react-resume-template folder deleted"
}

# Step 5: Remove .gitmodules file
Write-Host "🗑️  Removing .gitmodules file..." -ForegroundColor Yellow
if (Test-Path ".gitmodules") {
    Remove-Item ".gitmodules" -Force
    git add -u .gitmodules 2>$null | Out-Null
    Write-Host "✅ .gitmodules removed"
}

# Step 6: Remove submodule from git config
Write-Host "🛠️  Cleaning git config..." -ForegroundColor Yellow
git config --remove-section submodule.react-resume-template -f 2>$null | Out-Null
Write-Host "✅ Git config cleaned"

# Step 7: Stage all changes
Write-Host "`n📦 Staging all changes..." -ForegroundColor Yellow
git add .

# Step 8: Show what will be committed
Write-Host "`n📋 Ready to commit the following:" -ForegroundColor Cyan
git status --short

# Step 9: Commit
Write-Host "`n💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Fix: Clean git repository - remove submodules and node_modules from tracking

- Remove react-resume-template submodule reference
- Remove node_modules from git cache (keep in .gitignore)
- Remove tsconfig.tsbuildinfo from tracking
- Clean git configuration
- Ready for GitHub Pages deployment"

# Step 10: Force push to GitHub
Write-Host "`n🚀 Force pushing to GitHub..." -ForegroundColor Yellow
git push -f origin main

Write-Host "`n✅ All done! Your repository is ready for deployment!" -ForegroundColor Green
Write-Host "📝 GitHub Actions should trigger automatically." -ForegroundColor Cyan
Write-Host "🌐 Check your site at: https://tkciitj.github.io (in 2-3 minutes)" -ForegroundColor Green
