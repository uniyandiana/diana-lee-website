'use client';

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import FloatingElement from "@/components/FloatingElement";
import MediaScroller from "@/components/MediaScroller";
import PartnerScroller from "@/components/PartnerScroller";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // Helper function to render translations that may be arrays with line breaks
  const renderWithBreaks = (key: string) => {
    const value = t(key);
    if (Array.isArray(value)) {
      return value.map((text: string, index: number) => (
        <span key={index}>
          {text}
          {index < value.length - 1 && <br />}
        </span>
      ));
    }
    return value;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="up" delay={100}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#1f2937]">
                {t('home.hero.title')}<br />
                <span className="gradient-text">{t('home.hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-[#6b7280]">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" className="btn-primary text-center hover:scale-105 transition-transform">
                  {t('home.hero.ctaServices')}
                </Link>
                <Link href="/contact" className="btn-secondary text-center hover:scale-105 transition-transform">
                  {t('home.hero.ctaContact')}
                </Link>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={300} className="hidden md:block">
              <div className="relative w-full h-[480px]">
                <Image
                  src="/images/Diana - All Souls Library.png"
                  alt="Diana Lee at All Souls Library, Oxford"
                  fill
                  className="rounded-2xl shadow-xl object-cover object-[center_80%]"
                  priority
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* What I Do */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <FadeIn direction="up">
            <h2 className="text-center mb-12">{t('home.whatIDo.title')}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn direction="up" delay={100}>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-[#F7F9F9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5A9AB4] transition-colors">
                  <svg className="w-8 h-8 text-[#5A9AB4] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1f2937]">{t('home.whatIDo.careerClarity.title')}</h3>
                <p className="text-[#6b7280]">
                  {renderWithBreaks('home.whatIDo.careerClarity.description')}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-[#F7F9F9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5A9AB4] transition-colors">
                  <svg className="w-8 h-8 text-[#5A9AB4] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1f2937]">{t('home.whatIDo.enterpriseEducation.title')}</h3>
                <p className="text-[#6b7280]">
                  {t('home.whatIDo.enterpriseEducation.description')}
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-[#F7F9F9] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5A9AB4] transition-colors">
                  <svg className="w-8 h-8 text-[#5A9AB4] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1f2937]">{t('home.whatIDo.facilitation.title')}</h3>
                <p className="text-[#6b7280]">
                  {renderWithBreaks('home.whatIDo.facilitation.description')}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Currently */}
      <section className="section-padding bg-[#FFFEFA]">
        <div className="container-custom max-w-4xl text-center">
          <FadeIn direction="up">
            <h2 className="mb-8">{t('home.currently.title')}</h2>
          </FadeIn>
          <FadeIn direction="up" delay={100}>
            <div className="space-y-6">
              <p className="text-xl text-[#1f2937]">
                {renderWithBreaks('home.currently.paragraph1')}
              </p>
              <p className="text-lg text-[#6b7280]">
                {t('home.currently.paragraph2')}
              </p>
            </div>
            <div className="mt-10">
              <Link href="/about" className="text-[#5A9AB4] font-semibold hover:text-[#3E7C92] transition-all text-lg inline-flex items-center gap-2 group">
                {t('home.currently.readMore')}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 md:py-24 bg-[#F7F9F9]">
        <div className="container-custom max-w-5xl">
          <h2 className="text-center mb-4">{t('home.featuredIn.title')}</h2>
          <p className="text-center text-[#6b7280] mb-12">{t('home.featuredIn.subtitle')}</p>

          <MediaScroller />
        </div>
      </section>

      {/* Partners & Collaborations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-4">{t('home.partners.title')}</h2>
          <p className="text-center text-[#6b7280] mb-12">{t('home.partners.subtitle')}</p>

          <PartnerScroller />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-[#5A9AB4] to-[#3E7C92] text-white">
        <div className="container-custom max-w-3xl text-center">
          <FadeIn direction="up">
            <h2 className="mb-6 text-white">{t('home.cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">
              {t('home.cta.description')}
            </p>
            <Link href="/contact" className="px-8 py-4 bg-white text-[#5A9AB4] rounded-lg hover:bg-[#FFFEFA] hover:scale-105 transition-all duration-300 font-semibold inline-block">
              {t('home.cta.button')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
