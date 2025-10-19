import { z } from 'zod'

export const photoSchema = z.object({
  originImage: z.instanceof(File, { message: "Оригінальне фото обов'язкове" }),
  image: z.instanceof(File).nullable().optional(),
})

export const orderItemSchema = z.object({
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1'),
  characteristics: z.record(z.string(), z.string()).default({}),
  photo: photoSchema,
})

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  name: z.string(),
  phone: z.string(),
})

export type PhotoSchema = z.infer<typeof photoSchema>
export type OrderSchema = z.infer<typeof orderSchema>
export type OrderItemSchema = z.infer<typeof orderItemSchema>
