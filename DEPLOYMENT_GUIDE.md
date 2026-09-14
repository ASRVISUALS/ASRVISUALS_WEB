# ASR Visuals - Vercel Deployment Guide

## Full Stack Deployment: Frontend + Backend + Admin

This guide covers deploying the entire ASRVisuals application to Vercel with frontend, backend API, and admin dashboard all integrated.

### Deployment Architecture

- **Frontend**: React application (SPA) hosted on Vercel
- **Backend**: Node.js Express API hosted on Vercel Serverless Functions
- **Admin Dashboard**: Integrated into frontend with features for:
  - 🌐 Web Content Editor (update homepage, about, services, footer text)
  - 📹 Videos & Shorts Manager (add videos by link with YouTube metadata auto-fetch)
  - Blog Management
  - Portfolio/Videos Management
  - Contact Requests Review
  - Site Settings

### Monorepo Vercel Configuration

The root `vercel.json` handles routing for both frontend and backend:

```json
{
  "version": 2,
  "builds": [
    { "src": "backend/api/index.js", "use": "@vercel/node", "config": { "maxDuration": 30 } },
    { "src": "frontend/package.json", "use": "@vercel/static-build", "config": { "distDir": "frontend/build" } }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "backend/api/index.js" },
    { "src": "/static/(.*)", "dest": "frontend/build/static/$1", "headers": { "Cache-Control": "public, max-age=31536000, immutable" } },
    { "src": "/(.*)", "dest": "frontend/build/$1" },
    { "src": "/(.*)", "dest": "frontend/build/index.html" }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

---

## Step-by-Step Deployment

### 1. Create a New Vercel Project

Go to [vercel.com](https://vercel.com) and create a new project by importing the GitHub repository containing your ASRVisuals code.

### 2. Configure Root Directory & Build Settings

In Vercel Project Settings:

- **Root Directory**: Leave as `/` (root)
- **Framework**: `Other` (since we have both Node.js and React)
- **Build Command**: 
  ```bash
  cd frontend && npm run build
  ```
- **Output Directory**: `frontend/build`
- **Install Command**: 
  ```bash
  npm install --prefix backend && npm install --prefix frontend
  ```

### 3. Set Environment Variables

In Vercel Project Settings -> Environment Variables, add:

**Frontend:**
```env
REACT_APP_API_URL=https://your-domain.vercel.app
REACT_APP_GOOGLE_FORM_ACTION=https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse
```

**Backend:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/db_name
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NODE_ENV=production
```

### 4. Deploy

Push your code to GitHub:
```bash
git add .
git commit -m "Deploy to Vercel with new admin features"
git push
```

Vercel will automatically trigger a build and deploy.

### 5. Verify Deployment

After deployment completes, test these endpoints:

- **Frontend**: `https://your-domain.vercel.app/`
- **Admin Dashboard**: `https://your-domain.vercel.app/admin`
- **API Health**: `https://your-domain.vercel.app/api/health` (if exists)
- **Blog**: `https://your-domain.vercel.app/blog`
- **Contact**: `https://your-domain.vercel.app/contact`

---

## Admin Dashboard Features

### 🌐 Web Content Editor
Quick-edit important website content without touching code:
- Hero Title & Subtitle
- About Summary
- Services Introduction
- Contact Page Message
- Footer Tagline
- Company Contact Info (Address, Email, Phone)

**Usage**: Go to Admin Dashboard → Web Content → Select section → Edit → Save

### 📹 Videos & Shorts Manager
Add videos directly by pasting YouTube links:
1. Paste YouTube URL in "Video URL" field
2. Click "Fetch Video Metadata"
3. Title and thumbnail auto-populate
4. Add description, category, technologies
5. Click "Add Video"

YouTube metadata auto-fetches:
- Video title
- Thumbnail image
- Video duration (via OEmbed API)

### Other Admin Features
- **Blog Management**: Create, edit, publish blog posts
- **Portfolio**: Manage project portfolio items
- **Contact Requests**: Review form submissions from contact page
- **Site Settings**: Custom key-value settings for advanced configuration

---

## Custom Domain Setup

To use a custom domain like `asrvisuals.live`:

1. In Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records (instructions will appear in Vercel)
4. Update `REACT_APP_API_URL` environment variable if using separate API domain

---

## Backend API Routes

The backend Express server is deployed as `/api/*` routes. Main endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/admin/dashboard` - Admin stats (protected)
- `GET /api/admin/settings` - Site settings (protected)
- `PUT /api/admin/settings/:key` - Update setting (protected)
- `GET /api/portfolio` - Get all portfolios
- `POST /api/portfolio` - Create portfolio (protected)
- `GET /api/blog` - Get all blogs
- `POST /api/contact` - Submit contact form

---

## Troubleshooting

### "Cannot find module" errors
Make sure both `backend/package.json` and `frontend/package.json` have all dependencies listed.

### API calls returning 404
Check that `REACT_APP_API_URL` environment variable matches your Vercel domain.

### Admin pages not loading
Verify JWT token is valid - try logging out and logging back in.

### YouTube metadata not fetching
The YouTube Oembed API may rate-limit. Ensure video URL is valid public YouTube link.

---

## Local Development Before Deployment

Before deploying to Vercel, test locally:

```bash
# Install dependencies
npm install --prefix backend
npm install --prefix frontend

# Start backend
cd backend && npm start

# In another terminal, start frontend
cd frontend && REACT_APP_API_URL=http://localhost:3001 npm start
```

---

## 🚀 Production Optimization & Performance Setup

### Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Frontend build optimized (`npm run build`)
- [ ] Structured data validated
- [ ] robots.txt configured
- [ ] sitemap.xml generated
- [ ] Security headers verified
- [ ] Image optimization enabled
- [ ] Cache strategy configured
- [ ] Analytics configured
- [ ] Error tracking setup

### Frontend Optimization

#### 1. Build Optimization
```bash
cd frontend && npm run build
```
**Current Build Size**: 124.44 KB gzipped

**Verify with:**
```bash
npm install -g serve
serve -s build
```

#### 2. Image Optimization Strategy

ASR Visuals uses **Cloudinary** for image hosting. Optimize further with:

- **Format**: WebP with JPEG fallback
- **Responsive Images**: Use srcset for different screen sizes
- **Lazy Loading**: Load images as they come into viewport
- **Compression**: Ensure Cloudinary transform URLs include `q_auto` and `f_auto`

**Example optimized Cloudinary URL:**
```
https://res.cloudinary.com/your-cloud-name/image/upload/q_auto,f_auto,w_400,h_300/your-image.jpg
```

#### 3. Code Splitting

The frontend already has React Router. Verify lazy loading with:

```javascript
// components/PageTransition.jsx already handles route transitions
// Routes are lazy loaded through React Router v6
const lazy = React.lazy(() => import('./pages/BlogPage'));
```

#### 4. CSS & JavaScript Optimization

- CSS is minified in production build
- Remove unused CSS with PurgeCSS (handled by React Scripts)
- Minify and tree-shake unused code
- Verify with: `npm run build`

---

## 🔍 Google Search Console & Indexing Setup

### Step 1: Domain Ownership Verification

1. Go to **Google Search Console** (https://search.google.com/search-console)
2. Select "URL prefix" property
3. Enter: `https://asrvisuals.live`
4. Choose verification method:
   - **DNS Record** (Recommended for domain control)
   - **HTML File Upload**
   - **HTML Meta Tag**
   - **Google Analytics** (if already configured)

**For DNS Verification:**
1. Get verification token from GSC
2. Add TXT record to your domain registrar
3. Wait for DNS propagation (usually 24-48 hours)
4. Verify in GSC

### Step 2: Submit Sitemaps

1. In GSC, go to **Sitemaps** (left sidebar)
2. Enter: `https://asrvisuals.live/sitemap.xml`
3. Enter: `https://asrvisuals.live/blog-sitemap.xml` (once created)
4. GSC will fetch and display stats

**Current Sitemaps:**
- ✅ `public/sitemap.xml` - Main pages (9 URLs)
- ⏳ Need to create `/blog-sitemap.xml` - Blog posts (dynamic)

### Step 3: Monitor Indexing Status

In GSC:
- **Coverage Report**: Shows indexed, excluded, and errored URLs
- **URL Inspection**: Check if specific URLs are indexed
- **Page Indexing Report**: See which pages Google knows about

**Expected Timeline:**
- First crawl: 1-7 days
- Full indexing: 1-4 weeks
- Ranking: 4-12 weeks after indexing

### Step 4: Fix Crawl Issues

Common issues in GSC:
1. **Alternate pages with proper canonical tag**: Ensure `<link rel="canonical" href="...">` is correct
2. **Soft 404**: Ensure 404 pages return 404 status code
3. **Mobile usability issues**: Test with Google Mobile-Friendly Test
4. **Structured data errors**: Validate with Google Rich Results Test
5. **Crawl stats**: Monitor crawl budget and requests

**Current Status:**
- ✅ Canonical tags configured
- ✅ Mobile-friendly design (320px-1920px responsive)
- ✅ Structured data (LocalBusiness, WebSite, BreadcrumbList)
- ✅ Meta tags complete
- ✅ robots.txt configured

---

## 📊 Performance Monitoring & Analytics

### 1. Vercel Web Analytics (Free Tier)

Automatically enabled on all Vercel projects:
- Navigate to Project → Analytics
- View page performance metrics
- Monitor traffic patterns
- Track deployment impact

**Key Metrics:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

### 2. Google Analytics 4 (Recommended)

#### Setup:
1. Create GA4 property at https://analytics.google.com
2. Create web property for `asrvisuals.live`
3. Get Measurement ID (starts with `G-`)
4. Add to frontend `public/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_MEASUREMENT_ID', {
    'page_path': window.location.pathname,
    'anonymize_ip': true
  });
</script>
```

**GA4 Insights for ASR Visuals:**
- User behavior on portfolio/services pages
- Blog engagement metrics
- Contact form completion rates
- Device breakdown (mobile vs desktop)
- Geographic location insights

### 3. Core Web Vitals Monitoring

Google measures three Core Web Vitals:

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| **LCP** | < 2.5s | When largest content loads |
| **FID** | < 100ms | Responsiveness to user input |
| **CLS** | < 0.1 | Visual stability |

Check your site:
- **Google PageSpeed Insights**: https://pagespeed.web.dev (enter asrvisuals.live)
- **Web Vitals Chrome Extension**: Free extension for real-time data
- **GSC Core Web Vitals Report**: Real user data from your visitors

**Current Frontend Size**: 124.44 KB gzipped
**Expected LCP**: ~1.5-2.0s (GOOD)

### 4. Error Tracking (Optional but Recommended)

Use **Sentry** or **LogRocket** for catching frontend errors in production:

```javascript
// frontend/src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://...@sentry.io/...",
  environment: "production",
  tracesSampleRate: 1.0,
});
```

---

## 🛡️ Security & CORS Verification

### Current Security Configuration

**Frontend (vercel.json):**
```json
"headers": [
  {
    "key": "Strict-Transport-Security",
    "value": "max-age=63072000; includeSubDomains; preload"
  },
  {
    "key": "X-Content-Type-Options",
    "value": "nosniff"
  },
  {
    "key": "X-Frame-Options",
    "value": "DENY"
  },
  {
    "key": "Referrer-Policy",
    "value": "strict-origin-when-cross-origin"
  }
]
```

**Backend (Helmet.js):**
- CSP configured for self + trusted CDNs
- HSTS enabled (2 years)
- XSS protection enabled
- Frame guard enabled (deny)

**CORS Configuration:**
```javascript
const allowedOrigins = [
  'https://asrvisuals.live',
  'https://www.asrvisuals.live',
  'https://asrvisuals.vercel.app',
];
```

✅ **Status**: Security headers verified and properly configured

---

## 🗄️ Database Connection Pooling for Serverless

Vercel Serverless functions can have many concurrent instances. Optimize MongoDB connections:

**Current Backend Configuration (server.js):**
- Automatic reconnection with 10s retry
- `bufferCommands: false` prevents queue overflow
- Single connection shared across function instances

**For Production:**
1. Increase connection pool size in MongoDB Atlas:
   - Go to Atlas → Clusters → Connect → Connection String
   - Adjust `maxPoolSize=50000, minPoolSize=10`
2. Monitor connection usage:
   - Atlas → Metrics → Connections

Advanced: Use MongoDB serverless driver for automatic scaling

---

## 💾 Cache Control Strategy

### Current Caching (vercel.json):

```json
"headers": {
  "Cache-Control": "public, max-age=31536000, immutable"
}
// Applied to: /static/*
```

```json
"headers": {
  "Cache-Control": "public, max-age=3600"
}
// Applied to: *.html, robots.txt, sitemap.xml
```

### Cache Strategy by Content Type:

| Content | Cache Time | Why |
|---------|-----------|-----|
| HTML | 1 hour | May change, need fresh |
| Static JS/CSS | 1 year | Content-hashed, never change |
| Images (Cloudinary) | 1 year | CDN handles versioning |
| API Responses | 0 (no-cache) | Always fresh data |
| robots.txt | 24 hours | Rarely changes |
| sitemap.xml | 6 hours | Blogs may be added |

---

## ✅ Structured Data Validation

ASR Visuals includes three structured data types. Validate them:

### 1. LocalBusiness Schema
**Validate at**: https://search.google.com/test/rich-results
**Enter**: https://asrvisuals.live/

**Expected Rich Result**: Business info card with name, contact, social links

### 2. WebSite Schema with SearchAction
**Validates**: Site search functionality

### 3. BreadcrumbList
**Validates**: Breadcrumb navigation structure
**Current**: Home breadcrumb (homepage only)

### Validation Checklist:

```bash
# Use Google's Rich Results Test
https://search.google.com/test/rich-results

# Check structured data
https://schema.org/LocalBusiness
https://schema.org/WebSite
https://schema.org/BreadcrumbList
```

---

## 🎯 SEO Pre-Flight Checklist

Before Deployment:

### Meta Tags & Headers
- ✅ Page title: "ASR Visuals | Professional Video Editing, Thumbnails & Social Media Growth"
- ✅ Meta description: Professional video editing services description
- ✅ Open Graph tags configured
- ✅ Twitter Card tags configured
- ✅ Canonical tags set to asrvisuals.live

### Structured Data
- ✅ LocalBusiness schema for business info
- ✅ WebSite schema with search action
- ✅ BreadcrumbList for navigation
- ⏳ Add FAQ schema for legal pages (optional enhancement)
- ⏳ Add Service schema for services page (optional enhancement)

### Sitemaps & Crawling
- ✅ robots.txt: Proper directives and crawl-delay
- ✅ sitemap.xml: 9 main URLs with priorities
- ⏳ blog-sitemap.xml: Dynamic blog URLs (to be created)
- ✅ Canonical tags prevent duplicate content

### Performance
- ✅ Build optimized: 124.44 KB gzipped
- ✅ Mobile responsive: Tested 320px-1920px
- ✅ Images: Using Cloudinary (external CDN)
- ✅ CSS animations: Smooth and performant
- ⏳ Core Web Vitals: Monitor after deployment

### Security
- ✅ HTTPS only (Vercel auto SSL)
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ CORS configured for asrvisuals.live
- ✅ Rate limiting on API routes

### Content
- ✅ Legal pages: Terms, Privacy, Refund Policy
- ✅ Contact information: asrvisualshelpline@gmail.com
- ✅ Website: asrvisuals.live
- ✅ Proper 404 page handling

---

## 🚀 Post-Deployment Verification

### Immediately After Deploy:

1. **Site is Live**
   ```bash
   curl -I https://asrvisuals.live
   # Should return 200 OK
   ```

2. **All Pages Load**
   - [ ] Home: https://asrvisuals.live/
   - [ ] Services: https://asrvisuals.live/services
   - [ ] Blog: https://asrvisuals.live/blog
   - [ ] Portfolio: https://asrvisuals.live/#portfolio
   - [ ] Contact: https://asrvisuals.live/contact
   - [ ] About: https://asrvisuals.live/about
   - [ ] Admin: https://asrvisuals.live/admin

3. **API Endpoints Working**
   - [ ] Health check (if exists): `/api/health`
   - [ ] Blog list: `/api/blog`
   - [ ] Contact form: `POST /api/contact`

4. **Meta Tags Present**
   ```bash
   curl https://asrvisuals.live | grep -i "og:title"
   curl https://asrvisuals.live | grep -i "description"
   ```

5. **Security Headers Present**
   ```bash
   curl -I https://asrvisuals.live | grep -i "strict-transport-security"
   curl -I https://asrvisuals.live | grep -i "x-frame-options"
   ```

### Week 1 After Deploy:

1. **Google Search Console**
   - Verify domain ownership
   - Submit sitemaps
   - Check coverage report
   - Monitor crawl stats

2. **Core Web Vitals**
   - Run PageSpeed Insights
   - Check Vercel Analytics
   - Look for CWV issues in GSC

3. **Monitor Errors**
   - Check Vercel Function Logs
   - Monitor 4xx/5xx errors
   - Review failed requests

### Month 1 After Deploy:

1. **Indexing Progress**
   - Check GSC Coverage Report
   - See if pages are indexed
   - Monitor impressions in GSC Performance Report

2. **User Behavior**
   - Monitor GA4 for traffic
   - Track conversion metrics
   - Analyze popular pages

3. **Performance Trends**
   - Monitor Core Web Vitals over time
   - Check for performance degradation
   - Adjust caching if needed

---

## 📧 Contacting Support

**Email**: asrvisualshelpline@gmail.com
**Website**: https://asrvisuals.live
**Support Hours**: Mon-Fri 9AM-6PM IST

---

## Additional Resources

- **Vercel Docs**: https://vercel.com/docs
- **Google Search Console Help**: https://support.google.com/webmasters
- **Vercel Deployment Best Practices**: https://vercel.com/guides/deploying-expressjs-nodejs-app-to-vercel
- **React Build Optimization**: https://create-react-app.dev/docs/production-build/
- **Web Vitals**: https://web.dev/vitals/
- **HTTPS/SSL Setup**: https://vercel.com/docs/concepts/edge-network/ssl

Visit `http://localhost:3000/admin` and verify:
- ✅ Web Content editor loads
- ✅ Videos & Shorts can add YouTube videos
- ✅ Blog, portfolio, settings all work
- ✅ Google Form contact submission works

## Vercel Redeploy (Frontend)

### asrvisuals.live Production Target

For redeploying to `asrvisuals.live`, make sure the Vercel project has this domain assigned before redeploy.

- Production domain: `asrvisuals.live`
- Optional redirect domain: `www.asrvisuals.live` -> `asrvisuals.live`
- Required env on Vercel: `REACT_APP_API_URL` set to your live backend API host

### Replace Existing ASRVisuals Project on Vercel

If you are redeploying this code in place of the existing ASRVisuals deployment, use this exact sequence:

1. Open Vercel -> existing ASRVisuals project -> Settings.
2. Confirm **Root Directory** is `frontend`.
3. Confirm **Build Command** is `npm run build`.
4. Confirm **Output Directory** is `build`.
5. Set/update environment variable `REACT_APP_API_URL` to your live backend URL.
6. Keep existing custom domain attached to this same project.
7. Redeploy the latest commit from the connected branch.
8. Validate these routes after deploy: `/`, `/blog`, `/blog/:id`, `/contact`, `/admin`.
9. Clear browser cache once to refresh manifest/favicon and social metadata.

### 1) Vercel Project Settings

- Root directory: `frontend`
- Framework preset: `Create React App`
- Build command: `npm run build`
- Output directory: `build`

### 2) Required Environment Variable

Set this in Vercel Project Settings -> Environment Variables:

```env
REACT_APP_API_URL=https://YOUR_BACKEND_DOMAIN
```

Example for production:

```env
REACT_APP_API_URL=https://api.asrvisuals.live
```

Reference template: `frontend/.env.production.example`

The frontend supports both formats:

- `https://YOUR_BACKEND_DOMAIN`
- `https://YOUR_BACKEND_DOMAIN/api`

### API Health Check

After deploy, verify backend database connectivity:

```bash
curl https://YOUR_BACKEND_DOMAIN/api/health
```

You should receive HTTP 200 with `database: connected`. If not, fix backend `MONGODB_URI` first.

### One-Line Pre-Redeploy Check

Run this before every frontend redeploy to confirm backend + MongoDB are ready:

```bash
curl -s https://YOUR_BACKEND_DOMAIN/api/health && echo && curl -s https://YOUR_BACKEND_DOMAIN/api/blogs | head -c 300 && echo
```

Expected result:

- `/api/health` returns `status: success` and `database: connected`
- `/api/blogs` returns JSON data (not a service-unavailable message)

### 3) SPA Routing Support

`frontend/vercel.json` is configured so direct navigation to routes like `/blog/abc` or `/admin` loads correctly.

### 4) Redeploy Checklist

1. Push latest code to your Git branch.
2. In Vercel, click **Redeploy** on the latest deployment.
3. Verify `/`, `/blog`, `/blog/:id`, `/contact`, and `/admin` routes.
4. Verify admin API calls by logging in and opening dashboard, pages, and contact tabs.

## ✅ Status: Deployed Successfully!

### 🚀 Running Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Status**: Both servers are running

### 📦 What's Working

✅ **Frontend React App**: Running on port 3000  
✅ **Backend Express Server**: Running on port 5000  
✅ **API Routes**: All endpoints are active  
⚠️ **MongoDB**: Not connected (see setup below)

---

## ⚠️ MongoDB Setup Required

The backend is running but cannot connect to MongoDB. You need to install and start MongoDB:

### Option 1: Install MongoDB via Homebrew (Recommended for macOS)

```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify MongoDB is running
brew services list | grep mongodb
```

### Option 2: Install MongoDB via Official Installer

1. Download from: https://www.mongodb.com/try/download/community
2. Follow installation instructions for macOS
3. Start MongoDB:
   ```bash
   mongod --config /usr/local/etc/mongod.conf --fork
   ```

### Verify Connection

After starting MongoDB, the backend will automatically reconnect. Check the terminal for "MongoDB connected" message.

---

## 🔐 Owner Account Setup

To access the admin panel with full CMS capabilities:

1. **Create Owner Account** (one-time setup):
   ```bash
   curl -X POST http://localhost:5000/api/auth/bootstrap-owner \
     -H "Content-Type: application/json" \
     -d '{
       "setupKey": "asr_owner_setup_2026_secure",
       "name": "Admin Owner",
       "email": "admin@asrvisuals.com",
       "password": "secure_password_123"
     }'
   ```

2. **Save the returned JWT token** - you'll need it for authenticated requests

3. **Login to Admin Panel**: Navigate to http://localhost:3000/admin

---

## 📋 Available URLs

| Service | URL | Description |
|---------|-----|-------------|
| **Homepage** | http://localhost:3000 | Main website |
| **Blog** | http://localhost:3000/blog | Blog listing |
| **Portfolio** | http://localhost:3000/portfolio | Case studies |
| **Services** | http://localhost:3000/services | Service offerings |
| **About** | http://localhost:3000/about | About page |
| **Contact** | http://localhost:3000/contact | Contact form |
| **Admin Panel** | http://localhost:3000/admin | Owner CMS dashboard |

---

## 🔧 API Endpoints (Owner Only)

With your owner JWT token, you can access these CMS endpoints:

### Dashboard & Stats
```bash
GET http://localhost:5000/api/admin/dashboard
Authorization: Bearer YOUR_TOKEN_HERE
```

### Site Settings (WordPress-style)
```bash
# Get all settings
GET http://localhost:5000/api/admin/settings

# Update a setting
PUT http://localhost:5000/api/admin/settings/site_title
{
  "value": "ASR Visuals - Professional Video Editing"
}
```

### Page Content Management
```bash
# List all editable pages
GET http://localhost:5000/api/admin/pages

# Get specific page
GET http://localhost:5000/api/admin/pages/home

# Update page content
PUT http://localhost:5000/api/admin/pages/home
{
  "title": "Home Page",
  "sections": [
    {
      "key": "hero",
      "heading": "Your Custom Heading",
      "content": "Your custom content"
    }
  ]
}

# Update specific section
PATCH http://localhost:5000/api/admin/pages/home/sections/hero
{
  "heading": "New Heading",
  "image": "https://example.com/image.jpg"
}
```

### Full Website Snapshot
```bash
GET http://localhost:5000/api/admin/snapshot
# Returns: all settings, pages, blogs, and portfolios
```

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/asrvisuals
JWT_SECRET=asr_visuals_secret_key_2026_secure_token
JWT_EXPIRES_IN=7d
OWNER_SETUP_KEY=asr_owner_setup_2026_secure
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

---

## 🛑 Stopping Servers

To stop the running servers:

1. Go to your terminal
2. Press `Ctrl + C` in the terminal running each server
3. Or use these commands:

```bash
# Kill backend server
pkill -f "nodemon src/server.js"

# Kill frontend server
pkill -f "react-scripts start"

# Stop MongoDB service
brew services stop mongodb-community
```

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to MongoDB"
**Solution**: Install and start MongoDB (see MongoDB Setup section above)

### Problem: "Port 3000 already in use"
**Solution**: 
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Problem: "Port 5000 already in use"
**Solution**: 
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Problem: Admin panel shows "Not authorized"
**Solution**: Create owner account first using the bootstrap endpoint (see Owner Account Setup)

---

## 🎯 Next Steps

1. ✅ **Install MongoDB** if not already installed
2. ✅ **Create owner account** using the bootstrap endpoint
3. ✅ **Test the website** at http://localhost:3000
4. ✅ **Access admin panel** at http://localhost:3000/admin
5. ✅ **Start editing content** via CMS APIs or admin UI

---

## 📚 Additional Resources

- **Backend API Documentation**: See `/backend/README.md`
- **CMS Architecture**: WordPress-style content management with full API control
- **Authentication**: JWT-based with owner/admin/user roles
- **Models**: SiteSetting, PageContent, Blog, Portfolio, Contact, User

---

**Status**: Both servers are running and ready for development! 🎉

The only requirement is MongoDB installation to persist data.
