import NextAuth from "next-auth"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Resend({
        from: "no-reply@tononla.com",
    })],
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 90, // 90 days
    },
    pages: {
        verifyRequest: "/api/auth/verify-request",
    },
})