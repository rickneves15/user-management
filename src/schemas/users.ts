import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
  address: z.object({
    street: z.string().min(3),
    neighborhood: z.string().min(3),
    number: z.string().optional(),
    city: z.string().min(3),
    state: z.string().min(3),
    cep: z.string().min(8),
  }),
})
export const usersSchema = z.array(userSchema)

export type User = z.infer<typeof userSchema>
export type Users = z.infer<typeof usersSchema>
