# Sanity CMS Setup Guide

Your website now has a **Sanity CMS admin portal** to manage content without coding!

## 🎯 What You Can Manage

- ✍️ **Blog Posts** - Write and publish articles
- 📁 **Resources** - Upload PDFs, templates, guides
- 🖼️ **Images** - Upload and manage media

---

## 🚀 Quick Setup (One-Time Only)

### Step 1: Create a Free Sanity Account

1. Go to: **https://www.sanity.io/**
2. Click **"Get Started"** (it's free!)
3. Sign up with your email or Google account

### Step 2: Create a New Project

1. Once logged in, click **"Create Project"**
2. **Project Name:** `Diana Personal Website`
3. **Dataset:** `production`
4. **Region:** Choose closest to you (e.g., EU or US)
5. Click **Create**

You'll get a **Project ID** - copy this! (looks like: `abc123xyz`)

### Step 3: Get Your Credentials

In your Sanity dashboard:
1. Go to **Settings** → **API**
2. Copy your **Project ID**
3. Click **"Add API Token"**
   - Name: `Website`
   - Permissions: **Editor**
4. Copy the token (you'll only see it once!)

### Step 4: Add Credentials to Your Website

Create a file: `.env.local` in your website folder with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token-here
```

**Replace** `your-project-id-here` and `your-token-here` with your actual values.

### Step 5: Update sanity.config.ts

Open `sanity.config.ts` and replace:
```typescript
projectId: 'your-project-id'
```

With your actual Project ID:
```typescript
projectId: 'abc123xyz'  // Your real ID
```

---

## 📝 Using Your Admin Portal

### Start the Admin Portal

Run this command:
```bash
cd "/Users/diana/Documents/Diana - Personal Website"
npm run studio
```

Your admin portal will open at: **http://localhost:3333**

### What You'll See

A clean interface with:
- 📝 **Blog Posts** - Create new articles
- 📁 **Resources** - Upload files
- 🖼️ **Media** - Manage images

### Creating a Blog Post

1. Click **"Blog Posts"** → **"Create"**
2. Fill in:
   - **Title:** Your post title
   - **Slug:** Click "Generate" (creates URL)
   - **Category:** Choose one
   - **Excerpt:** Short summary (200 chars max)
   - **Content:** Write your post (rich text editor!)
   - **Published At:** Set date/time
   - **Featured:** Check to show on homepage
3. Click **"Publish"**

### Uploading a Resource

1. Click **"Resources"** → **"Create"**
2. Fill in:
   - **Title:** Resource name
   - **Type:** PDF, Template, etc.
   - **Category:** Career, Entrepreneurship, etc.
   - **Description:** What it's for
   - **File:** Upload your PDF/file
   - OR **External Link:** Link to Google Drive, etc.
3. Click **"Publish"**

---

## 🌐 Connecting to Your Website

Your website will automatically fetch content from Sanity once configured!

### Update Resources Page

The Resources page at `/app/resources/page.tsx` currently has placeholder data. To connect it to Sanity:

1. Import the Sanity client:
```typescript
import { sanityFetch } from '@/lib/sanity'
```

2. Fetch blog posts:
```typescript
const blogPosts = await sanityFetch({
  query: `*[_type == "blogPost"] | order(publishedAt desc)[0...4]`
})
```

3. Fetch resources:
```typescript
const resources = await sanityFetch({
  query: `*[_type == "resource" && featured == true]`
})
```

---

## 🎨 Admin Portal URL

**Local (Development):**
Run `npm run studio` → http://localhost:3333

**Live (After Deploy):**
Run `npm run studio:deploy` → https://your-studio.sanity.studio

---

## 📚 What's Included

### Content Types

1. **Blog Posts**
   - Title, slug, category
   - Excerpt (short summary)
   - Rich text content
   - Images
   - Publish date
   - Featured flag

2. **Resources**
   - Title, type, category
   - Description
   - File upload OR external link
   - Featured flag

---

## 🔐 Security Note

**NEVER** commit `.env.local` to git! It contains your secret API token.

The `.gitignore` file already excludes it, so you're safe.

---

## ❓ Quick Troubleshooting

**Problem:** "Project ID not found"
**Solution:** Make sure you updated `sanity.config.ts` with your real Project ID

**Problem:** "Cannot connect to Sanity"
**Solution:** Check that `.env.local` exists and has correct credentials

**Problem:** "Studio won't start"
**Solution:** Run `npm install` again, then `npm run studio`

---

## 🎉 You're All Set!

Once configured:
1. **Write content** in the admin portal (`npm run studio`)
2. **View on website** (pages automatically fetch from Sanity)
3. **No coding needed** - just use the visual editor!

---

**Need help?** The official Sanity docs are excellent: https://www.sanity.io/docs
