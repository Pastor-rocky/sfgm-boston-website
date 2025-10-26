# 🚀 Deploy SFGM Boston to GitHub + Vercel + Neon Database

Complete deployment guide for modern, scalable hosting.

## 📋 Prerequisites

1. **GitHub Account** (github.com)
2. **Vercel Account** (vercel.com) - Free tier available
3. **Neon Database Account** (neon.tech) - Free tier available
4. **EmailJS Account** (emailjs.com) - For email functionality

## 🗄️ Step 1: Setup Neon Database

### 1.1 Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub (recommended)
3. Create a new project: `sfgm-boston`
4. Choose region closest to your users (US East recommended)

### 1.2 Get Database Connection String
1. In Neon dashboard, go to **Connection Details**
2. Copy the **Connection String** (looks like: `postgresql://user:password@host/dbname`)
3. Save this for Step 3

### 1.3 Run Database Migrations
```bash
# In your local project, set the database URL
export DATABASE_URL="your-neon-connection-string"

# Run migrations to create tables
npm run db:push
```

## 📦 Step 2: Push Code to GitHub

### 2.1 Initialize Git Repository (if not already done)
```bash
cd /Users/rocky/Desktop/BostonMinistry

# Check if git repo exists
git status

# If not initialized, run:
# git init
# git add .
# git commit -m "Initial commit"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `sfgm-boston` (or your preference)
3. Set to **Private** (recommended for production)
4. Click **Create repository**

### 2.3 Push Code to GitHub
```bash
# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/sfgm-boston.git

# Push code
git branch -M main
git push -u origin main
```

## ☁️ Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **Add New Project**
4. Select your `sfgm-boston` repository
5. Click **Import**

### 3.2 Configure Project Settings

Vercel will auto-detect from `vercel.json`:

**Framework Preset:** Other

**Root Directory:** `./` (leave as default)

**Build Command:** (auto-detected)
```bash
npm run build
```

**Output Directory:** (auto-detected)
```
dist/public
```

**Install Command:** (auto-detected)
```bash
npm install
```

**Note:** The project already includes `vercel.json` configuration for optimal deployment!

### 3.3 Add Environment Variables

In Vercel project settings → **Environment Variables**, add:

```env
# Database
DATABASE_URL=your-neon-connection-string-here

# Node Environment
NODE_ENV=production
PORT=3000

# Email Configuration (EmailJS)
EMAILJS_SERVICE_ID=service_bhhbgpr
EMAILJS_TEMPLATE_ID=template_7aa3jen
EMAILJS_PUBLIC_KEY=UPTEDM8MNxgzaRzV3

# Security Secrets (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-change-this
SESSION_SECRET=your-super-secret-session-key-change-this

# Domain (update after deployment)
DOMAIN_URL=https://your-project.vercel.app
ADMIN_EMAIL=pastor_rocky@sfgmboston.com

# CORS
CORS_ORIGIN=https://your-project.vercel.app
```

**Important:** After Vercel deploys, copy your production URL and update `DOMAIN_URL` and `CORS_ORIGIN`.

### 3.4 Deploy!

Click **Deploy** and wait 2-3 minutes. 🎉

## ✅ Step 4: Post-Deployment Setup

### 4.1 Update Environment Variables
1. After first deployment, copy your Vercel URL (e.g., `sfgm-boston.vercel.app`)
2. Go to Project Settings → Environment Variables
3. Update:
   - `DOMAIN_URL=https://your-actual-url.vercel.app`
   - `CORS_ORIGIN=https://your-actual-url.vercel.app`

### 4.2 Redeploy
1. Go to Deployments tab
2. Click **Redeploy** on latest deployment
3. Select latest commit and redeploy

### 4.3 (Optional) Add Custom Domain
1. In Vercel project settings, go to **Domains**
2. Add your custom domain (e.g., `sfgmboston.com`)
3. Follow DNS configuration instructions
4. Update environment variables with custom domain

## 🔄 Step 5: Enable Automatic Deployments

### Automatic Deployments are Already Enabled! ✨

With GitHub + Vercel integration, every push to `main` branch automatically:
- ✅ Triggers new deployment
- ✅ Runs build
- ✅ Deploys to production

No manual steps needed!

## 📊 Monitoring Your Site

### View Logs
1. Go to Vercel dashboard
2. Select your project
3. Click **Deployments** tab
4. Click on a deployment to view logs

### Check Database
1. Go to Neon dashboard
2. Open **Query Editor**
3. Run queries to verify data

## 🔧 Troubleshooting

### Build Fails
**Error:** Build command failed
**Solution:** Check build logs in Vercel dashboard. Common issues:
- Missing environment variables
- Build script errors
- Missing dependencies

### Database Connection Issues
**Error:** Cannot connect to database
**Solution:** 
1. Verify `DATABASE_URL` in Vercel environment variables
2. Check Neon dashboard for connection string
3. Ensure Neon database is running (free tier pauses after 7 days of inactivity)

### 404 Errors on Routes
**Error:** Page not found
**Solution:** Update `vercel.json` routes configuration (already configured for this project)

### Environment Variables Not Working
**Solution:**
1. Redeploy after adding/changing environment variables
2. Variables only update on new deployments
3. Check variable names match exactly (case-sensitive)

## 🚀 Quick Deploy Commands

```bash
# Build locally to test
npm run build

# Push changes to trigger deployment
git add .
git commit -m "Update: description of changes"
git push origin main

# View deployment status
# (Check Vercel dashboard)
```

## 📝 Environment Variable Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ Yes | Neon PostgreSQL connection string | `postgresql://...` |
| `NODE_ENV` | ✅ Yes | Environment mode | `production` |
| `EMAILJS_SERVICE_ID` | ✅ Yes | EmailJS service ID | `service_bhhbgpr` |
| `EMAILJS_TEMPLATE_ID` | ✅ Yes | Email template ID | `template_7aa3jen` |
| `EMAILJS_PUBLIC_KEY` | ✅ Yes | EmailJS public key | `UPTEDM8MNxgzaRzV3` |
| `JWT_SECRET` | ✅ Yes | JWT signing secret | (random string) |
| `SESSION_SECRET` | ✅ Yes | Session secret | (random string) |
| `DOMAIN_URL` | ✅ Yes | Your domain | `https://sfgmboston.vercel.app` |
| `CORS_ORIGIN` | ✅ Yes | CORS origin | `https://sfgmboston.vercel.app` |
| `ADMIN_EMAIL` | No | Admin email | `pastor_rocky@sfgmboston.com` |

## ✅ Deployment Checklist

- [ ] Neon database created and connection string saved
- [ ] Database migrations run successfully
- [ ] Code pushed to GitHub repository
- [ ] Vercel project imported from GitHub
- [ ] All environment variables added to Vercel
- [ ] First deployment successful
- [ ] Updated DOMAIN_URL and CORS_ORIGIN with actual URL
- [ ] Redeployed with correct environment variables
- [ ] Tested site functionality (login, signup, etc.)
- [ ] Custom domain configured (optional)

## 🎉 You're Live!

Your SFGM Boston Bible School is now running on:
- ⚡ **Vercel**: Fast, global CDN
- 🗄️ **Neon**: Serverless PostgreSQL database
- 🔄 **GitHub**: Automatic deployments
- 🔒 **HTTPS**: SSL certificates included
- 📊 **Analytics**: Built-in performance monitoring

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Neon Docs**: https://neon.tech/docs
- **GitHub Actions**: Check repository for CI/CD

---

**Last Updated:** January 2025
**Status:** ✅ Production Ready
