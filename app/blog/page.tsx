import { sanityFetch } from "@/lib/sanity";
import { getAllBlogPosts } from "@/lib/blog";
import BlogPageClient from "@/components/BlogPageClient";

export const metadata = {
  title: "Blog | Diana Lee",
  description: "Insights and reflections on career development, entrepreneurship, and personal growth.",
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function BlogPage() {
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

  return (
    <div>
      <BlogPageClient initialBlogPosts={blogPosts} />
    </div>
  );
}
