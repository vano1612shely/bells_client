import { apiClient } from '@/shared/api'
import { PAYMENTS_URLS } from './routes.ts'

export const PaymentsApi = {
  createOrder: ({ orderId }: { orderId: string }) =>
    apiClient.post<{ paypalOrderId: string; status: string }>({
      url: PAYMENTS_URLS.createOrder,
      payload: { orderId },
      skipAuthHeaders: true,
    }),
  captureOrder: ({ paypalOrderId }: { paypalOrderId: string }) =>
    apiClient.post<{ status: string; orderId: string }>({
      url: PAYMENTS_URLS.capture(paypalOrderId),
      skipAuthHeaders: true,
    }),
}
