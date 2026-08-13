"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/app/_components/ui/button"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog"

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => {
    signIn("google")
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Entrar na ADR Barber</DialogTitle>

        <DialogDescription>
          Faça login com sua conta Google para acessar seus agendamentos,
          reservar serviços e acompanhar seu histórico.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="mt-4 w-full gap-2 font-semibold"
        onClick={handleLoginWithGoogleClick}
      >
        <FcGoogle size={20} />
        Continuar com Google
      </Button>
    </>
  )
}

export default SignInDialog
