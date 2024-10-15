'use client'

import { BaseLayout } from '~/components/base-layout'
import RegistrationUserForm from '~/components/forms/registration-user-form'

export default function SignUpPage() {
  return (
    <BaseLayout>
      <RegistrationUserForm />
    </BaseLayout>
  )
}
