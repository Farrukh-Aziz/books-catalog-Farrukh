import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"

function hasId(value: unknown): value is { id: string } {
  return typeof value === "object" && value !== null && "id" in value
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && hasId(user)) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (typeof token.id === "string") {
        // session.user is guaranteed to exist in our app
        ;(session.user as { id?: string }).id = token.id
      }
      return session
    }
  }
}
