import Image from "next/image"
import { Search } from "lucide-react"

import Header from "@/app/_components/header"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        {/* TEXTO */}
        <h2 className="text-xl font-bold">Olá, Adrian!</h2>

        <p className="text-sm text-muted-foreground">
          Quinta-feira, 16 de julho.
        </p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />

          <Button size="icon">
            <Search />
          </Button>
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com ADR Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* AGENDAMENTO */}
        <Card className="mt-6">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>

              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                    alt="Barbearia ADR"
                  />
                </Avatar>

                <p className="text-sm">Barbearia ADR</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Julho</p>

              <p className="text-2xl font-bold">16</p>

              <p className="text-sm">17:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
