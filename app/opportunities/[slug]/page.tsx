import { sanityFetch } from "@/lib/sanity";
import { notFound } from "next/navigation";
import StructuredData from '@/components/StructuredData';
import OpportunityDetailClient from '@/components/OpportunityDetailClient';

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
      dateLabel,
      language,
      featured
    }`,
    params: { slug },
  });

  if (!opportunity) {
    notFound();
  }

  // Structured data for SEO
  const regionName = opportunity.region === 'hk' ? 'Hong Kong' : opportunity.region === 'uk' ? 'UK' : 'International';

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
      <OpportunityDetailClient opportunity={opportunity} />
    </div>
  );
}
