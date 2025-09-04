'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Extend the global Window interface to include chrome
declare global {
  interface Window {
    chrome?: {
      runtime?: {
        sendMessage: (extensionId: string, message: any, callback: (response: any) => void) => void;
        lastError?: { message: string };
      };
    };
  }
}

export function ExtensionAuthHandler() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const isExtensionAuth = searchParams.get('extension_auth') === 'true';
    const state = searchParams.get('state');
    
    if (isExtensionAuth && state) {
      handleExtensionAuth(state);
    }
  }, [searchParams]);

  const handleExtensionAuth = async (state: string) => {
    try {
      // Check if user is authenticated
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      
      if (session?.user) {
        // Generate API token for the extension
        const tokenResponse = await fetch('/api/extension/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            state,
            userEmail: session.user.email,
          }),
        });
        
        if (tokenResponse.ok) {
          const { token } = await tokenResponse.json();
          
          // Send authentication data to extension
          if (typeof window !== 'undefined') {
            try {
              // Try to send message to extension using postMessage to a content script
              const extensionId = process.env.NEXT_PUBLIC_EXTENSION_ID || 'your-extension-id';
              
              // Check if chrome extension API is available
              if (window.chrome && window.chrome.runtime && window.chrome.runtime.sendMessage) {
                window.chrome.runtime.sendMessage(extensionId, {
                  action: 'authenticate',
                  token: token,
                  userEmail: session.user.email,
                  state: state
                }, (response: any) => {
                  if (window.chrome?.runtime?.lastError) {
                    console.log('Extension not installed or not responding:', window.chrome.runtime.lastError.message);
                    showExtensionNotFoundMessage();
                  } else if (response?.success) {
                    showSuccessMessage();
                  } else {
                    console.log('Extension auth failed:', response);
                    showErrorMessage();
                  }
                });
              } else {
                // Fallback: try using postMessage to communicate with content script
                console.log('Chrome runtime not available, trying postMessage...');
                
                // Post message to window - content script should listen for this
                window.postMessage({
                  type: 'SELECTCARE_AUTH',
                  action: 'authenticate',
                  token: token,
                  userEmail: session.user.email,
                  state: state
                }, window.location.origin);
                
                // Wait a bit and show success (since we can't get direct feedback via postMessage)
                setTimeout(() => {
                  showSuccessMessage();
                }, 1000);
              }
            } catch (error) {
              console.error('Error communicating with extension:', error);
              showExtensionNotFoundMessage();
            }
          } else {
            showExtensionNotFoundMessage();
          }
        } else {
          showErrorMessage();
        }
      } else {
        // User not authenticated, they need to sign in first
        // The normal sign-in flow will handle this
      }
    } catch (error) {
      console.error('Extension auth error:', error);
      showErrorMessage();
    }
  };

  const showSuccessMessage = () => {
    // Update the page to show success
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
      <div class="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4 shadow-lg">
          <div class="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span class="text-3xl">✅</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Extension Connected! 🎉</h2>
          <p class="text-gray-600 mb-6">Your SelectCare extension is now authenticated and ready to use.</p>
          <button onclick="window.close()" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200">
            Close Tab
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(successMessage);
  };

  const showErrorMessage = () => {
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <div class="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4 shadow-lg">
          <div class="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span class="text-3xl">❌</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Authentication Failed</h2>
          <p class="text-gray-600 mb-6">There was an error connecting your extension. Please try again.</p>
          <button onclick="window.location.reload()" class="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200">
            Try Again
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(errorMessage);
  };

  const showExtensionNotFoundMessage = () => {
    const notFoundMessage = document.createElement('div');
    notFoundMessage.innerHTML = `
      <div class="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
        <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-4 shadow-lg">
          <div class="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span class="text-3xl">🔌</span>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Extension Not Found</h2>
          <p class="text-gray-600 mb-6">Please make sure the SelectCare extension is installed and enabled in your browser.</p>
          <div class="space-y-3">
            <a href="chrome://extensions" class="block px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200">
              Open Extensions Page
            </a>
            <button onclick="window.close()" class="block w-full px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors">
              Close Tab
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notFoundMessage);
  };

  return null; // This component doesn't render anything
}
