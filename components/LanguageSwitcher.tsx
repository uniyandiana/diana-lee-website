'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`font-medium transition-colors ${
          language === 'en'
            ? 'text-[#5A9AB4]'
            : 'text-[#6b7280] hover:text-[#1f2937]'
        }`}
      >
        EN
      </button>
      <span className="text-[#6b7280]">/</span>
      <button
        onClick={() => setLanguage('zh')}
        className={`font-medium transition-colors ${
          language === 'zh'
            ? 'text-[#5A9AB4]'
            : 'text-[#6b7280] hover:text-[#1f2937]'
        }`}
      >
        繁中
      </button>
    </div>
  );
}
