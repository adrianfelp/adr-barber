"use server"

import { auth } from "@/auth"
import { db } from "@/app/_lib/prisma"

import type { BookingWithService } from "@/app/_data/get-confirmed-bookings"

export const getConcludedBookings = async (): Promise<BookingWithService[]> => {
  const session = await auth()

  if (!session?.user?.id) {
    return []
  }

  return db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  })
}
