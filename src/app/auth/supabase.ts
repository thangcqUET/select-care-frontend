// gen auth function to get user(session), signin function in supabase
import { createClient } from "../../lib/supabase/server"
import { headers } from "next/headers"
export const auth = async () => {
    const supabase = await createClient();
    const { data: { user  }, error } = await supabase.auth.getUser();
    if (error) {
        console.log("User not found");
        return null;
    }
    return user

}

export const signIn = async (email: string) => {
    const supabase = await createClient();
    // Lấy origin từ headers
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;
   
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options:{
            emailRedirectTo: `${origin}`
        }
    });
    if (error) {
        console.error("Error signing in:", error);
        return null;
    }
    return data;
}