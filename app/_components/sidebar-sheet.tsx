import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, HomeIcon, LogInIcon, MenuIcon } from "lucide-react"

import { quickSearchOptions } from "@/app/_constants/search"

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
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
        <div className="flex items-center gap-3 border-b py-5">
          <Avatar>
            <AvatarImage
              src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0"
              alt="Adrian Felipe"
            />
          </Avatar>

          <div>
            <p className="font-bold">Adrian Felipe</p>
            <p className="text-xs text-muted-foreground">adrian@gmail.com</p>
          </div>
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

        {/* Busca rápida */}
        <div className="flex flex-col gap-2 border-b py-5">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant="ghost"
              className="justify-start gap-2"
            >
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={18}
                height={18}
              />

              {option.title}
            </Button>
          ))}
        </div>

        {/* Conta */}
        <div className="flex flex-col gap-2 py-5">
          <Button variant="ghost" className="justify-start gap-2">
            <LogInIcon size={18} />
            Sair da conta
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SidebarSheet
