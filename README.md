# SFGM Boston Bible School

A modern, online Bible school platform for students to learn, grow, and serve.

## 🚀 Quick Start

### Deploy to Production (Recommended)

The easiest way to deploy this application:

1. **Follow the complete deployment guide:** [`VERCEL_NEW_DEPLOYMENT_GUIDE.md`](VERCEL_NEW_DEPLOYMENT_GUIDE.md)
2. **Stack:** GitHub + Vercel + Neon Database
3. **Result:** Live website in ~10 minutes

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server (local)
npm start
```

## 📁 Project Structure

```
BostonMinistry/
├── client/              # React frontend
│   └── src/
│       ├── pages/      # Page components
│       ├── components/ # Reusable components
│       └── lib/        # Utilities
├── server/             # Express backend
│   ├── index.ts       # Server entry point
│   ├── routes.ts      # API routes
│   └── storage.ts     # Database operations
├── shared/            # Shared types & schemas
├── api/               # Vercel serverless functions
├── public/            # Static assets
└── dist/              # Build output
```

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL (via Drizzle ORM)
- **Deployment:** Vercel (hosting) + Neon (database)
- **Email:** EmailJS
- **Build:** Vite, esbuild

## 📖 Features

- ✅ Student enrollment and course management
- ✅ Interactive quizzes with progress tracking
- ✅ E-book reader with audio support
- ✅ Certificate generation
- ✅ Progress tracking and analytics
- ✅ Mobile-responsive design
- ✅ User authentication
- ✅ Instructor portal

## 🌐 Deployment Options

### Option 1: Vercel + Neon (Recommended) ⭐

- **Best for:** Production deployment
- **Cost:** Free tier available
- **Guide:** See [`VERCEL_NEW_DEPLOYMENT_GUIDE.md`](VERCEL_NEW_DEPLOYMENT_GUIDE.md)

### Option 2: Self-Hosted (Namecheap/VPS)

- **Best for:** Custom hosting
- **Guide:** See [`NAMECHEAP_DEPLOYMENT_GUIDE.md`](NAMECHEAP_DEPLOYMENT_GUIDE.md)

## 📝 Environment Variables

Required environment variables for deployment:

```env
DATABASE_URL=postgresql://...
NODE_ENV=production
EMAILJS_SERVICE_ID=service_xxx
EMAILJS_TEMPLATE_ID=template_xxx
EMAILJS_PUBLIC_KEY=xxx
JWT_SECRET=xxx
SESSION_SECRET=xxx
DOMAIN_URL=https://your-domain.com
CORS_ORIGIN=https://your-domain.com
```

See [`VERCEL_NEW_DEPLOYMENT_GUIDE.md`](VERCEL_NEW_DEPLOYMENT_GUIDE.md) for full details.

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/sfgm-boston.git
cd sfgm-boston

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:push

# Start development server
npm run dev
```

## 📚 Documentation

- [Deployment Guide (Vercel + Neon)](VERCEL_NEW_DEPLOYMENT_GUIDE.md)
- [Self-Hosted Deployment](NAMECHEAP_DEPLOYMENT_GUIDE.md)
- [Course Creation Guide](COURSE-CREATION-GUIDE.md)
- [Automation System](AUTOMATION-SYSTEM-SUMMARY.md)

## 🤝 Contributing

This project is maintained by SFGM Boston. For questions or support, contact: pastor_rocky@sfgmboston.com

## 📄 License

Copyright © SFGM Boston. All rights reserved.

---

**Built with ❤️ for advancing God's kingdom**
