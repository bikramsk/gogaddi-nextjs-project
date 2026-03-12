import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { getContactEmailHtml, type ContactEmailData } from "@lib/email/contact-email-template"

type ContactPayload = {
  firstName: string
  email: string
  enquiry: string
  phone?: string
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload
    const firstName = (body?.firstName ?? "").trim()
    const email = (body?.email ?? "").trim()
    const enquiry = (body?.enquiry ?? "").trim()
    const phone = body?.phone ? String(body.phone).trim() : undefined

    if (!firstName || !email || !enquiry) {
      return NextResponse.json(
        { message: "Please provide name, email, and message." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { message: "Email service is not configured." },
        { status: 500 }
      )
    }

    const from = (
      process.env.CONTACT_EMAIL_FROM ||
      process.env.CHECKOUT_EMAIL_FROM ||
      "GoGaddi <onboarding@resend.dev>"
    ).trim()
    const to = (
      process.env.CONTACT_EMAIL_TO ||
      process.env.CHECKOUT_EMAIL_TO ||
      process.env.CHECKOUT_EMAIL_FROM ||
      ""
    ).trim()
    if (!to) {
      return NextResponse.json(
        { message: "Contact recipient email is not configured." },
        { status: 500 }
      )
    }

    const submittedAt = new Date().toISOString()
    const source = "GoGaddi Contact Form"

    const emailData: ContactEmailData = {
      firstName,
      email,
      enquiry,
      phone,
      submittedAt,
      source,
    }

    const resend = new Resend(apiKey)
    const subject = `Contact: ${firstName} – ${email}`

    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject,
      html: getContactEmailHtml(emailData),
    })

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to send message"
    return NextResponse.json({ message }, { status: 500 })
  }
}
