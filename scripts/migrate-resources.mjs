import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ywiwrrdp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const resources = [
  {
    _type: 'resource',
    title: 'Career Clarity Workbook',
    slug: { _type: 'slug', current: 'career-clarity-workbook' },
    type: 'pdf',
    category: 'career',
    description: 'A comprehensive self-reflection guide to identify your values, strengths, and ideal career direction.',
    downloadPath: '/resources/01-career-clarity-workbook.pdf',
    featured: true,
  },
  {
    _type: 'resource',
    title: 'Entrepreneurial Readiness Self-Assessment',
    slug: { _type: 'slug', current: 'entrepreneurial-readiness-self-assessment' },
    type: 'pdf',
    category: 'entrepreneurship',
    description: '150-point evaluation across 6 key areas to determine if you\'re ready to start a business.',
    downloadPath: '/resources/02-entrepreneurial-readiness-self-assessment.pdf',
    featured: true,
  },
  {
    _type: 'resource',
    title: '90-Day Career Transition Roadmap',
    slug: { _type: 'slug', current: '90-day-career-transition-roadmap' },
    type: 'pdf',
    category: 'career',
    description: 'Month-by-month action plan with specific tasks, metrics, and milestones for career transitions.',
    downloadPath: '/resources/03-90-day-career-transition-roadmap.pdf',
    featured: true,
  },
  {
    _type: 'resource',
    title: 'Values & Strengths Discovery Guide',
    slug: { _type: 'slug', current: 'values-strengths-discovery-guide' },
    type: 'pdf',
    category: 'career',
    description: 'Practical exercises to identify your core values and natural strengths for better career alignment.',
    downloadPath: '/resources/04-values-and-strengths-discovery-guide.pdf',
    featured: true,
  },
  {
    _type: 'resource',
    title: 'Startup Idea Validation Checklist',
    slug: { _type: 'slug', current: 'startup-idea-validation-checklist' },
    type: 'pdf',
    category: 'entrepreneurship',
    description: '15-checkpoint framework to validate your startup idea before investing time and money in building.',
    downloadPath: '/resources/05-startup-idea-validation-checklist.pdf',
    featured: true,
  },
]

async function migrate() {
  console.log('Migrating hardcoded resources to Sanity...\n')

  for (const resource of resources) {
    try {
      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "resource" && slug.current == $slug][0]._id`,
        { slug: resource.slug.current }
      )

      if (existing) {
        console.log(`⏭️  Skipping (already exists): ${resource.title}`)
        continue
      }

      const { downloadPath, ...doc } = resource
      // Store the download path as externalLink so it still works
      doc.externalLink = `https://diana-lee.com${downloadPath}`

      await client.create(doc)
      console.log(`✅ Created: ${resource.title}`)
    } catch (err) {
      console.error(`❌ Failed: ${resource.title}`, err.message)
    }
  }

  console.log('\nDone!')
}

migrate()
