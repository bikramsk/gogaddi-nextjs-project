import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "GoGaddi — India's Trusted Car Marketplace",
    template: "%s | GoGaddi",
  },
  description:
    "Buy and sell cars with confidence. Explore thousands of verified car listings from top brands. India's trusted car marketplace for new and used cars.",
  icons: {
    icon: "/gogaddi-logo.png",
    shortcut: "/gogaddi-logo.png",
    apple: "/gogaddi-logo.png",
  },
  openGraph: {
    title: "GoGaddi — India's Trusted Car Marketplace",
    description: "Buy and sell cars with confidence. Explore thousands of verified car listings from top brands.",
    type: "website",
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
