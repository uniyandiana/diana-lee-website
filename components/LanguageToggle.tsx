'use client';

interface LanguageToggleProps {
  selectedLanguage: 'en' | 'zh' | 'all';
  onChange: (language: 'en' | 'zh' | 'all') => void;
}

export default function LanguageToggle({ selectedLanguage, onChange }: LanguageToggleProps) {
  const options = [
    { value: 'all' as const, label: 'All' },
    { value: 'en' as const, label: 'EN' },
    { value: 'zh' as const, label: '繁中' },
  ];

  return (
    <div className="inline-flex bg-[#F7F9F9] rounded-lg p-1">
      {options.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedLanguage === value
              ? 'bg-white text-[#5A9AB4] shadow-sm'
              : 'text-[#6b7280] hover:text-[#1f2937]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
