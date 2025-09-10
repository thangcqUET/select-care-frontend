'use client';

import { createClient } from '@/lib/supabase/client';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from "react";

export default function Payment() {
  const [paddle, setPaddle] = useState<Paddle>();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
    }).then((p) => {
      setPaddle(p);
    });
    const tempClient = createClient();
    tempClient.auth.getUser().then(({ data: { user } }) => {
      console.log("user");
      console.log(user);
      if (user) {
        setEmail(user.email || "");
        setUserId(user.id);
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });

  }, []);

  const scrollToSignIn = () => {
    // Scroll to the sign-in section
    const signInSection = document.getElementById('sign-in-section');
    if (signInSection) {
      signInSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    } else {
      // Fallback: scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Show toast notification
    setShowToast(true);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const handleCheckout = () => {
    if (!isSignedIn) {
      scrollToSignIn();
      return;
    }
    
    if (!paddle) return alert("Payment system not ready yet! 🔄");
    
    setIsLoading(true);
    console.log("Starting checkout for user:", email, userId);
    paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01k370gthyexsnqn9pe3gf0p7w",
          quantity: 1,
        }
      ],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: 'http://localhost:3001/success',
      },
      customData:{
        email: email,
        user_id: userId
      }
    });
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center">
      {/* Toast Notification */}
          {showToast && (
            <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-4 rounded-lg shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 rounded-full p-1">
                  <span className="text-lg">⚠️</span>
                </div>
                <div>
                  <p className="font-semibold">Sign Up Required</p>
                  <p className="text-sm opacity-90">Please use the magic link above first!</p>
                </div>
              </div>
            </div>
          )}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 max-w-md">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Plan</h3>
        <div className="text-4xl font-bold text-purple-500 mb-2">$9<span className="text-lg text-gray-500">/mo</span></div>
        <p className="text-gray-600 mb-8">Unlimited selections, advanced features, priority support</p>


        
        <div className="w-full">
          

          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : !isSignedIn ? (
              "Sign In Required 🔐"
            ) : (
              "Start Your Journey 🚀"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
