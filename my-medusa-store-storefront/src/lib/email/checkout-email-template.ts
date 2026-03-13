/**
 * HTML email templates for checkout — admin notification and customer confirmation.
 * Inline styles for email client compatibility.
 */

export type CheckoutEmailData = {
  order_id?: string | null
  order_display_id?: number | null
  car: {
    name: string
    brand?: string | null
    price?: string | null
    city?: string | null
    fuel_type?: string | null
    transmission?: string | null
    year?: string | null
    km_driven?: string | null
    color?: string | null
    owner?: string | null
    description?: string | null
    image_url?: string | null
    listing_url?: string | null
  }
  customer: {
    full_name: string
    email: string
    phone: string
    fax?: string
    address_1?: string
    address_2?: string
    city?: string
    post_code?: string
    country?: string
    region_state?: string
    same_delivery_billing?: boolean
    shipping_method?: string
    payment_method?: string
    comments?: string
    message?: string
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** Admin notification email — sent to CHECKOUT_EMAIL_TO */
export function getCheckoutEmailHtml(data: CheckoutEmailData): string {
  const { car, customer } = data
  const img = car.image_url || ""
  const listingUrl = car.listing_url || "#"
  const desc = (car.description || "").slice(0, 400)
  const specRows = [
    car.fuel_type && ["Fuel", car.fuel_type],
    car.transmission && ["Transmission", car.transmission],
    car.year && ["Year", car.year],
    car.km_driven && ["KM driven", car.km_driven],
    car.color && ["Color", car.color],
    car.owner && ["Owner", car.owner],
  ].filter(Boolean) as [string, string][]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Car Booking – ${escapeHtml(car.name)}</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); padding: 24px 28px; text-align: center;">
              <h1 style="margin:0; color:#fff; font-size: 22px; font-weight: 700;">GoGaddi</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">New car booking${data.order_display_id ? ` — Order #${data.order_display_id}` : ""}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 700;">Car details</h2>
              ${img ? `<div style="margin-bottom: 20px; border-radius: 12px; overflow: hidden;"><img src="${escapeHtml(img)}" alt="${escapeHtml(car.name)}" width="100%" style="display:block; max-height: 280px; object-fit: cover;" /></div>` : ""}
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="color: #64748b; font-size: 12px;">Car</span><br>
                  <strong style="color: #0f172a; font-size: 16px;">${escapeHtml(car.name)}</strong>
                </td></tr>
                ${car.brand ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b; font-size: 12px;">Brand</span><br><span style="color: #0f172a;">${escapeHtml(car.brand)}</span></td></tr>` : ""}
                ${car.price ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b; font-size: 12px;">Price</span><br><strong style="color: #1d4ed8; font-size: 18px;">${escapeHtml(car.price)}</strong></td></tr>` : ""}
                ${car.city ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b; font-size: 12px;">Location</span><br><span style="color: #0f172a;">${escapeHtml(car.city)}</span></td></tr>` : ""}
              </table>
              ${specRows.length > 0 ? `
              <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 600;">Key specs</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; border-radius: 8px;">
                ${specRows.map(([k, v]) => `<tr><td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b;">${escapeHtml(k)}</span><br><span style="color: #0f172a; font-weight: 600;">${escapeHtml(v)}</span></td></tr>`).join("")}
              </table>
              ` : ""}
              ${desc ? `<p style="margin: 20px 0 0; color: #475569; font-size: 14px; line-height: 1.5;">${escapeHtml(desc)}${car.description && car.description.length > 400 ? "…" : ""}</p>` : ""}
              <p style="margin: 20px 0 0;"><a href="${escapeHtml(listingUrl)}" style="display: inline-block; padding: 10px 20px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">View listing</a></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 28px 28px;">
              <h2 style="margin: 0 0 16px; color: #0f172a; font-size: 18px; font-weight: 700;">Billing &amp; contact</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; border-radius: 12px; padding: 20px;">
                <tr><td style="padding: 8px 0;"><span style="color: #64748b;">Name</span><br><strong style="color: #0f172a;">${escapeHtml(customer.full_name)}</strong></td></tr>
                <tr><td style="padding: 8px 0;"><span style="color: #64748b;">Email</span><br><a href="mailto:${escapeHtml(customer.email)}" style="color: #1d4ed8;">${escapeHtml(customer.email)}</a></td></tr>
                <tr><td style="padding: 8px 0;"><span style="color: #64748b;">Phone</span><br><a href="tel:${escapeHtml(customer.phone)}" style="color: #1d4ed8;">${escapeHtml(customer.phone)}</a></td></tr>
                ${customer.fax ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b;">Fax</span><br><span style="color: #0f172a;">${escapeHtml(customer.fax)}</span></td></tr>` : ""}
                ${customer.address_1 ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b;">Address</span><br><span style="color: #0f172a;">${escapeHtml(customer.address_1)}${customer.address_2 ? ", " + escapeHtml(customer.address_2) : ""}</span></td></tr>` : ""}
                ${customer.city || customer.post_code || customer.region_state ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b;">City / Post code / Region</span><br><span style="color: #0f172a;">${escapeHtml([customer.city, customer.post_code, customer.region_state].filter(Boolean).join(", "))}</span></td></tr>` : ""}
                ${customer.country ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b;">Country</span><br><span style="color: #0f172a;">${escapeHtml(customer.country)}</span></td></tr>` : ""}
                ${customer.payment_method ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b;">Payment method</span><br><span style="color: #0f172a;">${escapeHtml(customer.payment_method)}</span></td></tr>` : ""}
                ${(customer.comments || customer.message) ? `<tr><td style="padding: 12px 0 0; border-top: 1px solid #e2e8f0;"><span style="color: #64748b;">Comments</span><br><span style="color: #0f172a;">${escapeHtml(customer.comments || customer.message || "")}</span></td></tr>` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
              This booking was received via GoGaddi. Reply to the customer's email to respond.
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

/** Customer-facing booking confirmation email */
export function getCustomerConfirmationHtml(data: CheckoutEmailData): string {
  const { car, customer } = data
  const orderId = data.order_display_id ? `#${data.order_display_id}` : ""
  const listingUrl = car.listing_url || "#"

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmed – GoGaddi</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; margin: 0 auto; background:#ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #15803d 0%, #166534 100%); padding: 32px 28px; text-align: center;">
              <div style="font-size: 40px; margin-bottom: 12px;">&#x2705;</div>
              <h1 style="margin:0; color:#fff; font-size: 22px; font-weight: 700;">Booking Confirmed!</h1>
              ${orderId ? `<p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Order ${escapeHtml(orderId)}</p>` : ""}
            </td>
          </tr>
          <tr>
            <td style="padding: 28px;">
              <p style="margin: 0 0 20px; color: #475569; font-size: 15px; line-height: 1.6;">
                Hi <strong style="color: #0f172a;">${escapeHtml(customer.full_name)}</strong>, thank you for your booking on GoGaddi.
                Our team will contact you shortly to confirm the details.
              </p>
              <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <h2 style="margin: 0 0 12px; color: #0f172a; font-size: 16px; font-weight: 700;">Your Booking</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="color: #64748b; font-size: 12px;">Car</span><br>
                    <strong style="color: #0f172a; font-size: 15px;">${escapeHtml(car.name)}</strong>
                  </td></tr>
                  ${car.brand ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b; font-size: 12px;">Brand</span><br><span style="color: #0f172a;">${escapeHtml(car.brand)}</span></td></tr>` : ""}
                  ${car.price ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;"><span style="color: #64748b; font-size: 12px;">Price</span><br><strong style="color: #15803d; font-size: 17px;">${escapeHtml(car.price)}</strong></td></tr>` : ""}
                  ${car.city ? `<tr><td style="padding: 8px 0;"><span style="color: #64748b; font-size: 12px;">Location</span><br><span style="color: #0f172a;">${escapeHtml(car.city)}</span></td></tr>` : ""}
                </table>
              </div>
              <div style="background: #eff6ff; border-radius: 12px; padding: 20px; border: 1px solid #bfdbfe;">
                <h3 style="margin: 0 0 10px; color: #1d4ed8; font-size: 14px; font-weight: 700;">What happens next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #475569; font-size: 14px; line-height: 1.8;">
                  <li>Our team reviews your booking</li>
                  <li>We contact you within 24 hours to confirm</li>
                  <li>Schedule inspection &amp; paperwork</li>
                  <li>Complete the transaction</li>
                </ol>
              </div>
              <p style="margin: 20px 0 0; text-align: center;">
                <a href="${escapeHtml(listingUrl)}" style="display: inline-block; padding: 10px 24px; background: #1d4ed8; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">View Car Listing</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b; font-size: 12px;">
              Questions? Contact us at <a href="mailto:support@gogaddi.com" style="color: #1d4ed8;">support@gogaddi.com</a><br>
              — The GoGaddi Team
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
