'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { routes } from '~/constants'
import { Sidebar } from './sidebar'
import { cn } from '~/lib/utils'
import { useAuth } from '~/providers/auth'

export function Navbar() {
  const pathname = usePathname()
  const { userAuthenticated, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                User Management
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {routes.map((route) => (
                <Link
                  key={route.name}
                  href={route.path}
                  className={cn(
                    'inline-flex items-center text-sm font-medium text-gray-900',
                    {
                      'border-b-2 border-indigo-500': route.path === pathname,
                    },
                  )}
                >
                  {route.name}
                </Link>
              ))}
              {userAuthenticated && (
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span>{userAuthenticated.fullName}</span>
                  <Link
                    href="#"
                    onClick={signOut}
                    className="inline-flex items-center text-sm font-medium text-gray-900"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <Sidebar />
          </div>
        </div>
      </div>
    </nav>
  )
}
