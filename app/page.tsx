import Image from "next/image"
import Link from "next/link"

import BarbershopItem from "@/app/_components/barbershop-item"
import BookingItem from "@/app/_components/booking-item"
import Header from "@/app/_components/header"
import Search from "@/app/_components/search"
import { Button } from "@/app/_components/ui/button"
import { quickSearchOptions } from "@/app/_constants/search"
import { db } from "@/app/_lib/prisma"

const Home = async () => {
  const barbershops = await db.barbershop.findMany()

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
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
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Link
              key={option.title}
              href={`/barbershops?service=${encodeURIComponent(option.title)}`}
            >
              <Button variant="secondary" className="gap-2">
                <Image
                  src={option.imageUrl}
                  alt={option.title}
                  width={16}
                  height={16}
                />

                {option.title}
              </Button>
            </Link>
          ))}
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

        <BookingItem />

        {/* Recomendados */}
        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Recomendados
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        {/* Populares */}
        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Populares
          </h2>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
