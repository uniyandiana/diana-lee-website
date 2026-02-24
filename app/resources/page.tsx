import Link from "next/link";
import { sanityFetch } from "@/lib/sanity";
import { getAllBlogPosts } from "@/lib/blog";
import ResourcesHero from "@/components/ResourcesHero";

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
      publishedAt
    }`,
  });

  // Combine markdown and Sanity blog posts
  const blogPosts = [...markdownPosts, ...sanityBlogPosts];

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
      {/* Hero */}
      <ResourcesHero />

      {/* Blog Posts */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Latest Insights</h2>
            {blogPosts.length > 4 && (
              <Link href="/blog" className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] inline-flex items-center gap-1">
                View All
                <span>→</span>
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.length > 0 ? (
              blogPosts.slice(0, 4).map((post: any) => {
                const postSlug = post.slug?.current || post.slug;
                const postId = post._id || post.slug;
                return (
                  <Link key={postId} href={`/blog/${postSlug}`} className="group">
                    <article className="bg-[#FFFEFA] p-6 rounded-xl hover:shadow-md transition-all h-full">
                      <span className="text-xs text-[#5A9AB4] font-semibold">{post.category}</span>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-[#1f2937] group-hover:text-[#5A9AB4] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[#6b7280] text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6b7280]">
                          {new Date(post.publishedAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                        </span>
                        <span className="text-[#5A9AB4] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                          Read →
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-2 text-center p-12 bg-[#F7F9F9] rounded-xl">
                <p className="text-[#6b7280]">No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-[#FFFEFA]">
        <div className="container-custom max-w-5xl">
          <h2 className="mb-8">Free Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.length > 0 ? (
              resources.map((resource: any) => (
                <div key={resource._id} className="bg-white p-6 rounded-xl border border-[#F7F9F9] hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#F7F9F9] text-[#5A9AB4] text-xs font-semibold rounded-full mb-3">
                    {resource.type}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-[#1f2937]">{resource.title}</h3>
                  <p className="text-sm text-[#6b7280] mb-4">{resource.description}</p>
                  <a
                    href={resource.downloadLink || resource.externalLink || '#'}
                    download={resource.downloadLink ? true : undefined}
                    target={resource.downloadLink ? undefined : "_blank"}
                    rel={resource.downloadLink ? undefined : "noopener noreferrer"}
                    className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] transition-colors text-sm inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center p-12 bg-white rounded-xl border border-[#F7F9F9]">
                <p className="text-[#6b7280]">No resources yet. Check back soon!</p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#6b7280]">
              Looking for something specific?{" "}
              <Link href="/contact" className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92]">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
