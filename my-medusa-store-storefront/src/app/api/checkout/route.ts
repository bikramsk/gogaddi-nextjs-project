import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getCheckoutEmailHtml, type CheckoutEmailData } from "@lib/email/checkout-email-template"

function joinUrl(base: string, path: string): string {
  const b = (base || "").replace(/\/$/, "")
  const p = (path || "").startsWith("/") ? path : `/${path}`
  return `${b}${p}`
}

function isAbsoluteUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}

function normalizePublicUrl(input: string, opts: { siteUrl?: string; backendUrl?: string }): string {
  const raw = (input || "").trim()
  if (!raw) return ""
  if (isAbsoluteUrl(raw)) return raw

  // Medusa serves product images under /static/* (backend).
  if (raw.startsWith("/static/") && opts.backendUrl) {
    return joinUrl(opts.backendUrl, raw)
  }

  // Otherwise assume it's a storefront path (/dk/cars/..., /car-uploads/...)
  if (raw.startsWith("/") && opts.siteUrl) {
    return joinUrl(opts.siteUrl, raw)
  }

  return raw
}

type CheckoutPayload = {
  car: {
    id: string
    handle: string
    name: string
    brand?: string | null
    price?: string | null
    city?: string | null
    url?: string | null
    image_url?: string | null
    fuel_type?: string | null
    transmission?: string | null
    year?: string | null
    km_driven?: string | null
    color?: string | null
    owner?: string | null
    description?: string | null
  }
  customer: {
    first_name?: string
    last_name?: string
    full_name?: string
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

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CheckoutPayload
    const car = body?.car
    const customer = body?.customer

    if (!car?.handle || !car?.name) {
      return NextResponse.json({ message: "Missing car details" }, { status: 400 })
    }
    const fullName =
      customer?.full_name?.trim() ||
      [customer?.first_name?.trim(), customer?.last_name?.trim()].filter(Boolean).join(" ")
    if (!fullName || !customer?.email?.trim() || !customer?.phone?.trim()) {
      return NextResponse.json({ message: "Missing customer details (name, email, phone)" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ message: "Missing RESEND_API_KEY" }, { status: 500 })
    }

    const from = (process.env.CHECKOUT_EMAIL_FROM || "GoGaddi <onboarding@resend.dev>").trim()
    const to = (process.env.CHECKOUT_EMAIL_TO || process.env.CHECKOUT_EMAIL_FROM || "").trim()
    if (!to) {
      return NextResponse.json({ message: "Missing CHECKOUT_EMAIL_TO" }, { status: 500 })
    }

    const siteUrl =
      (process.env.NEXT_PUBLIC_SITE_URL || "").trim() ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")

    const backendUrl = (process.env.MEDUSA_BACKEND_URL || "").trim() || "http://localhost:9000"

    const listingUrl = car.url ? normalizePublicUrl(car.url, { siteUrl, backendUrl }) : ""
    const imageUrl = car.image_url ? normalizePublicUrl(car.image_url, { siteUrl, backendUrl }) : ""

    const emailData: CheckoutEmailData = {
      car: {
        name: car.name,
        brand: car.brand,
        price: car.price,
        city: car.city,
        fuel_type: car.fuel_type,
        transmission: car.transmission,
        year: car.year,
        km_driven: car.km_driven,
        color: car.color,
        owner: car.owner,
        description: car.description,
        image_url: imageUrl || car.image_url,
        listing_url: listingUrl || car.url,
      },
      customer: {
        full_name: fullName,
        email: customer.email.trim(),
        phone: customer.phone.trim(),
        fax: customer.fax,
        address_1: customer.address_1,
        address_2: customer.address_2,
        city: customer.city,
        post_code: customer.post_code,
        country: customer.country,
        region_state: customer.region_state,
        same_delivery_billing: customer.same_delivery_billing,
        shipping_method: customer.shipping_method,
        payment_method: customer.payment_method,
        comments: customer.comments ?? customer.message,
        message: customer.comments ?? customer.message,
      },
    }

    const resend = new Resend(apiKey)
    const subject = `Enquiry: ${car.name}${car.brand ? ` (${car.brand})` : ""}`

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: customer.email,
      subject,
      html: getCheckoutEmailHtml(emailData),
    })

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send email"
    return NextResponse.json({ message }, { status: 500 })
  }
}
