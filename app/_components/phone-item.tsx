"use client"

import { useState } from "react"
import { SmartphoneIcon } from "lucide-react"

import { Button } from "@/app/_components/ui/button"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopyPhoneClick = async () => {
    await navigator.clipboard.writeText(phone)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={18} className="shrink-0 text-primary" />

        <p className="text-sm">{phone}</p>
      </div>

      <Button variant="outline" size="sm" onClick={handleCopyPhoneClick}>
        {copied ? "Copiado!" : "Copiar"}
      </Button>
    </div>
  )
}

export default PhoneItem
