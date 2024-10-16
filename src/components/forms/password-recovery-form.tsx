'use client'

import { useState } from 'react'
import { toast } from 'sonner'

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
import { Label } from '~/components/ui/label'
import { passwordRecovery } from '~/services/users'

export function PasswordRecoveryForm() {
  const [isSent, setIsSent] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate sending password recovery link
    const response = await passwordRecovery(email)
    if (response?.success) {
      toast.success('Password recovery link sent to: ' + email, {
        duration: 1000,
        onAutoClose: () => {
          setEmail('')
          setIsSent(true)
        },
      })
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">
          Password Recovery
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Enter your email to receive the password recovery link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSent ? (
          <p className="text-sm text-green-500 sm:text-base">
            Check your email for the link.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Send Recovery Link
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
