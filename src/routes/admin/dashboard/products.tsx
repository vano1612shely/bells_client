import { createFileRoute } from '@tanstack/react-router'
import { Products } from '@/pages/products/index.tsx'

export const Route = createFileRoute('/admin/dashboard/products')({
  component: Products,
})
