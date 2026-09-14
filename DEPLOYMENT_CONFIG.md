# 📋 Vercel Deployment Configuration Summary

Reference document for all deployment settings and configurations.

## Project Overview

| Property | Value |
|----------|-------|
| **Project Name** | ASR Visuals (CreatorFlow) |
| **Frontend** | Next.js 14 on Vercel |
| **Backend** | Express.js on Render |
| **Database** | MongoDB Atlas |
| **Status** | Ready for Deployment |

---

## Repository Structure

```
creatorflow-fullstack/
├── frontend/                    # Next.js App (Deploy to Vercel)
│   ├── src/
│   │   ├── app/               # Pages and routes
│   │   ├── components/        # React components
│   │   ├── lib/               # Utilities and config
│   │   ├── styles/            # Global CSS
│   │   └── middleware.ts      # Rate limiting
│   ├── public/                # Static files
│   ├── .env.example           # ✅ Created
│   ├── .vercelignore          # ✅ Created
│   ├── vercel.json            # ✅ Created
│   ├── next.config.js         # ✅ Updated for production
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                     # Express.js API (Deploy to Render)
│   ├── src/
│   │   ├── app.ts             # Main app
│   │   ├── config/            # Database & services
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Auth & validation
│   │   └── models/            # Data models
│   ├── .env.example           # ✅ Updated
│   ├── vercel.json            # Existing
│   ├── package.json
│   ├── tsconfig.json
│   └── index.ts
│
├── DEPLOYMENT.md              # ✅ Complete setup guide
├── PRE_DEPLOYMENT_CHECKLIST.md # ✅ Pre-deployment checks
├── QUICK_DEPLOYMENT.md        # ✅ Fast setup guide
├── SECURITY.md                # Security best practices
└── README.md
```

---

## Frontend (Next.js on Vercel)

### Configuration Files

#### `vercel.json` ✅
```json
{
  "version": 2,
  "buildCommand": "next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": [
    "NEXT_PUBLIC_API_URL",
    "NEXT_PUBLIC_STRIPE_KEY",
    "NEXT_PUBLIC_CALENDLY_URL"
  ]
}
```

#### `next.config.js` ✅
- ✅ Output: `standalone` (optimized for serverless)
- ✅ Image domains: asrvisuals.com, youtube.com, i.ytimg.com
- ✅ Security headers: CSP, HSTS, X-Frame-Options
- ✅ Performance: gzip compression, minification

#### `.vercelignore` ✅
Excludes build artifacts, dev files, and documentation from deployment.

### Environment Variables (Vercel Dashboard)

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=https://[BACKEND_URL]/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_[YOUR_STRIPE_KEY]
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
NODE_ENV=production
```

### Build & Deploy Settings

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root Directory | `./frontend` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node Version | 18.x (default) |

### Deployment URL

```
Production: https://[PROJECT_NAME].vercel.app
Custom Domain: https://asrvisuals.com (optional)
```

---

## Backend (Express.js on Render)

### Configuration Files

#### `.env.example` ✅ (Production)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://[USER]:[PASSWORD]@[CLUSTER].mongodb.net/creatorflow
JWT_SECRET=[256-BIT-HEX-SECRET]
STRIPE_SECRET_KEY=sk_live_[YOUR_STRIPE_KEY]
STRIPE_WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=[APP-SPECIFIC-PASSWORD]
FRONTEND_URL=https://[VERCEL_URL]
SUPPORT_EMAIL=support@asrvisuals.com
```

### Environment Variables (Render Dashboard)

Copy all from `.env.example` with production values.

### Build & Deploy Settings

| Setting | Value |
|---------|-------|
| Environment | Node |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |
| Node Version | 18.x (default) |
| Region | US-East (or closest to users) |

### Deployment URL

```
Production: https://[SERVICE_NAME].onrender.com
Health Check: https://[SERVICE_NAME].onrender.com/health
```

---

## Third-Party Services Setup

### MongoDB Atlas

| Configuration | Value |
|---------------|-------|
| Cluster | Free tier M0 or paid |
| Version | 6.0+ |
| Backup | Daily (paid) or Manual (free) |
| Authentication | Enable Username/Password |
| Network | Whitelist Vercel/Render IPs or 0.0.0.0/0 |
| Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/db` |

**Setup Steps:**
1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IPs (0.0.0.0/0 for development)
5. Get connection string
6. Add to `MONGODB_URI`

### Stripe (Payment Processing)

| Configuration | Value |
|---------------|-------|
| Mode | Live (not test) |
| Publishable Key | pk_live_... |
| Secret Key | sk_live_... |
| Webhook URL | https://[BACKEND]/api/payments/webhook |
| Signing Secret | whsec_... |

**Obtain Keys:**
1. Go to dashboard.stripe.com
2. Activate Live mode
3. Copy Publishable & Secret keys
4. Create webhook endpoint
5. Get signing secret

### Gmail (Email Service)

| Configuration | Value |
|---------------|-------|
| Host | smtp.gmail.com |
| Port | 587 |
| Username | your-email@gmail.com |
| Password | [App-Specific Password] |

**Generate App Password:**
1. Enable 2FA on Google Account
2. Go to myaccount.google.com/apppasswords
3. Select App: Mail, Device: Windows/Linux
4. Copy 16-character password
5. Use as `EMAIL_PASS`

### Calendly (Booking)

| Configuration | Value |
|---------------|-------|
| Booking Link | https://cal.com/asrvisuals |
| Scheduling | [Your availability] |
| Timezone | EST or your timezone |
| Notifications | Email confirmations enabled |

---

## Security Checklist

### Secrets & Keys ✅
- [ ] No secrets in GitHub
- [ ] All `.env` files in `.gitignore`
- [ ] Secrets only in environment variables
- [ ] JWT secret is 256-bit random
- [ ] Stripe LIVE keys (not test)
- [ ] Email password is app-specific (not Gmail password)

### Headers & Security ✅
- [ ] HTTPS enforced
- [ ] HSTS enabled (max-age=63072000)
- [ ] CSP configured
- [ ] CORS restricted to frontend domain
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Security headers tested

### API Security ✅
- [ ] Rate limiting enabled (100 req/min)
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose internals
- [ ] No sensitive data in logs
- [ ] Helmet.js configured (backend)
- [ ] CORS credentials: true only for same-origin

---

## Deployment Steps (Summarized)

### Step 1: Code Preparation (5-10 mins)
```bash
# Commit and push all code
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main

# Test build locally
cd frontend && npm run build
cd ../backend && npm run build
```

### Step 2: Frontend to Vercel (10-15 mins)
1. Go to vercel.com/new
2. Import GitHub repo: creatorflow-fullstack
3. Set Root Directory: `./frontend`
4. Add environment variables
5. Click Deploy
6. Wait for build completion

### Step 3: Backend to Render (10-15 mins)
1. Go to render.com/new
2. Select Web Service
3. Connect GitHub
4. Set Build/Start commands
5. Add environment variables
6. Click Create
7. Wait for deployment

### Step 4: Integration Testing (5-10 mins)
- Test frontend loads
- Test API health check
- Test contact form
- Test Stripe webhook
- Monitor logs

**Total Time: 30-50 minutes**

---

## Testing & Monitoring

### Health Checks

```bash
# Frontend
curl -I https://[VERCEL_URL].vercel.app
# Should return 200 OK

# Backend
curl https://[RENDER_URL].onrender.com/health
# Should return {"status":"OK","message":"..."}

# CORS Check
curl -H "Origin: https://[VERCEL_URL].vercel.app" \
  https://[RENDER_URL].onrender.com/api/auth
```

### Monitoring Tools

| Service | Tool | Status |
|---------|------|--------|
| Errors | Sentry (free) | Optional |
| Uptime | UptimeRobot | Recommended |
| Analytics | Vercel Analytics | Built-in |
| Performance | Vercel Speed Insights | Built-in |

---

## Rollback Plan

### If Frontend Deployment Fails
1. Vercel Dashboard → Deployments
2. Select previous working deployment
3. Click "Redeploy"
4. Wait for redeployment

### If Backend Deployment Fails
1. Render Dashboard → Latest deploys
2. Click "Logs" to identify issue
3. Fix environment variables or code
4. Push fix to GitHub
5. Manual redeploy or auto-redeploy on push

### Emergency Hotfix
```bash
# If must rollback immediately:
# 1. Fix code locally
git add .
git commit -m "Emergency fix"
git push origin main

# 2. Vercel/Render auto-redeploys on push
# 3. Monitor logs for success

# 4. If still broken, revert commit:
git revert HEAD
git push origin main
```

---

## Post-Deployment Checklist

- [ ] Frontend loads without errors
- [ ] All pages accessible
- [ ] Blog pages working
- [ ] Contact form functional
- [ ] Email sends successfully
- [ ] Backend health check passes
- [ ] API calls complete without CORS errors
- [ ] Stripe integration working
- [ ] SSL certificates valid
- [ ] Security headers present
- [ ] Performance acceptable
- [ ] Monitoring configured
- [ ] Team notified of go-live

---

## Useful Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Render Docs: https://render.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Stripe Docs: https://stripe.com/docs

### Quick Links
- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com
- Stripe Dashboard: https://dashboard.stripe.com
- Gmail App Passwords: https://myaccount.google.com/apppasswords

---

## Files Checklist

✅ **Created:**
- `.env.example` (frontend)
- `.env.example` (backend)
- `vercel.json` (frontend)
- `.vercelignore` (frontend)
- `DEPLOYMENT.md`
- `PRE_DEPLOYMENT_CHECKLIST.md`
- `QUICK_DEPLOYMENT.md`
- This file

✅ **Updated:**
- `next.config.js` - Production optimizations
- `backend/vercel.json` - Existing config

**Status:** ✅ **Ready for Deployment**

---

**Last Updated:** February 19, 2026
**Version:** 1.0
**Deployment Readiness:** 95% (awaiting environment variable configuration)
