# SFGM Boston VPS Deployment - Current Status

## ✅ COMPLETED SETUP:
- **VPS Purchased**: Namecheap VPS Pulsar (2 CPU, 2GB RAM, Ubuntu 24.04)
- **Domain**: sfgmboston.com
- **Status**: VPS provisioning (ALERT status - normal)
- **Build**: Application built successfully
- **Environment**: .env.production configured with sfgmboston.com
- **Scripts**: All deployment scripts ready

## 📁 DEPLOYMENT FILES READY:
- `.env.production` - Production environment variables
- `deploy-vps.sh` - VPS deployment script
- `ecosystem.config.js` - PM2 configuration
- `nginx.conf` - Nginx reverse proxy config
- `cleanup-database.ts` - Database cleanup script
- `create-pastor-rocky.ts` - Create PastorRocky user script
- `cleanup-and-setup.sh` - Combined cleanup script
- `dist/` - Built application files
- `public/` - Static assets

## 🎯 NEXT STEPS (When VPS Shows "ONLINE"):
1. Get VPS IP address from Namecheap dashboard
2. SSH into VPS: `ssh root@VPS_IP`
3. Upload files to `/var/www/sfgm-boston/`
4. Install Node.js, PostgreSQL, PM2, Nginx
5. Configure database and environment
6. Clean database (remove all students except PastorRocky)
7. Create PastorRocky admin user
8. Deploy application with PM2
9. Configure SSL with Let's Encrypt
10. Update DNS to point to VPS IP
11. Test website at https://sfgmboston.com
12. Run system checks and verification

## 🔧 DEPLOYMENT COMMANDS READY:
```bash
# Install dependencies
npm ci --production

# Setup database
npm run db:push

# Clean database and setup PastorRocky only
chmod +x cleanup-and-setup.sh
./cleanup-and-setup.sh

# Start application
npm run pm2:start

# Configure nginx
sudo cp nginx.conf /etc/nginx/sites-available/sfgm-boston
sudo ln -s /etc/nginx/sites-available/sfgm-boston /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Setup SSL
sudo certbot --nginx -d sfgmboston.com -d www.sfgmboston.com
```

## 📊 SYSTEM CHECKS TO RUN AFTER DEPLOYMENT:
- [ ] Website loads at https://sfgmboston.com
- [ ] Registration system works
- [ ] Email notifications sent
- [ ] Course enrollment functional
- [ ] Database connections stable
- [ ] SSL certificate valid
- [ ] Performance metrics good
- [ ] All 7 courses accessible
- [ ] Student dashboard working
- [ ] Admin functions operational

## 🚀 READY TO RESUME:
When user says "start deployment" or "VPS is online", continue from Step 1 above.
