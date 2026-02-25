"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/components/Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.resources'), href: "/resources" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-[#F7F9F9] sticky top-0 z-50 shadow-sm" role="banner">
      <nav className="container-custom py-3 sm:py-4" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8" role="menubar">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#1f2937] hover:text-[#5A9AB4] transition-colors font-medium text-base focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] focus:ring-offset-2 rounded-md px-2 py-1"
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#1f2937] min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] rounded-lg"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden mt-4 pb-2 space-y-1"
            role="menu"
            aria-label="Mobile navigation menu"
          >
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-[#1f2937] hover:text-[#5A9AB4] hover:bg-[#F7F9F9] transition-colors font-medium py-3 px-4 rounded-lg text-base min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-[#5A9AB4]"
                onClick={() => setIsMenuOpen(false)}
                role="menuitem"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#F7F9F9] mt-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
