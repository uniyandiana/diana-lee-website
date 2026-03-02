'use client';

import { useLanguage } from "@/contexts/LanguageContext";

interface OpportunityFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export default function OpportunityFilters({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  selectedType,
  setSelectedType,
  selectedTags,
  setSelectedTags,
  onClearFilters,
  hasActiveFilters,
}: OpportunityFiltersProps) {
  const { t } = useLanguage();

  const regions = [
    { value: 'all', label: t('opportunities.filters.allRegions') || 'All Regions' },
    { value: 'hk', label: t('opportunities.regions.hk') },
    { value: 'uk', label: t('opportunities.regions.uk') },
    { value: 'international', label: t('opportunities.regions.international') },
  ];

  const types = [
    { value: 'all', label: t('opportunities.filters.allTypes') || 'All Types' },
    { value: 'event', label: t('opportunities.types.event') },
    { value: 'competition', label: t('opportunities.types.competition') },
    { value: 'grant', label: t('opportunities.types.grant') },
    { value: 'resource', label: t('opportunities.types.resource') },
    { value: 'workshop', label: t('opportunities.types.workshop') },
    { value: 'programme', label: t('opportunities.types.programme') },
  ];

  const availableTags = [
    { value: 'students', label: t('opportunities.tags.students') },
    { value: 'professionals', label: t('opportunities.tags.professionals') },
    { value: 'entrepreneurs', label: t('opportunities.tags.entrepreneurs') },
    { value: 'tech', label: t('opportunities.tags.tech') },
    { value: 'social-impact', label: t('opportunities.tags.social-impact') },
    { value: 'creative', label: t('opportunities.tags.creative') },
    { value: 'youth', label: t('opportunities.tags.youth') },
    { value: 'women', label: t('opportunities.tags.women') },
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder={t('opportunities.filters.searchPlaceholder') || 'Search opportunities...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 border border-[#E6EAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] focus:border-transparent"
        />
      </div>

      {/* Region Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
          {t('opportunities.filters.region') || 'Region'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region.value}
              onClick={() => setSelectedRegion(region.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedRegion === region.value
                  ? 'bg-[#5A9AB4] text-white'
                  : 'bg-[#F7F9F9] text-[#6b7280] hover:bg-[#E6EAEA]'
              }`}
            >
              {region.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
          {t('opportunities.filters.type') || 'Type'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <button
              key={type.value}
              onClick={() => setSelectedType(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedType === type.value
                  ? 'bg-[#5A9AB4] text-white'
                  : 'bg-[#F7F9F9] text-[#6b7280] hover:bg-[#E6EAEA]'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div>
        <h3 className="text-sm font-semibold text-[#1f2937] mb-2">
          {t('opportunities.filters.tags') || 'Tags'} {selectedTags.length > 0 && `(${selectedTags.length})`}
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag.value}
              onClick={() => toggleTag(tag.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedTags.includes(tag.value)
                  ? 'bg-[#5A9AB4] text-white'
                  : 'bg-[#F7F9F9] text-[#6b7280] hover:bg-[#E6EAEA]'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-[#E6EAEA]">
          <button
            onClick={onClearFilters}
            className="text-[#5A9AB4] hover:text-[#3E7C92] font-medium text-sm"
          >
            {t('opportunities.filters.clearAll') || 'Clear all filters'}
          </button>
        </div>
      )}
    </div>
  );
}
