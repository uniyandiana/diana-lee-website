import { getAllBlogPosts, getBlogPost } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    };
  }

  return {
    title: `${post.title} | Diana Lee`,
    description: post.excerpt,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <Link
              href="/resources"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2 mb-4"
            >
              ← Back to Resources
            </Link>
          </div>

          <span className="inline-block px-3 py-1 bg-[#5A9AB4] text-white text-sm font-semibold rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-[#6b7280] text-sm">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <article className="prose prose-lg max-w-none
            prose-headings:text-[#1f2937]
            prose-h2:text-[#3E7C92] prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#F7F9F9] prose-h2:pb-3
            prose-h3:text-[#1f2937] prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#1f2937] prose-p:leading-relaxed prose-p:mb-4
            prose-strong:text-[#5A9AB4] prose-strong:font-semibold
            prose-a:text-[#5A9AB4] prose-a:no-underline hover:prose-a:text-[#3E7C92]
            prose-ul:my-4 prose-ul:list-disc
            prose-ol:my-4 prose-ol:list-decimal
            prose-li:text-[#1f2937] prose-li:my-2
            prose-table:border-collapse prose-table:w-full prose-table:my-6
            prose-th:bg-[#F7F9F9] prose-th:text-[#5A9AB4] prose-th:font-semibold prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-[#E6EAEA]
            prose-td:p-3 prose-td:border prose-td:border-[#E6EAEA]
            prose-hr:border-[#F7F9F9] prose-hr:my-8
            prose-blockquote:border-l-4 prose-blockquote:border-[#5A9AB4] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[#6b7280]
          ">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </article>

          {/* CTA */}
          <div className="mt-16 p-8 bg-[#F7F9F9] rounded-xl text-center">
            <h3 className="text-2xl font-bold mb-4 text-[#1f2937]">Ready to take the next step?</h3>
            <p className="text-[#6b7280] mb-6">
              Book a session to get personalised support for your career or startup journey
            </p>
            <Link
              href="/services"
              className="btn-primary inline-block"
            >
              Explore Services
            </Link>
          </div>

          {/* Back to Resources */}
          <div className="mt-12 text-center">
            <Link
              href="/resources"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2"
            >
              ← Back to all resources
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
