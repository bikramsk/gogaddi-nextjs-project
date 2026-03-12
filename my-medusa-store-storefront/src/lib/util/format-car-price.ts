/**
 * Format car price for display (INR). Safe to use in client or server.
 * Amount may be in paise/smallest unit (e.g. from Medusa) — we normalize for display.
 */
export function formatCarPrice(amount: number | null): string {
  if (amount == null) return "Price on request"
  const value = amount >= 10000 ? amount / 100 : amount
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}
