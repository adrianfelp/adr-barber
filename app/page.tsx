import Image from "next/image"
import { Search } from "lucide-react"
import Header from "@/app/_components/header"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Adrian!</h2>
        <p>Quinta-feira, 16 de julho.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <Search />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com ADR Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
