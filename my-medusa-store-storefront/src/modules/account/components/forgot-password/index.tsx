"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { requestResetPassword } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

async function submitForgot(
  _prev: { done?: boolean; error?: string } | null,
  formData: FormData
) {
  const email = String(formData.get("email") ?? "").trim()
  const res = await requestResetPassword(email)
  if (!res.success) return { done: false, error: res.error ?? "Failed to request reset." }
  return { done: true }
}

export default function ForgotPassword({ setCurrentView }: Props) {
  const [state, formAction] = useActionState(submitForgot, null)

  if (state?.done) {
    return (
      <div className="max-w-sm w-full flex flex-col items-center" data-testid="forgot-password-success">
        <h1 className="text-large-semi uppercase mb-6">Forgot password</h1>
        <p className="text-center text-base-regular text-ui-fg-base mb-6">
          If an account exists for that email, you’ll receive a reset link shortly.
        </p>
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline text-small-regular text-ui-fg-base"
        >
          Back to sign in
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-sm w-full flex flex-col items-center" data-testid="forgot-password-form">
      <h1 className="text-large-semi uppercase mb-6">Forgot password</h1>
      <p className="text-center text-base-regular text-ui-fg-base mb-8">
        Enter your email and we’ll send you a reset link.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            data-testid="forgot-email-input"
          />
        </div>
        <ErrorMessage error={state?.error} data-testid="forgot-error-message" />
        <SubmitButton className="w-full mt-6" data-testid="forgot-submit-button">
          Send reset link
        </SubmitButton>
      </form>
      <button
        type="button"
        onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
        className="underline text-small-regular text-ui-fg-base mt-6"
        data-testid="forgot-back-button"
      >
        Back to sign in
      </button>
    </div>
  )
}

