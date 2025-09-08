'use client';

import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from "react";

export default function Payment() {
  const [paddle, setPaddle] = useState<Paddle>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initializePaddle({
      environment: 'sandbox',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!
    }).then((p) => {
      setPaddle(p);
    });
  }, []);

  const handleCheckout = () => {
    if (!paddle) return alert("Payment system not ready yet! 🔄");
    
    setIsLoading(true);
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
        successUrl: 'http://localhost:3001/success'
      }
    });
    setIsLoading(false);
  }

  return (
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
      ) : (
        "Start Your Journey 🚀"
      )}
    </button>
  );
}
