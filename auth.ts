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
