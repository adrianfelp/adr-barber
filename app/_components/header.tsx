import Image from "next/image"

import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Card, CardContent } from "@/app/_components/ui/card"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Image
          src="/logo-adr.png"
          alt="ADR Barber"
          width={120}
          height={18}
          priority
        />

        <SidebarSheet />
      </CardContent>
    </Card>
  )
}

export default Header
