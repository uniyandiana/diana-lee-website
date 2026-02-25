'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import BlogFilters from './BlogFilters';
import MobileFilterDrawer from './MobileFilterDrawer';

interface BlogPageClientProps {
  initialBlogPosts: any[];
}

export default function BlogPageClient({ initialBlogPosts }: BlogPageClientProps) {
  const [blogLanguage, setBlogLanguage] = useState<'en' | 'zh' | 'all'>('all');
  const [blogCategory, setBlogCategory] = useState('all');
  const [blogSearch, setBlogSearch] = useState('');

  const blogCategories = useMemo(
    () => [...new Set(initialBlogPosts.map((p) => p.category))],
    [initialBlogPosts]
  );

  const filteredBlogPosts = useMemo(() => {
    return initialBlogPosts.filter((post) => {
      const postLang = post.language || 'en';
      if (blogLanguage !== 'all' && postLang !== blogLanguage) return false;
      if (blogCategory !== 'all' && post.category !== blogCategory) return false;

      if (blogSearch) {
        const searchLower = blogSearch.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchLower);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesExcerpt) return false;
      }

      return true;
    });
  }, [initialBlogPosts, blogLanguage, blogCategory, blogSearch]);

  const hasActiveFilters =
    blogLanguage !== 'all' || blogCategory !== 'all' || blogSearch !== '';

  const clearFilters = () => {
    setBlogLanguage('all');
    setBlogCategory('all');
    setBlogSearch('');
  };

  const activeFilterCount = [
    blogLanguage !== 'all',
    blogCategory !== 'all',
    blogSearch !== '',
  ].filter(Boolean).length;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/resources"
            className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2 mb-4"
          >
            ← Back to Resources
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">All Blog Posts</h1>
              <p className="text-[#6b7280]">
                {filteredBlogPosts.length} {filteredBlogPosts.length === 1 ? 'post' : 'posts'}
                {hasActiveFilters && ' (filtered)'}
              </p>
            </div>

            {/* Language Toggle */}
            <LanguageToggle selectedLanguage={blogLanguage} onChange={setBlogLanguage} />
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="hidden lg:block mb-8">
          <BlogFilters
            categories={blogCategories}
            selectedCategory={blogCategory}
            onCategoryChange={setBlogCategory}
            searchText={blogSearch}
            onSearchChange={setBlogSearch}
            onClearAll={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer filterCount={activeFilterCount}>
          <BlogFilters
            categories={blogCategories}
            selectedCategory={blogCategory}
            onCategoryChange={setBlogCategory}
            searchText={blogSearch}
            onSearchChange={setBlogSearch}
            onClearAll={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </MobileFilterDrawer>

        {/* Blog Post Grid - Show ALL posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogPosts.length > 0 ? (
            filteredBlogPosts.map((post: any) => {
              const postSlug = post.slug?.current || post.slug;
              const postId = post._id || post.slug;
              const postLang = post.language || 'en';
              const langBadge = postLang === 'zh' ? '🇨🇳' : '🇬🇧';

              return (
                <Link key={postId} href={`/blog/${postSlug}`} className="group">
                  <article className="bg-[#FFFEFA] p-6 rounded-xl hover:shadow-md transition-all h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">{langBadge}</span>
                      <span className="text-xs text-[#5A9AB4] font-semibold">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-[#1f2937] group-hover:text-[#5A9AB4] transition-colors line-clamp-2 flex-grow">
                      {post.title}
                    </h3>
                    <p className="text-[#6b7280] text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs mt-auto">
                      <span className="text-[#6b7280]">
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          month: 'short',
                          year: 'numeric',
                        })}
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
            <div className="col-span-full text-center p-12 bg-[#F7F9F9] rounded-xl">
              <svg
                className="w-16 h-16 text-[#6b7280] mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-[#1f2937] mb-2">No posts found</h3>
              <p className="text-[#6b7280] mb-4">Try adjusting your filters to see more results.</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92]"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
