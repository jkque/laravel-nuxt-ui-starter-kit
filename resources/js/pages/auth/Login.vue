<script setup lang="ts">
  import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController'
  import TextLink from '@/components/TextLink.vue'
  import AuthBase from '@/layouts/AuthLayout.vue'
  import { register } from '@/routes'
  import { request } from '@/routes/password'
  import { Form, Head } from '@inertiajs/vue3'

  defineProps<{
    status?: string
    canResetPassword: boolean
  }>()
</script>

<template>
  <AuthBase title="Log in to your account" description="Enter your email and password below to log in">
    <Head title="Log in" />

    <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <Form
      v-bind="AuthenticatedSessionController.store.form()"
      :reset-on-success="['password']"
      v-slot="{ errors, processing }"
      class="flex flex-col gap-6"
    >
      <div class="grid gap-6">
        <UFormField name="email" :error="errors.email" label="Email address">
          <UInput type="email" class="w-full" autocomplete="email" placeholder="email@example.com" autofocus required />
        </UFormField>

        <UFormField name="password" :error="errors.password" label="Password">
          <UInput type="password" class="w-full" autocomplete="current-password" placeholder="Password" required />
          <template #hint>
            <TextLink v-if="canResetPassword" :href="request()" class="text-sm text-primary" :tabindex="5"> Forgot password? </TextLink>
          </template>
        </UFormField>

        <UFormField name="remember" :error="errors.password">
          <UCheckbox label="Remember me" />
        </UFormField>

        <UButton :loading="processing" type="submit" block class="mt-4">Log in</UButton>
      </div>

      <div class="text-center text-sm text-muted">
        Don't have an account?
        <TextLink :href="register()" :tabindex="5" class="text-primary">Sign up</TextLink>
      </div>
    </Form>
  </AuthBase>
</template>
