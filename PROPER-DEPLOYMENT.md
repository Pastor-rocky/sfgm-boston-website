# 🚀 Proper Deployment Guide for SFGM Boston

You have a **full Express server**, so deploy it as a traditional Node.js app.

## ✅ Best Options for Deployment

### Option 1: Railway (Recommended) 🚂
- **Price:** $5/month + usage
- **Setup:** 5 minutes
- **Best for:** Full-stack apps with databases

### Option 2: Fly.io ⚡
- **Price:** Free tier available
- **Setup:** 10 minutes
- **Best for:** Global edge deployment

### Option 3: Your Own Server (VPS)
- **Price:** $5-20/month
- **Setup:** 30+ minutes
- **Best for:** Maximum control

## 🚂 Quick Start: Deploy to Railway

### 1. Go to Railway
- Visit: https://railway.app
- Sign up with GitHub

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose: `Pastor-rocky/sfgm-boston-website`

### 3. Add Environment Variables
In Railway project settings, add:

```env
DATABASE_URL=your-neon-connection-string
NODE_ENV=production
EMAILJS_SERVICE_ID=service_bhhbgpr
EMAILJS_TEMPLATE_ID=template_7aa3jen
EMAILJS_PUBLIC_KEY=UPTEDM8MNxgzaRzV3
JWT_SECRET=your-secret
SESSION_SECRET=your-secret
DOMAIN_URL=https://your-app.railway.app
CORS_ORIGIN=https://your-app.railway.app
ADMIN_EMAIL=pastor_rocky@sfgmboston.com
```

### 4. Configure Build
Railway will auto-detect:
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Port:** Set to `3000`

### 5. Deploy!
Railway will automatically build and deploy your app.

## 🔄 What Happens

1. Railway builds your app: `npm run build`
2. Starts the Express server: `npm start`
3. Your app runs on: `your-app.railway.app`
4. Database connects to Neon automatically

## ✅ You're Live!

Your SFGM Boston Bible School will be running with:
- ✅ Full Express API
- ✅ React frontend
- ✅ PostgreSQL database
- ✅ Email functionality
- ✅ Everything working!

## 📝 Next Steps After Deployment

1. Visit your Railway URL
2. Login with: `pastor.rocky` / `admin123`
3. Test all features
4. Change default passwords!

---

**Railway is the easiest option and handles everything for you!** 🎉

---

## 🛑 Switch from Vercel

Since Vercel doesn't work well with full Express servers, you can delete the Vercel project and use Railway only.

**Vercel:** Good for frontend-only
**Railway:** Good for full-stack apps (what you need!)

You don't need Vercel at all - Railway will host everything! 🎉
