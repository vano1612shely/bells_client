import { createFileRoute } from '@tanstack/react-router'
import AdminOrdersPage from '@/pages/admin/orders'

export const Route = createFileRoute('/admin/dashboard/')({
  component: AdminOrdersPage,
})
