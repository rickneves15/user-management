import { number, z } from 'zod'
import {
  addressResponseApi,
  addressResponseApiSchema,
  addressSchema,
} from '~/schemas/address'

const addressMapperResponseSchema = addressSchema.omit({
  number: true,
  cep: true,
})

export type addressMapperResponse = z.infer<typeof addressMapperResponseSchema>

export const addressMapper = (
  address: addressResponseApi,
): addressMapperResponse | null => {
  const addressMapperResponse = addressResponseApiSchema.safeParse(address)

  if (!addressMapperResponse.success) {
    return null
  }

  return {
    street: address.logradouro,
    neighborhood: address.bairro,
    city: address.localidade,
    state: address.estado,
  }
}
