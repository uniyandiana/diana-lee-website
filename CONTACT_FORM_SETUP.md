# Contact Form Setup Guide

Your contact form is now fully functional! It just needs one final step: setting up the Resend API key.

## ✅ What's Already Done

- ✅ Contact form with loading states
- ✅ Email templates (beautiful HTML formatting)
- ✅ API route for handling submissions
- ✅ Error handling
- ✅ Support for workshop/course/talk enquiries
- ✅ Sends to: `contact@diana-lee.com`

## 🔑 Setup Steps (5 minutes)

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up"
3. Sign up with your email or GitHub account
4. Verify your email

### Step 2: Add & Verify Your Domain

**IMPORTANT:** You must verify `diana-lee.com` before emails will work!

1. In Resend dashboard, click **"Domains"** in the left sidebar
2. Click **"Add Domain"**
3. Enter: `diana-lee.com`
4. Resend will show you DNS records to add

**Add these DNS records in your domain registrar:**

Resend will give you records like:
```
Type: TXT
Name: @ (or diana-lee.com)
Value: resend-domain-verification=xxxxxxxxxxxxx
```

**Where to add DNS records:**
- Log in to where you bought `diana-lee.com`
- Find "DNS Settings" or "DNS Management"
- Add the TXT records Resend provides
- Wait 5-30 minutes for verification

### Step 3: Get API Key

Once your domain is verified:

1. In Resend dashboard, click **"API Keys"** in the left sidebar
2. Click **"Create API Key"**
3. Settings:
   - Name: "Diana Website Contact Form"
   - Permission: **Sending access**
   - Domain: `diana-lee.com`
4. Click **"Add"**
5. **COPY THE API KEY** (starts with `re_`)
   - You won't see it again!

### Step 4: Add API Key to Your Website

#### Option A: Add Directly in Vercel (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Go to your project → **Settings** → **Environment Variables**
3. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste your API key (e.g., `re_abc123xyz...`)
   - **Environment:** All (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** → Click ⋯ on latest deployment → **Redeploy**

#### Option B: Add Locally (for testing)

1. Create a `.env.local` file in your project root:
   ```bash
   cd "/Users/diana/Documents/Diana - Personal Website"
   echo "RESEND_API_KEY=re_your_actual_api_key_here" > .env.local
   ```

2. Replace `re_your_actual_api_key_here` with your real API key

3. Test locally:
   ```bash
   npm run dev
   ```

4. Visit http://localhost:3000/contact and test the form

**Note:** `.env.local` is already in `.gitignore` so it won't be committed to GitHub.

---

## 🧪 Testing Your Contact Form

### After Setup:

1. Visit your website: https://diana-lee.com/contact
2. Fill out the form:
   - Name: Test User
   - Email: your-email@example.com
   - Subject: Workshop Enquiry
   - Message: Test message
3. Click **Send Message**
4. You should see: ✅ Success message
5. Check `contact@diana-lee.com` inbox for the email!

### What the Email Looks Like:

You'll receive a beautifully formatted email with:
- **Subject:** "New Contact Form: Workshop Enquiry" (or whatever they selected)
- **From:** Diana Lee Website <contact@diana-lee.com>
- **Reply-To:** The sender's email (so you can reply directly)
- **Body:** Nicely formatted HTML with:
  - Enquiry type
  - Sender's name
  - Sender's email
  - Their message

---

## 📧 Email Limits

### Resend Free Tier:
- **100 emails/day**
- **3,000 emails/month**
- More than enough for contact forms!

If you exceed this (unlikely), upgrade is $20/month for 50,000 emails.

---

## 🐛 Troubleshooting

### "Failed to send message"

**Check:**
1. Is domain verified in Resend? (Domains section should show ✓)
2. Is `RESEND_API_KEY` set in Vercel environment variables?
3. Did you redeploy after adding the environment variable?

**Fix:**
- Verify domain in Resend
- Add/check API key in Vercel Settings → Environment Variables
- Redeploy: Vercel Dashboard → Deployments → ⋯ → Redeploy

### Emails not arriving

**Check:**
1. Spam folder
2. `contact@diana-lee.com` is set up to receive emails (email forwarding)
3. Resend dashboard → Emails → See if email was sent

### Domain verification taking too long

- DNS changes can take up to 48 hours
- Use [DNS Checker](https://dnschecker.org) to verify propagation
- Make sure you added records to the correct domain

---

## 🎉 You're Done!

Once set up, your contact form will:
- ✅ Send beautiful emails to `contact@diana-lee.com`
- ✅ Show loading state while sending
- ✅ Display success message when sent
- ✅ Show error if something goes wrong
- ✅ Let clients reply directly to the sender
- ✅ Support workshop/course/talk enquiries

**Your contact form is now production-ready!** 🚀

---

## 💰 Cost

- **Resend:** FREE (up to 3,000 emails/month)
- **Total:** £0/month

---

Need help? Check [Resend documentation](https://resend.com/docs) or ask me!
