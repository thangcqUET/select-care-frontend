import React from 'react';
import Link from 'next/link';
import { ExtensionAuthHandler } from "../components/extension-auth-handler";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Suspense } from "react";
import { getCurrentLocale } from "../lib/i18n";

export default function Home() {
  const currentLocale = getCurrentLocale();
  
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
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
            {/* <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a> */}
            {/* <div className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              Coming Soon
            </div> */}
            <LanguageSwitcher currentLocale={currentLocale} showLabel={false} />
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
                Select your interest,
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> shape your insight</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Capture, organize, and rediscover the bits of the web that matter to you. Export your selections to Notion, Quizlet, Anki and many other apps.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="https://chromewebstore.google.com/detail/fmnlflicblkpblclchppkhkjeabjhhhd/preview" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Add to Chrome
                </a>
              </div>

            </div>

            {/* Right Side - Intro Video (blended) */}
            <div className="flex justify-center lg:justify-end lg:col-span-2">
              <div className="w-full max-w-4xl">
                <div className="rounded-2xl overflow-hidden bg-white/6 backdrop-blur-sm ring-1 ring-white/20 shadow-sm">
                  <div className="p-4">
                    {/* <div className="flex items-center justify-between mb-2 px-1">
                      <div className="text-sm font-semibold text-white/90">Watch demo</div>
                      <div className="text-xs text-white/70">2:15</div>
                    </div> */}
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
                    {/* <div className="mt-3 text-center px-1">
                      <div className="text-sm font-medium text-white/90">See how Select Care captures selections in one click</div>
                      <div className="text-xs text-white/70 mt-1">Quick walkthrough of core features</div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Section (moved below Hero) */}
      {/* <section id="sign-in-section" className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SignIn searchParams={searchParams} />
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Features for Web Users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collect knowledge in a simpler way
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Feature list — each card leaves room for a GIF or image later */}
            <ul className="grid sm:grid-cols-2 gap-6">
              <li className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {/* <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="save demo" className="w-full md:w-2/3 h-72 md:h-96 object-cover rounded-lg flex-shrink-0" /> */}
                <div className="md:w-1/3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Save with one click</h3>
                  <p className="text-gray-600">Save interesting content instantly — keep what matters in one place.</p>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {/* <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnN1cXBmdnJpbnNxOTZ6czh5M3dvbnVldjdlM3E3eGE5ZmtiNWxtcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A7nhHIgsMMyCqnsLKU/giphy.gif" alt="learn demo" className="w-full md:w-2/3 h-72 md:h-96 object-cover rounded-lg flex-shrink-0" /> */}
                <div className="md:w-1/3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Turn selections into lessons</h3>
                  <p className="text-gray-600">Create quick language lessons or study cards from your selections.</p>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {/* <img src="https://media.giphy.com/media/26gsgI6FCn6nY/giphy.gif" alt="manage demo" className="w-full md:w-2/3 h-72 md:h-96 object-cover rounded-lg flex-shrink-0" /> */}
                <div className="md:w-1/3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage what you save</h3>
                  <p className="text-gray-600">Organize, tag, and find your saved content with simple tools.</p>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {/* <img src="https://media.giphy.com/media/xT0GqF0wY9XQ/giphy.gif" alt="export demo" className="w-full md:w-2/3 h-72 md:h-96 object-cover rounded-lg flex-shrink-0" /> */}
                <div className="md:w-1/3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Export to your apps</h3>
                  <p className="text-gray-600">Send selections to Notion, Quizlet, Anki and many other apps in one click.</p>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                {/* <img src="https://media.giphy.com/media/3ohhwF34cGDoFFhRfy/giphy.gif" alt="updates demo" className="w-full md:w-2/3 h-72 md:h-96 object-cover rounded-lg flex-shrink-0" /> */}
                <div className="md:w-1/3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Actively improved...</h3>
                  <p className="text-gray-600">We keep shipping updates and new integrations to make Select Care better.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      {/* <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you&apos;re ready
            </p>
          </div>
          
          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Plan</h3>
              <div className="text-5xl font-bold text-gray-900 mb-2">
                $9<span className="text-xl text-gray-500 font-normal">/month</span>
              </div>
              <p className="text-gray-600 mb-8">Everything you need to organize the web</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Unlimited selections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">AI-powered organization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Priority support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-gray-700">Advanced search & filters</span>
                </div>
              </div>
              
              <Payment />
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <img src="/logo_select_care.svg" alt="Select Care" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold text-gray-900">Select Care</span>
            </div>
            <p className="text-gray-600 mb-6">
              Made with care for content creators and knowledge workers
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <Link href="/privacy" className="hover:text-gray-700 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-700 transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-gray-700 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
