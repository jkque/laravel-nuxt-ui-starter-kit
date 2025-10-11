<script setup lang="ts">
  import PasswordController from '@/actions/App/Http/Controllers/Settings/PasswordController'
  import Layout from '@/layouts/Default.vue'
  import SettingsLayout from '@/layouts/SettingsLayout.vue'
  import { Form, Head } from '@inertiajs/vue3'

  defineOptions({ layout: Layout })

  withDefaults(
    defineProps<{
      requiresConfirmation?: boolean
      twoFactorEnabled?: boolean
    }>(),
    {
      requiresConfirmation: false,
      twoFactorEnabled: false,
    },
  )

  const toast = useToast()

  function handleSuccess() {
    toast.add({
      title: 'Success',
      description: 'Your password has been updated.',
      icon: 'i-lucide-check',
      color: 'success',
    })
  }
</script>

<template>
  <SettingsLayout>
    <Head title="Security settings" />

    <UPageCard title="Password" description="Confirm your current password before setting a new one." variant="subtle">
      <Form
        v-bind="PasswordController.update.form()"
        :options="{
          preserveScroll: true,
        }"
        reset-on-success
        :reset-on-error="['password', 'password_confirmation', 'current_password']"
        class="flex max-w-xs flex-col gap-4"
        v-slot="{ errors, processing }"
        @success="handleSuccess"
      >
        <UFormField name="current_password" :error="errors.current_password">
          <UInput type="password" placeholder="Current password" class="w-full" />
        </UFormField>

        <UFormField name="password" :error="errors.password">
          <UInput type="password" placeholder="New password" class="w-full" />
        </UFormField>

        <UFormField name="password_confirmation" :error="errors.password_confirmation">
          <UInput type="password" placeholder="Confirm password" class="w-full" />
        </UFormField>

        <UButton label="Update" class="w-fit" type="submit" :disabled="processing" />
      </Form>
    </UPageCard>

    <TwoFactor :requiresConfirmation="requiresConfirmation" :twoFactorEnabled="twoFactorEnabled" />

    <UPageCard
      title="Account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
      class="bg-gradient-to-tl from-error/10 from-5% to-default"
    >
      <template #footer>
        <DeleteAccount />
      </template>
    </UPageCard>
  </SettingsLayout>
</template>
