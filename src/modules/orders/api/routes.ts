export const ORDERS_URLS = {
  orders: '/orders',
  order: (id: string) => `/orders/${id}`,
  updateStatus: (id: string) => `/orders/${id}/status`,
  downloadPdf: (id: string) => `/orders/${id}/pdf`,
}
