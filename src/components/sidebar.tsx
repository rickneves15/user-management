'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet'
import { routes } from '~/constants'

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center" asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.path}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
