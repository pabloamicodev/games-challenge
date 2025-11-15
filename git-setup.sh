#!/bin/bash
# Git Setup Script for Mac/Linux

echo "🚀 Initializing Git repository..."

# Initialize git repository
git init

# Add all files
echo "📁 Adding files to staging..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: GamerShop frontend with CI/CD pipeline

- Next.js 15 with TypeScript
- Custom state management architecture
- GTM tracking integration
- Toast notifications system
- CI/CD pipeline with GitHub Actions
- Vercel deployment configuration
"

# Rename branch to main
echo "🔀 Setting main branch..."
git branch -M main

# Add remote origin
echo "🔗 Adding remote origin..."
git remote add origin git@github.com:pabloamicodev/games-challenge.git

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

echo "✅ Repository successfully pushed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to GitHub repository settings"
echo "2. Add the following secrets for CI/CD:"
echo "   - VERCEL_TOKEN"
echo "   - VERCEL_ORG_ID"
echo "   - VERCEL_PROJECT_ID"
echo ""
echo "📖 See .github/PIPELINE_SETUP.md for detailed instructions"
