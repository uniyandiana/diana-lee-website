import { sanityFetch } from "@/lib/sanity";
import { getAllBlogPosts } from "@/lib/blog";
import ResourcesHero from "@/components/ResourcesHero";
import InstagramFeed from "@/components/InstagramFeed";
import ResourcesClient from "@/components/ResourcesClient";

export const metadata = {
  title: "Resources & Blog | Diana Lee",
  description: "Free resources, insights, and tools for career development and entrepreneurship.",
};

export default async function Resources() {
  // Fetch blog posts from markdown files
  const markdownPosts = getAllBlogPosts();

  // Fetch blog posts from Sanity
  const sanityBlogPosts = await sanityFetch({
    query: `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      excerpt,
      publishedAt,
      _createdAt,
      language
    }`,
  });

  // Process Sanity posts to ensure valid dates and required fields
  const processedSanityPosts = sanityBlogPosts
    .filter((post: any) => {
      // Skip posts without required fields
      return post.title && (post.slug?.current || post.slug || post._id);
    })
    .map((post: any) => {
      // Validate and fix publishedAt
      let validPublishedAt;
      try {
        const date = new Date(post.publishedAt || post._createdAt || new Date());
        validPublishedAt = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
      } catch {
        validPublishedAt = new Date().toISOString();
      }

      return {
        ...post,
        publishedAt: validPublishedAt,
        slug: post.slug?.current || post.slug || post._id,
        readingTime: '5 min',
        content: post.excerpt || '',
      };
    });

  // Combine markdown and Sanity blog posts, then sort by date (newest first)
  const blogPosts = [...markdownPosts, ...processedSanityPosts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Fetch resources from Sanity
  const sanityResources = await sanityFetch({
    query: `*[_type == "resource"] | order(_createdAt desc) {
      _id,
      title,
      type,
      category,
      description,
      file,
      externalLink
    }`,
  });

  // Free downloadable resources (hardcoded)
  const freeResources = [
    {
      _id: "career-clarity-workbook",
      title: "Career Clarity Workbook",
      type: "Workbook",
      category: "Career Development",
      description: "A comprehensive self-reflection guide to identify your values, strengths, and ideal career direction.",
      downloadLink: "/resources/01-career-clarity-workbook.pdf"
    },
    {
      _id: "entrepreneurial-readiness",
      title: "Entrepreneurial Readiness Self-Assessment",
      type: "Assessment",
      category: "Entrepreneurship",
      description: "150-point evaluation across 6 key areas to determine if you're ready to start a business.",
      downloadLink: "/resources/02-entrepreneurial-readiness-self-assessment.pdf"
    },
    {
      _id: "90-day-transition-roadmap",
      title: "90-Day Career Transition Roadmap",
      type: "Roadmap",
      category: "Career Development",
      description: "Month-by-month action plan with specific tasks, metrics, and milestones for career transitions.",
      downloadLink: "/resources/03-90-day-career-transition-roadmap.pdf"
    },
    {
      _id: "values-strengths-guide",
      title: "Values & Strengths Discovery Guide",
      type: "Guide",
      category: "Self-Discovery",
      description: "Practical exercises to identify your core values and natural strengths for better career alignment.",
      downloadLink: "/resources/04-values-and-strengths-discovery-guide.pdf"
    },
    {
      _id: "startup-validation-checklist",
      title: "Startup Idea Validation Checklist",
      type: "Checklist",
      category: "Entrepreneurship",
      description: "15-checkpoint framework to validate your startup idea before investing time and money in building.",
      downloadLink: "/resources/05-startup-idea-validation-checklist.pdf"
    }
  ];

  // Combine free resources with Sanity resources
  const resources = [...freeResources, ...sanityResources];

  return (
    <div>
      <ResourcesHero />
      <ResourcesClient initialBlogPosts={blogPosts} initialResources={resources} />
      <InstagramFeed />
    </div>
  );
}
