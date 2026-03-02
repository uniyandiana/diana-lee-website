# Quick Guide: How to Create a New Blog Post

## The Easy Way (No Terminal Required!)

### Step 1: Open Sanity Studio
Go to: **https://dianalee.sanity.studio**

Log in with your Sanity account.

### Step 2: Create New Blog Post
1. Click **"Blog Posts"** in the left sidebar
2. Click the **"+ Create"** button (top right)
3. Select **"Blog Posts"**

### Step 3: Fill In the Details

**Required Fields:**
- **Title**: Your blog post title
- **Slug**: Click "Generate" (auto-creates from title)
- **Category**: Choose from dropdown
  - Career Development
  - Entrepreneurship
  - Personal Growth
  - Facilitation
- **Language**: Select English or 繁體中文
- **Excerpt**: Short summary (max 200 characters)
- **Published At**: Auto-filled with today's date (you can change it)

**Content:**
- Write your blog post in the **Content** editor
- Use the formatting toolbar for headings, bold, lists, etc.
- You can add images by clicking the image icon

**Optional:**
- **Featured**: Check this to show on homepage

### Step 4: Publish
1. Click **"Publish"** button (top right)
2. You'll see a green checkmark when it's published

### Step 5: Make It Appear on Your Website

**Option A: Automatic (Vercel Auto-Deploy)**
- If your Vercel is set to auto-deploy on changes, wait 2-3 minutes
- Your post will appear automatically

**Option B: Manual Trigger (If needed)**
1. Go to your Vercel dashboard
2. Click "Redeploy" on your latest deployment
3. Wait 2-3 minutes for the build to complete

**Option C: Via Terminal (Alternative)**
```bash
cd "/Users/diana/Documents/Diana - Personal Website"
git commit --allow-empty -m "Trigger rebuild for new blog post"
git push
```

---

## That's It! 🎉

Your blog post will appear at:
- **Resources page**: https://diana-lee.com/resources
- **Blog page**: https://diana-lee.com/blog
- **Individual post**: https://diana-lee.com/blog/[your-slug]

---

## Tips

✅ **DO:**
- Write clear, engaging titles
- Fill in the excerpt (shows on listing pages)
- Choose the correct language
- Publish when ready (saves as draft automatically)

❌ **DON'T:**
- Leave slug empty (always click "Generate")
- Forget to fill "Published At" date
- Leave excerpt empty

---

## Need to Edit a Post?

1. Go to https://dianalee.sanity.studio
2. Click "Blog Posts"
3. Find your post and click to edit
4. Make changes
5. Click "Publish" again
6. Trigger a redeploy (see Step 5 above)

---

## Troubleshooting

**Post not showing on website?**
- Check if it's published (not draft) in Sanity Studio
- Trigger a manual redeploy on Vercel
- Wait 2-3 minutes for build to complete
- Clear your browser cache

**Can't access Sanity Studio?**
- Make sure you're logged in
- URL is: https://dianalee.sanity.studio (not localhost)

---

## Alternative: Markdown Files (Advanced)

If you prefer writing in markdown:
1. Create a file in `blog-content/` folder
2. Follow the template in `blog-content/TEMPLATE.md`
3. Filename format: `01-your-title.md` (or `zh-01-your-title.md` for Chinese)
4. Push to GitHub to deploy

**Note:** Sanity Studio is recommended - it's easier and has a nice editor!

---

**Last Updated**: February 2026
