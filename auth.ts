import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/app/_lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Adapter do Prisma
  adapter: PrismaAdapter(db),

  // Provedores de autenticação
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  // Adiciona o ID do usuário à sessão
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
      }

      return session
    },
  },

  // Página de login personalizada
  pages: {
    signIn: "/",
  },

  // Estratégia de sessão
  session: {
    strategy: "jwt",
  },

  // Chave para assinatura dos tokens
  secret: process.env.AUTH_SECRET,
})
