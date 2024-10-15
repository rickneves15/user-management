'use client'

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

import { BaseLayout } from './base-layout'

export function ListUsers() {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })

  return (
    <BaseLayout title="List Users">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="overflow-x-auto">
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
                  <TableCell className="font-medium">{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`${user.address.street}, ${user.address.number} - ${user.address.neighborhood} - ${user.address.city}, ${user.address.state}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </BaseLayout>
  )
}
