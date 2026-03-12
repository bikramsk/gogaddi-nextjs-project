"use client"

import { useMemo, useState } from "react"
import TextField from "@modules/common/components/text-field"
import SelectField from "@modules/common/components/select-field"
import Button from "@modules/common/components/button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const COUNTRY_OPTIONS = [
  { value: "", label: "--- Please Select ---" },
  { value: "IN", label: "India" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SG", label: "Singapore" },
  { value: "AU", label: "Australia" },
]

type CarPayload = {
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

type Props = {
  car: CarPayload
}

const sectionTitleClass =
  "text-lg md:text-xl font-bold text-blue-700/90 italic mb-4 block"

export default function CheckoutForm({ car }: Props) {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState("")

  // Billing
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [telephone, setTelephone] = useState("")
  const [fax, setFax] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [city, setCity] = useState("")
  const [postCode, setPostCode] = useState("")
  const [country, setCountry] = useState("")
  const [regionState, setRegionState] = useState("")
  const [sameAddress, setSameAddress] = useState(true)

  const [shippingMethod, setShippingMethod] = useState("free")
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const [comments, setComments] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length >= 1 &&
      lastName.trim().length >= 1 &&
      email.includes("@") &&
      telephone.trim().length >= 8 &&
      address1.trim().length >= 1 &&
      city.trim().length >= 1 &&
      country !== "" &&
      regionState.trim().length >= 1 &&
      agreeTerms &&
      !loading
    )
  }, [
    firstName,
    lastName,
    email,
    telephone,
    address1,
    city,
    country,
    regionState,
    agreeTerms,
    loading,
  ])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("idle")
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          car: {
            id: car.id,
            handle: car.handle,
            name: car.name,
            brand: car.brand,
            price: car.price,
            city: car.city,
            url: car.url,
            image_url: car.image_url,
            fuel_type: car.fuel_type,
            transmission: car.transmission,
            year: car.year,
            km_driven: car.km_driven,
            color: car.color,
            owner: car.owner,
            description: car.description,
          },
          customer: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            full_name: `${firstName.trim()} ${lastName.trim()}`.trim(),
            email: email.trim(),
            phone: telephone.trim(),
            fax: fax.trim() || undefined,
            address_1: address1.trim(),
            address_2: address2.trim() || undefined,
            city: city.trim(),
            post_code: postCode.trim() || undefined,
            country,
            region_state: regionState.trim(),
            same_delivery_billing: sameAddress,
            shipping_method: shippingMethod,
            payment_method: paymentMethod,
            comments: comments.trim() || undefined,
          },
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data?.message ?? "Failed to submit")
      }

      setStatus("success")
    } catch (err: unknown) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const inputContainerClass = "mb-4"
  const labelClass = "text-sm font-medium text-slate-700"
  const requiredStar = <span className="text-red-500">*</span>

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        {/* Left: Billing Details */}
        <div>
          <h2 className={sectionTitleClass}>Billing Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={inputContainerClass}>
              <label className={labelClass} htmlFor="firstName">
                {requiredStar} First Name:
              </label>
              <TextField
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                containerClassName="mt-1"
              />
            </div>
            <div className={inputContainerClass}>
              <label className={labelClass} htmlFor="lastName">
                {requiredStar} Last Name:
              </label>
              <TextField
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                containerClassName="mt-1"
              />
            </div>
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="email">
              {requiredStar} E-Mail:
            </label>
            <TextField
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              containerClassName="mt-1"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="telephone">
              {requiredStar} Telephone:
            </label>
            <TextField
              id="telephone"
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
              containerClassName="mt-1"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="fax">
              Fax:
            </label>
            <TextField
              id="fax"
              type="tel"
              value={fax}
              onChange={(e) => setFax(e.target.value)}
              containerClassName="mt-1"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="address1">
              {requiredStar} Address 1:
            </label>
            <TextField
              id="address1"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              containerClassName="mt-1"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="address2">
              Address 2:
            </label>
            <TextField
              id="address2"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              containerClassName="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={inputContainerClass}>
              <label className={labelClass} htmlFor="city">
                {requiredStar} City:
              </label>
              <TextField
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                containerClassName="mt-1"
              />
            </div>
            <div className={inputContainerClass}>
              <label className={labelClass} htmlFor="postCode">
                Post Code:
              </label>
              <TextField
                id="postCode"
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                containerClassName="mt-1"
              />
            </div>
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="country">
              {requiredStar} Country:
            </label>
            <SelectField
              id="country"
              options={COUNTRY_OPTIONS}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="--- Please Select ---"
              containerClassName="mt-1"
            />
          </div>
          <div className={inputContainerClass}>
            <label className={labelClass} htmlFor="regionState">
              {requiredStar} Region / State:
            </label>
            <TextField
              id="regionState"
              value={regionState}
              onChange={(e) => setRegionState(e.target.value)}
              required
              containerClassName="mt-1"
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer mt-4">
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700">
              My delivery and billing addresses are the same.
            </span>
          </label>
        </div>

        {/* Right: Shipping, Payment, Order Summary, Comments */}
        <div className="space-y-6">
          <div>
            <h2 className={sectionTitleClass}>Select shipping method.</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={shippingMethod === "free"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-700">Free Shipping</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="free_0"
                  checked={shippingMethod === "free_0"}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-700">Free Shipping Rs. 0</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Select payment method.</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="bank_transfer"
                  checked={paymentMethod === "bank_transfer"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-700">Bank Transfer</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cheque"
                  checked={paymentMethod === "cheque"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-slate-700">Cheque / Money Order</span>
              </label>
              {paymentMethod === "cheque" && (
                <p className="text-sm text-slate-500 ml-7 mt-1">
                  Instructions for payment by cheque or money order will be sent
                  after you continue.
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>Order Summary</h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">
                      Gaddi Name
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">
                      Price Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-800">{car.name}</td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-900">
                      {car.price ?? "—"}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 text-slate-600">Sub-Total:</td>
                    <td className="py-3 px-4 text-right font-medium text-slate-800">
                      {car.price ?? "—"}
                    </td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Total:
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">
                      {car.price ?? "—"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className={sectionTitleClass}>
              Add Comments About Your Order
            </h2>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={4}
              placeholder="Any special requests or notes..."
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-y min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Your order has been submitted. We&apos;ll contact you soon.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Terms & Continue */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="flex items-start sm:items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 shrink-0"
          />
          <span className="text-sm text-slate-700">
            I have read and agree to the{" "}
            <LocalizedClientLink
              href="/terms"
              className="text-blue-600 hover:text-blue-700 font-medium underline"
            >
              Terms &amp; Conditions
            </LocalizedClientLink>
          </span>
        </label>
        <Button
          type="submit"
          disabled={!canSubmit}
          variant="primary"
          size="lg"
          className="min-w-[160px] bg-slate-700 hover:bg-slate-800 text-white"
        >
          {loading ? "Sending…" : "Continue"}
        </Button>
      </div>
    </form>
  )
}
