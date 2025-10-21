'use client';

import React, { use } from 'react';
import { SignIn } from "../../components/sign-in";
import Payment from "../../components/payment";
import { ExtensionAuthHandler } from "../../components/extension-auth-handler";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { Suspense } from "react";
import { t, type Locale } from "../../lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default function Home({ params }: PageProps) {
  const { locale: localeParam } = use(params);
  const locale = localeParam as Locale;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Extension Authentication Handler */}
      <Suspense fallback={null}>
        <ExtensionAuthHandler />
      </Suspense>
      
      {/* Navigation */}
      <nav className="w-full px-6 py-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo_select_care.svg" alt="Select Care" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-gray-900">Select Care</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              {t('nav.features', locale)}
            </a>
            <LanguageSwitcher currentLocale={locale} showLabel={false} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left lg:col-span-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title.part1', locale)}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> {t('hero.title.part2', locale)}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                {t('hero.subtitle', locale)}
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="https://chromewebstore.google.com/detail/fmnlflicblkpblclchppkhkjeabjhhhd/preview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('hero.cta.install', locale)}
                </a>
              </div>

            </div>

            {/* Right Side - Intro Video (blended) */}
            <div className="flex justify-center lg:justify-end lg:col-span-2">
              <div className="w-full max-w-4xl">
                <div className="rounded-2xl overflow-hidden bg-white/6 backdrop-blur-sm ring-1 ring-white/20 shadow-sm">
                  <div className="p-4">
                    <div className="w-full rounded-xl overflow-hidden" style={{aspectRatio: '16/9', height: '520px', maxHeight: '60vh'}}>
                      <iframe
                        src="https://www.youtube.com/embed/FWSBsXfT6UM"
                        title="Select Care Demo"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full bg-black/80"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('features.title', locale)}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('features.subtitle', locale)}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Select & Save */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.select.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.select.desc', locale)}</p>
            </div>

            {/* Notes */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.notes.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.notes.desc', locale)}</p>
            </div>

            {/* Learn Vocabulary */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.learn.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.learn.desc', locale)}</p>
            </div>

            {/* Translate */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.translate.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.translate.desc', locale)}</p>
            </div>

            {/* Dictionary */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.dictionary.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.dictionary.desc', locale)}</p>
            </div>

            {/* Export */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('feature.export.title', locale)}</h3>
              <p className="text-gray-700 leading-relaxed">{t('feature.export.desc', locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('howitworks.title', locale)}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('howitworks.step1.title', locale)}</h3>
              <p className="text-gray-600">{t('howitworks.step1.desc', locale)}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('howitworks.step2.title', locale)}</h3>
              <p className="text-gray-600">{t('howitworks.step2.desc', locale)}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('howitworks.step3.title', locale)}</h3>
              <p className="text-gray-600">{t('howitworks.step3.desc', locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src="/logo_select_care.svg" alt="Select Care" className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="text-xl font-bold">Select Care</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Select Care. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
