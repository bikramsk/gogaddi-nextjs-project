import type { Metadata } from "next"
import ResetPasswordForm from "@modules/account/components/reset-password-form"

export const metadata: Metadata = {
  title: "Reset password | GoGaddi",
  description: "Set a new password for your account.",
}

type Props = {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams
  const token = params.token ?? ""
  const email = params.email ?? ""

  return (
    <div className="content-container py-12 flex justify-center">
      <ResetPasswordForm token={token} email={email} />
    </div>
  )
}

