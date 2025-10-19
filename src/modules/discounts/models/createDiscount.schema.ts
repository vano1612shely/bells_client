import { z } from 'zod'

export const createDiscountSchema = z.object({
  discount: z
    .number({ message: 'Введіть відсоток скидки' })
    .min(0, { message: 'Мінімальний відсоток 0' }),
  count: z
    .number({ message: 'Введіть кількість товару' })
    .min(1, { message: 'Мінімальна кількість товарів 1' }),
})

export type CreateDiscountInput = z.infer<typeof createDiscountSchema>
