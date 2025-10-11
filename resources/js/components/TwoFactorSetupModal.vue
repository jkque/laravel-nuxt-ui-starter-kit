<script setup lang="ts">
  import { confirm, enable } from '@/routes/two-factor'
  import { Form } from '@inertiajs/vue3'
  import { Loader2 } from 'lucide-vue-next'

  const props = defineProps<{
    requiresConfirmation: boolean
    twoFactorEnabled: boolean
  }>()

  const open = ref(false)
  const { copy, copied } = useClipboard()
  const { hasSetupData, qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } = useTwoFactorAuth()

  const showVerificationStep = ref(false)
  const code = ref<number[]>([])
  const codeValue = computed<string>(() => code.value.join(''))

  const modalConfig = computed<{
    title: string
    description: string
    buttonText: string
  }>(() => {
    if (props.twoFactorEnabled) {
      return {
        title: 'Two-Factor Authentication Enabled',
        description: 'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
        buttonText: 'Close',
      }
    }

    if (showVerificationStep.value) {
      return {
        title: 'Verify Authentication Code',
        description: 'Enter the 6-digit code from your authenticator app',
        buttonText: 'Continue',
      }
    }

    return {
      title: 'Enable Two-Factor Authentication',
      description: 'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
      buttonText: 'Continue',
    }
  })

  function handleModalNextStep() {
    if (props.requiresConfirmation) {
      showVerificationStep.value = true

      return
    }

    clearSetupData()
    open.value = false
  }

  function resetModalState() {
    if (props.twoFactorEnabled) {
      clearSetupData()
    }

    showVerificationStep.value = false
    code.value = []
  }

  async function handleUpdateOpen() {
    if (!qrCodeSvg.value) {
      await fetchSetupData()
    }
  }
</script>

<template>
  <UModal
    v-model:open="open"
    @after:leave="resetModalState"
    @update:open="handleUpdateOpen"
    :ui="{ content: 'sm:max-w-md divide-none', title: 'font-normal', header: 'block!' }"
  >
    <UButton v-if="hasSetupData" icon="i-lucide-shield-check"> Continue Setup </UButton>

    <Form v-else v-bind="enable.form()" #default="{ processing }">
      <UButton type="submit" :disabled="processing" icon="i-lucide-shield-check"> Enable 2FA </UButton>
    </Form>

    <template #title>
      <div class="mt-4 flex flex-col items-center justify-center gap-2 text-center sm:text-left">
        <UAvatar icon="i-lucide-scan-line" size="2xl" />
        <h2 class="font-semibold text-highlighted">{{ modalConfig.title }}</h2>
        <p class="mt-1 text-center text-sm text-muted">{{ modalConfig.description }}</p>
      </div>
    </template>

    <template #body>
      <div class="relative flex w-auto flex-col items-center justify-center space-y-5">
        <template v-if="!showVerificationStep">
          <AlertError v-if="errors?.length" :errors="errors" />
          <template v-else>
            <div class="relative mx-auto flex max-w-md items-center overflow-hidden">
              <div class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-muted">
                <div
                  v-if="!qrCodeSvg"
                  class="absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-default"
                >
                  <Loader2 class="size-6 animate-spin" />
                </div>
                <div v-else class="relative z-10 overflow-hidden border border-muted p-5">
                  <div v-html="qrCodeSvg" class="flex aspect-square size-full items-center justify-center" />
                </div>
              </div>
            </div>

            <div class="flex w-full items-center space-x-5">
              <UButton @click="handleModalNextStep" block>
                {{ modalConfig.buttonText }}
              </UButton>
            </div>

            <div class="relative flex w-full items-center justify-center">
              <div class="absolute inset-0 top-1/2 h-px w-full bg-border" />
              <span class="bg-card relative px-2 py-1">or, enter the code manually</span>
            </div>

            <div class="flex w-full items-center justify-center space-x-2">
              <div class="flex w-full items-stretch">
                <div v-if="!manualSetupKey" class="flex h-full w-full items-center justify-center bg-default p-3">
                  <Loader2 class="size-4 animate-spin" />
                </div>
                <template v-else>
                  <UInput v-model="manualSetupKey" :ui="{ trailing: 'pr-0.5' }" size="xl" class="w-full">
                    <template v-if="manualSetupKey?.length" #trailing>
                      <UTooltip text="Copy to clipboard" :content="{ side: 'right' }">
                        <UButton
                          :color="copied ? 'success' : 'neutral'"
                          variant="link"
                          size="sm"
                          :icon="copied ? 'i-lucide-copy-check' : 'i-lucide-copy'"
                          aria-label="Copy to clipboard"
                          @click="copy(manualSetupKey)"
                        />
                      </UTooltip>
                    </template>
                  </UInput>
                </template>
              </div>
            </div>
          </template>
        </template>

        <template v-else>
          <Form v-bind="confirm.form()" reset-on-error @finish="code = []" @success="open = false" v-slot="{ errors, processing }">
            <input type="hidden" name="code" :value="codeValue" />
            <div class="relative w-full space-y-8">
              <UFormField name="code" :error="errors?.confirmTwoFactorAuthentication?.code" :ui="{ root: 'text-center' }">
                <UPinInput v-model="code" type="number" placeholder="○" size="xl" length="6" otp autofocus />
              </UFormField>

              <div class="flex w-full items-center space-x-5">
                <UButton
                  label="Back"
                  color="neutral"
                  variant="subtle"
                  class="w-auto flex-1"
                  @click="showVerificationStep = false"
                  :disabled="processing"
                  block
                />
                <UButton
                  label="Confirm"
                  color="primary"
                  variant="solid"
                  type="submit"
                  class="w-auto flex-1"
                  :loading="processing"
                  :disabled="processing || codeValue.length < 6"
                  block
                />
              </div>
            </div>
          </Form>
        </template>
      </div>
    </template>
  </UModal>
</template>
