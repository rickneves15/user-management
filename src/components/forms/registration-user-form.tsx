'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { useForm } from 'react-hook-form'
import {
  type RegistrationUserForm,
  registrationUserFormSchema,
} from '~/schemas/registration-user-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetAddress } from '~/hooks/use-get-address'
import { createUser } from '~/services/users'

export function RegistrationUserForm() {
  const router = useRouter()
  const form = useForm<RegistrationUserForm>({
    resolver: zodResolver(registrationUserFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      address: {
        street: '',
        neighborhood: '',
        number: '',
        city: '',
        state: '',
        cep: '',
      },
    },
  })

  const onSubmit = async (values: RegistrationUserForm) => {
    const response = await createUser(values)

    if (response?.success) {
      toast.success('User created successfully', {
        duration: 1000,
        onAutoClose: () => router.push('/'),
      })
    }
  }

  const cepField = form.watch('address.cep')
  const { data: address, isLoading: isLoadingAddress } = useGetAddress(cepField)

  useEffect(() => {
    if (address) {
      form.setValue('address', {
        ...form.getValues('address'),
        ...address,
      })
    }
  }, [address, cepField])

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">
          Registration User
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Create your account by filling in the fields below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id="registration-user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Confirmation</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password Confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="CEP" {...field} />
                  </FormControl>
                  <FormMessage />
                  {isLoadingAddress && (
                    <p className="text-sm text-zinc-500">
                      Wait for getting address to cep.
                    </p>
                  )}
                  {!address && (
                    <p className="text-sm text-zinc-500">CEP not found</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood</FormLabel>
                  <FormControl>
                    <Input placeholder="Neighborhood" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          form="registration-user-form"
          type="submit"
          className="w-full"
          disabled={form.formState.isLoading}
        >
          {form.formState.isLoading ? 'Loading...' : 'Register'}
        </Button>
      </CardFooter>
    </Card>
  )
}
