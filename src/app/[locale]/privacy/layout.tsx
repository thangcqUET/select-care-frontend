import Link from 'next/link';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { use } from 'react';

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default function PrivacyLayout({ children, params }: LayoutProps) {
  const { locale } = use(params);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="w-full px-6 py-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <img src="/logo_select_care.svg" alt="Select Care" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-gray-900">Select Care</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href={`/${locale}`} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Home
            </Link>
            <LanguageSwitcher currentLocale={locale} showLabel={false} />
          </div>
        </div>
      </nav>
      
      <main className="flex-1">{children}</main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/logo_select_care.svg" alt="Select Care" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold">Select Care</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <div className="text-gray-400 text-sm">
                © 2025 Select Care. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
