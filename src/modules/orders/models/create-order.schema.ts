import { z } from 'zod'

export const photoSchema = z.object({
  originImage: z.instanceof(File, { message: "Оригінальне фото обов'язкове" }),
  image: z.instanceof(File).nullable().optional(),
})

export const backPhotoSchema = z.object({
  originImage: z.instanceof(File).nullable().optional(),
  image: z.instanceof(File).nullable().optional(),
})

export const orderItemSchema = z.object({
  quantity: z.number().min(1),
  characteristics: z.record(z.string(), z.string()).default({}),
  photo: photoSchema,
  backTemplateId: z.string().nullable().optional(),
  backPhoto: backPhotoSchema.optional(),
})

export const orderSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  name: z.string(),
  email: z.string(),
})

export type PhotoSchema = z.infer<typeof photoSchema>
export type OrderSchema = z.infer<typeof orderSchema>
export type OrderItemSchema = z.infer<typeof orderItemSchema>
