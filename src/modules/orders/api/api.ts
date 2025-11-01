import type { OrderSchema } from '@/modules/orders'
import type { Order } from '@/modules/orders/types'
import { apiClient } from '@/shared/api'
import { ORDERS_URLS } from '@/modules/orders/api/routes.ts'

export const OrderApi = {
  baseKey: 'orders',
  createOrder: (data: OrderSchema) => {
    const formData = new FormData()

    // 🔹 Основні поля замовлення
    formData.append('name', data.name)
    formData.append('email', data.email)

    // 🔹 Товари
    data.items.forEach((item, index) => {
      formData.append(`items[${index}][quantity]`, item.quantity.toString())
      formData.append(
        `items[${index}][characteristics]`,
        JSON.stringify(item.characteristics || {}),
      )

      if (item.photo.originImage) {
        formData.append(`originImage[${index}]`, item.photo.originImage)
      }
      if (item.photo.image) {
        formData.append(`image[${index}]`, item.photo.image)
      }

      // 🔙 Back side
      if (item.backTemplateId) {
        formData.append(`items[${index}][backSideType]`, 'template')
        formData.append(`items[${index}][backTemplateId]`, item.backTemplateId)
      } else if (item.backPhoto) {
        formData.append(`items[${index}][backSideType]`, 'custom')
        if (item.backPhoto.originImage) {
          formData.append(
            `backOriginImage[${index}]`,
            item.backPhoto.originImage,
          )
        }
        if (item.backPhoto.image) {
          formData.append(`backImage[${index}]`, item.backPhoto.image)
        }
      }
    })

    // 🔹 Доставка
    formData.append('delivery[type]', data.delivery.type)

    if (data.delivery.type === 'home' && data.delivery.address) {
      const address = data.delivery.address
      formData.append('delivery[address][name]', address.name)
      formData.append('delivery[address][street]', address.street)
      if (address.additional)
        formData.append('delivery[address][additional]', address.additional)
      formData.append('delivery[address][postalCode]', address.postalCode)
      formData.append('delivery[address][city]', address.city)
      formData.append('delivery[address][phone]', address.phone)
    }

    if (data.delivery.type === 'relay' && data.delivery.relay) {
      const relay = data.delivery.relay
      formData.append('delivery[relay][phone]', relay.phone)

      if (relay.point) {
        const p = relay.point
        // Важливо: бек очікує JSONB relayPoint
        formData.append('delivery[relay][point]', JSON.stringify(p))
      }
    }

    // 🔹 Відправка
    return apiClient.post({
      url: ORDERS_URLS.orders,
      payload: formData,
      contentType: 'multipart/form-data',
    })
  },

  getOrders: (filters: {
    page?: number
    limit?: number
    email?: string
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
