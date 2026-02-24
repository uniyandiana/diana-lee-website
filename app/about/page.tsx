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
      {/* Hero - Rearranged */}
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

      {/* Professional Experience - Moved Up */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-12">{t('about.experience.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* UK */}
            <div className="bg-[#F7F9F9] p-6 rounded-xl">
              <h3 className="text-xl font-bold text-[#5A9AB4] mb-6 text-center">🇬🇧 {t('about.experience.uk')}</h3>
              <div className="space-y-4">
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.oxford')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.oxfordDesc')}</p>
                </div>
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.ohcic')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.ohcicDesc')}</p>
                </div>
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.foreignteer')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.foreignteerDesc')}</p>
                </div>
              </div>
            </div>

            {/* HK */}
            <div className="bg-[#F7F9F9] p-6 rounded-xl">
              <h3 className="text-xl font-bold text-[#5A9AB4] mb-6 text-center">🇭🇰 {t('about.experience.hk')}</h3>
              <div className="space-y-4">
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.hkust')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.hkustDesc')}</p>
                </div>
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.mymailbox')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.mymailboxDesc')}</p>
                </div>
                <div className="border-l-3 border-[#5A9AB4] pl-4">
                  <h4 className="font-bold text-[#1f2937] text-sm mb-1">{t('about.experience.laviolet')}</h4>
                  <p className="text-[#6b7280] text-xs">{t('about.experience.lavioletDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-12 md:py-16 bg-[#FFFEFA]">
        <div className="container-custom max-w-4xl">
          <h2 className="text-center mb-10">{t('about.qualifications.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-[#5A9AB4] mb-3 flex items-center gap-2">
                <span>📚</span> {t('about.qualifications.education.title')}
              </h3>
              <ul className="space-y-2 text-[#6b7280] text-sm">
                <li>• {t('about.qualifications.education.bachelor')}</li>
                <li>• {t('about.qualifications.education.msc')}</li>
                <li>• {t('about.qualifications.education.ma')}</li>
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-bold text-[#5A9AB4] mb-3 flex items-center gap-2">
                <span>🏆</span> {t('about.qualifications.certifications.title')}
              </h3>
              <ul className="space-y-2 text-[#6b7280] text-sm">
                <li>• {t('about.qualifications.certifications.ccsp')}</li>
                <li>• {t('about.qualifications.certifications.gcdf')}</li>
                <li>• {t('about.qualifications.certifications.pd')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="mb-8">{t('about.philosophy.title')}</h2>

          <div className="bg-gradient-to-br from-[#5A9AB4] to-[#3E7C92] p-8 md:p-10 rounded-2xl text-white mb-8">
            <p className="text-xl md:text-2xl leading-relaxed">
              "{renderWithBreaks('about.philosophy.quote')}"
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#F7F9F9] p-4 rounded-lg">
              <p className="font-semibold text-[#5A9AB4] text-sm">📚 {t('about.philosophy.theoryInformed')}</p>
            </div>
            <div className="bg-[#F7F9F9] p-4 rounded-lg">
              <p className="font-semibold text-[#5A9AB4] text-sm">🧠 {t('about.philosophy.personalityBased')}</p>
            </div>
            <div className="bg-[#F7F9F9] p-4 rounded-lg">
              <p className="font-semibold text-[#5A9AB4] text-sm">💡 {t('about.philosophy.experienceDriven')}</p>
            </div>
            <div className="bg-[#F7F9F9] p-4 rounded-lg">
              <p className="font-semibold text-[#5A9AB4] text-sm">🤝 {t('about.philosophy.humanCentred')}</p>
            </div>
          </div>

          <p className="text-lg text-[#1f2937] mb-2">
            {t('about.philosophy.tagline1')}
          </p>
          <p className="text-2xl font-semibold text-[#5A9AB4]">
            {t('about.philosophy.tagline2')}
          </p>
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
