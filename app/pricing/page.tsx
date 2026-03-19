'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

const pricingTiers = [
  {
    name: { en: 'Single Session', zh: '單次課程' },
    sessions: 1,
    hkd: 950,
    gbp: 90,
    perSession: { hkd: 950, gbp: 90 },
    highlight: false,
    badge: null,
    description: {
      en: 'Perfect for exploring if coaching is right for you, or tackling a specific challenge.',
      zh: '適合初次嘗試，或針對特定議題尋求突破。',
    },
    includes: {
      en: ['60-minute 1:1 session', 'Pre-session questionnaire', 'Session notes & action plan'],
      zh: ['60分鐘1對1課程', '課前問卷', '課後筆記及行動計劃'],
    },
  },
  {
    name: { en: '3-Session Pack', zh: '3堂套裝' },
    sessions: 3,
    hkd: 2700,
    gbp: 250,
    perSession: { hkd: 900, gbp: 83 },
    highlight: false,
    badge: { en: 'Save 5%', zh: '節省5%' },
    description: {
      en: 'Build momentum over three focused sessions with a clear goal and ongoing support.',
      zh: '透過三次有目標的課程，建立持續動力。',
    },
    includes: {
      en: ['3 × 60-minute 1:1 sessions', 'Pre-session questionnaire', 'Session notes & action plan', 'Email support between sessions'],
      zh: ['3 × 60分鐘1對1課程', '課前問卷', '課後筆記及行動計劃', '課堂之間電郵支援'],
    },
  },
  {
    name: { en: '6-Session Pack', zh: '6堂套裝' },
    sessions: 6,
    hkd: 5200,
    gbp: 480,
    perSession: { hkd: 867, gbp: 80 },
    highlight: true,
    badge: { en: 'Best Value', zh: '最超值' },
    description: {
      en: 'Deep, sustained transformation. Ideal for career transitions, startup journeys, or long-term goals.',
      zh: '深度持續的轉化，適合職涯轉換、創業旅程或長期目標。',
    },
    includes: {
      en: ['6 × 60-minute 1:1 sessions', 'Pre-session questionnaire', 'Session notes & action plan', 'Email support between sessions', 'Progress review mid-pack'],
      zh: ['6 × 60分鐘1對1課程', '課前問卷', '課後筆記及行動計劃', '課堂之間電郵支援', '中途進度回顧'],
    },
  },
];

const services = [
  {
    id: 'career',
    icon: '🧭',
    title: { en: '1:1 Career Facilitation', zh: '1對1職涯引導' },
    subtitle: { en: 'Navigate your career with clarity', zh: '清晰導航你的職涯方向' },
    description: {
      en: 'Whether you\'re exploring career options, navigating a transition, or seeking clarity on your professional direction — these sessions are designed around you.',
      zh: '無論你正在探索職涯選項、應對轉換期，還是尋求職業方向的清晰度，每一節課程都圍繞你的需求而設計。',
    },
    topics: {
      en: ['Career exploration & direction', 'Job search strategy & personal branding', 'Interview coaching & offer negotiation', 'Work-life integration & strengths discovery'],
      zh: ['職涯探索與方向規劃', '求職策略與個人品牌', '面試輔導與薪酬談判', '工作生活整合與優勢探索'],
    },
  },
  {
    id: 'startup',
    icon: '🚀',
    title: { en: '1:1 Startup Coaching', zh: '1對1創業輔導' },
    subtitle: { en: 'Build your venture with confidence', zh: '自信地建立你的事業' },
    description: {
      en: 'For founders and aspiring entrepreneurs who want structured thinking, accountability, and a sounding board to move their idea or business forward.',
      zh: '為創辦人及有志創業者提供結構化思考、問責機制，以及推進想法或業務的支援。',
    },
    topics: {
      en: ['Idea validation & business model clarity', 'Founder mindset & resilience', 'Ecosystem navigation & stakeholder strategy', 'Pitch preparation & storytelling'],
      zh: ['想法驗證與商業模式梳理', '創辦人心態與韌性建設', '生態系統導航與利害關係人策略', '路演準備與故事敘述'],
    },
  },
];

export default function Pricing() {
  const { language } = useLanguage();
  const [currency, setCurrency] = useState<'hkd' | 'gbp'>('hkd');

  const zh = language === 'zh';

  const formatPrice = (hkd: number, gbp: number) => {
    if (currency === 'hkd') return `HK$${hkd.toLocaleString()}`;
    return `£${gbp}`;
  };

  const formatPerSession = (hkd: number, gbp: number) => {
    if (currency === 'hkd') return `HK$${hkd.toLocaleString()}`;
    return `£${gbp}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#FFFEFA] to-[#F7F9F9]">
        <div className="container-custom max-w-4xl text-center">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl">
            {zh ? '1對1課程收費' : '1:1 Session Pricing'}
          </h1>
          <p className="text-lg sm:text-xl text-[#6b7280] mb-6">
            {zh
              ? '每一節課程都以你為中心 — 按需求選擇最合適的方案'
              : 'Every session is centred around you — choose the plan that fits your needs'}
          </p>
          <div className="inline-flex items-center bg-white border border-[#E6EAEA] rounded-full p-1 shadow-sm">
            <button
              onClick={() => setCurrency('hkd')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currency === 'hkd'
                  ? 'bg-[#21B3B1] text-white'
                  : 'text-[#6b7280] hover:text-[#4A4A4A]'
              }`}
            >
              HKD 🇭🇰
            </button>
            <button
              onClick={() => setCurrency('gbp')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                currency === 'gbp'
                  ? 'bg-[#21B3B1] text-white'
                  : 'text-[#6b7280] hover:text-[#4A4A4A]'
              }`}
            >
              GBP 🇬🇧
            </button>
          </div>
        </div>
      </section>

      {/* Free Trial Banner */}
      <div className="bg-[#C9F0EF] border-b border-[#21B3B1]/20">
        <div className="container-custom max-w-4xl py-4 text-center">
          <p className="text-sm sm:text-base text-[#168E8C] font-medium">
            {zh
              ? '✨ 首次諮詢免費 — 預約30分鐘免費體驗，了解是否適合你'
              : '✨ First consultation is free — book a 30-min trial to see if we\'re a good fit'}
            {' '}
            <a
              href="https://calendly.com/dianaleetw/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-[#168E8C] hover:text-[#21B3B1]"
            >
              {zh ? '立即預約 →' : 'Book now →'}
            </a>
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-5xl">
          <p className="text-center text-sm text-[#6b7280] mb-8">
            {zh ? '以下收費適用於職涯引導及創業輔導課程' : 'Pricing applies to both Career Facilitation and Startup Coaching sessions'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.sessions}
                className={`relative rounded-2xl border-2 p-6 flex flex-col ${
                  tier.highlight
                    ? 'border-[#21B3B1] bg-gradient-to-b from-[#C9F0EF]/30 to-white shadow-lg'
                    : 'border-[#E6EAEA] bg-white'
                }`}
              >
                {tier.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                    tier.highlight ? 'bg-[#21B3B1] text-white' : 'bg-[#FAF5EC] text-[#4A4A4A] border border-[#E6EAEA]'
                  }`}>
                    {zh ? tier.badge.zh : tier.badge.en}
                  </div>
                )}

                <h3 className="text-lg font-bold text-[#1f2937] mb-1">
                  {zh ? tier.name.zh : tier.name.en}
                </h3>

                <div className="mb-1">
                  <span className="text-3xl font-bold text-[#21B3B1]">
                    {formatPrice(tier.hkd, tier.gbp)}
                  </span>
                </div>

                {tier.sessions > 1 && (
                  <p className="text-xs text-[#6b7280] mb-3">
                    {zh ? '即' : ''} {formatPerSession(tier.perSession.hkd, tier.perSession.gbp)}{zh ? '/堂' : ' per session'}
                  </p>
                )}

                <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">
                  {zh ? tier.description.zh : tier.description.en}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {(zh ? tier.includes.zh : tier.includes.en).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                      <svg className="w-4 h-4 text-[#21B3B1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://calendly.com/dianaleetw/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    tier.highlight
                      ? 'bg-[#21B3B1] text-white hover:bg-[#168E8C] hover:text-white'
                      : 'bg-white text-[#21B3B1] border-2 border-[#21B3B1] hover:bg-[#21B3B1] hover:text-white'
                  }`}
                >
                  {zh ? '預約體驗課程' : 'Book a Trial First'}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#6b7280] mt-6">
            {zh
              ? '* 付款詳情將在確認預約後提供。如有任何問題，請透過聯絡頁面查詢。'
              : '* Payment details will be provided upon booking confirmation. Questions? Reach out via the contact page.'}
          </p>
        </div>
      </section>

      {/* Service Descriptions */}
      <section className="py-12 md:py-16 bg-[#FAF5EC]">
        <div className="container-custom max-w-5xl">
          <h2 className="text-center mb-10 text-[#4A4A4A]">
            {zh ? '選擇最適合你的方向' : 'Choose Your Focus'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-2xl p-6 border border-[#E6EAEA]">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-bold text-[#1f2937] mb-1">
                  {zh ? service.title.zh : service.title.en}
                </h3>
                <p className="text-sm text-[#21B3B1] font-medium mb-3">
                  {zh ? service.subtitle.zh : service.subtitle.en}
                </p>
                <p className="text-sm text-[#6b7280] mb-4 leading-relaxed">
                  {zh ? service.description.zh : service.description.en}
                </p>
                <ul className="space-y-2">
                  {(zh ? service.topics.zh : service.topics.en).map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                      <svg className="w-4 h-4 text-[#21B3B1] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#21B3B1] to-[#168E8C] text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-4 text-white">
            {zh ? '準備好開始了嗎？' : 'Ready to get started?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {zh
              ? '先預約免費30分鐘體驗，了解我們是否合拍 — 完全沒有壓力。'
              : 'Start with a free 30-minute trial — no pressure, just a conversation to see if we\'re a good fit.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/dianaleetw/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#21B3B1] rounded-lg font-semibold hover:bg-[#FFFEFA] hover:text-[#21B3B1] transition-all duration-300"
            >
              {zh ? '預約免費體驗' : 'Book Free Trial'}
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#21B3B1] transition-all duration-300"
            >
              {zh ? '有問題？聯絡我' : 'Have questions? Contact me'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
