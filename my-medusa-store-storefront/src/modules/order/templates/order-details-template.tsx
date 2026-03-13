"use client"

import { XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import OrderCancelButton from "@modules/account/components/order-cancel-button"
import OrderUpdateAddressForm from "@modules/account/components/order-update-address-form"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import ShippingDetails from "@modules/order/components/shipping-details"
import React from "react"

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const isCanceled =
    (order as { status?: string }).status?.toLowerCase() === "canceled"

  return (
    <div className="flex flex-col justify-center gap-y-4">
      <div className="flex gap-2 justify-between items-center flex-wrap">
        <h1 className="text-2xl-semi">Order details</h1>
        <div className="flex items-center gap-2">
          {isCanceled && (
            <span className="text-small-regular text-red-600 font-medium">
              Cancelled
            </span>
          )}
          <OrderCancelButton
            orderId={order.id}
            disabled={isCanceled}
            variant="secondary"
          />
          <LocalizedClientLink
            href="/account/orders"
            className="flex gap-2 items-center text-ui-fg-subtle hover:text-ui-fg-base"
            data-testid="back-to-overview-button"
          >
            <XMark /> Back to overview
          </LocalizedClientLink>
        </div>
      </div>
      <div
        className="flex flex-col gap-4 h-full bg-white w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderUpdateAddressForm
          orderId={order.id}
          order={order}
          disabled={isCanceled}
        />
        <OrderSummary order={order} />
        <Help />
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
