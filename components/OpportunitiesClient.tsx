'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import OpportunityFilters from './OpportunityFilters';

interface Opportunity {
  _id: string;
  title: string;
  slug: any;
  description: any; // Block content from Sanity
  url: string;
  type: string;
  region: string;
  tags: string[];
  deadline: string;
  dateLabel: string;
  language: string;
  featured: boolean;
}

interface OpportunitiesClientProps {
  activeOpportunities: Opportunity[];
  expiredOpportunities: Opportunity[];
}

export default function OpportunitiesClient({
  activeOpportunities,
  expiredOpportunities
}: OpportunitiesClientProps) {
  const { t } = useLanguage();

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Check if filters are active
  const hasActiveFilters = searchQuery !== '' || selectedRegion !== 'all' || selectedType !== 'all' || selectedTags.length > 0;

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedType('all');
    setSelectedTags([]);
  };

  // Filter opportunities
  const filteredActiveOpportunities = useMemo(() => {
    return activeOpportunities.filter(opp => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = opp.title.toLowerCase().includes(searchLower);
        const descriptionText = opp.description?.[0]?.children?.[0]?.text || '';
        const descriptionMatch = descriptionText.toLowerCase().includes(searchLower);
        if (!titleMatch && !descriptionMatch) return false;
      }

      // Region filter
      if (selectedRegion !== 'all' && opp.region !== selectedRegion) return false;

      // Type filter
      if (selectedType !== 'all' && opp.type !== selectedType) return false;

      // Tags filter (if any selected tags, opportunity must have at least one matching tag)
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some(tag => opp.tags?.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [activeOpportunities, searchQuery, selectedRegion, selectedType, selectedTags]);

  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <h1 className="mb-3">{t('opportunities.hero.title')}</h1>
          <p className="text-lg md:text-xl text-[#6b7280] max-w-3xl">
            {t('opportunities.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Filters & Active Opportunities */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container-custom max-w-6xl">
          {/* Filters */}
          <div className="mb-6">
            <OpportunityFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Results Header */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1f2937]">
            {t('opportunities.currentTitle')} ({filteredActiveOpportunities.length})
          </h2>

          {filteredActiveOpportunities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6b7280] text-lg">
                {hasActiveFilters
                  ? t('opportunities.filters.noResults')
                  : t('opportunities.noOpportunities')
                }
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[#5A9AB4] hover:text-[#3E7C92] font-medium"
                >
                  {t('opportunities.filters.clearAll')}
                </button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActiveOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity._id} opportunity={opportunity} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Previous Opportunities */}
      {!hasActiveFilters && expiredOpportunities.length > 0 && (
        <section className="py-8 md:py-12 bg-[#F7F9F9]">
          <div className="container-custom max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#6b7280]">
              {t('opportunities.previousTitle')} ({expiredOpportunities.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
              {expiredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity._id} opportunity={opportunity} expired />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Opportunity Card Component
function OpportunityCard({ opportunity, expired = false }: { opportunity: Opportunity; expired?: boolean }) {
  const { t, language } = useLanguage();
  const regionEmoji = opportunity.region === 'hk' ? '🇭🇰' : opportunity.region === 'uk' ? '🇬🇧' : '🌍';
  const deadline = new Date(opportunity.deadline);
  const isUpcoming = deadline.getTime() - new Date().getTime() < 14 * 24 * 60 * 60 * 1000; // 14 days

  // Get region name from translations
  const regionName = t(`opportunities.regions.${opportunity.region}`) || opportunity.region;

  // Get type name from translations
  const typeName = t(`opportunities.types.${opportunity.type}`) || opportunity.type;

  // Format date based on language
  const dateLocale = language === 'zh' ? 'zh-HK' : 'en-GB';
  const formattedDate = deadline.toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: language === 'zh' ? 'numeric' : 'short',
    year: 'numeric'
  });

  // Get tag translation
  const getTagName = (tag: string) => {
    const translated = t(`opportunities.tags.${tag}`);
    // If translation not found, fallback to capitalized version
    return translated !== `opportunities.tags.${tag}`
      ? translated
      : tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ');
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-[#E6EAEA] overflow-hidden ${expired ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-sm font-medium text-[#5A9AB4]">
            {regionEmoji} {regionName}
          </span>
          <span className="inline-block px-2 py-1 bg-[#F7F9F9] text-[#6b7280] text-xs font-semibold rounded">
            {typeName}
          </span>
          {!expired && isUpcoming && (
            <span className="inline-block px-2 py-1 bg-[#FFF3E0] text-[#F2994A] text-xs font-semibold rounded">
              {t('opportunities.labels.endingSoon')}
            </span>
          )}
          {expired && (
            <span className="inline-block px-2 py-1 bg-[#E0E0E0] text-[#757575] text-xs font-semibold rounded">
              {t('opportunities.labels.expired')}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-1 text-[#1f2937] line-clamp-2">
          {opportunity.title}
        </h3>

        {/* Language Indicator */}
        {opportunity.language === 'en' && (
          <p className="text-xs text-[#6b7280] mb-2">{t('opportunities.labels.inEnglishOnly')}</p>
        )}
        {opportunity.language === 'zh' && (
          <p className="text-xs text-[#6b7280] mb-2">{t('opportunities.labels.inChineseOnly')}</p>
        )}
        {opportunity.language === 'both' && <div className="mb-2"></div>}

        {/* Description */}
        <div className="text-[#6b7280] text-sm mb-4 line-clamp-3">
          <PortableText
            value={opportunity.description}
            components={{
              block: {
                normal: ({ children }) => <span className="inline">{children} </span>,
                h2: ({ children }) => <strong className="font-bold text-base inline">{children} </strong>,
                h3: ({ children }) => <strong className="font-semibold inline">{children} </strong>,
              },
              list: {
                bullet: ({ children }) => <ul className="list-disc ml-4 inline">{children}</ul>,
                number: ({ children }) => <ol className="list-decimal ml-4 inline">{children}</ol>,
              },
              listItem: {
                bullet: ({ children }) => <li className="inline">{children}</li>,
                number: ({ children }) => <li className="inline">{children}</li>,
              },
              marks: {
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                link: ({ children, value }) => (
                  <a
                    href={value?.href}
                    className="text-[#5A9AB4] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {children}
                  </a>
                ),
              },
            }}
          />
        </div>

        {/* Tags */}
        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {opportunity.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-[#F7F9F9] text-[#6b7280] rounded">
                {getTagName(tag)}
              </span>
            ))}
            {opportunity.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-[#F7F9F9] text-[#6b7280] rounded">
                +{opportunity.tags.length - 3} {t('opportunities.labels.more')}
              </span>
            )}
          </div>
        )}

        {/* Deadline */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-[#6b7280]">
              {opportunity.dateLabel === 'event'
                ? t('opportunities.labels.eventDate')
                : t('opportunities.labels.deadline')}
            </span>
            <span className={`ml-2 font-semibold ${expired ? 'text-[#6b7280]' : 'text-[#5A9AB4]'}`}>
              {formattedDate}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={expired ? '#' : `/opportunities/${opportunity.slug?.current || opportunity.slug}`}
          className={`block w-full text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
            expired
              ? 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed pointer-events-none'
              : 'bg-white border-2 border-[#5A9AB4] text-[#5A9AB4] hover:bg-[#5A9AB4] hover:text-white'
          }`}
        >
          {expired ? t('opportunities.labels.expired') : t('opportunities.labels.learnMore')}
        </Link>
      </div>
    </div>
  );
}
