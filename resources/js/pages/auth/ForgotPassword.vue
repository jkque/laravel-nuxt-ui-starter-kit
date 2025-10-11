<script setup lang="ts">
  import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController'
  import TextLink from '@/components/TextLink.vue'
  import AuthLayout from '@/layouts/AuthLayout.vue'
  import { login } from '@/routes'
  import { Form, Head } from '@inertiajs/vue3'

  defineProps<{
    status?: string
  }>()
</script>

<template>
  <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
    <Head title="Forgot password" />

    <div v-if="status" class="mb-4 text-center text-sm font-medium text-green-600">
      {{ status }}
    </div>

    <div class="space-y-6">
      <Form v-bind="PasswordResetLinkController.store.form()" v-slot="{ errors, processing }">
        <UFormField name="email" :error="errors.email" label="Email address">
          <UInput type="email" class="w-full" autocomplete="off" placeholder="email@example.com" autofocus required />
        </UFormField>

        <div class="my-6 flex items-center justify-start">
          <UButton :loading="processing" type="submit" block>Confirm Password</UButton>
        </div>
      </Form>

      <div class="text-muted-foreground space-x-1 text-center text-sm">
        <span class="text-muted">Or, return to</span>
        <TextLink :href="login()" class="text-sm font-medium text-primary">log in</TextLink>
      </div>
    </div>
  </AuthLayout>
</template>
