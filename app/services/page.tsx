'use client';

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import ExposureGallery from "@/components/ExposureGallery";

export default function Services() {
  const { t } = useLanguage();

  const individualServices = [
    {
      id: "career-facilitation",
      title: t('services.careerFacilitation.title'),
      image: "/images/Speaker in Career Workshop.jpeg",
      description: t('services.careerFacilitation.description'),
      topics: [
        t('services.careerFacilitation.topic1'),
        t('services.careerFacilitation.topic2'),
        t('services.careerFacilitation.topic3'),
        t('services.careerFacilitation.topic4')
      ]
    },
    {
      id: "startup-coaching",
      title: t('services.startupCoaching.title'),
      image: "/images/Workshop Delivery 2 (Entrepreneurship @ HKUST).jpeg",
      description: t('services.startupCoaching.description'),
      topics: [
        t('services.startupCoaching.topic1'),
        t('services.startupCoaching.topic2'),
        t('services.startupCoaching.topic3'),
        t('services.startupCoaching.topic4')
      ]
    }
  ];

  const organizationServices = [
    {
      id: "workshops",
      title: t('services.workshops.title'),
      image: "/images/Workshop Delivery (Personality Dimensions).jpeg",
      description: t('services.workshops.description'),
      topics: [
        t('services.workshops.topic1'),
        t('services.workshops.topic2'),
        t('services.workshops.topic3'),
        t('services.workshops.topic4')
      ]
    },
    {
      id: "group",
      title: t('services.groupFacilitation.title'),
      image: "/images/Workshop Delivery 2 (Entrepreneurship @ HKUST).jpeg",
      description: t('services.groupFacilitation.description'),
      topics: [
        t('services.groupFacilitation.topic1'),
        t('services.groupFacilitation.topic2'),
        t('services.groupFacilitation.topic3'),
        t('services.groupFacilitation.topic4')
      ]
    },
    {
      id: "games",
      title: t('services.gameBased.title'),
      image: "/images/Corporate Workshop (Santa).jpeg",
      description: t('services.gameBased.description'),
      topics: [
        t('services.gameBased.topic1'),
        t('services.gameBased.topic2'),
        t('services.gameBased.topic3'),
        t('services.gameBased.topic4')
      ]
    },
    {
      id: "ecosystem",
      title: t('services.ecosystem.title'),
      image: "/images/Joining the International Enterprise Educator Conference.jpeg",
      description: t('services.ecosystem.description'),
      topics: [
        t('services.ecosystem.topic1'),
        t('services.ecosystem.topic2'),
        t('services.ecosystem.topic3'),
        t('services.ecosystem.topic4')
      ]
    }
  ];

  const exposureItems = [
    {
      id: "1",
      image: "/images/National Career Guidance Conference.jpeg",
      title: "National Career Guidance Conference",
      organization: "Career Development Institute, UK",
      date: "November 2024",
      content: "Attended the UK's premier career guidance conference, connecting with industry leaders and exploring the latest developments in career development practice."
    },
    {
      id: "2",
      image: "/images/Design Thinking Workshop for NGO.jpeg",
      title: "Design Thinking Workshop",
      organization: "NGO Partner Organization",
      date: "October 2024",
      content: "Facilitated a design thinking workshop for NGO professionals, helping them develop innovative solutions for social challenges."
    },
    {
      id: "3",
      image: "/images/Workshop Delivery (Personality Dimensions).jpeg",
      title: "Personality Dimensions Workshop",
      organization: "Corporate Client",
      date: "September 2024",
      content: "Delivered an engaging workshop on personality dimensions, helping participants understand themselves and work better in teams."
    },
    {
      id: "4",
      image: "/images/Lecture on Social Innovation.jpg",
      title: "Social Innovation Lecture",
      organization: "University Partner",
      date: "August 2024",
      content: "Guest lecture on social innovation and entrepreneurship, inspiring students to create positive change in their communities."
    },
    {
      id: "5",
      image: "/images/Corporate Workshop (Santa).jpeg",
      title: "Corporate Team Building",
      organization: "Corporate Partner",
      date: "December 2023",
      content: "Interactive team building session combining games and learning to strengthen team dynamics and collaboration."
    },
    {
      id: "6",
      image: "/images/Joining the International Enterprise Educator Conference.jpeg",
      title: "International Enterprise Educator Conference",
      organization: "Global Enterprise Education Network",
      date: "July 2024",
      content: "Participated in international conference, sharing best practices in enterprise education with peers from around the world."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#FFFEFA] to-[#F7F9F9]">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-4">{t('services.hero.title')}</h1>
            <p className="text-xl text-[#6b7280]">
              {t('services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* For Individuals */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-8 text-[#5A9AB4]">{t('services.forIndividuals')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {individualServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl border-2 border-[#F7F9F9] hover:border-[#5A9AB4] transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-[#1f2937]">{service.title}</h3>
                  <p className="text-[#6b7280] mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2">
                    {service.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#5A9AB4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-sm text-[#1f2937]">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA for Individuals */}
          <div className="mt-12 text-center">
            <a
              href="https://calendly.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#5A9AB4] text-white rounded-lg hover:bg-[#3E7C92] transition-all duration-300 font-semibold"
            >
              {t('services.cta.bookSession')}
            </a>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section className="py-12 md:py-16 bg-[#FFFEFA]">
        <div className="container-custom max-w-6xl">
          <h2 className="text-center mb-8 text-[#5A9AB4]">{t('services.forOrganizations')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {organizationServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-xl border-2 border-[#F7F9F9] hover:border-[#5A9AB4] transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-[#1f2937]">{service.title}</h3>
                  <p className="text-[#6b7280] mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2">
                    {service.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#5A9AB4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-sm text-[#1f2937]">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA for Organizations */}
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-[#5A9AB4] text-white rounded-lg hover:bg-[#3E7C92] transition-all duration-300 font-semibold"
            >
              {t('services.cta.enquire')}
            </Link>
          </div>
        </div>
      </section>

      {/* My Exposure */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-center mb-12 text-[#5A9AB4]">{t('services.myExposure.title')}</h2>
          <ExposureGallery items={exposureItems} />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#5A9AB4] to-[#3E7C92] text-white">
        <div className="container-custom max-w-3xl text-center">
          <h2 className="mb-4 text-white">{t('services.cta.title')}</h2>
          <p className="text-lg mb-6 opacity-90">
            {t('services.cta.subtitle')}
          </p>
          <Link href="/contact" className="btn-primary bg-white text-[#5A9AB4] hover:bg-[#FFFEFA] inline-block">
            {t('services.cta.button')}
          </Link>
        </div>
      </section>
    </div>
  );
}
