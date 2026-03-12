"use client"

import { useState, useRef, useEffect } from "react"
import TextField from "@modules/common/components/text-field"
import Button from "@modules/common/components/button"

function generateCaptcha(): string {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789"
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default function ContactForm() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [enquiry, setEnquiry] = useState("")
  const [captchaInput, setCaptchaInput] = useState("")
  const [captchaCode, setCaptchaCode] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "invalid_captcha">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const captchaRef = useRef<string>("")

  useEffect(() => {
    const code = generateCaptcha()
    captchaRef.current = code
    setCaptchaCode(code)
  }, [])

  const refreshCaptcha = () => {
    const code = generateCaptcha()
    captchaRef.current = code
    setCaptchaInput("")
    setCaptchaCode(code)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (captchaInput.toLowerCase() !== captchaRef.current.toLowerCase()) {
      setStatus("invalid_captcha")
      setCaptchaInput("")
      refreshCaptcha()
      return
    }

    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          enquiry: enquiry.trim(),
          phone: phone.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setStatus("error")
        setErrorMessage(data?.message || "Something went wrong. Please try again.")
        refreshCaptcha()
        return
      }

      setStatus("success")
      setFirstName("")
      setEmail("")
      setPhone("")
      setEnquiry("")
      setCaptchaInput("")
      refreshCaptcha()
    } catch {
      setStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
      refreshCaptcha()
    }
  }

  const inputClass = "rounded-2xl border-slate-200 bg-slate-50/50"
  const labelClass = "text-[10px] font-semibold uppercase tracking-widest text-slate-500"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <TextField
          label="First Name"
          id="first-name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          containerClassName={inputClass}
        />
        <TextField
          label="E-Mail Address"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          containerClassName={inputClass}
        />
      </div>

      <TextField
        label="Phone (optional)"
        id="phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        containerClassName={inputClass}
      />

      <div>
        <label htmlFor="enquiry" className={`block mb-1.5 ${labelClass}`}>
          Enquiry
        </label>
        <textarea
          id="enquiry"
          rows={4}
          value={enquiry}
          onChange={(e) => setEnquiry(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-y min-h-[120px]"
          placeholder="Your message..."
        />
      </div>

      <div>
        <label htmlFor="captcha" className={`block mb-1.5 ${labelClass}`}>
          Enter the code below
        </label>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            id="captcha"
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="max-w-[140px] px-3 py-2 rounded-2xl border border-slate-200 bg-slate-50/50 font-mono uppercase text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder=""
            autoComplete="off"
            required
          />
          <div className="relative flex items-center justify-center w-32 h-10 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden select-none">
            <span className="relative font-mono text-lg font-bold tracking-widest text-slate-800">
              {captchaCode}
            </span>
          </div>
          <button
            type="button"
            onClick={refreshCaptcha}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            Refresh
          </button>
        </div>
      </div>

      {status === "invalid_captcha" && (
        <p className="text-red-600 text-sm font-medium">
          The code you entered is incorrect. Please try again.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-sm font-medium">
          {errorMessage}
        </p>
      )}

      {status === "success" && (
        <p className="text-green-600 text-sm font-medium">
          Thank you! Your message has been sent. We will get back to you soon.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="min-w-[140px]"
      >
        {status === "loading" ? "Sending…" : "Submit"}
      </Button>
    </form>
  )
}
