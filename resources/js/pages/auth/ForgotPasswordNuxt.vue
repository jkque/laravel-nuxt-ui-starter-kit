<script setup lang="ts">
  import { store } from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController'
  import Layout from '@/layouts/AuthBasic.vue'
  import { router } from '@inertiajs/vue3'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import * as z from 'zod'

  defineOptions({ layout: Layout })

  defineProps<{
    status?: string
  }>()

  const form = useForm({
    email: '',
  })

  const fields = [
    {
      name: 'email',
      type: 'text' as const,
      label: 'Email',
      placeholder: 'email@example.com',
    },
  ]

  const schema = z.object({
    email: z.email('Invalid email'),
  })

  type Schema = z.output<typeof schema>
  const authForm = useTemplateRef('authForm')

  router.on('error', (errors) => {
    authForm.value!.formRef!.setErrors(getErrors(errors.detail.errors))
  })

  function onSubmit(payload: FormSubmitEvent<Schema>) {
    form.defaults(payload.data).reset()
    form.submit(store())
  }
</script>

<template>
  <UAuthForm
    ref="authForm"
    :fields="fields"
    :schema="schema"
    title="Forgot password"
    :submit="{ label: 'Email password reset link' }"
    :loading="form.processing"
    @submit="onSubmit"
  >
    <template #description> Enter your email to receive a password reset link. </template>

    <template #validation>
      <div v-if="status" class="text-center text-sm font-medium text-green-600">
        {{ status }}
      </div>
    </template>

    <template #footer> Or, return to <ULink to="/login" class="font-medium text-primary">log in</ULink>. </template>
  </UAuthForm>
</template>
