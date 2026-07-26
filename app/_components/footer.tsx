import { Card, CardContent } from "@/app/_components/ui/card"

const Footer = () => {
  return (
    <footer className="mt-8">
      <Card className="rounded-none border-x-0 border-b-0">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Copyright{" "}
            <span className="font-semibold text-foreground">ADR Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
