"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import SignInDialog from "@/app/_components/sign-in-dialog"
import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogContent,
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
import { quickSearchOptions } from "@/app/_constants/search"

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

              <div className="min-w-0">
                <h2 className="truncate font-semibold">{session.user.name}</h2>

                <p className="truncate text-sm text-muted-foreground">
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
                  <SignInDialog />
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

          <SheetClose
            render={<Button variant="ghost" className="justify-start gap-2" />}
          >
            <Link href="/bookings" className="flex items-center gap-2">
              <CalendarIcon size={18} />
              Agendamentos
            </Link>
          </SheetClose>
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
        {session?.user && (
          <div className="flex flex-col gap-2 py-5">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => signOut()}
            >
              <LogInIcon size={18} />
              Sair da conta
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default SidebarSheet
