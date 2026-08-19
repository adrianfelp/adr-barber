"use client"

import { useState } from "react"
import Image from "next/image"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

import type { Prisma } from "@/app/generated/prisma/client"

import { deleteBooking } from "@/app/_actions/delete-booking"

import BookingSummary from "@/app/_components/booking-summary"
import PhoneItem from "@/app/_components/phone-item"

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Badge } from "@/app/_components/ui/badge"
import { Button } from "@/app/_components/ui/button"
import { Card, CardContent } from "@/app/_components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet"

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const {
    service: { barbershop },
  } = booking

  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)

      setIsSheetOpen(false)

      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)

      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      {/* Card do agendamento */}
      <SheetTrigger
        render={<Card className="w-full min-w-[90%] cursor-pointer" />}
      >
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}
            >
              {isConfirmed ? "Confirmado" : "Finalizado"}
            </Badge>

            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
              </Avatar>

              <p className="text-sm">{barbershop.name}</p>
            </div>
          </div>

          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", {
                locale: ptBR,
              })}
            </p>

            <p className="text-2xl">
              {format(booking.date, "dd", {
                locale: ptBR,
              })}
            </p>

            <p className="text-sm">
              {format(booking.date, "HH:mm", {
                locale: ptBR,
              })}
            </p>
          </div>
        </CardContent>
      </SheetTrigger>

      {/* Detalhes do agendamento */}
      <SheetContent className="w-[85%] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        {/* Mapa */}
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${barbershop.name}`}
            fill
            className="rounded-xl object-cover"
          />

          <Card className="z-10 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} alt={barbershop.name} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>

                <p className="text-xs text-muted-foreground">
                  {barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informações */}
        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.service}
              selectedDate={booking.date}
            />
          </div>

          {/* Telefones */}
          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        {/* Ações */}
        <SheetFooter className="mt-6">
          <div className="flex w-full items-center gap-3">
            <SheetClose
              render={<Button variant="outline" className="w-full" />}
            >
              Voltar
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger
                  render={<Button variant="destructive" className="w-full" />}
                >
                  Cancelar Reserva
                </DialogTrigger>

                <DialogContent className="w-[90%] sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Deseja cancelar sua reserva?</DialogTitle>

                    <DialogDescription>
                      Ao cancelar, este horário será liberado novamente e a
                      reserva não poderá ser recuperada.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose
                      render={<Button variant="secondary" className="w-full" />}
                    >
                      Voltar
                    </DialogClose>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancelBooking}
                    >
                      Confirmar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
