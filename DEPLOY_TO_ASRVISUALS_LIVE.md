# 🚀 Deployment to asrvisuals.live - Complete Guide

## Domain Setup (asrvisuals.live)

### Step 1: Register Domain
- **Domain**: asrvisuals.live
- **Registrar**: GoDaddy, Namecheap, Domain.com, etc.
- **Renewal**: Configure auto-renewal
- **Privacy**: Enable WHOIS privacy (optional)

### Step 2: Point Domain to Vercel

#### Option A: Using Vercel's Nameservers (Recommended)
1. In domain registrar, change nameservers to Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
   - `ns3.vercel-dns.com`
   - `ns4.vercel-dns.com`
2. Wait 24-48 hours for DNS propagation
3. Add domain in Vercel settings

#### Option B: Using CNAME (Point registrar's DNS)
1. Add CNAME record in registrar:
   - Host: `asrvisuals.live` (root) or `www`
   - Points to: `cname.vercel-dns.com`
2. Verify in Vercel settings

### Step 3: Vercel Domain Configuration
1. Go to Vercel Project Settings → Domains
2. Add `asrvisuals.live`
3. Vercel auto-generates SSL certificate (Let's Encrypt)
4. (Optional) Add `www.asrvisuals.live` redirect
5. Wait for green checkmark ✅

---

## Environment Variables for asrvisuals.live

### In Vercel Project Settings → Environment Variables

#### Frontend Variables
```env
REACT_APP_API_URL=https://asrvisuals.live
REACT_APP_SITE_URL=https://asrvisuals.live
NODE_ENV=production
```

#### Backend Variables
```env
# === Database ===
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/asrvisuals?ssl=true&authSource=admin
NODE_ENV=production

# === Authentication ===
JWT_SECRET=[GENERATE-NEW-STRONG-SECRET-64-CHARS]
JWT_EXPIRE=7d

# === CORS ===
CORS_ORIGIN=https://asrvisuals.live

# === Cloud Storage (Cloudinary) ===
CLOUDINARY_CLOUD_NAME=[your-cloud-name]
CLOUDINARY_API_KEY=[your-api-key]
CLOUDINARY_API_SECRET=[your-api-secret]

# === Email (Optional) ===
SMTP_HOST=[optional-email-host]
SMTP_USER=[optional-email-user]
SMTP_PASS=[optional-email-password]

# === Server Config ===
PORT=3000
DB_RETRY_MS=10000
```

### Generate Strong JWT Secret
```bash
# Mac/Linux:
openssl rand -hex 32

# Online generator:
# https://www.random.org/bytes/ (copy 32 bytes as hex)

# Node.js:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step-by-Step Deployment

### Step 1: Prepare Code
```bash
# Navigate to project
cd /Users/amitrana/Downloads/asrvisuals

# Make sure everything is committed
git status
git add .
git commit -m "Security hardening, SEO optimization, ready for Vercel deploy to asrvisuals.live"
git push origin main
```

### Step 2: Create Vercel Project
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Select repository: `asrvisuals`
5. Framework: Select "Create React App" (or "Other" for monorepo)

### Step 3: Configure Build Settings
- **Root Directory**: `/` (root of monorepo)
- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/build`
- **Install Command**: Keep default (auto-detects)

### Step 4: Add Environment Variables
Copy all variables from section above into Vercel dashboard:
- Settings → Environment Variables
- Paste each variable
- Save

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-5 minutes for build completion
3. See deployment URL: `https://asrvisuals.vercel.app`

### Step 6: Add Custom Domain
1. Project Settings → Domains
2. Add `asrvisuals.live`
3. Follow DNS setup steps
4. Wait 24-48 hours (or immediate with Vercel nameservers)
5. See green ✅ when propagated

### Step 7: Set Default Domain
1. In Domains section
2. Set `asrvisuals.live` as primary (drag to top)
3. Add `www.asrvisuals.live` with auto-redirect

### Step 8: Verify HTTPS
1. Visit: `https://asrvisuals.live` (should work)
2. Check browser lock icon 🔒
3. Try redirect: `http://asrvisuals.live` → HTTPS
4. Try: `www.asrvisuals.live` → `asrvisuals.live`

---

## Post-Deployment Verification Checklist

### ✅ HTTPS & Security
- [ ] `https://asrvisuals.live` works (green lock)
- [ ] `http://asrvisuals.live` redirects to HTTPS
- [ ] `https://www.asrvisuals.live` works
- [ ] Security headers present (F12 → Network → Response Headers)
  - [ ] X-Content-Type-Options: nosniff
  - [ ] X-Frame-Options: DENY
  - [ ] Strict-Transport-Security: present
- [ ] CSP header: Content-Security-Policy present
- [ ] No mixed content warnings

### ✅ Frontend (SPA)
- [ ] Homepage loads: `https://asrvisuals.live/`
- [ ] All images load fast
- [ ] Fonts render (Manrope, Sora)
- [ ] CSS styling correct
- [ ] Navigation buttons work
- [ ] Page transitions smooth
- [ ] Scroll-to-top works on navigation

### ✅ Routing & Pages
- [ ] `/` - Homepage ✅
- [ ] `/about` - About page ✅
- [ ] `/services` - Services page ✅
- [ ] `/blog` - Blog list ✅
- [ ] `/blog/[id]` - Blog post detail ✅
- [ ] `/contact` - Contact form ✅
- [ ] `/portfolio` or similar - Videos/portfolio ✅
- [ ] `/admin` - Admin login ✅
- [ ] All 404s properly handled (SPA routing)

### ✅ Admin Dashboard
- [ ] Login at `https://asrvisuals.live/admin`
- [ ] Dashboard stats load
- [ ] 🌐 Web Content tab works
- [ ] 📹 Videos & Shorts tab loads
- [ ] Can add video by YouTube link
- [ ] Metadata fetch works
- [ ] Blog management works
- [ ] Site settings accessible

### ✅ Forms & Submissions
- [ ] Contact form loads  
- [ ] Contact form submits successfully
- [ ] Submit shows success message
- [ ] Data appears in Google Forms (check)
- [ ] Email validation works
- [ ] Required field validation works

### ✅ API Connectivity
- [ ] Backend API responds
- [ ] CORS allows requests
- [ ] Authentication works (JWT)
- [ ] Admin endpoints protected
- [ ] No 401/403 errors for valid tokens
- [ ] Error handling graceful

### ✅ Performance
- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] No console errors (F12)
- [ ] No console warnings

### ✅ Mobile Responsiveness
- [ ] iPhone SE (375px): Works ✅
- [ ] iPhone 12 (390px): Works ✅
- [ ] iPad (768px): Works ✅
- [ ] Desktop (1920px): Works ✅
- [ ] Touch navigation works
- [ ] Hamburger menu works (if responsive)
- [ ] Forms work on mobile

### ✅ SEO
- [ ] Page title correct: "ASR Visuals | Professional Video Editing..."
- [ ] Meta description present
- [ ] Favicon visible (browser tab)
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Canonical URLs set
- [ ] Open Graph tags present (check page source)
- [ ] Structured data valid (Schema.org)

### ✅ Caching & Performance
- [ ] Static assets cached 1 year
- [ ] HTML cached 1 hour
- [ ] No 304 Not Modified errors
- [ ] API responses not cached
- [ ] Service Worker working (if PWA enabled)

### ✅ Third-Party Integrations
- [ ] Google Forms contact submission works
- [ ] Firebase uploads work (if configured)
- [ ] Cloudinary CDN serves images
- [ ] YouTube embeds load
- [ ] Social media links work

---

## Testing Checklist by Device

### Desktop (Chrome, Firefox, Safari)
```
✓ Hover effects work
✓ All animations smooth
✓ Full-width layouts render
✓ High-res images clear
✓ No layout shifts
```

### Mobile (iOS Safari, Chrome)
```
✓ Readable without pinch-zoom
✓ Buttons 48x48px+ (easy to tap)
✓ Forms work with mobile keyboard
✓ No horizontal scroll
✓ Fast page load
✓ Touch redirects work
```

### Tablet (iPad, Android Tab)
```
✓ Landscape/Portrait switch works
✓ Touch navigation responsive
✓ Images scale properly
✓ No content overflow
```

---

## Monitoring After Deployment

### Daily (First Week)
- Check Vercel Analytics dashboard
- Monitor error logs
- Check form submissions working
- Verify email notifications

### Weekly
- Monitor Core Web Vitals
- Check for 4xx/5xx spikes
- Review bandwidth usage
- Confirm backups running

### Monthly
- Security audit (npm audit)
- Performance review
- User feedback compilation
- Update dependencies

---

## DNS Records to Verify

```
asrvisuals.live  A  76.76.19.165    (Vercel IP)
www asrvisuals.live  CNAME  cname.vercel-dns.com
```

**Check DNS propagation**:
```bash
# Mac/Linux:
nslookup asrvisuals.live
dig asrvisuals.live

# Or use online tool:
# https://mxtoolbox.com/ → DNS Lookup
```

---

## Rollback Plan (If Issues)

If critical issues after deployment to asrvisuals.live:

### Option 1: Redeploy Previous Version (Fast)
```bash
# In Vercel Dashboard:
1. Go to Deployments
2. Find last successful deployment
3. Click "Redeploy"
4. Takes 1-2 minutes
```

### Option 2: Fix and Redeploy (Best)
```bash
# Locally:
git checkout [previous-commit]
# OR fix the issue:
git commit -m "Fix: [issue-name]"
git push  # Auto-deploys from Vercel

# Takes 2-5 minutes
```

### Option 3: Emergency Downtime Mode
- Revert DNS to previous host
- Use Vercel's "default domain" temporarily
- Deploy minimal working version

---

## Production Checklist (Before Going Live)

- [ ] Domain purchased & configured
- [ ] HTTPS working with green lock
- [ ] All environment variables set in Vercel
- [ ] Database (MongoDB) production instance ready
- [ ] Firebase credentials (if using uploads)
- [ ] Cloudinary account linked
- [ ] Backups configured
- [ ] Monitoring alerts set up
- [ ] Error logging configured (Sentry optional)
- [ ] Team notified
- [ ] Incident response plan documented

---

## Admin First-Time Setup

After deployment, admin should:

1. **Login** to `/admin` at `https://asrvisuals.live/admin`
2. **Update Web Content**
   - Set company email, phone, address
   - Update hero titles and descriptions
3. **Add Sample Videos**
   - Test YouTube video fetch
   - Verify upload functionality
4. **Configure Settings**
   - Add social media links
   - Set site configuration
5. **Test Admin Features**
   - Create test blog post
   - Verify settings save
   - Check contact form submissions

---

## Support & Troubleshooting

### Issue: Domain not resolving
**Solution**: Wait 24-48 hours for DNS propagation
- Check: `nslookup asrvisuals.live`
- Try in incognito (clear DNS cache)
- Verify Vercel nameservers added

### Issue: API returning 401 Unauthorized
**Solution**: JWT authentication issue
- Check `JWT_SECRET` set in Vercel env
- Verify `CORS_ORIGIN=https://asrvisuals.live`
- Logout and login again

### Issue: Slow page load
**Solution**: Check performance metrics
- Go to Vercel Analytics → Performance
- Check Lighthouse score
- Verify static assets cached properly

### Issue: Contact form not submitting
**Solution**: Check Google Forms configuration
- Verify `REACT_APP_GOOGLE_FORM_ACTION` correct
- Verify all entry IDs correct
- Check browser console (F12) for errors

---

**Deployment Date**: _____________
**Deployer**: _____________
**Status**: Ready for Production ✅

**Vercel Project**: asrvisuals
**Domain**: asrvisuals.live
**SSL**: Auto (Let's Encrypt) ✅
**Monitoring**: Enabled
