# Database Seeding Required on Railway

## What Happened

The website was reset to commit `78171c1` (Oct 27, 10:07 AM) - the last working state with all course content.

The Railway database currently has **NO course content** (videos, quizzes, readings).

## What Needs to Happen

You need to **run these seeding scripts on Railway** to populate the database:

### 1. Seed Videos
```bash
npm run seed:videos
```

### 2. Seed Quizzes for Each Course
```bash
npm run seed:quizzes:acts        # Acts in Action
npm run seed:quizzes:firestarter # Fire Starter  
npm run seed:quizzes:grow        # G.R.O.W
npm run seed:quizzes:studying    # Studying for Service
```

## How to Access Railway Shell

1. Go to https://railway.app
2. Select your project
3. Click on your service
4. Click "Deployments" tab
5. Click "..." menu next to deployment
6. Select "Shell"

Then run the commands above in the Railway shell.

## Alternative: Use Railway CLI

```bash
railway shell
npm run seed:videos
npm run seed:quizzes:acts
npm run seed:quizzes:firestarter
npm run seed:quizzes:grow
npm run seed:quizzes:studying
```

## Status

✅ Code restored to working version
⏳ Database seeding pending (must be done on Railway)
