import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import {
  getCheckoutEmailHtml,
  getCustomerConfirmationHtml,
  type CheckoutEmailData,
} from "@lib/email/checkout-email-template"

// ─── Medusa helpers ───────────────────────────────────────────────────────────

const BACKEND = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

async function medusa<T = any>(
  path: string,
  init?: RequestInit,
  authToken?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-publishable-api-key": PUB_KEY,
    ...((init?.headers as Record<string, string>) ?? {}),
  }
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`

  const res = await fetch(`${BACKEND}${path}`, {
    ...init,
    headers,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const msg = (data as any)?.message
    // Medusa often returns 500 with "calculated_amount" when variant has no price for region
    const hint =
      res.status === 500 && (msg?.includes("calculated_amount") || path.includes("line-items"))
        ? " Usually this means the product variant has no price for this region's currency — add a price in Medusa Admin (Product → Variant → Prices) for the region you're using."
        : ""
    throw new Error(
      (msg || `Medusa error ${res.status}`) + hint
    )
  }
  return data as T
}

// ─── Image URL helper ─────────────────────────────────────────────────────────

function resolveImageUrl(raw: string | null | undefined): string {
  if (!raw) return ""
  if (/^https?:\/\//i.test(raw)) return raw
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")
  if (raw.startsWith("/static/")) {
    return `${BACKEND}${raw}`
  }
  return siteUrl ? `${siteUrl}${raw}` : raw
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Payload = {
  variant_id: string
  country_code: string
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
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("_medusa_jwt")?.value
    if (!token) {
      return NextResponse.json(
        { message: "Please sign in to checkout." },
        { status: 401 }
      )
    }

    const body = (await req.json()) as Payload
    const { car, customer, variant_id, country_code } = body

    // ── Validate ────────────────────────────────────────────────────────────
    if (!variant_id) {
      return NextResponse.json({ message: "Missing variant_id" }, { status: 400 })
    }
    if (!country_code) {
      return NextResponse.json({ message: "Missing country_code" }, { status: 400 })
    }
    if (!car?.name || !car?.handle) {
      return NextResponse.json({ message: "Missing car details" }, { status: 400 })
    }

    const fullName =
      customer?.full_name?.trim() ||
      [customer?.first_name?.trim(), customer?.last_name?.trim()]
        .filter(Boolean)
        .join(" ")
    if (!fullName || !customer?.email?.trim() || !customer?.phone?.trim()) {
      return NextResponse.json(
        { message: "Name, email and phone are required" },
        { status: 400 }
      )
    }

    // ── Step 1: Find region for country_code ────────────────────────────────
    const { regions } = await medusa<{ regions: any[] }>("/store/regions", undefined, token)
    let region = regions?.find((r: any) =>
      r.countries?.some(
        (c: any) => c.iso_2?.toLowerCase() === country_code.toLowerCase()
      )
    )
    if (!region) {
      // Fallback: use the first available region so checkout is not blocked.
      // This is safe for MVP; for strict setups you can remove this fallback
      // and rely entirely on Medusa region configuration.
      region = regions?.[0]
      if (!region) {
        return NextResponse.json(
          {
            message:
              "No Medusa regions configured. Please create at least one region in Medusa Admin.",
          },
          { status: 422 }
        )
      }
    }

    // ── Step 2: Create cart (with auth so order is linked to customer) ───────
    const { cart } = await medusa<{ cart: any }>(
      "/store/carts",
      {
        method: "POST",
        body: JSON.stringify({ region_id: region.id, email: customer.email }),
      },
      token
    )

    // ── Step 3: Add car variant to cart ─────────────────────────────────────
    try {
      await medusa(
        `/store/carts/${cart.id}/line-items`,
        {
          method: "POST",
          body: JSON.stringify({ variant_id, quantity: 1 }),
        },
        token
      )
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add item to cart."
      return NextResponse.json(
        {
          message:
            message.includes("price") || message.includes("calculated_amount")
              ? "This car has no price set for the selected country/region. In Medusa Admin: open the product → Variants → add a Price in the same currency as your region (e.g. EUR for Europe, INR for India)."
              : message,
        },
        { status: 422 }
      )
    }

    // ── Step 4: Set shipping address + email on cart ─────────────────────────
    const shippingAddress = {
      first_name: customer.first_name?.trim() || fullName.split(" ")[0] || "N/A",
      last_name:
        customer.last_name?.trim() ||
        fullName.split(" ").slice(1).join(" ") ||
        "N/A",
      address_1: customer.address_1?.trim() || "N/A",
      address_2: customer.address_2?.trim() || "",
      city: customer.city?.trim() || "N/A",
      country_code: (customer.country || country_code || "in").toLowerCase(),
      province: customer.region_state?.trim() || "",
      postal_code: customer.post_code?.trim() || "",
      phone: customer.phone?.trim() || "",
    }

    await medusa(
      `/store/carts/${cart.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: customer.email,
          shipping_address: shippingAddress,
          billing_address: shippingAddress,
        }),
      },
      token
    )

    // ── Step 5: Add shipping method (required for cart completion) ───────────
    const shippingHelp =
      "In Medusa Admin go to Settings → Locations & Shipping → Shipping Option Types: create a shipping option (e.g. Free Shipping, amount 0) for your region and connect it to a location with Shipping enabled."
    let shippingAdded = false
    try {
      const { shipping_options } = await medusa<{ shipping_options: any[] }>(
        `/store/shipping-options?cart_id=${cart.id}`,
        undefined,
        token
      )
      if (shipping_options?.length > 0) {
        await medusa(
          `/store/carts/${cart.id}/shipping-methods`,
          {
            method: "POST",
            body: JSON.stringify({ option_id: shipping_options[0].id }),
          },
          token
        )
        shippingAdded = true
      }
    } catch {
      // ignore fetch errors; we'll fail at complete with a clear message
    }
    if (!shippingAdded) {
      return NextResponse.json(
        {
          message: `No shipping option is configured for this region. Checkout cannot continue. ${shippingHelp}`,
        },
        { status: 422 }
      )
    }

    // ── Step 6: Initiate payment session (manual / system provider) ──────────
    try {
      const { payment_collection } = await medusa<{ payment_collection: any }>(
        "/store/payment-collections",
        {
          method: "POST",
          body: JSON.stringify({ cart_id: cart.id }),
        },
        token
      )
      await medusa(
        `/store/payment-collections/${payment_collection.id}/payment-sessions`,
        {
          method: "POST",
          body: JSON.stringify({ provider_id: "pp_system_default" }),
        },
        token
      )
    } catch {
      // Payment provider not configured — continue; completion may still work for free-price carts
    }

    // ── Step 7: Complete cart → create order ─────────────────────────────────
    let result: { type: string; order?: any; cart?: any }
    try {
      result = await medusa<{ type: string; order?: any; cart?: any }>(
        `/store/carts/${cart.id}/complete`,
        { method: "POST" },
        token
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : ""
      if (
        /shipping|no shipping method/i.test(msg) ||
        /shipping method selected/i.test(msg)
      ) {
        return NextResponse.json(
          {
            message: `No shipping method selected. ${shippingHelp}`,
          },
          { status: 422 }
        )
      }
      throw err
    }

    if (result.type !== "order" || !result.order) {
      return NextResponse.json(
        {
          message:
            "Cart could not be completed into an order. Make sure a free shipping option and the system payment provider are configured in Medusa Admin.",
        },
        { status: 422 }
      )
    }

    const order = result.order

    // ── Step 8: Send emails ──────────────────────────────────────────────────
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "")
    const listingUrl = car.url
      ? /^https?:\/\//i.test(car.url)
        ? car.url
        : `${siteUrl}${car.url}`
      : ""
    const imageUrl = resolveImageUrl(car.image_url)

    const emailData: CheckoutEmailData = {
      order_id: order.id,
      order_display_id: order.display_id,
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
        payment_method: customer.payment_method,
        comments: customer.comments,
      },
    }

    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const from = (
        process.env.CHECKOUT_EMAIL_FROM ||
        process.env.RESEND_FROM ||
        "GoGaddi <noreply@gogaddi.com>"
      ).trim()
      const adminTo = (process.env.CHECKOUT_EMAIL_TO || "").trim()
      const resend = new Resend(apiKey)

      // Admin notification
      if (adminTo) {
        await resend.emails.send({
          from,
          to: [adminTo],
          replyTo: customer.email,
          subject: `New Car Booking: ${car.name}${order.display_id ? ` — Order #${order.display_id}` : ""}`,
          html: getCheckoutEmailHtml(emailData),
        })
      }

      // Customer confirmation
      await resend.emails.send({
        from,
        to: [customer.email.trim()],
        subject: `Booking Confirmed: ${car.name}${order.display_id ? ` (Order #${order.display_id})` : ""}`,
        html: getCustomerConfirmationHtml(emailData),
      })
    }

    return NextResponse.json(
      {
        ok: true,
        order_id: order.id,
        order_display_id: order.display_id,
      },
      { status: 200 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Checkout failed"
    console.error("[checkout] Error:", message)
    return NextResponse.json({ message }, { status: 500 })
  }
}
