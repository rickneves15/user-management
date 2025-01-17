import { User, Users } from '~/schemas/users'
import { toast } from 'sonner'

import { api } from './api'
import { RegistrationUserForm } from '~/schemas/registration-user-form'
import { Pagination } from '~/types/pagination'

type GetUsersProps = {
  currentPage?: number
  pageSize?: number
}

type UsersPagination = {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Users
}

export const getUsers = async ({
  currentPage = 1,
  pageSize = 10,
}: GetUsersProps): Promise<UsersPagination | undefined> => {
  try {
    const response = await api.get(
      `/users?_page=${currentPage}&_per_page=${pageSize}`,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

type CreateUserResponse = {
  data: User
  success: boolean
}

export const createUser = async (
  user: RegistrationUserForm,
): Promise<CreateUserResponse | undefined> => {
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

export const login = async (email: string, password: string) => {
  try {
    const response = await api.get(`/users?email=${email}`)
    const userExist = response?.data[0]

    if (!userExist) {
      toast.error('User not found.')
      return {
        success: false,
      }
    }

    if (userExist.password !== password) {
      toast.error('E-mail or password is invalid.')
      return {
        success: false,
      }
    }

    return {
      user: userExist,
      success: true,
    }
  } catch (error) {
    toast.error('Error while login user')
  }
}

export const passwordRecovery = async (email: string) => {
  try {
    const response = await api.get(`/users?email=${email}`)
    const userExist = response?.data[0]
    if (!userExist) {
      toast.error('User not found.')
      return {
        success: false,
      }
    }
    return {
      success: true,
    }
  } catch (error) {
    toast.error('Error while login user')
  }
}
