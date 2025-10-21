#!/bin/bash

# SFGM Boston Bible School - VPS Deployment Script for Namecheap
# This script automates deployment to your VPS

set -e  # Exit on any error

echo "🚀 Starting SFGM Boston Bible School VPS Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

print_step "Step 1: Preparing deployment package..."

# Create deployment directory
mkdir -p deployment
cd deployment

# Copy necessary files
cp -r ../dist .
cp ../package.json .
cp ../package-lock.json .
cp ../ecosystem.config.js .
cp ../.env.production .
cp -r ../public .

# Create logs directory
mkdir -p logs

print_status "✅ Deployment package created"

print_step "Step 2: Creating VPS setup script..."

cat > setup-vps.sh << 'EOF'
#!/bin/bash

# VPS Setup Script for SFGM Boston Bible School
echo "🔧 Setting up VPS for SFGM Boston Bible School..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Install PM2 globally
sudo npm install -g pm2

# Install nginx
sudo apt-get install -y nginx

# Create application directory
sudo mkdir -p /var/www/sfgm-boston
sudo chown -R $USER:$USER /var/www/sfgm-boston

# Setup PostgreSQL database
sudo -u postgres psql << 'POSTGRES_EOF'
CREATE DATABASE sfgm_boston;
CREATE USER sfgm_user WITH PASSWORD 'sfgm_secure_password_2024';
GRANT ALL PRIVILEGES ON DATABASE sfgm_boston TO sfgm_user;
\q
POSTGRES_EOF

echo "✅ VPS setup completed!"
echo "📝 Database created: sfgm_boston"
echo "👤 Database user: sfgm_user"
echo "🔑 Database password: sfgm_secure_password_2024"
echo ""
echo "Next steps:"
echo "1. Upload your files to /var/www/sfgm-boston/"
echo "2. Update .env.production with database credentials"
echo "3. Run: npm ci --production"
echo "4. Run: npm run pm2:start"
EOF

chmod +x setup-vps.sh

# Step 6: Clean database and create PastorRocky user
print_step "Step 6: Cleaning database for fresh start..."

cat > cleanup-and-setup.sh << 'EOF'
#!/bin/bash

# Database cleanup and PastorRocky setup
echo "🧹 Setting up fresh database with PastorRocky only..."

# Run database cleanup
node --env-file=.env.production node_modules/.bin/tsx cleanup-database.ts

# Create PastorRocky user
node --env-file=.env.production node_modules/.bin/tsx create-pastor-rocky.ts

echo "✅ Database setup completed!"
echo "👨‍💼 PastorRocky user ready"
echo "📝 Students can now register fresh"
EOF

chmod +x cleanup-and-setup.sh

print_step "Step 3: Creating deployment instructions..."

cat > DEPLOYMENT_INSTRUCTIONS.md << 'EOF'
# 🚀 SFGM Boston VPS Deployment Instructions

## Prerequisites
- VPS with Ubuntu/Debian
- SSH access to your server
- Domain: sfgmboston.com

## Step 1: Connect to Your VPS
```bash
ssh root@YOUR_VPS_IP
# or
ssh username@YOUR_VPS_IP
```

## Step 2: Upload Files
### Option A: Using SCP (from your local machine)
```bash
scp -r deployment/* root@YOUR_VPS_IP:/var/www/sfgm-boston/
```

### Option B: Using Git (if you have git on VPS)
```bash
cd /var/www/sfgm-boston
git clone YOUR_REPO_URL .
```

## Step 3: Setup VPS
```bash
cd /var/www/sfgm-boston
chmod +x setup-vps.sh
./setup-vps.sh
```

## Step 4: Configure Environment
```bash
# Update database URL in .env.production
nano .env.production

# Update this line:
DATABASE_URL=postgresql://sfgm_user:sfgm_secure_password_2024@localhost:5432/sfgm_boston
```

## Step 5: Deploy Application
```bash
# Install dependencies
npm ci --production

# Run database migrations
npm run db:push

# Clean database and setup PastorRocky only
chmod +x cleanup-and-setup.sh
./cleanup-and-setup.sh

# Start application
npm run pm2:start

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## Step 6: Configure Nginx
```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/sfgm-boston
sudo ln -s /etc/nginx/sites-available/sfgm-boston /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 7: Setup SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d sfgmboston.com -d www.sfgmboston.com
```

## Step 8: Configure DNS
In Namecheap DNS settings:
- A Record: @ → YOUR_VPS_IP
- CNAME: www → sfgmboston.com

## Step 9: Test Your Site
Visit: https://sfgmboston.com

## Management Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs sfgm-boston

# Restart application
pm2 restart sfgm-boston

# Stop application
pm2 stop sfgm-boston
```

## Troubleshooting
- Check logs: `pm2 logs sfgm-boston`
- Check nginx: `sudo nginx -t`
- Check database: `sudo -u postgres psql -d sfgm_boston`
EOF

print_status "✅ Deployment instructions created"

print_step "Step 4: Creating nginx configuration..."

cat > nginx.conf << 'EOF'
server {
    listen 80;
    server_name sfgmboston.com www.sfgmboston.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sfgmboston.com www.sfgmboston.com;
    
    # SSL Configuration (will be updated by Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/sfgmboston.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sfgmboston.com/privkey.pem;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # Static Files
    location /public/ {
        alias /var/www/sfgm-boston/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API Routes
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Main Application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

print_status "✅ Nginx configuration created"

cd ..

print_status "🎉 VPS deployment package ready!"
print_warning "Next steps:"
print_warning "1. Get your VPS IP address from Namecheap"
print_warning "2. Upload the 'deployment' folder to your VPS"
print_warning "3. Follow the instructions in DEPLOYMENT_INSTRUCTIONS.md"
print_warning "4. Update DNS settings to point to your VPS IP"

echo ""
print_status "📁 Files created in 'deployment' folder:"
echo "   - dist/ (built application)"
echo "   - public/ (static files)"
echo "   - package.json"
echo "   - ecosystem.config.js"
echo "   - .env.production"
echo "   - setup-vps.sh"
echo "   - nginx.conf"
echo "   - DEPLOYMENT_INSTRUCTIONS.md"
echo ""
print_status "🚀 Ready to deploy to your VPS!"
