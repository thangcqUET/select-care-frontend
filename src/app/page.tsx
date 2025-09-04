import { SignIn } from "./components/sign-in";
import Payment from "./components/payment";
import { ExtensionAuthHandler } from "./components/extension-auth-handler";
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
          
          {/* Sign In Component */}
          <div className="mb-8">
            <SignIn />
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
