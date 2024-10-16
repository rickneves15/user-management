'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { type LoginForm, loginFormSchema } from '~/schemas/login-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { login } from '~/services/users'
import { useAuth } from '~/providers/auth'

export function LoginForm() {
  const { signIn, userAuthenticated } = useAuth()
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async ({ email, password }: LoginForm) => {
    const response = await login(email, password)
    if (response?.success) {
      signIn(response.user)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">Login</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Log in with your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userAuthenticated ? (
          <p className="text-center text-sm text-muted-foreground">
            You are already logged in.
          </p>
        ) : (
          <Form {...form}>
            <form
              id="login-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
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
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-col items-center space-y-2">
                <Button form="login-form" type="submit" className="w-full">
                  Enter
                </Button>
                <Link
                  href="/password-recovery"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot your password ?
                </Link>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
