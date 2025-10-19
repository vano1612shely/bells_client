import type { Price } from '@/modules/price/types'
import { apiClient } from '@/shared/api'
import { PRICE_URLS } from '@/modules/price/api/routes.ts'

export const PriceApi = {
  baseKey: 'price',
  getPrice: () =>
    apiClient.get<Price>({
      url: PRICE_URLS.price,
    }),
  updatePrice: (price: number) =>
    apiClient.put({
      url: PRICE_URLS.price,
      payload: { price },
    }),
  calculatePrice: (quantity: number) =>
    apiClient.get<{
      basePrice: number
      discount: number
      discountPercent: number
      quantity: string
      totalPrice: number
      totalPriceWithDiscount: number
    }>({
      url: PRICE_URLS.calculate + `?quantity=${quantity}`,
    }),
}
