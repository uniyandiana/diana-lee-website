import { sanityFetch } from "@/lib/sanity";
import Link from "next/link";

export const metadata = {
  title: "Opportunities | Diana Lee",
  description: "Curated opportunities for career development, entrepreneurship, and personal growth - events, competitions, grants, and resources across Hong Kong, UK, and internationally.",
};

export default async function Opportunities() {
  // Fetch all opportunities from Sanity
  const allOpportunities = await sanityFetch({
    query: `*[_type == "opportunity"] | order(deadline asc) {
      _id,
      title,
      slug,
      description,
      url,
      type,
      region,
      tags,
      deadline,
      language,
      featured
    }`,
  });

  // Separate active and expired opportunities
  const now = new Date();
  const activeOpportunities = allOpportunities.filter((opp: any) =>
    new Date(opp.deadline) >= now
  );
  const expiredOpportunities = allOpportunities.filter((opp: any) =>
    new Date(opp.deadline) < now
  );

  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <h1 className="mb-4">Opportunities</h1>
          <p className="text-xl text-[#6b7280] max-w-3xl">
            Curated opportunities for your career and entrepreneurship journey. Events, competitions, grants, and resources across Hong Kong, UK, and beyond.
          </p>
        </div>
      </section>

      {/* Active Opportunities */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl font-bold mb-8 text-[#1f2937]">
            Current Opportunities ({activeOpportunities.length})
          </h2>

          {activeOpportunities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#6b7280] text-lg">
                No active opportunities at the moment. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOpportunities.map((opportunity: any) => (
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
              Previous Opportunities ({expiredOpportunities.length})
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
              {expiredOpportunities.map((opportunity: any) => (
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
function OpportunityCard({ opportunity, expired = false }: { opportunity: any; expired?: boolean }) {
  const regionEmoji = opportunity.region === 'hk' ? '🇭🇰' : opportunity.region === 'uk' ? '🇬🇧' : '🌍';
  const deadline = new Date(opportunity.deadline);
  const isUpcoming = deadline.getTime() - new Date().getTime() < 14 * 24 * 60 * 60 * 1000; // 14 days

  return (
    <div className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-[#E6EAEA] overflow-hidden ${expired ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-sm font-medium text-[#5A9AB4]">
            {regionEmoji} {opportunity.region === 'hk' ? 'Hong Kong' : opportunity.region === 'uk' ? 'UK' : 'International'}
          </span>
          <span className="inline-block px-2 py-1 bg-[#F7F9F9] text-[#6b7280] text-xs font-semibold rounded">
            {opportunity.type}
          </span>
          {!expired && isUpcoming && (
            <span className="inline-block px-2 py-1 bg-[#FFF3E0] text-[#F2994A] text-xs font-semibold rounded">
              Ending Soon
            </span>
          )}
          {expired && (
            <span className="inline-block px-2 py-1 bg-[#E0E0E0] text-[#757575] text-xs font-semibold rounded">
              Expired
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-[#1f2937] line-clamp-2">
          {opportunity.title}
        </h3>

        {/* Description */}
        <p className="text-[#6b7280] text-sm mb-4 line-clamp-3">
          {opportunity.description}
        </p>

        {/* Tags */}
        {opportunity.tags && opportunity.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {opportunity.tags.slice(0, 3).map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-1 bg-[#F7F9F9] text-[#6b7280] rounded">
                {tag.charAt(0).toUpperCase() + tag.slice(1).replace('-', ' ')}
              </span>
            ))}
            {opportunity.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-[#F7F9F9] text-[#6b7280] rounded">
                +{opportunity.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Deadline */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-[#6b7280]">
              {opportunity.type === 'event' || opportunity.type === 'workshop' ? 'Event Date:' : 'Deadline:'}
            </span>
            <span className={`ml-2 font-semibold ${expired ? 'text-[#6b7280]' : 'text-[#5A9AB4]'}`}>
              {deadline.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={opportunity.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
            expired
              ? 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed'
              : 'bg-white border-2 border-[#5A9AB4] text-[#5A9AB4] hover:bg-[#5A9AB4] hover:text-white'
          }`}
          {...(expired && { onClick: (e) => e.preventDefault() })}
        >
          {expired ? 'Expired' : 'Learn More →'}
        </a>
      </div>
    </div>
  );
}
