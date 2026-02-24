# Deployment Guide - Diana Lee Personal Website

## ✅ Completed Steps

- [x] Git repository initialized
- [x] Initial commit created
- [x] UK GDPR & Cookie Compliance implemented
- [x] Production build tested successfully

## 🚀 Next Steps to Launch

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click "New Repository" (green button)
3. Repository settings:
   - Name: `diana-lee-website` (or any name you prefer)
   - Description: "Professional website for Diana Lee - Career Development Facilitator & Enterprise Educator"
   - Visibility: **Public** (required for free Vercel hosting)
   - Do NOT initialize with README (we already have files)
4. Click "Create repository"

### Step 2: Push Code to GitHub

After creating the repository, run these commands in your terminal:

```bash
cd "/Users/diana/Documents/Diana - Personal Website"

# Add GitHub as remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/diana-lee-website.git

# Push code to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Sign up for Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub" (easiest option)
   - Authorize Vercel to access your GitHub account

2. **Import your project:**
   - Click "Add New Project"
   - Select your GitHub repository `diana-lee-website`
   - Click "Import"

3. **Configure deployment:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)
   - Click "Deploy"

4. **Wait for deployment:**
   - First deployment takes 2-3 minutes
   - You'll get a free `.vercel.app` subdomain (e.g., `diana-lee-website.vercel.app`)

### Step 4: Purchase Custom Domain

**Recommended Domain Registrars:**

1. **Namecheap** (Budget-friendly)
   - URL: [namecheap.com](https://www.namecheap.com)
   - Price: £8-15/year for .com
   - Pros: Affordable, free WHOIS privacy, good UI

2. **Google Domains** → **Squarespace Domains**
   - URL: [domains.google.com](https://domains.google.com) (now [domains.squarespace.com](https://domains.squarespace.com))
   - Price: £10-12/year
   - Pros: Clean interface, reliable

3. **Cloudflare** (Best value)
   - URL: [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/)
   - Price: At-cost pricing (£7-9/year)
   - Pros: Lowest price, built-in security, fast DNS

**Suggested Domain Names:**
- `dianalee.com` or `dianalee.co.uk` (if available)
- `diana-lee.com`
- `dianaleecareers.com`
- `diana-lee.co.uk` (UK-focused)

### Step 5: Connect Domain to Vercel

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains" tab
   - Enter your purchased domain name
   - Click "Add"

2. **Configure DNS:**
   Vercel will show you DNS records to add. In your domain registrar:

   **Option A: Use Vercel nameservers (Recommended - Easiest)**
   - Vercel will provide nameservers (e.g., `ns1.vercel-dns.com`)
   - In your domain registrar, change nameservers to Vercel's
   - Wait 24-48 hours for DNS propagation

   **Option B: Add A/CNAME records (Manual)**
   - Add A record: `@` pointing to `76.76.21.21`
   - Add CNAME record: `www` pointing to `cname.vercel-dns.com`
   - Wait 1-24 hours for DNS propagation

3. **SSL Certificate:**
   - Vercel automatically provisions free SSL certificate (HTTPS)
   - No action needed - handled automatically

### Step 6: Verify Deployment

1. Visit your custom domain (e.g., `www.dianalee.com`)
2. Check all pages load correctly:
   - Home, About, Services, Resources, Contact
   - Privacy Policy
   - Cookie consent banner appears
3. Test language switcher (EN/中文)
4. Test contact form
5. Verify HTTPS is working (padlock icon in browser)

## 📋 Post-Launch Checklist

- [ ] Update email address in Privacy Policy (currently placeholder)
- [ ] Test all links and navigation
- [ ] Verify cookie consent works
- [ ] Share website on LinkedIn/social media
- [ ] Set up Google Search Console (optional, for SEO)
- [ ] Consider adding Google Analytics (optional - requires updating cookie policy)

## 🔐 Security & Compliance

✅ **UK GDPR & DPA 2018 Compliant:**
- Privacy Policy page created (`/privacy`)
- Cookie consent banner implemented
- Only essential cookies used
- User rights clearly stated
- ICO complaint information provided

✅ **PECR Compliant:**
- Cookie consent obtained before non-essential cookies
- Clear information about cookie usage
- User can decline cookies

## 💰 Costs Estimate

- **Vercel Hosting:** £0/month (Free tier - sufficient for your site)
- **Domain Name:** £7-15/year (one-time annual cost)
- **Total Year 1:** ~£7-15
- **Total Year 2+:** ~£7-15/year (just domain renewal)

## 📧 Contact Information to Update

Before going live, update your email address in:
1. `/app/privacy/page.tsx` - Replace `[Your Email Address]` placeholders
2. `/components/Footer.tsx` - Update if needed

## 🆘 Troubleshooting

**Build fails on Vercel:**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

**Domain not working after 48 hours:**
- Use [DNS Checker](https://dnschecker.org) to verify DNS propagation
- Verify DNS records in your domain registrar
- Contact Vercel support (free for all users)

**Cookie banner not showing:**
- Clear browser cache and localStorage
- Try incognito/private browsing mode

## 📞 Support

- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Domain Registrar Support:** Check your registrar's help center

---

**Ready to launch?** Start with Step 1! 🎉
