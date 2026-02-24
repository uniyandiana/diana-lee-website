# How to Add Blog Posts to Sanity CMS

## Quick Start Guide

I've created 5 comprehensive blog posts ready to add to your Sanity CMS. Here's how:

### Step 1: Access Sanity Studio
1. Navigate to your Sanity Studio (usually at `localhost:3333` or your deployed studio URL)
2. Log in with your credentials

### Step 2: Create New Blog Post
1. Click "Blog Posts" in the sidebar
2. Click "Create new blog post"
3. Fill in the fields using the content from each markdown file

### Field Mapping

For each blog post file, map the content as follows:

| Sanity Field | Where to Find It in .md File |
|--------------|------------------------------|
| **Title** | The H1 heading at the top |
| **Slug** | Create from title (e.g., "career-clarity-when-feeling-lost") |
| **Category** | Listed after "Category:" |
| **Excerpt** | Listed after "Excerpt:" |
| **Content** | Everything after the `---` separator (the main body) |
| **Published At** | Set to today's date or schedule for future |
| **Author** | Your name (Diana Lee) |

### Step 3: Format the Content

When copying the main content into Sanity's rich text editor:

- **Headings:** Use H2 for main sections, H3 for subsections
- **Bold text:** Keep all **bold** formatting
- **Lists:** Bullet points and numbered lists should transfer directly
- **Tables:** You may need to format these manually depending on your Sanity schema
- **Links:** Convert markdown links `[text](url)` to rich text links

### Step 4: Add Metadata

For each post, also set:
- **SEO Title:** Same as post title
- **Meta Description:** Use the excerpt
- **Featured Image:** Add a relevant image if you have one
- **Tags:** career development, entrepreneurship, psychology, etc.

---

## Blog Post Summary

### Post 1: How to Find Career Clarity When You Feel Lost
**Category:** Career Development
**Best for:** Individuals feeling stuck or uncertain about career direction
**Key topics:** Self-awareness, exploration, decision frameworks

### Post 2: The Personality-Career Fit
**Category:** Career Development
**Best for:** People wondering why they're unfulfilled despite success
**Key topics:** Personality Dimensions®, work-life fit, sustainable success

### Post 3: From Idea to Impact: A Founder's First 90 Days
**Category:** Entrepreneurship
**Best for:** Aspiring founders and early-stage entrepreneurs
**Key topics:** Problem validation, MVP development, first customers

### Post 4: Career Transitions: Navigating Change with Confidence
**Category:** Career Development
**Best for:** Anyone facing voluntary or involuntary career change
**Key topics:** Transition psychology, skills mapping, strategic job search

### Post 5: The Myth of the Linear Career Path
**Category:** Career Development
**Best for:** People questioning traditional career progression
**Key topics:** Non-linear careers, portfolio careers, redefining success

---

## Publishing Schedule Suggestion

Consider spacing them out:
- **Week 1:** Post 1 (Career Clarity) - Foundation piece
- **Week 2:** Post 2 (Personality-Career Fit) - Builds on self-awareness
- **Week 3:** Post 3 (Founder's First 90 Days) - Entrepreneurship content
- **Week 4:** Post 4 (Career Transitions) - Practical guidance
- **Week 5:** Post 5 (Linear Career Myth) - Thought leadership

---

## Promotion Ideas

Once published:

**LinkedIn:**
- Share each post with a personal reflection
- Create a carousel summarising key points
- Tag relevant hashtags: #CareerDevelopment #Entrepreneurship #CareerClarity

**Instagram (@diana.career):**
- Create quote graphics from key insights
- Share "3 key takeaways" posts
- Use Stories to promote new posts

**Newsletter:**
- Send to your mailing list with a personal intro
- Include "3 things you'll learn" preview

**Communities:**
- Share in relevant LinkedIn/Facebook groups
- Post in career-focused Reddit communities (r/careerguidance, r/careeradvice)

---

## All blog posts are ready to go!
Check the `blog-content` folder for all 5 markdown files.
