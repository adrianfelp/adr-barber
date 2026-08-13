import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import type {
  Barbershop,
  BarbershopService,
} from "@/app/generated/prisma/client"

import { Card, CardContent } from "@/app/_components/ui/card"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectedDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectedDate,
}: BookingSummaryProps) => {
  return (
    <Card>
      <CardContent className="space-y-3 p-3">
        {/* Serviço e preço */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-bold">{service.name}</h2>

          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>

        {/* Data */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-muted-foreground">Data</h2>

          <p className="text-sm">
            {format(selectedDate, "d 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
        </div>

        {/* Horário */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-muted-foreground">Horário</h2>

          <p className="text-sm">{format(selectedDate, "HH:mm")}</p>
        </div>

        {/* Barbearia */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm text-muted-foreground">Barbearia</h2>

          <p className="text-right text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
