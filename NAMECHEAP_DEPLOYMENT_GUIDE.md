# 🚀 SFGM Boston Bible School - Namecheap Deployment Guide

## 📋 Prerequisites

Before deploying to Namecheap, ensure you have:

1. **Namecheap Account** with hosting plan
2. **Domain Name** registered with Namecheap
3. **Database** (PostgreSQL recommended - can use Namecheap's database hosting)
4. **Email Service** (EmailJS account configured)
5. **SMS Service** (TextBelt account configured)

## 🔧 Step 1: Prepare Your Environment

### 1.1 Update Environment Variables
Copy `env.production.example` to `.env.production` and update with your actual values:

```bash
cp env.production.example .env.production
```

**Required Environment Variables:**
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://username:password@host:port/database
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
TEXTBELT_API_KEY=your_textbelt_key
DOMAIN_URL=https://yourdomain.com
ADMIN_EMAIL=pastor_rocky@sfgmboston.com
JWT_SECRET=your_secure_jwt_secret
SESSION_SECRET=your_secure_session_secret
```

### 1.2 Database Setup
1. Create a PostgreSQL database on Namecheap
2. Run migrations: `npm run db:push`
3. Update `DATABASE_URL` in `.env.production`

## 🌐 Step 2: Namecheap Hosting Setup

### 2.1 Upload Files to Namecheap
1. **Via cPanel File Manager:**
   - Upload your entire project folder to `/public_html/`
   - Or upload via FTP/SFTP

2. **Via SSH (if available):**
   ```bash
   # Upload files to your server
   scp -r . username@yourdomain.com:/var/www/sfgm-boston/
   ```

### 2.2 Install Node.js and Dependencies
1. **SSH into your Namecheap server**
2. **Install Node.js** (if not already installed):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

4. **Install project dependencies:**
   ```bash
   cd /var/www/sfgm-boston
   npm ci --production
   ```

## 🚀 Step 3: Deploy Your Application

### 3.1 Run Deployment Script
```bash
cd /var/www/sfgm-boston
./deploy.sh
```

### 3.2 Manual Deployment (Alternative)
```bash
# Build the application
npm run build

# Start with PM2
npm run pm2:start

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
```

## 🔒 Step 4: Configure Domain and SSL

### 4.1 DNS Configuration
In your Namecheap account:
1. Go to **Domain List**
2. Click **Manage** next to your domain
3. Go to **Advanced DNS**
4. Add/Update these records:
   ```
   Type: A Record
   Host: @
   Value: [Your server IP]
   TTL: 300

   Type: CNAME Record
   Host: www
   Value: yourdomain.com
   TTL: 300
   ```

### 4.2 SSL Certificate
1. **Enable SSL in cPanel:**
   - Go to **SSL/TLS** in cPanel
   - Click **Let's Encrypt**
   - Enable SSL for your domain

2. **Or configure nginx** (if using):
   - Update `nginx.conf` with your SSL certificate paths
   - Restart nginx: `sudo systemctl restart nginx`

## 📊 Step 5: Monitor Your Application

### 5.1 Check Application Status
```bash
# Check PM2 status
npm run pm2:status

# View logs
npm run pm2:logs

# Restart if needed
npm run pm2:restart
```

### 5.2 Test Your Website
1. Visit `https://yourdomain.com`
2. Test registration/login functionality
3. Verify email notifications work
4. Check course enrollment

## 🔧 Step 6: Maintenance Commands

### 6.1 Application Management
```bash
# Start application
npm run pm2:start

# Stop application
npm run pm2:stop

# Restart application
npm run pm2:restart

# View logs
npm run pm2:logs

# Check status
npm run pm2:status
```

### 6.2 Database Management
```bash
# Push schema changes
npm run db:push

# Backup database (recommended)
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

## 🚨 Troubleshooting

### Common Issues:

1. **Application won't start:**
   - Check logs: `npm run pm2:logs`
   - Verify environment variables
   - Check database connection

2. **SSL issues:**
   - Ensure SSL certificate is properly installed
   - Check nginx configuration
   - Verify domain DNS settings

3. **Email not working:**
   - Verify EmailJS configuration
   - Check API keys in environment variables
   - Test email service independently

4. **Database connection issues:**
   - Verify DATABASE_URL format
   - Check database server status
   - Ensure firewall allows database connections

## 📞 Support

If you encounter issues:
1. Check PM2 logs: `npm run pm2:logs`
2. Verify all environment variables are set correctly
3. Test database connectivity
4. Check Namecheap hosting status

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] Files uploaded to server
- [ ] Dependencies installed
- [ ] Application built and started
- [ ] Domain DNS configured
- [ ] SSL certificate installed
- [ ] Application tested and working
- [ ] PM2 startup configured
- [ ] Monitoring setup complete

---

**Your SFGM Boston Bible School is now live! 🎉**

Students can now access your platform at `https://yourdomain.com`





