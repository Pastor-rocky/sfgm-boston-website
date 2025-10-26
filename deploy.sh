#!/bin/bash

# Quick Deployment Script for SFGM Boston
# This script helps you prepare for Vercel + Neon deployment

set -e

echo "🚀 SFGM Boston - Deployment Preparation"
echo "========================================"
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL not set. You'll need to add it in Vercel environment variables."
    echo ""
else
    echo "✅ DATABASE_URL is set"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "📝 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for deployment'"
echo "   git push origin main"
echo ""
echo "2. Deploy to Vercel:"
echo "   - Go to https://vercel.com"
echo "   - Import your GitHub repository"
echo "   - Add all environment variables"
echo "   - Deploy!"
echo ""
echo "📖 For detailed instructions, see VERCEL_NEW_DEPLOYMENT_GUIDE.md"
echo ""





