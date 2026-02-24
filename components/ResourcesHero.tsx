'use client';

import { useLanguage } from "@/contexts/LanguageContext";

export default function ResourcesHero() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-gradient-to-br from-[#F7F9F9] to-[#FFFEFA]">
      <div className="container-custom max-w-4xl text-center">
        <h1 className="mb-6">{t('resources.hero.title')}</h1>
        <p className="text-xl text-[#6b7280]">
          {t('resources.hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
