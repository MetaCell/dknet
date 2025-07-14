#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Starting deployment to GitHub Pages..."

# Navigate to the frontend directory
cd applications/dknet/frontend

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Build the project
echo "🔨 Building the project..."
yarn build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
yarn deploy

echo "✅ Deployment completed! Your site should be available at https://metacell.github.io/dknet"
