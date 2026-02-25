'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import LanguageToggle from './LanguageToggle';
import BlogFilters from './BlogFilters';
import ResourceFilters from './ResourceFilters';
import MobileFilterDrawer from './MobileFilterDrawer';

interface ResourcesClientProps {
  initialBlogPosts: any[];
  initialResources: any[];
}

export default function ResourcesClient({
  initialBlogPosts,
  initialResources,
}: ResourcesClientProps) {
  // Blog filter state
  const [blogLanguage, setBlogLanguage] = useState<'en' | 'zh' | 'all'>('all');
  const [blogCategory, setBlogCategory] = useState('all');
  const [blogSearch, setBlogSearch] = useState('');

  // Resource filter state
  const [resourceType, setResourceType] = useState('all');
  const [resourceCategory, setResourceCategory] = useState('all');
  const [resourceSearch, setResourceSearch] = useState('');

  // Extract unique categories and types
  const blogCategories = useMemo(
    () => [...new Set(initialBlogPosts.map((p) => p.category))],
    [initialBlogPosts]
  );

  const resourceTypes = useMemo(
    () => [...new Set(initialResources.map((r) => r.type))],
    [initialResources]
  );

  const resourceCategories = useMemo(
    () => [...new Set(initialResources.map((r) => r.category))],
    [initialResources]
  );

  // Filter blog posts
  const filteredBlogPosts = useMemo(() => {
    return initialBlogPosts.filter((post) => {
      // Language filter
      const postLang = post.language || 'en';
      if (blogLanguage !== 'all' && postLang !== blogLanguage) return false;

      // Category filter
      if (blogCategory !== 'all' && post.category !== blogCategory) return false;

      // Search filter
      if (blogSearch) {
        const searchLower = blogSearch.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchLower);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesExcerpt) return false;
      }

      return true;
    });
  }, [initialBlogPosts, blogLanguage, blogCategory, blogSearch]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return initialResources.filter((resource) => {
      // Type filter
      if (resourceType !== 'all' && resource.type !== resourceType) return false;

      // Category filter
      if (resourceCategory !== 'all' && resource.category !== resourceCategory) return false;

      // Search filter
      if (resourceSearch) {
        const searchLower = resourceSearch.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(searchLower);
        const matchesDesc = resource.description?.toLowerCase().includes(searchLower);
        if (!matchesTitle && !matchesDesc) return false;
      }

      return true;
    });
  }, [initialResources, resourceType, resourceCategory, resourceSearch]);

  const blogHasActiveFilters =
    blogLanguage !== 'all' || blogCategory !== 'all' || blogSearch !== '';
  const resourceHasActiveFilters =
    resourceType !== 'all' || resourceCategory !== 'all' || resourceSearch !== '';

  const clearBlogFilters = () => {
    setBlogLanguage('all');
    setBlogCategory('all');
    setBlogSearch('');
  };

  const clearResourceFilters = () => {
    setResourceType('all');
    setResourceCategory('all');
    setResourceSearch('');
  };

  const blogActiveFilterCount = [
    blogLanguage !== 'all',
    blogCategory !== 'all',
    blogSearch !== '',
  ].filter(Boolean).length;

  const resourceActiveFilterCount = [
    resourceType !== 'all',
    resourceCategory !== 'all',
    resourceSearch !== '',
  ].filter(Boolean).length;

  return (
    <>
      {/* Blog Posts Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-3xl font-semibold">Latest Insights</h2>

            {/* Desktop: Language Toggle + View All */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageToggle selectedLanguage={blogLanguage} onChange={setBlogLanguage} />
              {filteredBlogPosts.length > 4 && (
                <Link
                  href="/blog"
                  className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] inline-flex items-center gap-1"
                >
                  View All
                  <span>→</span>
                </Link>
              )}
            </div>

            {/* Mobile: Language Toggle + View All */}
            <div className="lg:hidden w-full flex justify-between items-center">
              <LanguageToggle selectedLanguage={blogLanguage} onChange={setBlogLanguage} />
              {filteredBlogPosts.length > 4 && (
                <Link
                  href="/blog"
                  className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] inline-flex items-center gap-1 text-sm"
                >
                  View All →
                </Link>
              )}
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:block mb-6">
            <BlogFilters
              categories={blogCategories}
              selectedCategory={blogCategory}
              onCategoryChange={setBlogCategory}
              searchText={blogSearch}
              onSearchChange={setBlogSearch}
              onClearAll={clearBlogFilters}
              hasActiveFilters={blogHasActiveFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <MobileFilterDrawer filterCount={blogActiveFilterCount}>
            <BlogFilters
              categories={blogCategories}
              selectedCategory={blogCategory}
              onCategoryChange={setBlogCategory}
              searchText={blogSearch}
              onSearchChange={setBlogSearch}
              onClearAll={clearBlogFilters}
              hasActiveFilters={blogHasActiveFilters}
            />
          </MobileFilterDrawer>

          {/* Blog Post Grid - Show top 4 only */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogPosts.length > 0 ? (
              filteredBlogPosts.slice(0, 4).map((post: any) => {
                const postSlug = post.slug?.current || post.slug;
                const postId = post._id || post.slug;
                const postLang = post.language || 'en';
                const langBadge = postLang === 'zh' ? '🇭🇰' : '🇬🇧';

                return (
                  <Link key={postId} href={`/blog/${postSlug}`} className="group">
                    <article className="bg-[#FFFEFA] p-6 rounded-xl hover:shadow-md transition-all h-full">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs">{langBadge}</span>
                        <span className="text-xs text-[#5A9AB4] font-semibold">{post.category}</span>
                      </div>
                      <h3 className="text-xl font-bold mt-2 mb-2 text-[#1f2937] group-hover:text-[#5A9AB4] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[#6b7280] text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs">
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
              <div className="col-span-2 text-center p-12 bg-[#F7F9F9] rounded-xl">
                <p className="text-[#6b7280]">No blog posts found matching your filters.</p>
                {blogHasActiveFilters && (
                  <button
                    onClick={clearBlogFilters}
                    className="mt-4 text-[#5A9AB4] font-semibold hover:text-[#3E7C92]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section-padding bg-[#FFFEFA]">
        <div className="container-custom max-w-5xl">
          <h2 className="mb-6">Free Resources</h2>

          {/* Desktop Filters */}
          <div className="hidden lg:block mb-6">
            <ResourceFilters
              types={resourceTypes}
              categories={resourceCategories}
              selectedType={resourceType}
              selectedCategory={resourceCategory}
              searchText={resourceSearch}
              onTypeChange={setResourceType}
              onCategoryChange={setResourceCategory}
              onSearchChange={setResourceSearch}
              onClearAll={clearResourceFilters}
              hasActiveFilters={resourceHasActiveFilters}
            />
          </div>

          {/* Mobile Filter Drawer for Resources */}
          <div className="lg:hidden mb-6">
            <MobileFilterDrawer filterCount={resourceActiveFilterCount}>
              <ResourceFilters
                types={resourceTypes}
                categories={resourceCategories}
                selectedType={resourceType}
                selectedCategory={resourceCategory}
                searchText={resourceSearch}
                onTypeChange={setResourceType}
                onCategoryChange={setResourceCategory}
                onSearchChange={setResourceSearch}
                onClearAll={clearResourceFilters}
                hasActiveFilters={resourceHasActiveFilters}
              />
            </MobileFilterDrawer>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource: any) => (
                <div
                  key={resource._id}
                  className="bg-white p-6 rounded-xl border border-[#F7F9F9] hover:shadow-md transition-shadow"
                >
                  <span className="inline-block px-3 py-1 bg-[#F7F9F9] text-[#5A9AB4] text-xs font-semibold rounded-full mb-3">
                    {resource.type}
                  </span>
                  <h3 className="text-lg font-bold mb-2 text-[#1f2937]">{resource.title}</h3>
                  <p className="text-sm text-[#6b7280] mb-4">{resource.description}</p>
                  <a
                    href={resource.downloadLink || resource.externalLink || '#'}
                    download={resource.downloadLink ? true : undefined}
                    target={resource.downloadLink ? undefined : '_blank'}
                    rel={resource.downloadLink ? undefined : 'noopener noreferrer'}
                    className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] transition-colors text-sm inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center p-12 bg-white rounded-xl border border-[#F7F9F9]">
                <p className="text-[#6b7280]">No resources found matching your filters.</p>
                {resourceHasActiveFilters && (
                  <button
                    onClick={clearResourceFilters}
                    className="mt-4 text-[#5A9AB4] font-semibold hover:text-[#3E7C92]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#6b7280]">
              Looking for something specific?{' '}
              <Link href="/contact" className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92]">
                Get in touch
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
