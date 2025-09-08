'use client';

import { useState } from 'react';
import Payment from '@/components/payment';

interface PricingPlanCardProps {
  currentPlan: 'FREE' | 'PREMIUM';
  subscription?: {
    subscription_id: string;
    subscription_status: string;
    price_id: string | null;
    created_at: string;
  } | null;
  user: {
    id: string;
    email: string;
  };
}

export function PricingPlanCard({ currentPlan, subscription, user }: PricingPlanCardProps) {
  const [isManaging, setIsManaging] = useState(false);

  const planFeatures = {
    FREE: {
      name: 'Free Plan',
      price: '$0',
      period: 'forever',
      features: [
        '10 selections per day',
        'Basic organization',
        'Web access',
        'Email support'
      ],
      color: 'gray',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    PREMIUM: {
      name: 'Premium Plan',
      price: '$9',
      period: 'per month',
      features: [
        'Unlimited selections',
        'Advanced organization',
        'Priority support',
        'Chrome extension',
        'Export functionality',
        'Advanced search'
      ],
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  };

  const plan = planFeatures[currentPlan];

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <div className={`${plan.bgColor} ${plan.borderColor} border rounded-xl p-6`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Current Plan
          </h3>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            currentPlan === 'PREMIUM' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {plan.name}
          </div>
          
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            <span className="text-gray-600 ml-1">/{plan.period}</span>
          </div>

          {subscription && (
            <div className="text-sm text-gray-600 mb-4">
              <p>Status: <span className="font-medium capitalize">{subscription.subscription_status}</span></p>
              <p>Since: {new Date(subscription.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <ul className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="space-y-3">
          {currentPlan === 'FREE' ? (
            <Payment />
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => setIsManaging(!isManaging)}
                className="w-full bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium"
              >
                Manage Subscription
              </button>
              
              {isManaging && (
                <div className="bg-white border rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-600">
                    To manage your subscription, please contact support or visit your Paddle account.
                  </p>
                  <a
                    href="mailto:support@selectcare.com"
                    className="inline-flex items-center text-sm text-purple-600 hover:text-purple-800"
                  >
                    Contact Support
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Plan Comparison</h4>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Daily Selections</span>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {currentPlan === 'FREE' ? '10' : 'Unlimited'}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Chrome Extension</span>
            <div className="text-right">
              <span className={`text-sm ${currentPlan === 'PREMIUM' ? 'text-green-600' : 'text-gray-400'}`}>
                {currentPlan === 'PREMIUM' ? '✓' : '✗'}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Advanced Search</span>
            <div className="text-right">
              <span className={`text-sm ${currentPlan === 'PREMIUM' ? 'text-green-600' : 'text-gray-400'}`}>
                {currentPlan === 'PREMIUM' ? '✓' : '✗'}
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-600">Priority Support</span>
            <div className="text-right">
              <span className={`text-sm ${currentPlan === 'PREMIUM' ? 'text-green-600' : 'text-gray-400'}`}>
                {currentPlan === 'PREMIUM' ? '✓' : '✗'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
