import { auth } from "@/app/auth/next";
import { redirect } from "next/navigation";

export default async function SuccessPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl"></div>
            <span className="text-2xl font-bold text-gray-900">SelectCare</span>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl">🎉</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to SelectCare! ✨
          </h1>

          {/* Welcome Message */}
          <p className="text-gray-600 mb-6">
            Hey <span className="font-semibold text-purple-600">{session.user?.email}</span>! 
            Your account is all set up and ready to go.
          </p>

          {/* What's Next */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">What's next?</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <span className="mr-2">📥</span>
                Install our browser extension
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">🎯</span>
                Start selecting amazing content
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">🚀</span>
                Explore premium features
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <a 
              href="/dashboard" 
              className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Go to Dashboard 🏠
            </a>
            
            <a 
              href="/" 
              className="block w-full px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
