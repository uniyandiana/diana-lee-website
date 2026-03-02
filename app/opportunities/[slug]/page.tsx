import { sanityFetch } from "@/lib/sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText } from '@portabletext/react';
import StructuredData from '@/components/StructuredData';

export async function generateStaticParams() {
  const opportunities = await sanityFetch({
    query: `*[_type == "opportunity"] { "slug": slug.current }`,
  });

  return opportunities.map((opp: any) => ({
    slug: opp.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const opportunity = await sanityFetch({
    query: `*[_type == "opportunity" && slug.current == $slug][0] {
      title, description, type, region
    }`,
    params: { slug },
  });

  if (!opportunity) {
    return {
      title: 'Opportunity Not Found',
    };
  }

  return {
    title: `${opportunity.title} | Diana Lee`,
    description: opportunity.description?.[0]?.children?.[0]?.text || 'Opportunity details',
  };
}

export default async function OpportunityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const opportunity = await sanityFetch({
    query: `*[_type == "opportunity" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      url,
      type,
      region,
      tags,
      deadline,
      language,
      featured
    }`,
    params: { slug },
  });

  if (!opportunity) {
    notFound();
  }

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();
  const regionEmoji = opportunity.region === 'hk' ? '🇭🇰' : opportunity.region === 'uk' ? '🇬🇧' : '🌍';
  const regionName = opportunity.region === 'hk' ? 'Hong Kong' : opportunity.region === 'uk' ? 'UK' : 'International';

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: opportunity.title,
    description: opportunity.description?.[0]?.children?.[0]?.text || '',
    startDate: opportunity.deadline,
    location: {
      '@type': 'Place',
      name: regionName,
    },
    organizer: {
      '@type': 'Person',
      name: 'Diana Lee',
      url: 'https://diana-lee.com',
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
              href="/opportunities"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2 mb-4"
            >
              ← Back to Opportunities
            </Link>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-block px-3 py-1 bg-[#5A9AB4] text-white text-sm font-semibold rounded-full">
              {regionEmoji} {regionName}
            </span>
            <span className="inline-block px-3 py-1 bg-[#F7F9F9] text-[#6b7280] text-sm font-semibold rounded-full">
              {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
            </span>
            {isExpired && (
              <span className="inline-block px-3 py-1 bg-[#E0E0E0] text-[#757575] text-sm font-semibold rounded-full">
                Expired
              </span>
            )}
          </div>

          <h1 className="mb-4">{opportunity.title}</h1>

          <div className="flex items-center gap-4 text-[#6b7280] text-sm mb-4">
            <span>
              {opportunity.type === 'event' || opportunity.type === 'workshop' ? 'Event Date:' : 'Deadline:'}{' '}
              <strong className={isExpired ? 'text-[#6b7280]' : 'text-[#5A9AB4]'}>
                {deadline.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </strong>
            </span>
          </div>

          {/* Tags */}
          {opportunity.tags && opportunity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span key={tag} className="text-sm px-3 py-1 bg-white text-[#6b7280] rounded-full border border-[#E6EAEA]">
                  {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
                </span>
              ))}
            </div>
          )}
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
          ">
            <PortableText
              value={opportunity.description}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
                  h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-5 text-[#3E7C92] border-b border-[#F7F9F9] pb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
                },
                list: {
                  bullet: ({ children }) => <ul className="my-6 ml-6 space-y-3 list-disc">{children}</ul>,
                  number: ({ children }) => <ol className="my-6 ml-6 space-y-3 list-decimal">{children}</ol>,
                },
                listItem: {
                  bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
                  number: ({ children }) => <li className="leading-relaxed">{children}</li>,
                },
                marks: {
                  strong: ({ children }) => <strong className="font-semibold text-[#5A9AB4]">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                  link: ({ children, value }) => (
                    <a href={value?.href} className="text-[#5A9AB4] hover:text-[#3E7C92] underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                },
              }}
            />
          </article>

          {/* CTA to External Site */}
          {!isExpired && (
            <div className="mt-12 p-8 bg-[#F7F9F9] rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#1f2937]">Ready to apply?</h3>
              <p className="text-[#6b7280] mb-6">
                Visit the official website to learn more and submit your application
              </p>
              <a
                href={opportunity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#5A9AB4] text-white font-semibold rounded-lg hover:bg-[#3E7C92] transition-colors"
              >
                Visit Official Website →
              </a>
            </div>
          )}

          {isExpired && (
            <div className="mt-12 p-8 bg-[#F7F9F9] rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#6b7280]">This opportunity has expired</h3>
              <p className="text-[#6b7280] mb-6">
                Check out other current opportunities
              </p>
              <Link
                href="/opportunities"
                className="inline-block px-8 py-3 bg-[#6b7280] text-white font-semibold rounded-lg hover:bg-[#4A4A4A] transition-colors"
              >
                View All Opportunities
              </Link>
            </div>
          )}

          {/* Back to Opportunities */}
          <div className="mt-12 text-center">
            <Link
              href="/opportunities"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2"
            >
              ← Back to all opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
