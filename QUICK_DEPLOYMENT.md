# 🚀 Quick Vercel Deployment Guide

Fast deployment instructions for ASR Visuals (CreatorFlow).

## In 5 Minutes

### Frontend Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import GitHub repo: `creatorflow-fullstack`
   - Set root directory: `./frontend`
   - Add environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
     NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxx
     NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
     ```
   - Click **Deploy**
   - Wait 2-3 minutes
   - ✅ Live at: `https://your-domain.vercel.app`

### Backend Deployment

1. **Deploy on Render**
   - Go to [render.com/new](https://render.com/new)
   - Select **Web Service**
   - Connect GitHub repo
   - Set:
     ```
     Build: npm install && npm run build
     Start: npm start
     Root: backend/
     ```
   - Add environment variables (see `.env.example`)
   - Click **Create Web Service**
   - Wait 3-5 minutes
   - ✅ Live at: `https://your-service.onrender.com`

## Environment Variables (Copy & Paste)

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_key
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
```

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creatorflow?retryWrites=true&w=majority
JWT_SECRET=<generate from: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
FRONTEND_URL=https://your-domain.vercel.app
SUPPORT_EMAIL=support@asrvisuals.com
```

## Pre-Deployment Checklist

- [ ] All code committed and pushed to GitHub
- [ ] No `.env` files committed (check `.gitignore`)
- [ ] `frontend/vercel.json` exists ✅
- [ ] `frontend/.vercelignore` exists ✅
- [ ] `backend/.env.example` created ✅
- [ ] `frontend/.env.example` created ✅
- [ ] MongoDB Atlas cluster created
- [ ] Stripe live keys obtained
- [ ] Gmail app password generated
- [ ] JWT secret generated
- [ ] Local build test passed: `npm run build`

## Testing After Deployment

### Test Frontend
```bash
# Visit your site
https://your-domain.vercel.app

# Check console (F12) - no errors
# Test blog links work
# Test contact form
# Test mobile view
```

### Test Backend
```bash
# Health check
curl https://your-backend.onrender.com/health
# Should return: {"status":"OK","message":"Server is running"}

# Test CORS
curl -H "Origin: https://your-domain.vercel.app" \
  https://your-backend.onrender.com/api/auth/signup
```

### Test Integration
- [ ] Contact form submits and sends email
- [ ] Blog loads data from backend
- [ ] Payment buttons work
- [ ] Authentication flow works

## Troubleshooting Quick Fix

### Build Fails
- Check: Root directory set to `./frontend` (vercel) or `./backend` (render)
- Check: All environment variables added
- Check: `package.json` has all scripts

### API 404 Errors
- Update `NEXT_PUBLIC_API_URL` to correct backend URL
- Redeploy frontend after updating

### CORS Errors
- Backend: Update `FRONTEND_URL` in environment variables
- Redeploy backend

### Email Not Sending
- Use App-Specific Password (not regular Gmail password)
- Check `EMAIL_USER` and `EMAIL_PASS` correct

### Database Connection Fails
- MongoDB: Add Render IP to whitelist (0.0.0.0/0 for development)
- Check `MONGODB_URI` format correct
- Test connection string in MongoDB Atlas

## Domain Setup (Optional)

1. **Vercel Domain**
   - Project Settings → Domains
   - Add your domain
   - Follow DNS instructions (add A/CNAME records)
   - SSL auto-provisions in 24-48 hours

2. **Update Backend FRONTEND_URL**
   - Render Dashboard → Environment → FRONTEND_URL
   - Set to: `https://your-actual-domain.com`
   - Redeploy

## Performance Tips

- Vercel: Enable "Analytics" for monitoring
- Render: Monitor uptime/crashes in logs
- Both: Set up error tracking (Sentry - free tier)
- Database: Keep queries optimized

## Still Need Help?

1. **Check Logs**
   - Vercel: Deployments → build/function logs
   - Render: Runtime logs in dashboard

2. **Read Full Guide**
   - See `DEPLOYMENT.md` for detailed steps

3. **Emergency Rollback**
   ```bash
   # Vercel: Select previous deployment → Redeploy
   # Render: Revert to previous versión
   ```

## File Reference

- ✅ `DEPLOYMENT.md` - Complete guide
- ✅ `PRE_DEPLOYMENT_CHECKLIST.md` - Full checklist
- ✅ `SECURITY.md` - Security best practices
- ✅ `frontend/.env.example` - Frontend variables
- ✅ `backend/.env.example` - Backend variables
- ✅ `frontend/vercel.json` - Vercel config
- ✅ `frontend/.vercelignore` - Build ignore
- ✅ `backend/vercel.json` - Backend config

---

**Time to Deploy:** 15-30 minutes
**Difficulty:** Easy
**External Services:** 3 (Vercel, Render, MongoDB)

🚀 **Ready to deploy!**
