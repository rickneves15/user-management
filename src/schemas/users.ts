import { z } from 'zod'
import { addressSchema } from './address'

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
  address: addressSchema,
})
export const usersSchema = z.array(userSchema)

export type User = z.infer<typeof userSchema>
export type Users = z.infer<typeof usersSchema>
