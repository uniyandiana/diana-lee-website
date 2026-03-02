import { getAllBlogPosts, getBlogPost } from '@/lib/blog';
import { sanityFetch } from '@/lib/sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { PortableText } from '@portabletext/react';
import StructuredData from '@/components/StructuredData';

export async function generateStaticParams() {
  const markdownPosts = getAllBlogPosts();

  const sanityPosts = await sanityFetch({
    query: `*[_type == "blogPost"] { "slug": slug.current }`,
  });

  return [...markdownPosts, ...sanityPosts].map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Try markdown first
  let post = getBlogPost(slug);

  // If not found in markdown, try Sanity
  if (!post) {
    const sanityPosts = await sanityFetch({
      query: `*[_type == "blogPost" && slug.current == $slug][0] {
        _id, title, slug, category, excerpt, publishedAt, content, language
      }`,
      params: { slug },
    });

    if (sanityPosts) {
      post = {
        ...sanityPosts,
        slug: sanityPosts.slug?.current || slug,
        readingTime: '5 min',
        publishedAt: sanityPosts.publishedAt || new Date().toISOString(),
        content: sanityPosts.content || sanityPosts.excerpt || '',
      };
    }
  }

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

  // Try markdown first
  let post = getBlogPost(slug);
  let isMarkdown = true;

  // If not found in markdown, try Sanity
  if (!post) {
    const sanityPost = await sanityFetch({
      query: `*[_type == "blogPost" && slug.current == $slug][0] {
        _id, title, slug, category, excerpt, publishedAt, content, language
      }`,
      params: { slug },
    });

    if (sanityPost) {
      post = {
        ...sanityPost,
        slug: sanityPost.slug?.current || slug,
        readingTime: '5 min',
        publishedAt: sanityPost.publishedAt || new Date().toISOString(),
        content: sanityPost.content || sanityPost.excerpt || '',
      };
      isMarkdown = false;
    }
  }

  if (!post) {
    notFound();
  }

  // Structured data for blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Diana Lee',
      url: 'https://diana-lee.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Diana Lee',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://diana-lee.com/blog/${post.slug}`,
    },
  };

  return (
    <div>
      <StructuredData data={structuredData} />
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
            <span>{(() => {
              try {
                const date = new Date(post.publishedAt);
                if (isNaN(date.getTime())) {
                  return 'Recently published';
                }
                return date.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });
              } catch {
                return 'Recently published';
              }
            })()}</span>
            <span>•</span>
            <span>{post.readingTime || '5 min'}</span>
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
            {isMarkdown ? (
              <ReactMarkdown>
                {post.content as string}
              </ReactMarkdown>
            ) : (
              <PortableText
                value={post.content as any}
                components={{
                  block: {
                    normal: ({children}) => <p className="mb-6 leading-relaxed">{children}</p>,
                    h1: ({children}) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
                    h2: ({children}) => <h2 className="text-3xl font-bold mt-10 mb-5 text-[#3E7C92] border-b border-[#F7F9F9] pb-3">{children}</h2>,
                    h3: ({children}) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
                    h4: ({children}) => <h4 className="text-xl font-semibold mt-6 mb-3">{children}</h4>,
                  },
                  list: {
                    bullet: ({children}) => <ul className="my-6 ml-6 space-y-3 list-disc">{children}</ul>,
                    number: ({children}) => <ol className="my-6 ml-6 space-y-3 list-decimal">{children}</ol>,
                  },
                  listItem: {
                    bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
                    number: ({children}) => <li className="leading-relaxed">{children}</li>,
                  },
                  marks: {
                    strong: ({children}) => <strong className="font-semibold text-[#5A9AB4]">{children}</strong>,
                    em: ({children}) => <em className="italic">{children}</em>,
                    code: ({children}) => <code className="bg-[#F7F9F9] px-2 py-1 rounded text-sm font-mono">{children}</code>,
                    link: ({children, value}) => (
                      <a href={value?.href} className="text-[#5A9AB4] hover:text-[#3E7C92] underline" target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            )}
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
