import type { OrderSchema } from '@/modules/orders'
import type { Order } from '@/modules/orders/types'
import { apiClient } from '@/shared/api'
import { ORDERS_URLS } from '@/modules/orders/api/routes.ts'

export const OrderApi = {
  baseKey: 'orders',
  createOrder: (data: OrderSchema) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('phone', data.phone)
    data.items.forEach((item, index) => {
      formData.append(`items[${index}][quantity]`, item.quantity.toString())
      formData.append(
        `items[${index}][characteristics]`,
        JSON.stringify(item.characteristics),
      )
      formData.append('originImage', item.photo.originImage)
      if (item.photo.image) {
        formData.append('image', item.photo.image)
      }
    })

    const response = apiClient.post({
      url: ORDERS_URLS.orders,
      payload: formData,
      contentType: 'multipart/form-data',
    })

    return response
  },
  getOrders: (filters: {
    page?: number
    limit?: number
    phone?: string
    status?: string
  }) =>
    apiClient.get<{
      limit: number
      page: number
      total: number
      data: Array<Order>
    }>({
      url: ORDERS_URLS.orders,
      params: {
        ...filters,
        page: filters.page || 1,
        limit: filters.limit || 50,
      },
    }),
  getOrder: (id: string) =>
    apiClient.get<Order>({
      url: ORDERS_URLS.order(id),
    }),
  updateOrderStatus: ({ id, status }: { id: string; status: string }) =>
    apiClient.patch({
      url: ORDERS_URLS.updateStatus(id),
      payload: {
        status,
      },
    }),
}
