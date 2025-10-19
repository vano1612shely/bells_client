import { createFileRoute } from '@tanstack/react-router'
import { OrderDetailPage } from '@/pages/order/orderDetails.tsx'

export const Route = createFileRoute('/order/$orderId')({
  component: OrderDetailPage,
})
