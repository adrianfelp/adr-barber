import Image from "next/image"
import Link from "next/link"
import { StarIcon } from "lucide-react"

import type { Barbershop } from "@/app/generated/prisma/client"

import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"

type Props = {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: Props) => {
  return (
    <Card className="w-[167px] shrink-0 rounded-2xl lg:w-full">
      <CardContent className="p-1">
        {/* Imagem */}
        <div className="relative h-[159px] w-full lg:h-[190px]">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-2xl object-cover"
          />

          <Badge
            variant="secondary"
            className="absolute left-2 top-2 flex items-center gap-1 rounded-full"
          >
            <StarIcon size={12} className="fill-primary text-primary" />

            <span className="text-xs font-semibold">5,0</span>
          </Badge>
        </div>

        {/* Texto */}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>

          <p className="truncate text-sm text-muted-foreground">
            {barbershop.address}
          </p>

          <Link href={`/barbershops/${barbershop.id}`} className="block">
            <Button variant="secondary" className="mt-3 w-full">
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
