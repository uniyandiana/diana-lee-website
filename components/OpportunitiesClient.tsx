'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

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

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <h1 className="mb-4">{t('opportunities.hero.title')}</h1>
          <p className="text-xl text-[#6b7280] max-w-3xl">
            {t('opportunities.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Active Opportunities */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-[#1f2937]">
            {t('opportunities.currentTitle')} ({activeOpportunities.length})
          </h2>

          {activeOpportunities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6b7280] text-lg">
                {t('opportunities.noOpportunities')}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity._id} opportunity={opportunity} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Previous Opportunities */}
      {expiredOpportunities.length > 0 && (
        <section className="section-padding bg-[#F7F9F9]">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-[#6b7280]">
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
        <h3 className="text-lg font-bold mb-2 text-[#1f2937] line-clamp-2">
          {opportunity.title}
        </h3>

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
              {opportunity.type === 'event' || opportunity.type === 'workshop'
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
