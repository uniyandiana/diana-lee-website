'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function SearchBar({
  onSearch,
  placeholder,
  className = '',
  variant = 'default'
}: SearchBarProps) {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultPlaceholder = language === 'zh'
    ? '搜尋文章或資源...'
    : 'Search articles or resources...';

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full pl-10 pr-4 py-2 border border-[#E6EAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] focus:border-transparent text-sm"
          aria-label={language === 'zh' ? '搜尋' : 'Search'}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1f2937]"
            aria-label={language === 'zh' ? '清除搜尋' : 'Clear search'}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`relative transition-all ${isFocused ? 'scale-[1.02]' : ''}`}>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full pl-12 pr-12 py-4 border-2 border-[#E6EAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] focus:border-transparent text-base transition-all"
          aria-label={language === 'zh' ? '搜尋' : 'Search'}
        />

        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1f2937] transition-colors p-1"
            aria-label={language === 'zh' ? '清除搜尋' : 'Clear search'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}

        {/* Keyboard Shortcut Hint */}
        {!isFocused && !query && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-[#6b7280] pointer-events-none">
            <kbd className="px-2 py-1 bg-[#F7F9F9] border border-[#E6EAEA] rounded font-mono">
              {navigator.platform.indexOf('Mac') !== -1 ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="px-2 py-1 bg-[#F7F9F9] border border-[#E6EAEA] rounded font-mono">
              K
            </kbd>
          </div>
        )}
      </div>

      {/* Search Results Count */}
      {query && (
        <div className="mt-2 text-sm text-[#6b7280]" role="status" aria-live="polite">
          {language === 'zh' ? '正在搜尋 "' : 'Searching for "'}
          <strong className="text-[#1f2937]">{query}</strong>
          {language === 'zh' ? '"...' : '"...'}
        </div>
      )}
    </div>
  );
}
