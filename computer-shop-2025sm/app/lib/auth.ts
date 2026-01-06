import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  trustHost: true,  // <--- KLUCZOWE na Vercelu
  callbacks: {
    async session({ session, token }) {
      if (token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    async signIn({ user }) {
      if (!user.id) return true

      const existingCart = await prisma.cart.findUnique({
        where: { userId: user.id },
      })

      if (!existingCart) {
        await prisma.cart.create({
          data: { userId: user.id },
        })
      }
      return true
    },
  },
})