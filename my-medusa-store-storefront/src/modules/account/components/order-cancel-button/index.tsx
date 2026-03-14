"use client"

import { Button } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cancelOrder } from "@lib/data/orders"

type OrderCancelButtonProps = {
  orderId: string
  /** When true, button is hidden (e.g. order already cancelled) */
  disabled?: boolean
  variant?: "secondary" | "transparent" | "primary"
}

export default function OrderCancelButton({
  orderId,
  disabled,
  variant = "transparent",
}: OrderCancelButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (disabled) return null

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return
    setLoading(true)
    setError(null)
    const result = await cancelOrder(orderId)
    setLoading(false)
    if (result.success) {
      router.refresh()
    } else {
      setError(result.error ?? "Failed to cancel")
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        type="button"
        variant={variant}
        size="small"
        onClick={handleCancel}
        disabled={loading}
        data-testid="order-cancel-button"
      >
        {loading ? "Cancelling…" : "Cancel order"}
      </Button>
      {error && (
        <p className="text-small-regular text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
