'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ExposureItem {
  id: string;
  image: string;
  title: string;
  organization: string;
  date: string;
  content: string;
}

interface ExposureGalleryProps {
  items: ExposureItem[];
}

export default function ExposureGallery({ items }: ExposureGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ExposureItem | null>(null);

  return (
    <>
      {/* Horizontal Scrolling Gallery */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[320px] snap-start cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <div className="relative h-[400px] rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  loading="lazy"
                  sizes="320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="px-2">
                <h3 className="font-bold text-[#1f2937] text-lg mb-1 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[#5A9AB4] text-sm mb-1">{item.organization}</p>
                <p className="text-[#6b7280] text-sm">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint gradient */}
        <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <svg className="w-6 h-6 text-[#1f2937]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-[400px] md:h-[600px]">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  className="object-cover"
                />
              </div>

              {/* Details */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#1f2937] mb-4">
                  {selectedImage.title}
                </h2>
                <p className="text-xl text-[#5A9AB4] mb-2">
                  {selectedImage.organization}
                </p>
                <p className="text-[#6b7280] mb-6">{selectedImage.date}</p>
                <p className="text-[#1f2937] leading-relaxed">
                  {selectedImage.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
