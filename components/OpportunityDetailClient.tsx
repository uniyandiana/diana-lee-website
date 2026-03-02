'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { PortableText } from '@portabletext/react';
import Link from "next/link";

interface Opportunity {
  _id: string;
  title: string;
  slug: any;
  description: any;
  url: string;
  type: string;
  region: string;
  tags: string[];
  deadline: string;
  dateLabel: string;
  language: string;
  featured: boolean;
}

interface OpportunityDetailClientProps {
  opportunity: Opportunity;
}

export default function OpportunityDetailClient({ opportunity }: OpportunityDetailClientProps) {
  const { t, language } = useLanguage();

  const deadline = new Date(opportunity.deadline);
  const isExpired = deadline < new Date();
  const regionEmoji = opportunity.region === 'hk' ? '🇭🇰' : opportunity.region === 'uk' ? '🇬🇧' : '🌍';

  // Get region name from translations
  const regionName = t(`opportunities.regions.${opportunity.region}`) || opportunity.region;

  // Get type name from translations
  const typeName = t(`opportunities.types.${opportunity.type}`) || opportunity.type;

  // Format date based on language
  const dateLocale = language === 'zh' ? 'zh-HK' : 'en-GB';
  const formattedDate = deadline.toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: language === 'zh' ? 'numeric' : 'long',
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
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-4xl">
          <div className="mb-6">
            <Link
              href="/opportunities"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2 mb-4"
            >
              {t('opportunities.detail.backToOpportunities')}
            </Link>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="inline-block px-3 py-1 bg-[#5A9AB4] text-white text-sm font-semibold rounded-full">
              {regionEmoji} {regionName}
            </span>
            <span className="inline-block px-3 py-1 bg-[#F7F9F9] text-[#6b7280] text-sm font-semibold rounded-full">
              {typeName}
            </span>
            {isExpired && (
              <span className="inline-block px-3 py-1 bg-[#E0E0E0] text-[#757575] text-sm font-semibold rounded-full">
                {t('opportunities.labels.expired')}
              </span>
            )}
          </div>

          <h1 className="mb-2">{opportunity.title}</h1>

          {/* Language Indicator */}
          {opportunity.language === 'en' && (
            <p className="text-sm text-[#6b7280] mb-4">{t('opportunities.labels.inEnglishOnly')}</p>
          )}
          {opportunity.language === 'zh' && (
            <p className="text-sm text-[#6b7280] mb-4">{t('opportunities.labels.inChineseOnly')}</p>
          )}
          {opportunity.language === 'both' && <div className="mb-4"></div>}

          <div className="flex items-center gap-4 text-[#6b7280] text-sm mb-4">
            <span>
              {opportunity.dateLabel === 'event'
                ? t('opportunities.labels.eventDate')
                : t('opportunities.labels.deadline')}{' '}
              <strong className={isExpired ? 'text-[#6b7280]' : 'text-[#5A9AB4]'}>
                {formattedDate}
              </strong>
            </span>
          </div>

          {/* Tags */}
          {opportunity.tags && opportunity.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {opportunity.tags.map((tag: string) => (
                <span key={tag} className="text-sm px-3 py-1 bg-white text-[#6b7280] rounded-full border border-[#E6EAEA]">
                  {getTagName(tag)}
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
              <h3 className="text-2xl font-bold mb-4 text-[#1f2937]">
                {t('opportunities.detail.readyToApply')}
              </h3>
              <p className="text-[#6b7280] mb-6">
                {t('opportunities.detail.visitWebsiteDesc')}
              </p>
              <a
                href={opportunity.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#5A9AB4] text-white font-semibold rounded-lg hover:bg-[#3E7C92] transition-colors"
              >
                {t('opportunities.detail.visitWebsite')}
              </a>
            </div>
          )}

          {isExpired && (
            <div className="mt-12 p-8 bg-[#F7F9F9] rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#6b7280]">
                {t('opportunities.detail.expired')}
              </h3>
              <p className="text-[#6b7280] mb-6">
                {t('opportunities.detail.checkOthers')}
              </p>
              <Link
                href="/opportunities"
                className="inline-block px-8 py-3 bg-[#6b7280] text-white font-semibold rounded-lg hover:bg-[#4A4A4A] transition-colors"
              >
                {t('opportunities.detail.viewAllOpportunities')}
              </Link>
            </div>
          )}

          {/* Back to Opportunities */}
          <div className="mt-12 text-center">
            <Link
              href="/opportunities"
              className="text-[#5A9AB4] hover:text-[#3E7C92] inline-flex items-center gap-2"
            >
              {t('opportunities.detail.backToAll')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
