import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | GoGaddi",
  description: "How GoGaddi collects, uses, and protects your personal information.",
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
