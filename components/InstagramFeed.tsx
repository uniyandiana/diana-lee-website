'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function InstagramFeed() {
  const { language } = useLanguage();

  // Use different Instagram accounts based on language
  const instagramAccount = language === 'zh' ? 'diana.to.inspire' : 'diana.career';
  const instagramUrl = `https://www.instagram.com/${instagramAccount}/`;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="mb-4">
            {language === 'zh' ? '最新分享' : 'Latest Updates'}
          </h2>
          <p className="text-[#6b7280]">
            {language === 'zh'
              ? '在 Instagram 上關注更多職涯發展和創業的內容'
              : 'Follow on Instagram for more insights on career development and entrepreneurship'}
          </p>
        </div>

        {/* Instagram Embed */}
        <div className="bg-gradient-to-br from-[#FFFEFA] to-[#F7F9F9] p-8 rounded-2xl">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 text-[#5A9AB4]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <h3 className="text-2xl font-bold text-[#1f2937]">@{instagramAccount}</h3>
            </div>

            <p className="text-[#6b7280] text-center max-w-2xl">
              {language === 'zh'
                ? '分享職涯規劃、創業思維和社會創新的見解與經驗'
                : 'Sharing insights on career development, entrepreneurial thinking, and social innovation'}
            </p>

            {/* CTA Button */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E1306C] via-[#C13584] to-[#833AB4] text-white rounded-xl hover:opacity-90 transition-opacity font-semibold shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              {language === 'zh' ? '在 Instagram 上關注' : 'Follow on Instagram'}
            </a>

            {/* Note about content */}
            <p className="text-sm text-[#6b7280] italic">
              {language === 'zh'
                ? '* 查看最新貼文和故事，了解更多職涯和創業內容'
                : '* Visit Instagram to see the latest posts and stories'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
