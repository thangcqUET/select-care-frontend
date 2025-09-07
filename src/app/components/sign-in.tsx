// import { signIn, auth } from "../auth/next"
import { redirect } from "next/navigation"
import { signIn, auth } from "../auth/supabase"

export async function SignIn() {
  const user = await auth();
  return (
    <>
      {
        !user ? (
        <form
          action={async (formData) => {
            "use server"
            await signIn(formData.get("email") as string)
            redirect("/api/auth/verify-request")
          }}
          className="w-full max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-900 text-lg"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Get Magic Link ✨
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center">
            No spam, no passwords, just pure magic 🪄
          </p>
        </form>
        ) : (
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome back!</h3>
            <p className="text-gray-600">Hey there, <span className="font-medium text-purple-600">{user?.email}</span></p>
            <p className="text-sm text-gray-500 mt-4">You're ready to start selecting amazing content! 🎉</p>
          </div>
        )
      }
    </>
  )
}