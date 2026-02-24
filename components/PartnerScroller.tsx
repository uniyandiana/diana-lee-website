'use client';

import { useRef, useEffect } from 'react';

export default function PartnerScroller() {
  const scrollContainerRef1 = useRef<HTMLDivElement>(null);
  const scrollContainerRef2 = useRef<HTMLDivElement>(null);
  const autoScrollInterval1 = useRef<NodeJS.Timeout | null>(null);
  const autoScrollInterval2 = useRef<NodeJS.Timeout | null>(null);
  const isManualScrolling = useRef(false);

  const startAutoScroll = () => {
    const container1 = scrollContainerRef1.current;
    const container2 = scrollContainerRef2.current;
    if (!container1 || !container2) return;

    if (autoScrollInterval1.current) clearInterval(autoScrollInterval1.current);
    if (autoScrollInterval2.current) clearInterval(autoScrollInterval2.current);

    autoScrollInterval1.current = setInterval(() => {
      if (!isManualScrolling.current) {
        if (container1.scrollLeft >= container1.scrollWidth / 2) {
          container1.scrollLeft = 0;
        } else {
          container1.scrollLeft += 1;
        }
      }
    }, 30);

    autoScrollInterval2.current = setInterval(() => {
      if (!isManualScrolling.current) {
        if (container2.scrollLeft >= container2.scrollWidth / 2) {
          container2.scrollLeft = 0;
        } else {
          container2.scrollLeft += 1;
        }
      }
    }, 35);
  };

  useEffect(() => {
    const container1 = scrollContainerRef1.current;
    const container2 = scrollContainerRef2.current;
    if (!container1 || !container2) return;

    // Pause functions
    const pauseAutoScroll = () => {
      if (autoScrollInterval1.current) clearInterval(autoScrollInterval1.current);
      if (autoScrollInterval2.current) clearInterval(autoScrollInterval2.current);
    };

    // Resume functions
    const resumeAutoScroll = () => {
      isManualScrolling.current = false;
      startAutoScroll();
    };

    startAutoScroll();

    container1.addEventListener('mouseenter', pauseAutoScroll);
    container1.addEventListener('mouseleave', resumeAutoScroll);
    container2.addEventListener('mouseenter', pauseAutoScroll);
    container2.addEventListener('mouseleave', resumeAutoScroll);

    return () => {
      if (autoScrollInterval1.current) clearInterval(autoScrollInterval1.current);
      if (autoScrollInterval2.current) clearInterval(autoScrollInterval2.current);
      container1.removeEventListener('mouseenter', pauseAutoScroll);
      container1.removeEventListener('mouseleave', resumeAutoScroll);
      container2.removeEventListener('mouseenter', pauseAutoScroll);
      container2.removeEventListener('mouseleave', resumeAutoScroll);
    };
  }, []);

  const scrollBackward = () => {
    isManualScrolling.current = true;
    const scrollAmount = 200;
    [scrollContainerRef1, scrollContainerRef2].forEach(ref => {
      if (ref.current) {
        ref.current.scrollTo({
          left: ref.current.scrollLeft - scrollAmount,
          behavior: 'smooth'
        });
      }
    });

    // Resume auto-scroll after animation completes
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 500);
  };

  const scrollForward = () => {
    isManualScrolling.current = true;
    const scrollAmount = 200;
    [scrollContainerRef1, scrollContainerRef2].forEach(ref => {
      if (ref.current) {
        ref.current.scrollTo({
          left: ref.current.scrollLeft + scrollAmount,
          behavior: 'smooth'
        });
      }
    });

    // Resume auto-scroll after animation completes
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 500);
  };

  const partners = {
    row1: [
      { name: "Education University of Hong Kong", img: "/images/partner/Education University of Hong Kong.webp" },
      { name: "Hong Kong Federation of Youth Groups", img: "/images/partner/Hong Kong Federation of Youth Groups.png" },
      { name: "Junior Achievement HK", img: "/images/partner/Junior Achievement HK.png" },
      { name: "OOCL", img: "/images/partner/OOCL.png" },
      { name: "Polytechnic University", img: "/images/partner/Polytechnic University.png" },
      { name: "Wofoo Society Enterprise", img: "/images/partner/Wofoo Society Enterprise.jpg" },
      { name: "China Taiping", img: "/images/partner/china taiping.png" },
    ],
    row2: [
      { name: "Hok Yau Club", img: "/images/partner/Hok Yau Club.png" },
      { name: "Institute of Vocational Education", img: "/images/partner/Institute of Vocational Education.png" },
      { name: "La Violet Charity Foundation", img: "/images/partner/La Violet Chartiy Foundation.webp" },
      { name: "Neighbour Advice-Action Council", img: "/images/partner/Neighbour Advice-Action Council.png" },
      { name: "Smith", img: "/images/partner/Smith.png" },
      { name: "Young Founder School", img: "/images/partner/Young Founder School.jpg" },
      { name: "WeWork", img: "/images/partner/wework.png" },
    ]
  };

  return (
    <div className="relative">
      {/* Single pair of arrows for both rows */}
      <button
        onClick={scrollBackward}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Go back"
        title="Go back 1-2 logos"
      >
        <svg className="w-5 h-5 text-[#5A9AB4] group-hover:text-[#3E7C92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={scrollForward}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 group"
        aria-label="Go forward"
        title="Go forward 1-2 logos"
      >
        <svg className="w-5 h-5 text-[#5A9AB4] group-hover:text-[#3E7C92]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container - Row 1 */}
          <div
            ref={scrollContainerRef1}
            className="flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-12 items-center shrink-0">
              {partners.row1.map((partner, idx) => (
                <img
                  key={idx}
                  src={partner.img}
                  alt={partner.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-12 items-center shrink-0">
              {partners.row1.map((partner, idx) => (
                <img
                  key={`dup-${idx}`}
                  src={partner.img}
                  alt={partner.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container - Row 2 */}
          <div
            ref={scrollContainerRef2}
            className="flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-12 items-center shrink-0">
              {partners.row2.map((partner, idx) => (
                <img
                  key={idx}
                  src={partner.img}
                  alt={partner.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex gap-12 items-center shrink-0">
              {partners.row2.map((partner, idx) => (
                <img
                  key={`dup-${idx}`}
                  src={partner.img}
                  alt={partner.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
