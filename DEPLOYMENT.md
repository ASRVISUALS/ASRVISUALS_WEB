# 🚀 Vercel Deployment Guide - ASR Visuals

Complete step-by-step guide to deploy CreatorFlow to Vercel (Frontend) and Vercel/Render (Backend).

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
3. [Backend Deployment (Render/Vercel)](#backend-deployment-rendervercel)
4. [Environment Setup](#environment-setup)
5. [Post-Deployment Checklist](#post-deployment-checklist)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before starting deployment, ensure you have:

- ✅ GitHub account with repository pushed
- ✅ Vercel account (free tier available)
- ✅ MongoDB Atlas account (free tier available)
- ✅ Stripe account with live keys
- ✅ Email service credentials (Gmail App Password)
- ✅ Domain name (optional, Vercel provides free domain)

---

## Frontend Deployment (Vercel)

### Step 1: Connect Your GitHub Repository

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **Add New Project**
3. Select your GitHub repository: `creatorflow-fullstack`
4. Click **Import**

### Step 2: Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Build & Output Settings:**
- Build Command: `npm run build` ✅ (Already configured)
- Output Directory: `.next` ✅ (Auto-detected)
- Install Command: `npm install` ✅ (Default)

**Server Location:**
- Root Directory: `./frontend` ✅ (Important!)

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_publishable_key
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
```

> **Important:** All `NEXT_PUBLIC_*` variables are visible in browser. Never expose secrets here.

### Step 4: Deploy

Click **Deploy** and wait for build to complete (2-3 minutes).

Once deployed:
- Your site is live at: `https://your-project.vercel.app`
- Custom domain: Project Settings → Domains → Add Domain

### Step 5: Configure Custom Domain (Optional)

1. Add `A` record pointing to Vercel: `76.76.19.21`
2. Add `CNAME` record: `cname.vercel-dns.com`
3. Vercel SSL certificate auto-provisions in 24-48 hours

---

## Backend Deployment (Render/Vercel)

### Option A: Deploy on Render (Recommended for Backend)

**Why Render?** Better support for Node.js serverless functions, easier environment setup.

#### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub
3. Create new **Web Service**

#### Step 2: Connect GitHub Repository

1. Select your GitHub repository
2. Set **Build Command:** `npm install && npm run build`
3. Set **Start Command:** `npm start`
4. Set **Runtime:** `Node`
5. Set **Region:** Choose closest to your users (typically US)

#### Step 3: Add Environment Variables

In Render Dashboard → Environment:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creatorflow?retryWrites=true&w=majority
JWT_SECRET=your-generated-256-bit-secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
FRONTEND_URL=https://your-vercel-frontend.vercel.app
SUPPORT_EMAIL=support@asrvisuals.com
```

#### Step 4: Deploy

Click **Create Web Service** and wait for deployment.

Your backend will be available at: `https://your-service-name.onrender.com`

---

### Option B: Deploy on Vercel with Serverless Functions

If you want to keep everything on Vercel:

#### Step 1: Restructure Backend for Vercel

Create `api/` folder structure:

```
/api
  /auth.ts
  /bookings.ts
  /payments.ts
  /contact.ts
  /blog.ts
```

#### Step 2: Convert Express Routes to Vercel Functions

```typescript
// api/auth.ts
import { VercelRequest, VercelResponse } from '@vercel/node'
import connectDB from '../src/config/database'
import authRoutes from '../src/routes/authRoutes'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connectDB()
  // Handle routes
}
```

> **Note:** This requires significant refactoring. Option A (Render) is simpler.

---

## Environment Setup

### Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use as `JWT_SECRET`.

### Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Add database user with strong password
4. Whitelist Vercel IPs:
   - `0.0.0.0/0` (allow all - for development)
   - Or specific IP ranges (production)
5. Copy connection string: `mongodb+srv://...`

### Setup Gmail App Password

For `EMAIL_PASS`, use App-Specific Password:

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select App: **Mail**
3. Select Device: **Windows Computer** (any device)
4. Generate password
5. Copy 16-character password

### Get Stripe Live Keys

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Activate live mode
3. Get **Publishable Key** and **Secret Key**
4. Get **Webhook Signing Secret** → Webhooks

---

## Post-Deployment Checklist

### Frontend (Vercel)

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] Blog pages work
- [ ] Contact form works
- [ ] Blog "Read More" links clickable
- [ ] Email links functional
- [ ] Mobile responsive
- [ ] Analytics script configured (if used)

### Backend (Render)

- [ ] `/health` endpoint returns `{ "status": "OK" }`
- [ ] CORS headers correct
- [ ] Database connection works
- [ ] Authentication endpoints functional
- [ ] Stripe webhook configured

### Cross-System

- [ ] Frontend API calls reach backend
- [ ] Contact form sends emails
- [ ] Payment processing works
- [ ] Blog content displays correctly
- [ ] SSL certificates valid
- [ ] Security headers present

### Test Endpoints

```bash
# Health check
curl https://your-backend.onrender.com/health

# Security headers
curl -I https://your-frontend.vercel.app

# CORS
curl -H "Origin: https://your-frontend.vercel.app" -H "Access-Control-Request-Method: POST" https://your-backend.onrender.com/api/contact
```

---

## Troubleshooting

### 1. Build Fails - "Root Directory"

**Error:** `Root directory not found`

**Solution:**
- Vercel Dashboard → Settings → Root Directory
- Set to `./frontend` for Next.js
- Set to `./backend` for Express API

### 2. API Calls Failing

**Error:** `CORS error` or `API not responding`

**Solution:**
```typescript
// Check backend CORS config in app.ts
app.use(cors({
  origin: process.env.FRONTEND_URL, // Must match frontend domain
  credentials: true,
}))
```

Update `FRONTEND_URL` in backend environment variables.

### 3. Environment Variables Not Loading

**Error:** `undefined is not a function`

**Solution:**
1. Vercel/Render Dashboard → Settings → Environment Variables
2. Add all variables from `.env.example`
3. Redeploy project
4. Check live environment: `https://your-site.com/api/health`

### 4. Images Not Loading

**Error:** 403 Forbidden on images

**Solution:**
Check `next.config.js`:
```javascript
images: {
  domains: ['asrvisuals.com', 'youtube.com', 'i.ytimg.com'],
}
```

Add domain to list if missing.

### 5. Database Connection Timeout

**Error:** `MongoError: connect ECONNREFUSED`

**Solution:**
1. MongoDB Atlas → Network Access
2. Add Vercel/Render IP to whitelist
3. Or allow all IPs: `0.0.0.0/0` (less secure)
4. Check connection string format

### 6. Email Not Sending

**Error:** `Error: Invalid login`

**Solution:**
1. Use App-Specific Password (not regular Gmail password)
2. Enable "Less secure app access" if needed
3. Check `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER` in environment

### 7. Stripe Webhook Not Firing

**Error:** Payment succeeds but webhook doesn't trigger

**Solution:**
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-backend.com/api/payments/webhook`
3. Select events: `charge.succeeded`, `payment_intent.succeeded`
4. Get signing secret → Use as `STRIPE_WEBHOOK_SECRET`

---

## Performance Optimization

### Frontend (Vercel)

Enable auto-optimization:
1. Vercel Dashboard → Analytics
2. Enable Web Analytics
3. Enable Speed Insights

### Backend (Render)

- Render auto-scales on demand
- Free tier sleeps after 15 minutes inactivity
- Upgrade to paid for always-on

---

## Security Hardening

### Before Going Live

✅ **Completed:**
- Security headers configured
- Rate limiting enabled
- HTTPS enforced
- Input validation added
- Error messages sanitized

✅ **Frontend:**
- CSP policy configured
- XSS protection enabled
- HSTS enabled

✅ **Backend:**
- Helmet.js configured
- CORS restricted to frontend domain
- Payload size limited
- Authentication on protected routes

❓ **Review:**
- [ ] No hardcoded secrets in code
- [ ] All `.env` files in `.gitignore`
- [ ] Database credentials rotated
- [ ] API keys rotated (especially Stripe)
- [ ] CORS origins correct (no `*`)

---

## Maintenance

### Weekly

- [ ] Check error logs (Vercel/Render dashboard)
- [ ] Monitor API performance
- [ ] Test critical user flows

### Monthly

- [ ] Review security logs
- [ ] Check dependency updates
- [ ] Test backup and recovery
- [ ] Monitor costs

### Quarterly

- [ ] Security audit
- [ ] Performance optimization
- [ ] Database cleanup
- [ ] Update dependencies

---

## Useful Commands

```bash
# Build locally to test
npm run build

# Start production server locally
npm run start

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test API health
curl https://your-backend.onrender.com/health

# Clear Vercel cache
vercel --prod --no-cache
```

---

## Support & Resources

- **Vercel Docs:** [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Render Docs:** [https://render.com/docs](https://render.com/docs)
- **MongoDB Docs:** [https://docs.mongodb.com](https://docs.mongodb.com)
- **Stripe Docs:** [https://stripe.com/docs](https://stripe.com/docs)

---

## Deployment Status

| Component | Platform | Status | URL |
|-----------|----------|--------|-----|
| Frontend | Vercel | ⏳ Ready | https://your-domain.vercel.app |
| Backend | Render | ⏳ Ready | https://your-service.onrender.com |
| Database | MongoDB Atlas | ⏳ Ready | Connection string in `.env` |
| Payments | Stripe | ⏳ Live Keys | Configured |
| Email | Gmail SMTP | ⏳ App Password | Configured |

---

**Last Updated:** February 19, 2026
**Version:** 1.0
