import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: string;
  publishedAt: string;
}

const postsDirectory = path.join(process.cwd(), 'blog-content');

function parseMarkdown(content: string) {
  const lines = content.split('\n');
  let title = '';
  let category = '';
  let readingTime = '';
  let excerpt = '';
  let contentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
    } else if (line.startsWith('**Category:**')) {
      category = line.replace('**Category:**', '').trim();
    } else if (line.startsWith('**Reading Time:**')) {
      readingTime = line.replace('**Reading Time:**', '').trim();
    } else if (line.startsWith('**Excerpt:**')) {
      excerpt = line.replace('**Excerpt:**', '').trim();
    } else if (line.startsWith('---') && i > 5) {
      contentStart = i + 1;
      break;
    }
  }

  const mainContent = lines.slice(contentStart).join('\n');

  return {
    title,
    category,
    readingTime,
    excerpt,
    content: mainContent
  };
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md') && !fileName.startsWith('README'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { title, category, readingTime, excerpt, content } = parseMarkdown(fileContents);

      // Extract number from filename for date ordering (01, 02, etc.)
      const fileNumber = parseInt(fileName.split('-')[0]);
      // Create dates from Dec 2024 onwards, newest first
      const publishedAt = new Date(2024, 11, 31 - fileNumber).toISOString();

      return {
        slug,
        title,
        category,
        readingTime,
        excerpt,
        content,
        publishedAt
      };
    });

  return posts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { title, category, readingTime, excerpt, content } = parseMarkdown(fileContents);

    const fileNumber = parseInt(slug.split('-')[0]);
    const publishedAt = new Date(2024, 11, 31 - fileNumber).toISOString();

    return {
      slug,
      title,
      category,
      readingTime,
      excerpt,
      content,
      publishedAt
    };
  } catch {
    return null;
  }
}
