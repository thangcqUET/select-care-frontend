import { signIn, auth } from "../auth"
 
export async function SignIn() {
  const session = await auth()
  return (
    <>
      {
        !session ? (
        <form
          action={async (formData) => {
            "use server"
            await signIn("resend", formData)
          }}
        >
          <input type="text" name="email" placeholder="Email" />
          <button type="submit">Signin with Resend</button>
        </form>
        ) : (
          <p>Welcome {session.user?.email}</p>
        )
      }
    </>
  )
}