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
      {/* Hero with Photo */}
      <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="mb-6">{t('about.hero.title')}</h1>
              <p className="text-xl text-[#6b7280] mb-6">
                {t('about.hero.subtitle')}
              </p>
              <p className="text-lg text-[#1f2937]">
                {renderWithBreaks('about.hero.description')}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="/images/Diana Lee - Professional Portrait (Oxford Reuben College).jpg"
                alt="Diana Lee at Oxford Reuben College"
                width={500}
                height={600}
                className="rounded-2xl shadow-lg w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <p className="text-lg leading-relaxed text-[#1f2937] mb-6">
            <strong className="text-[#5A9AB4]">{renderWithBreaks('about.story.paragraph1')}</strong>
          </p>

          <p className="text-lg leading-relaxed text-[#6b7280] mb-6">
            {t('about.story.paragraph2')}
          </p>

          <p className="text-lg leading-relaxed text-[#6b7280]">
            {renderWithBreaks('about.story.paragraph3')}
          </p>
        </div>
      </section>

      {/* Qualifications & Credentials */}
      <section className="section-padding bg-[#FFFEFA]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-center mb-12">{t('about.qualifications.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#F7F9F9]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.qualifications.education.title')}</h3>
                  <ul className="space-y-2 text-[#6b7280]">
                    <li className="text-sm">{t('about.qualifications.education.bachelor')}</li>
                    <li className="text-sm">{t('about.qualifications.education.msc')}</li>
                    <li className="text-sm">{t('about.qualifications.education.ma')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="bg-white p-6 rounded-xl border-2 border-[#F7F9F9]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5A9AB4]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#5A9AB4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.qualifications.certifications.title')}</h3>
                  <ul className="space-y-2 text-[#6b7280]">
                    <li className="text-sm">{t('about.qualifications.certifications.ccsp')}</li>
                    <li className="text-sm">{t('about.qualifications.certifications.gcdf')}</li>
                    <li className="text-sm">{t('about.qualifications.certifications.pd')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16 bg-[#FFFEFA]">
        <div className="container-custom max-w-3xl">
          <h2 className="text-center mb-8">{t('about.philosophy.title')}</h2>

          <div className="bg-gradient-to-br from-[#5A9AB4] to-[#3E7C92] p-8 rounded-2xl text-white text-center mb-12">
            <p className="text-xl md:text-2xl leading-relaxed">
              "{renderWithBreaks('about.philosophy.quote')}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-[#5A9AB4]">📚 {t('about.philosophy.theoryInformed')}</h3>
              <p className="text-[#6b7280]">{t('about.philosophy.theoryInformedDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-[#5A9AB4]">🧠 {t('about.philosophy.personalityBased')}</h3>
              <p className="text-[#6b7280]">{t('about.philosophy.personalityBasedDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-[#5A9AB4]">💡 {t('about.philosophy.experienceDriven')}</h3>
              <p className="text-[#6b7280]">{t('about.philosophy.experienceDrivenDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-[#5A9AB4]">🤝 {t('about.philosophy.humanCentred')}</h3>
              <p className="text-[#6b7280]">{t('about.philosophy.humanCentredDesc')}</p>
            </div>
          </div>

          <div className="text-center p-8 bg-white rounded-xl">
            <p className="text-lg text-[#1f2937]">
              {t('about.philosophy.tagline1')}
            </p>
            <p className="text-2xl font-semibold text-[#5A9AB4] mt-2">
              {t('about.philosophy.tagline2')}
            </p>
          </div>
        </div>
      </section>

      {/* In Action - Photo Gallery */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-center mb-12">{t('about.inAction.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/images/LVF Dream Plan Stage Speech Mic.png"
                alt="Speaking at LVF Dream Plan event"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">{t('about.inAction.facilitating')}</p>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/images/HKUST Entrepreneurship Competition.png"
                alt="HKUST Entrepreneurship Competition"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">{t('about.inAction.education')}</p>
              </div>
            </div>

            <div className="relative h-80 rounded-xl overflow-hidden group">
              <Image
                src="/images/School Sharing.jpg"
                alt="Panel discussion at school"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-semibold">{t('about.inAction.speaking')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <h2 className="text-center mb-12">{t('about.experience.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* UK Column */}
            <div>
              <h3 className="text-2xl font-bold text-[#5A9AB4] mb-8 text-center">🇬🇧 {t('about.experience.uk')}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.oxford')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.oxfordDesc')}</p>
                </div>

                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.ohcic')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.ohcicDesc')}</p>
                </div>

                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.foreignteer')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.foreignteerDesc')}</p>
                </div>
              </div>
            </div>

            {/* Hong Kong Column */}
            <div>
              <h3 className="text-2xl font-bold text-[#5A9AB4] mb-8 text-center">🇭🇰 {t('about.experience.hk')}</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.hkust')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.hkustDesc')}</p>
                </div>

                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.mymailbox')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.mymailboxDesc')}</p>
                </div>

                <div className="border-l-4 border-[#5A9AB4] pl-6">
                  <h4 className="text-lg font-bold text-[#1f2937] mb-2">{t('about.experience.laviolet')}</h4>
                  <p className="text-[#6b7280]">{t('about.experience.lavioletDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-[#5A9AB4] to-[#3E7C92] text-white">
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
