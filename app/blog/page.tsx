import { sanityFetch } from "@/lib/sanity";
import { getAllBlogPosts } from "@/lib/blog";
import BlogPageClient from "@/components/BlogPageClient";

export const metadata = {
  title: "Blog | Diana Lee",
  description: "Insights and reflections on career development, entrepreneurship, and personal growth.",
};

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
      language
    }`,
  });

  // Combine markdown and Sanity blog posts
  const blogPosts = [...markdownPosts, ...sanityBlogPosts];

  return (
    <div>
      <BlogPageClient initialBlogPosts={blogPosts} />
    </div>
  );
}
