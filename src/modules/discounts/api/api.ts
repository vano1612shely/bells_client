import type { CreateDiscountInput } from '@/modules/discounts'
import type { Discount } from '@/modules/discounts/types'
import { apiClient } from '@/shared/api'
import { DISCOUNT_URLS } from '@/modules/discounts/api/routes.ts'

export const DiscountsApi = {
  baseKey: 'discounts',
  list: () =>
    apiClient.get<Array<Discount>>({
      url: DISCOUNT_URLS.discounts,
    }),
  create: (data: CreateDiscountInput) =>
    apiClient.post({
      url: DISCOUNT_URLS.discounts,
      payload: data,
    }),
  delete: (id: string) =>
    apiClient.delete({
      url: DISCOUNT_URLS.discount(id),
    }),
  discount: (id: string) =>
    apiClient.get({
      url: DISCOUNT_URLS.discount(id),
    }),
}
