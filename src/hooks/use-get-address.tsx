import { useQuery } from '@tanstack/react-query'
import { getAddressByCEP } from '~/services/address'

export function useGetAddress(cep: string) {
  return useQuery({
    queryKey: ['address', cep],
    queryFn: () => getAddressByCEP(cep),
    enabled: !!cep && cep.length >= 8,
  })
}
