# Vercel Deployment Configuration for asrvisuals.live

## Overview
- **Frontend:** asrvisuals.live (Next.js)
- **Backend:** asrvisuals-backend.vercel.app (Express API)
- **Admin Panel:** admin-six-steel.vercel.app (React/Vite)

---

## 1. Backend Environment Variables
**Project:** asrvisuals-backend.vercel.app

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-secure-256-bit-random-secret
ADMIN_SETUP_KEY=asrvisuals-admin-setup-key-2025

# Default Admin (for bootstrap)
DEFAULT_ADMIN_NAME=Amit Rana
DEFAULT_ADMIN_EMAIL=amitrana748095@gmail.com
DEFAULT_ADMIN_PASSWORD=AmitraNa2

# CORS Origins
FRONTEND_URL=https://asrvisuals.live,https://www.asrvisuals.live
ADMIN_APP_URL=https://admin-six-steel.vercel.app

# APIs (Optional)
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=your-channel-id
GOOGLE_AI_API_KEY=your-google-ai-key

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# Environment
NODE_ENV=production
PORT=5000
```

---

## 2. Frontend Environment Variables
**Project:** asrvisuals.live (Next.js)

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://asrvisuals-backend.vercel.app/api

# Stripe Public Key
NEXT_PUBLIC_STRIPE_KEY=pk_live_your_stripe_publishable_key

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Environment
NODE_ENV=production
```

---

## 3. Admin Panel Environment Variables
**Project:** admin-six-steel.vercel.app (React/Vite)

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Backend API URL
VITE_API_URL=https://asrvisuals-backend.vercel.app/api
```

---

## 4. Deployment Steps

### Step 1: Configure Backend
1. Go to https://vercel.com/dashboard
2. Select `asrvisuals-backend` project
3. Go to Settings → Environment Variables
4. Add all backend variables from section 1 above
5. Click "Redeploy" to apply changes

### Step 2: Configure Frontend
1. Select your frontend project (asrvisuals.live)
2. Go to Settings → Environment Variables
3. Add all frontend variables from section 2 above
4. Click "Redeploy" to apply changes

### Step 3: Configure Admin Panel
1. Select `admin-six-steel` project
2. Go to Settings → Environment Variables
3. Add the `VITE_API_URL` from section 3 above
4. Click "Redeploy" to apply changes

---

## 5. Verify Deployment

### Test Backend API:
```bash
curl https://asrvisuals-backend.vercel.app/health
# Should return: {"status":"OK","message":"Server is running"}
```

### Test Admin Login:
```bash
curl -X POST https://asrvisuals-backend.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"amitrana748095@gmail.com","password":"AmitraNa2"}'
# Should return success with token
```

### Access Admin Panel:
1. Go to https://admin-six-steel.vercel.app/login
2. Login with:
   - Email: amitrana748095@gmail.com
   - Password: AmitraNa2

### Check Frontend:
1. Visit https://asrvisuals.live
2. Verify all pages load correctly
3. Test dynamic content from CMS

---

## 6. Custom Domain Setup (if needed)

If you want custom admin domain (e.g., admin.asrvisuals.live):

1. Go to admin project in Vercel
2. Settings → Domains
3. Add `admin.asrvisuals.live`
4. Update DNS records as instructed
5. Update backend `ADMIN_APP_URL` to include new domain

---

## Login Credentials

**Admin Panel:**
- URL: https://admin-six-steel.vercel.app/login
- Email: amitrana748095@gmail.com
- Password: AmitraNa2

⚠️ **Security:** Change the default password after first login!

---

## Troubleshooting

### Login Fails:
- Verify `VITE_API_URL` is set in admin panel
- Check backend has `ADMIN_APP_URL` for CORS
- Confirm MongoDB connection is working
- Verify JWT_SECRET is set on backend

### CORS Errors:
- Ensure `FRONTEND_URL` and `ADMIN_APP_URL` match deployed URLs
- Check no trailing slashes in URLs
- Verify backend redeployed after env changes

### API Not Working:
- Check `NEXT_PUBLIC_API_URL` on frontend
- Verify backend MongoDB connection
- Test backend health endpoint
- Check Vercel function logs for errors
