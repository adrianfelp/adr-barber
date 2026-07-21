import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"
import { Card, CardContent } from "@/app/_components/ui/card"

const BookingItem = () => {
  return (
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
  )
}

export default BookingItem
