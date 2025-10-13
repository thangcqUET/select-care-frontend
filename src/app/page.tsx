import { SignIn } from "../components/sign-in";
import Payment from "../components/payment";
import { ExtensionAuthHandler } from "../components/extension-auth-handler";
import { Suspense } from "react";

export default function Home({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">SelectCare</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Pricing</a>
            <div className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
              Coming Soon
            </div>
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Smart Content
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Selection</span>
                <br />for Web
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                Organize, save, and sync your favorite content across the web with our intelligent browser extension. One click selection, infinite possibilities.
              </p>
              
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="https://chrome.google.com/webstore/detail/selectcare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,20L15.46,14H15.46C15.8,13.4 16,12.73 16,12C16,10.8 15.46,9.73 14.62,9H19.41C19.79,9.93 20,10.94 20,12A8,8 0 0,1 12,20M4,12C4,10.54 4.39,9.18 5.07,8.04L8.54,14C8.2,14.6 8,15.27 8,16C8,17.2 8.54,18.27 9.38,19H4.59C4.21,18.07 4,17.06 4,16V12M12,4A8,8 0 0,1 18.93,7.96L15.46,14C14.84,13.4 14,13 13.13,13H8.54C9.46,11.39 10.65,10.04 12.13,9.04L12,4M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8Z"/>
                  </svg>
                  Add to Chrome
                </a>
                
                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  <span className="mr-2">▶</span>
                  Watch Demo
                </button>
              </div>

              {/* Sign In Section is moved below the hero to keep CTA area clean */}

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-medium">100% Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-medium">Instant Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="font-medium">No Registration Required</span>
                </div>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                {/* Main Browser Mockup */}
                <div className="bg-white rounded-3xl shadow-2xl p-1 transform rotate-2">
                  <div className="bg-gray-50 rounded-2xl p-6">
                    {/* Browser Header */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex space-x-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-lg px-3 py-1">
                        <div className="text-xs text-gray-400">selectcare.com</div>
                      </div>
                    </div>
                    
                    {/* Content Selection Visual */}
                    <div className="space-y-3">
                      <div className="h-4 bg-purple-200 rounded-lg w-3/4"></div>
                      <div className="h-4 bg-pink-200 rounded-lg w-full"></div>
                      <div className="h-4 bg-purple-200 rounded-lg w-2/3"></div>
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white text-center transform -rotate-1">
                        <div className="text-sm font-semibold">✨ Selected Content</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🔄</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign In Section (moved below Hero) */}
      <section id="sign-in-section" className="py-8 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SignIn searchParams={searchParams} />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Web Users
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to organize and manage your web content efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                Select any content on any website with our intelligent browser extension. AI-powered recognition for better organization.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Sync</h3>
              <p className="text-gray-600 leading-relaxed">
                Access your selections anywhere, anytime with seamless cloud synchronization across all your devices.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize and find your content instantly with our powerful search and AI-powered tagging system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Install Extension</h3>
              <p className="text-gray-600">
                Add SelectCare to your Chrome browser with one click. No setup required.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Select Content</h3>
              <p className="text-gray-600">
                Highlight text, images, or entire sections on any website. We&apos;ll handle the rest.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Access Anywhere</h3>
              <p className="text-gray-600">
                Find your saved content instantly across all devices with smart organization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
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
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">SelectCare</span>
            </div>
            <p className="text-gray-600 mb-6">
              Made with care for content creators and knowledge workers
            </p>
            <div className="flex justify-center space-x-6 text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
