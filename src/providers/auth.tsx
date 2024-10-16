'use client'

import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { deleteCookie, getCookie, setCookie } from '~/lib/cookies'
import { User } from '~/schemas/users'

interface AuthContextData {
  userAuthenticated: User | undefined
  signIn: (user: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const storeKey = '@user-management:user'

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [userAuthenticated, setUserAuthenticated] = useState<User | undefined>()

  const signIn = (user: User) => {
    setCookie(storeKey, user)
    setUserAuthenticated(user)
  }

  const signOut = () => {
    deleteCookie(storeKey)
    setUserAuthenticated(undefined)
  }

  const loadUserStore = async () => {
    const userStore = await getCookie(storeKey)
    setUserAuthenticated(userStore)
  }

  useEffect(() => {
    loadUserStore()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
