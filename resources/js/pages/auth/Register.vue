<script setup lang="ts">
  import { store } from '@/actions/App/Http/Controllers/Auth/RegisteredUserController'
  import Layout from '@/layouts/AuthBasic.vue'
  import { Head, router } from '@inertiajs/vue3'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import * as z from 'zod'

  defineOptions({ layout: Layout })

  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const fields = [
    {
      name: 'name',
      type: 'text' as const,
      label: 'Name',
      placeholder: 'Full name',
    },
    {
      name: 'email',
      type: 'text' as const,
      label: 'Email',
      placeholder: 'email@example.com',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password' as const,
      placeholder: 'Password',
    },
  ]

  const schema = z.object({
    name: z.string('Name is required').min(1),
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  })

  type Schema = z.output<typeof schema>
  const authForm = useTemplateRef('authForm')

  router.on('error', (errors) => {
    authForm.value!.formRef!.setErrors(getErrors(errors.detail.errors))
  })

  function onSubmit(payload: FormSubmitEvent<Schema>) {
    form.defaults(payload.data).reset()
    form.password_confirmation = payload.data.password
    form.submit(store())
    form.reset('password', 'password_confirmation')
  }
</script>

<template>
  <div>
    <Head title="Register" />

    <UAuthForm
      ref="authForm"
      :fields="fields"
      :schema="schema"
      title="Create an account"
      :submit="{ label: 'Create account' }"
      :loading="form.processing"
      @submit="onSubmit"
    >
      <template #description> Already have an account? <ULink to="/login" class="font-medium text-primary">Login</ULink>. </template>

      <template #footer> By signing up, you agree to our <ULink to="/" class="font-medium text-primary">Terms of Service</ULink>. </template>
    </UAuthForm>
  </div>
</template>
