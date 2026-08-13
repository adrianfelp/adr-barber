"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { isPast, isToday, set, startOfDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

import type {
  Barbershop,
  BarbershopService,
  Booking,
} from "@/app/generated/prisma/client"

import { createBooking } from "@/app/_actions/create-booking"
import { getBookings } from "@/app/_actions/get-bookings"

import BookingSummary from "@/app/_components/booking-summary"
import SignInDialog from "@/app/_components/sign-in-dialog"

import { Button } from "@/app/_components/ui/button"
import { Calendar } from "@/app/_components/ui/calendar"
import { Card, CardContent } from "@/app/_components/ui/card"
import { Dialog, DialogContent } from "@/app/_components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const [hour, minutes] = time.split(":").map(Number)

    const timeIsOnThePast = isPast(
      set(new Date(), {
        hours: hour,
        minutes,
        seconds: 0,
        milliseconds: 0,
      }),
    )

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )

    return !hasBookingOnCurrentTime
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data: session } = useSession()
  const router = useRouter()

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const [selectedDay, setSelectedDay] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string | undefined>()

  const [dayBookings, setDayBookings] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) {
        return
      }

      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }

    fetchBookings()
  }, [selectedDay, service.id])

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) {
      return undefined
    }

    const [hours, minutes] = selectedTime.split(":").map(Number)

    return set(selectedDay, {
      hours,
      minutes,
      seconds: 0,
      milliseconds: 0,
    })
  }, [selectedDay, selectedTime])

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }

    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  const handleBookingClick = () => {
    if (session?.user) {
      setBookingSheetIsOpen(true)
      return
    }

    setSignInDialogIsOpen(true)
  }

  const resetBooking = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
  }

  const handleBookingSheetOpenChange = (open: boolean) => {
    setBookingSheetIsOpen(open)

    if (!open) {
      resetBooking()
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date)
    setSelectedTime(undefined)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    if (!selectedDate) {
      return
    }

    try {
      await createBooking({
        serviceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange(false)

      toast.success("Reserva criada com sucesso!", {
        action: {
          label: "Ver agendamentos",
          onClick: () => router.push("/bookings"),
        },
      })
    } catch (error) {
      console.error(error)

      toast.error("Erro ao criar reserva!")
    }
  }

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* Imagem */}
          <div className="relative h-[110px] w-[110px] shrink-0 overflow-hidden rounded-xl">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Conteúdo */}
          <div className="min-w-0 flex-1 space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>

            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>

            {/* Preço e botão */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="overflow-y-auto px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>

                  {/* Calendário */}
                  <div className="border-b py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      disabled={{
                        before: startOfDay(new Date()),
                      }}
                      className="mx-auto"
                    />
                  </div>

                  {/* Horários */}
                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={
                              selectedTime === time ? "default" : "outline"
                            }
                            className="shrink-0 rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Não há horários disponíveis para este dia.
                        </p>
                      )}
                    </div>
                  )}

                  {/* Resumo */}
                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}

                  {/* Confirmar */}
                  <SheetFooter className="px-5">
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDate}
                    >
                      Confirmar reserva
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Login */}
      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%] sm:max-w-md">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
