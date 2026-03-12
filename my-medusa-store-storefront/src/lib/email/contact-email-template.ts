/**
 * HTML email template for Contact Us form — form details + metadata.
 * Inline styles for email client compatibility.
 */

export type ContactEmailData = {
  firstName: string
  email: string
  enquiry: string
  phone?: string
  submittedAt: string
  source?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    })
  } catch {
    return iso
  }
}

export function getContactEmailHtml(data: ContactEmailData): string {
  const { firstName, email, enquiry, phone, submittedAt, source } = data
  const enquiryLines = (enquiry || "").trim().split(/\n/).filter(Boolean)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact form – ${escapeHtml(firstName)}</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; margin: 0 auto; background:#ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.15);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e40af 100%); padding: 28px 32px; text-align: center;">
              <h1 style="margin:0; color:#fff; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">GoGaddi</h1>
              <p style="margin: 10px 0 0; color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500;">New contact form submission</p>
            </td>
          </tr>

          <!-- Form details -->
          <tr>
            <td style="padding: 32px 28px 24px;">
              <h2 style="margin: 0 0 20px; color: #0f172a; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">From</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Name</span><br>
                    <strong style="color: #0f172a; font-size: 17px;">${escapeHtml(firstName)}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Email</span><br>
                    <a href="mailto:${escapeHtml(email)}" style="color: #1d4ed8; font-size: 15px; font-weight: 600; text-decoration: none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Phone</span><br>
                    <a href="tel:${escapeHtml(phone)}" style="color: #1d4ed8; font-size: 15px; font-weight: 600; text-decoration: none;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 16px 20px;">
                    <span style="color: #64748b; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;">Message</span><br>
                    <div style="margin-top: 10px; color: #0f172a; font-size: 15px; line-height: 1.6;">${enquiryLines.length ? enquiryLines.map((line) => escapeHtml(line)).join("<br>") : escapeHtml(enquiry || "—")}</div>
                  </td>
                </tr>
              </table>

              <!-- Metadata -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 0;">
                    <span style="color: #94a3b8; font-size: 12px;">Submitted</span><br>
                    <span style="color: #475569; font-size: 13px; font-weight: 500;">${escapeHtml(formatDate(submittedAt))}</span>
                  </td>
                  ${source ? `<td style="padding: 0; text-align: right;"><span style="color: #94a3b8; font-size: 12px;">Source</span><br><span style="color: #475569; font-size: 13px;">${escapeHtml(source)}</span></td>` : ""}
                </tr>
              </table>

              <p style="margin: 24px 0 0;">
                <a href="mailto:${escapeHtml(email)}?subject=Re: Your enquiry to GoGaddi" style="display: inline-block; padding: 12px 24px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px;">Reply to customer</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
              This message was sent via the Contact Us form on GoGaddi.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
