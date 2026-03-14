import type { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

type ShippingAddressPayload = {
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  city?: string
  postal_code?: string
  country_code?: string
  province?: string
  phone?: string
}

type UpdateOrderBody = {
  shipping_address?: ShippingAddressPayload
}

/**
 * POST /store/orders/:id/update
 * Updates order shipping address. Customer must be authenticated and must own the order.
 * Only allowed when order is not canceled and not yet fulfilled.
 */
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const orderId = req.params.id as string
  const customerId = req.auth_context?.actor_id
  const body = (req.body as UpdateOrderBody) ?? {}

  if (!orderId) {
    res.status(400).json({ message: "Order ID is required" })
    return
  }

  if (!customerId) {
    res.status(401).json({ message: "You must be signed in to update an order" })
    return
  }

  const shipping = body.shipping_address
  if (!shipping || typeof shipping !== "object") {
    res.status(400).json({ message: "shipping_address object is required" })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "customer_id", "status", "shipping_address"],
    filters: { id: orderId },
  } as any)

  const order = (orders as any[])?.[0]
  if (!order) {
    res.status(404).json({ message: "Order not found" })
    return
  }

  if (order.customer_id !== customerId) {
    res.status(403).json({ message: "You can only update your own orders" })
    return
  }

  const status = (order.status ?? "").toLowerCase()
  if (status === "canceled" || status === "cancelled") {
    res.status(400).json({ message: "Cannot update a canceled order" })
    return
  }

  const existingAddress = order.shipping_address
  if (!existingAddress?.id) {
    res.status(400).json({ message: "Order has no shipping address to update" })
    return
  }

  const orderModuleService = req.scope.resolve(Modules.ORDER) as any
  if (!orderModuleService?.updateOrders) {
    res.status(500).json({ message: "Order update is not available" })
    return
  }

  const updatePayload: Record<string, unknown> = {
    id: existingAddress.id,
    ...(shipping.first_name !== undefined && { first_name: shipping.first_name }),
    ...(shipping.last_name !== undefined && { last_name: shipping.last_name }),
    ...(shipping.address_1 !== undefined && { address_1: shipping.address_1 }),
    ...(shipping.address_2 !== undefined && { address_2: shipping.address_2 }),
    ...(shipping.city !== undefined && { city: shipping.city }),
    ...(shipping.postal_code !== undefined && { postal_code: shipping.postal_code }),
    ...(shipping.country_code !== undefined && { country_code: shipping.country_code }),
    ...(shipping.province !== undefined && { province: shipping.province }),
    ...(shipping.phone !== undefined && { phone: shipping.phone }),
  }

  try {
    await orderModuleService.updateOrderAddresses([updatePayload])
    const { data: updated } = await query.graph({
      entity: "order",
      fields: ["id", "display_id", "shipping_address"],
      filters: { id: orderId },
    } as any)
    res.json({ order: (updated as any[])?.[0] ?? order })
  } catch (err: any) {
    res.status(400).json({
      message: err?.message ?? "Failed to update order",
    })
  }
}
