import { PropsWithChildren } from 'react'

import { ReactQueryProvider } from './react-query'

export function AppProvider({ children }: PropsWithChildren) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
