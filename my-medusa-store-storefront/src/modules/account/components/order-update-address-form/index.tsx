"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Input, Label } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import { updateOrder, UpdateOrderAddressPayload } from "@lib/data/orders"

const COUNTRY_OPTIONS = [
  { value: "", label: "Select country" },
  { value: "in", label: "India" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "sg", label: "Singapore" },
  { value: "au", label: "Australia" },
]

type OrderUpdateAddressFormProps = {
  orderId: string
  order: HttpTypes.StoreOrder
  /** When true, hide the form (e.g. order cancelled) */
  disabled?: boolean
}

export default function OrderUpdateAddressForm({
  orderId,
  order,
  disabled,
}: OrderUpdateAddressFormProps) {
  const router = useRouter()
  const addr = order.shipping_address

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [first_name, setFirstName] = useState(addr?.first_name ?? "")
  const [last_name, setLastName] = useState(addr?.last_name ?? "")
  const [address_1, setAddress1] = useState(addr?.address_1 ?? "")
  const [address_2, setAddress2] = useState(addr?.address_2 ?? "")
  const [city, setCity] = useState(addr?.city ?? "")
  const [postal_code, setPostalCode] = useState(addr?.postal_code ?? "")
  const [country_code, setCountryCode] = useState(
    (addr?.country_code ?? "").toLowerCase()
  )
  const [province, setProvince] = useState(addr?.province ?? "")
  const [phone, setPhone] = useState(addr?.phone ?? "")

  if (disabled) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    const payload: UpdateOrderAddressPayload = {
      first_name: first_name.trim() || undefined,
      last_name: last_name.trim() || undefined,
      address_1: address_1.trim() || undefined,
      address_2: address_2.trim() || undefined,
      city: city.trim() || undefined,
      postal_code: postal_code.trim() || undefined,
      country_code: country_code.trim() || undefined,
      province: province.trim() || undefined,
      phone: phone.trim() || undefined,
    }
    const result = await updateOrder(orderId, { shipping_address: payload })
    setLoading(false)
    if (result.success) {
      setSuccess(true)
      setOpen(false)
      router.refresh()
    } else {
      setError(result.error ?? "Update failed")
    }
  }

  return (
    <div className="mt-4">
      {!open ? (
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={() => setOpen(true)}
          data-testid="order-update-address-button"
        >
          Update shipping address
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border border-ui-border-base rounded-lg bg-ui-bg-subtle"
        >
          <div className="text-base font-medium">Edit shipping address</div>
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-first_name">First name</Label>
              <Input
                id="edit-first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-last_name">Last name</Label>
              <Input
                id="edit-last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-address_1">Address line 1</Label>
            <Input
              id="edit-address_1"
              value={address_1}
              onChange={(e) => setAddress1(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="edit-address_2">Address line 2</Label>
            <Input
              id="edit-address_2"
              value={address_2}
              onChange={(e) => setAddress2(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-city">City</Label>
              <Input
                id="edit-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-postal_code">Postal code</Label>
              <Input
                id="edit-postal_code"
                value={postal_code}
                onChange={(e) => setPostalCode(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-country_code">Country</Label>
              <select
                id="edit-country_code"
                value={country_code}
                onChange={(e) => setCountryCode(e.target.value)}
                className="mt-1 w-full rounded-md border border-ui-border-base bg-ui-bg-field shadow-buttons-neutral placeholder-ui-fg-muted text-ui-fg-base focus:border-ui-border-interactive focus:outline-none focus:ring-1 focus:ring-ui-border-interactive px-3 py-2"
              >
                {COUNTRY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="edit-province">State / Province</Label>
              <Input
                id="edit-province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-phone">Phone</Label>
            <Input
              id="edit-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
            />
          </div>
          {error && (
            <p className="text-small-regular text-red-600" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="text-small-regular text-green-600">Address updated.</p>
          )}
          <div className="flex gap-2">
            <Button type="submit" disabled={loading} data-testid="order-update-address-submit">
              {loading ? "Saving…" : "Save address"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setOpen(false)
                setError(null)
              }}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
