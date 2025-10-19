import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ message: 'Введіть email' })
    .min(1, { message: 'Введіть email' }),
  password: z
    .string({ message: 'Введіть пароль' })
    .min(6, { message: 'Введіть мінімум 6 символів' }),
})

export type LoginInput = z.input<typeof loginSchema>
export type LoginOutput = z.output<typeof loginSchema>
