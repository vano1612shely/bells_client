import { z } from 'zod'

export const createOptionSchema = z.object({
  category_id: z.string().uuid(),
  title: z
    .string({ message: 'Введіть назву' })
    .min(1, { message: 'Введіть назву' })
    .max(255, { message: 'Максимальна довжина — 255 символів' }),

  metadata: z
    .object({
      colorHex: z
        .string()
        .transform((val) => (val === '' ? undefined : val))
        .refine(
          (val) => !val || /^#([0-9A-Fa-f]{3}){1,2}$/.test(val),
          'Некоректний формат кольору',
        )
        .optional(),
    })
    .optional(),
})

export type CreateOptionInput = z.infer<typeof createOptionSchema>
