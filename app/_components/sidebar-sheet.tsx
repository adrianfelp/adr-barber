"use client"

import Image from "next/image"
import Link from "next/link"

import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import { signIn, signOut, useSession } from "next-auth/react"

import { quickSearchOptions } from "@/app/_constants/search"

import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"

interface SidebarSheetProps {
  variant?: "default" | "secondary" | "outline" | "ghost"
}

const SidebarSheet = ({ variant = "outline" }: SidebarSheetProps) => {
  const { data: session } = useSession()

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button size="icon" variant={variant}>
            <MenuIcon size={20} />
          </Button>
        }
      />

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        {/* Usuário */}
        <div className="border-b py-5">
          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "Usuário"}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}

              <div>
                <h2 className="font-semibold">{session.user.name}</h2>

                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold">Olá! Seja bem-vindo.</h2>

                <p className="text-sm text-muted-foreground">
                  Faça login para agendar serviços e acompanhar seus horários.
                </p>
              </div>

              <Dialog>
                <DialogTrigger
                  render={
                    <Button size="icon">
                      <LogInIcon size={18} />
                    </Button>
                  }
                />

                <DialogContent className="w-[90%] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Entrar na ADR Barber</DialogTitle>

                    <DialogDescription>
                      Faça login com sua conta Google para acessar seus
                      agendamentos, reservar serviços e acompanhar seu
                      histórico.
                    </DialogDescription>
                  </DialogHeader>

                  <Button
                    variant="outline"
                    className="mt-4 w-full gap-2 font-semibold"
                    onClick={() => signIn("google")}
                  >
                    <FcGoogle size={20} />
                    Continuar com Google
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Navegação */}
        <div className="flex flex-col gap-2 border-b py-5">
          <SheetClose
            render={<Button variant="ghost" className="justify-start gap-2" />}
          >
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon size={18} />
              Início
            </Link>
          </SheetClose>

          <Button variant="ghost" className="justify-start gap-2">
            <CalendarIcon size={18} />
            Agendamentos
          </Button>
        </div>

        {/* Serviços */}
        <div className="flex flex-col gap-2 border-b py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose
              key={option.title}
              render={
                <Button variant="ghost" className="justify-start gap-2" />
              }
            >
              <Link
                href={`/barbershops?service=${encodeURIComponent(option.title)}`}
                className="flex items-center gap-2"
              >
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={18}
                  height={18}
                />

                {option.title}
              </Link>
            </SheetClose>
          ))}
        </div>

        {/* Conta */}
        <div className="flex flex-col gap-2 py-5">
          {session?.user && (
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => signOut()}
            >
              <LogInIcon size={18} />
              Sair da conta
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarSheet
