import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub],  // automatycznie użyje AUTH_GITHUB_ID i AUTH_GITHUB_SECRET
  secret: process.env.AUTH_SECRET,
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