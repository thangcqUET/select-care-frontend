import { SignIn } from "../components/sign-in";
import Payment from "../components/payment";
import { ExtensionAuthHandler } from "../components/extension-auth-handler";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Extension Authentication Handler */}
      <Suspense fallback={null}>
        <ExtensionAuthHandler />
      </Suspense>
      
      {/* Navigation */}
      <nav className="w-full px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">SelectCare</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Smart Content
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"> Selection</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Organize, save, and sync your favorite content across the web. 
            One click selection, infinite possibilities ✨
          </p>
          
          {/* Chrome Extension CTA - Centered */}
          <div className="flex justify-center mb-8">
            <a 
              href="https://chrome.google.com/webstore/detail/selectcare" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-2xl transition-all duration-300 shadow-2xl hover:scale-105 transform"
            >
              {/* Button content */}
              <div className="relative flex items-center space-x-3">
                {/* Chrome Icon */}
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,20L15.46,14H15.46C15.8,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8.04L8.54,14C8.2,14.6 8,15.27 8,16C8,17.2 8.54,18.27 9.38,19H4.59C4.21,18.07 4,17.06 4,16V12M12,4A8,8 0 0,1 18.93,7.96L15.46,14C14.84,13.4 14,13 13.13,13H8.54C9.46,11.39 10.65,10.04 12.13,9.04L12,4M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                </svg>
                <span>Install Chrome Extension</span>
                {/* Arrow Icon */}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Sign In - Secondary Option */}
          <div className="mb-8">
            <SignIn />
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mb-12">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span>Instant Setup</span>
            </div>
          </div>
          
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid md:grid-cols-3 gap-8 mt-20 scroll-mt-20">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Smart Selection</h3>
            <p className="text-gray-600">Select any content on any website with our intelligent browser extension</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Real-time Sync</h3>
            <p className="text-gray-600">Access your selections anywhere, anytime with seamless cloud synchronization</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Lightning Fast</h3>
            <p className="text-gray-600">Organize and find your content instantly with our powerful search and tagging</p>
          </div>
        </div>
      </section>

      {/* Extension Showcase Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 Get Started in Seconds
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Install our Chrome extension and start selecting content across the web instantly
          </p>
          
          <a 
            href="https://chrome.google.com/webstore/detail/selectcare" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,20L15.46,14H15.46C15.8,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8.04L8.54,14C8.2,14.6 8,15.27 8,16C8,17.2 8.54,18.27 9.38,19H4.59C4.21,18.07 4,17.06 4,16V12M12,4A8,8 0 0,1 18.93,7.96L15.46,14C14.84,13.4 14,13 13.13,13H8.54C9.46,11.39 10.65,10.04 12.13,9.04L12,4M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
            </svg>
            Add to Chrome - It's Free!
          </a>
          
          <p className="text-sm mt-4 opacity-75">
            ⭐ Rated 4.9/5 by 10,000+ users
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600">
            Start free, upgrade when you're ready 🚀
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 max-w-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Plan</h3>
            <div className="text-4xl font-bold text-purple-500 mb-2">$9<span className="text-lg text-gray-500">/mo</span></div>
            <p className="text-gray-600 mb-8">Unlimited selections, advanced features, priority support</p>
            <Payment />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
          <span className="text-lg font-semibold text-gray-900">SelectCare</span>
        </div>
        <p className="text-gray-600">
          Made with 💜 for content creators and knowledge workers
        </p>
      </footer>
    </div>
  );
}
