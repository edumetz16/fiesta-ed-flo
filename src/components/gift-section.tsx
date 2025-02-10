"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function GiftSection() {
  const bankDetails = {
    accountName: "Edu & Floppy",
    iban: "ES00 0000 0000 0000 0000 0000",
    swift: "XXXXX",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <Card className="max-w-md mx-auto p-6 bg-white">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-medium">Account Name</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{bankDetails.accountName}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.accountName)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">IBAN</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{bankDetails.iban}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.iban)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-medium">SWIFT/BIC</p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-muted-foreground">{bankDetails.swift}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.swift)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

