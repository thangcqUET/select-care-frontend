// import { signIn, auth } from "../auth/next"
import { redirect } from "next/navigation"
import { signIn, auth } from "../app/auth/supabase"

export async function SignIn({ searchParams }: { searchParams: any }) {
  const user = await auth();
  const { extension_auth, state } = await searchParams;
  //get extension_auth and state from url params
  console.log("Search Params in SignIn:");
  console.log({ extension_auth, state });

  return (
    <>
      {
        !user ? (
        <form
          action={async (formData) => {
            "use server"
            await signIn(formData.get("email") as string, extension_auth, state)
            redirect("/api/auth/verify-request")
          }}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-stretch">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 px-8 py-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500 text-gray-900 text-lg"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap"
            >
              Get Magic Link ✨
            </button>
          </div>
          <p className="text-sm text-gray-500 text-center mt-3">
            No spam, no passwords, just pure magic 🪄
          </p>
        </form>
        ) : (
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-gray-700">
              Welcome back, <span className="font-medium text-purple-600">{user?.email}</span> ✨
            </p>
          </div>
        )
      }
    </>
  )
}