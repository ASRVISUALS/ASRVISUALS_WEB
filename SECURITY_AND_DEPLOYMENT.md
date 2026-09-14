# 🔐 Security Hardening & Production Checklist

## Security Implementations

### ✅ Backend Security (Node.js/Express)

#### 1. Helmet.js - Security Headers
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-Frame-Options**: `DENY` - Prevents clickjacking
- **X-XSS-Protection**: Enabled - Additional XSS protection
- **Content-Security-Policy**: Strict - Controls resource loading
- **Strict-Transport-Security**: HSTS enabled - Forces HTTPS
- **Referrer-Policy**: Strict origin when cross-origin

#### 2. CORS - Origin Restriction
Only allows requests from:
- `https://asrvisuals.live`
- `https://www.asrvisuals.live`
- `https://asrvisuals.vercel.app`
- `http://localhost:3000` (dev)

**Blocked**: All other origins get CORS error

#### 3. Rate Limiting
- **General**: 100 requests per 15 minutes
- **Auth**: 5 login/register attempts per hour
- **Response**: Proper rate limit headers

#### 4. Request Size Limits
- **JSON**: Max 10KB per request
- **URL-encoded**: Max 10KB per request
- **Protects against**: Large payload attacks

#### 5. Authentication (JWT)
- **Token storage**: localStorage (frontend)
- **Token validation**: Verified on all protected endpoints
- **Token format**: `Authorization: Bearer {token}`
- **Secret**: Must be strong, never hardcoded

### ✅ Frontend Security (React)

#### 1. Environment Variables Management
- **Dev**: `.env.local` (git-ignored)
- **Production**: Set in Vercel dashboard
- **Public**: Only `REACT_APP_*` variables exposed
- **Secret**: Backend URL, API keys never exposed

#### 2. Content Security Policy
Enforced via HTML meta tags:
- Scripts from: `self`, `unsafe-inline` (for React), `cdn.jsdelivr.net`
- Styles from: `self`, `unsafe-inline`, `fonts.googleapis.com`
- Fonts from: `self`, `fonts.gstatic.com`
- Images from: `self`, data URIs, HTTPS, blobs
- **Prevents**: XSS, inline script injection

#### 3. Secure API Calls
- **HTTPS only** in production
- **No credentials** in URLs
- **Bearer token** in Authorization header
- **Timeout**: 12 seconds per request
- **Axios interceptors**: Auto-attach token

#### 4. Input Validation
- Contact form: Email regex, length limits
- Blog/Portfolio forms: XSS prevention
- User input: Sanitized before API submission

### ✅ Vercel Security Headers

All responses include:
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### ✅ Database Security

#### MongoDB
- **Connection**: SSL/TLS encrypted
- **IP Whitelist**: Restrict to known IPs
- **Authentication**: Username + password required
- **Network Access**: Allow only from Vercel IPs
- **Collections**: Enable schema validation

#### Environment Variable Security
```env
MONGODB_URI=mongodb+srv://[user]:[password]@[cluster]/[database]?ssl=true
JWT_SECRET=[64+ character random string]
```

**Never** commit `.env` files - use `.env.example` templates

---

## Environment Variables for Vercel

### Frontend (.env.production in Vercel)
```env
REACT_APP_API_URL=https://asrvisuals.live
REACT_APP_SITE_URL=https://asrvisuals.live
NODE_ENV=production
```

### Backend (env vars in Vercel)
```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/asrvisuals?ssl=true
NODE_ENV=production

# Authentication
JWT_SECRET=[generate-strong-random-string]
JWT_EXPIRE=7d

# Cloudinary (optional, for media uploads)
CLOUDINARY_CLOUD_NAME=[your-cloud]
CLOUDINARY_API_KEY=[your-key]
CLOUDINARY_API_SECRET=[your-secret]

# API Configuration
CORS_ORIGIN=https://asrvisuals.live
PORT=3000

# Database Retry
DB_RETRY_MS=10000
```

### Generate Strong JWT Secret
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char](Get-Random -Minimum 33 -Maximum 127)}) -join ''))

# Or use:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## SEO Optimizations

### ✅ Meta Tags
- Title tags: Unique, descriptive (55-60 chars)
- Meta descriptions: Compelling (155-160 chars)
- Open Graph tags: For social sharing
- Twitter Card: Custom Twitter preview
- Canonical URLs: Prevent duplicate content

### ✅ Structured Data (Schema.org)
- LocalBusiness schema for company info
- WebSite schema for navigation
- BreadcrumbList for navigation hierarchy
- Proper JSON-LD formatting

### ✅ Robots.txt
- Allows all crawlers
- Blocks `/admin` from indexing
- Specifies sitemaps
- Rate limiting for heavy crawlers (AhrefsBot)

### ✅ Performance & Mobile
- **Responsive design**: Mobile-first
- **Page speed**: Optimized React build (120KB gzipped)
- **Fonts**: Preconnected, preloaded
- **Images**: Compressed, lazy-loaded
- **CSS**: Minified, combined

### ✅ Accessibility (a11y)
- Semantic HTML tags
- ARIA labels where needed
- Color contrast compliance
- Keyboard navigation support
- Alt text for images

---

## Device Compatibility Checklist

### ✅ Mobile Devices (320px - 480px)
- [ ] All text readable without zoom
- [ ] Buttons/links tappable (48x48px min)
- [ ] Navigation menu accessible
- [ ] Forms work on mobile keyboard
- [ ] Images responsive
- [ ] No horizontal scroll

### ✅ Tablets (481px - 1024px)
- [ ] Layout adapts to landscape/portrait
- [ ] Touch-friendly navigation
- [ ] Readable text size
- [ ] Tables scroll horizontally (if any)

### ✅ Desktop (1025px+)
- [ ] Full layout visible
- [ ] Hover states work
- [ ] Navigation clear
- [ ] Images sharp

### ✅ Browser Support
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 12+
- Chrome Mobile: Latest

### ✅ CSS Media Queries
```
Mobile: 0px - 560px (custom breakpoint)
Tablet: 561px - 900px
Desktop: 901px+
```

---

## Performance Optimization

### ✅ Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### ✅ Build Optimization
- React build: 120.72 KB (gzipped)
- Code splitting enabled
- Tree shaking removes dead code
- Dynamic imports for large components
- CSS minification

### ✅ Caching Strategy
- Static assets: 1 year cache (immutable)
- HTML/manifest/robots: 1 hour cache
- API responses: No cache (fresh data)

### ✅ Font Optimization
- Preconnect to Google Fonts
- System fonts fallback
- Font-display: swap (shows text immediately)

---

## Dependency Security

### ✅ Backend Packages
```
✓ bcryptjs: Password hashing
✓ corsv2.8.5: CORS handling
✓ express-rate-limit: Rate limiting
✓ helmet: Security headers
✓ jsonwebtoken: JWT authentication
✓ mongoose: Database ORM
✓ sanitize-html: HTML sanitization
```

### ✅ Frontend Packages
```
✓ react: UI framework
✓ react-router-dom: Routing
✓ axios: HTTP client
✓ firebase: File storage
```

### Vulnerability Scanning
```bash
# Check for known vulnerabilities:
npm audit
npm audit fix

# Check specific package:
npm audit --package=mongoose
```

---

## Deployment Checklist for asrvisuals.live

### Pre-Deployment
- [ ] All security packages installed
- [ ] Environment variables prepared
- [ ] Database (MongoDB) configured
- [ ] JWT secret generated (64+ chars)
- [ ] CORS origins set correctly
- [ ] Rate limiting configured
- [ ] Helmet security headers enabled
- [ ] CSP meta tags in HTML
- [ ] HTTPS enforced in Vercel config
- [ ] Custom domain added to Vercel
- [ ] SSL certificate auto-generated

### Vercel Configuration
- [ ] Custom domain: `asrvisuals.live`
- [ ] Auto-redirect `www.asrvisuals.live` → `asrvisuals.live`
- [ ] All environment vars set
- [ ] Build command correct: `cd frontend && npm run build`
- [ ] Output directory: `frontend/build`
- [ ] Node.js version: Latest (auto-selected)

### Testing Post-Deploy
- [ ] HTTPS enforced (not HTTP)
- [ ] SSL certificate valid
- [ ] Security headers present (check dev tools)
- [ ] CORS allows frontend origin
- [ ] Rate limiting works (test with many requests)
- [ ] API endpoints respond correctly
- [ ] Admin login works
- [ ] Contact form submits
- [ ] Videos load from CDN
- [ ] Mobile responsive works

---

## Monitoring & Maintenance

### ✅ Ongoing Security Checks
```bash
# Weekly: Check npm audit
npm audit

# Monthly: Update packages (with testing)
npm update
npm audit fix

# Quarterly: Security review
- Check logs for suspicious activity
- Review CORS origins (remove unused)
- Verify JWT secret strength
- Test rate limiting effectiveness
```

### ✅ Monitor These Alerts
- Failed login attempts (rate limiter)
- CORS policy violations
- Large request payloads (>10KB)
- 5xx errors in API
- Database connection errors
- Certificate expiration (Vercel handles)

### ✅ Regular Backups
- MongoDB backups: Weekly minimum
- Code repository: GitHub commits
- Environment secrets: Stored only in Vercel

---

## Incident Response Plan

**If security issue detected:**

1. **Immediate** (0-1 hour)
   - Verify the issue is real
   - Check logs for exploitation
   - Notify team

2. **Short-term** (1-24 hours)
   - Identify root cause
   - Apply temporary fix if needed
   - Deploy patched version
   - Monitor closely

3. **Long-term** (24+ hours)
   - Post-mortem analysis
   - Update documentation
   - Implement automation to prevent

---

## Compliance

### ✅ Privacy & Data Protection
- No personal data stored without consent
- GDPR compliant (EU users)
- Terms & Privacy policy available
- Cookie policy disclosed
- No tracking without consent

### ✅ Accessibility (WCAG 2.1 AA)
- Semantic HTML
- ARIA labels
- Color contrast ratio ≥ 4.5:1
- Keyboard navigation
- Screen reader compatible

---

**Last Updated**: March 29, 2026
**Status**: Production Ready ✅
**Deployment Target**: asrvisuals.live (HTTPS)
