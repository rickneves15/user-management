import { Users } from '~/schemas/users'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

import { api } from './api'
import { RegistrationUserForm } from '~/schemas/registration-user-form'

export const getUsers = async (): Promise<Users> => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const createUser = async (user: RegistrationUserForm) => {
  try {
    const userExist = await api.get(`/users?email=${user.email}`)

    if (userExist.data.length > 0) {
      toast.error('User already exists.')
      return
    }

    const response = await api.post('/users', user)

    return {
      data: response.data,
      success: true,
    }
  } catch (error) {
    toast.error('Error while creating user')
  }
}
