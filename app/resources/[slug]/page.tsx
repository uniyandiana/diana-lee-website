import { sanityFetch } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

// Hardcoded resources as fallback (until migrated to Sanity)
const hardcodedResources: Record<string, any> = {
  'career-clarity-workbook': {
    title: 'Career Clarity Workbook',
    type: 'pdf',
    category: 'career',
    description: 'A comprehensive self-reflection guide to identify your values, strengths, and ideal career direction.',
    downloadLink: '/resources/01-career-clarity-workbook.pdf',
  },
  'entrepreneurial-readiness-self-assessment': {
    title: 'Entrepreneurial Readiness Self-Assessment',
    type: 'pdf',
    category: 'entrepreneurship',
    description: '150-point evaluation across 6 key areas to determine if you\'re ready to start a business.',
    downloadLink: '/resources/02-entrepreneurial-readiness-self-assessment.pdf',
  },
  '90-day-career-transition-roadmap': {
    title: '90-Day Career Transition Roadmap',
    type: 'pdf',
    category: 'career',
    description: 'Month-by-month action plan with specific tasks, metrics, and milestones for career transitions.',
    downloadLink: '/resources/03-90-day-career-transition-roadmap.pdf',
  },
  'values-strengths-discovery-guide': {
    title: 'Values & Strengths Discovery Guide',
    type: 'pdf',
    category: 'career',
    description: 'Practical exercises to identify your core values and natural strengths for better career alignment.',
    downloadLink: '/resources/04-values-and-strengths-discovery-guide.pdf',
  },
  'startup-idea-validation-checklist': {
    title: 'Startup Idea Validation Checklist',
    type: 'pdf',
    category: 'entrepreneurship',
    description: '15-checkpoint framework to validate your startup idea before investing time and money in building.',
    downloadLink: '/resources/05-startup-idea-validation-checklist.pdf',
  },
}

const categoryLabels: Record<string, string> = {
  career: 'Career Development',
  entrepreneurship: 'Entrepreneurship',
  facilitation: 'Facilitation',
}

const typeLabels: Record<string, string> = {
  pdf: 'PDF Guide',
  template: 'Template',
  article: 'Article',
  video: 'Video',
  tool: 'Tool',
}

async function getResource(slug: string) {
  // Try Sanity first
  const sanityResource = await sanityFetch({
    query: `*[_type == "resource" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      type,
      category,
      description,
      externalLink,
      "fileUrl": file.asset->url,
    }`,
    params: { slug },
  })

  if (sanityResource) return { ...sanityResource, source: 'sanity' }

  // Fall back to hardcoded
  if (hardcodedResources[slug]) return { ...hardcodedResources[slug], slug, source: 'static' }

  return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const resource = await getResource(slug)
  if (!resource) return { title: 'Resource Not Found | Diana Lee' }
  return {
    title: `${resource.title} | Diana Lee`,
    description: resource.description,
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const resource = await getResource(slug)
  if (!resource) notFound()

  const downloadUrl = resource.downloadLink || resource.fileUrl || resource.externalLink
  const isDownload = !!(resource.downloadLink || resource.fileUrl)
  const typeLabel = typeLabels[resource.type] || resource.type
  const categoryLabel = categoryLabels[resource.category] || resource.category

  return (
    <main className="min-h-screen bg-[#FAF5EC]">
      {/* Hero */}
      <section className="bg-[#C9F0EF] py-12 md:py-16">
        <div className="container-custom max-w-3xl">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-[#21B3B1] font-medium hover:text-[#168E8C] mb-6 transition-colors"
          >
            ← Back to Resources
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-white text-[#21B3B1] text-xs font-semibold rounded-full">
              {typeLabel}
            </span>
            <span className="px-3 py-1 bg-white text-[#4A4A4A] text-xs font-semibold rounded-full">
              {categoryLabel}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1f2937] mb-4">{resource.title}</h1>
          <p className="text-[#4A4A4A] text-lg leading-relaxed">{resource.description}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-[#21B3B1] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isDownload ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                )}
              </svg>
              <h2 className="text-2xl font-bold text-[#1f2937] mb-2">
                {isDownload ? 'Download this resource' : 'Access this resource'}
              </h2>
              <p className="text-[#6b7280]">
                {isDownload
                  ? 'Free to download — no sign-up required.'
                  : 'Click below to access this resource.'}
              </p>
            </div>

            {downloadUrl ? (
              <a
                href={downloadUrl}
                download={isDownload || undefined}
                target={isDownload ? undefined : '_blank'}
                rel={isDownload ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#21B3B1] text-white font-semibold rounded-full hover:bg-[#168E8C] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isDownload ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  )}
                </svg>
                {isDownload ? 'Download Free' : 'Open Resource'}
              </a>
            ) : (
              <p className="text-[#6b7280]">Link coming soon.</p>
            )}
          </div>

          {/* Divider + CTA */}
          <div className="mt-10 text-center">
            <p className="text-[#4A4A4A] mb-4">Want personalised support with your career or startup?</p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#21B3B1] text-[#21B3B1] font-semibold rounded-full hover:bg-[#21B3B1] hover:text-white transition-colors"
            >
              See Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
