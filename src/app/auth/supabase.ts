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

export const signIn = async (email: string, extension_auth: boolean, state: string) => {
    const supabase = await createClient();
    // Lấy origin từ headers
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const origin = `${protocol}://${host}`;
    // Gửi email xác thực với redirectTo
    const referer = origin + (extension_auth ? `?extension_auth=true&state=${state}` : '/');
    console.log("Sign-in referer:", referer);
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options:{
            emailRedirectTo: `${referer}`
        }
    });
    if (error) {
        console.error("Error signing in:", error);
        return null;
    }
    return data;
}