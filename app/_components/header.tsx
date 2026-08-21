import Image from "next/image"

import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Card, CardContent } from "@/app/_components/ui/card"

const Header = () => {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <CardContent className="p-0">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8 lg:px-10">
          <Image
            src="/logo-adr.png"
            alt="ADR Barber"
            width={120}
            height={18}
            priority
            className="h-auto w-[100px] md:w-[120px]"
          />

          <SidebarSheet />
        </div>
      </CardContent>
    </Card>
  )
}

export default Header
