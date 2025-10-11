<script setup lang="ts">
  import { update } from '@/actions/App/Http/Controllers/Settings/ProfileController'
  import Layout from '@/layouts/Default.vue'
  import SettingsLayout from '@/layouts/SettingsLayout.vue'
  import { send } from '@/routes/verification'
  import { Head } from '@inertiajs/vue3'
  import type { FormSubmitEvent } from '@nuxt/ui'
  import * as z from 'zod'

  defineOptions({ layout: Layout })

  defineProps<{
    mustVerifyEmail: boolean
    status?: string
  }>()

  const fileRef = ref<HTMLInputElement>()

  const profileSchema = z.object({
    name: z.string().min(2, 'Too short'),
    email: z.email('Invalid email'),
    avatar: z.string().optional(),
  })

  type ProfileSchema = z.output<typeof profileSchema>
  const auth = useAuth()

  const profile = reactive<Partial<ProfileSchema>>({
    name: auth.value.user.name,
    email: auth.value.user.email,
    avatar: undefined,
  })

  const form = useForm<Partial<ProfileSchema>>({
    name: '',
    email: '',
    avatar: undefined,
  })

  const toast = useToast()
  async function onSubmit(event: FormSubmitEvent<ProfileSchema>) {
    form.name = event.data.name
    form.email = event.data.email
    form.avatar = event.data.avatar
    form.submit(update())

    toast.add({
      title: 'Success',
      description: 'Your settings have been updated.',
      icon: 'i-lucide-check',
      color: 'success',
    })
  }

  function onFileChange(e: Event) {
    const input = e.target as HTMLInputElement

    if (!input.files?.length) {
      return
    }

    profile.avatar = URL.createObjectURL(input.files[0])
  }

  function onFileClick() {
    fileRef.value?.click()
  }
</script>

<template>
  <SettingsLayout>
    <Head title="Profile settings" />

    <UForm id="settings" :schema="profileSchema" :state="profile" @submit="onSubmit">
      <UPageCard title="Profile" description="These informations will be displayed publicly." variant="naked" orientation="horizontal" class="mb-4">
        <UButton form="settings" label="Save changes" color="neutral" type="submit" class="w-fit lg:ms-auto" />
      </UPageCard>

      <UPageCard variant="subtle">
        <UFormField
          name="name"
          label="Name"
          description="Will appear on receipts, invoices, and other communication."
          required
          class="flex items-start justify-between gap-4 max-sm:flex-col"
        >
          <UInput v-model="profile.name" autocomplete="off" />
        </UFormField>
        <USeparator />
        <UFormField name="email" label="Email" required class="flex items-start justify-between gap-4 max-sm:flex-col">
          <template #description>
            <p class="text-muted">Used to sign in, for email receipts and product updates.</p>
            <div v-if="mustVerifyEmail && !auth.user.email_verified_at">
              <p class="text-muted">
                Your email address is unverified.
                <TextLink :href="send()" as="button" class="text-sm font-medium text-primary">
                  Click here to resend the verification email.
                </TextLink>
              </p>

              <div v-if="status === 'verification-link-sent'" class="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            </div>
          </template>
          <UInput v-model="profile.email" type="email" autocomplete="off" />
        </UFormField>
        <USeparator />
        <UFormField
          name="avatar"
          label="Avatar"
          description="JPG, GIF or PNG. 1MB Max."
          class="flex justify-between gap-4 max-sm:flex-col sm:items-center"
        >
          <div class="flex flex-wrap items-center gap-3">
            <UAvatar :src="profile.avatar" :alt="profile.name" size="lg" />
            <UButton label="Choose" color="neutral" @click="onFileClick" />
            <input ref="fileRef" type="file" class="hidden" accept=".jpg, .jpeg, .png, .gif" @change="onFileChange" />
          </div>
        </UFormField>
      </UPageCard>
    </UForm>
  </SettingsLayout>
</template>
