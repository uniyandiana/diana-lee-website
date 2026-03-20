import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'ywiwrrdp',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// Simple markdown parser
function parseMarkdown(content) {
  const lines = content.split('\n')
  let title = ''
  let category = ''
  let readingTime = ''
  let excerpt = ''
  let contentStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('# ')) title = line.substring(2).trim()
    else if (line.startsWith('**Category:**')) category = line.replace('**Category:**', '').trim()
    else if (line.startsWith('**Reading Time:**')) readingTime = line.replace('**Reading Time:**', '').trim()
    else if (line.startsWith('**Excerpt:**')) excerpt = line.replace('**Excerpt:**', '').trim()
    else if (line.startsWith('---') && i > 5) { contentStart = i + 1; break }
  }

  const bodyLines = lines.slice(contentStart)
  return { title, category, readingTime, excerpt, body: bodyLines.join('\n') }
}

// Convert markdown text to Portable Text blocks
function markdownToBlocks(markdown) {
  const blocks = []
  const paragraphs = markdown.split(/\n\n+/)

  for (const para of paragraphs) {
    const trimmed = para.trim()
    if (!trimmed) continue

    // Heading 2
    if (trimmed.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h2',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: trimmed.slice(3).trim(), marks: [] }],
        markDefs: [],
      })
      continue
    }

    // Heading 3
    if (trimmed.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'h3',
        children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: trimmed.slice(4).trim(), marks: [] }],
        markDefs: [],
      })
      continue
    }

    // Bullet list
    const listLines = trimmed.split('\n').filter(l => l.match(/^[-*] /))
    if (listLines.length > 0 && listLines.length === trimmed.split('\n').filter(l => l.trim()).length) {
      for (const item of listLines) {
        blocks.push({
          _type: 'block',
          _key: Math.random().toString(36).slice(2),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: [{ _type: 'span', _key: Math.random().toString(36).slice(2), text: item.replace(/^[-*] /, '').trim(), marks: [] }],
          markDefs: [],
        })
      }
      continue
    }

    // Normal paragraph — handle **bold** inline
    const children = []
    const markDefs = []
    let remaining = trimmed.replace(/\n/g, ' ')
    const boldRegex = /\*\*(.+?)\*\*/g
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(remaining)) !== null) {
      if (match.index > lastIndex) {
        children.push({ _type: 'span', _key: Math.random().toString(36).slice(2), text: remaining.slice(lastIndex, match.index), marks: [] })
      }
      children.push({ _type: 'span', _key: Math.random().toString(36).slice(2), text: match[1], marks: ['strong'] })
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < remaining.length) {
      children.push({ _type: 'span', _key: Math.random().toString(36).slice(2), text: remaining.slice(lastIndex), marks: [] })
    }

    if (children.length > 0) {
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).slice(2),
        style: 'normal',
        children,
        markDefs,
      })
    }
  }

  return blocks
}

// Map category text to Sanity value
function mapCategory(categoryText) {
  const text = categoryText.toLowerCase()
  if (text.includes('career')) return 'career'
  if (text.includes('entrepreneur')) return 'entrepreneurship'
  if (text.includes('growth') || text.includes('personal')) return 'growth'
  if (text.includes('facilitat')) return 'facilitation'
  return 'career'
}

async function migrate() {
  const postsDir = path.join(__dirname, '..', 'blog-content')
  const files = fs.readdirSync(postsDir)
    .filter(f => f.endsWith('.md') && !f.startsWith('README') && !f.startsWith('TEMPLATE'))

  console.log(`Found ${files.length} blog post files to migrate\n`)

  for (const file of files) {
    const isZh = file.startsWith('zh-')
    const slug = file.replace(/\.md$/, '')
    const parts = slug.split('-')
    const fileNumber = parseInt(isZh ? parts[1] : parts[0])
    const day = isNaN(fileNumber) ? 1 : Math.max(1, Math.min(28, fileNumber))
    const publishedAt = new Date(2024, 11, day).toISOString()

    const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const { title, category, excerpt, body } = parseMarkdown(rawContent)

    if (!title) { console.log(`⏭️  Skipping (no title): ${file}`); continue }

    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "blogPost" && slug.current == $slug][0]._id`,
      { slug }
    )
    if (existing) { console.log(`⏭️  Skipping (exists): ${title}`); continue }

    const doc = {
      _type: 'blogPost',
      title,
      slug: { _type: 'slug', current: slug },
      category: mapCategory(category),
      excerpt: excerpt.slice(0, 200),
      content: markdownToBlocks(body),
      publishedAt,
      featured: false,
      language: isZh ? 'zh' : 'en',
    }

    try {
      await client.create(doc)
      console.log(`✅ Created: ${title}`)
    } catch (err) {
      console.error(`❌ Failed: ${title} — ${err.message}`)
    }
  }

  console.log('\nDone!')
}

migrate()
