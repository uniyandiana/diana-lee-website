'use client';

interface BlogFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export default function BlogFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  searchText,
  onSearchChange,
  onClearAll,
  hasActiveFilters,
}: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-[#E6EAEA] rounded-lg focus:outline-none focus:border-[#5A9AB4] text-[#1f2937]"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-[#5A9AB4] text-white'
              : 'bg-[#F7F9F9] text-[#6b7280] hover:bg-[#E6EAEA]'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-[#5A9AB4] text-white'
                : 'bg-[#F7F9F9] text-[#6b7280] hover:bg-[#E6EAEA]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="text-sm text-[#5A9AB4] hover:text-[#3E7C92] font-medium"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
