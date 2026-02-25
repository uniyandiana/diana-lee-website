'use client';

import { useState } from 'react';

interface MobileFilterDrawerProps {
  children: React.ReactNode;
  filterCount?: number;
}

export default function MobileFilterDrawer({ children, filterCount = 0 }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Button - Fixed at bottom */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-[#5A9AB4] text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-40 hover:bg-[#3E7C92] transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
        {filterCount > 0 && (
          <span className="bg-white text-[#5A9AB4] px-2 py-0.5 rounded-full text-xs font-bold">
            {filterCount}
          </span>
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 lg:hidden max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-[#1f2937]">Filters</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#6b7280] hover:text-[#1f2937]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {children}

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 bg-[#5A9AB4] text-white py-3 rounded-lg font-semibold hover:bg-[#3E7C92] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
