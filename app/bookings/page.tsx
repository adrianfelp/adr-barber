import { redirect } from "next/navigation"

import { auth } from "@/auth"

import BookingItem from "@/app/_components/booking-item"
import Header from "@/app/_components/header"
import { getConfirmedBookings } from "@/app/_data/get-confirmed-bookings"
import { getConcludedBookings } from "@/app/_data/get-concluded-bookings"

const BookingsPage = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/")
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <main className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Você ainda não possui agendamentos.
          </p>
        )}

        {/* Confirmados */}
        {confirmedBookings.length > 0 && (
          <section>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
              Confirmados
            </h2>

            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        {/* Finalizados */}
        {concludedBookings.length > 0 && (
          <section>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-muted-foreground">
              Finalizados
            </h2>

            <div className="space-y-3">
              {concludedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  )
}

export default BookingsPage
