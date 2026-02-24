# Diana Lee - Personal Website

A professional website for Diana Lee, Career Development Facilitator, Enterprise Educator, and Social Innovator.

## Features

- **Modern Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom terracotta color palette
- **Responsive design** optimized for all devices
- **SEO optimized** with metadata
- **Blog system** ready for CMS integration
- **Contact form** for inquiries
- **Services showcase** with detailed offerings
- **Workshops & Courses** listings
- **Past Experiences** portfolio

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)
- **CMS:** Sanity.io (to be configured)

## Color Palette

- **Primary (Refined Teal):** `#5A9AB4` - Main brand color, buttons, accents
- **Secondary (Light Ivory):** `#F7F9F9` - Secondary backgrounds, cards
- **Accent (Deep Teal):** `#3E7C92` - Hover states, highlights
- **Background (Ivory White):** `#FFFEFA` - Page backgrounds
- **Text Primary:** `#1f2937` - Main body text
- **Text Secondary:** `#6b7280` - Meta text, captions

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd diana-personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
diana-personal-website/
├── app/                  # Next.js App Router pages
│   ├── about/           # About page
│   ├── blog/            # Blog listing and posts
│   ├── contact/         # Contact form
│   ├── courses/         # Courses page
│   ├── experiences/     # Past experiences showcase
│   ├── resources/       # Resources page
│   ├── services/        # Services page
│   ├── workshops/       # Workshops page
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/          # Reusable components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── public/              # Static assets
│   └── images/         # Images
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Pages

1. **Home** (`/`) - Hero section, services overview, CTA
2. **About** (`/about`) - Biography, professional highlights, philosophy
3. **Services** (`/services`) - All 5 service offerings detailed
4. **Workshops** (`/workshops`) - Upcoming and past workshops
5. **Courses** (`/courses`) - Cohort programmes and courses
6. **Past Experiences** (`/experiences`) - Portfolio showcase
7. **Resources** (`/resources`) - Free guides and tools
8. **Blog** (`/blog`) - Blog posts and insights
9. **Contact** (`/contact`) - Contact form and information

## Next Steps

### CMS Integration (Sanity.io)

To add content management capabilities:

1. Install Sanity:
```bash
npm install next-sanity @sanity/image-url
```

2. Set up Sanity Studio in a separate `/studio` directory
3. Configure content schemas for:
   - Blog posts
   - Workshops
   - Courses
   - Resources
   - Past experiences

4. Connect Next.js to Sanity using the Sanity client

### Deployment

#### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

#### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## Contact Form Integration

The contact form is currently a client-side component. To make it functional:

1. **Option A: Email Service (EmailJS, SendGrid)**
   - Create account with service
   - Add API credentials to `.env.local`
   - Update form handler in `app/contact/page.tsx`

2. **Option B: API Route**
   - Create API route in `app/api/contact/route.ts`
   - Use Nodemailer or similar to send emails
   - Update form to POST to API route

## Environment Variables

Create a `.env.local` file for:

```env
# Sanity CMS (when configured)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Email Service (optional)
EMAIL_SERVICE_API_KEY=your_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id
```

## Customization

### Colors

Update colors in `tailwind.config.ts`:
```typescript
colors: {
  primary: "#D97757",
  secondary: "#E8C4A0",
  // ...
}
```

### Content

All content is currently hardcoded in page files. Replace with CMS data once Sanity is configured.

### Fonts

Currently using Inter font from Google Fonts. Change in `app/layout.tsx`.

## License

Private - All rights reserved

## Author

Diana Lee
- LinkedIn: [ltwdiana](https://www.linkedin.com/in/ltwdiana/)
- Instagram: [@diana.to.inspire](https://www.instagram.com/diana.to.inspire/) | [@diana.career](https://www.instagram.com/diana.career/)
- Email: dianalee852@gmail.com
