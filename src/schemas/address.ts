import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string().min(3),
  neighborhood: z.string().min(3),
  number: z.string().optional(),
  city: z.string().min(3),
  state: z.string().min(2),
  cep: z.string().min(8),
})

export type Address = z.infer<typeof addressSchema>

export const addressResponseApiSchema = z.object({
  cep: z.string(),
  logradouro: z.string(),
  complemento: z.string(),
  unidade: z.string(),
  bairro: z.string(),
  localidade: z.string(),
  uf: z.string(),
  estado: z.string(),
  regiao: z.string(),
  ibge: z.string(),
  gia: z.string(),
  ddd: z.string(),
  siafi: z.string(),
})
export type addressResponseApi = z.infer<typeof addressResponseApiSchema>
