import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "GoGaddi",
  description: "Find your perfect car.",
}

export default function RootPage() {
  redirect("/us")
}
