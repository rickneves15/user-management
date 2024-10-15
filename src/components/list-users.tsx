'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { getUsers } from '~/services/users'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'

import { BaseLayout } from './base-layout'
import { Users } from '~/schemas/users'
import { cn } from '~/lib/utils'

export function ListUsers() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: response, isLoading } = useQuery({
    queryKey: ['users', currentPage],
    queryFn: () =>
      getUsers({
        currentPage,
      }),
  })

  if (!response) {
    return <p className="mt-10 text-center text-lg text-zinc-500">Loading...</p>
  }

  const users = response?.data
  const totalPages = response?.pages

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <BaseLayout title="List Users">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="overflow-x-auto">
          {users && users.length > 0 ? (
            <div className="divide-y">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Nome</TableHead>
                    <TableHead className="w-1/4">E-mail</TableHead>
                    <TableHead className="w-1/2">Endereço</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.fullName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{`${user.address.street}, ${user.address.number} - ${user.address.neighborhood} - ${user.address.city}, ${user.address.state}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Pagination className="justify-end p-2">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={handlePrevious}
                      className={cn({
                        'cursor-not-allowed opacity-50': currentPage <= 1,
                      })}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={handleNext}
                      className={cn({
                        'cursor-not-allowed opacity-50': currentPage > 1,
                      })}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          ) : (
            <p className="py-2 text-center text-sm text-gray-500">
              {isLoading ? 'Loading...' : 'No users found'}
            </p>
          )}
        </div>
      </div>
    </BaseLayout>
  )
}
