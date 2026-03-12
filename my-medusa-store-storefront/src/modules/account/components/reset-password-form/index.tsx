"use client"

import { useActionState, useEffect } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { resetPasswordWithToken } from "@lib/data/customer"
import { useParams, useRouter } from "next/navigation"

type Props = {
  token: string
  email: string
}

async function submitReset(
  _prev: { done?: boolean; error?: string } | null,
  formData: FormData
) {
  const token = String(formData.get("token") ?? "")
  const email = String(formData.get("email") ?? "")
  const countryCode = String(formData.get("countryCode") ?? "in")
  const password = String(formData.get("password") ?? "")
  const res = await resetPasswordWithToken(token, email || null, password, countryCode)
  if (!res.success) return { done: false, error: res.error ?? "Failed to reset password." }
  return { done: true }
}

export default function ResetPasswordForm({ token, email }: Props) {
  const params = useParams<{ countryCode?: string }>()
  const countryCode = (params?.countryCode as string) || "in"
  const router = useRouter()
  const [state, formAction] = useActionState(submitReset, null)

  useEffect(() => {
    if (state?.done) {
      router.push(`/${countryCode}/account`)
    }
  }, [countryCode, router, state?.done])

  if (!token) {
    return (
      <div className="max-w-sm w-full" data-testid="reset-password-invalid">
        <h1 className="text-large-semi uppercase mb-4">Reset password</h1>
        <p className="text-ui-fg-base">
          Invalid or expired reset link. Please request a new one.
        </p>
      </div>
    )
  }

  if (state?.done) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center" data-testid="reset-password-success">
        <h1 className="text-large-semi uppercase mb-6">Password updated</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-6">
          Redirecting you to your account…
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="reset-password-form">
      <h1 className="text-large-semi uppercase mb-6">Reset password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Set a new password for <span className="font-semibold">{email || "your account"}</span>.
      </p>
      <form className="w-full" action={formAction}>
        <input type="hidden" name="token" value={token} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="countryCode" value={countryCode} />
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="New password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            data-testid="reset-password-input"
          />
        </div>
        <ErrorMessage error={state?.error} data-testid="reset-error-message" />
        <SubmitButton className="w-full mt-6" data-testid="reset-submit-button">
          Set new password
        </SubmitButton>
      </form>
    </div>
  )
}

