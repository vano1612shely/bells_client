import { createFileRoute } from '@tanstack/react-router'
import { DiscountPage } from '@/pages/admin/discount'

export const Route = createFileRoute('/admin/dashboard/discount')({
  component: DiscountPage,
})
