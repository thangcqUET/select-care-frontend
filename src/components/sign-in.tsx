// import { signIn, auth } from "../auth/next"
import { redirect } from "next/navigation"
import { signIn, auth } from "../app/auth/supabase"

export async function SignIn({ searchParams }: { searchParams: any }) {
  const user = await auth();
  const { extension_auth, state } = await searchParams;
  //get extension_auth and state from url params

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
          {/* Gradient border wrapper for a more impressive border */}
          <div className="rounded-3xl p-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-rose-300 shadow-lg">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-sm border border-white/60">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <label className="relative flex-1">
                <input
                  type="email"
                  name="email"
                  required
                  className="peer w-full px-6 pt-6 pb-4 rounded-2xl border border-gray-200 bg-white/90 focus:outline-none focus:shadow-[0_6px_24px_rgba(99,102,241,0.12)] transition-shadow duration-200 text-lg"
                />
                <span className="pointer-events-none absolute left-6 top-4 text-gray-500 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-purple-600 peer-valid:top-2 peer-valid:text-xs">
                  Email address
                </span>
                {/* success indicator when input has content (CSS-only) */}
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 text-lg peer-valid:block hidden">
                  ✓
                </span>
              </label>

              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap self-center"
              >
                Get Magic Link ✨
              </button>
            </div>

            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">No spam, no passwords - just a link to your inbox to Sign in.</p>
            </div>
            </div>
          </div>
        </form>
        ) : (
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-100">
            <p className="text-gray-700">
              Welcome back, <span className="font-medium text-purple-600">{user?.email}</span> ✨
            </p>
          </div>
        )
      }
    </>
  )
}