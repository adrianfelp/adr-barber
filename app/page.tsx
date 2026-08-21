import Image from "next/image"
import Link from "next/link"

import { auth } from "@/auth"

import BarbershopItem from "@/app/_components/barbershop-item"
import BookingItem from "@/app/_components/booking-item"
import Header from "@/app/_components/header"
import Search from "@/app/_components/search"
import { Button } from "@/app/_components/ui/button"
import { quickSearchOptions } from "@/app/_constants/search"
import { db } from "@/app/_lib/prisma"

const Home = async () => {
  const session = await auth()

  const barbershops = await db.barbershop.findMany()

  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = session?.user?.id
    ? await db.booking.findMany({
        where: {
          userId: session.user.id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      <Header />

      <main className="mx-auto w-full max-w-7xl px-5 py-5 md:px-8 lg:px-10">
        {/* Saudação */}
        <section>
          <h2 className="text-xl font-bold md:text-2xl">
            Olá, {session?.user?.name?.split(" ")[0] ?? "visitante"}!
          </h2>

          <p className="text-sm text-muted-foreground">
            Quinta-feira, 16 de julho.
          </p>
        </section>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* Busca rápida */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Link
              key={option.title}
              href={`/barbershops?service=${encodeURIComponent(option.title)}`}
              className="shrink-0"
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

        {/* Conteúdo principal centralizado */}
        <div className="mx-auto w-full max-w-[1050px]">
          {/* Banner */}
          <div className="mt-6 w-full">
            <Image
              src="/banner.png"
              alt="Agende nos melhores com ADR Barber"
              width={700}
              height={300}
              priority
              className="h-auto w-full rounded-xl object-contain"
            />
          </div>

          {/* Agendamentos */}
          {confirmedBookings.length > 0 && (
            <section>
              <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
                Agendamentos
              </h2>

              <div className="flex gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="w-[320px] shrink-0 sm:w-[360px] lg:w-[400px]"
                  >
                    <BookingItem booking={booking} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recomendados */}
          <section>
            <h2 className="mb-3 mt-8 text-xs font-bold uppercase text-muted-foreground">
              Recomendados
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
              {barbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </section>

          {/* Populares */}
          <section>
            <h2 className="mb-3 mt-8 text-xs font-bold uppercase text-muted-foreground">
              Populares
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-1 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible xl:grid-cols-5 [&::-webkit-scrollbar]:hidden">
              {popularBarbershops.map((barbershop) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
