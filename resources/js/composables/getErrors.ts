import type { Errors } from '@inertiajs/core'
import { FormError } from '@nuxt/ui'

export default function (errors: Errors): FormError[] {
  const formErrors: FormError[] = []

  Object.keys(errors).forEach((key) => {
    formErrors.push({
      name: key,
      message: errors[key] as string,
    })
  })

  return formErrors
}
