import { z } from 'zod'
import { userSchema } from './users'

export const registrationUserFormSchema = userSchema
  .omit({
    id: true,
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
      })
    }
  })

export type RegistrationUserForm = z.infer<typeof registrationUserFormSchema>
