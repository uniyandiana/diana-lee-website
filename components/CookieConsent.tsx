'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    // Initialize analytics or other cookies here if needed
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#E6EAEA] shadow-lg">
      <div className="container-custom py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#1f2937] mb-2">
              {language === 'zh' ? '我們使用 Cookies' : 'We Use Cookies'}
            </h3>
            <p className="text-sm text-[#6b7280]">
              {language === 'zh'
                ? '本網站使用必要的 cookies 以確保網站正常運作。我們不使用追蹤或分析 cookies。詳情請參閱我們的'
                : 'This website uses essential cookies to ensure the site functions properly. We do not use tracking or analytics cookies. See our'
              }{' '}
              <Link
                href="/privacy"
                className="text-[#5A9AB4] hover:text-[#3E7C92] underline font-medium"
              >
                {language === 'zh' ? '私隱政策' : 'Privacy Policy'}
              </Link>
              {language === 'zh' ? '。' : '.'}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={declineCookies}
              className="px-6 py-2 border-2 border-[#E6EAEA] text-[#4A4A4A] rounded-lg hover:bg-[#F7F9F9] transition-all duration-300 font-medium"
            >
              {language === 'zh' ? '拒絕' : 'Decline'}
            </button>
            <button
              onClick={acceptCookies}
              className="px-6 py-2 bg-[#5A9AB4] text-white rounded-lg hover:bg-[#3E7C92] transition-all duration-300 font-medium"
            >
              {language === 'zh' ? '接受' : 'Accept'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
