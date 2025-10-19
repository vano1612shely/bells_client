import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { OrderPage } from '@/pages/order'

const searchSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
})

export const Route = createFileRoute('/order/')({
  component: OrderPage,
  validateSearch: (search) => searchSchema.parse(search),
})
