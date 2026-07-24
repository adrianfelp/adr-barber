import Image from "next/image"

import type { BarbershopService } from "@/app/generated/prisma/client"

import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          {/* Imagem */}
          <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* Conteúdo */}
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>

            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>

            {/* Preço e botão */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Button variant="secondary" size="sm">
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
