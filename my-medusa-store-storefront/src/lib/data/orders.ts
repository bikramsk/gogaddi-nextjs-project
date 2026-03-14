"use server"

import { sdk } from "@lib/config"
import medusaError from "@lib/util/medusa-error"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const retrieveOrder = async (id: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderResponse>(`/store/orders/${id}`, {
      method: "GET",
      query: {
        fields:
          "*payment_collections.payments,*items,*items.metadata,*items.variant,*items.product,*shipping_address",
      },
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ order }) => order)
    .catch((err) => medusaError(err))
}

export const listOrders = async (
  limit: number = 10,
  offset: number = 0,
  filters?: Record<string, any>
) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("orders")),
    revalidate: 0,
  }

  return sdk.client
    .fetch<HttpTypes.StoreOrderListResponse>(`/store/orders`, {
      method: "GET",
      query: {
        limit,
        offset,
        order: "-created_at",
        fields: "*items,+items.metadata,*items.variant,*items.product",
        ...filters,
      },
      headers,
      next,
      cache: "no-store",
    })
    .then(({ orders }) => orders)
    .catch((err) => medusaError(err))
}

export const createTransferRequest = async (
  state: {
    success: boolean
    error: string | null
    order: HttpTypes.StoreOrder | null
  },
  formData: FormData
): Promise<{
  success: boolean
  error: string | null
  order: HttpTypes.StoreOrder | null
}> => {
  const id = formData.get("order_id") as string

  if (!id) {
    return { success: false, error: "Order ID is required", order: null }
  }

  const headers = await getAuthHeaders()

  return await sdk.store.order
    .requestTransfer(
      id,
      {},
      {
        fields: "id, email",
      },
      headers
    )
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const acceptTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .acceptTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export const declineTransferRequest = async (id: string, token: string) => {
  const headers = await getAuthHeaders()

  return await sdk.store.order
    .declineTransfer(id, { token }, {}, headers)
    .then(({ order }) => ({ success: true, error: null, order }))
    .catch((err) => ({ success: false, error: err.message, order: null }))
}

export type CancelOrderResult = {
  success: boolean
  error: string | null
}

export const cancelOrder = async (orderId: string): Promise<CancelOrderResult> => {
  if (!orderId?.trim()) {
    return { success: false, error: "Order ID is required" }
  }

  const headers = await getAuthHeaders()
  if (!("authorization" in headers) || !headers.authorization) {
    return { success: false, error: "Please sign in to cancel an order" }
  }

  return sdk.client
    .fetch<{ order: unknown }>(`/store/orders/${orderId}/cancel`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
    })
    .then(() => ({ success: true, error: null }))
    .catch((err: { message?: string }) => ({
      success: false,
      error: err?.message ?? "Failed to cancel order",
    }))
}

export type UpdateOrderAddressPayload = {
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

export type UpdateOrderResult = {
  success: boolean
  error: string | null
}

export const updateOrder = async (
  orderId: string,
  payload: { shipping_address: UpdateOrderAddressPayload }
): Promise<UpdateOrderResult> => {
  if (!orderId?.trim()) {
    return { success: false, error: "Order ID is required" }
  }
  if (!payload?.shipping_address || typeof payload.shipping_address !== "object") {
    return { success: false, error: "Shipping address is required" }
  }

  const headers = await getAuthHeaders()
  if (!("authorization" in headers) || !headers.authorization) {
    return { success: false, error: "Please sign in to update an order" }
  }

  return sdk.client
    .fetch<{ order: unknown }>(`/store/orders/${orderId}/update`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: payload as unknown as BodyInit,
    })
    .then(() => ({ success: true, error: null }))
    .catch((err: { message?: string }) => ({
      success: false,
      error: err?.message ?? "Failed to update order",
    }))
}
