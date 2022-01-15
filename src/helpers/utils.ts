import { IOrder, IOrderItem } from '../types'

export const toFixed = (num: number, fractionDigits?: number) => (num ? num.toFixed(fractionDigits) : '0.00')

export const getCurrency = (num: number) => `$${toFixed(num, 2)}`

export const getOrderItemTotal = (orderItem: IOrderItem) => orderItem?.amount * (orderItem?.product?.price ?? 0)

export const getOrderSubTotal = (order: IOrder) => order?.items?.reduce((acc, curr) => acc + getOrderItemTotal(curr), 0)

export const getOrderItemTotalWithCurrency = (orderItem: IOrderItem) => getCurrency(getOrderItemTotal(orderItem))

export const getOrderSubTotalWithCurrency = (order: IOrder) => getCurrency(getOrderSubTotal(order))

export function toShortLocalDateTime(timestamp?: number | null): string | null {
  if (!timestamp) return null

  const opts: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }
  return new Date(timestamp).toLocaleString([], opts)
}
