import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeftIcon, MapPinIcon, StarIcon } from "lucide-react"

import PhoneItem from "@/app/_components/phone-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    notFound()
  }

  return (
    <>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          priority
          className="object-cover"
        />

        <Link href="/">
          <Button
            size="icon"
            variant="secondary"
            className="absolute left-4 top-4"
          >
            <ChevronLeftIcon />
          </Button>
        </Link>

        <div className="absolute right-4 top-4">
          <SidebarSheet variant="secondary" />
        </div>
      </div>

      {/* Informações */}
      <div className="border-b p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon
            size={18}
            className="shrink-0 fill-primary text-primary"
          />

          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon size={18} className="shrink-0 fill-primary text-primary" />

          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2 border-b p-5">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Sobre nós
        </h2>

        <p className="text-justify text-sm leading-6">
          {barbershop.description}
        </p>
      </div>

      {/* Serviços */}
      <div className="space-y-4 border-b p-5">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Serviços
        </h2>

        <div className="space-y-4">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={barbershop}
              service={service}
            />
          ))}
        </div>
      </div>

      {/* Contato */}
      <div className="space-y-4 p-5">
        <h2 className="text-xs font-bold uppercase text-muted-foreground">
          Contato
        </h2>

        <div className="space-y-3">
          {barbershop.phones.map((phone) => (
            <PhoneItem key={phone} phone={phone} />
          ))}
        </div>
      </div>
    </>
  )
}

export default BarbershopPage
