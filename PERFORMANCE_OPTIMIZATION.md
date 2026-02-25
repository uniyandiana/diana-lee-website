# Performance Optimization Guide

This document outlines the performance optimizations implemented for the Diana Lee website.

## Image Optimization

### Next.js Image Configuration
The website uses Next.js's built-in Image component with the following optimizations:

- **Modern Formats**: Automatically serves images in AVIF and WebP formats for browsers that support them
- **Responsive Sizes**: Configured device sizes for optimal image loading on different screen sizes
- **Quality Settings**: Balanced quality (85% for hero images, 75% default) for smaller file sizes
- **Cache TTL**: Images cached for 1 year for better performance

### Large Images Identified (Pre-Optimization)
The following large images should be manually compressed using tools like TinyPNG, ImageOptim, or Squoosh:

| Image | Current Size | Location | Priority |
|-------|-------------|----------|----------|
| Lecture on Social Innovation.jpg | 4.3MB | /public/images/ | High |
| Lego play with students.jpg | 3.6MB | /public/images/ | High |
| Social Innovation Lecture.jpg | 3.4MB | /public/images/ | High |
| HKUST Entrepreneurship Competition.png | 3.2MB | /public/images/ | High |
| Diana Lee - Professional Portrait.jpg | 3.1MB | /public/images/ | High - Hero image |
| LVF Dream Plan Stage Speech Mic.png | 2.9MB | /public/images/ | Medium |
| Diana Lee - Oxford University.JPG | 2.2MB | /public/images/ | Medium |
| Diana - All Souls Library.png | 2.0MB | /public/images/ | High - Hero image |

**Recommendation**: Compress these images to ~200-500KB each without noticeable quality loss.

### Loading Strategies Implemented

#### Priority Loading (Above the Fold)
- Home page hero image: `priority` flag enabled
- About page hero image: `priority` flag enabled
- These load immediately for better LCP (Largest Contentful Paint)

#### Lazy Loading (Below the Fold)
- Service page images: `loading="lazy"`
- Exposure gallery images: `loading="lazy"`
- Blog post images: `loading="lazy"` (where applicable)

#### Responsive Sizes
All images now use the `sizes` attribute for optimal responsive loading:

```tsx
// Hero images
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"

// Service cards
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"

// Gallery thumbnails
sizes="320px"
```

## Component Optimizations

### Skeleton Loaders
Created reusable skeleton loader components in `/components/SkeletonLoader.tsx`:

- `SkeletonLoader`: Base component with variants (text, circular, rectangular)
- `BlogCardSkeleton`: Skeleton for blog post cards
- `ServiceCardSkeleton`: Skeleton for service cards
- `HeroImageSkeleton`: Skeleton for hero images

**Usage Example**:
```tsx
import { BlogCardSkeleton } from '@/components/SkeletonLoader';

{isLoading ? <BlogCardSkeleton /> : <BlogCard {...post} />}
```

## Next.js Configuration Optimizations

### Image Settings (`next.config.js`)
```javascript
images: {
  formats: ['image/avif', 'image/webp'],  // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 365,  // 1 year cache
}
```

### Performance Settings
- **Compression**: Enabled gzip/brotli compression
- **React Strict Mode**: Enabled for better development experience
- **Powered-By Header**: Removed for security and performance

## Running Performance Audits

### Using Chrome DevTools Lighthouse

1. **Open DevTools**
   - Press `F12` or right-click → Inspect
   - Go to "Lighthouse" tab

2. **Configure Audit**
   - Select "Performance" category
   - Choose "Desktop" or "Mobile"
   - Click "Analyze page load"

3. **Target Scores**
   - Performance: 90+ (Green)
   - Accessibility: 90+ (Green)
   - Best Practices: 90+ (Green)
   - SEO: 90+ (Green)

### Using PageSpeed Insights
Visit: https://pagespeed.web.dev/
Enter your deployed URL and analyze.

### Key Metrics to Monitor

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4s | > 4s |
| **FID** (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **FCP** (First Contentful Paint) | < 1.8s | 1.8s - 3s | > 3s |
| **TTI** (Time to Interactive) | < 3.8s | 3.8s - 7.3s | > 7.3s |

## Further Optimization Opportunities

### Immediate Actions
1. **Compress Large Images**: Use TinyPNG or ImageOptim to reduce file sizes by 60-80%
2. **Convert to WebP**: Manually convert PNG images to WebP format
3. **Add Blur Placeholders**: Generate blur data URLs for hero images

### Future Enhancements
1. **Implement CDN**: Use Vercel's Edge Network or Cloudflare CDN
2. **Add Service Worker**: Implement offline support and caching
3. **Code Splitting**: Lazy load heavy components (Instagram feed, modals)
4. **Font Optimization**: Use `font-display: swap` for custom fonts
5. **Analytics**: Implement web vitals monitoring

### Image Compression Tools

**Online Tools**:
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Multiple formats, WebP conversion
- [ImageOptim](https://imageoptim.com/) - Mac app for batch compression

**Command Line**:
```bash
# Install sharp-cli for batch optimization
npm install -g sharp-cli

# Optimize all images in a directory
sharp -i public/images/*.jpg -o public/images-optimized/ -f webp -q 80
```

## Monitoring Performance

### Development
```bash
npm run build
npm run start
```

Then run Lighthouse in DevTools.

### Production
After deployment, use:
- Google PageSpeed Insights
- WebPageTest.org
- GTmetrix

### Set up Monitoring
Consider implementing:
- Google Analytics 4 with Web Vitals
- Sentry Performance Monitoring
- Vercel Analytics (if deployed on Vercel)

## Performance Checklist

- [x] Optimize Next.js Image component configuration
- [x] Implement lazy loading for below-the-fold images
- [x] Add priority loading for hero images
- [x] Create skeleton loaders for better perceived performance
- [x] Configure responsive image sizes
- [x] Enable compression in Next.js config
- [ ] Compress large image files (manual step required)
- [ ] Convert PNG images to WebP (optional, manual step)
- [ ] Run Lighthouse audit on production site
- [ ] Monitor Core Web Vitals after deployment
- [ ] Set up performance monitoring dashboard

## Expected Improvements

After implementing these optimizations, you should see:

- **20-40% reduction** in initial page load time
- **50-70% reduction** in image file sizes (after manual compression)
- **Better LCP scores** due to optimized hero images
- **Improved CLS scores** with skeleton loaders
- **Faster Time to Interactive** with lazy loading

---

Last Updated: February 2026
