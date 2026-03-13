import type { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { cancelOrderWorkflow } from "@medusajs/medusa/core-flows"

/**
 * POST /store/orders/:id/cancel
 * Cancels an order. Customer must be authenticated and must own the order.
 */
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const orderId = req.params.id as string
  const customerId = req.auth_context?.actor_id

  if (!orderId) {
    res.status(400).json({ message: "Order ID is required" })
    return
  }

  if (!customerId) {
    res.status(401).json({ message: "You must be signed in to cancel an order" })
    return
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "customer_id"],
    filters: { id: orderId },
  } as any)

  const order = (orders as { id: string; customer_id: string | null }[])?.[0]
  if (!order) {
    res.status(404).json({ message: "Order not found" })
    return
  }

  if (order.customer_id !== customerId) {
    res.status(403).json({ message: "You can only cancel your own orders" })
    return
  }

  try {
    const { result } = await cancelOrderWorkflow(req.scope).run({
      input: {
        order_id: orderId,
        canceled_by: customerId,
      },
    })
    res.json({ order: result })
  } catch (err: any) {
    res.status(400).json({
      message: err?.message ?? "This order cannot be canceled",
    })
  }
}
