import axios from 'axios'
import { addressMapper } from '~/mappers/address'

export const getAddressByCEP = async (cep: string) => {
  try {
    if (!cep || cep.length < 8) {
      return null
    }

    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    return addressMapper(response.data)
  } catch (error) {
    console.error(error)
  }
}
