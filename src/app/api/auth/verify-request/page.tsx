export default function VerifyRequest() {
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

        {/* Main Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl">📧</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Check Your Email! ✨
          </h1>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            We've sent you a magic link! Click the link in your email to sign in to your SelectCare account.
          </p>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">What's next?</h3>
            <ol className="text-sm text-gray-600 text-left space-y-1">
              <li>1. Check your inbox (and spam folder just in case)</li>
              <li>2. Click the magic link in the email</li>
              <li>3. You'll be automatically signed in! 🎉</li>
            </ol>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500">
            The link will expire in 24 hours for security reasons.
          </p>

          {/* Back to Home Link */}
          <div className="mt-8">
            <a 
              href="/" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium"
            >
              ← Back to home
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Didn't receive an email? Check your spam folder or try again.
        </p>
      </div>
    </div>
  );
}
