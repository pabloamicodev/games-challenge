# Git Setup Script for Windows (PowerShell)
# Run this script to initialize and push to GitHub

Write-Host "🚀 Initializing Git repository..." -ForegroundColor Cyan

# Initialize git repository
git init

# Add all files
Write-Host "📁 Adding files to staging..." -ForegroundColor Cyan
git add .

# Create initial commit
Write-Host "💾 Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: GamerShop frontend with CI/CD pipeline

- Next.js 15 with TypeScript
- Custom state management architecture
- GTM tracking integration
- Toast notifications system
- CI/CD pipeline with GitHub Actions
- Vercel deployment configuration
"

# Rename branch to main
Write-Host "🔀 Setting main branch..." -ForegroundColor Cyan
git branch -M main

# Add remote origin
Write-Host "🔗 Adding remote origin..." -ForegroundColor Cyan
git remote add origin git@github.com:pabloamicodev/games-challenge.git

# Push to GitHub
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host "✅ Repository successfully pushed to GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to GitHub repository settings"
Write-Host "2. Add the following secrets for CI/CD:"
Write-Host "   - VERCEL_TOKEN"
Write-Host "   - VERCEL_ORG_ID"
Write-Host "   - VERCEL_PROJECT_ID"
Write-Host ""
Write-Host "📖 See .github/PIPELINE_SETUP.md for detailed instructions"
