import { Users } from '~/schemas/users'

import { api } from './api'

export const getUsers = async (): Promise<Users> => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
