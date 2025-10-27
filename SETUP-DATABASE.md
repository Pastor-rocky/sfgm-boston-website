# 🗄️ Database Setup Guide

## Step 1: Run Database Migrations

```bash
# Set your Neon database URL
export DATABASE_URL="postgresql://neondb_owner:npg_d6c1xDSuXGAB@ep-autumn-sound-adtj3nff-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Run migrations to create all tables
npm run db:push
```

## Step 2: Setup Initial Users

```bash
# Set the database URL again
export DATABASE_URL="postgresql://neondb_owner:npg_d6c1xDSuXGAB@ep-autumn-sound-adtj3nff-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Run the setup script
npx tsx setup-neon-database.ts
```

## Step 3: Login Credentials

After running the setup script, you'll have these accounts:

### Admin Account
- **Username:** `pastor.rocky`
- **Password:** `admin123`
- **Email:** `pastor_rocky@sfgmboston.com`
- **Role:** Admin (full access)

### Test Student Account
- **Username:** `test.student`
- **Password:** `student123`
- **Email:** `student@test.com`
- **Role:** Student

## ⚠️ Important Security Notes

1. **Change passwords immediately** after first login
2. **Don't commit passwords** to Git
3. **Use strong passwords** in production
4. **Enable 2FA** in production environments

## Testing the Website

1. Go to your Vercel deployment URL
2. Click "Login"
3. Use one of the credentials above
4. Verify you can access the dashboard

## Troubleshooting

If you get database connection errors:
1. Verify DATABASE_URL is set correctly
2. Check that the Neon database is running (not paused)
3. Ensure environment variables are added in Vercel
4. Try the connection string from Neon dashboard

## Need Help?

Check the logs in:
- Neon Dashboard → Query Editor
- Vercel Dashboard → Deployment Logs
