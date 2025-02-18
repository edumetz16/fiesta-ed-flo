"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export default function GiftSection() {
  const bankDetails = {
    accountName: "Edu & Floppy",
    cbu: "0720203488000036654204",
    alias: "Shanlymetzgers",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }

  return (
    <Card className="max-w-md mx-auto p-6 bg-white">
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-xl font-bold">Cuenta corriente ($ o U$S)</p>
          {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-lg text-muted-foreground">{bankDetails.accountName}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.accountName)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>

            <p className="font-medium">Alias</p>
            </div>
            <div className="flex">
            <p className="text-xl text-muted-foreground">{bankDetails.alias}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.alias)}>
              <Copy className="h-4 w-4" />
            </Button>

            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>

          <p className="font-medium">CBU</p>
            </div>
            <div className="flex">

            <p className="text-xl text-muted-foreground">{bankDetails.cbu}</p>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(bankDetails.cbu)}>
              <Copy className="h-4 w-4" />
            </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

