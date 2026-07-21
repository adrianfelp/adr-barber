import Image from "next/image"
import { Search } from "lucide-react"

import Header from "@/app/_components/header"
import BarbershopItem from "@/app/_components/barbershop-item"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Badge } from "@/app/_components/ui/badge"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { db } from "@/app/_lib/prisma"

const Home = async () => {
  // Chamar meu banco de dados
  const barbershops = await db.barbershop.findMany()
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      {/* Header */}
      <Header />

      <main className="p-5">
        {/* Saudação */}
        <section>
          <h2 className="text-xl font-bold">Olá, Adrian!</h2>

          <p className="text-sm text-muted-foreground">
            Quinta-feira, 16 de julho.
          </p>
        </section>

        {/* Busca */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." className="flex-1" />

          <Button size="icon" aria-label="Buscar">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* BUSCA RÁPIDA */}
        <div className="[&:: -webkit-scrollbar]:hidden mt-6 flex gap-3 overflow-x-scroll">
          <Button className="gap-2" variant="secondary">
            <Image src="/cabelo.svg" width={16} height={16} alt="Cabelo" />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="/barba.svg" width={16} height={16} alt="Barba" />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="/acabamento.svg"
              width={16}
              height={16}
              alt="Acabamento"
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="/sobrancelha.svg"
              width={16}
              height={16}
              alt="Sobrancelha"
            />
            Sobrancelha
          </Button>
        </div>

        {/* Banner */}
        <div className="relative mt-6 h-[150px] w-full overflow-hidden rounded-xl">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com ADR Barber"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Agendamentos */}
        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          <Card>
            <CardContent className="flex justify-between p-0">
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

              <div className="flex flex-col items-center justify-center border-l px-5">
                <p className="text-sm">Julho</p>

                <p className="text-2xl font-bold">16</p>

                <p className="text-sm">17:00</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recomendados */}
        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-auto">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
                © 2026 Copyright <span className="font-bold">ADR Barber</span>
              </p>
            </CardContent>
          </Card>
        </footer>
      </main>
    </div>
  )
}

export default Home
