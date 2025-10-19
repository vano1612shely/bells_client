import { z } from 'zod'

export const createCategorySchema = z.object({
  title: z
    .string('Вкажіть назву категорії')
    .min(1, 'Вкажіть назву категорії')
    .max(255, 'Максимальна довжина назви 255 символів'),
  icon: z.file().optional(),
})
export type CreateCategoryInput = z.infer<typeof createCategorySchema>
