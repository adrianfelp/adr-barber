"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { db } from "@/app/_lib/prisma"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async ({
  serviceId,
  date,
}: CreateBookingParams) => {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error("Usuário não autenticado")
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    throw new Error("Usuário não encontrado")
  }

  await db.booking.create({
    data: {
      serviceId,
      date,
      userId: user.id,
    },
  })

  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
