# Quick Vercel Deployment Checklist

## ✅ Code Deployed
- Changes committed: `8c6ab66`
- Pushed to GitHub: https://github.com/amittranaa/asrvisuals.git
- Vercel will auto-deploy if GitHub integration is connected

---

## 🔧 Required Environment Variables

### 1. Backend (asrvisuals-backend.vercel.app)
Go to: https://vercel.com/dashboard → asrvisuals-backend → Settings → Environment Variables

**Add these if not already set:**

```bash
# Database
MONGODB_URI=mongodb+srv://your-connection-string

# Authentication
JWT_SECRET=your-secure-random-secret
ADMIN_SETUP_KEY=asrvisuals-admin-setup-key-2025

# Default Admin
DEFAULT_ADMIN_NAME=Amit Rana
DEFAULT_ADMIN_EMAIL=amitrana748095@gmail.com
DEFAULT_ADMIN_PASSWORD=AmitraNa2

# CORS Origins
FRONTEND_URL=https://asrvisuals.live,https://www.asrvisuals.live
ADMIN_APP_URL=https://admin-six-steel.vercel.app

# Environment
NODE_ENV=production
PORT=5000
```

**Optional APIs:**
```bash
YOUTUBE_API_KEY=your-youtube-key
GOOGLE_AI_API_KEY=your-google-ai-key
STRIPE_SECRET_KEY=your-stripe-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

### 2. Admin Panel (admin-six-steel.vercel.app)
Go to: https://vercel.com/dashboard → admin-six-steel → Settings → Environment Variables

**Add this:**
```bash
VITE_API_URL=https://asrvisuals-backend.vercel.app/api
```

---

### 3. Frontend (asrvisuals.live)
Go to: https://vercel.com/dashboard → asrvisuals-live → Settings → Environment Variables

**Add these:**
```bash
NEXT_PUBLIC_API_URL=https://asrvisuals-backend.vercel.app/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_your-key
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
NODE_ENV=production
```

---

## 🚀 After Adding Variables

1. **Redeploy Each Project:**
   - Go to each project's Deployments tab
   - Click "..." menu on latest deployment
   - Click "Redeploy"
   - OR: Vercel auto-redeploys from GitHub push

2. **Verify Deployments:**
   - ✅ Backend: https://asrvisuals-backend.vercel.app/health
   - ✅ Admin: https://admin-six-steel.vercel.app/login
   - ✅ Frontend: https://asrvisuals.live

3. **Test Admin Login:**
   - URL: https://admin-six-steel.vercel.app/login
   - Email: amitrana748095@gmail.com
   - Password: AmitraNa2

4. **Test Pages Feature:**
   - Login to admin
   - Navigate to "📄 Pages"
   - Create your first page
   - Verify API connection works

---

## 🐛 Troubleshooting

**Backend fails to deploy:**
- Check Vercel logs for errors
- Verify all env vars are set
- Ensure MongoDB URI is valid

**Admin login fails:**
- Verify VITE_API_URL is set
- Check ADMIN_APP_URL in backend CORS
- Ensure backend is running

**Pages not working:**
- Backend needs to be redeployed with new routes
- MongoDB connection must be active
- JWT token must be valid

---

## 📊 What's New in This Deploy

### WordPress-Like Features:
- ✅ Full page management system
- ✅ Create/Edit/Delete pages
- ✅ SEO settings (meta, keywords, OG)
- ✅ Custom CSS & JavaScript per page
- ✅ Page templates (Default/Full-Width/Landing/Custom)
- ✅ Bulk operations (multi-delete)
- ✅ Duplicate pages
- ✅ Draft/Published/Scheduled status

### Enhanced Admin Panel:
- ✅ Live preview with split view
- ✅ Inspect mode for style editing
- ✅ Updated navigation with icons
- ✅ Better UX and workflows

### API Changes:
- ✅ New `/api/pages` endpoints
- ✅ Enhanced auth middleware
- ✅ Updated CORS for asrvisuals.live

---

## 📚 Documentation

See detailed docs:
- [VERCEL_SETUP.md](VERCEL_SETUP.md) - Full deployment guide
- [WORDPRESS_FEATURES.md](WORDPRESS_FEATURES.md) - Feature documentation
- [README.md](README.md) - General project info

---

## 🎯 Next Steps

1. Add environment variables in Vercel (see above)
2. Wait for automatic deployment (or trigger manual redeploy)
3. Test admin login
4. Create your first page
5. Enjoy WordPress-like CMS features! 🎉

---

**Login Credentials:**
- Email: amitrana748095@gmail.com
- Password: AmitraNa2
⚠️ Change default password after first login!
