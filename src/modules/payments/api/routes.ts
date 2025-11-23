export const PAYMENTS_URLS = {
  createOrder: '/payments/create-order',
  capture: (orderId: string) => `/payments/capture/${orderId}`,
}
