import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Resend } from "resend"

type PasswordResetData = {
  entity_id: string
  token: string
  actor_type: string
}

function getResetEmailHtml(resetUrl: string, email: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Reset your password</title></head>
<body style="font-family: system-ui, sans-serif; padding: 24px; max-width: 480px; margin: 0 auto;">
  <h1 style="color: #0f172a;">Reset your password</h1>
  <p style="color: #475569;">You requested a password reset for ${escapeHtml(email)}.</p>
  <p style="color: #475569;">Click the button below to set a new password:</p>
  <p style="margin: 24px 0;">
    <a href="${escapeHtml(resetUrl)}" style="display: inline-block; padding: 12px 24px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600;">Reset password</a>
  </p>
  <p style="color: #94a3b8; font-size: 12px;">If you didn't request this, you can ignore this email.</p>
  <p style="color: #94a3b8; font-size: 12px;">— GoGaddi</p>
</body>
</html>
  `.trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export default async function passwordResetHandler({
  event: { data },
}: SubscriberArgs<PasswordResetData>) {
  const { entity_id: email, token, actor_type } = data
  if (actor_type !== "customer") return

  const isDev = (process.env.NODE_ENV || "development") !== "production"
  const storefrontUrl =
    process.env.STOREFRONT_URL ||
    process.env.MEDUSA_STOREFRONT_URL ||
    "http://localhost:3000"
  const countryCode = process.env.STOREFRONT_COUNTRY_CODE || "in"
  const resetUrl = `${storefrontUrl.replace(/\/$/, "")}/${countryCode}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`

  // Option A (dev): always print reset link to terminal for manual testing.
  if (isDev) {
    console.info("[password-reset] RESET LINK (dev)", resetUrl)
  }

  // Allow fully disabling Resend email sending (optional).
  const disableEmail = (process.env.PASSWORD_RESET_EMAIL_DISABLED || "").toLowerCase() === "true"
  if (disableEmail) {
    console.warn("[password-reset] Email sending disabled via PASSWORD_RESET_EMAIL_DISABLED=true")
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn("[password-reset] RESEND_API_KEY not set; skipping reset email.")
    return
  }

  const from = process.env.RESEND_FROM || "GoGaddi <onboarding@resend.dev>"

  try {
    console.info("[password-reset] Sending reset email", {
      to: email,
      from,
      resetUrl,
    })
    const resend = new Resend(apiKey)
    const { data: sent, error } = await resend.emails.send({
      from,
      to: email,
      subject: "Reset your password – GoGaddi",
      html: getResetEmailHtml(resetUrl, email),
    })
    if (error) {
      console.error("[password-reset] Resend error:", error)
      if (isDev) {
        console.info("[password-reset] RESET LINK (dev)", resetUrl)
      }
      return
    }
    console.info("[password-reset] Reset email sent", { id: sent?.id, to: email })
  } catch (err) {
    console.error("[password-reset] Failed to send email:", err)
    if (isDev) {
      console.info("[password-reset] RESET LINK (dev)", resetUrl)
    }
  }
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}
