'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalendlyWidgetProps {
  url?: string;
  variant?: 'inline' | 'button';
  buttonText?: string;
  className?: string;
}

export default function CalendlyWidget({
  url = 'https://calendly.com/dianaleetw/30min',
  variant = 'inline',
  buttonText,
  className = ''
}: CalendlyWidgetProps) {
  const { language } = useLanguage();

  const defaultButtonText = language === 'zh'
    ? '預約諮詢'
    : 'Book a Call';

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (variant === 'button') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block px-8 py-4 bg-[#5A9AB4] text-white font-semibold rounded-lg hover:bg-[#3E7C92] transition-colors text-center min-h-[48px] ${className}`}
      >
        {buttonText || defaultButtonText}
      </a>
    );
  }

  return (
    <div className={className}>
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
}
