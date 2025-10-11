<script setup lang="ts">
  import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController'
  import { Form } from '@inertiajs/vue3'

  const open = ref(false)
  const passwordInput = useTemplateRef('passwordInput')
</script>

<template>
  <UModal
    v-model:open="open"
    title="Are you sure you want to delete your account?"
    description="Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."
  >
    <UButton label="Delete account" color="error" />

    <template #body>
      <Form
        v-bind="ProfileController.destroy.form()"
        reset-on-success
        @error="() => passwordInput?.inputRef?.focus()"
        :options="{
          preserveScroll: true,
        }"
        class="space-y-6"
        v-slot="{ errors, processing, reset, clearErrors }"
      >
        <UFormField name="password" :error="errors.password">
          <UInput ref="passwordInput" type="password" placeholder="Password" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="Cancel"
            color="neutral"
            variant="subtle"
            @click="
              () => {
                clearErrors()
                reset()
                open = false
              }
            "
          />
          <UButton label="Delete Account" color="error" variant="solid" loading-auto type="submit" :disabled="processing" />
        </div>
      </Form>
    </template>
  </UModal>
</template>
