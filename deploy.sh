#!/bin/bash

# SFGM Boston Bible School - Namecheap Deployment Script
# This script automates the deployment process to your Namecheap hosting

set -e  # Exit on any error

echo "🚀 Starting SFGM Boston Bible School Deployment to Namecheap..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm ci --production

# Step 2: Build the application
print_status "Building application for production..."
npm run build

# Step 3: Create necessary directories
print_status "Creating deployment directories..."
mkdir -p logs
mkdir -p public/uploads
mkdir -p public/textbook-pdfs

# Step 4: Set proper permissions
print_status "Setting file permissions..."
chmod +x dist/index.js
chmod 755 public/uploads
chmod 755 public/textbook-pdfs

# Step 5: Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    print_status "Installing PM2 process manager..."
    npm install -g pm2
fi

# Step 6: Start the application with PM2
print_status "Starting application with PM2..."
pm2 start ecosystem.config.js --env production

# Step 7: Save PM2 configuration
print_status "Saving PM2 configuration..."
pm2 save

# Step 8: Setup PM2 startup script
print_status "Setting up PM2 startup script..."
pm2 startup

print_status "✅ Deployment completed successfully!"
print_warning "Don't forget to:"
print_warning "1. Update your .env.production file with actual values"
print_warning "2. Configure your domain DNS settings in Namecheap"
print_warning "3. Setup SSL certificate (Namecheap provides free SSL)"
print_warning "4. Configure nginx if using reverse proxy"

echo ""
print_status "Your SFGM Boston Bible School is now running on port 3000"
print_status "Check status with: pm2 status"
print_status "View logs with: pm2 logs sfgm-boston"
print_status "Restart with: pm2 restart sfgm-boston"



