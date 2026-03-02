# Blog Post Creation Guide

Complete guide for creating and managing blog posts on your Diana Lee Personal Website.

---

## 📝 Two Ways to Create Blog Posts

Your website supports **two methods** for creating blog posts:

### Method 1: Markdown Files (Simpler, Local)
✅ Best for: Quick posts, local control, version control with git
✅ Language support: English and Traditional Chinese
✅ No internet required after setup

### Method 2: Sanity CMS (Advanced, Web-Based)
✅ Best for: Rich media, collaborative editing, cloud storage
✅ Access from anywhere via web interface
✅ Project ID: `ywiwrrdp`

---

## 🚀 Method 1: Creating Markdown Blog Posts

### Step 1: Navigate to Blog Content Directory

```bash
cd "/Users/diana/Documents/Diana - Personal Website/blog-content"
```

### Step 2: Create a New Markdown File

**Naming Convention:**
- **English posts:** `##-title-with-hyphens.md` (e.g., `13-mastering-time-management.md`)
- **Chinese posts:** `zh-##-title-with-hyphens.md` (e.g., `zh-01-career-clarity.md`)

The number (##) determines the order - **higher numbers appear first** (newest first).

### Step 3: Use This Template

Create your new file and paste this template:

```markdown
# Your Blog Post Title Here

**Category:** Career Development
**Reading Time:** 8 minutes
**Excerpt:** A compelling one-sentence summary that appears in previews and search results.

---

## Introduction

Your opening paragraph goes here. Hook the reader with a relatable scenario or compelling question.

---

## First Major Section

Your content here. Use:
- **Bold** for emphasis
- Lists for clarity
- ## Headings for structure

### Subsection

More detailed content...

---

## Key Takeaways

Summarize the main points:
1. First key point
2. Second key point
3. Third key point

---

## Conclusion

Wrap up with actionable next steps or a call to reflection.
```

### Step 4: Fill in the Metadata

**Important fields:**
- **Category** options:
  - `Career Development`
  - `Entrepreneurship`
  - `Personal Growth`
  - `Leadership`

- **Reading Time:** Estimate 200 words = 1 minute

- **Excerpt:** Keep under 160 characters for best display

### Step 5: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000/resources` to see your post appear.

### Step 6: Build and Deploy

```bash
npm run build
git add blog-content/
git commit -m "Add new blog post: [Your Title]"
git push
```

---

## 🎨 Method 2: Creating Posts in Sanity CMS

### Step 1: Access Sanity Studio

**Option A: Local Studio**
```bash
cd "/Users/diana/Documents/Diana - Personal Website"
npm run sanity:dev
```
Opens at: `http://localhost:3333`

**Option B: Cloud Studio (Recommended)**
Visit: https://www.sanity.io/manage
- Login to your account
- Select project: "Diana Lee Personal Website"
- Click "Vision" or "Content" to manage

### Step 2: Create New Blog Post

1. Click **"+ Create"** or **"Blog Post"**
2. Fill in the form:
   - **Title:** Your post title
   - **Slug:** Auto-generated URL (e.g., `mastering-time-management`)
   - **Language:** Select `English` or `繁體中文`
   - **Category:** Choose from dropdown
   - **Excerpt:** Brief summary
   - **Published At:** Set publication date
   - **Content:** Rich text editor for your post body

3. Click **"Publish"** when ready

### Step 3: Deploy Changes

Sanity posts appear automatically on your website after publishing (may take 1-2 minutes due to caching).

To force refresh:
```bash
# Rebuild and redeploy
npm run build
```

---

## 📂 File Structure Reference

```
/Users/diana/Documents/Diana - Personal Website/
├── blog-content/              # Markdown blog posts
│   ├── 01-career-clarity-when-feeling-lost.md
│   ├── 02-personality-career-fit-why-it-matters.md
│   ├── zh-01-career-clarity.md        # Chinese version
│   └── [your-new-post].md
├── public/images/             # Blog images (if needed)
├── sanity/schemas/            # Sanity CMS schema definitions
│   └── blogPost.ts
└── lib/blog.ts               # Blog logic (fetches from both sources)
```

---

## 🖼️ Adding Images to Blog Posts

### For Markdown Posts:

1. **Add image to public folder:**
   ```bash
   # Save your image to:
   /Users/diana/Documents/Diana - Personal Website/public/images/blog/your-image.jpg
   ```

2. **Reference in markdown:**
   ```markdown
   ![Alt text](/images/blog/your-image.jpg)
   ```

### For Sanity Posts:

1. In Sanity Studio, use the **Image** field
2. Upload directly through the web interface
3. Images are automatically optimized and served via Sanity CDN

---

## ✅ Pre-Publish Checklist

Before publishing any blog post, verify:

- [ ] **Title is compelling and clear** (50-60 characters ideal)
- [ ] **Category is set correctly**
- [ ] **Excerpt is engaging** (under 160 characters)
- [ ] **Reading time is accurate** (200 words ≈ 1 minute)
- [ ] **Language is specified** (en or zh)
- [ ] **Content has proper headings** (## for sections)
- [ ] **Spell check completed**
- [ ] **Links are working** (if any)
- [ ] **Images are optimized** (under 500KB if possible)
- [ ] **Post number is correct** (higher = newer)

---

## 🔧 Troubleshooting

### Post Not Appearing?

**Problem:** New markdown post doesn't show up

**Solutions:**
1. Check filename format: `##-title-with-hyphens.md`
2. Verify file is in `/blog-content/` directory
3. Restart dev server: `npm run dev`
4. Check for syntax errors in frontmatter

### Sanity Post Not Showing?

**Problem:** Published Sanity post doesn't appear

**Solutions:**
1. Check publication date isn't in the future
2. Verify language field is set (en or zh)
3. Clear cache: `npm run build`
4. Check Sanity Studio for publish status

### Build Errors?

**Problem:** `npm run build` fails

**Solutions:**
1. Check for special characters in markdown (curly quotes, em dashes)
2. Verify all metadata fields are present
3. Check for unclosed markdown syntax
4. Run `npm run lint` to catch issues

---

## 📚 Helpful Links

### Sanity CMS
- **Dashboard:** https://www.sanity.io/manage
- **Documentation:** https://www.sanity.io/docs
- **Studio Local:** `npm run sanity:dev` → http://localhost:3333

### Your Project
- **Blog Page (Live):** `/blog` or `/resources`
- **Individual Posts:** `/blog/[slug]`
- **Source Code:** `/app/blog/` and `/lib/blog.ts`

### Markdown Guide
- **Syntax:** https://www.markdownguide.org/basic-syntax/
- **Cheat Sheet:** https://www.markdownguide.org/cheat-sheet/

### Image Optimization (Before Upload)
- **TinyPNG:** https://tinypng.com/ (Compress images)
- **Squoosh:** https://squoosh.app/ (Advanced compression)
- **Remove.bg:** https://www.remove.bg/ (Background removal)

---

## 🎯 Quick Start Commands

```bash
# Start development server
npm run dev

# Create new markdown post
cd blog-content
nano 26-your-new-post-title.md  # Use template above

# Open Sanity Studio locally
npm run sanity:dev

# Build for production
npm run build

# Commit and push changes
git add .
git commit -m "Add new blog post: Your Title"
git push
```

---

## 💡 Tips for Great Blog Posts

1. **Start with a hook** - Open with a relatable problem or surprising fact
2. **Use subheadings** - Break content into scannable sections
3. **Include examples** - Real scenarios resonate more than abstract advice
4. **End with action** - Give readers clear next steps
5. **Optimize for SEO** - Use keywords naturally in title and excerpt
6. **Keep it conversational** - Write like you're talking to a friend
7. **Edit ruthlessly** - Remove fluff, get to the point

---

## 📞 Need Help?

If you encounter issues:

1. **Check this guide** first
2. **Review existing posts** in `/blog-content/` for examples
3. **Check build logs** with `npm run build` for specific errors
4. **Verify Sanity connection** at https://www.sanity.io/manage

---

**Last Updated:** 2025-02-25
**Guide Location:** `/Users/diana/Documents/Diana - Personal Website/BLOG_GUIDE.md`
