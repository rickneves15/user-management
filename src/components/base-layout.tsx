import { PropsWithChildren } from 'react'

import { Navbar } from './navbar'

type BaseLayoutProps = PropsWithChildren & {
  title?: string
}

export function BaseLayout({ children, title }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {title && (
          <h1 className="mb-6 text-2xl font-semibold text-gray-900">{title}</h1>
        )}
        {children}
      </main>
    </div>
  )
}
