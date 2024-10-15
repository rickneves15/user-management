import { PropsWithChildren } from 'react'

import { ReactQueryProvider } from './react-query'
import { Toaster } from '~/components/ui/sonner'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <Toaster />
      {children}
    </ReactQueryProvider>
  )
}
