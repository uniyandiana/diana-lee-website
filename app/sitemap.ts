import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { sanityFetch } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://diana-lee.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/opportunities`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Get markdown blog posts
  const markdownPosts = getAllBlogPosts();

  // Get Sanity blog posts
  const sanityBlogPosts = await sanityFetch({
    query: `*[_type == "blogPost"] {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }`,
  });

  // Combine and create blog post URLs
  const blogPosts = [...markdownPosts, ...sanityBlogPosts].map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || post._updatedAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Get opportunities
  const opportunities = await sanityFetch({
    query: `*[_type == "opportunity"] {
      "slug": slug.current,
      deadline,
      _updatedAt
    }`,
  });

  // Create opportunity URLs
  const opportunityPages = opportunities.map((opp: any) => ({
    url: `${baseUrl}/opportunities/${opp.slug}`,
    lastModified: new Date(opp._updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPosts, ...opportunityPages];
}
