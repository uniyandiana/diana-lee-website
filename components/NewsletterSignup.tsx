'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export default function NewsletterSignup({
  variant = 'default',
  className = ''
}: NewsletterSignupProps) {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage(language === 'zh' ? '請輸入有效的電子郵件地址' : 'Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Replace with your actual newsletter API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage(language === 'zh' ? '感謝訂閱！' : 'Thank you for subscribing!');
        setEmail('');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      setStatus('error');
      setMessage(language === 'zh' ? '訂閱失敗，請稍後再試' : 'Failed to subscribe. Please try again later.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-[#5A9AB4]/10 to-[#3E7C92]/10 p-6 rounded-xl ${className}`}>
        <h3 className="text-lg font-bold text-[#1f2937] mb-2">
          {language === 'zh' ? '訂閱最新資訊' : 'Stay Updated'}
        </h3>
        <p className="text-sm text-[#6b7280] mb-4">
          {language === 'zh'
            ? '獲取最新的職涯發展與創業見解'
            : 'Get the latest career development and entrepreneurship insights'}
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'zh' ? '您的電子郵件' : 'Your email'}
            className="flex-1 px-4 py-2 border border-[#E6EAEA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A9AB4] focus:border-transparent text-sm"
            disabled={status === 'loading'}
            aria-label={language === 'zh' ? '電子郵件地址' : 'Email address'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-2 bg-[#5A9AB4] text-white rounded-lg hover:bg-[#3E7C92] transition-colors font-medium text-sm disabled:opacity-50 whitespace-nowrap"
            aria-label={language === 'zh' ? '訂閱' : 'Subscribe'}
          >
            {status === 'loading'
              ? (language === 'zh' ? '處理中...' : 'Subscribing...')
              : (language === 'zh' ? '訂閱' : 'Subscribe')}
          </button>
        </form>
        {message && (
          <p
            className={`mt-3 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'zh' ? '輸入您的電子郵件' : 'Enter your email'}
            className="flex-1 px-4 py-3 border border-white/30 bg-white/10 text-white placeholder:text-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            disabled={status === 'loading'}
            aria-label={language === 'zh' ? '電子郵件地址' : 'Email address'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-3 bg-white text-[#5A9AB4] rounded-lg hover:bg-[#FFFEFA] transition-colors font-semibold disabled:opacity-50"
            aria-label={language === 'zh' ? '訂閱電子報' : 'Subscribe to newsletter'}
          >
            {status === 'loading'
              ? (language === 'zh' ? '處理中...' : 'Subscribing...')
              : (language === 'zh' ? '訂閱電子報' : 'Subscribe')}
          </button>
        </form>
        {message && (
          <p
            className={`mt-3 text-sm ${status === 'success' ? 'text-white' : 'text-red-200'}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-br from-[#5A9AB4] to-[#3E7C92] rounded-2xl p-8 md:p-12 text-white ${className}`}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-4 inline-block p-3 bg-white/10 rounded-full" aria-hidden="true">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {language === 'zh' ? '訂閱電子報' : 'Subscribe to My Newsletter'}
        </h2>

        <p className="text-lg mb-8 opacity-90">
          {language === 'zh'
            ? '獲取職涯發展、創業教育與個人成長的最新見解。每月一期，精選內容直達您的信箱。'
            : 'Get the latest insights on career development, enterprise education, and personal growth. Monthly curated content delivered to your inbox.'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'zh' ? '您的電子郵件地址' : 'Your email address'}
            className="flex-1 px-6 py-4 border-2 border-white/30 bg-white/10 text-white placeholder:text-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-base min-h-[56px]"
            disabled={status === 'loading'}
            aria-label={language === 'zh' ? '電子郵件地址' : 'Email address'}
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-8 py-4 bg-white text-[#5A9AB4] rounded-lg hover:bg-[#FFFEFA] transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px]"
            aria-label={language === 'zh' ? '訂閱電子報' : 'Subscribe to newsletter'}
          >
            {status === 'loading'
              ? (language === 'zh' ? '處理中...' : 'Subscribing...')
              : (language === 'zh' ? '訂閱' : 'Subscribe')}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-base ${status === 'success' ? 'text-white' : 'text-red-200'}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-sm opacity-75">
          {language === 'zh'
            ? '我們尊重您的隱私。您可以隨時取消訂閱。'
            : 'We respect your privacy. Unsubscribe at any time.'}
        </p>
      </div>
    </div>
  );
}
