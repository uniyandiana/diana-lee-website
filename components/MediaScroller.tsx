'use client';

import { useRef, useEffect } from 'react';

export default function MediaScroller() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const isManualScrolling = useRef(false);

  const startAutoScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    autoScrollInterval.current = setInterval(() => {
      if (!isManualScrolling.current) {
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }
    }, 30);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Pause on hover
    const pauseAutoScroll = () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };

    // Resume on mouse leave
    const resumeAutoScroll = () => {
      isManualScrolling.current = false;
      startAutoScroll();
    };

    startAutoScroll();
    container.addEventListener('mouseenter', pauseAutoScroll);
    container.addEventListener('mouseleave', resumeAutoScroll);

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
      container.removeEventListener('mouseenter', pauseAutoScroll);
      container.removeEventListener('mouseleave', resumeAutoScroll);
    };
  }, []);

  const scrollBackward = () => {
    if (scrollContainerRef.current) {
      isManualScrolling.current = true;
      const scrollAmount = 200;
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });

      // Resume auto-scroll after animation completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 500);
    }
  };

  const scrollForward = () => {
    if (scrollContainerRef.current) {
      isManualScrolling.current = true;
      const scrollAmount = 200;
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });

      // Resume auto-scroll after animation completes
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 500);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F7F9F9] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F7F9F9] to-transparent z-10 pointer-events-none"></div>

      {/* Left Arrow - Go Back 1-2 logos */}
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

      {/* Right Arrow - Go Forward 1-2 logos */}
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

      {/* Scrolling container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-12 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* First set */}
        <div className="flex gap-12 items-center shrink-0">
          <img src="/images/media/mingpao.png" alt="Ming Pao" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/aymVghMLVl8" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/rthk.png" alt="RTHK" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/44BVKlLd33s" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/tvb.png" alt="TVB" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/8PlE4WqErGo" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/nowtv.png" alt="Now TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/8PlE4WqErGo" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/viu.png" alt="Viu TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <img src="/images/media/cable.svg" alt="Cable TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <img src="/images/media/D100.png" alt="D100" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/4KkDPMerHf0" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/metroradio.png" alt="Metro Radio" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/iBsJyIKMqNE" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/cr881903.png" alt="CR881903" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <img src="/images/media/singtao.png" alt="Sing Tao" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/RkuJYMrnx2E" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/etnet.png" alt="ETNet" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/sYC1Ovl0rl0" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/rti.png" alt="RTI" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Duplicate set for seamless appearance */}
        <div className="flex gap-12 items-center shrink-0">
          <img src="/images/media/mingpao.png" alt="Ming Pao" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/aymVghMLVl8" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/rthk.png" alt="RTHK" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/44BVKlLd33s" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/tvb.png" alt="TVB" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/8PlE4WqErGo" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/nowtv.png" alt="Now TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/8PlE4WqErGo" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/viu.png" alt="Viu TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <img src="/images/media/cable.svg" alt="Cable TV" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <img src="/images/media/D100.png" alt="D100" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/4KkDPMerHf0" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/metroradio.png" alt="Metro Radio" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/iBsJyIKMqNE" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/cr881903.png" alt="CR881903" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <img src="/images/media/singtao.png" alt="Sing Tao" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
          <a href="https://youtu.be/RkuJYMrnx2E" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/etnet.png" alt="ETNet" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
          <a href="https://youtu.be/sYC1Ovl0rl0" target="_blank" rel="noopener noreferrer" className="shrink-0">
            <img src="/images/media/rti.png" alt="RTI" className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
}
