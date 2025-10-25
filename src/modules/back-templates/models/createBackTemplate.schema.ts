import { z } from 'zod'

export const createBackTemplateSchema = z.object({
  title: z
    .string('Вкажіть назву шаблону')
    .min(1, 'Вкажіть назву шаблону')
    .max(255, 'Максимальна довжина назви 255 символів'),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().optional(),
})

export type CreateBackTemplateInput = z.infer<typeof createBackTemplateSchema>
