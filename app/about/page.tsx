'use client';

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function About() {
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
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="mb-8">I am Diana Lee</h1>

              <p className="text-lg text-[#6b7280] mb-6">
                With over a decade of experience across higher education and the NGO sector,
              </p>

              <p className="text-xl text-[#5A9AB4] font-semibold mb-8">
                I design transformative learning experiences that empower people to turn ideas into impact.
              </p>

              <p className="text-lg text-[#1f2937]">
                I'm a Career Development Facilitator • Enterprise Educator • Social Innovator, currently working at the University of Oxford's entrepreneurship service.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/Diana Lee - Professional Portrait (Oxford Reuben College).jpg"
                  alt="Diana Lee at Oxford Reuben College"
                  fill
                  className="rounded-2xl shadow-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-12">{t('about.experience.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* UK */}
            <div className="bg-[#F7F9F9] p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#5A9AB4] mb-8 text-center">🇬🇧 {t('about.experience.uk')}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://www.ox.ac.uk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.oxford')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.oxfordDesc')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://www.oxford-hk.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.ohcic')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.ohcicDesc')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://foreignteer.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.foreignteer')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.foreignteerDesc')}</p>
                </div>
              </div>
            </div>

            {/* HK */}
            <div className="bg-[#F7F9F9] p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-[#5A9AB4] mb-8 text-center">🇭🇰 {t('about.experience.hk')}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://hkust.edu.hk/" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.hkust')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.hkustDesc')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://www.instagram.com/mymailbox852/" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.mymailbox')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.mymailboxDesc')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="font-bold text-[#1f2937] text-base mb-2">
                    <a href="https://www.lavioletcharity.org/" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A9AB4] transition-colors">
                      {t('about.experience.laviolet')}
                    </a>
                  </h4>
                  <p className="text-[#6b7280] text-sm">{t('about.experience.lavioletDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Awards - Aligned Style */}
      <section className="py-12 md:py-16 bg-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-10">{t('about.qualifications.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Education */}
            <div className="bg-[#F7F9F9] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#5A9AB4] mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">📚</span> {t('about.qualifications.education.title')}
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.education.bachelor')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.education.msc')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.education.ma')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">The Professional Certificate in Career Development Facilitation</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-[#F7F9F9] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#5A9AB4] mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🏆</span> {t('about.qualifications.certifications.title')}
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.certifications.ccsp')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.certifications.gcdf')}</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">{t('about.qualifications.certifications.pd')}</p>
                </div>
              </div>
            </div>

            {/* Awards */}
            <div className="bg-[#F7F9F9] p-8 rounded-xl">
              <h3 className="text-xl font-bold text-[#5A9AB4] mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-2xl">🌟</span> Awards
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">Enterprise Summer Scholarship 2025, UK</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">Eastern District Outstanding Youth Award Scheme, HK</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">Outstanding Service Awards for Tertiary Students, HK</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">Rotary Youth Leadership Awards, HK</p>
                </div>
                <div className="border-l-4 border-[#5A9AB4] pl-4">
                  <p className="text-[#6b7280] text-sm">University Service Scholarship, HK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="mb-8">{t('about.philosophy.title')}</h2>

          <div className="bg-gradient-to-br from-[#5A9AB4] to-[#3E7C92] p-8 md:p-10 rounded-2xl text-white mb-12">
            <p className="text-xl md:text-2xl leading-relaxed">
              "{renderWithBreaks('about.philosophy.quote')}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Theory Informed */}
            <div className="bg-gradient-to-br from-[#F7F9F9] to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#F7F9F9]">
              <div className="w-16 h-16 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#5A9AB4] text-lg mb-2">{t('about.philosophy.theoryInformed')}</h3>
              <p className="text-[#6b7280] text-sm">{t('about.philosophy.theoryInformedDesc')}</p>
            </div>

            {/* Personality Based */}
            <div className="bg-gradient-to-br from-[#F7F9F9] to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#F7F9F9]">
              <div className="w-16 h-16 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#5A9AB4] text-lg mb-2">{t('about.philosophy.personalityBased')}</h3>
              <p className="text-[#6b7280] text-sm">{t('about.philosophy.personalityBasedDesc')}</p>
            </div>

            {/* Experience Driven */}
            <div className="bg-gradient-to-br from-[#F7F9F9] to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#F7F9F9]">
              <div className="w-16 h-16 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#5A9AB4] text-lg mb-2">{t('about.philosophy.experienceDriven')}</h3>
              <p className="text-[#6b7280] text-sm">{t('about.philosophy.experienceDrivenDesc')}</p>
            </div>

            {/* Human Centred */}
            <div className="bg-gradient-to-br from-[#F7F9F9] to-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-[#F7F9F9]">
              <div className="w-16 h-16 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </div>
              <h3 className="font-bold text-[#5A9AB4] text-lg mb-2">{t('about.philosophy.humanCentred')}</h3>
              <p className="text-[#6b7280] text-sm">{t('about.philosophy.humanCentredDesc')}</p>
            </div>
          </div>

          <div className="bg-[#FFFEFA] p-8 rounded-xl">
            <p className="text-lg text-[#1f2937] mb-2">
              {t('about.philosophy.tagline1')}
            </p>
            <p className="text-2xl font-semibold text-[#5A9AB4]">
              {t('about.philosophy.tagline2')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#5A9AB4] to-[#3E7C92] text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-6 text-white">{t('about.cta.title')}</h2>
          <p className="text-xl mb-8 opacity-90">
            {t('about.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-white text-[#5A9AB4] rounded-lg hover:bg-[#FFFEFA] transition-all duration-300 font-semibold">
              {t('about.cta.contact')}
            </Link>
            <Link href="/services" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#5A9AB4] transition-all duration-300 font-semibold">
              {t('about.cta.services')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
