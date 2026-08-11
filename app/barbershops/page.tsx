import BarbershopItem from "@/app/_components/barbershop-item"
import Header from "@/app/_components/header"
import Search from "@/app/_components/search"
import { db } from "@/app/_lib/prisma"

interface BarbershopsPageProps {
  searchParams: {
    search?: string
    service?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      AND: [
        searchParams.search
          ? {
              name: {
                contains: searchParams.search,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  const title = searchParams.service
    ? `Barbearias com serviço "${searchParams.service}"`
    : searchParams.search
      ? `Resultados para "${searchParams.search}"`
      : "Todas as barbearias"

  return (
    <div>
      <Header />

      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          {title}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
