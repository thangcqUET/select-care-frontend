'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLocale: string;
  className?: string;
  showLabel?: boolean;
}

const locales = [
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLocale, 
  className = '',
  showLabel = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false);
    
    // Get the current pathname without locale prefix
    const segments = pathname.split('/').filter(Boolean);
    const currentLocaleInPath = locales.find(l => l.code === segments[0]);
    
    let newPath: string;
    if (currentLocaleInPath) {
      // Replace existing locale
      segments[0] = newLocale;
      newPath = '/' + segments.join('/');
    } else {
      // Add new locale prefix
      newPath = `/${newLocale}${pathname}`;
    }
    
    router.push(newPath);
  };

  const currentLocaleData = locales.find(l => l.code === currentLocale) || locales[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={showLabel ? undefined : 'Change language'}
      >
        <svg 
          className="w-5 h-5 text-gray-600 dark:text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" 
          />
        </svg>
        {showLabel && (
          <>
            <span className="text-2xl leading-none">{currentLocaleData.flag}</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {currentLocaleData.nativeName}
            </span>
          </>
        )}
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
            <div className="py-1">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-between transition-colors ${
                    currentLocale === locale.code 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{locale.flag}</span>
                    <div>
                      <div className="font-medium">{locale.nativeName}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{locale.name}</div>
                    </div>
                  </div>
                  {currentLocale === locale.code && (
                    <svg 
                      className="w-5 h-5 text-blue-600 dark:text-blue-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
