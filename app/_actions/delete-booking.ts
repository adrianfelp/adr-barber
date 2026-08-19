"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { db } from "@/app/_lib/prisma"

export const deleteBooking = async (bookingId: string) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado")
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  })

  if (!booking) {
    throw new Error("Reserva não encontrada")
  }

  if (booking.userId !== session.user.id) {
    throw new Error("Você não tem permissão para cancelar esta reserva")
  }

  await db.booking.delete({
    where: {
      id: bookingId,
    },
  })

  revalidatePath("/bookings")
}
