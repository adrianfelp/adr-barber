"use server"

import { auth } from "@/auth"
import { db } from "@/app/_lib/prisma"

import type { Prisma } from "@/app/generated/prisma/client"

export type BookingWithService = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true
      }
    }
  }
}>

export const getConfirmedBookings = async (): Promise<BookingWithService[]> => {
  const session = await auth()

  if (!session?.user?.id) {
    return []
  }

  return db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
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
      date: "asc",
    },
  })
}
