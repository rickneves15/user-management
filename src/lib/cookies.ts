'use server'

import { cookies } from 'next/headers'

export const getCookie = (name: string) => {
  const storeValue = cookies().get(name)
  const value = storeValue ? JSON.parse(storeValue.value) : undefined
  return value
}

export const setCookie = (name: string, value: any) => {
  cookies().set(name, JSON.stringify(value))
}

export const deleteCookie = (name: string) => {
  cookies().delete(name)
}
