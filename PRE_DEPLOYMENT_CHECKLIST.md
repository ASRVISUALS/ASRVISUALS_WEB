# 📝 Pre-Deployment Checklist

Complete this checklist before deploying to production.

## 1. Code Preparation

### Repository Setup
- [ ] Add `.gitignore` entries for all `.env` files
- [ ] Remove any hardcoded API keys/secrets from code
- [ ] Remove test/dummy data from database
- [ ] All sensitive data in environment variables only
- [ ] No console.logs with sensitive information
- [ ] Run linter: `npm run lint`
- [ ] Build test locally: `npm run build`

### Frontend Checks
- [ ] Update API endpoints to use `NEXT_PUBLIC_API_URL`
- [ ] Remove localhost references
- [ ] Check image domains in `next.config.js`
- [ ] Verify all external links use HTTPS
- [ ] Test responsive design on mobile/tablet
- [ ] Verify SEO metadata configured
- [ ] Check browser console for errors
- [ ] Test all forms submission

### Backend Checks
- [ ] Database connection string correct
- [ ] JWT secret configured (not default)
- [ ] Stripe keys are LIVE keys (not test)
- [ ] Email credentials configured
- [ ] CORS origins updated to production domain
- [ ] Rate limiting configured
- [ ] Error handling doesn't expose stack traces
- [ ] `/health` endpoint working

---

## 2. Third-Party Services Setup

### MongoDB Atlas ☑️
- [ ] Account created
- [ ] Free tier cluster provisioned
- [ ] Database user created (strong password)
- [ ] IP whitelist configured (allow Vercel/Render IPs)
- [ ] Connection string copied and tested
- [ ] Backups enabled (if on paid tier)

### Stripe ☑️
- [ ] Account created
- [ ] Live mode activated
- [ ] Live publishable key (pk_live_)
- [ ] Live secret key (sk_live_)
- [ ] Webhook endpoint configured
- [ ] Webhook signing secret obtained
- [ ] Test transaction verified

### Gmail (Email) ☑️
- [ ] Gmail account ready
- [ ] 2FA enabled on Google Account
- [ ] App-Specific Password generated
- [ ] Not using regular Gmail password
- [ ] Test email sending from backend
- [ ] Support email set up correctly

### Calendly (Booking) ☑️
- [ ] Account created/verified
- [ ] Booking link working
- [ ] Calendar synced
- [ ] Timezone correct
- [ ] Email notifications enabled

---

## 3. Frontend Deployment (Vercel)

### Before Pushing to Vercel
- [ ] GitHub repository is public/accessible
- [ ] All branches merged to main
- [ ] `.gitignore` includes `.env.local`
- [ ] `frontend/.env.example` created
- [ ] Build succeeds locally: `npm run build`

### Vercel Project Setup
- [ ] Vercel account created
- [ ] GitHub connected
- [ ] Repository imported
- [ ] Root directory set to `./frontend`
- [ ] Build command: `next build`
- [ ] Install command: `npm install`
- [ ] Output directory: `.next`

### Environment Variables (Vercel Dashboard)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_STRIPE_KEY=pk_live_xxxxxxxxxxxx
NEXT_PUBLIC_CALENDLY_URL=https://cal.com/asrvisuals
```

### Post-Deployment
- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] External links work
- [ ] Forms submit successfully
- [ ] Console has no errors
- [ ] Mobile responsive
- [ ] Page speed acceptable
- [ ] SSL certificate valid
- [ ] Custom domain configured (if applicable)

---

## 4. Backend Deployment (Render)

### Before Pushing to Render
- [ ] GitHub branch clean
- [ ] `backend/.env.example` created with all variables
- [ ] Build works locally: `npm run build`
- [ ] Start works locally: `npm start`

### Render Service Setup
- [ ] Render account created
- [ ] GitHub connected
- [ ] Repository selected
- [ ] Root directory: `backend`
- [ ] Build command: `npm install && npm run build`
- [ ] Start command: `npm start`
- [ ] Runtime: Node
- [ ] Region: Closest to users

### Environment Variables (Render Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/creatorflow
JWT_SECRET=<your-generated-secret>
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=<your-app-password>
FRONTEND_URL=https://your-domain.vercel.app
SUPPORT_EMAIL=support@asrvisuals.com
```

### Post-Deployment
- [ ] Health check passes: `curl https://your-backend.onrender.com/health`
- [ ] Database connection works
- [ ] Can authenticate (login/signup)
- [ ] Email service works
- [ ] Stripe integration works
- [ ] No errors in logs
- [ ] Response times acceptable
- [ ] CORS headers correct

---

## 5. Integration Testing

### Frontend ↔ Backend Connection
- [ ] Contact form submits and sends email
- [ ] Blog pages load data correctly
- [ ] Booking button links to Calendly
- [ ] Payment flow works end-to-end
- [ ] Authentication flow works
- [ ] Error handling displays correctly

### External Services
- [ ] Stripe webhook receives events
- [ ] Emails arrive in inbox
- [ ] Google Analytics tracking fires (if used)
- [ ] YouTube embeds work
- [ ] Calendly loads properly

---

## 6. Security Verification

### HTTPS & Certificates
- [ ] Frontend has valid SSL certificate
- [ ] Backend has valid SSL certificate
- [ ] Redirects HTTP → HTTPS working
- [ ] Mixed content warnings none

### Headers & Security
```bash
# Test security headers
curl -I https://your-domain.vercel.app

# Should include:
# - Strict-Transport-Security
# - X-Content-Type-Options
# - X-Frame-Options
# - X-XSS-Protection
# - Content-Security-Policy
```

### Secrets & Keys
- [ ] No API keys in GitHub history
- [ ] All secrets in environment variables
- [ ] No hardcoded database credentials
- [ ] JWT secret is strong (256-bit)
- [ ] Stripe test keys not in production
- [ ] Email password is app-specific (not regular)

### CORS & API
- [ ] CORS origin set to production domain only
- [ ] No CORS `Access-Control-Allow-Origin: *`
- [ ] API validates all inputs
- [ ] Rate limiting working
- [ ] No sensitive data in error messages

---

## 7. Performance & Monitoring

### Performance
- [ ] Lighthouse score > 80
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Page load time < 3 seconds

### Monitoring Setup
- [ ] Vercel Analytics enabled
- [ ] Render error logs accessible
- [ ] Consider Sentry for error tracking
- [ ] Consider DataDog for monitoring
- [ ] Uptime monitoring configured (UptimeRobot)

---

## 8. Backup & Recovery

### Database
- [ ] MongoDB backup enabled
- [ ] Recovery tested
- [ ] Backup schedule: Daily
- [ ] Backup retention: 30 days

### Code
- [ ] GitHub has all code
- [ ] Branches properly organized
- [ ] Tags for releases created
- [ ] Rollback plan documented

---

## 9. Documentation

### Created Files
- [ ] `.env.example` (frontend)
- [ ] `.env.example` (backend)
- [ ] `DEPLOYMENT.md` ✅
- [ ] `SECURITY.md` ✅
- [ ] `vercel.json` (frontend) ✅
- [ ] `.vercelignore` (frontend) ✅

### Documentation Content
- [ ] README updated with deployment info
- [ ] API documentation complete
- [ ] Environment variables documented
- [ ] Deployment steps clear
- [ ] Troubleshooting guide included

---

## 10. Final Sign-Off

### Before Going Live
- [ ] All checklist items completed
- [ ] Final test on production environment
- [ ] Team review completed
- [ ] Stakeholders notified
- [ ] Rollback plan ready
- [ ] Support contacts documented
- [ ] Monitoring configured
- [ ] Backup verified

### Launch
- [ ] Domain pointing to Vercel
- [ ] SSL certificate deployed
- [ ] Analytics tracking active
- [ ] Error logging active
- [ ] Uptime monitoring started

### Post-Launch
- [ ] Monitor errors for 24 hours
- [ ] Monitor performance metrics
- [ ] User feedback collected
- [ ] Issues logged and prioritized
- [ ] Team on alert for critical issues

---

## Deployment Commands

```bash
# Frontend build test
cd frontend
npm install
npm run build
npm start

# Backend build test
cd ../backend
npm install
npm run build
npm start

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test API health
curl https://your-backend.onrender.com/health

# Test CORS
curl -H "Origin: https://your-frontend.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  https://your-backend.onrender.com/api/contact
```

---

## Timeline Estimate

| Phase | Duration | Status |
|-------|----------|--------|
| Code preparation | 1-2 hours | ⏳ Ready |
| Third-party services | 2-3 hours | ⏳ Ready |
| Vercel deployment | 15-30 mins | ⏳ Ready |
| Render deployment | 15-30 mins | ⏳ Ready |
| Integration testing | 1-2 hours | ⏳ Ready |
| Security verification | 30-60 mins | ⏳ Ready |
| Total | 5-8 hours | ⏳ Ready |

---

**Status:** Ready for Deployment ✅
**Last Updated:** February 19, 2026
**Version:** 1.0
