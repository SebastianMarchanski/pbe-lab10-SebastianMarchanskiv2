import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../lib/prisma"

// Konfiguracja Auth.js
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub, // automatycznie czyta AUTH_GITHUB_ID i AUTH_GITHUB_SECRET
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
  async session({ session, token }) {
    if (token?.sub) {
      session.user.id = token.sub
    }
    return session
  },
  async signIn({ user }) {
    // Sprawdź, czy user.id istnieje – po udanym logowaniu zawsze powinno
    if (!user?.id) {
      console.error("Brak user.id podczas signIn – coś poszło nie tak")
      return true // nadal pozwól na logowanie, ale nie twórz koszyka
    }

    const existingCart = await prisma.cart.findUnique({
      where: { userId: user.id },
    })

    if (!existingCart) {
      await prisma.cart.create({
        data: {
          userId: user.id, // teraz TypeScript wie, że to string
        },
      })
    }

    return true
  },
},
})

