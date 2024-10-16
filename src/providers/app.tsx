import { PropsWithChildren } from 'react'

import { ReactQueryProvider } from './react-query'
import { Toaster } from '~/components/ui/sonner'
import { AuthProvider } from './auth'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  )
}
